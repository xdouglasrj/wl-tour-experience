# Implementação — SEO técnico independente do Gmail

Você é o executor de uma tarefa fechada em uma landing page React + Vite já
aprovada pelo cliente. Trabalhe somente dentro do diretório recebido. Não faça
commit, push, deploy ou alteração externa.

## Objetivo

Padronizar todos os sinais técnicos de indexação para
`https://www.wlfavelatour.com.br/` e enriquecer os dados estruturados somente com
informações confirmadas, sem nenhuma mudança visual.

## Fronteira de arquivos

Você pode alterar apenas:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `quick-verify.cjs`
- `src/App.js`, somente se uma correção objetiva de semântica ou acessibilidade
  for indispensável para cumprir os critérios

Qualquer modificação em outro arquivo reprova a entrega. Não altere CSS, imagens,
dependências, configuração de build, textos de venda, layout, efeitos ou ordem
das seções.

## Fonte canônica dos dados

Leia `docs/DADOS-DO-CLIENTE.md` antes de editar. Use somente fatos confirmados:

- marca: WL Tour Experience; nome público: WL Tour;
- responsável: Wallace Oliveira;
- telefone: +55 21 99555-0707;
- Instagram: https://www.instagram.com/wl.rocinha95;
- TikTok: https://www.tiktok.com/@wl.rocinhaa;
- áreas atendidas: Rocinha, Vidigal e trilha do Morro Dois Irmãos;
- ponto de encontro: saída C do metrô São Conrado;
- passeio: Tour na Favela;
- duração aproximada: duas horas;
- formato: privado ou compartilhado;
- incluídos: moto táxi, espetáculo de capoeira, vídeo de drone e visita a uma
  laje para fotos.

Não publique como fato resolvido: endereço comercial, horários exatos do
passeio, condução em inglês, Cadastur, cursos, seguro, desconto, política
completa de cancelamento ou avaliação agregada. O ponto de encontro não é
endereço comercial. Não adicione `llms.txt` nem FAQ schema.

## Trabalho esperado

1. Troque as URLs técnicas sem `www` por `https://www.wlfavelatour.com.br/` em
   canonical, Open Graph, imagem social, JSON-LD, sitemap e robots.
2. Mantenha exatamente um JSON-LD no HTML, válido e coerente com o conteúdo.
3. Modele organização, site e passeio principal com Schema.org usando somente os
   dados confirmados acima. Prefira propriedades válidas e conservadoras; não
   invente preço, horário, endereço ou avaliação.
4. Preserve o HTML prerenderizado e a experiência visual.
5. Amplie `quick-verify.cjs` para falhar se houver domínio técnico sem `www`, URL
   de preview, mais de um JSON-LD, JSON inválido, sitemap/robots incoerentes ou
   ausência de conteúdo prerenderizado.

## Convenção

Uma instrução por linha. Sem ternário dentro de ternário. Não comprima lógica.
Não deixe comentários com raciocínio ou dúvida. O trecho novo deve ler como o
código ao redor.

## Verificação obrigatória

Rode:

1. `npm run build`
2. `node quick-verify.cjs`
3. uma busca textual em `index.html`, `public/robots.txt`, `public/sitemap.xml` e
   `dist/index.html` para confirmar ausência de URL de preview e domínio técnico
   sem `www`

No relatório final, liste arquivos alterados, comandos executados e resultados.
