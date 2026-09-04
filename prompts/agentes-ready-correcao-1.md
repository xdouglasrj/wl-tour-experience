# CORREÇÃO 1 — tarefa "agentes-ready"

Você já fez esta tarefa neste mesmo diretório. A auditoria reprovou em dois
pontos. Corrija apenas os dois, sem mexer em mais nada, sem commit.

## Defeito 1 — `verify-agents.cjs` nem sequer roda

`node verify-agents.cjs` morre antes de começar:

```
verify-agents.cjs:18
             .replace(/<[^>]*>gi, '')
                      ^
SyntaxError: Invalid regular expression: missing /
```

A expressão regular está sem a barra de fechamento: o certo é
`.replace(/<[^>]*>/gi, '')`. Procure o arquivo inteiro por outras expressões
regulares escritas errado do mesmo jeito e conserte todas.

Depois de consertar, rode `node verify-agents.cjs` de verdade e faça ele passar.
Se alguma verificação apontar um problema real nos arquivos do site, conserte o
arquivo do site — não afrouxe a verificação para ela passar.

## Defeito 2 — `node quick-verify.cjs` quebrou

Saída atual:

```
ERRO: Deve haver exatamente 1 TravelAgency
```

Motivo: o nó `#organizacao` do JSON-LD agora tem
`"@type": ["Organization", "TravelAgency", "LocalBusiness"]`, um array, e o
`quick-verify.cjs` foi escrito supondo que `@type` é sempre uma string. O
JSON-LD está certo; o teste é que está desatualizado.

Atualize `quick-verify.cjs` para aceitar `@type` como string **ou** como array,
mantendo exatamente a mesma intenção de cada checagem:

- a contagem de tipos deve contar cada tipo de um nó multi-tipo (um nó com
  `["Organization","TravelAgency","LocalBusiness"]` conta 1 para cada um dos
  três);
- continua valendo que existe exatamente 1 `TravelAgency`, 1 `TouristTrip` e
  1 `WebSite`;
- `graph.find(n => n['@type'] === 'TravelAgency')` precisa passar a encontrar o
  nó mesmo quando o `@type` é array. Escreva uma função auxiliar única, por
  exemplo `function temTipo(no, tipo)`, e use ela nos dois lugares.

Não relaxe, não remova e não comente nenhuma checagem do `quick-verify.cjs`.
Não acrescente checagens novas nele.

## PRONTO QUANDO

Estes três comandos rodam limpos, na raiz do diretório de trabalho:

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

No relatório final, cole a saída literal dos três.
