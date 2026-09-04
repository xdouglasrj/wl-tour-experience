const fs = require('fs');
const path = require('path');

function checkFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }
  return true;
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function removeTags(html) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
             .replace(/<[^>]*>/gi, '')
             .replace(/\s+/g, ' ')
             .trim();
}

function countVisibleText(html) {
  const text = removeTags(html);
  return text.length;
}

function checkMetaDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!match) {
    throw new Error('Meta description não encontrada');
  }
  return match[1];
}

function checkTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (!match) {
    throw new Error('Título não encontrado');
  }
  return match[1];
}

function checkCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  if (!match) {
    throw new Error('Link canonical não encontrado');
  }
  return match[1];
}

function checkAlternateMarkdown(html) {
  const match = html.match(/<link\s+rel=["']alternate["']\s+type=["']text\/markdown["']\s+href=["']([^"']*)["']/i);
  if (!match) {
    throw new Error('Link alternate para markdown não encontrado');
  }
  return match[1];
}

function checkPreMdAndLlmsTxt(html) {
  const preMdMatch = html.match(/<pre\s+class=["']md["']>/i);
  if (!preMdMatch) {
    throw new Error('Elemento <pre class="md"> não encontrado');
  }
  
  if (!html.includes('llms.txt')) {
    throw new Error('String "llms.txt" não encontrada no 404.html');
  }
  
  return true;
}

function checkLlmsTxtWhenToUse(content) {
  const quandoUsarMatch = content.toLowerCase().includes('quando usar');
  const whenToUseMatch = content.toLowerCase().includes('when to use');
  
  if (!quandoUsarMatch || !whenToUseMatch) {
    throw new Error('Seção "quando usar" ou "when to use" não encontrada no llms.txt');
  }
  
  return true;
}

function checkJsonLdOrganization(html) {
  const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    throw new Error('JSON-LD não encontrado no index.html');
  }
  
  let jsonLd;
  try {
    jsonLd = JSON.parse(jsonLdMatch[1]);
  } catch (e) {
    throw new Error('JSON-LD inválido: ' + e.message);
  }
  
  if (!jsonLd || !jsonLd['@graph']) {
    throw new Error('Estrutura JSON-LD inválida: @graph não encontrado');
  }
  
  let organizationNode = null;
  for (const node of jsonLd['@graph']) {
    if (Array.isArray(node['@type']) && node['@type'].includes('Organization')) {
      organizationNode = node;
      break;
    } else if (node['@type'] === 'Organization') {
      organizationNode = node;
      break;
    }
  }
  
  if (!organizationNode) {
    throw new Error('Nó Organization não encontrado no JSON-LD');
  }
  
  if (!organizationNode['email']) {
    throw new Error('email não encontrado no nó Organization');
  }
  
  const addressNode = organizationNode['address'];
  if (!addressNode || addressNode['@type'] !== 'PostalAddress') {
    throw new Error('Endereço PostalAddress não encontrado ou inválido no nó Organization');
  }
  
  const requiredAddressFields = ['addressLocality', 'addressRegion', 'addressCountry'];
  for (const field of requiredAddressFields) {
    if (!addressNode[field]) {
      throw new Error(`Campo obrigatório ${field} não encontrado no endereço PostalAddress`);
    }
  }
  
  if (!organizationNode['contactPoint'] || !Array.isArray(organizationNode['contactPoint']) || organizationNode['contactPoint'].length === 0) {
    throw new Error('Nenhum contactPoint encontrado no nó Organization');
  }
  
  let validContactPoint = false;
  for (const contactPoint of organizationNode['contactPoint']) {
    if (contactPoint['contactType'] && (contactPoint['telephone'] || contactPoint['email'])) {
      validContactPoint = true;
      break;
    }
  }
  
  if (!validContactPoint) {
    throw new Error('Nenhum contactPoint válido encontrado (precisa ter contactType e telephone ou email)');
  }
  
  return true;
}

function checkVercelJson() {
  const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
  let vercelJson;
  try {
    vercelJson = JSON.parse(readFile(vercelJsonPath));
  } catch (e) {
    throw new Error('vercel.json inválido: ' + e.message);
  }
  
  if (vercelJson.cleanUrls !== true) {
    throw new Error('vercel.json deve ter cleanUrls: true');
  }
  
  let headerRuleFound = false;
  if (vercelJson.headers && Array.isArray(vercelJson.headers)) {
    for (const header of vercelJson.headers) {
      if (header.source === '/(.*)' && Array.isArray(header.headers)) {
        const varyHeader = header.headers.find(h => h.key.toLowerCase() === 'vary' && h.value.includes('Accept'));
        if (varyHeader) {
          headerRuleFound = true;
          break;
        }
      }
    }
  }
  
  if (!headerRuleFound) {
    throw new Error('vercel.json deve ter uma regra de header para /(*) que aplique Vary contendo Accept');
  }
  
  let rewriteRulesFound = 0;
  const requiredRewrites = [
    { source: '/sobre', destination: '/about' },
    { source: '/contato', destination: '/contact' },
    { source: '/privacidade', destination: '/privacy' }
  ];
  
  if (vercelJson.rewrites && Array.isArray(vercelJson.rewrites)) {
    for (const rewrite of vercelJson.rewrites) {
      for (const required of requiredRewrites) {
        if (rewrite.source === required.source && rewrite.destination === required.destination) {
          rewriteRulesFound++;
          break;
        }
      }
    }
  }
  
  if (rewriteRulesFound !== 3) {
    throw new Error('vercel.json deve ter as três rewrites em português: /sobre→/about, /contato→/contact, /privacidade→/privacy');
  }
  
  return true;
}

function checkMiddlewareJs() {
  const middlewarePath = path.join(process.cwd(), 'middleware.js');
  checkFileExists(middlewarePath);
  
  const content = readFile(middlewarePath);
  
  // Check for config export with matcher
  if (!content.includes('export const config = { matcher: [')) {
    throw new Error('middleware.js deve exportar um config com matcher');
  }
  
  // Check for the four routes
  const routes = ['"/"', '"/about"', '"/contact"', '"/privacy"'];
  for (const route of routes) {
    if (!content.includes(route)) {
      throw new Error(`middleware.js deve incluir a rota ${route} no matcher`);
    }
  }
  
  // Check for text/markdown and Vary strings
  if (!content.includes('text/markdown')) {
    throw new Error('middleware.js deve conter a string "text/markdown"');
  }
  
  if (!content.includes('Vary')) {
    throw new Error('middleware.js deve conter a string "Vary"');
  }
  
  return true;
}

function checkSitemapXml() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const content = readFile(sitemapPath);
  
  const urls = [
    'https://www.wlfavelatour.com.br/',
    'https://www.wlfavelatour.com.br/about',
    'https://www.wlfavelatour.com.br/contact',
    'https://www.wlfavelatour.com.br/privacy'
  ];
  
  for (const url of urls) {
    if (!content.includes(`<loc>${url}</loc>`)) {
      throw new Error(`sitemap.xml deve conter a URL: ${url}`);
    }
  }
  
  return true;
}

function runChecks() {
  let checkCount = 0;
  
  try {
    // 1. Check that dist/ directory exists and has required files
    const distPath = path.join(process.cwd(), 'dist');
    checkFileExists(distPath);
    
    const requiredFiles = [
      'about.html',
      'contact.html', 
      'privacy.html',
      '404.html',
      'pagina.css',
      'llms.txt',
      'sitemap.xml',
      'robots.txt'
    ];
    
    for (const file of requiredFiles) {
      checkFileExists(path.join(distPath, file));
      checkCount++;
    }
    
    // Check md files
    const mdPath = path.join(distPath, 'md');
    checkFileExists(mdPath);
    const requiredMdFiles = ['index.md', 'about.md', 'contact.md', 'privacy.md', '404.md'];
    for (const file of requiredMdFiles) {
      checkFileExists(path.join(mdPath, file));
      checkCount++;
    }
    
    // 2. Check visible text length for about.html, contact.html, privacy.html
    const pagesToCheck = ['about.html', 'contact.html', 'privacy.html'];
    for (const page of pagesToCheck) {
      const html = readFile(path.join(distPath, page));
      const visibleTextLength = countVisibleText(html);
      if (visibleTextLength <= 900) {
        throw new Error(`A página ${page} deve ter mais de 900 caracteres de texto visível (atual: ${visibleTextLength})`);
      }
      checkCount++;
    }
    
    // 3. Check title, meta description, canonical, alternate markdown for each page
    for (const page of pagesToCheck) {
      const html = readFile(path.join(distPath, page));
      
      checkTitle(html);
      checkCount++;
      
      const description = checkMetaDescription(html);
      if (description.length < 80) {
        throw new Error(`A meta description da página ${page} deve ter pelo menos 80 caracteres (atual: ${description.length})`);
      }
      checkCount++;
      
      checkCanonical(html);
      checkCount++;
      
      checkAlternateMarkdown(html);
      checkCount++;
    }
    
    // 4. Check 404.html for pre.md and llms.txt
    const html404 = readFile(path.join(distPath, '404.html'));
    checkPreMdAndLlmsTxt(html404);
    checkCount += 2; // Two checks: pre.md class and llms.txt string
    
    // 5. Check llms.txt for quando usar section
    const llmsContent = readFile(path.join(distPath, 'llms.txt'));
    checkLlmsTxtWhenToUse(llmsContent);
    checkCount += 2; // Two checks: "quando usar" and "when to use"
    
    // 6. Check JSON-LD in index.html
    const indexHtml = readFile(path.join(distPath, 'index.html'));
    checkJsonLdOrganization(indexHtml);
    checkCount += 1; // This check covers multiple assertions
    
    // 7. Check vercel.json
    checkVercelJson();
    checkCount += 1; // This check covers multiple assertions
    
    // 8. Check middleware.js
    checkMiddlewareJs();
    checkCount += 1; // This check covers multiple assertions
    
    // 9. Check sitemap.xml
    checkSitemapXml();
    checkCount += 1; // This check covers multiple assertions
    
    console.log(`OK: ${checkCount} verificações`);
    return true;
    
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
}

runChecks();