#!/usr/bin/env node
// Vigia de delegacao. Roda o agente em primeiro plano e o observa por artefato,
// nunca por sinal de vida (regra 33 do CLAUDE.md, agora com relogio de verdade).
//
//   node scripts/harness/delegar.mjs --dir <sandbox> --model <provedor/modelo> \
//        --prompt-file <arquivo> [--tarefa "nome"] [--max-min 45] [--parado-min 5]
//   node scripts/harness/delegar.mjs --status
//
// Desfechos possiveis: ok | travado | falso_sucesso | estourou_tempo | erro

import { spawn, execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync, copyFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const REGISTRO = join(RAIZ, ".claude", "delegacoes.jsonl");
// Acorda a cada 2 s para nao demorar a notar que o agente ja saiu, mas so tira
// impressao do sandbox de tempos em tempos, que e a parte cara do laco.
const TICK_MS = 2_000;
const IMPRESSAO_MAX_MS = 30_000;

// A impressao precisa caber pelo menos tres vezes dentro da janela de parado.
// Sem isso o limite dispara antes da primeira medicao e mata agente que estava
// trabalhando — aconteceu em 10/08/2026 com um agente que escrevia a cada 4 s.
function intervaloDaImpressao(paradoMs) {
  return Math.max(TICK_MS, Math.min(IMPRESSAO_MAX_MS, Math.floor(paradoMs / 3)));
}
const IGNORAR = new Set(["node_modules", ".git", "dist", "graphify-out", ".next"]);

function lerArgumentos(argv) {
  const opcoes = {};
  for (let i = 0; i < argv.length; i += 1) {
    const atual = argv[i];
    if (!atual.startsWith("--")) continue;
    const nome = atual.slice(2);
    const proximo = argv[i + 1];
    if (proximo === undefined || proximo.startsWith("--")) {
      opcoes[nome] = true;
    } else {
      opcoes[nome] = proximo;
      i += 1;
    }
  }
  return opcoes;
}

function lerRegistro() {
  if (!existsSync(REGISTRO)) return [];
  const bruto = readFileSync(REGISTRO, "utf8").trim();
  if (!bruto) return [];
  return bruto.split("\n").map((linha) => JSON.parse(linha));
}

function gravarRegistro(entradas) {
  mkdirSync(dirname(REGISTRO), { recursive: true });
  const conteudo = entradas.map((entrada) => JSON.stringify(entrada)).join("\n");
  writeFileSync(REGISTRO, conteudo + "\n", "utf8");
}

function abrirEntrada(entrada) {
  gravarRegistro([...lerRegistro(), entrada]);
}

function fecharEntrada(id, desfecho, detalhe) {
  const entradas = lerRegistro().map((entrada) =>
    entrada.id === id ? { ...entrada, desfecho, detalhe, fim: new Date().toISOString() } : entrada,
  );
  gravarRegistro(entradas);
}

// Impressao do sandbox: o que o git ve como mudado, mais tamanho e data de cada
// arquivo listado. So o tamanho do arquivo crescendo ja muda a impressao, entao
// agente que escreve devagar nao e confundido com agente parado.
function tirarImpressao(diretorio) {
  try {
    // O `-uall` e obrigatorio: sem ele o git resume uma pasta nova inteira numa
    // linha so (`?? src/`), e a impressao fica cega para tudo que acontece
    // dentro dela. Verificado em 24/08/2026 — um agente trocou dois arquivos
    // dentro de `src/` e o vigia acusou falso_sucesso numa entrega que estava
    // correta.
    const porcelana = execFileSync("git", ["-C", diretorio, "status", "--porcelain", "-uall"], {
      encoding: "utf8",
    });
    const caminhos = porcelana
      .split("\n")
      .filter(Boolean)
      .map((linha) => linha.slice(3).trim().replace(/^"|"$/g, ""));
    const detalhes = caminhos.map((caminho) => {
      try {
        const info = statSync(join(diretorio, caminho));
        return `${caminho}:${info.size}:${info.mtimeMs}`;
      } catch {
        return `${caminho}:ausente`;
      }
    });
    return detalhes.join("|");
  } catch {
    return varrerPasta(diretorio);
  }
}

function varrerPasta(diretorio, acumulado = []) {
  let itens;
  try {
    itens = readdirSync(diretorio, { withFileTypes: true });
  } catch {
    return acumulado.join("|");
  }
  for (const item of itens) {
    if (IGNORAR.has(item.name)) continue;
    const caminho = join(diretorio, item.name);
    if (item.isDirectory()) {
      varrerPasta(caminho, acumulado);
    } else {
      try {
        const info = statSync(caminho);
        acumulado.push(`${caminho}:${info.size}:${info.mtimeMs}`);
      } catch {
        // arquivo sumiu no meio da varredura; ignorar
      }
    }
  }
  return acumulado.join("|");
}

function resumoDoDiff(diretorio) {
  try {
    return execFileSync("git", ["-C", diretorio, "diff", "--stat", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

function esperar(ms) {
  return new Promise((concluir) => setTimeout(concluir, ms));
}

// Matar o processo direto nao basta: como ele nasce dentro de um shell, o agente
// e neto, sobrevive ao pai e segue queimando cota. Verificado em 10/08/2026 —
// o teste do travamento deixou um node orfao vivo. Por isso mata-se a arvore.
function matarArvore(processo) {
  if (!processo.pid) return;
  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/PID", String(processo.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      process.kill(-processo.pid, "SIGKILL");
    }
  } catch {
    // ja morreu, ou nao existe mais a arvore
  }
}

function emMinutos(ms) {
  const segundos = Math.round(ms / 1000);
  return segundos < 60 ? `${segundos} s` : `${Math.round(segundos / 60)} min`;
}

function mostrarStatus() {
  const abertas = lerRegistro().filter((entrada) => entrada.desfecho === "running");
  if (abertas.length === 0) {
    console.log("Nenhuma delegacao aberta.");
    return 0;
  }
  console.log(`${abertas.length} delegacao(oes) ainda aberta(s):`);
  for (const entrada of abertas) {
    console.log(`  ${entrada.id} | ${entrada.modelo} | ${entrada.tarefa} | desde ${entrada.inicio}`);
  }
  return 1;
}

async function main() {
  const opcoes = lerArgumentos(process.argv.slice(2));

  if (opcoes.status) {
    process.exit(mostrarStatus());
  }

  // Saida de emergencia: agente morto por fora deixa a entrada aberta, e a trava
  // do hook Stop passaria a barrar todo encerramento para sempre.
  if (opcoes.abandonar) {
    const alvo = String(opcoes.abandonar);
    const entradas = lerRegistro();
    const achou = entradas.some((entrada) => entrada.id === alvo && entrada.desfecho === "running");
    if (!achou) {
      console.error(`Nenhuma delegacao aberta com id ${alvo}.`);
      process.exit(2);
    }
    gravarRegistro(
      entradas.map((entrada) =>
        entrada.id === alvo
          ? { ...entrada, desfecho: "abandonado", detalhe: "fechado a mao", fim: new Date().toISOString() }
          : entrada,
      ),
    );
    console.log(`Delegacao ${alvo} marcada como abandonada.`);
    process.exit(0);
  }

  const diretorio = opcoes.dir;
  const modelo = opcoes.model;
  const arquivoPrompt = opcoes["prompt-file"];

  if (!diretorio || !existsSync(diretorio)) {
    console.error("ERRO: --dir ausente ou inexistente.");
    process.exit(2);
  }
  if (!opcoes.cmd && (!modelo || !arquivoPrompt)) {
    console.error("ERRO: --model e --prompt-file sao obrigatorios (ou use --cmd para teste).");
    process.exit(2);
  }
  if (arquivoPrompt && !existsSync(arquivoPrompt)) {
    console.error(`ERRO: arquivo de prompt nao encontrado: ${arquivoPrompt}`);
    process.exit(2);
  }

  const paradoMs = Number(opcoes["parado-min"] ?? 5) * 60_000;
  const tetoMs = Number(opcoes["max-min"] ?? 45) * 60_000;
  const tarefa = opcoes.tarefa ?? (arquivoPrompt ? String(arquivoPrompt) : "teste");

  // A mensagem vem ANTES do -f. Com o -f primeiro, o opencode trata a mensagem
  // como caminho de arquivo, sai com codigo 0 e o prompt nunca chega ao modelo
  // (regra 38). Mantida simples de proposito: sem aspas, sem cifrao, sem acento,
  // porque no Windows argumento com esses caracteres corrompe em silencio.
  const mensagem = String(opcoes.msg ?? "Execute a tarefa descrita no arquivo anexado.").replace(
    /["'`$]/g,
    "",
  );

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const inicio = new Date().toISOString();

  abrirEntrada({
    id,
    modelo: modelo ?? "cmd-de-teste",
    tarefa,
    sandbox: diretorio,
    inicio,
    fim: null,
    desfecho: "running",
    detalhe: null,
  });

  // O prompt vai para DENTRO do sandbox antes de comecar. Arquivo fora dele e
  // leitura fora da parede: o agente pede permissao, o opencode recusa sozinho,
  // e a delegacao sai com codigo 0 sem escrever um byte. Verificado em
  // 24/08/2026, no primeiro smoke test deste harness — o vigia acusou
  // falso_sucesso e o motivo real era este.
  let promptNoSandbox = arquivoPrompt;
  if (arquivoPrompt) {
    promptNoSandbox = join(diretorio, "TAREFA-DELEGADA.md");
    copyFileSync(arquivoPrompt, promptNoSandbox);
  }

  const comando = opcoes.cmd
    ? String(opcoes.cmd)
    : `opencode run --dir "${diretorio}" -m ${modelo} "${mensagem}" -f "TAREFA-DELEGADA.md"`;

  console.log(`[vigia] ${id} | ${modelo ?? "cmd"} | ${tarefa}`);
  console.log(`[vigia] parado por ${paradoMs / 60000} min mata; teto de ${tetoMs / 60000} min`);

  const impressaoInicial = tirarImpressao(diretorio);

  const processo = spawn(comando, {
    shell: true,
    stdio: "inherit",
    detached: process.platform !== "win32",
  });

  let terminou = false;
  let codigoSaida = null;
  processo.on("exit", (codigo) => {
    terminou = true;
    codigoSaida = codigo;
  });

  let impressao = impressaoInicial;
  let ultimoByte = Date.now();
  const comecou = Date.now();

  function encerrar(desfecho, detalhe, codigo) {
    if (!terminou) matarArvore(processo);
    fecharEntrada(id, desfecho, detalhe);
    console.log(`\n[vigia] ${desfecho.toUpperCase()}: ${detalhe}`);
    const resumo = resumoDoDiff(diretorio);
    if (resumo) console.log(`\n${resumo}`);
    process.exit(codigo);
  }

  const passoDaImpressao = intervaloDaImpressao(paradoMs);
  let proximaImpressao = Date.now() + passoDaImpressao;

  while (!terminou) {
    await esperar(TICK_MS);
    if (terminou) break;

    if (Date.now() >= proximaImpressao) {
      proximaImpressao = Date.now() + passoDaImpressao;
      const agora = tirarImpressao(diretorio);
      if (agora !== impressao) {
        impressao = agora;
        ultimoByte = Date.now();
      }
    }

    const parado = Date.now() - ultimoByte;
    if (parado >= paradoMs) {
      encerrar("travado", `${emMinutos(parado)} sem nada de novo no sandbox`, 3);
      return;
    }
    if (Date.now() - comecou >= tetoMs) {
      encerrar("estourou_tempo", `passou do teto de ${tetoMs / 60000} min`, 4);
      return;
    }
  }

  // Terminou sozinho. Quem falhou com erro recebe o rotulo de erro, que diz mais.
  // Quem saiu bem mas nao produziu diff e o falso sucesso: sair com zero nao
  // prova nada, o que prova e o diff (regra 13).
  if (codigoSaida !== 0) {
    encerrar("erro", `saiu com codigo ${codigoSaida}`, 6);
    return;
  }
  const impressaoFinal = tirarImpressao(diretorio);
  if (impressaoFinal === impressaoInicial) {
    encerrar("falso_sucesso", "saiu com codigo 0 sem mudar um byte", 5);
    return;
  }
  encerrar("ok", "entregou diff", 0);
}

main().catch((erro) => {
  console.error(`[vigia] falha inesperada: ${erro.message}`);
  process.exit(1);
});
