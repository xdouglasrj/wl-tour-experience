# Tarefa — SEO legível por máquina (WL Tour Experience)

Você trabalha em uma landing page React + Vite 7 já aprovada pelo cliente. O
objetivo desta tarefa é deixar o site legível para o Google e para robôs de IA.
Não altere texto de venda, cor, foto, botão nem ordem de seção.

## Fronteira

Você só pode criar ou alterar estes arquivos:

- `public/robots.txt` (criar)
- `public/sitemap.xml` (criar)
- `public/favicon.svg` (mover o arquivo `favicon.svg` da raiz para cá, conteúdo idêntico)
- `index.html` (alterar)
- `src/App.js` (alterar apenas o trecho descrito no item 5)

Não toque em nenhum outro arquivo. Não rode `git commit`. Não altere
`package.json`, `vite.config.js` nem nada em `src/` além do item 5.

## Contexto técnico verificado agora

- Vite 7.3.6, `publicDir` no padrão — hoje **não existe** pasta `public/`, por
  isso `favicon.svg` e `robots.txt` que estão na raiz do repositório NÃO são
  copiados para `dist/` e respondem 404 no site publicado. Criar a pasta
  `public/` resolve: tudo que estiver nela é copiado para a raiz de `dist/`.
- O domínio definitivo do site é `https://wlfavelatour.com.br` (sem `www`).
- O `index.html` atual referencia `https://rocinha-tour.preview.emergentagent.com/`,
  que é o endereço antigo de preview e não vale mais.

## Item 1 — `public/robots.txt`

O arquivo atual na raiz veio pronto da Cloudflare e bloqueia os robôs de IA que o
cliente quer atrair. Crie `public/robots.txt` com exatamente este conteúdo, e
apague o `robots.txt` da raiz:

```
User-agent: *
Allow: /

Sitemap: https://wlfavelatour.com.br/sitemap.xml
```

## Item 2 — `public/sitemap.xml`

O site é de página única. Crie:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://wlfavelatour.com.br/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## Item 3 — endereços do `index.html`

No `<head>` do `index.html`:

- `<link rel="canonical">` hoje é `href="index.html"` (relativo e inválido).
  Trocar por `href="https://wlfavelatour.com.br/"`.
- `og:url` hoje é `https://rocinha-tour.preview.emergentagent.com/`.
  Trocar por `https://wlfavelatour.com.br/`.
- `og:image` hoje é `/src/assets/hero-rocinha-desktop.jpg`, caminho que não
  existe no site publicado. As imagens do projeto ficam em `img/` na raiz e são
  importadas pelo bundle. Como não há garantia de caminho estável para essa foto
  no `dist/`, copie `Image_desktop.jpg` da raiz do repositório para
  `public/og-image.jpg` e use `https://wlfavelatour.com.br/og-image.jpg`.
- Acrescentar `<meta property="og:locale" content="pt_BR" />` e
  `<meta property="og:site_name" content="WL Tour Experience" />`.

## Item 4 — dados estruturados escritos direto no HTML

Acrescente no `<head>` do `index.html`, antes de `</head>`, um bloco
`<script type="application/ld+json">` com o JSON abaixo. Ele precisa estar no
HTML servido, escrito à mão — não gerado por JavaScript.

Use exatamente estes dados. Eles foram confirmados com o cliente. **Não invente
preço, nota de avaliação, número de clientes, endereço de rua, CEP nem horário de
funcionamento** — nada disso foi fornecido, e inventar é proibido.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://wlfavelatour.com.br/#organizacao",
      "name": "WL Tour Experience",
      "url": "https://wlfavelatour.com.br/",
      "description": "Guia local de turismo com passeio guiado na Rocinha e experiências no Rio de Janeiro.",
      "telephone": "+5521995550707",
      "image": "https://wlfavelatour.com.br/og-image.jpg",
      "sameAs": ["https://www.instagram.com/wl.rocinha95/"],
      "availableLanguage": ["pt-BR", "en", "es"],
      "areaServed": {
        "@type": "City",
        "name": "Rio de Janeiro",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rio de Janeiro",
          "addressRegion": "RJ",
          "addressCountry": "BR"
        }
      }
    },
    {
      "@type": "TouristTrip",
      "@id": "https://wlfavelatour.com.br/#passeio-rocinha",
      "name": "Passeio guiado na Rocinha",
      "description": "Passeio guiado na Rocinha com guia local: subida ao topo com deslocamento de moto táxi, vista panorâmica, capoeira, graffiti, Curva do S e registros fotográficos profissionais.",
      "touristType": ["Turismo cultural", "Turismo comunitário"],
      "inLanguage": ["pt-BR", "en", "es"],
      "provider": { "@id": "https://wlfavelatour.com.br/#organizacao" },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "item": { "@type": "TouristAttraction", "name": "Topo da Rocinha e vista panorâmica" } },
          { "@type": "ListItem", "position": 2, "item": { "@type": "TouristAttraction", "name": "Roda de capoeira" } },
          { "@type": "ListItem", "position": 3, "item": { "@type": "TouristAttraction", "name": "Graffiti da comunidade" } },
          { "@type": "ListItem", "position": 4, "item": { "@type": "TouristAttraction", "name": "Curva do S" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://wlfavelatour.com.br/#site",
      "url": "https://wlfavelatour.com.br/",
      "name": "WL Tour Experience",
      "inLanguage": "pt-BR",
      "publisher": { "@id": "https://wlfavelatour.com.br/#organizacao" }
    }
  ]
}
```

## Item 5 — remover o JSON-LD gerado por JavaScript

Em `src/App.js`, por volta da linha 669, existe um `useEffect` que monta um
objeto `schema` do tipo `Organization` e injeta um `<script type="application/ld+json">`
no `document.head`. Ele agora é redundante e conflita com o bloco do item 4
(dois blocos descrevendo a mesma organização com tipos diferentes).

Apague esse `useEffect` inteiro, incluindo o objeto `schema`, a criação do
elemento, o `appendChild` e o `return () => el.remove()`. Não mexa em nenhum
outro `useEffect` do arquivo — em especial, **preserve intacto** o `useEffect`
logo acima, que ajusta `document.documentElement.lang` e `document.title`
conforme o idioma.

## Convenção de código deste repositório

O trecho novo tem que ler como o código em volta dele. Uma instrução por linha.
Nada de ternário dentro de ternário. Nada de nome abreviado onde o arquivo ao
redor escreve por extenso. Não deixe comentário registrando sua dúvida ou seu
raciocínio: comentário registra o que o código não diz, nunca o que você achou.

## Pronto quando

Todos estes comandos passam, rodados na raiz do projeto:

1. `npm run build` termina sem erro.
2. `ls dist/robots.txt dist/sitemap.xml dist/favicon.svg dist/og-image.jpg` lista os quatro arquivos.
3. `grep -c "application/ld+json" dist/index.html` responde `1`.
4. `grep -c "emergentagent" index.html` responde `0`.
5. `grep -c "wlfavelatour.com.br/\"" dist/index.html` responde 2 ou mais (canonical e og:url).
6. `node -e "const h=require('fs').readFileSync('dist/index.html','utf8');const m=h.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);JSON.parse(m[1]);console.log('json-ld valido')"` imprime `json-ld valido`.
7. `grep -c "ld+json" src/App.js` responde `0`.

## Fora de escopo

Pré-renderizar o HTML da página (gerar o texto das seções dentro do
`dist/index.html`). Isso é outra tarefa e será feito depois — não tente resolver
aqui, não instale nenhuma dependência nova.
