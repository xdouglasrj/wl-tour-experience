# PRODUTO — WL Tour Experience

Regra deste produto. Método de trabalho não mora aqui: vale o global,
em `~/.claude/CLAUDE.md`.

## O que é

Landing page do **WL Tour Experience** — passeio guiado na Rocinha e
experiências turísticas no Rio de Janeiro. Cliente: Wallace.

**A página já foi aprovada pelo cliente.** O trabalho aqui é alterar imagens,
textos e botões dentro dessa página aprovada — não redesenhar, não recriar, não
"melhorar" o que ninguém pediu.

## Como o projeto está montado

Vite + React. O fonte vive em `src/` (`App.js`, `App.css`, `index.css`) e foi
recuperado de dentro de um `bundle.js` gerado pela ferramenta Emergent, que era
tudo o que existia no começo. O `scripts/prerender.mjs` gera o HTML estático que
buscador e agente de IA leem sem executar JavaScript.

Publicação: Vercel, ligada ao repositório `xdouglasrj/wl-tour-experience`, com
deploy a cada commit no `main`. Domínio: `wlfavelatour.com.br`, no Registro.br.

## Regras do produto

**Texto de venda não se inventa.** Preço, depoimento, número de cliente, nome de
passeio: o que não veio do cliente, pergunte. Nunca preencha. As respostas do
Wallace estão em `docs/DADOS-DO-CLIENTE.md`.

**Imagem tem origem.** Banco de imagem entra com a licença registrada em
comentário; foto do cliente entra como ele mandou. Nada de foto sem procedência.

**Celular primeiro.** Tudo conferido em `390 px` antes de entregar.

**Publicar é decisão do dono.** Subir para hospedagem, apontar domínio, mexer em
DNS ou em credencial de provedor: só o Douglas.

## Medidas dos efeitos aprovados

Esta seção é referência permanente, não é tarefa: não se remove quando uma tarefa
é concluída. Os valores abaixo foram medidos na página aprovada pelo cliente, em
26/08/2026, com o navegador aberto na versão publicada. Qualquer recuperação de
fonte ou alteração posterior precisa reproduzir exatamente estes números. Efeito
que não estiver nesta lista não existe na página aprovada e não deve ser criado.

### E1. Zoom lento na fotografia da seção principal

| Medida | Valor |
|---|---|
| Elemento | a imagem da seção principal, e somente ela |
| Nome da animação | `slow-zoom` |
| Escala inicial | `1.02` |
| Escala final | `1.14` |
| Duração | `22s` |
| Curva | `ease-out` |
| Repetições | `1`, com `forwards`: para na escala final e não reinicia |
| Escala base do elemento | `scale-105`, aplicada por baixo da animação para não aparecer borda |

### E2. Entrada por rolagem — classe `.reveal`

| Medida | Valor |
|---|---|
| Quantidade de blocos que usam | `40` |
| Opacidade inicial | `0` |
| Deslocamento inicial | `translateY(26px)` |
| Estado final | opacidade `1`, `translateY(0)` |
| Duração | `0.7s` |
| Curva | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Classe de ativação | `.is-visible` |
| `will-change` | `opacity, transform` |

Atrasos em cascata usados nos grupos de itens, aplicados por `transition-delay`
no atributo `style` de cada elemento: `60ms`, `80ms`, `90ms`, `120ms`, `180ms`,
`270ms`.

Onde o efeito aparece: as quatro tarjas logo abaixo da seção principal, a seção
`passeio`, as dez paradas da seção `roteiro`, a seção `galeria`, os seis blocos
de "Por que a WL Tour" e a seção `experiencias`.

### E3. Cabeçalho fixo

| Medida | Valor |
|---|---|
| Posição | fixo no topo, `z-index 50` |
| Fundo | preto a `85%` de opacidade |
| Desfoque do fundo | `backdrop-blur-md` |
| Borda inferior | branca a `10%` de opacidade |
| Transição | `300ms`, propriedade `all` |

### E4. Rolagem suave

`scroll-behavior: smooth` no elemento `html`, para os links de âncora do menu.

### E5. Respeito a `prefers-reduced-motion`

Com o sistema do visitante configurado para reduzir movimento, a página aplica:

- `scroll-behavior: auto` no `html`;
- `.reveal` com opacidade `1`, sem deslocamento e sem transição;
- todas as animações desligadas e transições reduzidas a `0.01ms`.

Este bloco é obrigatório e não pode ser removido em nenhuma tarefa.

### Ponto em aberto

O zoom da seção principal roda uma única vez e para na escala `1.14`. Quem chega
à página depois de `22s` de carregamento nunca vê o movimento. A página aprovada
é assim; mudar isso depende de decisão do Douglas e não deve ser alterado por
conta própria.

## Imagem principal — decisão registrada

Esta seção é referência permanente, não é tarefa.

Em 27/08/2026 o Douglas aprovou as duas imagens que já estão no projeto e
dispensou o requisito de WebP em resolução maior:

- `src/assets/hero-rocinha-desktop.jpg` — JPEG, `1584 × 672 px`
- `src/assets/hero-rocinha-mobile.png` — PNG, `943 × 1668 px`

Estes são os arquivos finais. Nenhum agente troca, converte, amplia ou regenera
essas fotografias sem uma nova decisão dele.