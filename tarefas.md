# Tarefas

As medidas e as regras deste produto estão em `docs/PRODUTO.md`.
O método de trabalho é global, em `~/.claude/CLAUDE.md`.

## Onde o projeto parou (01/09/2026)

O GTM `GTM-5B2SLVVG` e os três eventos do GA4 estavam escritos, mas presos numa
branch que nunca entrou no `main` — e a Vercel publica o `main`. Isso foi
resolvido: o `main` local já tem o GTM instalado, o `track()` empurrando para o
`dataLayer` e todos os sinais de indexação em `https://www.wlfavelatour.com.br/`.

**Falta o `git push`, que é do Douglas.** Enquanto não subir, o site no ar
continua sem GTM e com os sinais na forma sem `www`.

## Tarefas pendentes

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
FORA DE ESCOPO: publicar. Esta tarefa só roda depois do push.

### S3. Criar e publicar a tag do GA4 dentro do GTM

OBJETIVO: o contêiner `GTM-5B2SLVVG` dispara a tag Google com o ID
`G-G9SGTTXK6F` em todas as páginas, e os três eventos do site viram evento no
GA4.
ARQUIVOS: nenhum arquivo do repositório. O trabalho é no painel do GTM.
REGRAS APLICÁVEIS: o GA4 é administrado pelo GTM, para não duplicar tag; não
publicar contêiner vazio.
CASOS DE BORDA: o site empurra três eventos próprios para o `dataLayer` —
`whatsapp_click`, `instagram_click` e `phone_click`, cada um com
`event_category: engagement` e um `event_label`. Cada um precisa de um acionador
de evento personalizado com o nome exato, senão a tag nunca dispara. Rótulos
medidos no navegador em 01/09/2026: `header`, `hero`, `final` e `footer` para o
WhatsApp; `instagram-section`, `footer` e `floating` para o Instagram; `final`
para o telefone. Não existe evento de formulário nem de e-mail nesta página: o
botão principal de reserva **é** o do WhatsApp.
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

- `git push` da branch `main` — três commits locais esperando, entre eles o que
  instala o GTM. Sem isso, S2, S3, S4 e S5 não saem do lugar.
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
