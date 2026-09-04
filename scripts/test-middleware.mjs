import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import middleware, { config } from "../middleware.js";

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
const raizProjeto = path.resolve(diretorioAtual, "..");
const fetchOriginal = globalThis.fetch;
let verificacoes = 0;

function verificar(valorAtual, valorEsperado, mensagem) {
  assert.equal(valorAtual, valorEsperado, mensagem);
  verificacoes += 1;
}

async function lerMarkdown(nomeArquivo) {
  return readFile(path.join(raizProjeto, "public", "md", nomeArquivo), "utf8");
}

async function requisitar(caminho, accept) {
  const request = new Request(`https://www.wlfavelatour.com.br${caminho}`, {
    method: "GET",
    headers: { Accept: accept }
  });

  return middleware(request);
}

globalThis.fetch = async (entrada) => {
  const url = new URL(entrada);
  const caminhoRelativo = url.pathname.replace(/^\/md\//, "");
  const caminhoArquivo = path.join(raizProjeto, "public", "md", caminhoRelativo);

  try {
    return new Response(await readFile(caminhoArquivo, "utf8"), { status: 200 });
  } catch (erro) {
    if (erro?.code === "ENOENT") {
      return new Response("", { status: 404 });
    }

    throw erro;
  }
};

try {
  const paginaInicial = await requisitar("/", "text/markdown");
  verificar(paginaInicial.status, 200, "A página inicial deve responder com status 200");
  verificar(
    paginaInicial.headers.get("Content-Type"),
    "text/markdown; charset=utf-8",
    "A página inicial deve responder como markdown"
  );
  verificar(
    await paginaInicial.text(),
    await lerMarkdown("index.md"),
    "A página inicial deve usar public/md/index.md"
  );

  const paginaSobre = await requisitar("/sobre", "text/markdown");
  verificar(paginaSobre.status, 200, "A rota /sobre deve responder com status 200");
  verificar(
    await paginaSobre.text(),
    await lerMarkdown("about.md"),
    "A rota /sobre deve usar public/md/about.md"
  );

  const paginaInexistente = await requisitar("/nao-existe-123", "text/markdown");
  verificar(paginaInexistente.status, 404, "A rota inexistente deve responder com status 404");
  verificar(
    paginaInexistente.headers.get("Content-Type"),
    "text/markdown; charset=utf-8",
    "A rota inexistente deve responder como markdown"
  );
  verificar(
    await paginaInexistente.text(),
    await lerMarkdown("404.md"),
    "A rota inexistente deve usar public/md/404.md"
  );

  verificar(
    await requisitar("/nao-existe-123", "text/html"),
    undefined,
    "A rota inexistente em HTML deve seguir o fluxo normal"
  );
  verificar(
    await requisitar("/", "text/html"),
    undefined,
    "A página inicial em HTML deve seguir o fluxo normal"
  );
  verificar(
    await requisitar("/pagina.css", "text/markdown"),
    undefined,
    "Um caminho com ponto não deve virar markdown"
  );

  const matcher = new RegExp(`^${config.matcher[0]}$`);
  verificar(matcher.test("/nao-existe-123"), true, "O matcher deve aceitar uma rota inexistente");
  verificar(matcher.test("/md/404.md"), false, "O matcher não deve aceitar arquivos em /md");

  console.log(`OK: ${verificacoes} verificações`);
} finally {
  globalThis.fetch = fetchOriginal;
}
