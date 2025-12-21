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

## Project Structure

```
exeviewer/
├── index.html          # Main application page
├── server.js           # HTTP server (Bun/Node.js compatible)
├── sw.js               # Service Worker (must be at root for proper scope)
├── package.json        # Project configuration
├── README.md           # This file
├── css/
│   └── styles.css      # Custom styles
└── js/
    └── app.js          # Main application logic
```

## How It Works

1. **Server**: A lightweight HTTP server (compatible with Bun and Node.js) serves the static files for the application.

2. **Service Worker**: When registered, the Service Worker intercepts requests to `/viewer/*` paths and serves content from memory.

3. **ZIP Processing**: When a user selects a file, JSZip extracts the contents in memory. The extracted files are sent to the Service Worker as base64-encoded strings.

4. **Content Display**: The viewer loads an iframe pointing to `/viewer/index.html`. The Service Worker intercepts this request and serves the corresponding file from the extracted content.

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
