Crie UM arquivo novo: `scripts/test-middleware.mjs`. Nenhum outro arquivo pode
mudar. Nenhum commit.

## O que testar

O `middleware.js` da raiz exporta `config` e uma função `default`
`middleware(request)`. Ela faz negociação de conteúdo por `Accept`.

O teste importa o middleware de verdade (`import middleware, { config } from
"../middleware.js"`), substitui `globalThis.fetch` por uma função falsa que
devolve o conteúdo de `public/md/<arquivo>` lido do disco (e uma resposta com
`ok: false` quando o arquivo não existe), monta `Request` do próprio Node, chama
o middleware e confere a resposta.

## Casos, todos obrigatórios

1. `GET /` com `Accept: text/markdown` → resposta com `status` 200 e
   `Content-Type: text/markdown; charset=utf-8`; o corpo é o de
   `public/md/index.md`.
2. `GET /sobre` com `Accept: text/markdown` → status 200 e corpo de
   `public/md/about.md` (a rota em português existe por rewrite do
   `vercel.json`; não pode virar 404).
3. `GET /nao-existe-123` com `Accept: text/markdown` → status **404**,
   `Content-Type: text/markdown; charset=utf-8`, corpo de `public/md/404.md`.
4. `GET /nao-existe-123` com `Accept: text/html` → retorno `undefined`
   (segue o fluxo normal e cai no 404 HTML).
5. `GET /` com `Accept: text/html` → retorno `undefined`.
6. `GET /pagina.css` com `Accept: text/markdown` → retorno `undefined`
   (caminho com ponto nunca vira markdown).
7. `config.matcher` casa `/nao-existe-123` e NÃO casa `/md/404.md` — teste a
   expressão do matcher com `RegExp`, convertendo o padrão da Vercel
   (`"/((?!...).*)"`) em regex ancorada.

## Convenções deste código, por extenso

- Node puro, sem framework de teste e sem dependência nova: use
  `node:assert/strict`, `node:fs`, `node:path`, `node:url`.
- Mensagens e comentários em português, como no resto do projeto.
- Ao final, imprimir `OK: N verificações` (N = número de asserções) e sair com
  código 0; em falha, deixar o `assert` lançar.
- Restaurar `globalThis.fetch` original ao terminar.
- Comentário só registra o que o código não diz. Nada de raciocínio pessoal.

## Pronto quando

`node scripts/test-middleware.mjs` imprime `OK: N verificações` e sai com 0, e
`git status --porcelain` mostra apenas o arquivo novo.

## Proibido

Não rode `delegar.mjs`, não chame outro agente, não altere nada em `.claude/`
nem em `scripts/harness/`, não instale dependência, não faça commit.
