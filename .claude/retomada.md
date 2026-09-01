# Retomada — 01/09/2026

## Última parte concluída

Configuração de entrada no ambiente novo, mais o resgate do trabalho de SEO e
GTM que estava perdido numa branch.

1. `CLAUDE.md` do projeto apagado. A regra do produto virou `docs/PRODUTO.md`,
   com as medidas dos efeitos aprovados e a decisão da imagem principal, que
   saíram do `tarefas.md`. Vale só o método global.
2. Cofre criado em `D:/Dev/Projetos/_CEREBRO/landing-pages/rocinha-tour/`, com
   mapa e cinco notas ligadas.
3. `GTM-5B2SLVVG` instalado e domínio padronizado em `www` — trazido arquivo por
   arquivo da branch `codex/seo-gmail-independent`, que nunca tinha entrado no
   `main`.
4. 586 MB movidos para `_descartavel/`: prints do Playwright, backup de fonte, o
   `bundle.js` antigo e as cinco worktrees paradas. `git ls-files` caiu de 189
   para 102 arquivos.
5. Todas as branches removidas menos a `main`. Nenhum worktree aberto.

## Estado

- `npm run build` verde. `node quick-verify.cjs` passa.
- Servidor de preview local em `http://127.0.0.1:4180` (a porta 4173 estava
  ocupada por outro processo). Para subir: `npm run preview -- --port 4180`.
- Três commits locais no `main`, **sem push**.
- Verificado no navegador em 390 px e em desktop, sem erro no console: o
  `gtm.js` carrega, o `dataLayer` existe, e os três eventos entram nele ao
  clicar — `whatsapp_click`, `instagram_click` e `phone_click`.

## Pendente

- **Push do `main`.** É do Douglas. Sem isso o site no ar continua sem GTM e com
  os sinais de indexação na forma sem `www`.
- Tag do GA4 `G-G9SGTTXK6F` dentro do GTM, com acionador para cada um dos três
  eventos. Nada disso existe ainda no painel.
- Perfil da Empresa no Google: falta o Wallace dizer categoria, horários e
  descrição.
- O convite do GTM em `wlfavelatour@gmail.com` continua sem aceite.
- `origin` ainda tem a branch `feat/questionario-wallace`. A local foi apagada
  porque o conteúdo já está no `main`; a remota é decisão do Douglas.
