#!/usr/bin/env node
// Trava: nenhum modelo da Anthropic escreve codigo deste projeto. O Claude Code
// entende, especifica, delega, audita e testa — nao digita codigo.
//
// Diferenca para o projeto de origem: la a trava e por pasta (src/, public/,
// prisma/, tests/), porque a estrutura ja existe. Aqui a estrutura ainda nao foi
// criada (tarefa F0.2), entao a trava e por EXTENSAO — pega qualquer arquivo de
// codigo em qualquer lugar, e nao precisa ser reescrita quando a estrutura sair.
//
// Registrado como hook PreToolUse em Write|Edit|MultiEdit. Codigo 2 barra.

import { readFileSync } from "node:fs";

const EXTENSOES_DE_CODIGO = [
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".vue", ".svelte", ".dart", ".kt", ".swift", ".py", ".go", ".rs",
  ".sql", ".prisma", ".html", ".css", ".scss",
];

// Trabalho do proprio Claude Code, liberado: documentacao, fila de tarefas, o
// harness e a configuracao do .claude/. Prompt de delegacao tambem e produto daqui.
const CAMINHOS_LIBERADOS = ["/.claude/", "/scripts/harness/", "/docs/", "/prompts/"];

let entrada;
try {
  entrada = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0); // sem entrada legivel nao ha o que julgar
}

const caminho = entrada?.tool_input?.file_path;
if (typeof caminho !== "string" || caminho.length === 0) process.exit(0);

const normalizado = caminho.replace(/\\/g, "/");

if (CAMINHOS_LIBERADOS.some((livre) => normalizado.includes(livre))) process.exit(0);

const extensao = EXTENSOES_DE_CODIGO.find((ext) => normalizado.toLowerCase().endsWith(ext));
if (!extensao) process.exit(0);

console.error(
  `[trava] O Claude Code nao escreve codigo deste projeto.\n` +
    `Arquivo barrado: ${caminho}  (extensao ${extensao})\n\n` +
    `Delegue com:  node scripts/harness/delegar.mjs --dir <sandbox> --model <modelo> --prompt-file <arquivo>\n` +
    `Liberado aqui: CLAUDE.md, tarefas.md, README, docs/, prompts/, .claude/ e scripts/harness/.`,
);
process.exit(2);
