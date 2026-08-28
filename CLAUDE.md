# CLAUDE.md — WL Tour Experience

> Leia este arquivo antes de qualquer tarefa nesta pasta.

## O que é este projeto

Landing page do **WL Tour Experience** — passeio guiado na Rocinha e
experiências turísticas no Rio de Janeiro. Cliente: Wallace.

**A página já foi aprovada pelo cliente.** O trabalho aqui é alterar imagens,
textos e botões dentro dessa página aprovada — não redesenhar, não recriar, não
"melhorar" o que ninguém pediu.

## O estado da pasta, conferido em 26/08/2026

O que existe hoje é **resultado compilado**, não código-fonte:

```
index.html
favicon.svg
robots.txt
static/js/bundle.js   (1,5 MB, build de desenvolvimento do webpack)
```

O `bundle.js` **não está minificado**: o código original de `src/App.js`,
`src/App.css` e `src/index.css` está legível dentro dele. A página foi gerada
pela ferramenta Emergent, e por isso não veio com a pasta `src/`.

**Não edite o `bundle.js`.** A primeira tarefa é recuperar o fonte de dentro
dele; a partir daí o trabalho acontece no fonte.

## Tarefa 1 — recuperar o fonte de dentro do bundle

```
OBJETIVO: existir uma pasta `src/` com `App.js`, `App.css` e `index.css`
recuperados de dentro do `static/js/bundle.js`, e a página voltar a rodar a
partir desse fonte, idêntica à que o cliente aprovou.
PRONTO QUANDO:
  1. `src/App.js`, `src/App.css` e `src/index.css` existem e são legíveis.
  2. A página sobe em servidor local e abre sem erro no console.
  3. Aberta lado a lado com o `index.html` original, a página recuperada mostra
     as mesmas seções, na mesma ordem, com os mesmos textos e as mesmas fotos.
  4. Conferida também em 390px de largura.
FORA DE ESCOPO: mudar texto, foto, cor, botão ou ordem de seção. Esta tarefa só
recupera; alterar é a tarefa seguinte.
```

Alerta que essa ordem existe para evitar: trocar um texto direto no bundle e só
descobrir dias depois que a página perdeu uma seção no caminho — e o cliente já
tinha aprovado o que estava lá.

## Regras de trabalho

**Adjetivo não vira tela; número vira.** Antes de alterar aparência, meça cor,
raio, fonte, tamanho e espaçamento, e escreva a tabela de medidas antes do
código.

**O gate é abrir no navegador e clicar.** Nenhuma tarefa fecha sem a página ter
sido aberta, rolada até o fim, com cada botão clicado e cada link conferido. O
relatório diz o que foi aberto e o que foi clicado.

**Celular primeiro.** Tudo conferido em 390px antes de entregar.

**Texto de venda não se inventa.** Preço, depoimento, número de cliente, nome de
passeio: o que não veio do cliente, pergunte. Nunca preencha.

**Imagem tem origem.** Banco de imagem entra com a licença registrada em
comentário; foto do cliente entra como ele mandou. Nada de foto sem procedência.

**Publicar é decisão do dono.** Subir para hospedagem ou apontar domínio só com
autorização explícita.

## Como responder

Português simples, resposta curta, uma pergunta por vez, sem explicação que não
foi pedida. Alerta em uma linha. Relatório longo é lista seca.

## Confirmação única para executar

Todas as dúvidas de uma tarefa devem ser reunidas e resolvidas antes da
execução. Depois que Douglas responder à bateria de perguntas e mandar executar,
essa autorização é definitiva. Não pedir novas confirmações para plano, design,
especificação, implementação ou testes; executar até concluir e entregar. Só
voltar a perguntar se surgir um bloqueio novo que não poderia ter sido tratado
na etapa de dúvidas e que impeça objetivamente a continuação.
