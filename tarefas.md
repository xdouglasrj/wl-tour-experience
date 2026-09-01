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

### D1. Pedido curto ao Wallace: o que trava tudo

OBJETIVO: obter as respostas que hoje impedem o Perfil da Empresa e a seção de
perguntas frequentes de existirem.
ARQUIVOS: `docs/DADOS-DO-CLIENTE.md` — registrar as respostas quando chegarem.
Mais nenhum.
REGRAS APLICÁVEIS: dado público não se inventa; resposta do cliente entra como
declaração dele, não como fato verificado.

POR QUE ELE NÃO RESPONDEU ANTES: o questionário de 137 perguntas marcou a 116
como obrigatória, mas ela pede quatro coisas num campo só — "categoria, área de
atendimento, telefone e horário". O Wallace escreveu o telefone, o campo ficou
preenchido, e o sistema contou como respondida. Categoria, área e horário nunca
vieram. **Não é falta de esforço do cliente; é defeito do instrumento.** Ver D7.

O QUE PERGUNTAR, UMA COISA POR PERGUNTA:

1. Qual categoria o negócio deve ter no Google? Sugestão: `Agência de turismo`.
2. Em quais dias da semana o passeio acontece?
3. De que horas a que horas, em cada um desses dias?
4. O atendimento no WhatsApp é mesmo todos os dias das 6h às 23h?
5. Escreva em duas ou três frases o que a WL Tour faz, como você falaria para um
   turista que nunca ouviu falar.
6. Com chuva, qual é a regra? Avisa com quanta antecedência, e remarca ou
   devolve o dinheiro?
7. Quem conduz o passeio em inglês? Você respondeu que conduz em português e
   espanhol, mas o site anuncia inglês também.
8. Existe idade mínima para participar?

CASOS DE BORDA: se ele responder tudo junto num texto só, quebrar na hora e
devolver o que ficou sem resposta — foi assim que a 116 passou batido. Resposta
por áudio vale, mas o registro final vira texto no `docs/DADOS-DO-CLIENTE.md`.
PRONTO QUANDO: as oito estão respondidas e escritas no
`docs/DADOS-DO-CLIENTE.md`, cada uma com a data.
FORA DE ESCOPO: as outras 34 pendências do questionário grande. Aqui é só o que
trava.

### D2. Perguntas frequentes visíveis na página

OBJETIVO: a página responder por escrito o que as pessoas perguntam antes de
reservar, e o mesmo conteúdo existir como dado estruturado `FAQPage`.
ARQUIVOS: `src/App.js` (seção nova e os três dicionários de idioma),
`index.html` (novo nó no `@graph`).
REGRAS APLICÁVEIS: **nenhum valor, em nenhum idioma, em nenhum campo** — nem
"a partir de", nem faixa. O site é trilíngue: todo texto novo entra em pt-BR, en
e es. O acabamento aprovado não muda; a seção nova segue as medidas de
`docs/PRODUTO.md`.
CONTEÚDO, só do que o Wallace já confirmou: duração de cerca de 2 horas; ponto
de encontro na saída C do metrô São Conrado, com início e fim no mesmo lugar; o
que está incluso (moto táxi, capoeira, vídeo de drone, laje para fotos); o que
não está (caipirinha e cerveja); privado ou compartilhado; quem é o guia;
pagamento ao final; formas de pagamento aceitas; quem pode participar.
DEPENDE DO D1: dias e horários, regra da chuva, idade mínima e o idioma inglês.
Enquanto não vierem, essas perguntas **não entram** — nem com texto provisório.
CASOS DE BORDA: o Google desconsidera `FAQPage` cujo texto não aparece na tela;
o dado estruturado tem que espelhar palavra por palavra o que está visível.
PRONTO QUANDO: a seção aparece nos três idiomas em 390 px e em desktop; o
`FAQPage` valida no Rich Results Test sem erro; `npm run build` verde e
`node quick-verify.cjs` passa.
FORA DE ESCOPO: preço, avaliações, depoimentos.

### D3. Dizer quem é o Wallace, para máquina

OBJETIVO: existir um `Person` no dado estruturado, ligado à organização como
fundador e guia. É o que dá à IA um humano para citar.
ARQUIVOS: `index.html` — novo nó no `@graph` e referência a partir da
`TravelAgency`.
REGRAS APLICÁVEIS: só fato já autorizado pelo cliente. **Não entram** Cadastur,
cursos e seguro — ele mesmo pediu para não publicar antes da comprovação.
CONTEÚDO CONFIRMADO: nome Wallace Oliveira; nasceu e foi criado na Rocinha,
autorizado para publicação; guia e anfitrião do passeio; conduz em português e
espanhol.
CASOS DE BORDA: "2 anos e meio de experiência" envelhece sozinho. Publicar o ano
de início, não a duração — e o mês e ano exatos ainda são pendência do cliente.
PRONTO QUANDO: o `Person` valida sem erro, está ligado por `founder` e
`employee` à `TravelAgency`, e nenhuma credencial não comprovada aparece.
FORA DE ESCOPO: foto do Wallace, biografia visível na página.

### D4. Perfil da Empresa no Google

OBJETIVO: existir um perfil do WL Tour no Google, sem duplicidade e sem dado
inventado. **É a peça que mais pesa para busca local e para IA** — mais do que
qualquer coisa feita dentro do site.
ARQUIVOS: nenhum no repositório. Painel do Perfil da Empresa.
REGRAS APLICÁVEIS: nunca criar perfil público com informação presumida; o
negócio atende sem endereço público, então é empresa de área de serviço e nenhum
endereço residencial vai para o ar.
DEPENDE DO D1: categoria, horários e descrição.
DADOS JÁ CONFIRMADOS: responsável Wallace Oliveira; telefone
`+55 21 99555-0707`; área de atendimento Rocinha, Vidigal e trilha do Morro Dois
Irmãos; ponto de encontro na saída C do metrô São Conrado; site
`https://www.wlfavelatour.com.br/`.
CASOS DE BORDA: antes de criar, procurar perfil existente no Search, no Maps e
no gerenciador — duplicado é difícil de desfazer. Depois de criar, acrescentar a
URL pública do perfil ao `sameAs` da `TravelAgency` no `index.html`: é isso que
amarra site e perfil como a mesma identidade.
PRONTO QUANDO: o perfil existe com os campos acima, o Wallace consta como
proprietário principal, `xdouglasdj@gmail.com` como administrador, o estado da
verificação está registrado, e o `sameAs` já aponta para ele.
FORA DE ESCOPO: verificação por vídeo, telefone ou correspondência — é do
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

Categoria, dias e horários e descrição para o Perfil da Empresa no Google. Vira
o **D1**, que quebra o pedido em oito perguntas de uma coisa só e diz por que a
forma anterior falhou. Sem essas respostas, D2 e D4 não fecham.
