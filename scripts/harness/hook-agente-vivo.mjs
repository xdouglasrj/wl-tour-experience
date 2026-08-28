#!/usr/bin/env node
// Trava de encerramento: impede a resposta de terminar com delegacao em aberto.
// Rede de seguranca embaixo do delegar.mjs, para o caso de alguem disparar um
// agente por fora dele. Em 09/08/2026 um agente travado passou despercebido por
// quase 7 horas justamente porque nada barrava o encerramento.
//
// Registrado como hook Stop. Codigo 2 barra e devolve a mensagem ao assistente.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const REGISTRO = join(RAIZ, ".claude", "delegacoes.jsonl");

if (!existsSync(REGISTRO)) process.exit(0);

let abertas = [];
try {
  abertas = readFileSync(REGISTRO, "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((linha) => JSON.parse(linha))
    .filter((entrada) => entrada.desfecho === "running");
} catch {
  // registro ilegivel nao pode travar o trabalho; a trava do delegar.mjs continua
  process.exit(0);
}

if (abertas.length === 0) process.exit(0);

const lista = abertas
  .map(
    (entrada) => `  - ${entrada.id} | ${entrada.modelo} | ${entrada.tarefa} | desde ${entrada.inicio}`,
  )
  .join("\n");

console.error(
  `[trava] Nao da para encerrar: ${abertas.length} delegacao(oes) ainda em aberto.\n${lista}\n\n` +
    `Confira com:  node scripts/harness/delegar.mjs --status\n` +
    `Se o agente ja morreu por fora, feche o registro com:  node scripts/harness/delegar.mjs --abandonar <id>`,
);
process.exit(2);
