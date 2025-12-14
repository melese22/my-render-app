// server.js
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Render sets the PORT env variable. 
// We must listen on 0.0.0.0 to be accessible externally.
const PORT = process.env.PORT || 3000;
const HOSTNAME = '0.0.0.0'; 

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  try {
    // 1. Remove query strings (e.g., /style.css?v=123 -> /style.css)
    const cleanUrl = new URL(req.url, `http://${req.headers.host}`).pathname;
    
    // 2. Determine file path
    let filePath = cleanUrl === '/' ? '/index.html' : cleanUrl;
    let fullPath = join(__dirname, 'dist', filePath);
    
    // 3. Security check: Prevent directory traversal
    if (!fullPath.startsWith(join(__dirname, 'dist'))) {
        res.writeHead(403);
        res.end('403: Forbidden');
        return;
    }

    const ext = extname(fullPath);

    // 4. Try to serve the static file
    const content = await readFile(fullPath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (error) {
    // 5. SPA Fallback: If file not found, serve index.html
    // This allows React/Vue/Angular routing to work on refresh
    try {
      if (req.url.includes('.')) {
        // If it looked like a file (has extension) but failed, send 404
        throw error; 
      }
      const indexHtml = await readFile(join(__dirname, 'dist', 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    } catch (err) {
      console.error('File not found:', req.url);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404: File not found');
    }
  }
});

// Explicitly bind to HOSTNAME (0.0.0.0)
server.listen(PORT, HOSTNAME, () => {
  console.log(`🚀 Server running on http://${HOSTNAME}:${PORT}`);
  console.log(`📁 Serving from: ${join(__dirname, 'dist')}`);
});
