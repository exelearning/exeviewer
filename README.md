# eXeViewer

[Versión en español](README_es.md)

View eXeLearning content packages directly in your browser.

## Overview

eXeViewer is a client-side web application that lets you view content exported from [eXeLearning](https://exelearning.net/) without needing your own web hosting.

The application runs entirely in your browser. When you load a file from your device, nothing is uploaded to any server. The content is extracted in memory and displayed using a Service Worker.

## Features

- Load `.zip` or `.elpx` files from your device (drag and drop or file browser)
- Load content from a URL (direct links to `.zip` or `.elpx` files)
- Support for shared links from Nextcloud, ownCloud and Google Drive
- Generate shareable links when viewing URL-loaded content
- In-memory extraction (no files written to disk)
- Full navigation support for HTML, CSS, JavaScript, images, and media
- Responsive interface
- Dark mode (follows system preference)
- Multi-language support
- Installable as a Progressive Web App (PWA) for offline use

## Use

### Loading content from your device

1. Open eXeViewer in your browser
2. Drag and drop a `.zip` or `.elpx` file onto the drop zone, or click "Browse Files" to select one
3. The content will be extracted and displayed

The file never leaves your device. All processing happens in your browser.

### Loading content from a URL

1. Paste a direct link to a `.zip` or `.elpx` file in the URL field
2. Click "Load"
3. The file will be downloaded and displayed

This works with:
- Direct links to files on any server
- Shared links from Nextcloud and ownCloud
- Shared links from Google Drive

### Sharing content

When you load content from a URL, a "Share" button appears in the top bar. Click it to get a direct link that anyone can use to view the content through eXeViewer.

**This solves a common problem**: many eXeLearning users create content but don’t have a place to publish it. With eXeViewer:

1. Upload your `.zip` or `.elpx` file to a cloud service (Nextcloud, ownCloud, Google Drive, or any file hosting)
2. Generate a share link from your cloud service
3. Paste the link in eXeViewer
4. Click the "Share" button to get a viewer URL
5. Share that URL with anyone

The link will work as long as the original file remains at the specified address.

## Installation

eXeViewer is a static HTML/CSS/JavaScript application. It runs entirely in the browser and does not require Node.js, Bun, or any server-side runtime in production.

### Deploying to a web server

Upload the following files and folders to any web server:

```
index.html
manifest.json
sw.js
css/
js/
lang/
img/
vendor/
```

The application will work on:
- Apache (XAMPP, shared hosting, etc.)
- Nginx
- GitHub Pages
- Netlify
- Vercel
- Any server that can serve static files over HTTP/HTTPS

For the share functionality to work, the application must be served over HTTPS (or HTTP on localhost).

### Running locally without a web server

If you don't have a web server installed, you can use the included `server.js`:

#### Using Bun

```bash
# Install Bun (if not installed)
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Start the server
bun run start
```

#### Using Node.js

```bash
# Requires Node.js v18+
node server.js
```

Then open `http://localhost:3000` in your browser.

### Changing the port

```bash
# Bun
PORT=8080 bun run server.js

# Node.js
PORT=8080 node server.js

# Windows (PowerShell)
$env:PORT=8080; bun run server.js
```

## Installing as a Progressive Web App (PWA)

eXeViewer can be installed as a standalone application on your device. Once installed:

- It appears in your app launcher/start menu
- It opens in its own window (without browser UI)
- It works offline

**Note**: When running as an installed PWA, the application runs locally on your device. This means you cannot generate shareable links, since those links need to point to a publicly accessible eXeViewer instance. For sharing functionality, use eXeViewer through a web browser on a hosted version.

### Desktop (Chrome, Edge)

1. Open eXeViewer in your browser
2. Click the install icon in the address bar (or the three-dot menu > "Install eXeViewer")
3. Confirm the installation

### Desktop (Firefox)

Firefox doesn't support PWA installation natively. Use the [PWAs for Firefox](https://addons.mozilla.org/firefox/addon/pwas-for-firefox/) extension.

### Android (Chrome)

1. Open eXeViewer in Chrome
2. Tap the three-dot menu
3. Select "Add to Home screen" or "Install app"

### iOS (Safari)

1. Open eXeViewer in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

## For developers

### How it works

1. **Service Worker** (`sw.js`): Handles two functions:
   - Caches the application shell for offline use.
   - Intercepts requests to `/viewer/*` and serves extracted ZIP content from memory.

2. **ZIP processing** (`js/app.js`): Uses JSZip to extract content in memory. Files are sent to the Service Worker as base64-encoded strings.

3. **Content display**: An iframe loads `/viewer/index.html`. The Service Worker intercepts this request and serves the corresponding file from the extracted content.

4. **URL handling**: For cloud service links, the application transforms share URLs into direct download URLs before fetching.

5. **Content persistence**: Extracted content is stored in IndexedDB and automatically restored on page reload. This behavior can be disabled in `js/app.js`:
   ```javascript
   const config = {
       autoRestoreContent: false  // Set to false to disable
   };
   ```

6. **External links handling**: External links inside the displayed content are opened in a new window/tab by default. This prevents navigation issues when content is displayed in an iframe. This behavior can be disabled in `js/app.js`:
   ```javascript
   const config = {
       openExternalLinksInNewWindow: false  // Set to false to disable
   };
   ```

7. **Content validation**: By default, the application validates that ZIP files contain eXeLearning content before displaying them. It recognizes both legacy exports (eXeLearning 2.x) and modern exports (eXeLearning 3.x). This validation can be disabled in `js/app.js`:
   ```javascript
   const config = {
       validateExeContent: false  // Set to false to allow any ZIP with an index.html
   };
   ```

### Adding a new language

1. Copy `lang/en.json` to `lang/XX.json` (where `XX` is the ISO 639-1 code)

2. Translate the values in the new file (keep the keys unchanged)

3. Add the language code to `AVAILABLE_LANGUAGES` in `js/i18n.js`:
   ```javascript
   const AVAILABLE_LANGUAGES = ['en', 'es', 'XX'];
   ```

4. Add the language option to both dropdown menus in `index.html`:
   ```html
   <li><a class="dropdown-item" href="#" data-lang="XX">Language Name</a></li>
   ```

5. Add the language name to the `language` section in all language files:
   ```json
   "language": {
     "XX": "Language Name"
   }
   ```

### Project structure

```
exeviewer/
├── index.html          # Main application page
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── server.js           # Development server (Bun/Node.js)
├── package.json        # Project configuration
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── app.js          # Main application logic
│   └── i18n.js         # Internationalization module
├── lang/
│   ├── en.json         # English translations
│   └── es.json         # Spanish translations
├── img/                # Icons and images
├── vendor/             # Third-party libraries
│   ├── bootstrap/      # Bootstrap 5.3.2
│   ├── bootstrap-icons/# Bootstrap Icons 1.11.1
│   └── jszip/          # JSZip 3.10.1
└── scripts/
    └── generate-icons.js   # Icon generation script (requires Node.js + sharp)
```

## License

Copyright (C) 2026 [Ignacio Gros](https://www.gros.es)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

## Credits

### Third-party libraries

- [Bootstrap](https://getbootstrap.com/) v5.3.2 - Copyright 2011-2023 The Bootstrap Authors - MIT License
- [Bootstrap Icons](https://icons.getbootstrap.com/) v1.11.1 - Copyright 2019-2023 The Bootstrap Authors - MIT License
- [JSZip](https://stuk.github.io/jszip/) v3.10.1 - Copyright 2009-2016 Stuart Knightley - MIT License or GPLv3

### Related projects

- [eXeLearning](https://exelearning.net/) - Your free and open source editor for interactive educational resources
