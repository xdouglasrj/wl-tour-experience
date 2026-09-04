Você vai alterar UM arquivo só: `middleware.js` na raiz deste diretório de trabalho.
Nenhum outro arquivo pode ser criado, alterado ou apagado. Não faça commit.

## Contexto

Site estático em React/Vite publicado na Vercel. O `middleware.js` é Edge
Middleware da Vercel. Hoje ele faz negociação de conteúdo: se a requisição traz
`Accept: text/markdown`, ele responde a versão markdown da página, buscando o
arquivo correspondente em `/md/*.md`. O matcher atual cobre apenas
`/`, `/about`, `/contact` e `/privacy`.

Estado medido hoje no site no ar:

- `GET /nao-existe-123` com `Accept: text/markdown` → HTTP 404, mas
  `Content-Type: text/html`. O corpo é o HTML de `public/404.html`.
- `GET /md/404.md` → HTTP 200, `text/markdown`. O arquivo já existe e já tem o
  conteúdo certo (lista de páginas, link para `/llms.txt` e `/sitemap.xml`).

## O que precisa passar a acontecer

Uma requisição para um caminho que não existe, com `Accept: text/markdown`,
deve receber o conteúdo de `/md/404.md` com **status HTTP 404** e
`Content-Type: text/markdown; charset=utf-8`.

## Como fazer

1. Ampliar o `config.matcher` para pegar qualquer caminho, EXCETO os que têm
   extensão de arquivo e as pastas de recurso. Use um matcher com lookahead
   negativo, no formato aceito pela Vercel, por exemplo:
   `"/((?!assets/|img/|md/|favicon|robots|sitemap|llms).*)"`.
   Garanta que qualquer caminho contendo um ponto (`.`) siga o fluxo normal —
   trate isso dentro da função, com `return undefined`, se o matcher não bastar.
2. Manter intacto o comportamento atual das quatro rotas conhecidas
   (`/`, `/about`, `/contact`, `/privacy`): mesmo mapeamento, mesmo status 200,
   mesmos cabeçalhos, inclusive o `Link` para `llms.txt` e o `Vary`.
3. Acrescentar o caso novo: caminho **fora** do `pathMap`, sem ponto no
   pathname, e `Accept` contendo `text/markdown` → buscar `/md/404.md` e
   devolver `new Response(conteudo, { status: 404, headers: {...} })` com
   `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept, Accept-Encoding`
   e `Cache-Control: public, max-age=0, must-revalidate`.
4. Se o fetch do `/md/404.md` falhar ou não responder ok, retornar `undefined`
   para cair no 404 HTML normal. Nada pode lançar exceção para fora da função.
5. Requisição sem `Accept: text/markdown` continua caindo no fluxo normal
   (`return undefined`), em qualquer caminho.

## Convenções deste código, por extenso

- Comentários e nomes de variáveis em português, como já está no arquivo.
- Comentário só registra o que o código não diz. Não deixe raciocínio seu, nem
  dúvida, nem "o spec não diz mas...". Isso reprova a entrega.
- Nada de abstração nova, nada de função utilitária extra, nada de dependência.
  O arquivo continua sendo um `export const config` e um `export default async
  function middleware(request)`.
- Preserve o comentário de bloco no fim do arquivo, sobre o `Vary: Accept`.

## Pronto quando

- `node --check middleware.js` sai sem erro.
- `git diff --stat` mostra `middleware.js` e mais nada.
- Lendo o código, os cinco pontos acima estão cobertos.

## Fora de escopo

`public/404.html`, `public/md/404.md`, `vercel.json`, qualquer arquivo em `src/`,
testes, README, e qualquer commit.
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

## AVISO DA AUDITORIA (leia antes de editar)

Sua última edição APAGOU o trabalho anterior: o `matcher` voltou ao original,
o ramo do 404 sumiu, e a indentação do `pathMap` ficou quebrada. O arquivo hoje
está no estado ORIGINAL, só com as três chaves em português no `pathMap`.

Refaça as duas coisas de uma vez, no arquivo como ele está agora:

1. o matcher amplo e o ramo do 404 markdown (bloco "Como fazer", itens 1 a 5);
2. mantendo as sete chaves do `pathMap` já presentes;
3. corrigindo a indentação do `pathMap` para o padrão do arquivo (2 espaços por
   nível, alinhado ao `const` dentro do `if`).
