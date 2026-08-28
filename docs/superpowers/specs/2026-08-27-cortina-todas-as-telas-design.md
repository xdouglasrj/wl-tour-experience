# Efeito cortina em todas as telas

## Objetivo

Aplicar no desktop o mesmo efeito já aprovado no smartphone, sem alterar o
conteúdo, a ordem das seções ou as imagens.

## Comportamento aprovado

- A fotografia da Rocinha no hero fica fixa no topo durante o início da
  rolagem.
- O conteúdo do hero rola e sai da tela normalmente; somente a fotografia fica
  fixa.
- As seções entre o hero e a seção da história passam sobre a fotografia com
  um véu preto translúcido de 20%, tanto no desktop quanto no smartphone.
- A fotografia horizontal aprovada é usada no desktop e a fotografia vertical
  aprovada é usada no smartphone.
- Quando a seção “É uma história para contar” e sua fotografia do Cristo
  chegam, elas empurram a fotografia do hero para cima.
- Depois desse encontro, o restante da página segue com rolagem normal e sem o
  efeito.
- Para usuários com `prefers-reduced-motion: reduce`, a fotografia volta a
  rolar normalmente com a página.

## Implementação

Manter a estrutura existente `.curtain` e `.curtain-photo`. As regras de
fixação, margem compensatória, véu uniforme e fundos translúcidos hoje limitadas
ao media query de até 800 px passam a valer em todas as larguras. O media query
continua responsável apenas pela troca para a imagem vertical e por outros
ajustes próprios do layout móvel.

Não será adicionado JavaScript, listener de rolagem, biblioteca ou novo asset.

## Validação

- Conferir visualmente a sequência do efeito em 1440 px e 390 px.
- Confirmar que a fotografia fica fixa antes da seção da história e é empurrada
  quando essa seção chega.
- Confirmar que o restante da página rola normalmente.
- Verificar ausência de rolagem horizontal e erros no console.
- Executar o build de produção.
- Recriar e conferir o container Docker em `http://localhost:8080`.

## Fora de escopo

- Alterar textos, CTA, imagens, cores ou ordem das seções.
- Estender o efeito além da chegada da fotografia do Cristo.
- Criar ajustes visuais diferentes entre desktop e smartphone.
