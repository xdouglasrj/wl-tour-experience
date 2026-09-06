# Tarefa D3 — nó `Person` do guia no dado estruturado

Você trabalha num worktree isolado. **O único arquivo que você pode alterar é
`index.html`, na raiz do worktree.** Não toque em nenhum outro arquivo, não crie
arquivo novo, não rode `git commit`, não rode `git add`.

## Objetivo

O `index.html` tem um único bloco `<script type="application/ld+json">` com um
`@graph`. Hoje o nó da organização (`@id`
`https://www.wlfavelatour.com.br/#organizacao`, `@type`
`["Organization","TravelAgency","LocalBusiness"]`) traz o fundador como um objeto
solto:

```json
"founder": { "@type": "Person", "name": "Wallace Oliveira" }
```

Isso não dá à IA um humano citável. Passe a existir um nó `Person` próprio no
`@graph`, com `@id` `https://www.wlfavelatour.com.br/#wallace`, e o nó da
organização passa a referenciá-lo por `founder` **e** por `employee`, os dois
usando a forma de referência `{ "@id": "https://www.wlfavelatour.com.br/#wallace" }`.

## Conteúdo exato do nó `Person`

Só entram fatos já autorizados pelo cliente:

```json
{
  "@type": "Person",
  "@id": "https://www.wlfavelatour.com.br/#wallace",
  "name": "Wallace Oliveira",
  "jobTitle": "Guia de turismo local",
  "description": "Nasceu e foi criado na Rocinha. Guia e anfitrião do passeio na Rocinha, no Vidigal e na trilha do Morro Dois Irmãos.",
  "knowsLanguage": ["pt-BR", "es"],
  "birthPlace": {
    "@type": "Place",
    "name": "Rocinha, Rio de Janeiro, RJ, Brasil"
  },
  "worksFor": { "@id": "https://www.wlfavelatour.com.br/#organizacao" },
  "url": "https://www.wlfavelatour.com.br/"
}
```

## O que é PROIBIDO acrescentar

Nada de Cadastur, curso, certificação, seguro, prêmio, tempo de experiência
("2 anos e meio"), foto do Wallace, e-mail pessoal ou perfil social pessoal. O
cliente pediu expressamente para não publicar credencial sem comprovação, e
duração de experiência envelhece sozinha. Também não invente ano de início.

Nenhum valor, preço, faixa de preço, `Offer`, `priceRange` ou
`priceSpecification` entra em lugar nenhum — regra do produto, em nenhum idioma
e em nenhum campo.

## Regras de estilo

O trecho novo tem que ler como o JSON ao redor: mesma indentação (2 espaços por
nível dentro do `@graph`), aspas duplas, sem vírgula sobrando, sem comentário.
Não reordene, não reformate e não altere nenhum outro nó do `@graph` além da
troca do `founder` e do acréscimo do `employee` no nó da organização.

## Critério de pronto (comandos que rodam, não adjetivo)

Da raiz do worktree, todos têm que passar:

1. `node quick-verify.cjs` → termina com `OK: Todas as validações passaram`
2. `node verify-agents.cjs` → termina com `OK: 36 verificações` (esta é a
   baseline de 04/09/2026; abaixo disso é reprovação)
3. `npm run build` → verde
4. Este check, que tem que imprimir `PERSON OK`:

```
node -e "
const fs=require('fs');
const h=fs.readFileSync('index.html','utf8');
const j=JSON.parse(h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/)[1]);
const g=j['@graph'];
const p=g.find(n=>n['@id']==='https://www.wlfavelatour.com.br/#wallace');
const o=g.find(n=>n['@id']==='https://www.wlfavelatour.com.br/#organizacao');
if(!p) throw new Error('sem Person');
if(p['@type']!=='Person') throw new Error('tipo errado');
if(o.founder['@id']!==p['@id']) throw new Error('founder nao referencia');
if(o.employee['@id']!==p['@id']) throw new Error('employee nao referencia');
if(JSON.stringify(j).match(/price|Offer/i)) throw new Error('preco no JSON-LD');
console.log('PERSON OK');
"
```

## Entrega

Deixe as mudanças no worktree, sem commit. No fim, escreva em texto: quais
linhas mudaram e a saída literal dos quatro comandos acima.

---

## AVISO ACRESCENTADO DEPOIS DE DUAS TENTATIVAS FRACASSADAS

Duas tentativas anteriores foram reprovadas. Leia isto antes de começar.

**Tentativa 1:** o conteúdo saiu certo, mas o agente re-serializou o bloco
JSON-LD inteiro. O diff ficou com 227 inserções e 172 remoções para uma mudança
de pouco mais de 20 linhas. Todo array que estava em uma linha virou
multi-linha. Reprovado.

**Tentativa 2:** o agente rodou `git checkout -- index.html`, não refez a edição,
e ainda criou as pastas `.claude/hooks/` e `scripts/harness/`, que estavam fora
do combinado. Reprovado duas vezes: entrega vazia e arquivo fora da fronteira.

**Portanto, obrigatório:**

1. **Nunca** passe o JSON por `JSON.parse` seguido de `JSON.stringify` para
   gravar o arquivo. Foi isso que destruiu a formatação. Use edição de texto
   pontual: localize a linha, troque a linha.
2. Arrays que estão em uma linha só continuam em uma linha só. A indentação do
   arquivo é irregular de propósito em alguns trechos: preserve exatamente.
3. Só existe um arquivo permitido: `index.html`. Não crie pasta nenhuma, não
   crie arquivo nenhum, nem de apoio, nem de teste, nem de anotação.
4. `git diff --stat` no fim tem que mostrar **menos de 40 linhas mudadas**. Mais
   que isso é reprovação automática, mesmo com o conteúdo certo.
