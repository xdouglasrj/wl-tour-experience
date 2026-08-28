# Alinhamento do rótulo da seção da história

## Objetivo

Melhorar a visibilidade do rótulo “NÃO É SÓ UM PASSEIO” no desktop.

## Comportamento aprovado

- A margem esquerda do rótulo passa de 30 px para 42 px somente em telas acima
  de 800 px.
- Em telas de até 800 px, o rótulo permanece com os 30 px atuais.
- O ajuste vale para os textos equivalentes em português, inglês e espanhol.
- O título, os demais textos e o layout da seção não mudam.

## Validação

- Conferir em 1440 px que o rótulo usa margem esquerda de 42 px.
- Conferir em 390 px que o rótulo continua com margem esquerda de 30 px.
- Verificar PT, EN e ES, console e rolagem horizontal.
- Executar o build e recriar o container Docker.
