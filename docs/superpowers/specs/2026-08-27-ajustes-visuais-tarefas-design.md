---
title: Ajustes visuais das tarefas T1, T2, T3, T4 e T6
date: 2026-08-27
status: aprovado para planejamento
---

# Objetivo

Executar somente os ajustes visuais descritos nas tarefas T1, T2, T3, T4 e T6 de `tarefas.md`, preservando conteúdo, estrutura, links, espaçamentos verticais e efeitos já aprovados.

# Medidas aprovadas

| Tarefa | Elemento | Medidas e comportamento |
|---|---|---|
| T1 | Aviso sobre registros aéreos | `font-size: 10px`, `font-weight: 700`, cor `#9A9A9A` |
| T2 | Aviso de disponibilidade | `font-size: 10px`, `font-weight: 700`, cor `#8F938F` |
| T2 | Copyright | `font-size: 10px`, `font-weight: 700`, cor `#777B77` |
| T3 | Crédito xDouglas | Aparência igual a texto comum do mesmo bloco; sem sublinhado, barra, decoração ou mudança para amarelo no hover; destino e indicador de foco por teclado preservados |
| T4 | Bloco final do rodapé | Centralizado em desktop e smartphone; inclui apenas aviso de disponibilidade, copyright e crédito; ordem e espaçamentos verticais preservados |
| T6 | Rótulo do hero | Texto `#080907`, fundo `#E8A521`, `font-weight: 700`, `padding: 5px 8px`; fundo limitado ao conteúdo; aplicado em PT, EN e ES |

# Limites

- Não alterar outros textos, elementos, links ou partes do rodapé.
- Não alterar a posição atual do rótulo do hero.
- Não alterar os efeitos E1–E5 registrados em `tarefas.md`.
- Não publicar, fazer deploy ou enviar o código para repositório externo.
- Não executar H1.

# Implementação prevista

Os textos e a marcação permanecem em `src/App.js`. Os ajustes serão feitos com seletores/classes existentes ou específicos em `src/App.css`, evitando mudanças estruturais e regras globais.

# Validação

Para cada tarefa:

1. Rodar `npm run build`.
2. Abrir a página no navegador em desktop e em `390px`.
3. Rolar até o fim e confirmar visualmente apenas o elemento afetado.
4. Clicar em todos os botões e links, incluindo o crédito xDouglas.
5. Conferir o console do navegador.
6. Confirmar que os efeitos E1–E5 continuam presentes.
7. Remover a tarefa de `tarefas.md` somente depois da aprovação na auditoria.

