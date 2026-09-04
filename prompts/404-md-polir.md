Ajuste cosmético em UM arquivo: `middleware.js` na raiz do diretório de trabalho.
A lógica está correta e NÃO pode mudar de comportamento. Nenhum commit, nenhum
outro arquivo.

Três coisas, só isso:

1. A declaração `const pathMap = {` está encostada na margem esquerda. Recue-a
   para o mesmo nível do comentário `// Mapeamento de rotas para arquivos markdown`
   logo acima (6 espaços), e mantenha o corpo do objeto e o `};` coerentes.
2. No bloco `if (caminhoMd)`, restaure os comentários apagados:
   - acima do `if (!markdownResponse.ok)`:
     `// Se o fetch falhar ou retornar status != 200, continuar com o HTML normal`
   - acima do `const markdownContent = await markdownResponse.text();`:
     `// Retornar o conteúdo markdown com os cabeçalhos corretos`
   - dentro do `catch (error)` desse bloco:
     `// Em caso de erro, continuar com o HTML normal`
3. No bloco novo do 404, a condição repete a checagem do `Accept` já feita pelo
   `if` externo. Troque
   `if (!pathname.includes(".") && request.headers.get("Accept")?.includes("text/markdown")) {`
   por `if (!pathname.includes(".")) {` e escreva acima dela o comentário
   `// Caminho fora do mapa: o 404 também tem versão markdown`.

Pronto quando `node --check middleware.js` sai limpo e `git diff --stat` mostra
só `middleware.js`.
