# Formulário do questionário — Wallace / WL Tour

## Objetivo

Criar um único arquivo HTML que Wallace possa receber pelo WhatsApp, abrir no
navegador, responder e usar para gerar um arquivo Markdown com as respostas. O
formulário separa primeiro as informações indispensáveis para melhorar a
presença da WL Tour no Google, Bing e sistemas de IA; todas as demais perguntas
do questionário completo aparecem depois.

## Entregável

- Arquivo: `questionario-wallace.html` na raiz do projeto.
- Funciona diretamente no navegador, sem instalação, servidor ou internet.
- Não altera a landing page existente nem seus arquivos de produção.
- Contém as 137 perguntas de `docs/DADOS-DO-CLIENTE.md`, sem mudar o sentido.

## Organização

### Parte 1 — indispensável para Google e IAs

Esta parte fica aberta ao carregar a página. Ela reúne os dados usados para
identificar a empresa, descrever seus serviços, relacionar seus perfis públicos,
delimitar sua área de atendimento e sustentar confiança nas respostas de
buscadores e assistentes de IA.

Entram nesta parte as perguntas originais:

- identidade e contatos públicos: 1–15;
- responsável, história e sinais públicos de confiança: 16–18, 20–25;
- público e área atendida: 26–34;
- descrição comercial do passeio principal: 35–43, 47–52 e 54;
- nomes, funcionamento e disponibilidade das paradas: 64–69;
- informações comerciais das outras experiências: 82–91, 94–98;
- identidade visual e mídias próprias: 99–107;
- domínio e publicação: 108–113;
- presença no Google e Microsoft: 114–121;
- perfis públicos da Meta: 122, 125 e 129;
- atendimento dos contatos recebidos: 130–133 e 136–137.

Todas essas respostas são obrigatórias para liberar a geração do arquivo. A
página aceita `não existe`, `não se aplica`, `não sei` e `será definido` como
respostas válidas, evitando obrigar Wallace a inventar informações.

### Parte 2 — perguntas adicionais

As perguntas restantes ficam abaixo, agrupadas nos mesmos assuntos do
questionário original e dentro de blocos recolhíveis. Elas cobrem principalmente
operação, restrições, segurança, logística, registro audiovisual, plataformas de
anúncios, privacidade e acessos.

Essas respostas são opcionais para gerar o arquivo. Uma pergunta adicional vazia
aparece no Markdown como `Pendente`, para ser concluída depois.

## Interface

- Cabeçalho curto com o nome da WL Tour e uma explicação simples.
- Aviso para não informar senhas, tokens, códigos, cartões ou documentos
  pessoais.
- Barra de progresso exclusiva das perguntas indispensáveis.
- Uma pergunta por linha, seguida de um campo de texto de uma linha.
- Rótulo visual `Obrigatória` apenas na primeira parte.
- Blocos adicionais recolhíveis por assunto.
- Botões finais `Baixar respostas.md` e `Compartilhar respostas`.
- Layout legível em celular e computador, com prioridade para telas estreitas.

## Salvamento e retomada

Cada resposta é salva automaticamente no armazenamento local do navegador. Se
Wallace fechar e abrir novamente o mesmo arquivo no mesmo navegador, o conteúdo
é restaurado. Um botão separado permite apagar todas as respostas, sempre com
confirmação antes da exclusão.

Nenhuma resposta é enviada para servidor, serviço externo ou para o projeto.

## Geração e compartilhamento

Os dois botões finais permanecem bloqueados enquanto alguma pergunta
indispensável estiver vazia. Ao tentar finalizar, a página informa quantas
faltam e leva Wallace até a primeira delas.

Quando todas estiverem respondidas:

1. `Baixar respostas.md` gera o arquivo no próprio aparelho.
2. `Compartilhar respostas` tenta abrir o compartilhamento nativo do aparelho
   levando o arquivo `.md`, o que permite escolher o WhatsApp em celulares
   compatíveis.
3. Se o navegador não permitir compartilhar arquivos, a página baixa o `.md` e
   explica em uma linha que ele deve anexá-lo manualmente no WhatsApp.

O nome do arquivo será `respostas-wl-tour-AAAA-MM-DD.md`.

## Estrutura do Markdown gerado

O arquivo começa com marca, data e quantidade de respostas. Depois reproduz os
assuntos e a numeração do questionário original. Cada item usa este formato:

```markdown
### 1. Qual é seu nome completo?

Resposta: Wallace da Silva
```

Campos adicionais vazios usam `Resposta: Pendente`. O arquivo não inclui código,
dados internos do navegador ou qualquer conteúdo que não tenha sido digitado no
formulário.

## Tratamento de falhas

- Armazenamento local indisponível: o formulário continua funcionando e avisa
  que as respostas não serão preservadas após fechar a página.
- Compartilhamento nativo indisponível: baixar o Markdown e orientar o envio
  manual.
- Campo indispensável vazio: não gerar arquivo, destacar o campo e mover a tela
  até ele.
- Texto longo: manter o campo visualmente em uma linha, sem cortar o conteúdo
  salvo ou exportado.

## Validação

- Conferir que as 137 perguntas aparecem uma única vez e preservam a numeração.
- Confirmar que somente as perguntas indispensáveis bloqueiam a finalização.
- Preencher parcialmente, recarregar a página e confirmar a restauração.
- Preencher todas as indispensáveis e validar o conteúdo do `.md` baixado.
- Confirmar que adicionais vazias saem como `Pendente`.
- Exercitar o compartilhamento em navegador compatível e o fallback de download.
- Conferir em desktop e em largura de 390 px.
- Confirmar que nenhuma requisição de rede é feita durante preenchimento,
  salvamento ou geração do arquivo.

## Fora de escopo

- Enviar respostas automaticamente para WhatsApp, e-mail, banco de dados ou
  hospedagem.
- Criar link público para as respostas.
- Alterar `docs/DADOS-DO-CLIENTE.md` antes de receber o arquivo respondido.
- Publicar o formulário ou modificar a landing page.
