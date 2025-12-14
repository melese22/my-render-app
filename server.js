// server.js - Simple HTTP server (no Express needed)
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  let filePath = req.url === '/' ? '/index.html' : req.url;
  let fullPath = join(__dirname, 'dist', filePath);
  const ext = extname(fullPath);
  
  try {
    const content = await readFile(fullPath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    // SPA routing - serve index.html for all routes
    try {
      const indexHtml = await readFile(join(__dirname, 'dist', 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404: File not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving from: ${join(__dirname, 'dist')}`);
});