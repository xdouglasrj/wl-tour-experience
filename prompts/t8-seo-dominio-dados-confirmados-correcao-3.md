# Correção 3 — concluir no diretório atual

Você já está no worktree correto. NÃO use nenhum caminho absoluto e NÃO solicite acesso a `D:\Dev\*`. Use apenas caminhos relativos ao diretório atual.

O trabalho anterior não concluiu. Execute integralmente a Correção 2 já descrita em `TAREFA-DELEGADA.md`, com estes cuidados adicionais:

1. Para corrigir `index.html`, use um pequeno comando Node relativo com `fs.readFileSync('index.html', 'utf8')` e `fs.writeFileSync('index.html', ...)`. Faça a troca por escapes Unicode: `exp\u00e9riences` para `experi\u00eancias`. Não use PowerShell `Set-Content`.
2. Edite `quick-verify.cjs` somente por caminhos relativos. Remova logs de depuração, fortaleça as validações e faça os três testes de mutação exigidos.
3. Não pare após inspecionar. Termine com `npm run build`, `node quick-verify.cjs` e `git diff --check` verdes.
4. Não use caminhos absolutos, não faça deploy, não faça commit e não altere arquivos fora do escopo.
