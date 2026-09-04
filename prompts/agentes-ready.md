# TAREFA: deixar o site wlfavelatour.com.br pronto para agentes de IA

Você trabalha SOMENTE dentro do diretório que recebeu (`--dir`). Não saia dele,
não faça commit, não rode `git push`.

O projeto é um site estático: React 19 + Vite 7, sem backend, publicado na
Vercel. O `index.html` da raiz é o template; a pasta `public/` é copiada como
está para a saída do build (`dist/`).

Já existem, prontos e **não devem ser alterados**:
`public/llms.txt`, `public/md/index.md`, `public/md/about.md`,
`public/md/contact.md`, `public/md/privacy.md`, `public/md/404.md`.

Leia esses arquivos antes de começar: o conteúdo das páginas HTML que você vai
criar é a versão HTML deles, com o mesmo texto.

## O que criar e alterar

### 1. `public/pagina.css` (novo)

Folha de estilo única, compartilhada pelas páginas institucionais. Deve seguir a
identidade visual já existente no site:

- fundo `#080907`, texto `#f0ede5`, texto secundário `#9A9A9A`
- cor de destaque `#E8A521` (links, `h1`, bordas)
- superfície de bloco `#151410`
- fonte `Montserrat, sans-serif` (a fonte é carregada por `<link>` na página)
- `main` com `max-width: 760px`, centralizado, `padding: 48px 20px 80px`
- `line-height: 1.7`, `h1` com `font-size: clamp(28px, 5vw, 40px)`
- `h2` com `font-size: 20px`, `margin-top: 40px`, cor `#f0ede5`
- links sublinhados na cor de destaque, com `:hover` e `:focus-visible` visíveis
- tabelas com `width: 100%`, `border-collapse: collapse`, borda `1px solid #2a281f`, células com `padding: 10px`
- classe `.voltar` (link de retorno, menor, cor `#9A9A9A`)
- classe `.rodape` (`margin-top: 56px`, `padding-top: 24px`, `border-top: 1px solid #2a281f`, cor `#9A9A9A`)
- classe `.md` para blocos `<pre>` de markdown: `white-space: pre-wrap`, fundo `#151410`, `padding: 16px`, `border-radius: 8px`, `overflow-x: auto`
- responsivo: em telas até 600px, reduzir o `padding` lateral para 16px

Sem framework, sem CSS gerado por ferramenta: CSS puro, escrito à mão.

### 2. `public/about.html`, `public/contact.html`, `public/privacy.html` (novos)

Uma página por arquivo, HTML estático completo, em `lang="pt-BR"`.

O texto de cada página é **exatamente** o conteúdo do markdown correspondente
(`public/md/about.md`, `contact.md`, `privacy.md`), convertido para HTML
semântico: `#` vira `<h1>`, `##` vira `<h2>`, parágrafos viram `<p>`, listas
viram `<ul>`/`<ol>`, tabelas markdown viram `<table>` com `<thead>`/`<tbody>`,
`**negrito**` vira `<strong>`, e links markdown viram `<a>`. Não invente,
não resuma e não acrescente frase nenhuma ao texto.

Cada página precisa ter, no `<head>`:

- `<meta charset="UTF-8">` e o viewport padrão
- `<meta name="theme-color" content="#080907">`
- `<title>` próprio, terminando em `| WL Tour Experience`
- `<meta name="description">` de 120 a 160 caracteres, descrevendo aquela página
- `<link rel="canonical">` para `https://www.wlfavelatour.com.br/about`,
  `/contact` ou `/privacy`, conforme a página
- `<link rel="alternate" type="text/markdown" href="https://www.wlfavelatour.com.br/md/<nome>.md">`
- `<meta name="robots" content="index, follow">`
- `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`
- os dois `<link rel="preconnect">` para `https://fonts.googleapis.com` e
  `https://fonts.gstatic.com` (este com `crossorigin`), e o `<link>` da fonte
  `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap`
- `<link rel="stylesheet" href="/pagina.css">`

E no `<body>`: um `<main>` com um link `<a class="voltar" href="/">← Voltar para
a home</a>` no topo, o conteúdo, e no fim uma `<nav class="rodape">` com links
para as outras páginas institucionais, para `/` e para a versão markdown
daquela página.

Cada uma das três páginas precisa ter **no mínimo 900 caracteres de texto
visível** (fora marcação). Os markdowns já garantem isso; basta não cortar nada.

### 3. `public/404.html` (novo)

Mesma estrutura visual e mesmo `<head>` das outras (canonical não se aplica: use
`<meta name="robots" content="noindex, follow">` e não coloque `<link rel="canonical">`).

Conteúdo: o texto de `public/md/404.md` convertido em HTML, com os links
funcionando. Além disso, **abaixo** do conteúdo, inclua o markdown bruto de
`public/md/404.md` dentro de um `<pre class="md">`, para que um agente que leia
o HTML encontre o corpo em markdown. Escape `<` e `>` se houver.

### 4. `middleware.js` na raiz do projeto (novo)

Edge Middleware da Vercel, sem nenhuma dependência externa (não importe
`@vercel/edge`, não instale nada). Comportamento:

```
export const config = { matcher: ["/", "/about", "/contact", "/privacy"] };

export default async function middleware(request) { ... }
```

Regra: se o cabeçalho `Accept` da requisição contiver `text/markdown`, o
middleware busca o arquivo markdown equivalente no próprio site e devolve o
conteúdo dele. O mapa é:

- `/` → `/md/index.md`
- `/about` → `/md/about.md`
- `/contact` → `/md/contact.md`
- `/privacy` → `/md/privacy.md`

A resposta em markdown deve ter status 200 e estes cabeçalhos, exatamente:

- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept, Accept-Encoding`
- `Cache-Control: public, max-age=0, must-revalidate`
- `Link: <https://www.wlfavelatour.com.br/llms.txt>; rel="alternate"; type="text/plain"`

Como buscar o arquivo: `await fetch(new URL(caminhoMd, request.url))`. Se o
`fetch` falhar ou vier com status diferente de 200, o middleware **não** pode
quebrar a página: nesse caso ele retorna `undefined`, deixando a requisição
seguir para o HTML normal. Requisição sem `text/markdown` no `Accept` também
retorna `undefined`.

Comente em português, no arquivo, por que o `Vary: Accept` é obrigatório
(sem ele o CDN pode servir a variante HTML em cache para quem pediu markdown).

### 5. `vercel.json` na raiz (novo — hoje não existe)

Conteúdo:

- `"cleanUrls": true` (para `/about` servir `public/about.html`)
- `"trailingSlash": false`
- `"headers"`: uma regra com `"source": "/(.*)"` acrescentando
  `Vary: Accept, Accept-Encoding` e `X-Content-Type-Options: nosniff`; e uma
  regra `"source": "/(.*).md"` com `Content-Type: text/markdown; charset=utf-8`
- `"rewrites"`: `/sobre` → `/about`, `/contato` → `/contact`,
  `/privacidade` → `/privacy` (rewrite, nunca redirect — o endereço em
  português precisa responder 200 sem mudar a URL)

JSON válido, sem comentários.

### 6. `index.html` da raiz — alterar SOMENTE o bloco JSON-LD

No `<script type="application/ld+json">` existente há um `@graph` com
`TravelAgency`, `TouristTrip` e `WebSite`. Faça, sem mexer em mais nada do
arquivo:

- No nó `#organizacao`, troque `"@type": "TravelAgency"` por
  `"@type": ["Organization", "TravelAgency", "LocalBusiness"]`, mantendo todo o
  resto do nó como está.
- Acrescente a esse mesmo nó, sem remover nada:
  - `"legalName": "WL Tour Experience"`
  - `"email": "Wallacetoretto37@gmail.com"`
  - `"foundingDate": "2024"`
  - `"knowsLanguage": ["pt-BR", "es", "en"]`
  - `"address"`: objeto `PostalAddress` com
    `"addressLocality": "Rio de Janeiro"`, `"addressRegion": "RJ"`,
    `"addressCountry": "BR"`, `"postalCode": "22450-000"`
  - `"contactPoint"`: um array com dois objetos `ContactPoint`:
    1. `"contactType": "customer service"`, `"telephone": "+55-21-99555-0707"`,
       `"email": "Wallacetoretto37@gmail.com"`,
       `"availableLanguage": ["Portuguese", "Spanish", "English"]`,
       `"contactOption": "TollFree"` **não** deve ser usado; em vez disso use
       `"hoursAvailable"`: um `OpeningHoursSpecification` com
       `"dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]`,
       `"opens": "07:00"`, `"closes": "21:00"`
    2. `"contactType": "reservations"`, `"telephone": "+55-21-99555-0707"`,
       `"url": "https://wa.me/5521995550707"`,
       `"availableLanguage": ["Portuguese", "Spanish", "English"]`
  - `"founder"`: objeto `Person` com `"name": "Wallace Oliveira"`
- Acrescente ao array `sameAs` nada de novo (deixe como está).
- Acrescente ao `@graph` um nó novo `"@type": "WebPage"` com
  `"@id": "https://www.wlfavelatour.com.br/#pagina"`,
  `"url": "https://www.wlfavelatour.com.br/"`,
  `"name": "WL Tour Experience"`,
  `"description"` igual à `<meta name="description">` da própria página,
  `"inLanguage": "pt-BR"`,
  `"isPartOf": { "@id": "https://www.wlfavelatour.com.br/#site" }`,
  `"about": { "@id": "https://www.wlfavelatour.com.br/#organizacao" }`.

O JSON-LD final tem que ser JSON válido. Confira rodando
`node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);JSON.parse(m[1]);console.log('json-ld ok')"`.

Também acrescente no `<head>` do `index.html`, logo depois do `<link rel="canonical">`:

```
<link rel="alternate" type="text/markdown" href="https://www.wlfavelatour.com.br/md/index.md" />
```

Nada mais do `index.html` pode mudar.

### 7. `public/sitemap.xml` — alterar

Acrescentar as URLs `https://www.wlfavelatour.com.br/about`,
`/contact` e `/privacy`, cada uma com `<changefreq>yearly</changefreq>` e
`<priority>0.5</priority>`. Manter a entrada da home como está. XML válido.

### 8. `public/robots.txt` — alterar

Manter o que já existe e acrescentar, ao final, uma linha em branco e
`# llms.txt: https://www.wlfavelatour.com.br/llms.txt`.

### 9. `verify-agents.cjs` na raiz (novo) — o teste desta tarefa

Script Node em CommonJS, sem dependências, que roda com `node verify-agents.cjs`
e valida **os arquivos do build** (`dist/`) e as configurações. Ele deve:

1. Falhar com mensagem clara e `process.exit(1)` no primeiro problema.
2. Conferir que existem em `dist/`: `about.html`, `contact.html`,
   `privacy.html`, `404.html`, `pagina.css`, `llms.txt`, `sitemap.xml`,
   `robots.txt`, e os cinco arquivos de `dist/md/`.
3. Conferir que `about.html`, `contact.html` e `privacy.html` têm cada um mais
   de 900 caracteres de texto visível — medindo depois de remover
   `<script>...</script>`, `<style>...</style>` e todas as tags.
4. Conferir que cada uma dessas três páginas tem `<title>`, uma
   `<meta name="description">` com 80 caracteres ou mais, um
   `<link rel="canonical">` e um `<link rel="alternate" type="text/markdown">`.
5. Conferir que `dist/404.html` contém um `<pre class="md">` e a string `llms.txt`.
6. Conferir que `dist/llms.txt` contém uma seção de quando usar
   (procure, sem diferenciar maiúsculas, por `quando usar` **e** por `when to use`).
7. Extrair o JSON-LD de `dist/index.html`, fazer `JSON.parse`, e conferir que
   existe no `@graph` um nó cujo `@type` inclui `Organization`, e que esse nó
   tem `address` do tipo `PostalAddress` e pelo menos um `contactPoint` com
   `contactType` e (`telephone` ou `email`).
8. Conferir que `vercel.json` é JSON válido, tem `cleanUrls: true`, tem uma
   regra de header aplicando `Vary` contendo `Accept` em `/(.*)`, e tem os três
   rewrites em português.
9. Conferir que `middleware.js` existe, exporta um `config` com `matcher`
   contendo as quatro rotas, e contém as strings `text/markdown` e
   `Vary`.
10. Conferir que `dist/sitemap.xml` contém as quatro URLs.
11. Imprimir `OK: <n> verificações` no fim, com o número real de verificações.

Escreva as mensagens de erro em português.

## O que NÃO fazer

- Não altere `src/`, `package.json`, `vite.config.js`, `tailwind.config.cjs`,
  `quick-verify.cjs`, `scripts/prerender.mjs`, `docs/`, `tarefas.md`, nem
  qualquer arquivo de `public/md/` ou `public/llms.txt`.
- Não instale dependência nenhuma.
- Não faça commit.
- Não mexa em `index.html` fora do JSON-LD e da linha `<link rel="alternate">`.

## PRONTO QUANDO

Estes três comandos rodam limpos, na raiz do diretório de trabalho:

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

O `quick-verify.cjs` já existia e precisa continuar passando: ele é a linha de
base desta tarefa. O `verify-agents.cjs` é o teste novo.

No fim, escreva um relatório curto listando: os arquivos criados, os arquivos
alterados, e a saída literal dos três comandos acima.
