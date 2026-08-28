# Tarefa: corrigir cinco pontos reprovados na auditoria

Projeto React + Vite. Você trabalha somente dentro desta pasta.

## Arquivos que pode alterar

`src/App.js` e `src/App.css` — e nenhum outro. Não crie arquivos. Não rode `git`.
Não faça commit. Não mexa em `routeMedia`, `mediaFiles`, `trailGallery`,
`benefitMedia`, nem no componente `MediaPopup`.

## Correção 1 — link dentro de botão é HTML inválido

Hoje a seção de depoimentos tem um `<a>` dentro de um `<button>`:

```jsx
<button type="button" className="testimonial-item" onClick={...}>
  <img ... />
  {testimonial.instagram && (
    <div className="testimonial-handle">
      <a href={testimonial.profile} target="_blank" rel="noopener noreferrer" ...>
```

Elemento clicável dentro de outro elemento clicável é HTML inválido e quebra
leitor de tela e navegação por teclado.

Reescreva assim: a raiz de cada depoimento passa a ser um `<figure>` com a classe
`testimonial-item`. Dentro dele:

- um `<button type="button">` com a classe `testimonial-open`, contendo só a
  `<img>`, com o mesmo `onClick` que já chama `openMedia`;
- e, quando houver Instagram, o `<div className="testimonial-handle">` com o
  `<a>` dentro, como IRMÃO do botão, nunca dentro dele.

Com isso o `event.stopPropagation()` do link deixa de ser necessário: remova-o.

## Correção 2 — o print do depoimento está sendo cortado

Hoje `.testimonial-item img` usa `object-fit: cover`, e o depoimento 03, que é
quase quadrado, aparece com o texto da conversa cortado nas laterais. Print de
conversa é imagem de texto e não pode ser cortado.

Troque para `object-fit: contain`, e mantenha o fundo `#111111` na moldura, do
mesmo jeito que a galeria de fotos já faz.

## Correção 3 — a foto deitada encosta no topo da moldura

Na galeria de fotos, a primeira foto (`13.jpeg`, deitada) fica colada no topo da
célula e a faixa de fundo sobra toda embaixo. A foto tem que ficar centralizada
na moldura, sobrando faixa igual em cima e embaixo.

Em `.gallery-item`, acrescente `display: flex`, `align-items: center` e
`justify-content: center`. Faça o mesmo na moldura dos depoimentos, para a
imagem ficar centralizada lá também.

## Correção 4 — classe de CSS que não existe no HTML

Em `src/App.css` existe a regra `.testimonial-handleInstagram`, que nenhum
elemento usa — o ícone é um componente `<Instagram size={18} />` e não tem essa
classe. Apague a regra.

## Correção 5 — recuo do código

O bloco `<section className="social-proof section-pad">` em `src/App.js` foi
colado sem recuo nenhum, encostado na margem, enquanto o resto do arquivo usa
recuo de dois espaços por nível. Reindente esse bloco inteiro no padrão do
arquivo.

Em `src/App.css`, as regras `.testimonial-*` e a regra `.gallery-grid` de dentro
da media query estreita foram escritas com três espaços de recuo, enquanto o
arquivo usa dois. Reindente essas regras.

## Estilo do código

Uma instrução por linha, nomes por extenso, sem abreviação. Não deixe comentário
com o seu raciocínio no arquivo.

## Pronto quando

`node_modules/.bin/vite build` termina sem erro. Rode esse comando você mesmo
antes de terminar e diga a saída dele no seu relatório.

## No relatório final, diga

1. O JSX final de um depoimento com Instagram e de um sem Instagram.
2. O CSS final de `.gallery-item`, `.testimonial-item`, `.testimonial-open` e
   `.testimonial-item img`.
3. A saída do build.
