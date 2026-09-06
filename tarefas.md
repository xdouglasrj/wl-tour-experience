# Tarefas

As medidas e as regras deste produto estão em `docs/PRODUTO.md`.
O método de trabalho é global, em `~/.claude/CLAUDE.md`.

## Onde o projeto parou (06/09/2026)

O site no ar já traz o dado estruturado completo e a seção de perguntas
frequentes. Fechados nesta sessão, todos em `main` e ainda **sem push**:

- **D3** — nó `Person` do Wallace no `@graph`, referenciado por `founder` e
  `employee` a partir da organização. Agora existe um humano citável.
- **D8** — o preço saiu dos quatro arquivos que a IA e o buscador leem
  (`public/llms.txt`, `public/about.html`, `public/md/about.md`,
  `public/md/index.md`). O valor passa a ser informado no atendimento.
- **D2** — doze perguntas frequentes visíveis em `<details>`/`<summary>`, nos
  três idiomas, mais o nó `FAQPage` com o mesmo texto palavra por palavra.

A baseline de testes subiu de 36 para **42 verificações** no
`verify-agents.cjs`, com seis checagens novas que leem o JSON-LD já parseado.
Tudo isso já está no ar: push feito em 06/09/2026 e conferido em produção.

Fechados também, fora do código: o **D1** — as oito perguntas ao Wallace estão
respondidas e registradas em `docs/PERGUNTAS-D1.md` — e o **H2**, o convite do
Google Tag Manager, aceito por `wlfavelatour@gmail.com` em 06/09/2026.

O GTM, o GA4 e o Search Console continuam como em 01/09/2026: contêiner
`GTM-5B2SLVVG` publicado, GA4 `G-G9SGTTXK6F` recebendo os cliques, e o sitemap
na forma `www` processado sem erro.

## Objetivo do trabalho atual

Fazer o Google e os sistemas de IA entenderem **o que a WL Tour faz, quem a
opera e onde ela atende** — e responderem por ela quando alguém perguntar.

Decidido em 01/09/2026, em planejamento com o Douglas:

- Site e perfis sociais são **a mesma identidade**. Não é trabalho de ranquear o
  Instagram sozinho; é fazer o conjunto ser lido como um negócio só.
- O escopo vai até **site + Perfil da Empresa no Google + um jeito repetível de
  pedir avaliação**. Cadastro em sites de terceiros ficou de fora.
- **Nenhum preço vai ao ar.** Regra do produto, ver `docs/PRODUTO.md`.
- Para negócio local, a IA responde puxando de Perfil da Empresa, avaliações e
  terceiros — quase nada do site. Por isso o D4 e o D5 pesam mais que o resto.

## Tarefas pendentes

### D4. Perfil da Empresa no Google

ESTADO: **o perfil existe desde 02/09/2026** e está parado na verificação. O
registro completo está em `docs/DADOS-DO-CLIENTE.md`, na seção
"Perfil da Empresa no Google (D4)".

OBJETIVO: o perfil sair de "verificação obrigatória" e passar a aparecer na
Pesquisa e no Maps. **É a peça que mais pesa para busca local e para IA** — mais
do que qualquer coisa feita dentro do site.
ARQUIVOS: `index.html` (o `sameAs` da `TravelAgency`, depois que houver URL
pública) e `docs/DADOS-DO-CLIENTE.md`. Mais o painel do Perfil da Empresa.
REGRAS APLICÁVEIS: nunca criar perfil público com informação presumida; o
negócio atende sem endereço público, então é empresa de área de serviço e nenhum
endereço residencial vai para o ar.

O QUE JÁ ESTÁ PREENCHIDO: nome "WL Favela Tour" (não "WL Tour": já existe uma
empresa com esse nome em Inhaúma), categoria Agência de turismo, telefone
`+55 21 99555-0707`, área de atendimento Rocinha, Vidigal e São Conrado, site
`https://www.wlfavelatour.com.br/`, código da loja `11038970354485641720`.

O QUE TRAVA, E É DO TITULAR: o Google pede um endereço de correspondência para
liberar os métodos de verificação. O endereço **não fica público**, e caixa
postal não é aceita. É a pergunta 9 de `docs/PERGUNTAS-D1.md`.

CASOS DE BORDA: o método provável para empresa de área de serviço é **vídeo**,
não carta — a tela só diz qual depois que o endereço entra. Se cair em carta,
entrega na Rocinha é irregular e cartão que não chega significa recomeçar.

DEPOIS DA VERIFICAÇÃO, E AÍ É TRABALHO MEU: horários (todos os dias, 09:00 às
17:00), descrição do negócio, fotos, e o `sameAs` do perfil no `index.html` —
é isso que amarra site e perfil como a mesma identidade.

PRONTO QUANDO: o perfil está verificado e visível na Pesquisa, os três campos
acima estão preenchidos, e o `sameAs` aponta para a URL pública dele.
FORA DE ESCOPO: a verificação em si — vídeo, telefone ou correspondência é do
titular.

### D5. Loop de avaliação, repetível

OBJETIVO: o Wallace ter um jeito de pedir avaliação no Google ao fim de cada
passeio, sem depender de lembrar como se faz.
ARQUIVOS: `docs/` — um arquivo curto com o link e a mensagem pronta.
REGRAS APLICÁVEIS: nunca escrever avaliação, nunca sugerir texto que o turista
deva copiar, nunca oferecer nada em troca. O pedido é do Wallace para o cliente
dele.
DEPENDE DO D4: o link curto de avaliação só existe depois do perfil.
CASOS DE BORDA: a maior parte dos turistas é estrangeira — a mensagem precisa
existir nos três idiomas. O melhor momento é no fim do passeio, ainda no ponto
de encontro, não horas depois.
PRONTO QUANDO: existe o link curto de avaliação, a mensagem escrita nos três
idiomas, e o Wallace confirmou por escrito que entendeu quando e como usar.
FORA DE ESCOPO: automatizar o envio; responder avaliações.

### D6. Reconferir a indexação do `www`

OBJETIVO: confirmar que o Google trocou o canônico do apex para a forma com
`www`.
ARQUIVOS: nenhum.
CONTEXTO: em 01/09/2026 a inspeção mostrou `https://www.wlfavelatour.com.br/`
como "Página alternativa com tag canônica adequada", com o último rastreamento
de 30/08, antes do push. A indexação foi solicitada no mesmo dia, e o
redirecionamento 308 do apex entrou depois disso.
PRONTO QUANDO: a inspeção da URL com `www` diz "O URL está no Google" e o
canônico escolhido pelo Google é a forma com `www`.
FORA DE ESCOPO: pedir indexação de novo antes de uma semana — não muda a posição
na fila.

### D7. Questionário generalizado, para qualquer negócio local

OBJETIVO: transformar o questionário de 137 perguntas num instrumento
reaproveitável em cliente novo, sem as perguntas que só servem para turismo e
sem os campos que aceitam resposta pela metade.
ONDE MORA: **projeto novo**, no nicho `ferramentas`. Não fica aqui — é
ferramenta de vários clientes presa no repositório de um cliente só. Confirmar o
nome da pasta com o Douglas antes de criar.
ESTRUTURA DECIDIDA: um núcleo que serve a qualquer negócio local — identidade,
contato, área atendida, horário, Google, privacidade — mais blocos separados por
ramo, ligados conforme o cliente. As perguntas de turismo do Wallace viram o
primeiro bloco.
O DEFEITO A CONSERTAR, medido em 01/09/2026: perguntas que pedem várias coisas
num campo só. A 116 pedia quatro e recebeu uma, e o sistema contou como
respondida. **Uma pergunta, um campo, uma informação.** Varrer as 137 e quebrar
todas as que empacotam.
PRONTO QUANDO: o questionário roda com um ramo ligado e outro desligado; nenhuma
pergunta obrigatória pede mais de uma informação; e uma passada de teste
preenchendo só parte de um campo antes composto não deixa avançar.
FORA DE ESCOPO: refazer o visual da página; automatizar o retorno das respostas.
DEPOIS DE: D1 a D5. Esta é a extração do método, e só se extrai o que já rodou.

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

### H3. Quais eventos viram conversão no GA4

Marcar `whatsapp_click` como conversão é decisão de negócio, não técnica: clique
não é reserva fechada. Depende do Douglas dizer o que conta como conversão.

### H4. Três respostas menores, ainda com o Wallace

O D1 fechou em 06/09/2026: as oito perguntas estão respondidas e registradas em
`docs/PERGUNTAS-D1.md`. Sobraram três coisas menores:

1. **Endereço para o Google** (pergunta 9). Esta trava o D4, e o D5 atrás dele.
2. **Devolução na chuva.** Ele disse que avisa com pelo menos 2 dias e remarca,
   adiantando ou adiando. Não disse o que acontece se o cliente não puder na data
   nova. Sem isso, nenhuma política de cancelamento vai ao ar.
3. **Nome do funcionário** que conduz o passeio em inglês, se ele quiser que
   apareça no site.
