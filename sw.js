/**
 * eXeViewer - Service Worker
 * Handles PWA caching and serves extracted ZIP content from memory
 */

const SW_VERSION = '1.3.0';
const CACHE_NAME = `exeviewer-v${SW_VERSION}`;

// Files to cache for offline use (app shell)
const APP_SHELL_FILES = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/i18n.js',
    './lang/en.json',
    './lang/es.json',
    './img/logo.svg',
    './img/icon.svg',
    './img/favicon.ico',
    './manifest.json',
    './vendor/bootstrap/css/bootstrap.min.css',
    './vendor/bootstrap/js/bootstrap.bundle.min.js',
    './vendor/bootstrap-icons/bootstrap-icons.min.css',
    './vendor/bootstrap-icons/fonts/bootstrap-icons.woff2',
    './vendor/bootstrap-icons/fonts/bootstrap-icons.woff',
    './vendor/jszip/jszip.min.js'
];

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
 * Install event - cache app shell files
 */
self.addEventListener('install', (event) => {
    console.log(`[SW] Service Worker v${SW_VERSION} installing...`);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching app shell...');
                return cache.addAll(APP_SHELL_FILES).catch(err => {
                    console.warn('[SW] Some app shell files failed to cache:', err);
                });
            })
            .then(() => {
                console.log('[SW] App shell cached successfully');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
    );
});

/**
 * Activate event - clean up old caches and claim clients
 */
self.addEventListener('activate', (event) => {
    console.log(`[SW] Service Worker v${SW_VERSION} activated`);

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log(`[SW] Deleting old cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Claim all clients immediately
                return self.clients.claim();
            })
    );
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

        case 'SKIP_WAITING':
            // Skip waiting for update
            self.skipWaiting();
            break;

        default:
            if (type) {
                console.warn(`[SW] Unknown message type: ${type}`);
            }
    }
});

/**
 * Fetch event - intercept requests and serve from cache or memory
 */
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    // Handle viewer requests (from extracted ZIP)
    if (pathname.includes('/viewer/')) {
        const viewerIndex = pathname.indexOf('/viewer/');
        if (viewerIndex !== -1) {
            event.respondWith(handleViewerRequest(pathname, viewerIndex));
            return;
        }
    }

    // For navigation requests, use cache-first with network fallback
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request)
                        .then(response => {
                            // Cache successful navigation responses
                            if (response.ok) {
                                const responseClone = response.clone();
                                caches.open(CACHE_NAME).then(cache => {
                                    cache.put(event.request, responseClone);
                                });
                            }
                            return response;
                        })
                        .catch(() => {
                            // Return cached index.html as fallback
                            return caches.match('./index.html');
                        });
                })
        );
        return;
    }

    // For language files, use network-first to ensure translations are up to date
    if (pathname.endsWith('.json') && pathname.includes('/lang/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // For other requests, use cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Cache the fetched response for future use
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });

                        return response;
                    })
                    .catch(error => {
                        console.warn('[SW] Fetch failed:', error);
                        // Could return a custom offline page here
                        throw error;
                    });
            })
    );
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
