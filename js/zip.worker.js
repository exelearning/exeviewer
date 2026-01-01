/**
 * eXeViewer - ZIP Extraction Web Worker
 * Handles ZIP file extraction in a background thread to avoid blocking the UI
 */

// Import JSZip library
importScripts('../vendor/jszip/jszip.min.js');

/**
 * Handle messages from the main thread
 */
self.onmessage = async function(e) {
    const { file } = e.data;

    try {
        // Notify start of reading
        self.postMessage({ type: 'progress', message: 'reading' });

        const zip = await JSZip.loadAsync(file);
        const files = {};
        const fileList = Object.keys(zip.files);

        console.log(`[Worker] ZIP contains ${fileList.length} entries`);

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

        console.log(`[Worker] Common prefix: "${commonPrefix}"`);

        let processed = 0;
        const total = fileList.length;
        const transferables = [];

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

            // Read file as ArrayBuffer (more efficient than base64)
            try {
                const content = await zipEntry.async('arraybuffer');
                files[normalizedPath] = content;
                transferables.push(content);
            } catch (error) {
                console.warn(`[Worker] Error reading ${relativePath}:`, error);
            }

            processed++;
            if (processed % 50 === 0) {
                self.postMessage({
                    type: 'progress',
                    message: 'extracting',
                    processed,
                    total
                });
            }
        }

        const fileCount = Object.keys(files).length;
        console.log(`[Worker] Extracted ${fileCount} files`);

        // Transfer ArrayBuffers to main thread (zero-copy transfer)
        self.postMessage(
            { type: 'complete', files, fileCount },
            transferables
        );

    } catch (error) {
        console.error('[Worker] Error:', error);
        self.postMessage({ type: 'error', message: error.message });
    }
};
