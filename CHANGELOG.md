# CHANGELOG

## v4.0.0-rc1 – 2026-04-14

- Version jump to 4.0.0 to align numbering with eXeLearning for consistency across related projects.
- Add Docker image (published to GitHub Container Registry) for optional containerized deployment.
- Add a deployment configuration file to override default settings defined in `app.js`.
- Request persistent storage to prevent the browser from evicting IndexedDB content.
- Improve Web Worker lifecycle management by properly terminating the worker, clearing its reference and standardizing error reporting.
- Align license declaration for consistency across the project.
- Improve error handling and user feedback for storage-related failures, including insufficient storage space conditions.

---

## v1.0.3 – 2026-04-09

- Fix SW content loss after browser-induced termination.

---

## v1.0.2 – 2026-02-02

- Support loading content from Dropbox.
- Usability improvements: add contextual help and improve the top bar layout.
- Ask for confirmation before closing the current content.

---

## v1.0.1 – 2026-01-27

- Support loading content from Google Drive shared links (requires Google Apps Script proxy configuration).

---

## v1.0.0 – 2026-01-08

- First official release of eXeViewer.
- Client-side web application to view eXeLearning content packages (.zip/.elpx) directly in the browser.
- All processing happens locally: no files are uploaded to any server.
- Load content from local files (drag and drop or file browser) or from URLs.
- Support for Nextcloud and ownCloud shared links.
- Generate shareable links for content loaded from URLs.
- Installable as a Progressive Web App (PWA) for offline use.
- Multi-language support (English and Spanish).
- Dark mode (follows system preference).
- Responsive interface.
