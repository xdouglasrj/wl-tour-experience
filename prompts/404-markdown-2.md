Correção na mesma tarefa. Continua valendo: só `middleware.js` pode mudar,
nenhum commit.

Defeito encontrado na auditoria do seu diff: o `vercel.json` tem rewrites de
`/sobre` → `/about`, `/contato` → `/contact` e `/privacidade` → `/privacy`.
O middleware roda ANTES do rewrite, então `/sobre` chega ao seu código como
pathname `/sobre`, não está no `pathMap`, e cai no ramo novo: passaria a
responder 404 markdown numa página que existe.

Corrija acrescentando ao `pathMap` as três chaves em português, apontando para
os mesmos arquivos markdown:

- `/sobre` → `/md/about.md`
- `/contato` → `/md/contact.md`
- `/privacidade` → `/md/privacy.md`

Nada mais muda. Pronto quando `node --check middleware.js` sai limpo e
`git diff --stat` mostra só `middleware.js`.
