const fs = require('fs');

function fail(msg) {
  console.error('ERRO:', msg);
  process.exit(1);
}

function readFile(p) {
  if (!fs.existsSync(p)) fail(`Arquivo não encontrado: ${p}`);
  return fs.readFileSync(p, 'utf8');
}

function extractRootDiv(html) {
  const rootStartTag = '<div id="root">';
  const startIdx = html.indexOf(rootStartTag);
  if (startIdx === -1) fail('Tag <div id="root"> não encontrada');

  let position = startIdx + rootStartTag.length;
  let depth = 1;

  while (depth > 0) {
    const nextOpen = html.indexOf('<div', position);
    const nextClose = html.indexOf('</div>', position);

    if (nextClose === -1) {
      fail('Fechamento </div> não encontrado para root');
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      const gtIdx = html.indexOf('>', nextOpen);
      if (gtIdx === -1) fail('Tag <div malformada');
      depth++;
      position = gtIdx + 1;
    } else {
      depth--;
      if (depth === 0) {
        return html.slice(startIdx, nextClose + 6);
      }
      position = nextClose + 6;
    }
  }
}

function getMetaContent(html, property) {
  const re = new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]+)"\\s*/?>`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function getLinkHref(html, rel) {
  const re = new RegExp(`<link\\s+rel="${rel}"\\s+href="([^"]+)"\\s*/?>`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function temTipo(no, tipo) {
  const t = no['@type'];
  return t === tipo || (Array.isArray(t) && t.includes(tipo));
}

const distHtml = readFile('dist/index.html');
const rootContent = extractRootDiv(distHtml);

if (!rootContent.includes('Mais que um tour.')) {
  fail('Texto "Mais que um tour." não encontrado no #root');
}
if (!rootContent.includes('O ROTEIRO')) {
  fail('Texto "O ROTEIRO" não encontrado no #root');
}

const canonical = getLinkHref(distHtml, 'canonical');
if (canonical !== 'https://www.wlfavelatour.com.br/') {
  fail('Canonical inválido ou ausente');
}

const ogUrl = getMetaContent(distHtml, 'og:url');
if (ogUrl !== 'https://www.wlfavelatour.com.br/') {
  fail('og:url inválido ou ausente');
}

const ogImageMatches = distHtml.match(/<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/gi);
if (!ogImageMatches || ogImageMatches.length !== 1) {
  fail('og:image deve ser único');
}
const ogImageUrl = ogImageMatches[0].match(/content="([^"]+)"/i)[1];
if (!ogImageUrl.startsWith('https://www.wlfavelatour.com.br/')) {
  fail('og:image deve estar no domínio oficial');
}

const jsonLdMatch = distHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) fail('JSON-LD não encontrado');
if (distHtml.match(/<script type="application\/ld\+json">/g).length !== 1) {
  fail('Deve haver exatamente um JSON-LD');
}

let jsonLd;
try {
  jsonLd = JSON.parse(jsonLdMatch[1].trim());
} catch (e) {
  fail('JSON-LD não parseável: ' + e.message);
}

if (!jsonLd['@context'] || !jsonLd['@graph']) {
  fail('JSON-LD deve ter @context e @graph');
}
if (jsonLd['@context'] !== 'https://schema.org') {
  fail('@context deve ser https://schema.org');
}

const graph = jsonLd['@graph'];
const typeCounts = {};
for (const n of graph) {
  const t = n['@type'];
  if (!t) continue;
  if (Array.isArray(t)) {
    for (const item of t) typeCounts[item] = (typeCounts[item] || 0) + 1;
  } else {
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  }
}

if (typeCounts['TravelAgency'] !== 1) fail('Deve haver exatamente 1 TravelAgency');
if (typeCounts['TouristTrip'] !== 1) fail('Deve haver exatamente 1 TouristTrip');
if (typeCounts['WebSite'] !== 1) fail('Deve haver exatamente 1 WebSite');

const org = graph.find(n => temTipo(n, 'TravelAgency'));
const trip = graph.find(n => temTipo(n, 'TouristTrip'));
const site = graph.find(n => temTipo(n, 'WebSite'));

if (!org['@id'] || !org['@id'].endsWith('#organizacao')) fail('TravelAgency @id deve terminar em #organizacao');
if (!trip['@id'] || !trip['@id'].endsWith('#passeio-rocinha')) fail('TouristTrip @id deve terminar em #passeio-rocinha');
if (!site['@id'] || !site['@id'].endsWith('#site')) fail('WebSite @id deve terminar em #site');

if (org.url !== 'https://www.wlfavelatour.com.br/') fail('TravelAgency url inválida');
if (site.url !== 'https://www.wlfavelatour.com.br/') fail('WebSite url inválida');
if (trip.provider['@id'] !== org['@id']) fail('TouristTrip provider deve referenciar TravelAgency');

const tripLangs = trip.inLanguage;
if (!Array.isArray(tripLangs) || tripLangs.length !== 2 || tripLangs[0] !== 'pt-BR' || tripLangs[1] !== 'es') {
  fail('TouristTrip.inLanguage deve ser exatamente ["pt-BR", "es"]');
}

const allSrc = readFile('src/App.js') + readFile('src/App.css') + readFile('src/index.css') + distHtml;
if (allSrc.includes('expériences')) fail('Termo "expériences" encontrado');

const robots = readFile('dist/robots.txt').replace(/\r\n/g, '\n').trim();
const expectedRobots = 'User-agent: *\nAllow: /\n\nSitemap: https://www.wlfavelatour.com.br/sitemap.xml\n\n# llms.txt: https://www.wlfavelatour.com.br/llms.txt';
if (robots !== expectedRobots) fail('robots.txt não normalizado');

const sitemap = readFile('dist/sitemap.xml');
if (!sitemap.startsWith('<?xml')) fail('Sitemap deve ter declaração XML');
if (!sitemap.includes('<urlset')) fail('Sitemap deve ter urlset');
const locMatches = sitemap.match(/<loc>([^<]+)<\/loc>/g);
if (!locMatches || locMatches.length !== 4) fail('Sitemap deve ter exatamente 4 <loc>');
const locUrl = locMatches[0].match(/<loc>([^<]+)<\/loc>/)[1];
if (locUrl !== 'https://www.wlfavelatour.com.br/') fail('Sitemap <loc> deve ser URL oficial');

console.log('OK: Todas as validações passaram');