#!/usr/bin/env node
// Check do hook-bloqueia-codigo: prova que ele barra arquivo de codigo e deixa
// passar documento, harness e configuracao. Rode com:
//   node scripts/harness/teste-bloqueia-codigo.mjs

import { spawnSync } from "node:child_process";
import assert from "node:assert";

const HOOK = "scripts/harness/hook-bloqueia-codigo.mjs";
const RAIZ = "D:/Dev/Projeto-salao-app";

function rodar(file_path) {
  const r = spawnSync("node", [HOOK], {
    input: JSON.stringify({ tool_name: "Write", tool_input: { file_path } }),
    encoding: "utf8",
  });
  return r.status;
}

const casos = [
  ["barra .ts no backend", `${RAIZ}/backend/src/agenda.service.ts`, 2],
  ["barra .dart no app", `${RAIZ}/app/lib/tela_agenda.dart`, 2],
  ["barra migration .sql", `${RAIZ}/prisma/migrations/x/migration.sql`, 2],
  ["barra .html do site", `${RAIZ}/web/index.html`, 2],
  ["barra caminho com barra invertida", `${RAIZ}\\backend\\src\\a.ts`, 2],
  ["libera CLAUDE.md", `${RAIZ}/CLAUDE.md`, 0],
  ["libera tarefas.md", `${RAIZ}/tarefas.md`, 0],
  ["libera prompt de delegacao", `${RAIZ}/prompts/f0-2.md`, 0],
  ["libera o proprio harness", `${RAIZ}/scripts/harness/delegar.mjs`, 0],
  ["libera config do .claude", `${RAIZ}/.claude/settings.json`, 0],
];

for (const [nome, caminho, esperado] of casos) {
  const obtido = rodar(caminho);
  assert.strictEqual(obtido, esperado, `${nome}: esperava exit ${esperado}, veio ${obtido}`);
  console.log(`ok  ${nome}`);
}
console.log(`\n${casos.length} casos, todos passaram.`);
