# Aprendizado do projeto — WL Tour Experience

Entradas nascem de coisa que custou: defeito que enganou, suposição que se
provou errada. O que o código já diz sozinho não entra aqui.

## Edge Middleware da Vercel neste projeto não é Next.js (04/09/2026)

**O que aconteceu.** O primeiro `middleware.js` entregue lia
`request.nextUrl.pathname`. O código parecia certo e o build passava.

**Por que enganou.** `nextUrl` só existe no `NextRequest` do Next.js. Este site
é Vite puro: no Edge Middleware da Vercel o argumento é um `Request` padrão, e
`request.nextUrl` é `undefined`. Ler `.pathname` de `undefined` lança
`TypeError` — e o lance estava fora do `try`, então a home responderia 500 para
qualquer requisição com `Accept: text/markdown`. Nenhum teste local pega isso:
`npm run build` não executa o middleware, e `vite preview` não o carrega.

**O que fazer da próxima vez.** Em middleware deste projeto, o caminho sai de
`new URL(request.url).pathname`. E middleware novo se testa importando a função
em Node com um `fetch` de mentira, cobrindo os quatro casos: markdown pedido,
markdown não pedido, `fetch` que falha, e rota fora do mapa.

## Teste que procura string solta no HTML aceita o campo ausente (04/09/2026)

**O que aconteceu.** O `verify-agents.cjs` afirmava que o nó `Organization` do
JSON-LD tinha `address` do tipo `PostalAddress`. Tinha não: o campo nunca foi
escrito. A verificação passava porque aceitava também o `PostalAddress` que já
existia aninhado dentro de `areaServed`.

**Por que enganou.** A verificação olhava o JSON-LD inteiro em vez do nó. Deu
`OK` num arquivo com o campo faltando — o pior tipo de teste, o que ocupa o
lugar da desconfiança.

**O que fazer da próxima vez.** Verificação de JSON-LD navega o objeto já
parseado, a partir do nó certo, campo por campo. E toda verificação nova é
provada por mutação: apagar o campo, ver o teste cair, devolver o campo.

## `vite preview` não reproduz o roteamento da Vercel (04/09/2026)

`cleanUrls`, `rewrites`, `headers` e o status 404 são da Vercel; o
`vite preview` devolve 200 e o app para caminho desconhecido. Testar rota nova
localmente serve para conferir HTML e visual, nunca para concluir que o status
ou o cabeçalho está certo. Isso se confere no site publicado, com `curl -I`.

## Negociação por Accept precisa do `Vary` nos dois lados

A resposta em markdown do middleware e as respostas estáticas do HTML precisam
das duas do mesmo `Vary: Accept, Accept-Encoding` — a do middleware está no
próprio `new Response`, a do estático está no `vercel.json`. Faltando num dos
lados, o CDN entrega a variante que caiu primeiro no cache para quem pediu a
outra.
