# eXeViewer

A lightweight web application to view eXeLearning content packages directly in your browser.

## Overview

eXeViewer allows users to open `.zip` or `.elpx` files exported from [eXeLearning](https://exelearning.net/) and navigate through the content as if it were hosted on a web server. The content is extracted in memory (no files written to disk) and served via a Service Worker.

## Features

- Drag and drop or browse to select `.zip`/`.elpx` files
- In-memory ZIP extraction (no disk writes)
- Full navigation support for HTML, CSS, JavaScript, images, and media
- Clean, responsive interface using Bootstrap 5
- Service Worker-based content serving
- Dark mode support (follows system preference)
- Multi-language support (English, Spanish) with easy extensibility
- **Installable as a Progressive Web App (PWA)** for offline use

## Requirements

- **Bun** (recommended) or **Node.js** (v18 or higher)
- A modern web browser with Service Worker support (Chrome, Firefox, Edge, Safari)

## Installation

### Option 1: Using Bun (Recommended)

1. Install Bun if you haven't already:
   ```bash
   # Windows (PowerShell)
   powershell -c "irm bun.sh/install.ps1 | iex"

   # macOS/Linux
   curl -fsSL https://bun.sh/install | bash
   ```

2. Clone or download this project:
   ```bash
   cd exeviewer
   ```

3. Start the server:
   ```bash
   bun run start
   ```

### Option 2: Using Node.js

1. Ensure Node.js v18+ is installed:
   ```bash
   node --version
   ```

2. Navigate to the project directory:
   ```bash
   cd exeviewer
   ```

3. Start the server:
   ```bash
   npm run start:node
   # or directly:
   node server.js
   ```

## Usage

1. Start the server (see Installation above)

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Either:
   - **Drag and drop** a `.zip` or `.elpx` file onto the drop zone
   - **Click "Browse Files"** to select a file from your device

4. The content will be extracted and displayed in the viewer

5. Navigate through the content using the links in the displayed page

6. Click **"New File"** in the top bar to load a different package

## Installing as a Progressive Web App (PWA)

eXeViewer can be installed as a standalone application on your device. Once installed, it will:

- Appear in your app launcher/start menu with its own icon
- Open in its own window (without browser UI)
- Work offline (the app shell is cached)
- Be accessible like any other native application

### Installation Instructions

#### Desktop (Chrome, Edge)

1. Open eXeViewer in your browser (e.g., `http://localhost:3000`)
2. Look for the **install icon** in the address bar (usually a "+" or computer icon)
3. Click it and confirm the installation
4. The app will be added to your desktop/start menu

Alternatively:
- Click the **three-dot menu** (⋮) in the browser
- Select **"Install eXeViewer"** or **"Install app"**

#### Desktop (Firefox)

Firefox doesn't support PWA installation natively. Consider using:
- [PWAs for Firefox](https://addons.mozilla.org/firefox/addon/pwas-for-firefox/) extension
- Chrome or Edge for installation

#### Mobile (Android - Chrome)

1. Open eXeViewer in Chrome
2. Tap the **three-dot menu** (⋮)
3. Select **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. The app icon will appear on your home screen

#### Mobile (iOS - Safari)

1. Open eXeViewer in Safari
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm
5. The app icon will appear on your home screen

### Hosting for PWA Installation

For users to install eXeViewer as a PWA, it must be served over HTTPS (except for localhost). Options include:

1. **Local development**: `http://localhost:3000` works for testing
2. **GitHub Pages**: Free HTTPS hosting for static sites
3. **Netlify/Vercel**: Free tier with automatic HTTPS
4. **Your own server**: Configure HTTPS with Let's Encrypt

### Sharing the Installation Link

To let others install eXeViewer, simply share your hosted URL:

```
https://your-domain.com/exeviewer/
```

Users can visit this link and follow the installation instructions above for their platform.

## Configuration

### Changing the Port

By default, the server runs on port 3000. To use a different port:

```bash
# Bun
PORT=8080 bun run server.js

# Node.js
PORT=8080 node server.js

# Windows (PowerShell)
$env:PORT=8080; bun run server.js
```

## Internationalization (i18n)

eXeViewer supports multiple languages. The application automatically detects the user's browser language preference and will use it if available. Users can also manually switch languages using the language selector in the interface.

### Currently Supported Languages

- **English** (en) - Default
- **Spanish** (es) - Español

### Adding a New Language

To add a new language, follow these steps:

#### 1. Create the language file

Copy the English language file as a template:

```bash
cp lang/en.json lang/XX.json
```

Replace `XX` with the [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g., `fr` for French, `de` for German, `pt` for Portuguese).

#### 2. Translate the content

Edit the new file (`lang/XX.json`) and translate all the text values. The file structure looks like this:

```json
{
  "app": {
    "title": "eXeViewer",
    "description": "Your translated description here"
  },
  "welcome": {
    "dragDrop": "Your translated text with <strong>.zip</strong> or <strong>.elpx</strong> here",
    "or": "or",
    "browseFiles": "Browse Files",
    "supportedFormats": "Your translated text here"
  },
  ...
}
```

**Important notes:**
- Keep the JSON keys unchanged (only translate the values)
- Preserve any HTML tags like `<strong>` in the translations
- Keep placeholders like `{processed}` and `{total}` as they are (used for variable substitution)

#### 3. Register the new language

Edit `js/i18n.js` and add your language code to the `AVAILABLE_LANGUAGES` array:

```javascript
const AVAILABLE_LANGUAGES = ['en', 'es', 'XX'];  // Add your code here
```

#### 4. Add the language to the UI selectors

Edit `index.html` and add the new language option to both dropdown menus:

In the navbar (around line 38):
```html
<li><a class="dropdown-item" href="#" data-lang="XX">Language Name</a></li>
```

In the welcome screen (around line 65):
```html
<li><a class="dropdown-item" href="#" data-lang="XX">Language Name</a></li>
```

#### 5. Add the language name translations

In your new language file (`lang/XX.json`) and in all existing language files, add the language name to the `language` section:

```json
{
  "language": {
    "label": "Language",
    "en": "English",
    "es": "Español",
    "XX": "Language Name in Native Script"
  }
}
```

### Translation Keys Reference

| Key | Description |
|-----|-------------|
| `app.title` | Application title |
| `app.description` | Main description shown on welcome screen |
| `welcome.*` | Welcome screen texts |
| `navbar.*` | Navigation bar texts |
| `loading.*` | Loading status messages |
| `errors.*` | Error messages |
| `accessibility.*` | Screen reader texts |
| `language.*` | Language names |

## Project Structure

```
exeviewer/
├── index.html          # Main application page
├── manifest.json       # PWA Web App Manifest
├── server.js           # HTTP server (Bun/Node.js compatible)
├── sw.js               # Service Worker (PWA caching + content serving)
├── package.json        # Project configuration
├── README.md           # This file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── app.js          # Main application logic
│   └── i18n.js         # Internationalization module
├── lang/
│   ├── en.json         # English translations (default)
│   └── es.json         # Spanish translations
├── img/
│   ├── logo.svg        # Application logo
│   ├── icon.svg        # Square icon for PWA
│   ├── icon-*.png      # PNG icons for various sizes
│   └── favicon.ico     # Browser favicon
└── scripts/
    └── generate-icons.js   # Script to regenerate PWA icons
```

## How It Works

1. **Server**: A lightweight HTTP server (compatible with Bun and Node.js) serves the static files for the application.

2. **Service Worker**: The Service Worker handles two main functions:
   - **PWA Caching**: Caches the app shell (HTML, CSS, JS, icons) for offline use
   - **Content Serving**: Intercepts requests to `/viewer/*` paths and serves extracted ZIP content from memory

3. **ZIP Processing**: When a user selects a file, JSZip extracts the contents in memory. The extracted files are sent to the Service Worker as base64-encoded strings.

4. **Content Display**: The viewer loads an iframe pointing to `/viewer/index.html`. The Service Worker intercepts this request and serves the corresponding file from the extracted content.

5. **PWA Installation**: The Web App Manifest (`manifest.json`) enables browsers to offer installation of eXeViewer as a standalone app with its own icon and window.

## Browser Compatibility

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 60+             |
| Firefox | 57+             |
| Edge    | 79+             |
| Safari  | 11.1+           |

## Troubleshooting

### Service Worker not registering

- Ensure you're accessing the application via `http://localhost` or `https://`
- Service Workers don't work with `file://` URLs
- Check the browser console for errors

### Content not loading

- Verify the ZIP file contains an `index.html` at the root
- Check the browser console for 404 errors
- Try refreshing the page after the first load

### Port already in use

- Change the port using the `PORT` environment variable
- Or find and stop the process using that port

## License

MIT License

## Credits

- [eXeLearning](https://exelearning.net/) - Open source authoring tool
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [JSZip](https://stuk.github.io/jszip/) - ZIP file processing
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon library
