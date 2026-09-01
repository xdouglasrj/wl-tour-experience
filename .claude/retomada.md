# Retomada — 27/08/2026 (noite)

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
- `@miguelfreitasjj` (um "s") confirmado pelo Douglas em 01/09/2026 como o perfil
  certo do depoimento 01. O `src/App.js` já estava com esse valor: nada a corrigir.
- `depoimento 03.jpeg` já veio recortado da origem, com o texto colado nas
  bordas. Não é defeito da página.
- H1 — Publicação: só o Douglas.
