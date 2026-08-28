# Tarefas

## Como trabalhamos

### Papéis

| Papel | Quem | O que faz |
|---|---|---|
| Orquestrador, auditor e testador | Claude Code | Distribui as tarefas, revisa tudo, abre a página no navegador, testa e aprova ou reprova |
| Execução de tarefa simples | Agentes gratuitos do OpenCode Zen (`hy3-free`, `mimo-v2.5-free`, `nemotron-3.5-lightning-free`, `muse-spark-1.2-contributor-free`) | Executam uma tarefa pequena e delimitada por vez |
| Execução de tarefa complexa | Codex | Recebe o que exige decisão técnica, mudança ampla ou risco alto |
| Decisões externas ao projeto | Douglas | Ver a seção "Depende do Douglas" no fim deste arquivo |

### Loop de trabalho

1. O Claude Code escolhe a próxima tarefa pendente deste arquivo, na ordem.
2. Classifica a tarefa como simples ou complexa e a entrega ao executor correspondente.
3. Recebe o trabalho pronto e faz a auditoria: lê o código, roda `npm run build`, abre a página no navegador, rola até o fim, clica em todos os botões e links, confere em desktop e em `390 px`, verifica o console.
4. Se estiver tudo correto, remove a tarefa deste arquivo.
5. Se houver erro, escreve uma tarefa nova aqui descrevendo exatamente o que ficou errado e devolve ao executor.
6. Repete até não restar nenhuma tarefa pendente.
7. Ao fim de cada tarefa, grava as lições em `~/.claude/licoes.md`, junto do
   relatório. Duas origens contam: toda tarefa reprovada na auditoria do passo 3
   e toda correção feita pelo Douglas durante o trabalho. Só entra ali o que se
   repete em outro projeto; o que for específico desta página vira tarefa nova
   neste arquivo. O formato, o teto e as demais regras estão no próprio
   `licoes.md`.

### Regras fixas

- Tarefa concluída e aprovada é removida do arquivo, nunca marcada.
- Nenhum executor pode iniciar uma tarefa com dúvida. Se houver dúvida, ela volta para o Claude Code.
- Todas as perguntas e decisões de cada item são resolvidas durante a etapa de
  levantamento de dúvidas. Quando o Douglas mandar executar após essa etapa, a
  autorização é final: o trabalho segue até a validação e a entrega sem pedir
  novas confirmações, aprovações de plano, desenho, especificação ou
  implementação. Só se interrompe por um bloqueio novo e impossível de prever
  durante o levantamento.
- Nenhuma tarefa da seção "Depende do Douglas" pode ser executada por agente.
- Nenhum agente publica, faz deploy ou envia código para repositório externo.
- Nenhum agente inventa preço, depoimento, número de cliente ou qualquer afirmação comercial.

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

## Tarefas pendentes

- [>] Formulário HTML do questionário do Wallace

  TAREFA: Criar formulário portátil do questionário da WL Tour

  OBJETIVO: existir um arquivo `questionario-wallace.html` que Wallace possa
  receber pelo WhatsApp, abrir diretamente no navegador, responder e usar para
  baixar ou compartilhar um arquivo Markdown com as respostas.

  ARQUIVOS: criar somente `questionario-wallace.html`. A especificação aprovada
  está em
  `docs/superpowers/specs/2026-08-28-formulario-questionario-wallace-design.md` e
  as 137 perguntas canônicas estão em `docs/DADOS-DO-CLIENTE.md`.

  REGRAS APLICÁVEIS:
  - preservar as 137 perguntas, sua numeração e seu sentido;
  - mostrar primeiro as perguntas indispensáveis para Google e IAs definidas na
    especificação aprovada;
  - mostrar as demais em blocos recolhíveis por assunto;
  - usar campos de uma linha e salvar automaticamente no navegador;
  - liberar download e compartilhamento somente após todas as indispensáveis;
  - gerar `respostas-wl-tour-AAAA-MM-DD.md` e usar `Pendente` nas adicionais
    vazias;
  - funcionar offline e não enviar nenhuma informação pela rede;
  - não alterar a landing page ou qualquer arquivo de produção existente;
  - nunca pedir senha, token, código, cartão ou documento pessoal.

  CASOS DE BORDA: armazenamento local indisponível mantém o formulário usável
  com aviso; compartilhamento de arquivo indisponível baixa o Markdown e orienta
  o envio manual; tentativa de finalizar com resposta indispensável vazia mostra
  a quantidade restante e leva à primeira pergunta; respostas longas permanecem
  completas apesar do campo visual de uma linha.

  PRONTO QUANDO: as 137 perguntas aparecem uma vez; somente as indispensáveis
  bloqueiam a geração; respostas sobrevivem ao recarregamento; o Markdown
  baixado preserva perguntas, respostas e pendências; compartilhamento e fallback
  funcionam; a página é conferida em desktop e 390 px; não há erro no console nem
  requisição de rede.

  FORA DE ESCOPO: publicar o formulário, criar backend, gerar link público,
  enviar automaticamente ao WhatsApp ou alterar `docs/DADOS-DO-CLIENTE.md`.

## Depende do Douglas

Nenhum agente executa os itens abaixo. Eles ficam parados até o Douglas resolver pessoalmente.

### H1. Publicação

- Deploy, hospedagem, domínio e DNS.
- Envio do código para repositório externo.
- Qualquer credencial, chave de API ou configuração em provedor externo.
