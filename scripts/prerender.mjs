import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = resolve(__dirname, "..", "dist");
const distSsrDir = resolve(__dirname, "..", "dist-ssr");
const templatePath = join(distDir, "index.html");
const ssrBundlePath = join(distSsrDir, "entry-server.js");

// Lê o index.html construído pelo cliente (contém scripts e estilos)
let template = readFileSync(templatePath, "utf-8");

// Importa o bundle SSR e renderiza o app
const ssrModule = await import(`file:///${ssrBundlePath.replace(/\\/g, "/")}`);
const appHtml = ssrModule.default();

// Substitui o conteúdo da div raiz no template pelo conteúdo SSR
const updatedHtml = template.replace(
  /<div id="root"><\/div>/,
  `<div id="root">${appHtml}</div>`,
);

// Escreve o resultado de volta em dist/index.html
writeFileSync(templatePath, updatedHtml, "utf-8");
console.log("Prerendering concluído com sucesso");
