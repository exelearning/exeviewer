/**
 * eXeViewer - Internationalization Module
 * Handles language loading and text translations
 */

const i18n = (function() {
    'use strict';

    const STORAGE_KEY = 'exeviewer-language';
    const DEFAULT_LANGUAGE = 'en';

    let availableLanguages = [DEFAULT_LANGUAGE];
    let currentLanguage = DEFAULT_LANGUAGE;
    let translations = {};
    let languageNames = {}; // Cache for language names (code -> native name)
    let isLoaded = false;

    /**
     * Get the base path for relative URLs
     */
    function getBasePath() {
        const path = window.location.pathname;
        return path.substring(0, path.lastIndexOf('/') + 1);
    }

    /**
     * Detect the user's preferred language
     */
    function detectLanguage() {
        // Check localStorage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && availableLanguages.includes(stored)) {
            return stored;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0].toLowerCase();

        if (availableLanguages.includes(shortLang)) {
            return shortLang;
        }

        return DEFAULT_LANGUAGE;
    }

    /**
     * Load language file
     * @param {string} lang - Language code (e.g., 'en', 'es')
     */
    async function loadLanguage(lang) {
        if (!availableLanguages.includes(lang)) {
            console.warn(`[i18n] Language '${lang}' not available, using default`);
            lang = DEFAULT_LANGUAGE;
        }

        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}lang/${lang}.json`);

            if (!response.ok) {
                throw new Error(`Failed to load language file: ${response.status}`);
            }

            translations = await response.json();
            currentLanguage = lang;
            isLoaded = true;

            // Save preference
            localStorage.setItem(STORAGE_KEY, lang);

            // Update HTML lang attribute
            document.documentElement.lang = lang;

            console.log(`[i18n] Language loaded: ${lang}`);
            return true;

        } catch (error) {
            console.error('[i18n] Error loading language:', error);

            // Fallback to default if not already trying default
            if (lang !== DEFAULT_LANGUAGE) {
                return loadLanguage(DEFAULT_LANGUAGE);
            }

            return false;
        }
    }

    /**
     * Get a nested value from an object using dot notation
     * @param {Object} obj - The object to search
     * @param {string} path - Dot-separated path (e.g., 'errors.invalidFile')
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Get translated text
     * @param {string} key - Translation key (e.g., 'errors.invalidFile')
     * @param {Object} params - Optional parameters for interpolation
     * @returns {string} Translated text or key if not found
     */
    function t(key, params = {}) {
        let text = getNestedValue(translations, key);

        if (text === null) {
            console.warn(`[i18n] Missing translation: ${key}`);
            return key;
        }

        // Interpolate parameters
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
        });

        return text;
    }

    /**
     * Update all elements with data-i18n attribute
     */
    function updateDOM() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);

            // Check if translation contains HTML
            if (translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = t(key);
        });

        // Update titles and Bootstrap tooltips
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const newTitle = t(key);
            element.title = newTitle;

            // Update Bootstrap tooltip instance if it exists
            const tooltipInstance = bootstrap.Tooltip.getInstance(element);
            if (tooltipInstance) {
                tooltipInstance.setContent({ '.tooltip-inner': newTitle });
            }
        });

        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            element.setAttribute('aria-label', t(key));
        });

        // Update the language selector
        updateLanguageSelector();
    }

    /**
     * Update the language selector UI
     */
    function updateLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = currentLanguage;
        }

        // Update dropdown button text if using dropdown
        const dropdownBtn = document.getElementById('languageDropdownBtn');
        if (dropdownBtn) {
            const langName = languageNames[currentLanguage] || currentLanguage;
            dropdownBtn.innerHTML = `<i class="bi bi-globe me-1"></i>${langName}`;
        }

        // Update welcome screen dropdown button
        const welcomeBtn = document.getElementById('welcomeLanguageBtn');
        if (welcomeBtn) {
            const langName = languageNames[currentLanguage] || currentLanguage;
            welcomeBtn.innerHTML = `<i class="bi bi-globe me-1"></i>${langName}`;
        }
    }

    /**
     * Generate language dropdown menus dynamically
     */
    function generateLanguageDropdowns() {
        const dropdownMenus = document.querySelectorAll('#languageDropdownBtn + .dropdown-menu, #welcomeLanguageBtn + .dropdown-menu');

        dropdownMenus.forEach(menu => {
            // Clear existing items
            menu.innerHTML = '';

            // Add an item for each available language
            availableLanguages.forEach(langCode => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.setAttribute('data-lang', langCode);
                a.textContent = languageNames[langCode] || langCode;

                if (langCode === currentLanguage) {
                    a.classList.add('active');
                }

                li.appendChild(a);
                menu.appendChild(li);
            });
        });
    }

    /**
     * Change the current language
     * @param {string} lang - Language code
     */
    async function setLanguage(lang) {
        if (lang === currentLanguage && isLoaded) {
            return;
        }

        await loadLanguage(lang);
        updateDOM();
        updateActiveLanguageInDropdowns();

        // Dispatch custom event for components that need to react
        window.dispatchEvent(new CustomEvent('languagechange', {
            detail: { language: currentLanguage }
        }));
    }

    /**
     * Update active state in language dropdown items
     */
    function updateActiveLanguageInDropdowns() {
        document.querySelectorAll('[data-lang]').forEach(item => {
            if (item.getAttribute('data-lang') === currentLanguage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Get current language
     */
    function getCurrentLanguage() {
        return currentLanguage;
    }

    /**
     * Get available languages
     */
    function getAvailableLanguages() {
        return [...availableLanguages];
    }

    /**
     * Load native names for all available languages (parallel loading)
     */
    async function loadLanguageNames() {
        const basePath = getBasePath();

        await Promise.all(availableLanguages.map(async (langCode) => {
            try {
                const response = await fetch(`${basePath}lang/${langCode}.json`);
                if (response.ok) {
                    const data = await response.json();
                    languageNames[langCode] = data.language?.name || langCode;
                }
            } catch (error) {
                console.warn(`[i18n] Could not load language name for '${langCode}'`);
                languageNames[langCode] = langCode;
            }
        }));
    }

    /**
     * Check if translations are loaded
     */
    function isReady() {
        return isLoaded;
    }

    /**
     * Initialize the i18n system
     * @param {string[]} languages - Array of available language codes
     */
    async function init(languages) {
        // Set available languages from config
        if (languages && Array.isArray(languages) && languages.length > 0) {
            availableLanguages = languages;
        }

        // Load native names for all available languages
        await loadLanguageNames();

        // Generate language dropdown menus
        generateLanguageDropdowns();

        // Load the detected/preferred language
        const lang = detectLanguage();
        await loadLanguage(lang);
        updateDOM();

        return currentLanguage;
    }

    // Public API
    return {
        init,
        t,
        setLanguage,
        getCurrentLanguage,
        getAvailableLanguages,
        updateDOM,
        isReady
    };

})();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
