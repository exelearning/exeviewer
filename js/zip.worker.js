/**
 * eXeViewer - ZIP Extraction Web Worker
 * Handles ZIP file extraction in a background thread using fflate
 */

// Import fflate library
importScripts('../vendor/fflate/fflate.min.js');

/**
 * Find common prefix in file paths (for ZIPs with a root folder)
 * @param {string[]} fileList - List of file paths
 * @returns {string} Common prefix or empty string
 */
function findCommonPrefix(fileList) {
    const htmlFiles = fileList.filter(f => f.endsWith('.html') || f.endsWith('.htm'));
    if (htmlFiles.length === 0) return '';

    const indexFile = htmlFiles.find(f => f === 'index.html' || f.endsWith('/index.html'));
    if (indexFile && indexFile.includes('/')) {
        const parts = indexFile.split('/');
        if (parts.length === 2) {
            return parts[0] + '/';
        }
    }
    return '';
}

/**
 * Handle messages from the main thread
 */
self.onmessage = async function(e) {
    const { file } = e.data;

    try {
        // Notify start of reading
        self.postMessage({ type: 'progress', message: 'reading' });

        // Read file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Use fflate to unzip
        fflate.unzip(uint8Array, (err, unzipped) => {
            if (err) {
                console.error('[Worker] fflate error:', err);
                self.postMessage({ type: 'error', message: err.message });
                return;
            }

            const fileList = Object.keys(unzipped);
            console.log(`[Worker] ZIP contains ${fileList.length} entries`);

            // Find common prefix (if files are in a subdirectory)
            const commonPrefix = findCommonPrefix(fileList);
            console.log(`[Worker] Common prefix: "${commonPrefix}"`);

            const files = {};
            const transferables = [];

            for (const path of fileList) {
                const content = unzipped[path];

                // Skip empty entries (directories in fflate have zero-length arrays)
                if (content.length === 0) {
                    continue;
                }

                // Get the normalized path (remove common prefix if exists)
                let normalizedPath = path;
                if (commonPrefix && path.startsWith(commonPrefix)) {
                    normalizedPath = path.substring(commonPrefix.length);
                }

                // Skip empty paths
                if (!normalizedPath) {
                    continue;
                }

                // Convert Uint8Array to ArrayBuffer for transfer
                const buffer = content.buffer.slice(
                    content.byteOffset,
                    content.byteOffset + content.byteLength
                );
                files[normalizedPath] = buffer;
                transferables.push(buffer);
            }

            const fileCount = Object.keys(files).length;
            console.log(`[Worker] Extracted ${fileCount} files`);

            // Transfer ArrayBuffers to main thread (zero-copy transfer)
            self.postMessage(
                { type: 'complete', files, fileCount },
                transferables
            );
        });

    } catch (error) {
        console.error('[Worker] Error:', error);
        self.postMessage({ type: 'error', message: error.message });
    }
};
