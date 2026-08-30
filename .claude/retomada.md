# Retomada — 30/08/2026

## Última parte concluída

- Google Search Console confirmou que `https://wlfavelatour.com.br/` está no
  Google, indexada e servida por HTTPS.
- SEO técnico preparado localmente para padronizar canonical, Open Graph,
  JSON-LD, `robots.txt` e `sitemap.xml` em
  `https://www.wlfavelatour.com.br/`.
- `npm run build` e `node quick-verify.cjs` passaram.
- A versão pública ainda serve os sinais SEO sem `www`; falta deploy autorizado.

## Próxima parte

- Publicar o commit de SEO quando Douglas autorizar deploy/push.
- Depois do deploy, abrir a URL pública, `robots.txt` e `sitemap.xml` e confirmar
  que todos apontam para o domínio com `www`.

---

# Registro anterior — 27/08/2026 (noite)

## Última parte concluída

Três tarefas entregues e auditadas no navegador:

1. Mídia em cada parada do roteiro (`routeMedia` em `src/App.js`). Nove paradas
   com mídia, galeria onde havia mais de um arquivo. A parada "Outras
   experiências" ficou sem mídia por decisão do Douglas.
2. Galeria "Fotos dos nossos passeios pelo Rio": quatro fotos do cliente
   (`13`, `11`, `3`, `9`), moldura `3/4`, `object-fit: contain`, fundo `#111111`.
   Saíram as cinco imagens de banco.
3. Depoimentos: os quatro prints substituíram o texto "Depoimentos em breve".
   `@miguelfreitassjj` e `@hamzasosa` com ícone e link para o Instagram; os
   outros dois sem identificação, a pedido dos autores.

## Estado

- Servidor local de pé em `http://127.0.0.1:4173`. Para subir de novo:
  `npm run dev -- --port 4173 --strictPort`
- `node_modules/.bin/vite build` verde.
- Harness copiado do `Projeto-salao-app` para `scripts/harness/` deste projeto,
  porque não existia aqui. Os hooks NÃO estão registrados: não há
  `.claude/settings.json` nesta pasta.
- Backup do fonte antes das tarefas em `.backup-src-2037/`.

## Pendente

- Uma linha de recuo torto: `<section className="social-proof section-pad">` em
  `src/App.js` está encostada na margem. Só estética do código.
- `@miguelfreitassjj` (do print) abre um perfil indisponível; o Instagram
  redireciona para `@miguelfreitasjj`, com um "s" a menos. Falta o Douglas dizer
  qual é o certo.
- `depoimento 03.jpeg` já veio recortado da origem, com o texto colado nas
  bordas. Não é defeito da página.
- H1 — Publicação: só o Douglas.
