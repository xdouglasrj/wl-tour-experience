# Tarefa: trocar as fotos da galeria e enquadrar sem cortar

Projeto React + Vite. Você trabalha somente dentro desta pasta.

## Arquivos que pode alterar

`src/App.js` e `src/App.css` — e nenhum outro. Não crie arquivos. Não rode `git`.
Não faça commit. Não altere `index.html`, `package.json`, `src/index.css`.

Dentro do `src/App.js`, mexa somente na constante `images`, na constante
`gallery`, e apague a linha de comentário `// new entries` que está dentro do
objeto `mediaFiles`. Não toque em `routeMedia`, `trailGallery`, `benefitMedia`,
nem em nenhum componente.

## O que existe hoje

Em `src/App.js`:

```js
const gallery = [
  [images.rocinha, "Passeio turístico com vista panorâmica da Rocinha e Rio de Janeiro"],
  [images.art, "Graffiti e cultura urbana na Rocinha"],
  [images.christ, "Vista do Rio de Janeiro com o Cristo Redentor"],
  [images.moto, "Experiência turística de moto no Rio de Janeiro"],
  [images.city, "Montanhas e paisagem urbana do Rio de Janeiro"],
];
```

Cada item é um par `[endereço da imagem, texto alternativo]`, e a página percorre
esse array com `gallery.map(([src, alt], i) => ...)`, dando a cada figura a
classe `gallery-${i + 1}`.

Em `src/App.css`:

```css
.gallery-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 0.9fr;
  grid-template-rows: 280px 230px;
  gap: 13px;
}
.gallery-item { margin: 0; position: relative; overflow: hidden; background: #222; }
.gallery-item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s, filter 0.5s; filter: saturate(0.82);
}
.gallery-item:hover img { transform: scale(1.04); filter: saturate(1.1); }
.gallery-1 { grid-row: span 2; }
.gallery-4 { grid-column: span 2; }
```

E mais abaixo, dentro de uma media query de tela estreita:

```css
.gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 240px 180px 180px; }
.gallery-1 { grid-row: span 1; }
.gallery-3 { grid-column: span 2; }
.gallery-4 { grid-column: span 1; }
```

## O que fazer

### 1. As fotos

A galeria passa a ter QUATRO fotos, todas da pasta `img/`, nesta ordem:

| Ordem | Arquivo | Tamanho |
|---|---|---|
| 1 | `13.jpeg` | 1600 × 1204 (deitada) |
| 2 | `11.jpeg` | 826 × 1600 (em pé) |
| 3 | `3.jpeg` | 742 × 1280 (em pé) |
| 4 | `9.jpeg` | 1200 × 1600 (em pé) |

Os endereços entram por `new URL("../img/13.jpeg", import.meta.url).href`, do
mesmo jeito que as entradas do objeto `mediaFiles` que já está no arquivo.
Escreva um texto alternativo em português para cada uma, descrevendo o que se vê,
sem inventar lugar nem nome de pessoa. As fotos são de passeios turísticos da WL
Tour pela Rocinha e pelo Rio de Janeiro.

Saem as cinco fotos de banco de imagem. Depois disso, apague de `images` as
chaves `rocinha`, `art`, `moto` e `city`, MAS só depois de conferir por busca no
arquivo inteiro que nenhuma outra parte da página usa cada uma. A chave
`images.christ` continua sendo usada na seção "story" e NÃO pode ser removida.

### 2. A moldura

A galeria vira um quadro com molduras iguais, e a foto aparece inteira, nunca
cortada. Aplique exatamente estas medidas:

| Medida | Valor |
|---|---|
| Colunas em tela larga | `repeat(4, 1fr)` |
| Colunas na media query estreita que já existe | `repeat(2, 1fr)` |
| `grid-template-rows` | remover nos dois lugares |
| Proporção da célula | `aspect-ratio: 3 / 4` |
| Encaixe da imagem | `object-fit: contain` |
| Fundo da célula | `#111111` |
| Borda da célula | `1px solid rgba(255, 255, 255, 0.1)` |
| Raio da célula | `12px` |
| `gap` | `13px` (o mesmo de hoje) |
| Saturação em repouso | `saturate(0.82)` (mantém) |
| Hover | `scale(1.04)` e `saturate(1.1)` (mantém) |

As regras `.gallery-1`, `.gallery-3` e `.gallery-4` que dão `span` de linha ou de
coluna deixam de existir, nos dois lugares: com quatro colunas iguais, cada foto
ocupa uma célula só.

## Estilo do código

O trecho novo tem que ler como o código em volta: uma instrução por linha, nomes
por extenso, sem abreviação. Não deixe comentário com o seu raciocínio no
arquivo.

## Pronto quando

`node_modules/.bin/vite build` termina sem erro. Rode esse comando você mesmo
antes de terminar e diga a saída dele no seu relatório.

## No relatório final, diga

1. O conteúdo final de `gallery`.
2. Quais chaves de `images` você apagou, e como conferiu que ninguém as usava.
3. O CSS final de `.gallery-grid`, `.gallery-item` e `.gallery-item img`, nos
   dois lugares.
4. A saída do build.
