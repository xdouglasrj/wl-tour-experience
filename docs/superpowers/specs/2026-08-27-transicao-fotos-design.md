# Transição entre a fotografia do hero e a seção da história

## Objetivo

Suavizar o encontro entre a fotografia fixa da Rocinha e a fotografia da seção
“NÃO É SÓ UM PASSEIO / É uma história para contar”.

## Comportamento aprovado

- A transição suaviza a saída da primeira fotografia pelo preto.
- Nos últimos 18% da fotografia do hero, a imagem escurece progressivamente até
  o preto.
- No desktop, o degradê existe somente acima da seção e aponta para cima,
  escurecendo a fotografia do hero até o preto.
- A fotografia do Cristo não recebe degradê, sombra ou camada de escurecimento.
- O degradê funciona no desktop e no smartphone.
- No smartphone, o degradê continua por trás de todo o bloco de texto da seção
  da história e chega ao preto completo imediatamente antes da fotografia do
  Cristo.
- O término móvel acompanha dinamicamente a altura do texto em PT, EN e ES, sem
  usar uma altura fixa em pixels.
- No desktop, o degradê permanece restrito à área acima da seção.
- A seção da história continua empurrando a fotografia fixa para cima no mesmo
  ponto atual.
- O texto da seção fica acima do degradê e permanece legível.
- O véu preto das seções iniciais permanece em 20%.
- O peso 700 dos textos pequenos permanece inalterado.

## Implementação

Usar um pseudo-elemento com gradiente CSS acima da seção da história. No media
query móvel, usar o bloco de texto como referência para prolongar a camada até
o espaço anterior à fotografia. As camadas não recebem eventos de ponteiro e
ficam fora da fotografia do Cristo. Não adicionar JavaScript, biblioteca ou
novo asset.

## Validação

- Conferir o encontro das fotografias em várias posições da rolagem.
- Validar em 1440 px e 390 px.
- Confirmar que o sticky termina no mesmo ponto e que o restante da página rola
  normalmente.
- Confirmar que nenhum texto ou botão fica coberto pelas novas camadas.
- Confirmar que a fotografia do Cristo permanece sem degradê.
- Confirmar em PT, EN e ES que o degradê móvel termina antes da fotografia.
- Verificar ausência de rolagem horizontal e erros no console.
- Executar o build e recriar o container Docker.
