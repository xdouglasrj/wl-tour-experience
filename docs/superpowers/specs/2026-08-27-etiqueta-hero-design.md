# Etiqueta do rótulo do hero

## Objetivo

Destacar o rótulo “RIO DE JANEIRO · ROCINHA” com texto preto em negrito sem
perder contraste sobre a fotografia.

## Comportamento aprovado

- Somente o rótulo do hero recebe a nova aparência.
- O texto usa preto `#080907` e peso 700.
- O fundo usa amarelo `#E8A521` apenas no tamanho do conteúdo.
- O espaçamento interno é de 5 px na vertical e 8 px na horizontal.
- A posição atual do rótulo é preservada.
- O resultado vale em desktop e smartphone, nos idiomas PT, EN e ES.
- Nenhum outro rótulo, título ou texto muda.

## Validação

- Conferir o estilo calculado em 1440 px e 390 px.
- Confirmar que o fundo envolve somente o texto.
- Verificar PT, EN e ES, console e rolagem horizontal.
- Executar o build e recriar o container Docker.
