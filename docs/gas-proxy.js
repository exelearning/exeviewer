/**
 * Google Apps Script Proxy for eXeViewer
 *
 * This script acts as a proxy to download files from Google Drive,
 * bypassing CORS restrictions that prevent browser-based applications
 * from accessing Drive files directly.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Replace the default code with this file's content
 * 3. Click Deploy > New deployment
 * 4. Select "Web app" as the type
 * 5. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 6. Click Deploy and authorize the permissions
 * 7. Copy the deployment URL (ends with /exec)
 * 8. Configure this URL in eXeViewer's js/app.js: gasProxyUrl = 'YOUR_URL'
 *
 * USAGE:
 * GET ?url=DRIVE_URL&bundle=1
 * Returns JSON: { name: string, size: number, base64: string }
 *
 * LIMITATIONS:
 * - Maximum file size: 100 MB (Google Apps Script limit)
 * - Files must be shared publicly ("Anyone with the link")
 * - Uses the deploying user's Google account quotas
 */

var MAX_BUNDLE_BYTES = 100 * 1024 * 1024; // 100 MB

function doGet(e) {
  var url = (e && e.parameter && e.parameter.url) ? e.parameter.url : '';

  if (!url) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Missing url parameter' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    if (e.parameter.bundle === '1') {
      return ContentService.createTextOutput(JSON.stringify(buildBundle_(url)))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ error: 'Use ?url=...&bundle=1' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildBundle_(rawUrl) {
  var blob = fetchZipBlob_(rawUrl);
  var bytes = blob.getBytes();

  if (bytes.length > MAX_BUNDLE_BYTES) {
    throw new Error('File exceeds ' + (MAX_BUNDLE_BYTES / (1024 * 1024)) + ' MB limit');
  }

  return {
    name: blob.getName() || 'content.zip',
    size: bytes.length,
    base64: Utilities.base64Encode(bytes)
  };
}

function fetchZipBlob_(url) {
  var driveId = extractDriveId_(url);

  if (driveId) {
    return fetchDriveFile_(driveId);
  }

  // For non-Drive URLs, fetch directly
  var response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true
  });

  var code = response.getResponseCode();
  if (code >= 400) {
    throw new Error('HTTP error ' + code);
  }

  return response.getBlob();
}

function extractDriveId_(url) {
  // Format: https://drive.google.com/file/d/FILE_ID/view
  var match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  match = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }

  // Format: https://drive.google.com/uc?id=FILE_ID
  match = url.match(/drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }

  return '';
}

function fetchDriveFile_(driveId) {
  var baseUrl = 'https://drive.google.com/uc?export=download&id=' + driveId;

  var response = UrlFetchApp.fetch(baseUrl, {
    muteHttpExceptions: true,
    followRedirects: true
  });

  var code = response.getResponseCode();
  if (code >= 400) {
    throw new Error('Drive returned HTTP ' + code);
  }

  var blob = response.getBlob();
  var contentType = blob.getContentType() || '';

  // If we got the file directly, return it
  if (contentType.indexOf('text/html') === -1) {
    return blob;
  }

  // Drive returned an HTML page (virus scan confirmation for large files)
  // Extract the confirmation token and retry
  var html = blob.getDataAsString('UTF-8');
  var match = html.match(/confirm=([0-9A-Za-z_]+)&amp;id=/) ||
              html.match(/confirm=([0-9A-Za-z_]+)&id=/);

  if (!match) {
    throw new Error('Could not download from Drive. Check that the file is shared publicly.');
  }

  var confirmToken = match[1];
  var confirmUrl = 'https://drive.google.com/uc?export=download&confirm=' + confirmToken + '&id=' + driveId;

  var confirmResponse = UrlFetchApp.fetch(confirmUrl, {
    muteHttpExceptions: true,
    followRedirects: true
  });

  var confirmCode = confirmResponse.getResponseCode();
  if (confirmCode >= 400) {
    throw new Error('Could not download file from Drive (HTTP ' + confirmCode + ')');
  }

  return confirmResponse.getBlob();
}
