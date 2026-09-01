# Aplicação determinística — sem nova investigação

Execute agora, sem nova análise e sem criar novos testes auxiliares.

1. Use sua ferramenta **Write** para SUBSTITUIR INTEGRALMENTE `quick-verify.cjs` por um novo script CommonJS curto (meta: 120–220 linhas), UTF-8 sem BOM. Não leia nem reaproveite o arquivo corrompido. Não use PowerShell, `Set-Content`, comandos inline para gerar código ou edição incremental.
2. Remova os temporários criados pela tentativa anterior: `test-root.cjs`, `test-root2.cjs`, `test-root3.cjs`, `check-root-full.cjs`, `root-content.html` e qualquer outro `test-root*`/`check-root*` que exista. Use remoção individual por caminho relativo, sem glob destrutivo.

## Algoritmo obrigatório para extrair `#root`

Implemente exatamente esta ideia dentro do novo script:

- encontre `<div id="root">` e defina `position` logo após essa tag;
- comece `depth = 1`;
- em loop, procure o próximo `<div` e o próximo `</div>` a partir de `position`;
- se não houver próximo fechamento, falhe;
- se existir uma abertura antes do fechamento, incremente `depth` e avance para depois de `>` dessa abertura;
- caso contrário, decremente `depth`; quando chegar a zero, esse fechamento é o final correspondente do root; senão avance depois de `</div>`;
- extraia do começo da tag root até esse fechamento e procure nele `Mais que um tour.` e `O ROTEIRO`.

Não use `indexOf('</div>', rootStart)` isoladamente.

## Demais validações obrigatórias

- `dist/index.html` existe;
- canonical único e exato `https://www.wlfavelatour.com.br/`;
- `og:url` único e exato;
- `og:image` único, absoluto e no domínio oficial;
- exatamente um JSON-LD; parseável; `@context` e `@graph`;
- exatamente um nó de cada tipo `TravelAgency`, `TouristTrip`, `WebSite`;
- IDs esperados: `#organizacao`, `#passeio-rocinha`, `#site`; URLs e referências oficiais coerentes;
- `TouristTrip.inLanguage` exatamente `['pt-BR', 'es']`;
- nenhuma ocorrência de `expériences` em fonte ou dist;
- robots normalizado: `User-agent: *`, `Allow: /`, linha vazia, sitemap oficial;
- sitemap com declaração/XML/urlset e exatamente um `<loc>` oficial;
- saída curta: uma linha de sucesso; erro curto e código não-zero.

## Finalização obrigatória

- `npm run build`
- `node quick-verify.cjs`
- `git diff --check`
- confirmar que `quick-verify.cjs` tem menos de 300 linhas e não começa com BOM.
- testes de mutação temporários no `dist/index.html`: canonical errado, remoção de `Mais que um tour.` e inclusão de `en` em `TouristTrip.inLanguage`; cada caso deve falhar; restaure sempre.
- rode verificador final verde.
- confirme `git status --short`: somente os quatro arquivos permitidos modificados; nenhum temporário.

Não faça deploy nem commit.
