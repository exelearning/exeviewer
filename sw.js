/**
 * eXeViewer - Service Worker
 * Intercepts requests to /viewer/* and serves files from memory
 */

const SW_VERSION = '1.0.1';

// In-memory storage for the extracted ZIP contents
let contentFiles = new Map();
let contentReady = false;

// The base path will be determined from the registration scope
let basePath = '/';

/**
 * MIME types for common file extensions
 */
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'audio/ogg',
    '.ogv': 'video/ogg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml',
    '.xhtml': 'application/xhtml+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.zip': 'application/zip',
    '.swf': 'application/x-shockwave-flash'
};

/**
 * Get MIME type based on file extension
 * @param {string} filename - Name of the file
 * @returns {string} MIME type
 */
function getMimeType(filename) {
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Get the viewer path prefix based on the registration scope
 * @returns {string} The viewer path prefix
 */
function getViewerPathPrefix() {
    // Extract base path from the service worker's registration scope
    try {
        const scopeUrl = new URL(self.registration.scope);
        basePath = scopeUrl.pathname;
        if (!basePath.endsWith('/')) {
            basePath += '/';
        }
    } catch (e) {
        basePath = '/';
    }
    return basePath + 'viewer/';
}

/**
 * Install event - activate immediately
 */
self.addEventListener('install', (event) => {
    console.log(`[SW] Service Worker v${SW_VERSION} installing...`);
    // Skip waiting to activate immediately
    self.skipWaiting();
});

/**
 * Activate event - claim all clients immediately
 */
self.addEventListener('activate', (event) => {
    console.log(`[SW] Service Worker v${SW_VERSION} activated`);
    // Claim all clients immediately
    event.waitUntil(self.clients.claim());
});

/**
 * Message event - receive content from the main application
 */
self.addEventListener('message', (event) => {
    const { type, data } = event.data || {};

    switch (type) {
        case 'SET_CONTENT':
            // Receive the extracted ZIP content
            contentFiles = new Map(Object.entries(data.files));
            contentReady = true;
            console.log(`[SW] Content loaded: ${contentFiles.size} files`);
            console.log('[SW] Sample files:', Array.from(contentFiles.keys()).slice(0, 5));

            // Notify the client that content is ready
            if (event.source) {
                event.source.postMessage({
                    type: 'CONTENT_READY',
                    fileCount: contentFiles.size
                });
            }
            break;

        case 'CLEAR_CONTENT':
            // Clear the current content
            contentFiles.clear();
            contentReady = false;
            console.log('[SW] Content cleared');

            if (event.source) {
                event.source.postMessage({
                    type: 'CONTENT_CLEARED'
                });
            }
            break;

        case 'GET_STATUS':
            // Return the current status
            if (event.source) {
                event.source.postMessage({
                    type: 'STATUS',
                    ready: contentReady,
                    fileCount: contentFiles.size,
                    version: SW_VERSION
                });
            }
            break;

        case 'CLAIM_CLIENTS':
            // Force claim all clients
            self.clients.claim();
            console.log('[SW] Claimed all clients');
            break;

        default:
            if (type) {
                console.warn(`[SW] Unknown message type: ${type}`);
            }
    }
});

/**
 * Fetch event - intercept requests and serve from memory
 */
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;
    const viewerPrefix = getViewerPathPrefix();

    // Only intercept requests that contain /viewer/ in the path
    if (!pathname.includes('/viewer/')) {
        return; // Let the request pass through to the network
    }

    // Find the viewer portion of the path
    const viewerIndex = pathname.indexOf('/viewer/');
    if (viewerIndex === -1) {
        return;
    }

    event.respondWith(handleViewerRequest(pathname, viewerIndex));
});

/**
 * Handle requests to the viewer path
 * @param {string} pathname - The request pathname
 * @param {number} viewerIndex - Index where /viewer/ starts in pathname
 * @returns {Promise<Response>} The response
 */
async function handleViewerRequest(pathname, viewerIndex) {
    // Extract the file path from the viewer URL
    // Skip past "/viewer/"
    let filePath = pathname.substring(viewerIndex + 8);

    // Handle root path
    if (filePath === '' || filePath === '/') {
        filePath = 'index.html';
    }

    // Remove leading slash if present
    if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
    }

    // Decode URL-encoded characters
    filePath = decodeURIComponent(filePath);

    console.log(`[SW] Request for: ${filePath}`);

    // Check if content is ready
    if (!contentReady || contentFiles.size === 0) {
        console.warn('[SW] Content not ready yet');
        return new Response('Content not loaded. Please upload a ZIP file first.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    // Look for the file in our content map
    let fileData = contentFiles.get(filePath);

    // If not found, try with index.html for directory requests
    if (!fileData && !filePath.includes('.')) {
        const indexPath = filePath.endsWith('/')
            ? filePath + 'index.html'
            : filePath + '/index.html';
        fileData = contentFiles.get(indexPath);
    }

    // Also try case-insensitive search
    if (!fileData) {
        for (const [key, value] of contentFiles) {
            if (key.toLowerCase() === filePath.toLowerCase()) {
                fileData = value;
                break;
            }
        }
    }

    if (fileData) {
        const mimeType = getMimeType(filePath);
        console.log(`[SW] Serving: ${filePath} (${mimeType})`);

        // Convert base64 data back to binary
        let body;
        if (typeof fileData === 'string') {
            // Base64 encoded data
            const binaryString = atob(fileData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            body = bytes;
        } else {
            body = fileData;
        }

        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'no-cache',
                'X-Served-By': 'eXeViewer-SW'
            }
        });
    }

    // File not found
    console.warn(`[SW] File not found: ${filePath}`);
    console.log('[SW] Available files:', Array.from(contentFiles.keys()).slice(0, 20));

    return new Response(`File not found: ${filePath}`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
    });
}
