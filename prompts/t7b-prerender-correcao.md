# Correção — a pré-renderização que você entregou não funciona

Você entregou `src/entry-server.js`, `scripts/prerender.mjs`, e alterações em
`package.json`, `src/index.js`, `vite.config.js` e `.gitignore`, no projeto
React 19 + Vite 7 da landing page WL Tour Experience.

A auditoria reprovou. `npm run build` falha. Corrija os três defeitos abaixo.
Não recomece do zero: a estrutura geral (build SSR do Vite + script de injeção +
`hydrateRoot`) está certa.

## Defeito 1 — o caminho do `prerender.mjs` aponta para fora do projeto

Saída literal de `npm run build`:

```
code: 'ENOENT',
syscall: 'open',
path: 'D:\Dev\Landing page\Clientes\Wallace-wl-tuor\dist\index.html'
```

O script usa `resolve("../dist")`. `resolve` com caminho relativo resolve contra
o diretório de trabalho do processo, não contra o arquivo do script — e o script
mora em `scripts/`, uma pasta abaixo da raiz. O resultado saiu um nível acima da
raiz do projeto.

O script já calcula `__dirname` a partir de `import.meta.url` e depois não o usa.
Use-o: a raiz do projeto é o pai de `__dirname`.

## Defeito 2 — o HTML gerado fica inválido, com um documento dentro do outro

`src/entry-server.js` devolve **um documento HTML inteiro**: `<!doctype html>`,
`<html>`, `<head>` com todas as metatags, `<body>`, e o `<div id="root">` já
preenchido.

E o `scripts/prerender.mjs` pega esse documento inteiro e o enfia dentro do
`<div id="root"></div>` do `dist/index.html`. O resultado é um `<!doctype html>`
e um `<html>` completos aninhados dentro de uma `<div>` de outro documento. Isso
é HTML inválido, e é justamente o arquivo que os robôs vão ler.

Além disso, o `entry-server.js` copiou à mão todas as metatags, o `<title>` e o
bloco `application/ld+json` que já existem no `index.html`. Agora o mesmo
conteúdo mora em dois arquivos e vai divergir na primeira alteração.

**Correção:** `src/entry-server.js` deve exportar uma função que devolve
**apenas** a marcação do componente — o retorno de `renderToString(<App />)` e
nada mais. Nenhum `<!doctype>`, nenhum `<html>`, nenhum `<head>`, nenhuma
metatag, nenhum `<title>`, nenhum bloco `ld+json`, nenhum `<div id="root">`.

O `index.html` da raiz continua sendo a única fonte do `<head>`. O
`scripts/prerender.mjs` continua injetando o resultado dentro do
`<div id="root"></div>` do `dist/index.html` produzido pelo build do cliente.

## Defeito 3 — formatação e comentários

- Em `package.json`, o bloco `"scripts"` perdeu a indentação do arquivo (ficou
  colado na margem, com o conteúdo indentado a mais). Devolva a indentação de 2
  espaços que o restante do arquivo usa.
- Em `src/index.js`, a chamada ficou em uma linha só com argumento multilinha,
  enquanto o arquivo original quebrava cada argumento em sua linha. Escreva no
  formato do arquivo original, trocando apenas `createRoot(...).render(...)` por
  `hydrateRoot(...)`.
- Os comentários de `scripts/prerender.mjs` estão em inglês; o repositório
  escreve em português. E comentário registra o que o código não diz — não
  precisa de um comentário por linha explicando o óbvio. `console.log` sem emoji.

## Fronteira

Só pode alterar: `src/entry-server.js`, `scripts/prerender.mjs`,
`package.json`, `src/index.js`, `vite.config.js`. Não toque em `index.html`,
`public/`, `src/App.js`, `src/App.css`, `src/index.css`. Não rode `git commit`.
Não instale nenhuma dependência nova, e nada de navegador headless (Playwright,
Puppeteer, jsdom).

## Pronto quando

Todos passam, rodados na raiz do projeto:

1. `npm run build` termina sem erro.
2. `grep -c "<!doctype html>" dist/index.html` responde `1`.
3. `grep -c "<html" dist/index.html` responde `1`.
4. `grep -c "id=\"root\"" dist/index.html` responde `1`.
5. `grep -c "Rocinha" dist/index.html` responde 3 ou mais.
6. `grep -c "<h1" dist/index.html` responde 1 ou mais.
7. `grep -c "application/ld+json" dist/index.html` responde `1`.
8. `grep -c "<title>" dist/index.html` responde `1`.
9. `node -e "const h=require('fs').readFileSync('dist/index.html','utf8');if(h.length<20000)throw new Error('curto: '+h.length);console.log('ok',h.length)"` imprime um tamanho acima de 20000.
10. `grep -c "schema.org" src/entry-server.js` responde `0`.
11. `npm run preview` sobe e a página abre em `http://127.0.0.1:4173` sem erro
    nem aviso de hidratação no console do navegador.

Ao terminar, cole a saída literal dos onze comandos.
