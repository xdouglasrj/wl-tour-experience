# Tarefa D8 — tirar o preço do ar

Worktree isolado. **Arquivos que você pode alterar, e só estes quatro:**

- `public/llms.txt`
- `public/about.html`
- `public/md/about.md`
- `public/md/index.md`

Nenhum outro arquivo. Não crie arquivo novo. Não rode `git add` nem
`git commit`.

## Por quê

Regra do produto, decidida pelo dono em 01/09/2026 e escrita em
`docs/PRODUTO.md`: **nenhum valor aparece em lugar nenhum** — não no texto, não
no dado estruturado, não em `Offer`, `priceRange` ou `priceSpecification`, em
nenhum dos três idiomas. Nem valor fixo, nem faixa, nem "a partir de".

O motivo: no turismo existem taxas que mudam de um dia para o outro, então o
valor de ontem não é o valor de hoje. O preço é negociado no ato.

Quatro arquivos publicados ainda trazem `R$ 270 por pessoa, com desconto para
grupos a partir de 5 pessoas`. Esses arquivos são exatamente os que a IA e o
buscador leem. Precisam parar de trazer valor.

## O que fazer, arquivo por arquivo

**1. `public/llms.txt`, linha 45.** Hoje:

```
- Preço: R$ 270 por pessoa, com desconto para grupos a partir de 5 pessoas.
```

Troque por:

```
- Preço: informado no atendimento pelo WhatsApp; varia conforme o grupo e a data.
```

**2. `public/md/index.md`, linha 18.** A linha da tabela hoje é:

```
| Preço | R$ 270 por pessoa, com desconto para grupos a partir de 5 pessoas |
```

Troque por:

```
| Preço | Informado no atendimento pelo WhatsApp; varia conforme o grupo e a data |
```

**3. `public/about.html`, linha 27.** O parágrafo hoje diz:

> O passeio acontece todos os dias, das 09:00 às 17:00, no formato privado ou
> compartilhado, por R$ 270 por pessoa, com desconto para grupos a partir de
> cinco pessoas. O pagamento é feito ao final, em real, dólar, euro ou cartão de
> crédito.

Passe a dizer:

> O passeio acontece todos os dias, das 09:00 às 17:00, no formato privado ou
> compartilhado. O valor é informado no atendimento pelo WhatsApp, porque varia
> conforme o grupo e a data. O pagamento é feito ao final, em real, dólar, euro
> ou cartão de crédito.

**4. `public/md/about.md`, na altura da linha 27.** O mesmo parágrafo, no mesmo
texto acima, respeitando a quebra de linha em 80 colunas que o arquivo já usa.

## Regras de estilo

Mexa só nas linhas citadas. Não reformate, não reordene, não reindente e não
mexa em nenhum outro trecho desses arquivos. `git diff --stat` tem que ficar
abaixo de 25 linhas mudadas no total.

## Critério de pronto

Da raiz do worktree:

1. Este comando não pode imprimir nada:

```
grep -rnI "R\$\|270 por pessoa\|desconto para grupos" public/ index.html src/App.js --exclude-dir=img
```

2. `node quick-verify.cjs` → `OK: Todas as validações passaram`
3. `node verify-agents.cjs` → `OK: 36 verificações` (baseline de 04/09/2026;
   abaixo disso é reprovação)
4. `npm run build` → verde
5. `git diff --stat` abaixo de 25 linhas

No fim, cole o `git diff` inteiro e a saída literal dos comandos acima.
