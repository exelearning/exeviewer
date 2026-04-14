#!/bin/sh
set -e

# Generate js/config.js from environment variables at container startup.
# Any value not set in the environment keeps the application default (see js/app.js).
cat > /usr/share/nginx/html/js/config.js <<EOF
window.exeViewerConfig = {
    gasProxyUrl: '${GAS_PROXY_URL:-}',
    autoRestoreContent: ${AUTO_RESTORE_CONTENT:-true},
    openExternalLinksInNewWindow: ${OPEN_EXTERNAL_LINKS_IN_NEW_WINDOW:-true},
    validateExeContent: ${VALIDATE_EXE_CONTENT:-true},
    allowDownloadByDefault: ${ALLOW_DOWNLOAD_BY_DEFAULT:-true}
};
EOF

exec nginx -g 'daemon off;'
