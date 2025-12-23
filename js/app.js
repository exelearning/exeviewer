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
        currentPackageName: null,
        contentFromUrl: null  // Stores the source URL when content is loaded from URL
    };

    // DOM Elements
    const elements = {
        topNavbar: null,
        packageName: null,
        btnLoadNew: null,
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
        copySuccess: null
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

        // Update share button visibility
        updateShareButtonVisibility();

        // Show open in new window button
        elements.btnNewWindow.classList.remove('d-none');

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
        if (elements.btnShare) {
            new bootstrap.Tooltip(elements.btnShare);
        }
        if (elements.btnNewWindow) {
            new bootstrap.Tooltip(elements.btnNewWindow);
        }

        // Setup language selector
        setupLanguageSelector();
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
     * @returns {string} The share URL
     */
    function generateShareUrl() {
        const baseUrl = window.location.origin + window.location.pathname;
        const resourceUrl = state.contentFromUrl;
        return `${baseUrl}?url=${encodeURIComponent(resourceUrl)}`;
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
     * Open the share modal with the generated URL
     */
    function openShareModal() {
        const shareUrl = generateShareUrl();
        elements.shareUrlInput.value = shareUrl;
        elements.copySuccess.classList.add('d-none');

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

        // Check for URL parameter and auto-load if present
        await checkUrlParameter();
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
