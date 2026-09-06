# D2a — correção: falta o rótulo em espanhol

Mesmo worktree. **Único arquivo permitido: `src/App.js`.** Não toque em mais
nada, não crie arquivo, não rode `git add` nem `git commit`.

## O que ficou errado

Você criou os três arrays `faq` (linhas 363, 464 e 564) e os rótulos de pt e en:

```
360:      faq: "PERGUNTAS FREQUENTES",
447:      faq: "FREQUENTLY ASKED QUESTIONS",
```

**Falta o rótulo do espanhol.** No objeto `labels` do bloco `es` de `localized`
não existe a chave `faq`, então em espanhol a seção aparece sem título.

## O que fazer

Acrescentar, no objeto `labels` do bloco `es`, na mesma posição relativa em que
a chave `faq` foi posta em pt e en:

```js
      faq: "PREGUNTAS FRECUENTES",
```

Só isso. Nenhuma outra mudança, nenhum reformato, nenhuma reindentação.

## Critério de pronto

1. `grep -c 'faq: "' src/App.js` → imprime `3`
2. `npm run build` → verde
3. `node quick-verify.cjs` → `OK: Todas as validações passaram`
4. `node verify-agents.cjs` → `OK: 36 verificações`
5. `git status --porcelain` lista apenas `src/App.js` e `src/App.css`
6. `git diff --stat` do `src/App.js` cresce em exatamente 1 linha em relação a
   agora (159 inserções no total, contra as 158 de agora)

Cole a saída literal dos seis comandos.
