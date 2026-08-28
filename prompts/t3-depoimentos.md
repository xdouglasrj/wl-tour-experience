# Tarefa: publicar os quatro depoimentos

Projeto React + Vite. Você trabalha somente dentro desta pasta.

## Arquivos que pode alterar

`src/App.js` e `src/App.css` — e nenhum outro. Não crie arquivos. Não rode `git`.
Não faça commit.

Não toque em `routeMedia`, `trailGallery`, `benefitMedia`, `gallery`, nem no
componente `MediaPopup`.

## O que existe hoje

A seção de depoimentos, em `src/App.js`, está assim:

```jsx
<section className="social-proof section-pad">
  <div className="social-card">
    <div className="section-label">{l.labels.testimonials}</div>
    <h2 className="display-title">{t.testimonials}</h2>
    <div className="coming">
      <span className="coming-dot" />
      <strong>{t.soon}</strong>
      <p>{t.soonBody}</p>
    </div>
  </div>
</section>
```

A página já tem um popup de mídia pronto, aberto pela função `openMedia`, que é
usada assim em outros pontos do arquivo:

```jsx
onClick={(event) => openMedia({ type: "image", src }, titulo, event.currentTarget)}
```

O ícone `Instagram` do pacote `lucide-react` já está importado no topo do
arquivo.

## O que fazer

### 1. Os quatro depoimentos

Crie perto das outras constantes de mídia, no topo do arquivo, uma constante com
os quatro depoimentos. Os arquivos ficam na pasta `img/` e entram por
`new URL("../img/depoimento 01.jpeg", import.meta.url).href` — o nome tem espaço
e vai literal.

| Arquivo | Instagram | Endereço do perfil |
|---|---|---|
| `depoimento 01.jpeg` | `@miguelfreitassjj` | `https://www.instagram.com/miguelfreitassjj/` |
| `depoimento 02.jpeg` | `@hamzasosa` | `https://www.instagram.com/hamzasosa/` |
| `depoimento 03.jpeg` | não se identificou | — |
| `depoimento 04.jpeg` | não se identificou | — |

### 2. A seção

Some o bloco `<div className="coming">` inteiro. No lugar dele entra uma grade
com as quatro miniaturas, nesta ordem: 01, 02, 03, 04.

Cada miniatura:

- É um `<button type="button">` com a imagem dentro. O clique abre o print no
  popup, chamando `openMedia({ type: "image", src }, titulo, event.currentTarget)`.
- Nos dois que têm Instagram, sobre a foto, no rodapé da miniatura, aparece um
  link para o perfil com o ícone `Instagram` e o `@` ao lado. O link tem
  `target="_blank"` e `rel="noopener noreferrer"`.
- O clique no link do Instagram abre o perfil e NÃO pode abrir o popup junto:
  chame `event.stopPropagation()` no `onClick` do link.
- Os dois sem identificação não recebem link, ícone nem nome nenhum.
- O texto alternativo diz que é um print de depoimento de cliente da WL Tour, e
  cita o `@` quando houver.

Não invente nome, texto de depoimento, nota, estrela ou número de cliente. Só o
que está na tabela acima.

### 3. Os textos que saem

Apague as chaves `soon` e `soonBody` das três línguas dentro do objeto `copy`
(`pt`, `en`, `es`), já que nada mais as usa. Confira por busca antes de apagar.
As chaves `testimonials` continuam e não mudam.

Se as regras CSS `.coming` e `.coming-dot` ficarem sem uso, apague as duas de
`src/App.css`. Confira por busca antes.

### 4. O CSS novo

| Medida | Valor |
|---|---|
| Colunas em tela larga | `repeat(4, 1fr)` |
| Colunas na media query estreita que já existe no arquivo | `repeat(2, 1fr)` |
| `gap` | `13px` |
| Proporção da miniatura | `aspect-ratio: 3 / 4` |
| Encaixe da imagem | `object-fit: cover` com `object-position: top` |
| Raio | `12px` |
| Borda | `1px solid rgba(255, 255, 255, 0.1)` |
| Fundo | `#111111` |
| Botão | sem borda própria, sem fundo próprio, `padding: 0`, `cursor: pointer` |
| Faixa do `@` | encostada no rodapé da miniatura, largura inteira, fundo `rgba(0, 0, 0, 0.7)`, texto branco, `padding: 8px 10px` |
| Ícone do Instagram | `18px`, branco, ao lado do `@` |

Use nomes de classe novos e próprios, no mesmo estilo dos que já existem no
arquivo (por exemplo `testimonial-grid`, `testimonial-item`, `testimonial-handle`).
A media query estreita que você deve usar é a mesma onde já estão
`.gallery-grid` e `.why-grid`.

## Estilo do código

O trecho novo tem que ler como o código em volta: uma instrução por linha, nomes
por extenso, sem abreviação. Não deixe comentário com o seu raciocínio no
arquivo.

## Pronto quando

`node_modules/.bin/vite build` termina sem erro. Rode esse comando você mesmo
antes de terminar e diga a saída dele no seu relatório.

## No relatório final, diga

1. A constante nova dos depoimentos.
2. O JSX final da seção.
3. O CSS novo, e o que você apagou de `.coming`.
4. A saída do build.
