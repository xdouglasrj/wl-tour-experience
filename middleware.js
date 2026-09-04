export const config = { matcher: ["/", "/about", "/contact", "/privacy"] };

export default async function middleware(request) {
  try {
    // Se o cabeçalho Accept contiver text/markdown, servir a versão markdown
    if (request.headers.get("Accept")?.includes("text/markdown")) {
      // Mapeamento de rotas para arquivos markdown
      const pathMap = {
        "/": "/md/index.md",
        "/about": "/md/about.md",
        "/contact": "/md/contact.md",
        "/privacy": "/md/privacy.md"
      };

      const { pathname } = new URL(request.url);
      const caminhoMd = pathMap[pathname];
      if (caminhoMd) {
        try {
          const markdownResponse = await fetch(new URL(caminhoMd, request.url));
          // Se o fetch falhar ou retornar status != 200, continuar com o HTML normal
          if (!markdownResponse.ok) {
            return undefined;
          }

          // Retornar o conteúdo markdown com os cabeçalhos corretos
          const markdownContent = await markdownResponse.text();
          return new Response(markdownContent, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              "Vary": "Accept, Accept-Encoding",
              "Cache-Control": "public, max-age=0, must-revalidate",
              "Link": "<https://www.wlfavelatour.com.br/llms.txt>; rel=\"alternate\"; type=\"text/plain\""
            }
          });
        } catch (error) {
          // Em caso de erro, continuar com o HTML normal
          return undefined;
        }
      }
    }

    // Se não for uma requisição para markdown, retornar undefined para seguir o fluxo normal
    return undefined;
  } catch (error) {
    return undefined;
  }
}

/* 
 * O Vary: Accept é obrigatório porque, sem ele, o CDN pode servir a variante HTML em cache
 * para quem pediu markdown. Esse cabeçalho instrui o cache a armazenar versões diferentes
 * da resposta com base no cabeçalho Accept da requisição.
 */