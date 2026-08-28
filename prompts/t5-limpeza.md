# Tarefa: acertar recuo e propriedades erradas nos depoimentos

Projeto React + Vite. Só `src/App.js` e `src/App.css` podem mudar. Não crie
arquivos, não rode `git`, não faça commit. Não mude comportamento nenhum: esta
tarefa é só arrumação.

## 1. Recuo do JSX

Em `src/App.js`, dentro da seção `social-proof`, o `<figure key={index}
className="testimonial-item">` está encostado na margem, e o bloco dentro dele
usa três espaços de recuo. O arquivo inteiro usa dois espaços por nível.
Reindente o `<figure>` e tudo que está dentro dele no padrão do arquivo,
alinhado com o `{testimonials.map(...)}` que o envolve.

## 2. Recuo do CSS

Em `src/App.css`, estas regras foram escritas com três espaços de recuo, e o
arquivo usa dois: `.gallery-item`, `.testimonial-grid`, `.testimonial-item`,
`.testimonial-item img`, `.testimonial-handle`, e a `.gallery-grid` que está
dentro da media query de tela estreita. Reindente todas para dois espaços.

## 3. Propriedades de botão numa regra que não é mais botão

`.testimonial-item` hoje é um `<figure>`, mas a regra ainda carrega
`border: none`, `background: none`, `padding: 0` e `cursor: pointer`, que só
faziam sentido quando era `<button>`. Deixe a regra assim:

```css
.testimonial-item {
  margin: 0;
  position: relative;
}
```

E complete `.testimonial-open`, que é o botão de verdade, com o que falta para
ele não herdar a aparência padrão de botão do navegador:

```css
.testimonial-open {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
```

## Pronto quando

`node_modules/.bin/vite build` termina sem erro, e a página continua exatamente
com a mesma aparência. Rode o build você mesmo e diga a saída dele.
