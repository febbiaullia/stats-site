// Tiny static server for previewing NationScope locally (Node 22,
// standard library only). Serves app/ at http://localhost:8080.
// Usage: node serve.ts [--port 8080]

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = join(fileURLToPath(new URL(".", import.meta.url)), "app");
const portFlag = process.argv.indexOf("--port");
const port = portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 8080;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const rel = normalize(urlPath === "/" ? "/index.html" : urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(appDir, rel);
  if (!filePath.startsWith(appDir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(filePath)] || "application/octet-stream" });
  res.end(readFileSync(filePath));
}).listen(port, () => {
  console.log(`NationScope preview: http://localhost:${port}/ (serving app/)`);
});
