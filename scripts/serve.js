#!/usr/bin/env node
/**
 * serve.js
 * ---------------------------------------------------------------------------
 * A tiny zero-dependency static file server for previewing the site locally,
 * straight from the repo root — the same place GitHub Pages ends up serving
 * it from. There's no separate build output folder to point at.
 *
 *   npm run build    (writes notes.json + search-index.json)
 *   npm run preview  (serves everything)
 *
 * Then open http://localhost:8080
 * ---------------------------------------------------------------------------
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

if (!fs.existsSync(path.join(ROOT, "notes.json"))) {
  console.warn('Heads up: no notes.json found yet. Run `npm run build` first, or the sidebar will be empty.');
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(ROOT, urlPath);

  // Prevent path traversal outside the repo root.
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Not found: ${urlPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Preview running at http://localhost:${PORT}`);
});
