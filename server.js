/**
 * eXeViewer - Lightweight HTTP Server
 * Compatible with Bun and Node.js
 */

import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

// MIME types for common file extensions
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'audio/ogg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8'
};

/**
 * Get MIME type based on file extension
 * @param {string} filePath - Path to the file
 * @returns {string} MIME type
 */
function getMimeType(filePath) {
    const ext = extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Serve a static file
 * @param {string} filePath - Path to the file
 * @param {object} res - HTTP response object
 */
async function serveFile(filePath, res) {
    try {
        const fullPath = join(__dirname, filePath);

        // Security: prevent directory traversal
        if (!fullPath.startsWith(__dirname)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        const fileStats = await stat(fullPath);

        if (fileStats.isDirectory()) {
            // Try to serve index.html from directory
            return serveFile(join(filePath, 'index.html'), res);
        }

        const content = await readFile(fullPath);
        const mimeType = getMimeType(fullPath);

        res.writeHead(200, {
            'Content-Type': mimeType,
            'Content-Length': content.length,
            'Cache-Control': 'no-cache'
        });
        res.end(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('Not Found');
        } else {
            console.error('Error serving file:', error);
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }
}

/**
 * Request handler
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
async function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // Log requests for debugging
    console.log(`${req.method} ${pathname}`);

    // Handle root path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Requests to /viewer/* will be handled by the Service Worker
    // The server returns 404 for these, letting the SW intercept
    if (pathname.startsWith('/viewer/')) {
        res.writeHead(404);
        res.end('Not Found - Content served by Service Worker');
        return;
    }

    // Serve static files
    await serveFile(pathname, res);
}

// Create and start the server
const server = createServer(handleRequest);

server.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║           eXeViewer Server                 ║');
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  Server running at:                        ║`);
    console.log(`║  http://localhost:${PORT}                      ║`);
    console.log('╠════════════════════════════════════════════╣');
    console.log('║  Press Ctrl+C to stop the server           ║');
    console.log('╚════════════════════════════════════════════╝');
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port.`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
