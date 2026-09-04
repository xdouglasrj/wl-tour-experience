# CORREÇÃO — tirar o CEP inventado do JSON-LD

Trabalhe SOMENTE dentro deste diretório. Não faça commit, não instale nada.

## O defeito

O nó `#organizacao` do JSON-LD do `index.html` da raiz tem
`"postalCode": "22450-000"` dentro do `address`. Esse CEP **não é da empresa**:
ela é de área de serviço e não tem endereço público. Publicar CEP de outro lugar
como se fosse dela é dado falso, e sai.

## O que fazer

1. No `index.html` da raiz, remova a linha `"postalCode": "22450-000"` de dentro
   do objeto `address` do nó `#organizacao`. O `address` fica com
   `@type`, `addressLocality`, `addressRegion` e `addressCountry` — nada mais.
   O JSON-LD tem que continuar sendo JSON válido. Não mude mais nada do arquivo.

2. No `verify-agents.cjs`, a verificação do endereço hoje exige `postalCode`
   entre os campos obrigatórios. Tire `postalCode` dessa lista: continuam
   obrigatórios `addressLocality`, `addressRegion` e `addressCountry`, e o
   `@type` continua tendo que ser `PostalAddress`. Não mexa em nenhuma outra
   verificação.

3. Prove por mutação que a verificação continua valendo: apague
   temporariamente o `addressLocality` do `index.html`, rode
   `npm run build && node verify-agents.cjs`, confirme que FALHA, e devolva o
   campo. Descreva no relatório.

## O que NÃO tocar

`src/`, `public/`, `middleware.js`, `vercel.json`, `quick-verify.cjs`,
`package.json`, `docs/`, `tarefas.md`.

## PRONTO QUANDO

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

rodam limpos, e este comando imprime o endereço sem CEP:

```
node -e "const h=require('fs').readFileSync('dist/index.html','utf8');const j=JSON.parse(h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/)[1]);console.log(JSON.stringify(j['@graph'].find(n=>[].concat(n['@type']).includes('Organization')).address))"
```

Cole a saída literal de todos no relatório.
