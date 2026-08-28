# Tarefa — pré-renderizar o HTML da landing page (WL Tour Experience)

Landing page React 19 + Vite 7, página única, já aprovada pelo cliente.

Hoje o HTML servido em produção contém apenas `<div id="root"></div>`. Todo o
texto e todas as fotos são montados por JavaScript no navegador. Robôs de IA
(ClaudeBot, GPTBot, PerplexityBot e outros) leem o HTML cru e não executam
JavaScript — para eles a página está vazia.

**Objetivo:** o arquivo `dist/index.html` gerado por `npm run build` precisa
conter o texto de todas as seções da página já escrito no HTML, sem depender de
JavaScript. A página no navegador tem que continuar funcionando exatamente igual
depois disso.

## Não altere a aparência nem o conteúdo

Nenhum texto de venda, cor, foto, botão, rótulo ou ordem de seção pode mudar.
Esta tarefa é só de infraestrutura de build.

## Fronteira

Você pode criar ou alterar:

- `src/entry-server.js` (criar)
- `scripts/prerender.mjs` (criar)
- `package.json` (alterar apenas o campo `scripts`, e `devDependencies` se
  precisar de alguma dependência já compatível — veja a restrição abaixo)
- `vite.config.js` (alterar se necessário para o build SSR)
- `src/index.js` (alterar apenas se precisar trocar `createRoot` por
  `hydrateRoot`)
- `src/App.js` (alterar apenas o mínimo necessário para o componente renderizar
  no servidor — veja a seção "armadilhas")

Não toque em `index.html`, `public/`, `src/App.css`, `src/index.css`, nem em
nenhum arquivo em `docs/` ou `prompts/`. Não rode `git commit`.

## Estado verificado agora

- `react` e `react-dom` na versão 19.0.0, `vite` 7.3.6,
  `@vitejs/plugin-react` 5.0.2. `"type": "module"` no `package.json`.
- Scripts atuais: `start`, `dev`, `build` (`vite build`), `preview`.
- `src/App.js` tem 1212 linhas e exporta `App` como default.
- `src/index.js` monta a aplicação com `createRoot`.
- `index.html` já contém, escrito à mão, o `<title>`, as metatags e um bloco
  `<script type="application/ld+json">`. **Preserve tudo isso** — o HTML gerado
  precisa continuar com esses elementos intactos.
- `vite.config.js` tem uma configuração de `esbuild` que trata os `.js` de
  `src/` como JSX. O build SSR precisa da mesma configuração, senão falha ao ler
  o JSX.
- Não existe roteador. É uma rota só, `/`.

## Restrição de dependências

Prefira resolver com o que já está instalado: `react-dom/server` já vem com o
`react-dom` 19, e o Vite já sabe fazer build SSR (`vite build --ssr`). **Não
instale Playwright, Puppeteer, jsdom, nem nenhum navegador headless** — o build
roda na Vercel e não pode depender de baixar um navegador.

## Caminho recomendado

1. `src/entry-server.js` exporta uma função que devolve o HTML do `<App />`
   usando `renderToString` de `react-dom/server`.
2. `scripts/prerender.mjs` roda depois dos dois builds: importa o bundle SSR
   gerado, produz a string de HTML, e a injeta dentro do
   `<div id="root"></div>` do `dist/index.html` já produzido pelo build do
   cliente. Grava o arquivo de volta.
3. `package.json`: `"build": "vite build && vite build --ssr src/entry-server.js --outDir dist-ssr && node scripts/prerender.mjs"`.
4. `src/index.js` passa a usar `hydrateRoot` em vez de `createRoot`, para que o
   React reaproveite o HTML já presente em vez de descartá-lo.

Se você conhecer um caminho mais simples que atenda ao critério de pronto, pode
usá-lo — mas ele não pode instalar navegador nem quebrar o build da Vercel.

## Armadilhas que vão aparecer

- **`window`, `document`, `localStorage` e `IntersectionObserver` não existem no
  servidor.** No `App.js` esses acessos estão dentro de `useEffect`, que não roda
  na renderização do servidor — esses estão seguros. Mas confira se algum deles é
  lido no corpo do componente ou no escopo do módulo. Se for, proteja o acesso;
  não apague o comportamento no navegador.
- **Erro de hidratação.** Depois de trocar para `hydrateRoot`, o HTML gerado no
  servidor precisa bater com o primeiro render do navegador. Se o componente
  escolher idioma, tema ou qualquer coisa a partir de `navigator.language` ou de
  `localStorage` no primeiro render, o servidor e o navegador vão divergir e o
  React vai reclamar no console. Nesse caso, o primeiro render tem que ser o
  mesmo dos dois lados (o padrão português), e a troca acontece depois, num
  `useEffect`.
- **Imagens.** As fotos são importadas pelo bundle. O build SSR do Vite resolve
  esses imports para os caminhos finais de `dist/assets/`. Confira no HTML gerado
  que os `src` das imagens apontam para arquivos que existem em `dist/`.
- **`dist-ssr/`** é lixo de build: acrescente-o ao `.gitignore`.

## Convenção de código deste repositório

Uma instrução por linha. Nada de ternário dentro de ternário. Nada de nome
abreviado onde o arquivo ao redor escreve por extenso. Não deixe comentário
registrando sua dúvida ou seu raciocínio; comentário registra o que o código não
diz. O trecho novo tem que ler como o código em volta dele.

## Pronto quando

Todos estes comandos passam, rodados na raiz do projeto:

1. `npm run build` termina sem erro.
2. `grep -c "Rocinha" dist/index.html` responde 3 ou mais.
3. `grep -c "<h1" dist/index.html` responde 1 ou mais.
4. `grep -c "application/ld+json" dist/index.html` responde `1` (o bloco escrito
   à mão continua lá, e não foi duplicado).
5. `grep -c "<title>" dist/index.html` responde `1`.
6. `node -e "const h=require('fs').readFileSync('dist/index.html','utf8');if(h.length<20000)throw new Error('HTML curto demais: '+h.length);console.log('html com conteudo:',h.length)"` imprime um tamanho acima de 20000.
7. `npm run preview` sobe, e a página abre em `http://127.0.0.1:4173` sem
   nenhum erro nem aviso de hidratação no console do navegador. Verifique isso
   de fato antes de declarar pronto.

## Relatório

Ao terminar, diga: quais arquivos criou e alterou, se precisou mexer no
`App.js` e por quê, e a saída literal dos sete comandos acima.
