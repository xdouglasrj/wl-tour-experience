# Realce dos textos pequenos

## Objetivo

Melhorar a legibilidade das letras menores em toda a página depois da redução
do véu preto para 20%, sem alterar o efeito cortina aprovado.

## Comportamento aprovado

- Todos os textos pequenos de leitura recebem `font-weight: 700` no desktop e
  no smartphone.
- O realce inclui descrições, parágrafos de cards, notas, legendas, textos
  auxiliares, rodapé e navegação.
- Rótulos e botões que já usam peso 700 permanecem visualmente iguais.
- Títulos grandes e fontes decorativas não mudam.
- Tamanho, cor, espaçamento e conteúdo dos textos não mudam.
- O véu preto permanece em 20%.

## Implementação

Aplicar o peso 700 aos seletores existentes de textos pequenos no CSS, sem
alterar o HTML, os componentes React ou as fontes carregadas. Não usar um
seletor global indiscriminado que modifique títulos ou ícones.

## Validação

- Conferir a página inteira em 1440 px e 390 px.
- Confirmar que os textos pequenos estão em peso 700.
- Confirmar que títulos, tamanhos, cores, espaçamentos e o véu continuam iguais.
- Verificar ausência de rolagem horizontal e erros no console.
- Executar o build e recriar o container Docker.
