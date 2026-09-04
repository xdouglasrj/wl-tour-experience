# Retomada — 04/09/2026

## Última parte concluída

Preparação do site para agentes de IA (auditoria "Is Agentic", 69/100).
Três commits em `main`, ainda **sem push**:

- `b082f6f` — páginas institucionais, 404 com corpo markdown, llms.txt,
  versões markdown, negociação por `Accept`, `vercel.json`, `verify-agents.cjs`
- `e083a69` — links de `/about`, `/contact` e `/privacy` no rodapé da home
- `a4a0fee` — `address`, `founder`, `legalName` e `foundingDate` no nó
  `Organization` do JSON-LD, e verificação apertada

## Baseline de testes (04/09/2026)

- `node quick-verify.cjs` → `OK: Todas as validações passaram`
- `node verify-agents.cjs` → `OK: 36 verificações` (arquivo novo desta tarefa)
- `npm run build` → verde

O `quick-verify.cjs` foi atualizado nesta tarefa: passou a aceitar `@type` em
array, e as expectativas de `robots.txt` (linha do llms.txt) e de `sitemap.xml`
(4 `<loc>` em vez de 1) acompanharam a mudança de comportamento.

## O que foi verificado, e como

- Páginas `/about`, `/contact`, `/privacy` e `/404.html` abertas no navegador em
  `vite preview`: renderizam com a identidade do site, texto completo, títulos
  próprios.
- Clique real no rodapé da home → abriu a página Sobre.
- `middleware.js` testado em Node com `fetch` de mentira: devolve markdown com
  `Vary: Accept, Accept-Encoding` quando o `Accept` pede, e `undefined` nos
  outros três casos.
- Mutação em quatro pontos (tipo `Organization`, `Vary` do `vercel.json`,
  `text/markdown` do middleware, `address` do JSON-LD): o `verify-agents.cjs`
  caiu nos quatro.

## Próximo passo

1. **Push do `main`** — depende de autorização do Douglas.
2. Depois do deploy, conferir no site publicado (o `vite preview` não reproduz
   a Vercel):
   - `curl -s -o /dev/null -w "%{http_code}" https://www.wlfavelatour.com.br/rota-inexistente` → 404
   - `curl -sI -H "Accept: text/markdown" https://www.wlfavelatour.com.br/` →
     `content-type: text/markdown` e `vary: Accept, Accept-Encoding`
   - `/about`, `/contact`, `/privacy`, `/sobre`, `/contato`, `/privacidade` → 200
3. Reenviar o site ao auditor "Is Agentic" e comparar a nota.

## Pendente com o dono (não dá para resolver aqui)

- **Descoberta pela marca**: "WL Tour Experience" não traz o domínio na busca.
  Depende da verificação do Perfil da Empresa no Google (falta endereço de
  correspondência do titular) e de citações externas com NAP igual.
  Quando o perfil for verificado, entra a URL dele no `sameAs` do JSON-LD.
- **Endereço no JSON-LD**: o `PostalAddress` traz só cidade, estado e país. Não
  tem CEP nem logradouro porque a empresa é de área de serviço e não tem
  endereço público. Se o cliente quiser publicar um, ele informa.

