# Correção 2 — auditoria SEO técnico independente do Gmail

Trabalhe somente na branch/worktree atual e corrija os defeitos abaixo. Preserve o escopo permitido: `index.html`, `public/robots.txt`, `public/sitemap.xml`, `quick-verify.cjs` e, somente se indispensável, `src/App.js`.

## Correções obrigatórias

1. Em `index.html`, troque a palavra francesa `expériences` por `experiências`. Para evitar problemas de codificação, faça a substituição com Node e escapes Unicode (`exp\u00e9riences` → `experi\u00eancias`) ou por edição segura equivalente.
2. Remova do `quick-verify.cjs` todos os `console.log` de depuração que despejam objetos/matches. A saída normal deve ser curta.
3. Mantenha o verificador simples, mas valide de verdade:
   - canonical único e exatamente `https://www.wlfavelatour.com.br/`;
   - `og:url` único e exatamente a URL oficial;
   - `og:image` único, absoluto e no domínio oficial;
   - JSON-LD parseável, com `@context`, `@graph` e exatamente um nó `TravelAgency`, um `TouristTrip` e um `WebSite`;
   - `@id` e URLs oficiais desses nós;
   - `TouristTrip.inLanguage` exatamente `pt-BR` e `es`, sem `en`;
   - o conteúdo estruturado não contém `expériences`;
   - `robots.txt` normalizado sem diretivas conflitantes e apontando somente para o sitemap oficial;
   - sitemap XML com exatamente um `<loc>`, a URL oficial, sem URL antiga, preview ou entrada extra;
   - o conteúdo principal pré-renderizado deve ser procurado dentro de `<div id="root">`, usando textos exclusivos do corpo (`Mais que um tour.` e `O ROTEIRO`), nunca texto que também possa existir no `<head>`.
4. Não altere fatos pendentes. Inglês pode permanecer apenas em `TravelAgency.availableLanguage`, pois o atendimento por WhatsApp em inglês foi confirmado. Não inclua inglês em `TouristTrip.inLanguage`.
5. Se possível, preserve uma formatação legível e um diff enxuto no JSON-LD.

## Validação obrigatória

Rode:

- `npm run build`
- `node quick-verify.cjs`
- `git diff --check`

Além disso, execute testes de mutação no `dist` gerado, sempre fazendo backup e restaurando ao final:

1. altere o canonical e prove que `node quick-verify.cjs` termina com código diferente de zero;
2. remova um dos textos obrigatórios de dentro de `#root` e prove que termina com código diferente de zero;
3. acrescente `en` ao `TouristTrip.inLanguage` e prove que termina com código diferente de zero;
4. restaure tudo e prove que o verificador final passa.

Não deixe arquivos temporários, não faça deploy e não altere arquivos fora do escopo.
