# Recuperar e concluir verificador SEO

O executor anterior corrompeu `quick-verify.cjs` com uma edição PowerShell: ele está enorme, contém BOM e possui erro de sintaxe. Não tente consertá-lo incrementalmente. Reescreva `quick-verify.cjs` por completo como um script CommonJS curto, legível e UTF-8 sem BOM.

Use somente o diretório atual e caminhos relativos. Não use PowerShell `Set-Content`, não use caminhos absolutos e não altere arquivos fora de: `index.html`, `public/robots.txt`, `public/sitemap.xml`, `quick-verify.cjs`.

## Estado a preservar

- `index.html` já contém a correção `experiências` no lugar de `expériences`; confirme e preserve.
- canonical, `og:url`, `og:image`, JSON-LD, robots e sitemap já apontam para `https://www.wlfavelatour.com.br/`.
- `TouristTrip.inLanguage` deve continuar exatamente `pt-BR` e `es`, sem `en`.
- `TravelAgency.availableLanguage` pode conter `pt-BR`, `en`, `es` porque atendimento em inglês foi confirmado.

## O novo `quick-verify.cjs` deve validar

1. `dist/index.html` existe.
2. canonical aparece exatamente uma vez e vale `https://www.wlfavelatour.com.br/`.
3. `og:url` aparece exatamente uma vez e tem a URL oficial.
4. `og:image` aparece exatamente uma vez, é absoluto e começa por `https://www.wlfavelatour.com.br/`.
5. Há exatamente um bloco JSON-LD, parseável, com `@context: https://schema.org` e `@graph`.
6. O grafo tem exatamente um `TravelAgency`, um `TouristTrip` e um `WebSite`; valide seus `@id`, URLs oficiais e referências principais.
7. `TouristTrip.inLanguage` é exatamente `['pt-BR', 'es']` e não contém `en`.
8. Nem fonte nem dist contêm a palavra francesa `expériences`.
9. `public/robots.txt` tem conteúdo normalizado equivalente a quatro linhas: `User-agent: *`, `Allow: /`, linha vazia, `Sitemap: https://www.wlfavelatour.com.br/sitemap.xml`; nenhuma diretiva conflitante.
10. `public/sitemap.xml` é XML básico válido para este caso, possui exatamente um `<loc>` e ele é `https://www.wlfavelatour.com.br/`, sem URL extra/preview/antiga.
11. Dentro do conteúdo de `<div id="root">` do dist aparecem `Mais que um tour.` e `O ROTEIRO`; a busca não pode passar por texto apenas no `<head>`.
12. O script termina não-zero com mensagem curta no erro e imprime apenas uma linha curta no sucesso.

## Testes obrigatórios

- `npm run build`
- `node quick-verify.cjs`
- `git diff --check`
- confirmar por Node que `quick-verify.cjs` não começa com bytes BOM.

Faça três mutações temporárias em `dist/index.html`, com backup e restauração garantida:

- canonical incorreto deve falhar;
- remover `Mais que um tour.` de dentro do root deve falhar;
- acrescentar `en` ao `TouristTrip.inLanguage` deve falhar.

Após restaurar, rode novamente o verificador e confirme sucesso. Não deixe arquivos temporários, não faça deploy e não faça commit.
