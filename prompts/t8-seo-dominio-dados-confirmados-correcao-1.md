# Correção 1 — SEO técnico independente do Gmail

Continue na mesma worktree e corrija somente os defeitos abaixo. Não faça
commit, push ou deploy. Mantenha a fronteira original: `index.html`,
`public/robots.txt`, `public/sitemap.xml`, `quick-verify.cjs` e `src/App.js`
somente se indispensável. Não toque em outros arquivos.

## Reprovações confirmadas

1. Em `index.html`, a descrição do `TravelAgency` contém `expériences`, grafia
   incorreta em português. Use `experiências`.
2. O `TouristTrip.inLanguage` ainda contém `en`, embora a especificação proíba
   publicar condução do passeio em inglês enquanto isso está pendente. Mantenha
   no passeio somente `pt-BR` e `es`. A organização pode manter inglês em
   `availableLanguage`, pois o atendimento por WhatsApp em inglês foi confirmado.
3. `quick-verify.cjs` não prova vários critérios que diz cobrir:
   - não confirma o valor exato do canonical;
   - não confirma `og:url` e `og:image` exatos;
   - não confirma que todos os `@id`, `url`, `image` e referências internas do
     JSON-LD usam o domínio oficial;
   - considera prerenderização válida apenas porque `WL Tour Experience` aparece,
     mas essa string também existe no `<head>`.

## Correção do verificador

- Faça a checagem de canonical, `og:url` e `og:image` contra os valores oficiais.
- Analise o JSON-LD já convertido por `JSON.parse` e confirme que a organização,
  o site e o passeio existem, usam IDs oficiais e que `TouristTrip.inLanguage`
  não contém inglês.
- Para prerenderização, confirme conteúdo que só existe dentro de
  `<div id="root">`, incluindo `Mais que um tour.` e `O ROTEIRO`.
- Preserve a verificação estática sem dependência do Playwright.
- Remova comentários narrativos óbvios e variáveis sem uso.
- Preserve uma instrução por linha e o estilo existente.

## Verificação obrigatória

1. `npm run build`
2. `node quick-verify.cjs`
3. `git diff --check`

No relatório, informe exatamente o que foi corrigido e o resultado dos três
comandos.
