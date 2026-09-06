# D3 — correção: você reformatou o JSON-LD inteiro

Mesmo worktree, mesmo único arquivo permitido: `index.html`. Nenhum outro
arquivo, nenhum commit.

## O que você fez de errado

O conteúdo está certo: o nó `Person` está correto e as referências `founder` e
`employee` estão corretas. **Mas você re-serializou o bloco JSON-LD inteiro.**
O diff ficou com 227 inserções e 172 remoções para uma mudança que deveria ter
pouco mais de 20 linhas. Todo array que estava numa linha só virou multi-linha:

```
-          "availableLanguage": ["pt-BR", "en", "es"],
+      "availableLanguage": [
+        "pt-BR",
+        "en",
+        "es"
+      ],
```

Isso é ruído: dificulta a revisão e não foi pedido.

## O que fazer

Restaure a formatação original de **tudo** que você reformatou sem necessidade e
mantenha só as três mudanças de verdade:

1. no nó da organização, `"founder"` passa de objeto literal para
   `{ "@id": "https://www.wlfavelatour.com.br/#wallace" }`;
2. no nó da organização, acrescentar `"employee"` com a mesma referência;
3. o nó `Person` novo, no fim do `@graph`.

Use `git diff -w` para conferir que só sobrou o que importa. **O alvo é
`git diff --stat` mostrando menos de 40 linhas mudadas no total.**

A forma mais segura é rodar `git checkout -- index.html` para voltar ao original
e refazer as três edições à mão, com edição pontual de texto, sem passar o JSON
por `JSON.parse`/`JSON.stringify` em nenhum momento — foi isso que destruiu a
formatação.

Arrays que estavam em uma linha continuam em uma linha. A indentação original do
arquivo é irregular de propósito em alguns trechos: preserve como está.

## Critério de pronto

1. `git diff --stat` → menos de 40 linhas mudadas
2. `node quick-verify.cjs` → `OK: Todas as validações passaram`
3. `node verify-agents.cjs` → `OK: 36 verificações`
4. `npm run build` → verde
5. O mesmo check do prompt anterior imprime `PERSON OK`

No fim, cole a saída literal de `git diff` inteiro e dos comandos acima.
