/**
 * eXeViewer - Internationalization Module
 * Handles language loading and text translations
 */

const i18n = (function() {
    'use strict';

    const STORAGE_KEY = 'exeviewer-language';
    const DEFAULT_LANGUAGE = 'en';
    const AVAILABLE_LANGUAGES = ['en', 'es'];

    let currentLanguage = DEFAULT_LANGUAGE;
    let translations = {};
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
        if (stored && AVAILABLE_LANGUAGES.includes(stored)) {
            return stored;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0].toLowerCase();

        if (AVAILABLE_LANGUAGES.includes(shortLang)) {
            return shortLang;
        }

        return DEFAULT_LANGUAGE;
    }

    /**
     * Load language file
     * @param {string} lang - Language code (e.g., 'en', 'es')
     */
    async function loadLanguage(lang) {
        if (!AVAILABLE_LANGUAGES.includes(lang)) {
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

        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = t(key);
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
            const langName = t(`language.${currentLanguage}`);
            dropdownBtn.innerHTML = `<i class="bi bi-globe me-1"></i>${langName}`;
        }
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

        // Dispatch custom event for components that need to react
        window.dispatchEvent(new CustomEvent('languagechange', {
            detail: { language: currentLanguage }
        }));
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
        return [...AVAILABLE_LANGUAGES];
    }

    /**
     * Check if translations are loaded
     */
    function isReady() {
        return isLoaded;
    }

    /**
     * Initialize the i18n system
     */
    async function init() {
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
