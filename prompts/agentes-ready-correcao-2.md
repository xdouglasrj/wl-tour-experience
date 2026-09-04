# CORREÇÃO — site estático "WL Tour Experience" pronto para agentes de IA

Trabalhe SOMENTE dentro deste diretório. Não faça commit, não rode `git push`,
não instale dependência nenhuma.

O projeto é um site estático React 19 + Vite 7, publicado na Vercel. Um agente
anterior já criou quase tudo. A auditoria encontrou quatro defeitos. Conserte
os quatro, e nada além deles.

## Defeito 1 — `verify-agents.cjs` não roda (expressão regular quebrada)

```
verify-agents.cjs:18
             .replace(/<[^>]*>gi, '')
                      ^
SyntaxError: Invalid regular expression: missing /
```

Falta a barra de fechamento: o certo é `.replace(/<[^>]*>/gi, '')`. Varra o
arquivo inteiro e conserte todas as expressões regulares escritas errado do
mesmo jeito. Depois rode `node verify-agents.cjs` e faça passar de verdade. Se
alguma verificação apontar problema real em arquivo do site, conserte o arquivo
do site — não afrouxe a verificação.

## Defeito 2 — `node quick-verify.cjs` quebrou

Saída atual: `ERRO: Deve haver exatamente 1 TravelAgency`.

Motivo: o nó `#organizacao` do JSON-LD do `index.html` agora tem
`"@type": ["Organization", "TravelAgency", "LocalBusiness"]`, um array, e o
`quick-verify.cjs` supõe que `@type` é sempre string. O JSON-LD está certo; o
teste é que está desatualizado.

Atualize `quick-verify.cjs` para aceitar `@type` string **ou** array, mantendo
a intenção de cada checagem:

- a contagem de tipos conta cada tipo de um nó multi-tipo (um nó com os três
  tipos conta 1 para cada um);
- continua valendo: exatamente 1 `TravelAgency`, 1 `TouristTrip`, 1 `WebSite`;
- `graph.find(n => n['@type'] === 'TravelAgency')` precisa encontrar o nó mesmo
  com `@type` array. Escreva uma função auxiliar só, `temTipo(no, tipo)`, e use
  nos dois lugares.

Não remova, não comente e não relaxe nenhuma checagem existente. Não acrescente
checagem nova.

## Defeito 3 — `middleware.js` quebra em produção

O arquivo usa `request.nextUrl.pathname`. `nextUrl` **só existe no Next.js**.
Este projeto é Vite puro: em Edge Middleware da Vercel, `request` é um `Request`
padrão e `request.nextUrl` é `undefined`. Ler `.pathname` de `undefined` lança
`TypeError`, e o lance acontece FORA do `try`, então a home responderia erro 500
para qualquer requisição com `Accept: text/markdown`.

Conserte usando o padrão da plataforma:

```js
const { pathname } = new URL(request.url);
```

Coloque toda a lógica dentro de um `try`/`catch` que, em qualquer erro, retorna
`undefined` — o middleware nunca pode derrubar a página. Mantenha o resto do
comportamento e os cabeçalhos como estão hoje (`Content-Type: text/markdown;
charset=utf-8`, `Vary: Accept, Accept-Encoding`, `Cache-Control`, `Link`), e
mantenha o `export const config = { matcher: [...] }` com as quatro rotas.

## Defeito 4 — detalhes das páginas institucionais

Em `public/about.html`, `public/contact.html`, `public/privacy.html` e
`public/404.html`:

1. O `<title>` está duplicando a marca, por exemplo
   `Contato — WL Tour Experience | WL Tour Experience`. Cada `<title>` deve
   nomear a página uma vez só e terminar em `| WL Tour Experience`. Use:
   - `about.html`: `Sobre o guia e o passeio na Rocinha | WL Tour Experience`
   - `contact.html`: `Contato, horários e ponto de encontro | WL Tour Experience`
   - `privacy.html`: `Política de Privacidade | WL Tour Experience`
   - `404.html`: `Página não encontrada | WL Tour Experience`
2. O `public/404.html` tem `<link rel="canonical" href=".../404" />`. Remova
   essa linha: página de erro não tem canonical. O
   `<meta name="robots" content="noindex, follow" />` continua.

Não mude mais nada nessas páginas: o texto delas é a versão HTML dos arquivos
de `public/md/` e precisa continuar igual.

## O que NÃO tocar

`src/`, `package.json`, `vite.config.js`, `tailwind.config.cjs`,
`scripts/prerender.mjs`, `docs/`, `tarefas.md`, `public/llms.txt`,
`public/md/*`, `public/pagina.css`, `vercel.json`, `public/sitemap.xml`,
`public/robots.txt`, e todo o `index.html`.

## PRONTO QUANDO

Estes três comandos rodam limpos, na raiz deste diretório:

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

No relatório final, cole a saída literal dos três comandos.
