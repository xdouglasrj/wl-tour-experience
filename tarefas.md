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

Conferido também dentro dos painéis, em 01/09/2026, pela conta
`xdouglasdj@gmail.com`:

- **GTM:** contêiner `GTM-5B2SLVVG` na conta "WL Favela Tour", versão 2 ativa,
  publicada em 31/08. Duas tags — `GA4 - Configuração - Todas as páginas` e
  `GA4 - Eventos de contato` — e um acionador de evento personalizado,
  `Contato - WhatsApp, telefone e Instagram`. Zero alteração pendente.
- **GA4:** o tempo real registrou `whatsapp_click` 10, `instagram_click` 6 e
  `phone_click` 2, batendo exatamente com os dois testes feitos no navegador.
- **Search Console:** o sitemap na forma `www` foi enviado e já consta
  `Processado`, com 1 página e sem erro.

## Tarefas pendentes

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
- ~~Redirecionamento do apex para a forma com `www`~~ — feito em 01/09/2026,
  com sua autorização. Aplicado no domínio do projeto na Vercel, pela API, e não
  em arquivo do repositório: `redirect: www.wlfavelatour.com.br`,
  `redirectStatusCode: 308`. A Vercel emite **308**, não 301 — para o Google os
  dois valem como permanente. Conferido no ar: `https://wlfavelatour.com.br/`
  responde `308` para `https://www.wlfavelatour.com.br/`, o caminho é
  preservado (`/sitemap.xml` cai no `/sitemap.xml` do `www`), e o `www`
  continua `200`.
- Deploy, hospedagem, domínio e DNS.
- Qualquer credencial, chave de API ou configuração em provedor externo.

### H2. Aceite do convite do Google Tag Manager

Conferido no painel em 01/09/2026: em Administrador > Gerenciamento de usuários
da conta, `wlfavelatour@gmail.com` consta como **Administrador** com status
**Convite pendente**. O Wallace precisa abrir o e-mail nessa caixa e aceitar.
Nada mais depende disso — o contêiner já está publicado pela conta
`xdouglasdj@gmail.com`, que tem acesso.

### H3. Quais eventos viram conversão no GA4

Marcar `whatsapp_click` como conversão é decisão de negócio, não técnica: clique
não é reserva fechada. Depende do Douglas dizer o que conta como conversão.

### H4. Dados públicos que faltam do cliente

Categoria, dias e horários e descrição para o Perfil da Empresa no Google. O
`docs/DADOS-DO-CLIENTE.md` registra que o Wallace não respondeu esses três — só
mandou o telefone. Sem isso o S6 não sai do lugar.
