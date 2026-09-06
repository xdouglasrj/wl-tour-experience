# Tarefa D2b — `FAQPage` no dado estruturado e verificações novas

Worktree isolado. **Arquivos que você pode alterar, e só estes dois:**

- `index.html`
- `verify-agents.cjs`

Nenhum outro arquivo. Não crie arquivo novo, não crie pasta, não crie arquivo de
teste, não rode `git add` nem `git commit`. Criar arquivo fora desses dois é
reprovação automática: uma tentativa anterior foi reprovada por criar
`test1.txt` ... `test8.txt`.

**Não toque em `src/App.js` nem em `src/App.css`.** A seção visível já existe e
já está commitada.

## Objetivo

A página já mostra doze perguntas frequentes em `<details>`/`<summary>`, na
seção `id="faq"`. Falta o mesmo conteúdo existir como dado estruturado
`FAQPage`, e faltam verificações que protejam isso.

## Parte 1 — o nó no `index.html`

O `index.html` tem um único bloco `<script type="application/ld+json">` com um
`@graph`. Acrescente **um nó novo ao fim do `@graph`**, depois do nó `Person`
que já existe lá, do tipo `FAQPage`, com `@id`
`https://www.wlfavelatour.com.br/#perguntas` e uma lista `mainEntity` com as
doze perguntas na ordem abaixo.

Cada item tem esta forma:

```json
{
  "@type": "Question",
  "name": "Quanto tempo dura o passeio?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Aproximadamente 2 horas, do começo ao fim."
  }
}
```

Antes de escrever um campo `isPartOf`, confira no arquivo qual é o `@id` real do
nó `WebPage`. Se não houver nó `WebPage`, **omita o campo** em vez de inventar.

### As doze perguntas, palavra por palavra

O texto do dado estruturado é o texto pt-BR que aparece na tela, **igual, sem
resumir, sem encurtar e sem reescrever** — o Google desconsidera `FAQPage` cujo
texto não está visível na página.

1. `Quanto tempo dura o passeio?` → `Aproximadamente 2 horas, do começo ao fim.`
2. `Onde o passeio começa e termina?` → `Na saída C do metrô São Conrado. O começo e o fim são no mesmo lugar.`
3. `Em quais dias e horários o passeio acontece?` → `Todos os dias, das 09:00 às 17:00.`
4. `O que está incluído?` → `Deslocamento de moto táxi, espetáculo de capoeira, vídeo de drone e visita a uma laje para fotos.`
5. `O que não está incluído?` → `Bebidas, como caipirinha e cerveja.`
6. `O passeio é privado ou compartilhado?` → `Existem os dois formatos: privado ou compartilhado.`
7. `Quem conduz o passeio?` → `Wallace Oliveira, nascido e criado na Rocinha.`
8. `Em quais idiomas o passeio é conduzido?` → `O Wallace conduz em português e espanhol. O atendimento também é feito em inglês.`
9. `Como funciona o pagamento?` → `O pagamento é feito ao final do passeio.`
10. `Quais formas de pagamento são aceitas?` → `Real, dólar, euro e cartão de crédito.`
11. `Quem pode participar?` → `Pessoas sozinhas, casais, famílias, crianças, idosos e grupos privados. Não há idade mínima, desde que a criança esteja acompanhada de um responsável legal maior de 18 anos.`
12. `E se chover?` → `Em dia de muita chuva o passeio é adiado: a filmagem de drone não acontece e andar de moto na chuva é perigoso.`

**Nenhum valor entra em lugar nenhum**: nem `Offer`, nem `priceRange`, nem
`priceSpecification`, nem preço no texto. Regra do dono do produto, porque no
turismo as taxas mudam de um dia para o outro.

### Formatação do `index.html` — reprovação automática

Três tentativas anteriores foram reprovadas neste mesmo arquivo. Duas
reformataram o JSON inteiro; uma gerou **JSON inválido**, porque abriu o nó novo
sem a chave `{`.

- **Nunca** passe o JSON por `JSON.parse` seguido de `JSON.stringify` para
  gravar. Edite o texto no lugar.
- Arrays que estão em uma linha continuam em uma linha.
- Nenhum nó existente é reordenado, reindentado ou tocado. O `git diff` do
  `index.html` só pode conter linhas **acrescentadas** (`+`), fora a vírgula que
  fecha o nó anterior.
- Depois de editar, confirme que o JSON continua válido antes de dizer que
  terminou.

## Parte 2 — verificações no `verify-agents.cjs`

`verify-agents.cjs` é a suíte de verificação do projeto, e hoje imprime
`OK: 36 verificações`. Acrescente verificações **ao fim dela**, seguindo o estilo
das que já existem, que:

1. leiam o `index.html`, extraiam o bloco JSON-LD e naveguem o objeto **já
   parseado** — nunca com busca de texto no arquivo inteiro, que é o erro
   registrado em `docs/APRENDIZADO.md`;
2. exijam que o nó `FAQPage` exista, tenha exatamente 12 itens em `mainEntity`, e
   que cada item tenha `name` e `acceptedAnswer.text` não vazios;
3. exijam que exista o nó `Person` com `@id`
   `https://www.wlfavelatour.com.br/#wallace` e que o nó da organização o
   referencie por `founder` e por `employee`;
4. exijam que o JSON-LD inteiro não contenha `price`, `Offer`, `priceRange` nem
   `priceSpecification`;
5. exijam que o `dist/index.html` gerado pelo build contenha, como texto visível,
   `Quanto tempo dura o passeio?` e `E se chover?`.

Diga no relatório **quantas verificações você acrescentou** e qual é o novo total
impresso. O novo total tem que ser 36 mais o que você criou, nunca menos.

## Critério de pronto (comandos que rodam)

Da raiz do worktree:

1. `npm run build` → verde
2. `node quick-verify.cjs` → `OK: Todas as validações passaram`
3. `node verify-agents.cjs` → `OK: N verificações`, com N maior que 36
4. `node scripts/test-middleware.mjs` → `OK: 13 verificações`
5. Este check imprime `FAQ OK`:

```
node -e "
const fs=require('fs');
const h=fs.readFileSync('index.html','utf8');
const j=JSON.parse(h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/)[1]);
const f=j['@graph'].find(n=>n['@id']==='https://www.wlfavelatour.com.br/#perguntas');
if(!f) throw new Error('sem FAQPage');
if(f['@type']!=='FAQPage') throw new Error('tipo errado');
if(f.mainEntity.length!==12) throw new Error('nao sao 12: '+f.mainEntity.length);
f.mainEntity.forEach(q=>{ if(!q.name||!q.acceptedAnswer||!q.acceptedAnswer.text) throw new Error('pergunta incompleta'); });
if(JSON.stringify(j).match(/price|Offer/i)) throw new Error('preco no JSON-LD');
console.log('FAQ OK');
"
```

6. `git status --porcelain` lista **apenas** `index.html` e `verify-agents.cjs`

## Entrega

Deixe as mudanças no worktree, sem commit. No fim, cole a saída literal dos seis
comandos e o `git diff --stat`.
