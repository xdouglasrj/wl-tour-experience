# CORREÇÃO — `address` faltando no nó Organization do JSON-LD

Trabalhe SOMENTE dentro deste diretório. Não faça commit, não instale nada.

## O defeito

O nó `#organizacao` do JSON-LD do `index.html` da raiz recebeu
`"@type": ["Organization", "TravelAgency", "LocalBusiness"]`, `email` e
`contactPoint`, mas **não recebeu** os campos `address`, `legalName`,
`foundingDate`, `knowsLanguage` e `founder`. Confirmado assim:

```
node -e "const h=require('fs').readFileSync('dist/index.html','utf8');const j=JSON.parse(h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/)[1]);const o=j['@graph'].find(n=>[].concat(n['@type']).includes('Organization'));console.log(o.address, o.founder, o.legalName)"
```

Imprime `undefined undefined undefined`.

Pior: o `verify-agents.cjs` disse `OK` mesmo assim. A verificação dele de
`address` está frouxa — provavelmente procura a string `PostalAddress` em
qualquer lugar do JSON-LD, e o nó `areaServed` já tem um `PostalAddress`
aninhado. Uma verificação que passa com o campo ausente não vale nada.

## O que fazer

### 1. `index.html` (raiz) — acrescentar campos ao nó `#organizacao`

Acrescente, **sem remover nem alterar nada do que já existe** no nó
(inclusive o `areaServed`, que fica como está):

```json
"legalName": "WL Tour Experience",
"foundingDate": "2024",
"knowsLanguage": ["pt-BR", "es", "en"],
"founder": { "@type": "Person", "name": "Wallace Oliveira" },
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Rio de Janeiro",
  "addressRegion": "RJ",
  "addressCountry": "BR",
  "postalCode": "22450-000"
}
```

Não mude mais nada do `index.html`. O JSON-LD tem que continuar sendo JSON
válido.

### 2. `verify-agents.cjs` — apertar a verificação

A verificação do `address` precisa olhar **o próprio nó Organization**, não o
JSON-LD inteiro:

- pegar o nó cujo `@type` (string ou array) inclui `Organization`;
- exigir que `org.address` exista, que `org.address['@type']` seja
  `PostalAddress` e que `addressLocality`, `addressRegion` e `addressCountry`
  estejam preenchidos;
- exigir que `org.contactPoint` seja um array com pelo menos um item cujo
  `contactType` esteja preenchido e que tenha `telephone` ou `email`;
- exigir que `org.email` esteja preenchido.

Faça a mesma varredura em qualquer outra verificação do arquivo que hoje só
procure uma string solta no HTML quando deveria olhar o objeto já parseado.

Depois de apertar, **prove que a verificação pega o defeito**: apague
temporariamente o `address` do nó Organization no `index.html`, rode
`npm run build && node verify-agents.cjs`, confirme que ele FALHA, e então
devolva o `address`. Descreva esse teste no relatório final.

## O que NÃO tocar

`src/`, `public/`, `middleware.js`, `vercel.json`, `quick-verify.cjs`,
`package.json`, `docs/`, `tarefas.md`.

## PRONTO QUANDO

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

rodam limpos, e o comando do início desta tarefa imprime o objeto
`PostalAddress`, o `founder` e o `legalName`. Cole a saída literal de todos no
relatório.
