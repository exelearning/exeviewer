# CHANGELOG

## v4.0.2 – 2026-07-07

- Add fullscreen mode (hides navbar and expands viewer to full viewport) and a new share-link option to hide the toolbar, ideal for student-facing links.
- Fix share/download buttons being hidden in macOS browser fullscreen mode.
- Offer the eXeLearning teacher-layer selector again after eXeLearning started hiding teacher-only content by default: eXeViewer now appends `?exe-teacher=1` to the embedded package. Controlled by an `?exe-teacher=1` page URL parameter and a `teacherMode` / `TEACHER_MODE` config default (off), with a "Teacher selector" checkbox in the share dialog.

---

## v4.0.1 – 2026-06-09

- Fix Dropbox, Nextcloud and ownCloud shared-link downloads by routing them through `github-proxy.exelearning.dev`.

---

## v4.0.0 – 2026-04-28

- Version jump to 4.0.0 to align numbering with eXeLearning for consistency across related projects.
- Add Docker image (published to GitHub Container Registry and Docker Hub) for optional containerized deployment
- Add a deployment configuration file to override default settings defined in `app.js`.
- Request persistent storage to prevent the browser from evicting IndexedDB content.
- Improve Web Worker lifecycle management by properly terminating the worker, clearing its reference and standardizing error reporting.
- Align license declaration for consistency across the project.
- Improve error handling and user feedback for storage-related failures, including insufficient storage space conditions.
- Add `github-proxy.exelearning.dev` as the primary proxy for GitHub and Google Drive downloads, with `gasProxyUrl` as an optional fallback for Google Drive

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
