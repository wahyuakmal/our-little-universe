import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Custom Vite plugin for Local Admin API (Image & Audio uploads + Data persistence directly to disk)
function adminApiPlugin() {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle file upload: POST /api/upload
        if (req.url === '/api/upload' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { filename, data } = JSON.parse(body);
              if (!filename || !data) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Filename and data required' }));
                return;
              }

              // Extract base64 content
              const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              let buffer;
              if (matches && matches.length === 3) {
                buffer = Buffer.from(matches[2], 'base64');
              } else {
                buffer = Buffer.from(data, 'base64');
              }

              const ext = (path.extname(filename) || '.jpg').toLowerCase();
              const isAudio = ['.mp3', '.wav', '.ogg', '.m4a'].includes(ext);

              // Determine target directory and public URL
              const subFolder = isAudio ? 'audio' : 'images';
              const targetDir = path.join(process.cwd(), 'public', subFolder);
              
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }

              const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
              const safeFilename = `${Date.now()}_${baseName}${ext}`;
              const filePath = path.join(targetDir, safeFilename);

              fs.writeFileSync(filePath, buffer);

              const publicUrl = `/${subFolder}/${safeFilename}`;
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: publicUrl, filename: safeFilename }));
            } catch (err) {
              console.error('Error in /api/upload:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Handle saving custom data: POST /api/save-data
        if (req.url === '/api/save-data' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const customData = JSON.parse(body);
              const dataPath = path.join(process.cwd(), 'public', 'coupleCustomData.json');
              fs.writeFileSync(dataPath, JSON.stringify(customData, null, 2), 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error('Error saving custom data:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Handle fetching custom data: GET /api/data
        if (req.url === '/api/data' && req.method === 'GET') {
          const dataPath = path.join(process.cwd(), 'public', 'coupleCustomData.json');
          if (fs.existsSync(dataPath)) {
            try {
              const content = fs.readFileSync(dataPath, 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(content);
              return;
            } catch (err) {
              console.error('Error reading custom data:', err);
            }
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ exists: false }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  base: './', // Ensures relative assets work anywhere (GitHub Pages, Vercel, Netlify, subdirectories)
  plugins: [react(), adminApiPlugin()],
  server: {
    port: 5173,
    open: false
  }
});
