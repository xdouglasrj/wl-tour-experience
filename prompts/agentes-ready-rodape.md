# TAREFA: links institucionais no rodapé da home

Trabalhe SOMENTE dentro deste diretório. Não faça commit, não instale nada.

O site já ganhou três páginas institucionais estáticas — `/about`, `/contact` e
`/privacy` (arquivos `public/about.html`, `public/contact.html`,
`public/privacy.html`). Hoje elas existem, mas **não há nenhum link para elas na
home**: um visitante ou um agente que entre pela home não chega nelas clicando.

## O que fazer

No `src/App.js`, dentro da `<div className="footer-note">` que fica no final do
`<footer>`, acrescente **uma linha nova de links**, logo ANTES do
`{l.footerNote}`:

```jsx
<div className="footer-links">
  <a href="/about">{l.labels.about}</a>
  <a href="/contact">{l.labels.contactPage}</a>
  <a href="/privacy">{l.labels.privacy}</a>
</div>
```

Não mexa em mais nada do rodapé: o `{l.footerNote}`, o `<span>` do copyright e o
link do `footer-credit` continuam exatamente como estão.

### Textos por idioma

O objeto de idiomas do `src/App.js` tem três blocos (`pt`, `en`, `es`), e cada um
tem um `labels: { ... }`. Acrescente três chaves novas dentro de cada `labels`,
sem remover nenhuma chave existente:

- `pt`: `about: "SOBRE"`, `contactPage: "CONTATO"`, `privacy: "PRIVACIDADE"`
- `en`: `about: "ABOUT"`, `contactPage: "CONTACT"`, `privacy: "PRIVACY"`
- `es`: `about: "SOBRE"`, `contactPage: "CONTACTO"`, `privacy: "PRIVACIDAD"`

Use `contactPage` mesmo: já existe um `contact` em `labels` com outro uso, e ele
não pode ser alterado.

## Estilo

No `src/App.css`, acrescente uma regra nova `.footer-links`, junto das outras
regras de rodapé (perto de `.footer-note`, por volta da linha 902). Ela deve
seguir o que já existe no arquivo, sem inventar cor nova:

- `display: flex`, `justify-content: center`, `gap: 20px`, `flex-wrap: wrap`
- `margin-bottom: 18px`
- os links de dentro (`.footer-links a`): mesma família e peso de fonte do
  `.footer-note`, `font-size: 11px`, `letter-spacing: 0.14em`,
  `text-transform: uppercase`, `text-decoration: none`, cor `#9A9A9A`
- `.footer-links a:hover` e `.footer-links a:focus-visible`: cor `#E8A521`
- o `:focus-visible` precisa ter contorno visível (`outline: 1px solid #E8A521`
  e `outline-offset: 3px`)

Leia as regras vizinhas do `App.css` antes de escrever e mantenha o mesmo estilo
de escrita do arquivo.

## O que NÃO tocar

Nada além de `src/App.js` e `src/App.css`. Não mexa em `index.html`,
`public/`, `vercel.json`, `middleware.js`, `quick-verify.cjs` nem
`verify-agents.cjs`.

## PRONTO QUANDO

Estes três comandos rodam limpos, na raiz deste diretório:

```
npm run build
node quick-verify.cjs
node verify-agents.cjs
```

E este comando imprime as três URLs, provando que os links foram para o HTML
prerenderizado:

```
node -e "const h=require('fs').readFileSync('dist/index.html','utf8');for(const p of ['/about','/contact','/privacy']) if(!h.includes('href=\"'+p+'\"')) {console.error('FALTA '+p);process.exit(1)}; console.log('links no dist: ok')"
```

No relatório final, cole a saída literal dos quatro comandos.
