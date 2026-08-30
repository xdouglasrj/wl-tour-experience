Você é o executor desta tarefa no projeto WL Tour Experience.

Trabalhe somente nestes arquivos de código/configuração:
- index.html
- public/robots.txt
- public/sitemap.xml
- quick-verify.cjs

Não altere documentação, tarefas.md, src/, layout, textos visíveis ou qualquer
outro arquivo. Não faça commit.

O worktree já contém alterações não commitadas nesses quatro arquivos. Elas são
o ponto de partida: audite, corrija apenas o necessário e finalize.

CORREÇÃO OBRIGATÓRIA ENCONTRADA NA AUDITORIA: `index.html` começa com os bytes
UTF-8 BOM `239,187,191`. Regrave somente esse arquivo como UTF-8 sem BOM, sem
mudar seu conteúdo. Depois rode os critérios abaixo. Esta entrega precisa
produzir diff; apenas relatar não atende à tarefa.

A tentativa anterior afirmou remover o BOM, mas a auditoria leu novamente os
bytes `239,187,191`; portanto falhou. Use explicitamente uma codificação
`System.Text.UTF8Encoding($false)` ao regravar o arquivo. Antes de encerrar,
leia os três primeiros bytes com `System.IO.File.ReadAllBytes` e só aceite
`60,33,100` (`<!d`). Não confie apenas no editor ou no build.

OBJETIVO: consolidar a URL oficial https://www.wlfavelatour.com.br/ em canonical,
Open Graph, JSON-LD, robots.txt e sitemap.xml, mantendo JSON-LD válido e criando
uma verificação automatizada proporcional ao risco.

REGRAS:
- Deve existir exatamente um canonical e um og:url, ambos com a URL oficial.
- O og:image e todos os @id/url do JSON-LD devem usar o domínio oficial.
- JSON-LD deve ser JSON válido e preservar exatamente um TravelAgency, um
  TouristTrip e um WebSite.
- Não invente fatos comerciais. Use somente os dados que já estão nas mudanças.
- Não altere a interface ou o conteúdo visível.
- Remova qualquer BOM ou espaçamento acidental criado no index.html.
- robots.txt e sitemap.xml devem apontar para a URL oficial com www.
- quick-verify.cjs deve validar o resultado de `dist/` depois do build.

CRITÉRIO DE PRONTO:
1. Rode `npm run build`.
2. Rode `node quick-verify.cjs`.
3. Procure referências SEO a `https://wlfavelatour.com.br` sem www nos quatro
   arquivos e confirme que não restou nenhuma.
4. Informe o diff final e as saídas reais dos comandos.

Não toque nos arquivos do harness, mesmo que apareçam modificados por outra
sessão.
