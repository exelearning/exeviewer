/**
 * eXeViewer - Main Application
 * Handles file loading, ZIP extraction, and content display
 */

(function() {
    'use strict';

    // Application state
    const state = {
        serviceWorkerReady: false,
        serviceWorkerRegistration: null,
        currentPackageName: null
    };

    // DOM Elements
    const elements = {
        topNavbar: null,
        packageName: null,
        btnLoadNew: null,
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
        errorMessage: null
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
     * Initialize DOM element references
     */
    function initElements() {
        elements.topNavbar = document.getElementById('topNavbar');
        elements.packageName = document.getElementById('packageName');
        elements.btnLoadNew = document.getElementById('btnLoadNew');
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
     */
    async function sendContentToServiceWorker(files) {
        // Ensure we have a controller
        if (!navigator.serviceWorker.controller) {
            console.log('[App] No controller, waiting...');
            await waitForController();
        }

        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.warn('[App] Content send timeout, continuing anyway');
                resolve();
            }, 10000);

            const messageHandler = (event) => {
                if (event.data && event.data.type === 'CONTENT_READY') {
                    clearTimeout(timeout);
                    navigator.serviceWorker.removeEventListener('message', messageHandler);
                    console.log('[App] Content ready, files:', event.data.fileCount);
                    resolve(event.data);
                }
            };

            navigator.serviceWorker.addEventListener('message', messageHandler);

            // Send content to Service Worker
            console.log('[App] Sending content to Service Worker...');
            navigator.serviceWorker.controller.postMessage({
                type: 'SET_CONTENT',
                data: { files }
            });
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
     * Extract ZIP file contents
     * @param {File} file - The ZIP file to extract
     * @returns {Object} Map of file paths to base64-encoded contents
     */
    async function extractZipContents(file) {
        updateLoadingText(i18n.t('loading.readingZip'));

        const zip = await JSZip.loadAsync(file);
        const files = {};
        const fileList = Object.keys(zip.files);

        console.log(`[App] ZIP contains ${fileList.length} entries`);

        // Find common prefix (if files are in a subdirectory)
        let commonPrefix = '';
        const htmlFiles = fileList.filter(f => f.endsWith('.html') || f.endsWith('.htm'));

        if (htmlFiles.length > 0) {
            // Check if there's an index.html at root or in a subfolder
            const indexFile = htmlFiles.find(f =>
                f === 'index.html' ||
                f.endsWith('/index.html')
            );

            if (indexFile && indexFile.includes('/')) {
                // Get the prefix (folder containing index.html)
                const parts = indexFile.split('/');
                if (parts.length === 2) {
                    commonPrefix = parts[0] + '/';
                }
            }
        }

        console.log(`[App] Common prefix: "${commonPrefix}"`);

        let processed = 0;
        const total = fileList.length;

        for (const relativePath of fileList) {
            const zipEntry = zip.files[relativePath];

            // Skip directories
            if (zipEntry.dir) {
                processed++;
                continue;
            }

            // Get the normalized path (remove common prefix if exists)
            let normalizedPath = relativePath;
            if (commonPrefix && relativePath.startsWith(commonPrefix)) {
                normalizedPath = relativePath.substring(commonPrefix.length);
            }

            // Skip empty paths
            if (!normalizedPath) {
                processed++;
                continue;
            }

            // Read file as base64
            try {
                const content = await zipEntry.async('base64');
                files[normalizedPath] = content;
            } catch (error) {
                console.warn(`[App] Error reading ${relativePath}:`, error);
            }

            processed++;
            if (processed % 50 === 0) {
                updateLoadingText(i18n.t('loading.extractingFiles', { processed, total }));
            }
        }

        console.log(`[App] Extracted ${Object.keys(files).length} files`);
        return files;
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
     * CORS proxy URL - used as fallback when direct fetch fails
     */
    const CORS_PROXY = 'https://corsproxy.io/?';

    /**
     * Fetch with CORS proxy fallback
     * @param {string} url - The URL to fetch
     * @param {boolean} useProxy - Whether to use the CORS proxy
     * @returns {Promise<Response>} The fetch response
     */
    async function fetchWithCorsProxy(url, useProxy = false) {
        const fetchUrl = useProxy ? CORS_PROXY + encodeURIComponent(url) : url;

        const response = await fetch(fetchUrl, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit'
        });

        return response;
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

            // Get blob data
            const blob = await response.blob();

            if (blob.size === 0) {
                throw new Error(i18n.t('errors.emptyZip'));
            }

            // Create a File object from the blob
            const file = new File([blob], filename, {
                type: 'application/zip'
            });

            console.log(`[App] Downloaded ${filename} (${blob.size} bytes)${usedProxy ? ' via proxy' : ''}`);

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
            await sendContentToServiceWorker(files);

            // Store package name
            state.currentPackageName = file.name;

            // Small delay to ensure SW is ready to serve
            await new Promise(resolve => setTimeout(resolve, 200));

            // Show the viewer
            showViewer();

        } catch (error) {
            console.error('[App] Error processing file:', error);
            showError(error.message || i18n.t('errors.processingFailed'));
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

        // Clear iframe
        elements.contentFrame.src = 'about:blank';

        // Reset UI
        elements.viewerContainer.classList.add('d-none');
        elements.topNavbar.classList.add('d-none');
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
     * Update language selector button text
     */
    function updateLanguageSelectorButtons() {
        const currentLang = i18n.getCurrentLanguage();
        const langName = i18n.t(`language.${currentLang}`);

        // Update navbar language button
        const navbarBtn = document.getElementById('languageDropdownBtn');
        if (navbarBtn) {
            navbarBtn.innerHTML = `<i class="bi bi-globe me-1"></i>${langName}`;
        }

        // Update welcome screen language button
        const welcomeBtn = document.getElementById('welcomeLanguageBtn');
        if (welcomeBtn) {
            welcomeBtn.innerHTML = `<i class="bi bi-globe me-1"></i>${langName}`;
        }

        // Update active state on dropdown items
        document.querySelectorAll('[data-lang]').forEach(item => {
            if (item.getAttribute('data-lang') === currentLang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Set up language selector event listeners
     */
    function setupLanguageSelector() {
        // Handle language selection from dropdowns
        document.querySelectorAll('[data-lang]').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                if (lang) {
                    await i18n.setLanguage(lang);
                    updateLanguageSelectorButtons();
                }
            });
        });

        // Listen for language change events
        window.addEventListener('languagechange', () => {
            updateLanguageSelectorButtons();
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
                processFile(files[0]);
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

        // Setup language selector
        setupLanguageSelector();
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

        // Initialize i18n
        await i18n.init();
        updateLanguageSelectorButtons();

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
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
