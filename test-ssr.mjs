import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distSsrDir = resolve("../dist-ssr");
const ssrBundlePath = join(distSsrDir, "entry-server.js");

console.log("Importing from:", ssrBundlePath);

const ssrModule = await import(`file:///${ssrBundlePath.replace(/\\/g, "/")}`);
console.log("Module imported:", ssrModule);
console.log("Default export:", ssrModule.default);

const appHtml = ssrModule.default();
console.log("HTML length:", appHtml.length);
console.log("First 200 chars:", appHtml.substring(0, 200));