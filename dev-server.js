const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = 8080;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  let filePath = decodeURIComponent(url.pathname);

  if (filePath === "/") {
    filePath = "/index.html";
  }

  const resolvedPath = path.resolve(root, `.${filePath}`);

  if (!resolvedPath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(resolvedPath)] || "application/octet-stream",
    });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
