/**
 * eXeViewer - Main Application
 * Handles file loading, ZIP extraction, and content display
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        // Application version (displayed in footer)
        version: '1.0.0',
        // Automatically restore and display content from IndexedDB on page load
        autoRestoreContent: true,
        // Open external links in a new window/tab (prevents navigation issues in iframes)
        openExternalLinksInNewWindow: true,
        // Validate that the ZIP contains eXeLearning content before displaying
        validateExeContent: true,
        // Available languages (ISO 639-1 codes). Each language must have a corresponding lang/XX.json file.
        availableLanguages: ['en', 'es'],
        // Default state of "Download button" checkbox in share modal
        allowDownloadByDefault: true
    };

    // Application state
    const state = {
        serviceWorkerReady: false,
        serviceWorkerRegistration: null,
        currentPackageName: null,
        contentFromUrl: null,  // Stores the source URL when content is loaded from URL
        historyNavigationCount: 0,  // Counter to track pending history navigations
        zipWorker: null  // Web Worker for ZIP extraction
    };

    // DOM Elements
    const elements = {
        topNavbar: null,
        packageName: null,
        btnLoadNew: null,
        btnDownload: null,
        btnShare: null,
        btnNewWindow: null,
        welcomeScreen: null,
        viewerContainer: null,
        contentFrame: null,
        dropZone: null,
        fileInput: null,
        urlInput: null,
        btnLoadUrl: null,
        loadingIndicator: null,
        loadingText: null,
        errorAlert: null,
        errorMessage: null,
        // Share modal elements
        shareModal: null,
        shareUrlInput: null,
        btnCopyShareUrl: null,
        copySuccess: null,
        linkUpdated: null,
        allowDownloadCheck: null,
        // Footer element
        footerInfo: null
    };

    /**
     * Get the base path for relative URLs
     */
    function getBasePath() {
        const path = window.location.pathname;
        return path.substring(0, path.lastIndexOf('/') + 1);
    }

    /**
     * Check if we're in a secure context
     */
    function isSecureContext() {
        return window.isSecureContext ||
               location.protocol === 'https:' ||
               location.hostname === 'localhost' ||
               location.hostname === '127.0.0.1';
    }

    /**
     * Format bytes to human readable string
     * @param {number} bytes - Number of bytes
     * @returns {string} Formatted string (e.g., "1.5 MB")
     */
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /**
     * Estimate storage quota and usage
     * @returns {Promise<{quota: number, usage: number, available: number}|null>}
     */
    async function estimateStorage() {
        if (navigator.storage && navigator.storage.estimate) {
            try {
                const estimate = await navigator.storage.estimate();
                return {
                    quota: estimate.quota || 0,
                    usage: estimate.usage || 0,
                    available: (estimate.quota || 0) - (estimate.usage || 0)
                };
            } catch (err) {
                console.warn('[App] Storage estimation failed:', err);
                return null;
            }
        }
        return null;
    }

    /**
     * Calculate approximate size of extracted files object
     * @param {Object} files - Map of file paths to base64-encoded contents
     * @returns {number} Approximate size in bytes
     */
    function calculateFilesSize(files) {
        let totalSize = 0;
        for (const path in files) {
            // Base64 string: actual binary size is about 3/4 of string length
            // But we're storing the base64 string, so use full length
            totalSize += path.length + files[path].length;
        }
        // Add some overhead for object structure
        return Math.ceil(totalSize * 1.1);
    }

    /**
     * Initialize DOM element references
     */
    function initElements() {
        elements.topNavbar = document.getElementById('topNavbar');
        elements.packageName = document.getElementById('packageName');
        elements.btnLoadNew = document.getElementById('btnLoadNew');
        elements.btnDownload = document.getElementById('btnDownload');
        elements.btnShare = document.getElementById('btnShare');
        elements.btnNewWindow = document.getElementById('btnNewWindow');
        elements.welcomeScreen = document.getElementById('welcomeScreen');
        elements.viewerContainer = document.getElementById('viewerContainer');
        elements.contentFrame = document.getElementById('contentFrame');
        elements.dropZone = document.getElementById('dropZone');
        elements.fileInput = document.getElementById('fileInput');
        elements.urlInput = document.getElementById('urlInput');
        elements.btnLoadUrl = document.getElementById('btnLoadUrl');
        elements.loadingIndicator = document.getElementById('loadingIndicator');
        elements.loadingText = document.getElementById('loadingText');
        elements.errorAlert = document.getElementById('errorAlert');
        elements.errorMessage = document.getElementById('errorMessage');
        // Share modal elements
        elements.shareModal = document.getElementById('shareModal');
        elements.shareUrlInput = document.getElementById('shareUrlInput');
        elements.btnCopyShareUrl = document.getElementById('btnCopyShareUrl');
        elements.copySuccess = document.getElementById('copySuccess');
        elements.linkUpdated = document.getElementById('linkUpdated');
        elements.allowDownloadCheck = document.getElementById('allowDownloadCheck');
        // Footer element
        elements.footerInfo = document.getElementById('footerInfo');
    }

    /**
     * Update the footer with dynamic links
     * Replaces "eXeViewer %s" and "eXeLearning" with links
     */
    function updateFooter() {
        if (!elements.footerInfo) return;

        // Get the translated text
        let text = i18n.t('welcome.supportedFormats');

        // Replace "eXeViewer %s" with a link including version
        text = text.replace(
            /eXeViewer %s/g,
            `<a href="https://github.com/exelearning/exeviewer/" target="_blank" rel="noopener">eXeViewer v${config.version}</a>`
        );

        // Replace "eXeLearning" with a link
        text = text.replace(
            /eXeLearning/g,
            '<a href="https://exelearning.net/" target="_blank" rel="noopener">eXeLearning</a>'
        );

        // Build the footer HTML
        const footerHtml = `<i class="bi bi-info-circle me-1"></i>${text}`;

        elements.footerInfo.innerHTML = footerHtml;
    }

    /**
     * Wait for Service Worker to be controlling the page
     */
    function waitForController(timeout = 5000) {
        return new Promise((resolve, reject) => {
            if (navigator.serviceWorker.controller) {
                resolve(navigator.serviceWorker.controller);
                return;
            }

            const timeoutId = setTimeout(() => {
                navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                reject(new Error(i18n.t('errors.swTimeout')));
            }, timeout);

            const onControllerChange = () => {
                clearTimeout(timeoutId);
                navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                resolve(navigator.serviceWorker.controller);
            };

            navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
        });
    }

    /**
     * Register the Service Worker
     */
    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            throw new Error(i18n.t('errors.swNotSupported'));
        }

        if (!isSecureContext()) {
            throw new Error(i18n.t('errors.swSecureContext'));
        }

        const basePath = getBasePath();
        const swPath = basePath + 'sw.js';
        console.log('[App] Registering Service Worker at:', swPath);

        try {
            // Check for existing registration first
            const existingReg = await navigator.serviceWorker.getRegistration(basePath);

            if (existingReg) {
                console.log('[App] Found existing Service Worker registration');
                state.serviceWorkerRegistration = existingReg;

                // Update the SW if needed
                await existingReg.update();

                // If there's an active worker, we're good
                if (existingReg.active) {
                    console.log('[App] Service Worker is active');

                    // Make sure it claims clients
                    if (!navigator.serviceWorker.controller) {
                        existingReg.active.postMessage({ type: 'CLAIM_CLIENTS' });
                        await waitForController();
                    }

                    state.serviceWorkerReady = true;
                    return;
                }
            }

            // Register new Service Worker
            const registration = await navigator.serviceWorker.register(swPath, {
                scope: basePath
            });

            state.serviceWorkerRegistration = registration;
            console.log('[App] Service Worker registered with scope:', registration.scope);

            // Wait for the Service Worker to become active
            const sw = registration.installing || registration.waiting || registration.active;

            if (sw) {
                if (sw.state === 'activated') {
                    console.log('[App] Service Worker already activated');
                } else {
                    console.log('[App] Waiting for Service Worker to activate...');
                    await new Promise((resolve) => {
                        sw.addEventListener('statechange', function onStateChange(e) {
                            console.log('[App] Service Worker state:', e.target.state);
                            if (e.target.state === 'activated') {
                                sw.removeEventListener('statechange', onStateChange);
                                resolve();
                            }
                        });

                        // Check if already activated
                        if (sw.state === 'activated') {
                            resolve();
                        }
                    });
                }
            }

            // Wait for the SW to control the page
            if (!navigator.serviceWorker.controller) {
                console.log('[App] Waiting for controller...');
                if (registration.active) {
                    registration.active.postMessage({ type: 'CLAIM_CLIENTS' });
                }
                await waitForController();
            }

            state.serviceWorkerReady = true;
            console.log('[App] Service Worker ready and controlling');

        } catch (error) {
            console.error('[App] Service Worker registration failed:', error);
            throw error;
        }
    }

    /**
     * Send content to the Service Worker using a more reliable method
     * @param {Object} files - Map of file paths to file contents
     * @returns {Promise<{fileCount: number, storageWarning?: string, storageError?: string}>}
     */
    async function sendContentToServiceWorker(files) {
        // Ensure we have a controller
        if (!navigator.serviceWorker.controller) {
            console.log('[App] No controller, waiting...');
            await waitForController();
        }

        // Preventive storage check
        let storageWarning = null;
        const filesSize = calculateFilesSize(files);
        const storageEstimate = await estimateStorage();

        if (storageEstimate) {
            console.log(`[App] Storage: ${formatBytes(storageEstimate.available)} available, file needs ~${formatBytes(filesSize)}`);

            // Warn if file size is more than 80% of available space
            if (filesSize > storageEstimate.available * 0.8) {
                storageWarning = i18n.t('errors.storageQuotaWarning', {
                    fileSize: formatBytes(filesSize),
                    available: formatBytes(storageEstimate.available)
                });
                console.warn('[App] Storage warning:', storageWarning);
            }
        }

        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.warn('[App] Content send timeout, continuing anyway');
                resolve({ fileCount: Object.keys(files).length, storageWarning });
            }, 10000);

            const messageHandler = (event) => {
                if (event.data && event.data.type === 'CONTENT_READY') {
                    clearTimeout(timeout);
                    navigator.serviceWorker.removeEventListener('message', messageHandler);
                    console.log('[App] Content ready, files:', event.data.fileCount);

                    // Include storage warning and any error from SW
                    resolve({
                        fileCount: event.data.fileCount,
                        storageWarning,
                        storageError: event.data.storageError
                    });
                }
            };

            navigator.serviceWorker.addEventListener('message', messageHandler);

            // Send content to Service Worker
            console.log('[App] Sending content to Service Worker...');

            // Collect ArrayBuffers for transfer (zero-copy)
            const transferables = Object.values(files).filter(v => v instanceof ArrayBuffer);
            console.log(`[App] Transferring ${transferables.length} ArrayBuffers`);

            navigator.serviceWorker.controller.postMessage({
                type: 'SET_CONTENT',
                data: {
                    files,
                    options: {
                        openExternalLinksInNewWindow: config.openExternalLinksInNewWindow
                    }
                }
            }, transferables);
        });
    }

    /**
     * Clear content from the Service Worker
     */
    async function clearServiceWorkerContent() {
        if (!navigator.serviceWorker.controller) {
            return;
        }

        return new Promise((resolve) => {
            const timeout = setTimeout(resolve, 2000);

            const messageHandler = (event) => {
                if (event.data && event.data.type === 'CONTENT_CLEARED') {
                    clearTimeout(timeout);
                    navigator.serviceWorker.removeEventListener('message', messageHandler);
                    resolve();
                }
            };

            navigator.serviceWorker.addEventListener('message', messageHandler);

            navigator.serviceWorker.controller.postMessage({
                type: 'CLEAR_CONTENT'
            });
        });
    }

    /**
     * Extract ZIP file contents using Web Worker
     * @param {File} file - The ZIP file to extract
     * @returns {Object} Map of file paths to ArrayBuffer contents
     */
    async function extractZipContents(file) {
        updateLoadingText(i18n.t('loading.readingZip'));

        return new Promise((resolve, reject) => {
            // Create worker if it doesn't exist
            if (!state.zipWorker) {
                const workerPath = getBasePath() + 'js/zip.worker.js';
                console.log('[App] Creating ZIP Worker at:', workerPath);
                state.zipWorker = new Worker(workerPath);
            }

            const worker = state.zipWorker;

            worker.onmessage = (e) => {
                const { type, files, fileCount, message, processed, total } = e.data;

                switch (type) {
                    case 'progress':
                        if (message === 'reading') {
                            updateLoadingText(i18n.t('loading.readingZip'));
                        } else if (message === 'extracting') {
                            updateLoadingText(i18n.t('loading.extractingFiles', { processed, total }));
                        }
                        break;

                    case 'complete':
                        console.log(`[App] Extracted ${fileCount} files via Worker`);
                        resolve(files);
                        break;

                    case 'error':
                        console.error('[App] Worker error:', message);
                        reject(new Error(message));
                        break;
                }
            };

            worker.onerror = (error) => {
                console.error('[App] Worker error:', error);
                reject(new Error(error.message || i18n.t('errors.processingFailed')));
            };

            // Send file to worker for processing
            console.log('[App] Sending file to Worker for extraction');
            worker.postMessage({ file });
        });
    }

    /**
     * Validate that the extracted files are from an eXeLearning package
     * @param {Object} files - Map of file paths to file contents
     * @returns {boolean} True if the content is valid eXeLearning content
     */
    function isValidExeContent(files) {
        const fileList = Object.keys(files);

        // Helper to check if a file exists (case-insensitive)
        const hasFile = (path) => {
            const normalizedPath = path.toLowerCase().replace(/\\/g, '/');
            return fileList.some(f => f.toLowerCase().replace(/\\/g, '/') === normalizedPath);
        };

        // Type 1 (legacy): index.html, base.css, nav.css, common.js, exe_jquery.js
        const isType1 = hasFile('index.html') &&
                        hasFile('base.css') &&
                        hasFile('nav.css') &&
                        hasFile('common.js') &&
                        hasFile('exe_jquery.js');

        if (isType1) {
            console.log('[App] Detected eXeLearning content type 1 (legacy)');
            return true;
        }

        // Type 2 (modern/.elpx): index.html, content/css/base.css, libs/exe_export.js, libs/common.js
        const isType2 = hasFile('index.html') &&
                        hasFile('content/css/base.css') &&
                        hasFile('libs/exe_export.js') &&
                        hasFile('libs/common.js');

        if (isType2) {
            console.log('[App] Detected eXeLearning content type 2 (modern)');
            return true;
        }

        console.warn('[App] Content does not match eXeLearning package structure');
        return false;
    }

    /**
     * Convert special URLs (Google Drive, ownCloud/Nextcloud) to direct download links
     * @param {string} url - The original URL
     * @returns {string} The converted URL for direct download
     */
    function convertToDirectDownloadUrl(url) {
        try {
            const urlObj = new URL(url);

            // Google Drive: convert /view to direct download
            // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
            // Convert to: https://drive.google.com/uc?export=download&id=FILE_ID
            if (urlObj.hostname === 'drive.google.com') {
                const match = url.match(/\/file\/d\/([^/]+)/);
                if (match && match[1]) {
                    const fileId = match[1];
                    return `https://drive.google.com/uc?export=download&id=${fileId}`;
                }
            }

            // Nextcloud public share links
            // Format: https://cloud.example.org/s/SHARE_TOKEN
            // Convert to: https://cloud.example.org/s/SHARE_TOKEN/download
            if (urlObj.pathname.match(/^\/s\/[^/]+\/?$/)) {
                const cleanPath = urlObj.pathname.replace(/\/$/, '');
                return `${urlObj.origin}${cleanPath}/download`;
            }

            // Return original URL if no conversion needed
            return url;
        } catch (e) {
            return url;
        }
    }

    /**
     * Extract filename from URL or Content-Disposition header
     * @param {string} url - The URL
     * @param {Response} response - The fetch response (optional)
     * @returns {string} The filename
     */
    function extractFilename(url, response = null) {
        // Try Content-Disposition header first
        if (response) {
            const contentDisposition = response.headers.get('Content-Disposition');
            if (contentDisposition) {
                const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match && match[1]) {
                    return match[1].replace(/['"]/g, '');
                }
            }
        }

        // Extract from URL path
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const filename = pathname.split('/').pop();
            if (filename && (filename.endsWith('.zip') || filename.endsWith('.elpx'))) {
                return decodeURIComponent(filename);
            }
        } catch (e) {
            // Ignore URL parsing errors
        }

        // Default filename
        return 'content.zip';
    }

    /**
     * CORS proxies - used as fallback when direct fetch fails
     * Each proxy has a different URL format
     */
    const CORS_PROXIES = [
        { url: 'https://corsproxy.io/?', encode: true },
        { url: 'https://api.allorigins.win/raw?url=', encode: true },
        { url: 'https://cors.eu.org/', encode: false }
    ];

    /**
     * Fetch with CORS proxy fallback
     * @param {string} url - The URL to fetch
     * @param {boolean} useProxy - Whether to use a CORS proxy
     * @returns {Promise<Response>} The fetch response
     */
    async function fetchWithCorsProxy(url, useProxy = false) {
        if (!useProxy) {
            return fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            });
        }

        // Try each proxy until one works
        let lastError;
        for (const proxy of CORS_PROXIES) {
            try {
                const proxyUrl = proxy.encode
                    ? proxy.url + encodeURIComponent(url)
                    : proxy.url + url;

                console.log(`[App] Trying proxy: ${proxy.url}`);
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit'
                });

                if (response.ok) {
                    console.log(`[App] Proxy ${proxy.url} succeeded`);
                    return response;
                }
            } catch (err) {
                console.warn(`[App] Proxy ${proxy.url} failed:`, err.message);
                lastError = err;
            }
        }

        // All proxies failed
        throw lastError || new Error('All CORS proxies failed');
    }

    /**
     * Download file from URL and process it
     * @param {string} url - The URL to download from
     */
    async function downloadFromUrl(url) {
        // Validate URL
        if (!url || !url.trim()) {
            showError(i18n.t('errors.invalidUrl'));
            return;
        }

        try {
            new URL(url);
        } catch (e) {
            showError(i18n.t('errors.invalidUrl'));
            return;
        }

        try {
            hideError();
            showLoading(i18n.t('loading.downloadingFile'));

            // Convert special URLs to direct download links
            const downloadUrl = convertToDirectDownloadUrl(url.trim());
            console.log('[App] Downloading from:', downloadUrl);

            let response;
            let usedProxy = false;

            // Try direct fetch first, then fallback to CORS proxy
            try {
                response = await fetchWithCorsProxy(downloadUrl, false);
                if (!response.ok) {
                    throw new Error('Direct fetch failed');
                }
            } catch (directError) {
                console.log('[App] Direct fetch failed, trying CORS proxy...');
                usedProxy = true;
                response = await fetchWithCorsProxy(downloadUrl, true);
            }

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error(i18n.t('errors.urlAccessDenied'));
                } else if (response.status === 404) {
                    throw new Error(i18n.t('errors.urlNotFound'));
                } else {
                    throw new Error(i18n.t('errors.downloadFailed'));
                }
            }

            // Check content type
            const contentType = response.headers.get('Content-Type') || '';
            const isValidType = contentType.includes('application/zip') ||
                               contentType.includes('application/x-zip') ||
                               contentType.includes('application/octet-stream') ||
                               contentType.includes('application/x-compressed');

            // Get filename from original URL (not proxy URL)
            const filename = extractFilename(downloadUrl, response);

            // Validate file extension or content type
            const lowerFilename = filename.toLowerCase();
            if (!lowerFilename.endsWith('.zip') && !lowerFilename.endsWith('.elpx') && !isValidType) {
                throw new Error(i18n.t('errors.invalidFileType'));
            }

            // Get content length for progress tracking
            const contentLength = response.headers.get('Content-Length');
            const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

            let blob;
            if (response.body) {
                // Stream download with progress
                const reader = response.body.getReader();
                const chunks = [];
                let receivedBytes = 0;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    chunks.push(value);
                    receivedBytes += value.length;

                    // Update progress
                    const size = formatBytes(receivedBytes);
                    if (totalBytes > 0) {
                        const percent = Math.round((receivedBytes / totalBytes) * 100);
                        updateLoadingText(`${i18n.t('loading.downloading')} ${percent}% (${size})`);
                    } else {
                        updateLoadingText(`${i18n.t('loading.downloading')} ${size}`);
                    }
                }

                // Combine chunks into blob
                blob = new Blob(chunks);
            } else {
                // Fallback: streaming not available
                blob = await response.blob();
            }

            if (blob.size === 0) {
                throw new Error(i18n.t('errors.emptyZip'));
            }

            // Create a File object from the blob
            const file = new File([blob], filename, {
                type: 'application/zip'
            });

            console.log(`[App] Downloaded ${filename} (${blob.size} bytes)${usedProxy ? ' via proxy' : ''}`);

            // Store the source URL for sharing functionality
            state.contentFromUrl = url.trim();

            // Process the file using existing function
            await processFile(file);

        } catch (error) {
            console.error('[App] Error downloading from URL:', error);

            // Handle network errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showError(i18n.t('errors.networkError'));
            } else {
                showError(error.message || i18n.t('errors.downloadFailed'));
            }
            hideLoading();
        }
    }

    /**
     * Process the selected file
     * @param {File} file - The file to process
     */
    async function processFile(file) {
        // Validate file type
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.zip') && !fileName.endsWith('.elpx')) {
            showError(i18n.t('errors.invalidFile'));
            return;
        }

        try {
            hideError();
            showLoading(i18n.t('loading.initializing'));

            // Ensure Service Worker is ready
            if (!state.serviceWorkerReady) {
                updateLoadingText(i18n.t('loading.registeringSW'));
                await registerServiceWorker();
            }

            // Clear any previous content
            await clearServiceWorkerContent();

            // Extract ZIP contents
            const files = await extractZipContents(file);

            if (Object.keys(files).length === 0) {
                throw new Error(i18n.t('errors.emptyZip'));
            }

            // Validate eXeLearning content (if enabled)
            if (config.validateExeContent && !isValidExeContent(files)) {
                throw new Error(i18n.t('errors.notExeContent'));
            }

            // Check if index.html exists
            if (!files['index.html']) {
                console.warn('[App] No index.html found. Available files:', Object.keys(files).slice(0, 10));

                // Try to find any HTML file
                const htmlFile = Object.keys(files).find(f =>
                    f.endsWith('.html') || f.endsWith('.htm')
                );

                if (!htmlFile) {
                    throw new Error(i18n.t('errors.noHtmlFiles'));
                }

                console.log(`[App] Using ${htmlFile} as entry point`);
            }

            updateLoadingText(i18n.t('loading.loadingContent'));

            // Send content to Service Worker
            const result = await sendContentToServiceWorker(files);

            // Handle storage errors - content is still in memory but won't persist
            if (result.storageError === 'QUOTA_EXCEEDED') {
                console.error('[App] Storage quota exceeded');
                // Show error but still display content (it's in memory)
                showError(i18n.t('errors.storageQuotaExceeded'));
            } else if (result.storageWarning) {
                // Log warning but continue
                console.warn('[App] Storage warning:', result.storageWarning);
            }

            // Store package name
            state.currentPackageName = file.name;

            // Small delay to ensure SW is ready to serve
            await new Promise(resolve => setTimeout(resolve, 200));

            // Show the viewer
            showViewer();

        } catch (error) {
            console.error('[App] Error processing file:', error);

            // Check for JSZip error (not a valid ZIP file)
            if (error.message && error.message.includes('central directory')) {
                showError(i18n.t('errors.notAZipFile'));
            } else {
                showError(error.message || i18n.t('errors.processingFailed'));
            }
            hideLoading();
        }
    }

    /**
     * Show the content viewer
     */
    function showViewer() {
        const basePath = getBasePath();

        // Set up the iframe URL
        const viewerUrl = basePath + 'viewer/index.html';
        console.log('[App] Loading viewer URL:', viewerUrl);

        // Update UI
        elements.welcomeScreen.classList.add('d-none');
        elements.viewerContainer.classList.remove('d-none');
        elements.topNavbar.classList.remove('d-none');

        // Update package name in navbar
        if (state.currentPackageName) {
            elements.packageName.textContent = state.currentPackageName;
            elements.packageName.title = state.currentPackageName;
        }

        // Update share and download button visibility
        updateShareButtonVisibility();
        updateDownloadButtonVisibility();

        // Show open in new window button
        elements.btnNewWindow.classList.remove('d-none');

        // Set up history states: first mark current state as welcome, then push viewer state
        const welcomeState = { isWelcome: true };
        const viewerState = { iframePath: 'index.html', isViewer: true };

        // Replace current state with welcome state (so going back returns here)
        history.replaceState(welcomeState, '', window.location.pathname + window.location.search);
        // Push the viewer state
        history.pushState(viewerState, '', window.location.pathname + window.location.search);

        // Increment counter to ignore the upcoming iframe load event
        state.historyNavigationCount++;

        // Load the content in the iframe
        elements.contentFrame.src = viewerUrl;

        hideLoading();
    }

    /**
     * Reset the application to initial state
     */
    async function resetApplication() {
        // Clear Service Worker content
        await clearServiceWorkerContent();

        // Reset state
        state.currentPackageName = null;
        state.contentFromUrl = null;

        // Clear iframe
        elements.contentFrame.src = 'about:blank';

        // Reset UI
        elements.viewerContainer.classList.add('d-none');
        elements.topNavbar.classList.add('d-none');
        elements.btnDownload.classList.add('d-none');
        elements.btnShare.classList.add('d-none');
        elements.btnNewWindow.classList.add('d-none');
        elements.welcomeScreen.classList.remove('d-none');

        // Clear file input and URL input
        elements.fileInput.value = '';
        elements.urlInput.value = '';

        // Hide any messages
        hideLoading();
        hideError();
    }

    /**
     * Show loading indicator
     * @param {string} text - Loading text to display
     */
    function showLoading(text) {
        text = text || i18n.t('loading.processing');
        elements.loadingIndicator.classList.remove('d-none');
        elements.loadingText.textContent = text;
        // Add loading state to input areas
        elements.dropZone.classList.add('loading-state');
        document.querySelector('.url-section')?.classList.add('loading-state');
    }

    /**
     * Update loading text
     * @param {string} text - New loading text
     */
    function updateLoadingText(text) {
        elements.loadingText.textContent = text;
    }

    /**
     * Hide loading indicator
     */
    function hideLoading() {
        elements.loadingIndicator.classList.add('d-none');
        // Remove loading state from input areas
        elements.dropZone.classList.remove('loading-state');
        document.querySelector('.url-section')?.classList.remove('loading-state');
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        elements.errorMessage.textContent = message;
        elements.errorAlert.classList.remove('d-none');
    }

    /**
     * Hide error message
     */
    function hideError() {
        elements.errorAlert.classList.add('d-none');
    }

    /**
     * Set up language selector event listeners
     */
    function setupLanguageSelector() {
        // Handle language selection from dropdowns (using event delegation since items are generated dynamically)
        document.addEventListener('click', async (e) => {
            const langItem = e.target.closest('[data-lang]');
            if (langItem) {
                e.preventDefault();
                const lang = langItem.getAttribute('data-lang');
                if (lang) {
                    await i18n.setLanguage(lang);
                }
            }
        });
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // File input change
        elements.fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // Reset URL source since this is a local file
                state.contentFromUrl = null;
                processFile(file);
            }
        });

        // Drag and drop events
        elements.dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            event.stopPropagation();
            elements.dropZone.classList.add('drag-over');
        });

        elements.dropZone.addEventListener('dragleave', (event) => {
            event.preventDefault();
            event.stopPropagation();
            elements.dropZone.classList.remove('drag-over');
        });

        elements.dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            elements.dropZone.classList.remove('drag-over');

            const files = event.dataTransfer.files;
            if (files.length > 0) {
                // Reset URL source since this is a local file
                state.contentFromUrl = null;
                processFile(files[0]);
            }
        });

        // Drop zone keyboard activation (Enter/Space)
        elements.dropZone.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                elements.fileInput.click();
            }
        });

        // Prevent default drag behavior on document
        document.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        document.addEventListener('drop', (event) => {
            event.preventDefault();
        });

        // Load new file button
        elements.btnLoadNew.addEventListener('click', () => {
            resetApplication();
        });

        // URL input - load button click
        elements.btnLoadUrl.addEventListener('click', () => {
            downloadFromUrl(elements.urlInput.value);
        });

        // URL input - Enter key
        elements.urlInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                downloadFromUrl(elements.urlInput.value);
            }
        });

        // Download button - download original file
        elements.btnDownload.addEventListener('click', () => {
            downloadOriginalFile();
        });

        // Share button - open modal
        elements.btnShare.addEventListener('click', () => {
            openShareModal();
        });

        // Copy share URL button
        elements.btnCopyShareUrl.addEventListener('click', () => {
            copyShareUrl();
        });

        // New window button - open content in new window
        elements.btnNewWindow.addEventListener('click', () => {
            openInNewWindow();
        });

        // Initialize tooltips for navbar buttons
        if (elements.btnDownload) {
            new bootstrap.Tooltip(elements.btnDownload);
        }
        if (elements.btnShare) {
            new bootstrap.Tooltip(elements.btnShare);
        }
        if (elements.btnNewWindow) {
            new bootstrap.Tooltip(elements.btnNewWindow);
        }
        if (elements.btnLoadNew) {
            new bootstrap.Tooltip(elements.btnLoadNew);
        }

        // Setup language selector
        setupLanguageSelector();

        // Setup iframe history tracking for browser back/forward navigation
        setupIframeHistoryTracking();

        // Setup offline/online status indicator
        setupOfflineIndicator();
    }

    /**
     * Setup offline/online status indicator
     */
    function setupOfflineIndicator() {
        const indicator = document.getElementById('offlineIndicator');
        if (!indicator) return;

        function updateStatus() {
            indicator.classList.toggle('d-none', navigator.onLine);
        }

        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);

        // Check initial status
        updateStatus();
    }

    /**
     * Check if the app is running as an installed PWA
     * @returns {boolean} True if running as installed app
     */
    function isInstalledPWA() {
        // Check for standalone display mode (installed PWA)
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.matchMedia('(display-mode: fullscreen)').matches ||
               window.navigator.standalone === true; // iOS Safari
    }

    /**
     * Generate the share URL for the current content
     * @param {boolean} allowDownload - Whether to include the download parameter
     * @returns {string} The share URL
     */
    function generateShareUrl(allowDownload = false) {
        const baseUrl = window.location.origin + window.location.pathname;
        const resourceUrl = state.contentFromUrl;
        let url = `${baseUrl}?url=${encodeURIComponent(resourceUrl)}`;
        if (allowDownload) {
            url += '&download=1';
        }
        return url;
    }

    /**
     * Show or hide the share button based on conditions
     */
    function updateShareButtonVisibility() {
        // Show only if: content loaded from URL AND not installed PWA
        const shouldShow = state.contentFromUrl && !isInstalledPWA();

        if (shouldShow) {
            elements.btnShare.classList.remove('d-none');
        } else {
            elements.btnShare.classList.add('d-none');
        }
    }

    /**
     * Show or hide the download button based on conditions
     */
    function updateDownloadButtonVisibility() {
        // Check if download is enabled via URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const downloadEnabled = urlParams.get('download') === '1';

        // Show only if: download enabled via URL AND content loaded from URL AND not installed PWA
        const shouldShow = downloadEnabled && state.contentFromUrl && !isInstalledPWA();

        if (shouldShow) {
            elements.btnDownload.classList.remove('d-none');
        } else {
            elements.btnDownload.classList.add('d-none');
        }
    }

    /**
     * Download the original file from the source URL
     */
    function downloadOriginalFile() {
        if (!state.contentFromUrl) {
            return;
        }

        // Get the direct download URL
        const downloadUrl = convertToDirectDownloadUrl(state.contentFromUrl);

        // Create a temporary link and click it to trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Try to extract filename for the download attribute
        const filename = extractFilename(state.contentFromUrl);
        if (filename) {
            link.download = filename;
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Open the share modal with the generated URL
     */
    function openShareModal() {
        // Initialize checkbox state based on config
        elements.allowDownloadCheck.checked = config.allowDownloadByDefault;

        // Generate URL with current checkbox state
        const shareUrl = generateShareUrl(elements.allowDownloadCheck.checked);
        elements.shareUrlInput.value = shareUrl;

        // Hide feedback messages
        elements.copySuccess.classList.add('d-none');
        elements.linkUpdated.classList.add('d-none');

        // Remove any previous event listener to avoid duplicates
        const newCheckbox = elements.allowDownloadCheck.cloneNode(true);
        elements.allowDownloadCheck.parentNode.replaceChild(newCheckbox, elements.allowDownloadCheck);
        elements.allowDownloadCheck = newCheckbox;

        // Add event listener for checkbox changes
        elements.allowDownloadCheck.addEventListener('change', function() {
            const newUrl = generateShareUrl(this.checked);
            elements.shareUrlInput.value = newUrl;

            // Show "Link updated" feedback
            elements.copySuccess.classList.add('d-none');
            elements.linkUpdated.classList.remove('d-none');

            // Hide feedback after 2 seconds
            setTimeout(() => {
                elements.linkUpdated.classList.add('d-none');
            }, 2000);
        });

        const modal = new bootstrap.Modal(elements.shareModal);
        modal.show();
    }

    /**
     * Copy the share URL to clipboard
     */
    async function copyShareUrl() {
        try {
            await navigator.clipboard.writeText(elements.shareUrlInput.value);
            elements.copySuccess.classList.remove('d-none');

            // Hide success message after 3 seconds
            setTimeout(() => {
                elements.copySuccess.classList.add('d-none');
            }, 3000);
        } catch (err) {
            console.error('[App] Failed to copy URL:', err);
            // Fallback: select the text for manual copy
            elements.shareUrlInput.select();
        }
    }

    /**
     * Open the content in a new window/tab
     */
    function openInNewWindow() {
        const contentUrl = elements.contentFrame.src;
        if (contentUrl && contentUrl !== 'about:blank') {
            window.open(contentUrl, '_blank');
        }
    }

    /**
     * Get the relative path from the iframe URL (relative to /viewer/)
     * @param {string} url - The full iframe URL
     * @returns {string} The relative path within the viewer
     */
    function getIframeRelativePath(url) {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const viewerIndex = pathname.indexOf('/viewer/');
            if (viewerIndex !== -1) {
                return pathname.substring(viewerIndex + 8) || 'index.html';
            }
            return 'index.html';
        } catch (e) {
            return 'index.html';
        }
    }

    /**
     * Handle navigation within the iframe and update browser history
     */
    function handleIframeNavigation() {
        // If we're in the middle of a history navigation, decrement counter and skip
        if (state.historyNavigationCount > 0) {
            state.historyNavigationCount--;
            console.log('[App] Skipping history update (history navigation pending:', state.historyNavigationCount, ')');
            return;
        }

        try {
            const iframeSrc = elements.contentFrame.contentWindow?.location.href;
            if (!iframeSrc || iframeSrc === 'about:blank') {
                return;
            }

            const relativePath = getIframeRelativePath(iframeSrc);
            const currentState = history.state;

            // Update history state to track current iframe path
            // Use replaceState because the iframe navigation already added a history entry
            if (!currentState || !currentState.isViewer || currentState.iframePath !== relativePath) {
                const newState = {
                    iframePath: relativePath,
                    isViewer: true
                };
                history.replaceState(newState, '', window.location.pathname + window.location.search);
                console.log('[App] History state replaced:', relativePath);
            }
        } catch (e) {
            // Cross-origin or other access errors - ignore silently
            console.warn('[App] Could not access iframe location:', e.message);
        }
    }

    /**
     * Handle browser back/forward navigation
     */
    function handlePopState(event) {
        const historyState = event.state;

        // If we have a viewer state with an iframe path, navigate the iframe
        if (historyState && historyState.isViewer && historyState.iframePath) {
            // Make sure viewer is visible
            if (elements.viewerContainer.classList.contains('d-none')) {
                elements.welcomeScreen.classList.add('d-none');
                elements.viewerContainer.classList.remove('d-none');
                elements.topNavbar.classList.remove('d-none');
                elements.btnNewWindow.classList.remove('d-none');
                updateShareButtonVisibility();
                updateDownloadButtonVisibility();
            }
            // Increment counter to ignore the upcoming iframe load event
            state.historyNavigationCount++;
            const basePath = getBasePath();
            const targetUrl = basePath + 'viewer/' + historyState.iframePath;
            console.log('[App] Navigating iframe to:', targetUrl);
            elements.contentFrame.src = targetUrl;
        } else if (historyState && historyState.isWelcome) {
            // Going back to welcome screen
            console.log('[App] Returning to welcome screen');
            showWelcomeScreen();
        } else if (!historyState && !elements.viewerContainer.classList.contains('d-none')) {
            // No state but viewer is visible - going back before the app started
            console.log('[App] No history state, returning to welcome screen');
            showWelcomeScreen();
        }
    }

    /**
     * Show welcome screen (used when navigating back in history)
     */
    function showWelcomeScreen() {
        elements.viewerContainer.classList.add('d-none');
        elements.topNavbar.classList.add('d-none');
        elements.btnDownload.classList.add('d-none');
        elements.btnShare.classList.add('d-none');
        elements.btnNewWindow.classList.add('d-none');
        elements.welcomeScreen.classList.remove('d-none');
        // Don't change iframe.src here - it would invalidate forward history
    }

    /**
     * Set up iframe navigation tracking
     */
    function setupIframeHistoryTracking() {
        // Listen for iframe load events to track navigation
        elements.contentFrame.addEventListener('load', () => {
            // Small delay to ensure the iframe URL is updated
            setTimeout(handleIframeNavigation, 50);
        });

        // Listen for browser back/forward buttons
        window.addEventListener('popstate', handlePopState);
    }

    /**
     * Initialize the application
     */
    async function init() {
        console.log('[App] Initializing eXeViewer...');
        console.log('[App] Base path:', getBasePath());
        console.log('[App] Secure context:', isSecureContext());

        // Initialize DOM elements
        initElements();

        // Initialize i18n with available languages from config
        await i18n.init(config.availableLanguages);

        // Update footer with dynamic links (after i18n is ready)
        updateFooter();

        // Listen for language changes to update footer
        window.addEventListener('languagechange', updateFooter);

        // Set up event listeners
        setupEventListeners();

        // Check for secure context
        if (!isSecureContext()) {
            console.warn('[App] Not in a secure context. Service Workers may not work.');
            showError(i18n.t('errors.secureContextRequired'));
            return;
        }

        // Register Service Worker in background
        try {
            await registerServiceWorker();
            console.log('[App] Application ready');
        } catch (error) {
            console.warn('[App] Service Worker registration deferred:', error.message);
            // Will try again when a file is selected
        }

        // Check for URL parameter and auto-load if present
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('url')) {
            await checkUrlParameter();
        } else if (config.autoRestoreContent) {
            // Check for saved content in IndexedDB
            await checkSavedContent();
        }
    }

    /**
     * Check if there's saved content in the Service Worker and display it
     */
    async function checkSavedContent() {
        if (!state.serviceWorkerReady || !navigator.serviceWorker.controller) {
            return;
        }

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();

            messageChannel.port1.onmessage = (event) => {
                const { type, ready, fileCount } = event.data || {};

                if (type === 'STATUS' && ready && fileCount > 0) {
                    console.log(`[App] Restored content found: ${fileCount} files`);
                    state.currentPackageName = i18n.t('navbar.restoredContent');
                    showViewer();
                }
                resolve();
            };

            navigator.serviceWorker.controller.postMessage(
                { type: 'GET_STATUS' },
                [messageChannel.port2]
            );

            // Timeout after 1 second
            setTimeout(resolve, 1000);
        });
    }

    /**
     * Check for URL parameter and auto-load content if present
     * Supports: ?url=... query parameter
     */
    async function checkUrlParameter() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToLoad = urlParams.get('url');

        if (urlToLoad) {
            console.log('[App] URL parameter detected:', urlToLoad);
            // Set the URL in the input field
            elements.urlInput.value = urlToLoad;
            // Trigger the download and wait for completion
            await downloadFromUrl(urlToLoad);
        }
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
