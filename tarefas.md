# Tarefas

As medidas e as regras deste produto estão em `docs/PRODUTO.md`.
O método de trabalho é global, em `~/.claude/CLAUDE.md`.

## Onde o projeto parou (01/09/2026)

O `main` foi publicado. O `origin` já tinha dois commits com o mesmo trabalho
de GTM e SEO, feitos por outro caminho; o `index.html` era idêntico ao local, e
os dois lados foram juntados por merge. O site no ar está em `8165b67`.

Conferido no navegador em `https://www.wlfavelatour.com.br/`, sem erro no
console: o `gtm.js?id=GTM-5B2SLVVG` responde `200`, a tag de configuração do
GA4 `G-G9SGTTXK6F` já está publicada no contêiner e manda o `page_view`, e o
`dataLayer` recebe os nove cliques da página.

Os três eventos também chegam ao GA4: os nove cliques saem num único POST em
lote para `google-analytics.com/g/collect`, com o `event_category` e o
`event_label` certos em cada um. O S3 está inteiro.

## Tarefas pendentes

### S4. Ver os eventos no painel do GA4

OBJETIVO: confirmar no painel que o GA4 aceitou e guardou o que o navegador
mandou.
ARQUIVOS: nenhum.
JÁ PROVADO fora do painel, em 01/09/2026: os nove cliques saem para
`google-analytics.com/g/collect` num POST em lote, resposta `204`, cada linha
do corpo com o `en` certo (`whatsapp_click`, `instagram_click`,
`phone_click`), `event_category: engagement` e o `event_label` da posição.
Falta só a metade que exige estar logado na conta.
CASOS DE BORDA: o `en` do GA4 viaja no **corpo** do POST, não na URL — ler só a
URL do `collect` faz parecer que nenhum evento saiu.
PRONTO QUANDO: o relatório de tempo real registra a visita e os três eventos
aparecem listados.
FORA DE ESCOPO: marcar evento como conversão — é o H3.

### S5. Enviar o sitemap no Search Console e conferir a indexação

OBJETIVO: o Google recebe o sitemap na forma oficial do domínio e começa a
indexar.
ARQUIVOS: nenhum no repositório; painel do Search Console.
REGRAS APLICÁVEIS: um domínio só — o sitemap enviado tem que ser exatamente o
mesmo endereço do `canonical`.
CASOS DE BORDA: a propriedade existente é de domínio e a página principal já
aparece indexada (inspeção de 30/08/2026), mas na forma **sem** `www`. Depois do
push, o canonical muda para `www`: conferir se o Google segue a mudança em vez
de tratar como página nova.
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
descrição pública. Ver H4.
PRONTO QUANDO: o perfil existe com os campos acima, o Wallace consta como
proprietário principal, `xdouglasdj@gmail.com` como administrador, e o estado da
verificação está registrado.
FORA DE ESCOPO: verificação por vídeo, telefone ou correspondência — é do
titular.

## Depende do Douglas

Nenhum agente executa os itens abaixo. Eles ficam parados até o Douglas resolver
pessoalmente.

### H1. Publicação

- ~~`git push` da branch `main`~~ — feito em 01/09/2026, commit `8165b67`.
- Decidir o redirecionamento de `wlfavelatour.com.br` para a forma com `www`.
  Medido em 01/09/2026: o `http` para `https` já redireciona com `308` nas duas
  formas, mas `https://wlfavelatour.com.br/` responde `200` e **não** manda para
  o `www`. As duas formas servem a mesma página, e o `canonical` das duas aponta
  para `www` — então o sinal ao Google está correto e isso não é urgente. É
  configuração de domínio na Vercel, e domínio é seu.
- Deploy, hospedagem, domínio e DNS.
- Qualquer credencial, chave de API ou configuração em provedor externo.

### H2. Aceite do convite do Google Tag Manager

O Wallace precisa abrir o e-mail do GTM em `wlfavelatour@gmail.com` e aceitar o
convite de administrador. Enquanto não aceitar, o cliente não tem acesso ao
contêiner — mas isso **não** trava o S3, que roda pela conta administradora.

### H3. Quais eventos viram conversão no GA4

Marcar `whatsapp_click` como conversão é decisão de negócio, não técnica: clique
não é reserva fechada. Depende do Douglas dizer o que conta como conversão.

### H4. Dados públicos que faltam do cliente

Categoria, dias e horários e descrição para o Perfil da Empresa no Google. O
`docs/DADOS-DO-CLIENTE.md` registra que o Wallace não respondeu esses três — só
mandou o telefone. Sem isso o S6 não sai do lugar.
