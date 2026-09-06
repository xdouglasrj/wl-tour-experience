# Retomada — 06/09/2026

## Última parte concluída

Três tarefas fechadas, auditadas e mescladas em `main`, **sem push**:

- **D3** — nó `Person` (`@id` `#wallace`) no `@graph`, com `founder` e
  `employee` da organização apontando para ele. Diff de 16 inserções.
- **D8** — preço fora de `public/llms.txt`, `public/about.html`,
  `public/md/about.md` e `public/md/index.md`.
- **D2** — seção `#faq` com doze perguntas em `<details>`/`<summary>`, nos três
  idiomas, mais o nó `FAQPage` (`@id` `#perguntas`) com o mesmo texto pt-BR
  palavra por palavra, e seis verificações novas no `verify-agents.cjs`.

## Baseline de testes (06/09/2026)

- `node quick-verify.cjs` → `OK: Todas as validações passaram`
- `node verify-agents.cjs` → `OK: 42 verificações` (era 36; seis novas do D2)
- `node scripts/test-middleware.mjs` → `OK: 13 verificações`
- `npm run build` → verde

Mutação conferida nas verificações novas: esvaziar o `name` de uma pergunta
derruba com "Item do FAQPage deve ter name e acceptedAnswer.text não vazios";
remover o `employee` da organização derruba com "Organization deve referenciar
Wallace como employee". As duas foram restauradas.

## Verificado clicando

`npm run preview` na porta 4177, no `main` já mesclado. Clique real de mouse em
"Em quais dias e horários o passeio acontece?" abriu o item. Em 375 px de
largura não há rolagem horizontal e a lista fica com 322 px. Trocando o idioma
pelo botão do topo: `FREQUENTLY ASKED QUESTIONS` / "How long is the tour?" e
`PREGUNTAS FRECUENTES` / "¿Cuánto dura el paseo?", doze itens em cada idioma.

O painel de navegador devolve captura preta nessa faixa da página; a conferência
foi feita por geometria e estilo computado do DOM mais o clique de mouse, que
funcionaram. Não é defeito da página.

## Delegação

O `nemotron-3-super-120b-a12b` entregou o D8 e depois travou no D2 inteiro,
gerando JSON inválido. Quem fechou o D2, em duas partes, foi o
`deepseek-ai/deepseek-v4-flash-0731`. O `stepfun-ai/step-3.7-flash` está morto:
`410 Gone`, fim de vida em 28/08/2026.

Quebrar o D2 em duas delegações (tela primeiro, dado estruturado depois) foi o
que destravou. Uma delegação só, com quatro arquivos, travou duas vezes.

## Próximo passo

Nada de código pendente sem depender do cliente. Restam **D1**, **D4**, **D5**,
**D6** e **D7**, todos travados por resposta do Wallace, por painel do Google ou
por decisão do Douglas.

## Pendências que dependem do Douglas

- **Push.** Cinco commits em `main` esperando autorização.
- **D6.** A extensão do Chrome não está conectada, então não dá para abrir o
  Search Console logado e conferir o canônico do `www`.
- **Cópia local do harness.** `scripts/harness/` e `.claude/hooks/` são cópias
  de 24/08 do harness global, que é de 01/09, e o `.claude/settings.json` está
  modificado apontando para elas. A remoção foi negada na sessão; ficam como
  estão até ele decidir.
