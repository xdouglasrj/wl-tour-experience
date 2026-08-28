#!/usr/bin/env node
// Check da impressao do sandbox: prova que mudanca DENTRO de uma pasta nova e
// enxergada pelo vigia. Sem `-uall` o git resume a pasta numa linha so e o vigia
// declara falso_sucesso numa entrega correta. Rode com:
//   node scripts/harness/teste-impressao-sandbox.mjs

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import assert from "node:assert/strict";

function impressao(diretorio) {
  const porcelana = execFileSync("git", ["-C", diretorio, "status", "--porcelain", "-uall"], {
    encoding: "utf8",
  });
  return porcelana
    .split("\n")
    .filter(Boolean)
    .map((linha) => linha.slice(3).trim())
    .join("|");
}

const raiz = mkdtempSync(join(tmpdir(), "vigia-"));
try {
  execFileSync("git", ["-C", raiz, "init", "-q"]);
  mkdirSync(join(raiz, "src", "agenda"), { recursive: true });
  writeFileSync(join(raiz, "src", "agenda", "a.js"), "// primeiro\n");

  const antes = impressao(raiz);
  assert.ok(antes.includes("src/agenda/a.js"), `esperava o arquivo listado, veio: ${antes}`);
  console.log("ok  arquivo dentro de pasta nova aparece na impressao");

  // O agente troca o arquivo por outro, dentro da mesma pasta nova.
  rmSync(join(raiz, "src", "agenda", "a.js"));
  writeFileSync(join(raiz, "src", "agenda", "a.ts"), "// segundo\n");

  const depois = impressao(raiz);
  assert.notStrictEqual(depois, antes, "troca de arquivo dentro da pasta nao mudou a impressao");
  console.log("ok  troca de arquivo dentro da pasta muda a impressao");

  console.log("\n2 casos, todos passaram.");
} finally {
  rmSync(raiz, { recursive: true, force: true });
}
