# Retomada — 04/09/2026 (tarde)

## Última parte concluída

Fechados os dois pontos que faltavam da auditoria "Is Agentic" (95/100):
404 amigável a agentes e nomes alternativos da marca.

Commits em `main`, ainda **sem push**:

- `e519a46` — merge: 404 em markdown (`middleware.js` + `scripts/test-middleware.mjs`)
- `669b51a` — prompts da tarefa
- `551e873` — merge: `alternateName` no JSON-LD
- último — prompt dos nomes alternativos

## O que mudou

- `middleware.js`: matcher passou a cobrir qualquer caminho sem extensão.
  Caminho fora do mapa com `Accept: text/markdown` recebe `/md/404.md` com
  status **404** e `Content-Type: text/markdown`. As rotas em português
  (`/sobre`, `/contato`, `/privacidade`), que existem por rewrite do
  `vercel.json`, entraram no mapa para não caírem no ramo do 404.
- `index.html`: `alternateName` no nó `Organization` — "WL Favela Tour",
  "WL Rocinha Tour", "Tour na Favela Rocinha".

## Baseline de testes (04/09/2026)

- `node quick-verify.cjs` → `OK: Todas as validações passaram`
- `node verify-agents.cjs` → `OK: 36 verificações`
- `node scripts/test-middleware.mjs` → `OK: 13 verificações` (novo)
- `npm run build` → verde

Mutação conferida duas vezes no teste novo: trocar `status: 404` por `200` e
remover a chave `/sobre` derrubam o teste.

## Verificado clicando

`vercel dev` na porta 3999, no worktree da tarefa. Medido com `curl`:
`/` e `/sobre` em markdown → 200; `/nao-existe-123` e `/outra/coisa` em
markdown → 404 `text/markdown` com o corpo de `/md/404.md`; em HTML seguem o
fluxo normal.

## Próximo passo

**Push pendente de autorização do Douglas.** Enquanto não subir, o site no ar
continua devolvendo HTML no 404 mesmo para quem pede markdown.

## Pendências que não são de código

O item "Brand name discoverability" da auditoria não se resolve no site: exige
Perfil da Empresa no Google, citações com NAP consistente e menções externas
apontando para o domínio. É o D4/D5 do `tarefas.md`.

## Sujeira conhecida

`_descartavel/wt-404md/` ficou no disco (o Windows travou a pasta durante a
remoção do worktree). O worktree já foi removido do git; sobrou só a pasta.
