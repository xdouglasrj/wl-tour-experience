# Tarefa: ligar as mídias às paradas do roteiro

Projeto React + Vite. Você trabalha somente dentro desta pasta.

## Arquivo que pode ser alterado

`src/App.js` — e nenhum outro. Não crie arquivos. Não rode `git`. Não faça commit.
Não altere `src/App.css`, `src/index.css`, `index.html`, `package.json`.
Não altere o componente `MediaPopup`, nem os textos das paradas, nem os arrays
`route`, `routeEn`, `routeEs`.

## O que já existe

Em `src/App.js`, no topo:

```js
const mediaFiles = {
  christ: new URL("../img/2.jpeg", import.meta.url).href,
  ...
  rideToTop: new URL("../img/video 7.mp4", import.meta.url).href,
  routeAerial: new URL("../img/video 9.mp4", import.meta.url).href,
  ...
};

const routeMedia = {
  0: { type: "video", src: mediaFiles.rideToTop },
  4: { type: "video", src: mediaFiles.routeAerial },
};
```

`routeMedia` é um objeto cuja chave é o índice da parada dentro do array `route`.
A parada que tem entrada em `routeMedia` vira um botão que abre a mídia num
popup. A parada sem entrada continua sendo um título comum.

O popup já aceita três formatos, e você NÃO precisa mexer nele:

```js
{ type: "image", src }
{ type: "video", src }
{ type: "gallery", items: [ { type, src }, { type, src }, ... ] }
```

Já existe no arquivo um exemplo pronto de galeria, chamado `trailGallery` — siga
exatamente esse formato.

Os arquivos de mídia estão na pasta `img/`, um nível acima de `src/`, e entram
sempre assim, com o nome literal (os nomes têm espaço, isso é correto):

```js
new URL("../img/video 19.mp4", import.meta.url).href
```

## O que fazer

Preencher `routeMedia` com o mapa abaixo. Adicione em `mediaFiles` as entradas
novas que precisar, com nomes descritivos em inglês, no mesmo estilo das que já
estão lá.

| Índice | Parada | Arquivos, nesta ordem |
|---|---|---|
| 0 | Subida até o topo | `video 7.mp4` — JÁ EXISTE, não mexer |
| 1 | Vista panorâmica | `11.jpeg` |
| 2 | Capoeira | `video 19.mp4`, `video 20.mp4`, `video 21.mp4` |
| 3 | Laje com vista | `9.jpeg` |
| 4 | Registro aéreo | `video 9.mp4` — JÁ EXISTE, não mexer |
| 5 | Graffiti | `6.jpeg`, `15.jpeg`, `16.jpeg` |
| 6 | Futebol | `video 14.mp4`, `video 15.mp4`, `20.jpeg` |
| 7 | Curva do S | `video 17.mp4`, `video 18.mp4` |
| 8 | Rua popular | `video 16.mp4`, `video 8.mp4`, `17.jpeg`, `18.jpeg`, `19.jpeg` |
| 9 | Outras experiências | NADA. Esta parada fica sem mídia, por decisão do cliente. |

Regras:

- Parada com um arquivo só: `{ type: "image", src }` ou `{ type: "video", src }`,
  conforme a extensão (`.jpeg` é imagem, `.mp4` é vídeo).
- Parada com dois ou mais arquivos: `{ type: "gallery", items: [...] }`, com os
  itens exatamente na ordem da tabela.
- Não invente arquivo que não está na tabela. Não reordene.
- O índice 9 não pode ganhar entrada nenhuma.

## Estilo do código

O trecho novo tem que ler como o código em volta: uma instrução por linha, nomes
por extenso, sem abreviação, sem ternário aninhado. Não deixe comentário com o
seu raciocínio. Não escreva "o spec não diz, mas...".

## Pronto quando

`node_modules/.bin/vite build` termina sem erro. Rode esse comando você mesmo
antes de terminar e diga a saída dele no seu relatório.

## No relatório final, diga

1. As chaves que você adicionou em `mediaFiles`.
2. O conteúdo final de `routeMedia`.
3. A saída do build.
