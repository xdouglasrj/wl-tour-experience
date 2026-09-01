# Retomada — 01/09/2026

## Última parte concluída

Push do `main` e verificação do site publicado (S2).

1. O push foi recusado por divergência: o `origin/main` já tinha dois commits
   (`a95ae15`, `33e4982`) com o mesmo trabalho de GTM e SEO, feito por outro
   caminho. Conferido antes de reconciliar: o `index.html` local e o remoto são
   byte a byte iguais. A diferença local era só apagar lixo, mover a regra do
   produto e mexer no `.claude/`.
2. Reconciliado por merge, não por força. O único conflito foi
   `.claude/retomada.md`, resolvido pela versão local.
3. `npm run build` verde e `node quick-verify.cjs` OK depois do merge.
4. Push feito: `a95ae15..8165b67`.
5. Site publicado conferido no navegador.

## O que foi medido no site no ar

Em `https://www.wlfavelatour.com.br/`, sem nenhum erro no console:

- `gtm.js?id=GTM-5B2SLVVG` responde `200`.
- A tag do GA4 `G-G9SGTTXK6F` **já existe e já está publicada** no contêiner:
  o `gtag/js?id=G-G9SGTTXK6F` carrega e o `page_view` sai para o
  `google-analytics.com/g/collect` com `204`.
- O `window.dataLayer` existe e recebe os nove cliques da página:
  `whatsapp_click` em `header`, `hero`, `final`, `footer` e `floating`;
  `instagram_click` em `instagram-section`, `footer` e `floating`;
  `phone_click` em `final`. Todos com `event_category: engagement`.

## A conclusão errada que quase entrou no relatório

Na primeira leitura pareceu que nenhum dos nove eventos chegava ao GA4: depois
dos cliques, o único `collect` cuja URL trazia `en=` era o do `page_view`.

Estava errado. O GA4 manda os eventos **em lote, no corpo do POST** — a URL não
traz `en=` nenhum. Interceptando `sendBeacon`, `fetch` e `XMLHttpRequest`, os
nove aparecem numa requisição só, cada um com `event_category: engagement` e o
`event_label` da posição. O contêiner está completo: configuração, acionadores
e tags de evento. S3 concluída.

## Estado

- `main` local e remoto no mesmo commit, `8165b67`.
- Dois endereços respondem `200` e **nenhum redireciona para o outro** —
  `wlfavelatour.com.br` e `www.wlfavelatour.com.br` servem a mesma página. O
  `canonical` e o `og:url` apontam para a forma com `www`, então o sinal para o
  Google está certo, mas o redirecionamento 301 não existe.

## Pendente

- S3: criar no GTM os três acionadores de evento personalizado e as tags de
  evento do GA4. Falta só isso; a configuração já está publicada.
- S4: confirmar no DebugView, depois do S3.
- S5: enviar o sitemap no Search Console.
- S6: travado no H4 — o Wallace não mandou categoria, horários e descrição.
- H2: o convite do GTM em `wlfavelatour@gmail.com` continua sem aceite.
- `origin` ainda tem a branch `feat/questionario-wallace`.
- Novo: decidir se entra o 301 de `wlfavelatour.com.br` para a forma com `www`.
