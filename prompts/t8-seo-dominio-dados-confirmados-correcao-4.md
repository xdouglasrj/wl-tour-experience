# Retomada direta — executar agora

Retome diretamente na etapa EXECUTE. Não reinicie análise, não carregue skills e não faça novo plano. Você já confirmou todos os defeitos.

No diretório atual, aplique agora as mudanças exigidas na Correção 2:

- corrija `expériences` para `experiências` em `index.html` usando caminho relativo e edição UTF-8 segura;
- remova os logs de depuração de `quick-verify.cjs`;
- implemente as validações fortes especificadas para canonical, Open Graph, JSON-LD, idiomas, robots, sitemap e conteúdo dentro de `#root`;
- rode build, verificador, diff check e os três testes de mutação com restauração final.

Use apenas caminhos relativos. Não faça deploy nem commit. Termine a implementação; não responda apenas com análise.
