# Correção — as fotos e vídeos quebraram no HTML pré-renderizado

Landing page React 19 + Vite 7 (WL Tour Experience). A pré-renderização já
funciona: `npm run build` gera `dist/index.html` com 28 KB de conteúdo real.

Só que as mídias quebraram. Erro literal no console do navegador, com
`npm run preview` rodando em `http://127.0.0.1:4173`, 18 ocorrências:

```
Not allowed to load local resource: file:///D:/Dev/Landing%20page/Clientes/Wallace-wl-tuor/rocinha-tour/img/2.jpeg
```

E no `dist/index.html` gerado:

```html
<img src="file:///D:/Dev/Landing%20page/Clientes/Wallace-wl-tuor/rocinha-tour/img/2.jpeg">
```

## Causa

No topo de `src/App.js` as mídias são declaradas assim:

```js
christ: new URL("../img/2.jpeg", import.meta.url).href,
```

No build do cliente o Vite reescreve isso para `/assets/2-BcDc4tQ4.jpeg`. Mas no
build SSR o código roda no Node, onde `import.meta.url` é um caminho `file://`
do disco desta máquina. O HTML pré-renderizado sai com o caminho do disco — que o
navegador bloqueia, e que ainda vaza a estrutura de pastas da máquina para
qualquer robô que leia a página.

## Correção pedida

Servir as mídias como arquivos estáticos, com o mesmo caminho nos dois builds.

1. Mover a pasta `img/` inteira da raiz do projeto para `public/img/`. A pasta
   `public/` já existe e tudo que está nela é copiado para a raiz de `dist/`.
   Mantenha os nomes de arquivo exatamente como estão, inclusive os que têm
   espaço (`video 6.mp4`, `depoimento 01.jpeg`).
2. Em `src/App.js`, trocar cada `new URL("../img/NOME", import.meta.url).href`
   pelo caminho absoluto correspondente, como string: `"/img/NOME"`.
   **Nome com espaço precisa do espaço codificado como `%20`** — por exemplo
   `new URL("../img/video 6.mp4", import.meta.url).href` vira
   `"/img/video%206.mp4"`. Errar isso quebra a mídia em silêncio.
3. Confira se sobrou algum outro `new URL(..., import.meta.url)` no arquivo e
   trate do mesmo jeito.

Não altere nenhum texto, cor, tamanho, ordem de seção ou qualquer outra coisa.
Nenhuma mídia pode trocar de lugar: a foto que aparecia em cada ponto da página
tem que continuar a mesma.

## Fronteira

Só pode alterar `src/App.js` e mover os arquivos de `img/` para `public/img/`.
Não toque em `index.html`, `src/entry-server.js`, `scripts/prerender.mjs`,
`package.json`, `vite.config.js`, `src/index.js`, `src/App.css`,
`src/index.css`. Não rode `git commit`. Não instale dependência nova.

## Convenção de código

Uma instrução por linha, no formato do arquivo em volta. Sem comentário
registrando seu raciocínio.

## Pronto quando

Todos passam, rodados na raiz do projeto:

1. `npm run build` termina sem erro.
2. `grep -c "file:///" dist/index.html` responde `0`.
3. `grep -c "import.meta.url" src/App.js` responde `0`.
4. `ls public/img | wc -l` responde o mesmo número de arquivos que a pasta `img/`
   tinha antes (conte antes de mover e diga o número no relatório).
5. `node -e "const h=require('fs').readFileSync('dist/index.html','utf8');const fs=require('fs');const faltando=[...h.matchAll(/(?:src|href)=\"(\/img\/[^\"]+)\"/g)].map(m=>decodeURIComponent(m[1])).filter(p=>!fs.existsSync('dist'+p));if(faltando.length)throw new Error('midia inexistente: '+faltando.join(', '));console.log('todas as midias existem em dist')"` imprime `todas as midias existem em dist`.
6. `npm run preview` sobe e a página abre em `http://127.0.0.1:4173` **sem
   nenhum erro no console do navegador**. Abra de fato e confirme antes de
   declarar pronto.

Ao terminar, cole a saída literal dos seis comandos.
