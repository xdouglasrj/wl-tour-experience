Altere UM arquivo: `index.html` na raiz. Nenhum outro arquivo. Nenhum commit.

No bloco `<script type="application/ld+json">`, no nó do `@graph` cujo `@id` é
`https://www.wlfavelatour.com.br/#organizacao`, acrescente a propriedade
`alternateName` logo depois de `"name": "WL Tour Experience",`, com o valor:

  "alternateName": ["WL Favela Tour", "WL Rocinha Tour", "Tour na Favela Rocinha"],

Mantenha a indentação do bloco (10 espaços nessa profundidade) e a vírgula
correta. Nada mais muda: nenhum outro campo, nenhuma outra linha do HTML.

Pronto quando:
- `node -e "const s=require('fs').readFileSync('index.html','utf8');const m=s.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);JSON.parse(m[1]);console.log('json ok')"` imprime `json ok`.
- `git diff --stat` mostra só `index.html`, com pouquíssimas linhas alteradas.
