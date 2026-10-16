/**
 * eXeViewer - Deployment Configuration
 *
 * Override any of these values to customize this deployment.
 * Only the values you set here will take effect; the rest use the defaults defined in app.js.
 *
 * Examples:
 *
 *   window.exeViewerConfig = {
 *       gasProxyUrl: 'https://script.google.com/macros/s/XXXX/exec',
 *       validateExeContent: false
 *   };
 */

window.exeViewerConfig = {
    // Google Apps Script proxy URL for Google Drive downloads.
    // Set this to your deployed GAS web app URL to enable Google Drive support.
    // Leave empty or omit to disable (shows an informative message for Drive URLs).
    // gasProxyUrl: 'https://script.google.com/macros/s/XXXX/exec'

    // Offer the eXeLearning teacher-layer selector by default, even when no
    // ?exe-teacher URL parameter is present. Defaults to false (student view).
    // teacherMode: true

    // Embed mode: show only the package given by ?url=, with no eXeViewer
    // interface, in an <iframe> or a full window. Defaults to false.
    // embedMode: true

    // Language of the embed mode messages (loading, errors), e.g. 'es'. A ?lang=
    // URL parameter takes precedence. Leave empty to detect it automatically.
    // Only applies in embed mode.
    // embedLanguage: 'es'
};
