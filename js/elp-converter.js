/**
 * ELP Converter - Convierte archivos .elp legacy a HTML5 para el visor
 * Utiliza los bundles de eXeLearning 4: importers.bundle.js y exporters.bundle.js
 */
const ElpConverter = (function() {
    'use strict';

    // Base path for export resources
    const EXPORT_RESOURCES_BASE = 'vendor/exelearning/export-resources';

    /**
     * Verifica si el soporte para .elp está disponible
     */
    function isSupported() {
        return typeof window.Y !== 'undefined' &&
               typeof window.ElpxImporterCore !== 'undefined' &&
               typeof window.SharedExporters !== 'undefined';
    }

    /**
     * Get MIME type from filename
     */
    function getMimeType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const mimeTypes = {
            'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png',
            'gif': 'image/gif', 'svg': 'image/svg+xml', 'webp': 'image/webp',
            'mp3': 'audio/mpeg', 'wav': 'audio/wav', 'ogg': 'audio/ogg',
            'mp4': 'video/mp4', 'webm': 'video/webm',
            'pdf': 'application/pdf', 'swf': 'application/x-shockwave-flash'
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }

    /**
     * Crea un AssetHandler simple para almacenar assets del .elp
     */
    function createAssetHandler() {
        const assets = new Map();

        return {
            assets,

            async extractAssetsFromZip(zip) {
                const assetMap = new Map();
                const resourcePattern = /\.(jpg|jpeg|png|gif|svg|mp3|mp4|ogg|webm|pdf|webp|wav|swf)$/i;

                for (const [path, content] of Object.entries(zip)) {
                    if (path.startsWith('resources/') || resourcePattern.test(path)) {
                        const id = 'asset-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
                        const filename = path.split('/').pop();
                        const mime = getMimeType(filename);
                        // Create blob from Uint8Array
                        const blob = new Blob([content], { type: mime });

                        assets.set(id, {
                            id,
                            filename,
                            blob,
                            mime,
                            originalPath: path,
                            data: content  // Keep original data too
                        });
                        assetMap.set(path, id);
                    }
                }
                console.log(`[AssetHandler] Extracted ${assets.size} assets from ZIP`);
                return assetMap;
            },

            convertContextPathToAssetRefs(html, assetMap) {
                return html.replace(/\{\{context_path\}\}\/?/g, 'content/');
            },

            async preloadAllAssets() {
                return assets.size;
            }
        };
    }

    /**
     * Crea un AssetProvider para el exporter
     * Must match the interface expected by BrowserAssetProvider
     */
    function createAssetProvider(assetsMap) {
        return {
            projectId: 'elp-preview',

            async getAllAssets() {
                const result = Array.from(assetsMap.values());
                console.log(`[AssetProvider] getAllAssets returning ${result.length} assets`);
                return result;
            },

            async getProjectAssets() {
                const result = Array.from(assetsMap.values());
                console.log(`[AssetProvider] getProjectAssets returning ${result.length} assets`);
                return result;
            },

            async getAsset(id) {
                return assetsMap.get(id) || null;
            },

            async hasAsset(path) {
                for (const asset of assetsMap.values()) {
                    if (asset.originalPath === path || asset.filename === path) {
                        return true;
                    }
                }
                return false;
            }
        };
    }

    /**
     * Fetch a file as a Blob
     */
    async function fetchAsBlob(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;
            return await response.blob();
        } catch (e) {
            console.warn('[ElpConverter] Failed to fetch:', url);
            return null;
        }
    }

    /**
     * Recursively fetch all files from a directory listing
     * Returns Map of relativePath -> Blob
     */
    async function fetchDirectoryFiles(basePath, subPath = '') {
        const files = new Map();
        const fullPath = subPath ? `${basePath}/${subPath}` : basePath;

        try {
            // Try to fetch directory listing (works with many servers)
            const response = await fetch(fullPath);
            if (!response.ok) return files;

            const html = await response.text();

            // Parse links from directory listing
            const linkRegex = /href="([^"]+)"/g;
            const entries = [];
            let match;

            while ((match = linkRegex.exec(html)) !== null) {
                const href = match[1];
                // Skip parent directory and absolute paths
                if (href === '../' || href.startsWith('/') || href.startsWith('http')) continue;
                entries.push(href);
            }

            // Process each entry
            for (const entry of entries) {
                const entryPath = subPath ? `${subPath}/${entry}` : entry;

                if (entry.endsWith('/')) {
                    // Directory - recurse
                    const subFiles = await fetchDirectoryFiles(basePath, entryPath.replace(/\/$/, ''));
                    for (const [path, blob] of subFiles) {
                        files.set(path, blob);
                    }
                } else {
                    // File - fetch it
                    const blob = await fetchAsBlob(`${basePath}/${entryPath}`);
                    if (blob) {
                        files.set(entryPath, blob);
                    }
                }
            }
        } catch (e) {
            console.warn('[ElpConverter] Error fetching directory:', fullPath, e);
        }

        return files;
    }

    /**
     * Crea un ResourceFetcher que carga recursos desde export-resources
     */
    function createResourceFetcher() {
        // Cache for loaded resources
        const cache = {
            theme: null,
            libs: null,
            idevices: new Map()
        };

        return {
            /**
             * Fetch theme files
             * @param {string} themeName - Theme name (e.g., 'base')
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchTheme(themeName) {
                if (cache.theme) return cache.theme;

                const files = new Map();
                const themeBase = `${EXPORT_RESOURCES_BASE}/theme`;

                // Fetch known theme files
                const themeFiles = [
                    { src: 'content.css', target: 'style.css' },  // Theme style
                    { src: 'default.js', target: 'default.js' },
                    { src: 'default_sprite.png', target: 'default_sprite.png' },
                    { src: 'default_licenses.gif', target: 'default_licenses.gif' }
                ];

                for (const { src, target } of themeFiles) {
                    const blob = await fetchAsBlob(`${themeBase}/${src}`);
                    if (blob) {
                        files.set(target, blob);
                    }
                }

                // Fetch icon files from icons directory
                const commonIcons = ['info.png', 'activity.png', 'alert.png', 'question.png'];
                for (const icon of commonIcons) {
                    const iconBlob = await fetchAsBlob(`${themeBase}/icons/${icon}`);
                    if (iconBlob) {
                        files.set(`icons/${icon}`, iconBlob);
                    }
                }

                cache.theme = files;
                return files;
            },

            /**
             * Fetch iDevice resources
             * @param {string} ideviceType - iDevice type
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchIdevice(ideviceType) {
                if (cache.idevices.has(ideviceType)) {
                    return cache.idevices.get(ideviceType);
                }

                const files = new Map();
                const ideviceBase = `${EXPORT_RESOURCES_BASE}/idevices/${ideviceType}`;

                // Try to fetch common iDevice files
                const ideviceFiles = [
                    `${ideviceType}.css`,
                    `${ideviceType}.js`,
                    `${ideviceType}.html`,
                    'style.css',
                    'script.js',
                    'export.css',
                    'export.js'
                ];

                for (const file of ideviceFiles) {
                    const blob = await fetchAsBlob(`${ideviceBase}/${file}`);
                    if (blob) {
                        files.set(file, blob);
                    }
                }

                // Also check for subdirectories like css/ and js/
                const subFiles = [
                    { src: `css/${ideviceType}.css`, target: `css/${ideviceType}.css` },
                    { src: `js/${ideviceType}.js`, target: `js/${ideviceType}.js` }
                ];

                for (const { src, target } of subFiles) {
                    const blob = await fetchAsBlob(`${ideviceBase}/${src}`);
                    if (blob) {
                        files.set(target, blob);
                    }
                }

                cache.idevices.set(ideviceType, files);
                return files;
            },

            /**
             * Fetch base libraries (bootstrap, jquery, etc.)
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchBaseLibraries() {
                if (cache.libs) return cache.libs;

                const files = new Map();
                const libsBase = `${EXPORT_RESOURCES_BASE}/libs`;

                // Known essential library files with source -> target path mapping
                const libraryFiles = [
                    { src: 'bootstrap/bootstrap.min.css', target: 'libs/bootstrap/css/bootstrap.min.css' },
                    { src: 'bootstrap/bootstrap.bundle.min.js', target: 'libs/bootstrap/js/bootstrap.bundle.min.js' },
                    { src: 'jquery/jquery.min.js', target: 'libs/jquery/jquery.min.js' },
                    { src: 'common.js', target: 'libs/common.js' },
                    { src: 'common_i18n.js', target: 'libs/common_i18n.js' },
                    { src: 'exe_export.js', target: 'libs/exe_export.js' }
                ];

                for (const { src, target } of libraryFiles) {
                    const blob = await fetchAsBlob(`${libsBase}/${src}`);
                    if (blob) {
                        files.set(target, blob);
                    }
                }

                // Fetch content CSS files
                const contentBase = `${EXPORT_RESOURCES_BASE}/content/css`;
                const contentBlob = await fetchAsBlob(`${contentBase}/base.css`);
                if (contentBlob) {
                    files.set('content/css/base.css', contentBlob);
                }

                // Theme content.css goes to content/css/content.css
                const themeContentCss = await fetchAsBlob(`${EXPORT_RESOURCES_BASE}/theme/content.css`);
                if (themeContentCss) {
                    files.set('content/css/content.css', themeContentCss);
                }

                cache.libs = files;
                return files;
            },

            /**
             * Fetch SCORM files (not needed for preview)
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchScormFiles() {
                return new Map();
            },

            /**
             * Fetch content CSS files (base.css, content.css, etc.)
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchContentCss() {
                const files = new Map();

                // Fetch base.css
                const baseCss = await fetchAsBlob(`${EXPORT_RESOURCES_BASE}/content/css/base.css`);
                if (baseCss) {
                    files.set('content/css/base.css', baseCss);
                }

                // Fetch content.css from theme
                const contentCss = await fetchAsBlob(`${EXPORT_RESOURCES_BASE}/theme/content.css`);
                if (contentCss) {
                    files.set('content/css/content.css', contentCss);
                }

                return files;
            },

            /**
             * Fetch specific library files by path
             * @param {string[]} filePaths - Array of file paths
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchLibraryFiles(filePaths) {
                const files = new Map();
                const libsBase = `${EXPORT_RESOURCES_BASE}/libs`;

                for (const filePath of filePaths) {
                    const blob = await fetchAsBlob(`${libsBase}/${filePath}`);
                    if (blob) {
                        files.set(filePath, blob);
                    }
                }

                return files;
            },

            /**
             * Fetch all files from a library directory
             * @param {string} libraryName - Library directory name
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchLibraryDirectory(libraryName) {
                const files = new Map();
                const libPath = `${EXPORT_RESOURCES_BASE}/libs/${libraryName}`;

                // Try to fetch common files in this library
                const commonFiles = [
                    `${libraryName}.js`,
                    `${libraryName}.min.js`,
                    `${libraryName}.css`,
                    `${libraryName}.min.css`,
                    'index.js',
                    'index.css'
                ];

                for (const file of commonFiles) {
                    const blob = await fetchAsBlob(`${libPath}/${file}`);
                    if (blob) {
                        files.set(file, blob);
                    }
                }

                return files;
            },

            /**
             * Fetch eXe logo (not needed for preview)
             * @returns {Promise<Blob|null>}
             */
            async fetchExeLogo() {
                return null;
            },

            /**
             * Fetch global font files (not needed for basic preview)
             * @param {string} fontId - Font identifier
             * @returns {Promise<Map<string, Blob>>}
             */
            async fetchGlobalFontFiles(fontId) {
                return new Map();
            }
        };
    }

    /**
     * Convierte un archivo .elp a archivos HTML5 para el Service Worker
     * @param {File} file - Archivo .elp a convertir
     * @param {Function} onProgress - Callback de progreso (opcional)
     * @returns {Promise<{success: boolean, files?: Record<string, ArrayBuffer>, error?: string}>}
     */
    async function convert(file, onProgress) {
        if (!isSupported()) {
            return {
                success: false,
                error: 'Legacy ELP support not available. Missing required libraries.'
            };
        }

        try {
            // Reportar progreso: iniciando
            if (onProgress) onProgress('importing', 0);

            // 1. Crear Y.Doc en memoria
            const ydoc = new window.Y.Doc();

            // 2. Crear asset handler
            const assetHandler = createAssetHandler();

            // 3. Importar .elp al documento Yjs
            const importer = new window.ElpxImporterCore(ydoc, assetHandler);
            const buffer = new Uint8Array(await file.arrayBuffer());

            await importer.importFromBuffer(buffer, {
                onProgress: (phase, percent) => {
                    if (onProgress) onProgress(phase, percent * 0.5); // 0-50%
                }
            });

            // Reportar progreso: generando HTML
            if (onProgress) onProgress('generating', 50);

            // 4. Crear document manager mock para el exporter
            const documentManager = {
                getDoc: () => ydoc,
                getMetadata: () => ydoc.getMap('metadata'),
                getNavigation: () => ydoc.getArray('navigation'),
                projectId: 'elp-preview'
            };

            // 5. Crear asset provider
            const assetProvider = createAssetProvider(assetHandler.assets);

            // 6. Crear resource fetcher para cargar recursos de export
            const resourceFetcher = createResourceFetcher();

            // 7. Generar HTML5 para Service Worker
            const result = await window.SharedExporters.generatePreviewForSW(
                documentManager,
                null,  // assetCache (legacy)
                resourceFetcher,  // resourceFetcher para cargar libs, theme, etc.
                assetProvider
            );

            if (onProgress) onProgress('complete', 100);

            if (!result.success) {
                return {
                    success: false,
                    error: result.error || 'Export failed'
                };
            }

            return {
                success: true,
                files: result.files
            };

        } catch (error) {
            console.error('[ElpConverter] Conversion failed:', error);
            return {
                success: false,
                error: error.message || 'Unknown conversion error'
            };
        }
    }

    // API pública
    return {
        isSupported,
        convert
    };
})();

// Exponer globalmente
window.ElpConverter = ElpConverter;
