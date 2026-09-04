# Retomada — 01/09/2026

## Última parte concluída

Push do `main` e verificação do site publicado (S2).

1. O push foi recusado por divergência: o `origin/main` já tinha dois commits
   (`a95ae15`, `33e4982`) com o mesmo trabalho de GTM e SEO, feito por outro
   caminho. Conferido antes de reconciliar: o `index.html` local e o remoto são
   byte a byte iguais. A diferença local era só apagar lixo, mover a regra do
   produto e mexer no `.claude/`.
2. Reconciliado por merge, não por força. O único conflito foi
   `.claude/retomada.md`, resolvido pela versão local.
3. `npm run build` verde e `node quick-verify.cjs` OK depois do merge.
4. Push feito: `a95ae15..8165b67`.
5. Site publicado conferido no navegador.

## O que foi medido no site no ar

Em `https://www.wlfavelatour.com.br/`, sem nenhum erro no console:

- `gtm.js?id=GTM-5B2SLVVG` responde `200`.
- A tag do GA4 `G-G9SGTTXK6F` **já existe e já está publicada** no contêiner:
  o `gtag/js?id=G-G9SGTTXK6F` carrega e o `page_view` sai para o
  `google-analytics.com/g/collect` com `204`.
- O `window.dataLayer` existe e recebe os nove cliques da página:
  `whatsapp_click` em `header`, `hero`, `final`, `footer` e `floating`;
  `instagram_click` em `instagram-section`, `footer` e `floating`;
  `phone_click` em `final`. Todos com `event_category: engagement`.

## A conclusão errada que quase entrou no relatório

Na primeira leitura pareceu que nenhum dos nove eventos chegava ao GA4: depois
dos cliques, o único `collect` cuja URL trazia `en=` era o do `page_view`.

Estava errado. O GA4 manda os eventos **em lote, no corpo do POST** — a URL não
traz `en=` nenhum. Interceptando `sendBeacon`, `fetch` e `XMLHttpRequest`, os
nove aparecem numa requisição só, cada um com `event_category: engagement` e o
`event_label` da posição. O contêiner está completo: configuração, acionadores
e tags de evento. S3 concluída.

## Estado

- `main` local e remoto no mesmo commit, `8165b67`.
- Dois endereços respondem `200` e **nenhum redireciona para o outro** —
  `wlfavelatour.com.br` e `www.wlfavelatour.com.br` servem a mesma página. O
  `canonical` e o `og:url` apontam para a forma com `www`, então o sinal para o
  Google está certo, mas o redirecionamento 301 não existe.

## Conferido dentro dos painéis (01/09/2026)

Feito pelo Chrome logado, na conta `xdouglasdj@gmail.com`. A conta ativa do
navegador era `tvoryntis@gmail.com`, que não enxerga nada deste projeto — foi
preciso trocar. Vale lembrar disso na próxima sessão.

- **GTM:** versão 2 ativa, publicada em 31/08 por `xDouglasdj@gmail.com`. Duas
  tags e um acionador de evento personalizado. Zero alteração pendente.
- **GA4:** propriedade "WL Favela Tour - Site". O tempo real mostrou
  `whatsapp_click` 10, `instagram_click` 6 e `phone_click` 2 — exatamente os
  dois testes que rodei no navegador (5+5, 3+3, 1+1). S4 fechada.
- **Search Console:** o sitemap que existia era o da forma **sem** `www`,
  enviado em 28/08. Enviei o da forma `www`, com sua autorização: consta
  `Processado`, 1 página, sem erro. Os dois continuam na lista; não removi
  nenhum. S5 fechada.
- **Indexação:** `https://www.wlfavelatour.com.br/` **não** está indexada — está
  como "Página alternativa com tag canônica adequada". O último rastreamento foi
  30/08 às 22:04, antes do push, quando o canonical ainda apontava para a forma
  sem `www`. O teste ao vivo de hoje diz "O URL está disponível para o Google" e
  indexável, então a página nova está certa; falta o Google reler. Com sua
  autorização, pedi indexação: "Indexação solicitada", fila prioritária.
- **H2:** `wlfavelatour@gmail.com` está como Administrador com **convite
  pendente**.

## Redirecionamento do apex (01/09/2026)

Feito com autorização. A CLI da Vercel não tem comando para isso — o
redirecionamento é configuração do domínio dentro do projeto, e foi aplicado
pela API com o `VERCEL_TOKEN` que já estava no ambiente:

```
PATCH /v9/projects/<id>/domains/wlfavelatour.com.br
{ "redirect": "www.wlfavelatour.com.br", "redirectStatusCode": 308 }
```

Nada foi escrito no repositório: não existe `vercel.json`, e não criei um. A
Vercel emite **308**, não 301; para o Google os dois valem como permanente.

Conferido no ar logo depois: `https://wlfavelatour.com.br/` responde `308` para
`https://www.wlfavelatour.com.br/`, o caminho é preservado, e o `www` continua
`200`.

**De olho:** o sitemap antigo, na forma sem `www`, continua enviado no Search
Console e agora responde `308`. Nos dois a leitura de hoje ainda consta
`Processado`. O Google costuma seguir o redirecionamento, mas se em alguns dias
aquela linha virar erro, é só removê-la — o sitemap na forma `www` já está
enviado e cobre a mesma página.

## Planejamento de 01/09/2026 — descoberta no Google e na IA

Sessão de planejamento, sem código e sem delegação. A fila foi refeita: as
tarefas agora são **D1 a D7**, no `tarefas.md`.

Sete decisões do Douglas, e o motivo de cada uma:

1. Site e redes sociais são **a mesma identidade**, não é ranquear o Instagram.
2. O método replicável mira **negócio local que atende pessoa** — não qualquer
   cliente, e não só turismo.
3. O escopo vai até **site + Perfil da Empresa + loop de avaliação**. Cadastro
   em sites de terceiros ficou de fora.
4. O replicável é **consertar e generalizar o questionário de 137**, e não criar
   um pedido curto separado.
5. Estrutura: **núcleo comum + blocos por ramo**.
6. **Nenhum preço vai ao ar** — gravado em `docs/PRODUTO.md` como regra
   permanente. As taxas mudam de um dia para o outro, e o "a partir de" ancora o
   cliente no piso. Ele foi avisado do custo e manteve a decisão.
7. **Entra FAQ visível** na página, nos três idiomas, sem valor nenhum.

## O achado que explica o bloqueio

O questionário de 137 perguntas marcou a **116** como obrigatória, mas ela pede
quatro coisas num campo só: "categoria, área de atendimento, telefone e
horário". O Wallace escreveu o telefone, o campo ficou preenchido, e o sistema
contou como respondida. Categoria, área e horário nunca vieram — e são
exatamente o que trava o Perfil da Empresa até hoje.

Não é falta de esforço do cliente. É defeito do instrumento: **campo que aceita
resposta parcial como completa.** É o conserto central do D7.

## Próximo passo

Executar o **D1**: mandar as oito perguntas ao Wallace, uma coisa por pergunta.
Tudo depois disso depende delas.

O D6 (reconferir a indexação do `www`) roda sozinho daqui a uma semana e não
depende de ninguém.

## D1 executado (01/09/2026)

As oito perguntas foram enviadas pelo Douglas e respondidas pelo Wallace. Texto
das perguntas e tabela de respostas em `docs/PERGUNTAS-D1.md`; os fatos entraram
em `docs/DADOS-DO-CLIENTE.md`, seção "Respostas do D1".

Confirmado: categoria "Agência de turismo"; passeio todos os dias das 09:00 às
17:00; WhatsApp das 07:00 às 21:00 (**corrige** o 6h–23h que constava antes, nas
duas linhas do documento); descrição em palavras do cliente; sem idade mínima
desde que acompanhado de responsável maior de 18 anos.

Nenhum horário estava escrito no `index.html` nem no `src/` — a correção do
6h–23h ficou só na documentação.

**Duas respostas vieram pela metade, e travam o D2:**

- Chuva: ele disse que adia, mas não disse com quanta antecedência avisa nem se
  remarca ou devolve o dinheiro.
- Inglês: "suporte 100% em inglês" não responde quem conduz o passeio em inglês.

O reenvio dessas duas (6b e 7b) está escrito no fim do `PERGUNTAS-D1.md`.

## Próximo passo

Reenviar 6b, 7b e a 9 (endereço para a verificação do Perfil da Empresa). Com elas, o D2 (perguntas frequentes) fica desbloqueado — as
outras respostas do D1 já cobrem dias, horários e idade mínima. O D4 já pode
começar: categoria, horários e descrição chegaram.

## D4 — Perfil da Empresa criado (02/09/2026)

Criado com autorização, pela conta `xdouglasdj@gmail.com`, que é o índice
**`u/2`** do Chrome (perfil "Zumatra"). Anotar isso: `u/0` é `tvoryntis@` e
`u/1` é `xdouglasdj2020@` — nenhuma das duas serve.

Antes de criar, procurei duplicado em três lugares e não achou nenhum: Google
Search (só concorrentes), Maps (sete resultados, nenhum é o WL) e o gerenciador
das três contas (zero empresa em todas).

Perfil: código `11038970354485641720`, nome **WL Favela Tour**, categoria
Agência de turismo, sem endereço público, áreas Rocinha, Vidigal e São Conrado,
telefone `+55 21 99555-0707`, site `https://www.wlfavelatour.com.br/`.

O nome não é "WL Tour" porque já existe uma empresa com esse nome em Inhaúma. O
Douglas escolheu "WL Favela Tour", que casa com o domínio e com o Instagram.

**Onde parou:** o Google pediu endereço de correspondência para mandar o código.
Não informei nada — endereço não se inventa, e é do titular. O perfil está como
"Verificação obrigatória", e enquanto isso **não aparece** na Pesquisa nem no
Maps.

**Por isso continuam abertos:** o `sameAs` no `index.html` (não existe URL
pública ainda), os horários, a descrição e as fotos dentro do perfil, e o D5
inteiro (o link de avaliação só nasce com o perfil verificado).

## Próximo passo

Decidir com o Wallace qual caminho de verificação usar. Depois disso: preencher
horários e descrição no perfil, e só então o `sameAs` e o D5.
