/**
 * eXeViewer - Service Worker
 * Handles PWA caching and serves extracted ZIP content from memory/IndexedDB
 */

const SW_VERSION = '1.7.0';
const CACHE_NAME = `exeviewer-v${SW_VERSION}`;

// IndexedDB configuration
const DB_NAME = 'exeviewer-content';
const DB_VERSION = 1;
const STORE_NAME = 'files';

// Files to cache for offline use (app shell)
const APP_SHELL_FILES = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/i18n.js',
    './js/zip.worker.js',
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
    './vendor/fflate/fflate.min.js'
];

// In-memory storage for the extracted ZIP contents
let contentFiles = new Map();
let contentReady = false;

// Content options
let contentOptions = {
    openExternalLinksInNewWindow: true
};

/**
 * Open IndexedDB database
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
}

/**
 * Save content to IndexedDB
 * @param {Object} files - Files object to save
 * @param {Object} options - Content options to save
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function saveToIndexedDB(files, options = {}) {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);

        // Clear existing content and save new
        store.clear();
        store.put(files, 'content');
        store.put(options, 'options');

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => {
                db.close();
                console.log('[SW] Content saved to IndexedDB');
                resolve({ success: true });
            };
            tx.onerror = (event) => {
                db.close();
                const error = event.target.error || tx.error;
                console.error('[SW] Transaction error:', error);
                reject(error);
            };
            tx.onabort = (event) => {
                db.close();
                const error = event.target.error || tx.error;
                console.error('[SW] Transaction aborted:', error);
                reject(error);
            };
        });
    } catch (err) {
        console.error('[SW] Failed to save to IndexedDB:', err);
        // Check for quota exceeded error
        if (err.name === 'QuotaExceededError' ||
            (err.message && err.message.includes('quota'))) {
            return { success: false, error: 'QUOTA_EXCEEDED' };
        }
        return { success: false, error: err.message || 'UNKNOWN_ERROR' };
    }
}

/**
 * Load content from IndexedDB
 * @returns {Promise<{files: Object|null, options: Object|null}>}
 */
async function loadFromIndexedDB() {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const contentRequest = store.get('content');
        const optionsRequest = store.get('options');

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => {
                db.close();
                resolve({
                    files: contentRequest.result || null,
                    options: optionsRequest.result || null
                });
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[SW] Failed to load from IndexedDB:', err);
        return { files: null, options: null };
    }
}

/**
 * Clear content from IndexedDB
 * @returns {Promise<void>}
 */
async function clearIndexedDB() {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.clear();

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => {
                db.close();
                console.log('[SW] IndexedDB cleared');
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[SW] Failed to clear IndexedDB:', err);
    }
}

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
 * Activate event - clean up old caches, restore content from IndexedDB, and claim clients
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
                // Restore content from IndexedDB if available
                return loadFromIndexedDB();
            })
            .then(stored => {
                if (stored.files) {
                    contentFiles = new Map(Object.entries(stored.files));
                    contentReady = true;
                    console.log(`[SW] Content restored from IndexedDB: ${contentFiles.size} files`);
                }
                if (stored.options) {
                    contentOptions = { ...contentOptions, ...stored.options };
                    console.log('[SW] Options restored from IndexedDB:', contentOptions);
                }
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

            // Store options
            if (data.options) {
                contentOptions = { ...contentOptions, ...data.options };
                console.log('[SW] Options:', contentOptions);
            }

            // Persist to IndexedDB (including options)
            saveToIndexedDB(data.files, contentOptions).then(result => {
                // Notify the client of the result
                if (event.source) {
                    if (result && result.success === false) {
                        // Storage failed (likely quota exceeded)
                        event.source.postMessage({
                            type: 'CONTENT_READY',
                            fileCount: contentFiles.size,
                            storageError: result.error
                        });
                    } else {
                        event.source.postMessage({
                            type: 'CONTENT_READY',
                            fileCount: contentFiles.size
                        });
                    }
                }
            }).catch(err => {
                console.error('[SW] Error saving to IndexedDB:', err);
                // Still notify content is ready (in memory), but with storage error
                if (event.source) {
                    const errorType = (err.name === 'QuotaExceededError' ||
                        (err.message && err.message.includes('quota')))
                        ? 'QUOTA_EXCEEDED' : 'STORAGE_ERROR';
                    event.source.postMessage({
                        type: 'CONTENT_READY',
                        fileCount: contentFiles.size,
                        storageError: errorType
                    });
                }
            });
            break;

        case 'CLEAR_CONTENT':
            // Clear the current content
            contentFiles.clear();
            contentReady = false;
            console.log('[SW] Content cleared');

            // Clear from IndexedDB
            clearIndexedDB();

            if (event.source) {
                event.source.postMessage({
                    type: 'CONTENT_CLEARED'
                });
            }
            break;

        case 'GET_STATUS':
            // Return the current status
            const statusResponse = {
                type: 'STATUS',
                ready: contentReady,
                fileCount: contentFiles.size,
                version: SW_VERSION
            };

            // Respond via MessageChannel port if available, otherwise via source
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage(statusResponse);
            } else if (event.source) {
                event.source.postMessage(statusResponse);
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
 * Script to inject into HTML files to handle external links
 * Opens external links in a new tab to avoid navigation issues in iframes
 */
const EXTERNAL_LINK_HANDLER_SCRIPT = `
<script data-injected-by="eXeViewer">
(function() {
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        // Check if it's an external link (starts with http:// or https:// and different origin)
        try {
            var url = new URL(href, window.location.href);
            var isExternal = (url.protocol === 'http:' || url.protocol === 'https:') &&
                             url.origin !== window.location.origin;

            if (isExternal) {
                e.preventDefault();
                e.stopPropagation();
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            // Invalid URL, let browser handle it
        }
    }, true);
})();
</script>
`;

/**
 * Inject external link handler script into HTML content
 * @param {Uint8Array} body - The HTML content as bytes
 * @returns {Uint8Array} The modified HTML content
 */
function injectExternalLinkHandler(body) {
    try {
        // Convert bytes to string
        const decoder = new TextDecoder('utf-8');
        let html = decoder.decode(body);

        // Find insertion point (before </body> or </html>)
        const bodyCloseIndex = html.lastIndexOf('</body>');
        const htmlCloseIndex = html.lastIndexOf('</html>');

        let insertIndex = -1;
        if (bodyCloseIndex !== -1) {
            insertIndex = bodyCloseIndex;
        } else if (htmlCloseIndex !== -1) {
            insertIndex = htmlCloseIndex;
        }

        if (insertIndex !== -1) {
            html = html.substring(0, insertIndex) + EXTERNAL_LINK_HANDLER_SCRIPT + html.substring(insertIndex);
        } else {
            // No closing tag found, append at the end
            html += EXTERNAL_LINK_HANDLER_SCRIPT;
        }

        // Convert back to bytes
        const encoder = new TextEncoder();
        return encoder.encode(html);
    } catch (err) {
        console.warn('[SW] Failed to inject external link handler:', err);
        return body;
    }
}

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

        // Convert data to Uint8Array for Response
        let body;
        if (fileData instanceof ArrayBuffer) {
            // ArrayBuffer data (new optimized format)
            body = new Uint8Array(fileData);
        } else if (typeof fileData === 'string') {
            // Base64 encoded data (legacy fallback for old IndexedDB data)
            const binaryString = atob(fileData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            body = bytes;
        } else if (fileData instanceof Uint8Array) {
            body = fileData;
        } else {
            body = fileData;
        }

        // For HTML files, inject a script to handle external links (if enabled)
        if (mimeType.startsWith('text/html') && contentOptions.openExternalLinksInNewWindow) {
            body = injectExternalLinkHandler(body);
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
