# Tarefas

As medidas e as regras deste produto estão em `docs/PRODUTO.md`.
O método de trabalho é global, em `~/.claude/CLAUDE.md`.

## O achado que muda a fila (01/09/2026)

O GTM `GTM-5B2SLVVG` e os eventos do GA4 **já foram escritos**, mas estão presos
na branch `codex/seo-gmail-independent`, que nunca entrou no `main`. Como a
Vercel publica o `main`, nada disso está no ar. A mesma branch carrega a
padronização do domínio para `https://www.wlfavelatour.com.br/`; o `main` de
hoje ainda aponta `canonical`, `og:url`, `robots.txt` e `sitemap.xml` para a
forma **sem** `www`.

Ou seja: o trabalho existe, só não foi publicado. A fila abaixo começa por isso.

## Tarefas pendentes

### S1. Trazer o trabalho de SEO e GTM da branch para o `main`

OBJETIVO: o `main` passa a ter o GTM instalado, os eventos indo para o
`dataLayer` e todos os sinais de indexação apontando para
`https://www.wlfavelatour.com.br/`.
ARQUIVOS: trazer da branch `codex/seo-gmail-independent` somente
`index.html`, `src/App.js`, `public/robots.txt`, `public/sitemap.xml`,
`quick-verify.cjs` e `docs/DADOS-DO-CLIENTE.md`.
REGRAS APLICÁVEIS: nenhum texto de venda, cor, foto, botão ou ordem de seção
muda; as medidas de `docs/PRODUTO.md` continuam valendo.
CASOS DE BORDA: a branch é anterior à limpeza de hoje — ela ainda tem
`CLAUDE.md`, o `tarefas.md` velho e **não** tem `docs/PRODUTO.md`. Um `merge`
cru desfaz a organização feita hoje. Trazer arquivo por arquivo, nunca a branch
inteira. O `.claude/delegacoes.jsonl` e o `.claude/retomada.md` da branch também
ficam de fora.
PRONTO QUANDO: `grep -c GTM-5B2SLVVG index.html` devolve `2` (script e
noscript); `grep -c "www.wlfavelatour.com.br" index.html public/robots.txt
public/sitemap.xml` não devolve zero em nenhum dos três; `npm run build` verde;
`node quick-verify.cjs` passa; a página abre em `390 px` e em desktop sem erro
no console.
FORA DE ESCOPO: `git push` e deploy — é do Douglas.

### S2. Conferir no site publicado que o GTM carrega

OBJETIVO: provar que o contêiner carrega no domínio de verdade, não só no build
local.
ARQUIVOS: nenhum. É verificação no navegador.
REGRAS APLICÁVEIS: o gate é abrir e clicar; build verde convive com tag morta.
CASOS DE BORDA: `www` e sem `www` são dois endereços — conferir nos dois qual
responde e se um redireciona para o outro.
PRONTO QUANDO: abrindo `https://www.wlfavelatour.com.br/`, a aba de rede mostra
a requisição para `googletagmanager.com/gtm.js?id=GTM-5B2SLVVG` com resposta
`200`, e `window.dataLayer` existe no console.
FORA DE ESCOPO: publicar. Esta tarefa só roda depois que o Douglas subir o S1.

### S3. Criar e publicar a tag do GA4 dentro do GTM

OBJETIVO: o contêiner `GTM-5B2SLVVG` dispara a tag Google com o ID
`G-G9SGTTXK6F` em todas as páginas, e os três eventos do site viram evento no
GA4.
ARQUIVOS: nenhum arquivo do repositório. O trabalho é no painel do GTM.
REGRAS APLICÁVEIS: o GA4 é administrado pelo GTM, para não duplicar tag; não
publicar contêiner vazio.
CASOS DE BORDA: o site empurra três eventos próprios para o `dataLayer` —
`whatsapp_click`, `instagram_click` e `phone_click`, cada um com
`event_category` e `event_label`. Cada um precisa de um acionador de evento
personalizado com o nome exato, senão a tag nunca dispara. Não existe evento de
formulário nem de e-mail nesta página: o botão principal de reserva **é** o do
WhatsApp, já coberto por `whatsapp_click`.
PRONTO QUANDO: no modo Preview do GTM, clicar no WhatsApp, no Instagram e no
telefone acende as três tags; a versão do contêiner está publicada com descrição
do que contém.
FORA DE ESCOPO: criar evento novo no site.

### S4. Confirmar o dado chegando no GA4

OBJETIVO: a visita e os três eventos aparecem no GA4, não só no Preview do GTM.
ARQUIVOS: nenhum.
REGRAS APLICÁVEIS: só se declara pronto o que foi visto chegando.
CASOS DE BORDA: o DebugView só mostra a sessão com o Preview ligado; o relatório
de tempo real mostra qualquer visita, mas demora alguns minutos.
PRONTO QUANDO: o DebugView lista `whatsapp_click`, `instagram_click` e
`phone_click` com o `event_label` certo, e o tempo real registra a visita.
FORA DE ESCOPO: marcar evento como conversão — decisão do Douglas, item H3.

### S5. Enviar o sitemap no Search Console e conferir a indexação

OBJETIVO: o Google recebe o sitemap na forma oficial do domínio e começa a
indexar.
ARQUIVOS: nenhum no repositório; painel do Search Console.
REGRAS APLICÁVEIS: um domínio só — o sitemap enviado tem que ser exatamente o
mesmo endereço do `canonical`.
CASOS DE BORDA: se a propriedade cadastrada for de prefixo de URL na forma sem
`www`, ela não cobre o `www`. Conferir qual propriedade existe antes de enviar,
e registrar a diferença em vez de criar propriedade nova por reflexo.
PRONTO QUANDO: o sitemap aparece como "Enviado" e sem erro; a inspeção da URL
oficial mostra a página como indexável.
FORA DE ESCOPO: pedir indexação de página que ainda não subiu.

### S6. Perfil da Empresa no Google

OBJETIVO: existir um perfil do WL Tour no Google, sem duplicidade e sem dado
inventado.
ARQUIVOS: nenhum.
REGRAS APLICÁVEIS: nunca criar perfil público com informação presumida; texto de
venda e dado público não se inventam.
CASOS DE BORDA: antes de criar, procurar perfil já existente no Google Search,
no Maps e no gerenciador — perfil duplicado é difícil de desfazer. O negócio
atende sem endereço público, então é empresa de área de serviço: nenhum endereço
residencial vai para o ar.
DADOS JÁ CONFIRMADOS: responsável Wallace Oliveira; telefone
`+55 21 99555-0707`; área de atendimento Rocinha, Vidigal e trilha do Morro Dois
Irmãos; ponto de encontro na saída C do metrô São Conrado; atendimento sem
endereço público; site `https://www.wlfavelatour.com.br/`.
FALTA CONFIRMAR COM O CLIENTE: categoria principal (a sugestão é
`Agência de turismo`), dias e horários que devem aparecer no perfil, e a
descrição pública. O `docs/DADOS-DO-CLIENTE.md` registra que o Wallace não
respondeu categoria, área e horário — só o telefone.
PRONTO QUANDO: o perfil existe com os campos acima, o Wallace consta como
proprietário principal, `xdouglasdj@gmail.com` como administrador, e o estado da
verificação está registrado.
FORA DE ESCOPO: verificação por vídeo, telefone ou correspondência — é do
titular.

### C2. Tirar do Git o que não manda em linha de código

OBJETIVO: 28 MB de prints do Playwright e 3,1 MB de backup de fonte saem do
controle de versão; o `.gitignore` passa a cobrir o que hoje entra sozinho.
ARQUIVOS: `.playwright-mcp/` (84 arquivos versionados), `.backup-src-2035/`
(6 arquivos versionados), `static/js/bundle.js` (1,5 MB, fonte já recuperado),
`index.original.html`, `Image_desktop.jpg`,
`questionario-wallace.html` da raiz (duplicado em `public/`), `.gitignore`.
REGRAS APLICÁVEIS: descartável mora em `_descartavel/` na raiz, ignorado pelo
Git; mover, nunca apagar.
CASOS DE BORDA: `public/questionario-wallace.html` é o que a Vite publica — esse
fica. O da raiz é a cópia velha. O `quick-verify.cjs` **fica**: é o verificador
do SEO e é usado pelo S1.
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
CASOS DE BORDA: `codex/seo-gmail-independent` só pode ser removida **depois** do
S1, senão o GTM e o SEO se perdem. A `feat/questionario-wallace` tem 3 commits
fora do `main` e o questionário já está publicado em `public/` — conferir o que
nela ainda não entrou antes de remover.
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

## Depende do Douglas

Nenhum agente executa os itens abaixo. Eles ficam parados até o Douglas resolver
pessoalmente.

### H1. Publicação

- Deploy, hospedagem, domínio e DNS.
- Envio do código para repositório externo.
- Qualquer credencial, chave de API ou configuração em provedor externo.

### H2. Aceite do convite do Google Tag Manager

O Wallace precisa abrir o e-mail do GTM em `wlfavelatour@gmail.com` e aceitar o
convite de administrador. Enquanto não aceitar, o cliente não tem acesso ao
contêiner — mas isso **não** trava o S3, que roda pela conta administradora.

### H3. Quais eventos viram conversão no GA4

Marcar `whatsapp_click` como conversão é decisão de negócio, não técnica: clique
não é reserva fechada. Depende do Douglas dizer o que conta como conversão.

### H4. Dados públicos que faltam do cliente

Categoria, dias e horários e descrição para o Perfil da Empresa no Google. Sem
isso o S6 não sai do lugar.
