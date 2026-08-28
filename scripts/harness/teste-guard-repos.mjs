#!/usr/bin/env node
// Check do guard-repos-originais: prova que ele bloqueia escrita no repositorio
// original e deixa passar leitura e mencao em texto. Rode com:
//   node scripts/harness/teste-guard-repos.mjs

import { spawnSync } from "node:child_process";
import assert from "node:assert";

const HOOK = ".claude/hooks/guard-repos-originais.js";
const ORIGINAL = ["..", "cardapio-api", "src", "index.ts"].join("/");

function rodar(entrada) {
  const r = spawnSync("node", [HOOK], { input: JSON.stringify(entrada), encoding: "utf8" });
  return r.status;
}

const casos = [
  ["escrita no original bloqueia", { tool_name: "Bash", tool_input: { command: `sed -i s/a/b/ ${ORIGINAL}` } }, 2],
  ["leitura do original passa", { tool_name: "Bash", tool_input: { command: `cat ${ORIGINAL}` } }, 0],
  ["mencao em texto passa", { tool_name: "Bash", tool_input: { command: "echo texto sobre cardapio-api > docs/x.md" } }, 0],
  ["Write no original bloqueia", { tool_name: "Write", tool_input: { file_path: "D:/Dev/cardapio-api/src/a.ts" } }, 2],
  ["Write neste projeto passa", { tool_name: "Write", tool_input: { file_path: "D:/Dev/Projeto-salao-app/src/a.ts" } }, 0],
  // Casos novos da F7.4: o guard olha o DESTINO da escrita, nao a mencao do caminho.
  [
    "caminho citado em heredoc passa",
    {
      tool_name: "Bash",
      tool_input: {
        command: `cat > tarefas.md <<FIM\nreaproveitar de ${ORIGINAL}\nFIM`,
      },
    },
    0,
  ],
  [
    "caminho citado em string passa",
    { tool_name: "Bash", tool_input: { command: `echo "ver ${ORIGINAL}" >> tarefas.md` } },
    0,
  ],
  [
    "escrita real por caminho relativo bloqueia",
    { tool_name: "Bash", tool_input: { command: `tee ${ORIGINAL}` } },
    2,
  ],
  [
    "redirecionamento para o original bloqueia",
    { tool_name: "Bash", tool_input: { command: "echo x > ../deliverybot-whatsapp-api/a.js" } },
    2,
  ],
  [
    "git add no original bloqueia",
    { tool_name: "Bash", tool_input: { command: `git add ${ORIGINAL}` } },
    2,
  ],
  [
    "prefixo parecido passa",
    { tool_name: "Write", tool_input: { file_path: "D:/Dev/cardapio-api-2/src/a.ts" } },
    0,
  ],
  [
    "prefixo parecido em Bash passa",
    { tool_name: "Bash", tool_input: { command: "tee ../cardapio-api-2/src/a.ts" } },
    0,
  ],
];

for (const [nome, entrada, esperado] of casos) {
  const obtido = rodar(entrada);
  assert.strictEqual(obtido, esperado, `${nome}: esperava exit ${esperado}, veio ${obtido}`);
  console.log(`ok  ${nome}`);
}
console.log(`\n${casos.length} casos, todos passaram.`);
