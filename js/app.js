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
                reject(new Error('Timeout waiting for Service Worker controller'));
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
            throw new Error('Service Workers are not supported in this browser');
        }

        if (!isSecureContext()) {
            throw new Error('Service Workers require a secure context (HTTPS or localhost)');
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
        updateLoadingText('Reading ZIP file...');

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
                updateLoadingText(`Extracting files... (${processed}/${total})`);
            }
        }

        console.log(`[App] Extracted ${Object.keys(files).length} files`);
        return files;
    }

    /**
     * Process the selected file
     * @param {File} file - The file to process
     */
    async function processFile(file) {
        // Validate file type
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.zip') && !fileName.endsWith('.elpx')) {
            showError('Please select a valid .zip or .elpx file');
            return;
        }

        try {
            hideError();
            showLoading('Initializing...');

            // Ensure Service Worker is ready
            if (!state.serviceWorkerReady) {
                updateLoadingText('Registering Service Worker...');
                await registerServiceWorker();
            }

            // Clear any previous content
            await clearServiceWorkerContent();

            // Extract ZIP contents
            const files = await extractZipContents(file);

            if (Object.keys(files).length === 0) {
                throw new Error('The ZIP file appears to be empty');
            }

            // Check if index.html exists
            if (!files['index.html']) {
                console.warn('[App] No index.html found. Available files:', Object.keys(files).slice(0, 10));

                // Try to find any HTML file
                const htmlFile = Object.keys(files).find(f =>
                    f.endsWith('.html') || f.endsWith('.htm')
                );

                if (!htmlFile) {
                    throw new Error('No HTML files found in the package');
                }

                console.log(`[App] Using ${htmlFile} as entry point`);
            }

            updateLoadingText('Loading content...');

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
            showError(error.message || 'Failed to process the file');
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

        // Clear file input
        elements.fileInput.value = '';

        // Hide any messages
        hideLoading();
        hideError();
    }

    /**
     * Show loading indicator
     * @param {string} text - Loading text to display
     */
    function showLoading(text = 'Processing...') {
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

        // Set up event listeners
        setupEventListeners();

        // Check for secure context
        if (!isSecureContext()) {
            console.warn('[App] Not in a secure context. Service Workers may not work.');
            showError('This application requires a secure context (HTTPS or localhost). Please access via http://localhost/...');
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
