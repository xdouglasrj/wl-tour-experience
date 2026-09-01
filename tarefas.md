# Tarefas

As medidas e as regras deste produto estão em `docs/PRODUTO.md`.
O método de trabalho é global, em `~/.claude/CLAUDE.md`.

## Tarefas pendentes

### Configuração de entrada no ambiente novo

### C2. Tirar do Git o que não manda em linha de código

OBJETIVO: 28 MB de prints do Playwright e 3,1 MB de backup de fonte saem do
controle de versão; o `.gitignore` passa a cobrir o que hoje entra sozinho.
ARQUIVOS: `.playwright-mcp/` (84 arquivos versionados), `.backup-src-2035/`
(6 arquivos versionados), `static/js/bundle.js` (1,5 MB, fonte já recuperado),
`index.original.html`, `Image_desktop.jpg`, `quick-verify.cjs`,
`questionario-wallace.html` da raiz (duplicado em `public/`), `.gitignore`.
REGRAS APLICÁVEIS: descartável mora em `_descartavel/` na raiz, ignorado pelo
Git; mover, nunca apagar.
CASOS DE BORDA: `public/questionario-wallace.html` é o que a Vite publica — esse
fica. O da raiz é a cópia velha.
PRONTO QUANDO: `git ls-files | wc -l` cai de 189 para menos de 80, e
`git ls-files .playwright-mcp .backup-src-2035 static` não devolve nada.
FORA DE ESCOPO: apagar arquivo do disco; tudo vai para `_descartavel/`.

### C3. Fechar os worktrees e as branches paradas

OBJETIVO: sobra só o `main` e nenhum worktree aberto fora da pasta do projeto.
ARQUIVOS: nenhum arquivo de código; `git worktree` e `git branch`.
REGRAS APLICÁVEIS: nada de um projeto nasce fora da pasta dele — três worktrees
do Traycer estão em `C:/Users/Jony/.traycer/worktrees/`.
DECISÃO DO DOUGLAS (01/09/2026): tudo que o Traycer configurou não vale mais.
Os três worktrees `traycer/*` e as três branches `traycer/*` saem — nenhuma tem
commit fora do `main`.
CASOS DE BORDA: `codex/seo-gmail-independent` e `feat/questionario-wallace` têm
3 commits cada fora do `main`. Antes de remover, conferir se esse trabalho já
entrou no `main` por outro caminho; se não entrou, é decisão do Douglas o que
fazer com ele — reportar, não decidir.
PRONTO QUANDO: `git worktree list` mostra uma linha só, a do projeto.
FORA DE ESCOPO: apagar branch com commit que ainda não está no `main`.

### C4. Prompts de delegação entram no Git

OBJETIVO: os sete prompts `t8-seo-*` deixam de ficar fora do controle de versão.
ARQUIVOS: `prompts/t8-seo-*.md`.
REGRAS APLICÁVEIS: prompt de delegação é produto do orquestrador e fica no
repositório.
CASOS DE BORDA: prompt que contenha chave, token ou dado de cliente real não
entra — sanitizar antes.
PRONTO QUANDO: `git status --short` sai vazio.
FORA DE ESCOPO: reescrever o conteúdo dos prompts.

### C6. Fechar o estado da tarefa T8 de SEO

OBJETIVO: saber o que ficou pronto e o que ficou pela metade na última rodada de
SEO, e escrever isso como tarefa ou remover da fila.
ARQUIVOS: `prompts/t8-seo-*.md`, `public/robots.txt`, `public/sitemap.xml`,
`index.html`, `scripts/prerender.mjs`.
REGRAS APLICÁVEIS: nenhuma tarefa fecha sem a página ter sido aberta no
navegador; o gate é clicar.
CASOS DE BORDA: sete prompts para a mesma tarefa, quatro deles de correção —
sinal de que a especificação estava errada, não o agente.
PRONTO QUANDO: `node scripts/prerender.mjs` roda, a página de produção abre, e
existe na fila ou uma tarefa nomeando o que falta ou a confirmação de que nada
falta.
FORA DE ESCOPO: mexer em domínio, DNS ou Vercel — é do Douglas.

## Depende do Douglas

Nenhum agente executa os itens abaixo. Eles ficam parados até o Douglas resolver pessoalmente.

### H1. Publicação

- Deploy, hospedagem, domínio e DNS.
- Envio do código para repositório externo.
- Qualquer credencial, chave de API ou configuração em provedor externo.
