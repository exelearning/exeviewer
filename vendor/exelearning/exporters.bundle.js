(() => {
  // src/shared/export/browser/idevice-config-browser.ts
  function getIdeviceConfig(type) {
    const normalized = type.replace(/Idevice$/i, "").replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
    const typeMap = {
      "text": "text",
      "freetext": "text",
      "freetextfpd": "text",
      "generic": "text",
      "reflection": "text",
      "reflectionfpd": "text",
      "multi-choice": "multi-choice",
      "multichoice": "multi-choice",
      "true-false": "true-false",
      "truefalse": "true-false",
      "cloze": "cloze",
      "clozeactivity": "cloze",
      "case-study": "casestudy",
      "casestudy": "casestudy"
    };
    const cssClass = typeMap[normalized] || normalized || "text";
    const jsonIdevices = [
      // Text-type iDevices
      "text",
      "freetext",
      "freetextfpd",
      "generic",
      "reflection",
      "reflectionfpd",
      // iDevices with <component-type>json</component-type> in config.xml
      "image-gallery",
      "form",
      "casestudy",
      "case-study",
      "example",
      "trueorfalse",
      "true-or-false",
      "scrambled-list",
      "magnifier"
    ];
    const isJson = jsonIdevices.includes(cssClass) || jsonIdevices.includes(normalized);
    return {
      cssClass,
      componentType: isJson ? "json" : "html",
      template: `${cssClass}.html`
    };
  }
  var IDEVICE_JS_DEPENDENCIES = {
    checklist: ["html2canvas.js"],
    "progress-report": ["html2canvas.js"],
    "select-media-files": ["mansory-jq.js"],
    "image-gallery": ["simple-lightbox.min.js"]
  };
  var IDEVICE_CSS_DEPENDENCIES = {
    "image-gallery": ["simple-lightbox.min.css"]
  };
  function getIdeviceExportFiles(typeName, extension) {
    const mainFile = `${typeName}${extension}`;
    if (extension === ".js") {
      const dependencies = IDEVICE_JS_DEPENDENCIES[typeName] || [];
      return [mainFile, ...dependencies];
    }
    const cssDependencies = IDEVICE_CSS_DEPENDENCIES[typeName] || [];
    return [mainFile, ...cssDependencies];
  }

  // src/shared/export/constants.ts
  var LIBRARY_PATTERNS = [
    // Effects library (animations, transitions)
    {
      name: "exe_effects",
      type: "class",
      pattern: "exe-fx",
      files: ["exe_effects/exe_effects.js", "exe_effects/exe_effects.css"]
    },
    // Games library
    {
      name: "exe_games",
      type: "class",
      pattern: "exe-game",
      files: ["exe_games/exe_games.js", "exe_games/exe_games.css"]
    },
    // Code highlighting
    {
      name: "exe_highlighter",
      type: "class",
      pattern: "highlighted-code",
      files: ["exe_highlighter/exe_highlighter.js", "exe_highlighter/exe_highlighter.css"]
    },
    // Lightbox for images
    // isDirectory: true to include sprite images (PNG, GIF) referenced from CSS
    {
      name: "exe_lightbox",
      type: "rel",
      pattern: "lightbox",
      files: ["exe_lightbox/exe_lightbox.js", "exe_lightbox/exe_lightbox.css"],
      isDirectory: true
    },
    // Lightbox for image galleries
    // isDirectory: true to include sprite images (PNG, GIF) referenced from CSS
    {
      name: "exe_lightbox_gallery",
      type: "class",
      pattern: "imageGallery",
      files: ["exe_lightbox/exe_lightbox.js", "exe_lightbox/exe_lightbox.css"],
      isDirectory: true
    },
    // Tooltips (qTip2)
    {
      name: "exe_tooltips",
      type: "class",
      pattern: "exe-tooltip",
      files: [
        "exe_tooltips/exe_tooltips.js",
        "exe_tooltips/jquery.qtip.min.js",
        "exe_tooltips/jquery.qtip.min.css",
        "exe_tooltips/imagesloaded.pkg.min.js"
      ]
    },
    // Image magnifier
    {
      name: "exe_magnify",
      type: "class",
      pattern: "ImageMagnifierIdevice",
      files: ["exe_magnify/mojomagnify.js"]
    },
    // Wikipedia content styling
    {
      name: "exe_wikipedia",
      type: "class",
      pattern: "exe-wikipedia-content",
      files: ["exe_wikipedia/exe_wikipedia.css"]
    },
    // Media player (MediaElement.js)
    {
      name: "exe_media",
      type: "class",
      pattern: "mediaelement",
      files: [
        "exe_media/exe_media.js",
        "exe_media/exe_media.css",
        "exe_media/exe_media_background.png",
        "exe_media/exe_media_bigplay.png",
        "exe_media/exe_media_bigplay.svg",
        "exe_media/exe_media_controls.png",
        "exe_media/exe_media_controls.svg",
        "exe_media/exe_media_loading.gif"
      ]
    },
    // Media player via audio/video file links with lightbox
    {
      name: "exe_media_link",
      type: "regex",
      pattern: /href="[^"]*\.(mp3|mp4|flv|ogg|ogv)"[^>]*rel="[^"]*lightbox/i,
      files: [
        "exe_media/exe_media.js",
        "exe_media/exe_media.css",
        "exe_media/exe_media_background.png",
        "exe_media/exe_media_bigplay.png",
        "exe_media/exe_media_bigplay.svg",
        "exe_media/exe_media_controls.png",
        "exe_media/exe_media_controls.svg",
        "exe_media/exe_media_loading.gif"
      ]
    },
    // ABC Music notation (abcjs)
    {
      name: "abcjs",
      type: "class",
      pattern: "abc-music",
      files: ["abcjs/abcjs-basic-min.js", "abcjs/exe_abc_music.js", "abcjs/abcjs-audio.css"]
    },
    // LaTeX math expressions (MathJax)
    // Includes entire exe_math directory for dynamic extension loading and context menu
    {
      name: "exe_math",
      type: "regex",
      pattern: /\\\(|\\\[/,
      files: ["exe_math"],
      isDirectory: true
    },
    // DataGame with encrypted LaTeX (special case)
    {
      name: "exe_math_datagame",
      type: "class",
      pattern: "DataGame",
      files: ["exe_math"],
      isDirectory: true,
      requiresLatexCheck: true
    },
    // Pre-rendered math with MathML (already converted from LaTeX to SVG+MathML)
    // This enables MathJax accessibility features (right-click menu, screen reader support)
    {
      name: "exe_math_mathml",
      type: "regex",
      pattern: /<math[\s>]/i,
      files: ["exe_math"],
      isDirectory: true
    },
    // NOTE: Mermaid library is NOT included in exports.
    // Mermaid diagrams are always pre-rendered to static SVG (class="exe-mermaid-rendered")
    // before export, so the ~2.7MB mermaid.min.js library is never needed.
    // The MermaidPreRenderer.js handles conversion in the workarea.
    // jQuery UI for sortable/draggable iDevices
    {
      name: "jquery_ui_ordena",
      type: "class",
      pattern: "ordena-IDevice",
      files: ["jquery-ui/jquery-ui.min.js"]
    },
    {
      name: "jquery_ui_clasifica",
      type: "class",
      pattern: "clasifica-IDevice",
      files: ["jquery-ui/jquery-ui.min.js"]
    },
    {
      name: "jquery_ui_relaciona",
      type: "class",
      pattern: "relaciona-IDevice",
      files: ["jquery-ui/jquery-ui.min.js"]
    },
    {
      name: "jquery_ui_dragdrop",
      type: "class",
      pattern: "dragdrop-IDevice",
      files: ["jquery-ui/jquery-ui.min.js"]
    },
    {
      name: "jquery_ui_completa",
      type: "class",
      pattern: "completa-IDevice",
      files: ["jquery-ui/jquery-ui.min.js"]
    },
    // Accessibility toolbar
    // isDirectory: true to include font files (woff, woff2) and icon (png) referenced from CSS
    {
      name: "exe_atools",
      type: "class",
      pattern: "exe-atools",
      files: ["exe_atools/exe_atools.js", "exe_atools/exe_atools.css"],
      isDirectory: true
    },
    // ELPX download support (for download-source-file iDevice)
    // Includes fflate for client-side ZIP generation
    {
      name: "exe_elpx_download",
      type: "class",
      pattern: "exe-download-package-link",
      files: ["fflate/fflate.umd.js", "exe_elpx_download/exe_elpx_download.js"]
    },
    // ELPX download support for manual links using exe-package:elp protocol
    {
      name: "exe_elpx_download_protocol",
      type: "regex",
      pattern: /exe-package:elp/,
      files: ["fflate/fflate.umd.js", "exe_elpx_download/exe_elpx_download.js"]
    }
  ];
  var BASE_LIBRARIES = [
    // jQuery
    "jquery/jquery.min.js",
    // Common eXe scripts
    "common_i18n.js",
    "common.js",
    "exe_export.js",
    // Bootstrap (JS bundle includes Popper)
    "bootstrap/bootstrap.bundle.min.js",
    "bootstrap/bootstrap.bundle.min.js.map",
    "bootstrap/bootstrap.min.css",
    "bootstrap/bootstrap.min.css.map"
  ];
  var SCORM_LIBRARIES = ["scorm/SCORM_API_wrapper.js", "scorm/SCOFunctions.js"];
  var LICENSE_REGISTRY = {
    // === Creative Commons 4.0 (Current) ===
    "creative commons: attribution 4.0": {
      displayName: "creative commons: attribution 4.0 (BY)",
      url: "https://creativecommons.org/licenses/by/4.0/",
      cssClass: "cc"
    },
    "creative commons: attribution - share alike 4.0": {
      displayName: "creative commons: attribution - share alike 4.0 (BY-SA)",
      url: "https://creativecommons.org/licenses/by-sa/4.0/",
      cssClass: "cc cc-by-sa"
    },
    "creative commons: attribution - non derived work 4.0": {
      displayName: "creative commons: attribution - non derived work 4.0 (BY-ND)",
      url: "https://creativecommons.org/licenses/by-nd/4.0/",
      cssClass: "cc cc-by-nd"
    },
    "creative commons: attribution - non commercial 4.0": {
      displayName: "creative commons: attribution - non commercial 4.0 (BY-NC)",
      url: "https://creativecommons.org/licenses/by-nc/4.0/",
      cssClass: "cc cc-by-nc"
    },
    "creative commons: attribution - non commercial - share alike 4.0": {
      displayName: "creative commons: attribution - non commercial - share alike 4.0 (BY-NC-SA)",
      url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      cssClass: "cc cc-by-nc-sa"
    },
    "creative commons: attribution - non derived work - non commercial 4.0": {
      displayName: "creative commons: attribution - non derived work - non commercial 4.0 (BY-NC-ND)",
      url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      cssClass: "cc cc-by-nc-nd"
    },
    // === Creative Commons 3.0 (Legacy - not selectable in dropdown) ===
    "creative commons: attribution 3.0": {
      displayName: "creative commons: attribution 3.0 (BY)",
      url: "https://creativecommons.org/licenses/by/3.0/",
      cssClass: "cc",
      legacy: true
    },
    "creative commons: attribution - share alike 3.0": {
      displayName: "creative commons: attribution - share alike 3.0 (BY-SA)",
      url: "https://creativecommons.org/licenses/by-sa/3.0/",
      cssClass: "cc cc-by-sa",
      legacy: true
    },
    "creative commons: attribution - non derived work 3.0": {
      displayName: "creative commons: attribution - non derived work 3.0 (BY-ND)",
      url: "https://creativecommons.org/licenses/by-nd/3.0/",
      cssClass: "cc cc-by-nd",
      legacy: true
    },
    "creative commons: attribution - non commercial 3.0": {
      displayName: "creative commons: attribution - non commercial 3.0 (BY-NC)",
      url: "https://creativecommons.org/licenses/by-nc/3.0/",
      cssClass: "cc cc-by-nc",
      legacy: true
    },
    "creative commons: attribution - non commercial - share alike 3.0": {
      displayName: "creative commons: attribution - non commercial - share alike 3.0 (BY-NC-SA)",
      url: "https://creativecommons.org/licenses/by-nc-sa/3.0/",
      cssClass: "cc cc-by-nc-sa",
      legacy: true
    },
    "creative commons: attribution - non derived work - non commercial 3.0": {
      displayName: "creative commons: attribution - non derived work - non commercial 3.0 (BY-NC-ND)",
      url: "https://creativecommons.org/licenses/by-nc-nd/3.0/",
      cssClass: "cc cc-by-nc-nd",
      legacy: true
    },
    // === Creative Commons 2.5 (Legacy - not selectable in dropdown) ===
    "creative commons: attribution 2.5": {
      displayName: "creative commons: attribution 2.5 (BY)",
      url: "https://creativecommons.org/licenses/by/2.5/",
      cssClass: "cc",
      legacy: true
    },
    "creative commons: attribution - share alike 2.5": {
      displayName: "creative commons: attribution - share alike 2.5 (BY-SA)",
      url: "https://creativecommons.org/licenses/by-sa/2.5/",
      cssClass: "cc cc-by-sa",
      legacy: true
    },
    "creative commons: attribution - non derived work 2.5": {
      displayName: "creative commons: attribution - non derived work 2.5 (BY-ND)",
      url: "https://creativecommons.org/licenses/by-nd/2.5/",
      cssClass: "cc cc-by-nd",
      legacy: true
    },
    "creative commons: attribution - non commercial 2.5": {
      displayName: "creative commons: attribution - non commercial 2.5 (BY-NC)",
      url: "https://creativecommons.org/licenses/by-nc/2.5/",
      cssClass: "cc cc-by-nc",
      legacy: true
    },
    "creative commons: attribution - non commercial - share alike 2.5": {
      displayName: "creative commons: attribution - non commercial - share alike 2.5 (BY-NC-SA)",
      url: "https://creativecommons.org/licenses/by-nc-sa/2.5/",
      cssClass: "cc cc-by-nc-sa",
      legacy: true
    },
    "creative commons: attribution - non derived work - non commercial 2.5": {
      displayName: "creative commons: attribution - non derived work - non commercial 2.5 (BY-NC-ND)",
      url: "https://creativecommons.org/licenses/by-nc-nd/2.5/",
      cssClass: "cc cc-by-nc-nd",
      legacy: true
    },
    // === Creative Commons CC0 1.0 (Public Domain Dedication) ===
    "creative commons: cc0 1.0": {
      displayName: "creative commons: public domain 1.0 (CC0)",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      cssClass: "cc cc-0"
    },
    // === Public Domain (generic, no specific license link) ===
    "public domain": {
      displayName: "public domain",
      url: "",
      cssClass: ""
    },
    // === GNU/GPL Licenses (Legacy - not selectable in dropdown, no icon in themes) ===
    "gnu/gpl": {
      displayName: "gnu/gpl",
      url: "https://www.gnu.org/licenses/gpl.html",
      cssClass: "",
      legacy: true
    },
    "free software license gpl": {
      displayName: "free software license GPL",
      url: "https://www.gnu.org/licenses/gpl.html",
      cssClass: "",
      legacy: true
    },
    // === EUPL License (Legacy - not selectable in dropdown, no icon in themes) ===
    "free software license eupl": {
      displayName: "free software license EUPL",
      url: "https://eupl.eu/",
      cssClass: "",
      legacy: true
    },
    // === Dual License GPL + EUPL (Legacy - not selectable in dropdown, no icon in themes) ===
    "dual free content license gpl and eupl": {
      displayName: "dual free content license GPL and EUPL",
      url: "",
      cssClass: "",
      legacy: true
    },
    // === GFDL License (Legacy - not selectable in dropdown, no icon in themes) ===
    "license gfdl": {
      displayName: "license GFDL",
      url: "https://www.gnu.org/licenses/fdl.html",
      cssClass: "",
      legacy: true
    },
    // === Other Licenses (Legacy - not selectable in dropdown) ===
    "other free software licenses": {
      displayName: "other free software licenses",
      url: "",
      cssClass: "",
      legacy: true
    },
    "propietary license": {
      displayName: "propietary license",
      url: "",
      cssClass: "",
      hideInFooter: true
    },
    "intellectual property license": {
      displayName: "intellectual property license",
      url: "",
      cssClass: "",
      legacy: true
    },
    "not appropriate": {
      displayName: "not appropriate",
      url: "",
      cssClass: "",
      hideInFooter: true
    }
  };
  function getLicenseClass(licenseName) {
    if (!licenseName) {
      return "";
    }
    const cleanName = licenseName.toLowerCase().trim().replace(/\s+/g, " ");
    if (LICENSE_REGISTRY[cleanName]) {
      return LICENSE_REGISTRY[cleanName].cssClass;
    }
    return "";
  }
  function getLicenseUrl(licenseName) {
    if (!licenseName) return "";
    const key = licenseName.toLowerCase().trim().replace(/\s+/g, " ");
    return LICENSE_REGISTRY[key]?.url || "";
  }
  function formatLicenseText(licenseName) {
    if (!licenseName) return "";
    const key = licenseName.toLowerCase().trim();
    return LICENSE_REGISTRY[key]?.displayName || licenseName;
  }
  function shouldShowLicenseFooter(licenseName) {
    if (!licenseName) return false;
    const cleaned = licenseName.toLowerCase().trim().replace(/\s+/g, " ");
    const entry = LICENSE_REGISTRY[cleaned];
    if (entry?.hideInFooter) return false;
    return true;
  }
  var SCORM_12_NAMESPACES = {
    imscp: "http://www.imsproject.org/xsd/imscp_rootv1p1p2",
    adlcp: "http://www.adlnet.org/xsd/adlcp_rootv1p2",
    imsmd: "http://www.imsglobal.org/xsd/imsmd_v1p2",
    xsi: "http://www.w3.org/2001/XMLSchema-instance"
  };
  var SCORM_2004_NAMESPACES = {
    imscp: "http://www.imsglobal.org/xsd/imscp_v1p1",
    adlcp: "http://www.adlnet.org/xsd/adlcp_v1p3",
    adlseq: "http://www.adlnet.org/xsd/adlseq_v1p3",
    adlnav: "http://www.adlnet.org/xsd/adlnav_v1p3",
    imsss: "http://www.imsglobal.org/xsd/imsss",
    xsi: "http://www.w3.org/2001/XMLSchema-instance"
  };
  var IMS_NAMESPACES = {
    imscp: "http://www.imsglobal.org/xsd/imscp_v1p1",
    imsmd: "http://www.imsglobal.org/xsd/imsmd_v1p2",
    xsi: "http://www.w3.org/2001/XMLSchema-instance"
  };
  var LOM_NAMESPACES = {
    lom: "http://www.imsglobal.org/xsd/imsmd_rootv1p2p1",
    xsi: "http://www.w3.org/2001/XMLSchema-instance"
  };
  var IDEVICE_TYPE_MAP = {
    // Text/FreeText variations
    freetext: "text",
    text: "text",
    freetextidevice: "text",
    textidevice: "text",
    // Legacy Python eXeLearning iDevice types (pre-v3.0)
    // JsIdevice was a text iDevice in old Python eXeLearning
    jsidevice: "text",
    js: "text",
    // GalleryImages from old Python format
    galleryimages: "image-gallery",
    // Spanish → English mappings
    adivina: "guess",
    "adivina-activity": "guess",
    listacotejo: "checklist",
    "listacotejo-activity": "checklist",
    ordena: "sort",
    clasifica: "classify",
    relaciona: "relate",
    completa: "complete",
    // Plural → singular
    rubrics: "rubric",
    // Alternative names
    "download-package": "download-source-file",
    "pbl-tools": "udl-content",
    // PBL tools maps to UDL content
    // Quiz variants
    selecciona: "quick-questions-multiple-choice",
    "selecciona-activity": "quick-questions-multiple-choice",
    quiz: "quick-questions",
    "quiz-activity": "quick-questions",
    // Game variants
    "quiz-game": "az-quiz-game",
    trivialquiz: "trivial",
    // Interactive variants
    "before-after": "beforeafter",
    "image-magnifier": "magnifier",
    "word-puzzle": "word-search",
    "palabras-puzzle": "word-search",
    "sopa-de-letras": "word-search",
    // Case study variants
    "case-study": "casestudy",
    "estudio-de-caso": "casestudy",
    // Example/model variants
    ejemplo: "example",
    modelo: "example",
    // Challenge variants
    reto: "challenge",
    desafio: "challenge",
    // External website variants
    "sitio-externo": "external-website",
    "web-externa": "external-website",
    // Form variants
    formulario: "form",
    // Flipcards variants
    tarjetas: "flipcards",
    "flash-cards": "flipcards",
    // Image gallery variants
    galeria: "image-gallery",
    "galeria-imagenes": "image-gallery",
    // Crossword variants
    crucigrama: "crossword",
    // Puzzle variants
    rompecabezas: "puzzle",
    // Map variants
    mapa: "map",
    // Discover variants
    descubre: "discover",
    // Identify variants
    identifica: "identify",
    // Hidden image variants
    "imagen-oculta": "hidden-image",
    // Padlock variants
    candado: "padlock",
    // Periodic table variants
    "tabla-periodica": "periodic-table",
    // Progress report variants
    "informe-progreso": "progress-report",
    // Scrambled list variants
    "lista-desordenada": "scrambled-list",
    // True/false variants
    verdaderofalso: "trueorfalse",
    "verdadero-falso": "trueorfalse",
    // Interactive video variants
    "video-interactivo": "interactive-video",
    // Dragdrop variants
    "arrastrar-soltar": "dragdrop",
    // Select media files variants
    "seleccionar-archivos": "select-media-files",
    // Math operations variants
    "operaciones-matematicas": "mathematicaloperations",
    // Math problems variants
    "problemas-matematicos": "mathproblems",
    // GeoGebra variants
    geogebra: "geogebra-activity"
  };
  function normalizeIdeviceType(typeName) {
    if (!typeName) return "text";
    let normalized = typeName.toLowerCase();
    normalized = normalized.replace(/-?idevice$/i, "");
    return IDEVICE_TYPE_MAP[normalized] || normalized || "text";
  }
  var ODE_DTD_FILENAME = "content.dtd";
  var ODE_VERSION = "3.0";
  var ODE_DTD_CONTENT = `<!--
    ODE Content DTD
    Document Type Definition for eXeLearning ODE XML format (content.xml)
    Version: 2.0
    Namespace: http://www.intef.es/xsd/ode
    Copyright (C) 2025 eXeLearning - License: AGPL-3.0
-->

<!ELEMENT ode (userPreferences?, odeResources?, odeProperties?, odeNavStructures)>
<!ATTLIST ode
    xmlns CDATA #FIXED "http://www.intef.es/xsd/ode"
    version CDATA #IMPLIED>

<!-- User Preferences -->
<!ELEMENT userPreferences (userPreference*)>
<!ELEMENT userPreference (key, value)>

<!-- ODE Resources -->
<!ELEMENT odeResources (odeResource*)>
<!ELEMENT odeResource (key, value)>

<!-- ODE Properties -->
<!ELEMENT odeProperties (odeProperty*)>
<!ELEMENT odeProperty (key, value)>

<!-- Shared Key-Value Elements -->
<!ELEMENT key (#PCDATA)>
<!ELEMENT value (#PCDATA)>

<!-- Navigation Structures (Pages) -->
<!ELEMENT odeNavStructures (odeNavStructure*)>
<!ELEMENT odeNavStructure (odePageId, odeParentPageId, pageName, odeNavStructureOrder, odeNavStructureProperties?, odePagStructures?)>

<!ELEMENT odePageId (#PCDATA)>
<!ELEMENT odeParentPageId (#PCDATA)>
<!ELEMENT pageName (#PCDATA)>
<!ELEMENT odeNavStructureOrder (#PCDATA)>

<!ELEMENT odeNavStructureProperties (odeNavStructureProperty*)>
<!ELEMENT odeNavStructureProperty (key, value)>

<!-- Block Structures -->
<!ELEMENT odePagStructures (odePagStructure*)>
<!ELEMENT odePagStructure (odePageId, odeBlockId, blockName, iconName?, odePagStructureOrder, odePagStructureProperties?, odeComponents?)>

<!ELEMENT odeBlockId (#PCDATA)>
<!ELEMENT blockName (#PCDATA)>
<!ELEMENT iconName (#PCDATA)>
<!ELEMENT odePagStructureOrder (#PCDATA)>

<!ELEMENT odePagStructureProperties (odePagStructureProperty*)>
<!ELEMENT odePagStructureProperty (key, value)>

<!-- Components (iDevices) -->
<!ELEMENT odeComponents (odeComponent*)>
<!ELEMENT odeComponent (odePageId, odeBlockId, odeIdeviceId, odeIdeviceTypeName, htmlView?, jsonProperties?, odeComponentsOrder, odeComponentsProperties?)>

<!ELEMENT odeIdeviceId (#PCDATA)>
<!ELEMENT odeIdeviceTypeName (#PCDATA)>
<!ELEMENT htmlView (#PCDATA)>
<!ELEMENT jsonProperties (#PCDATA)>
<!ELEMENT odeComponentsOrder (#PCDATA)>

<!ELEMENT odeComponentsProperties (odeComponentsProperty*)>
<!ELEMENT odeComponentsProperty (key, value)>
`;

  // src/shared/export/metadata-properties.ts
  var METADATA_PROPERTIES = [
    // =========================================================================
    // Core Metadata
    // =========================================================================
    {
      key: "title",
      xmlKey: "pp_title",
      type: "string",
      defaultValue: "eXeLearning",
      category: "core"
    },
    {
      key: "subtitle",
      xmlKey: "pp_subtitle",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "author",
      xmlKey: "pp_author",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "description",
      xmlKey: "pp_description",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "language",
      xmlKey: "pp_lang",
      type: "string",
      defaultValue: "en",
      category: "core"
    },
    {
      key: "license",
      xmlKey: "pp_license",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "licenseUrl",
      xmlKey: "pp_licenseUrl",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "keywords",
      xmlKey: "pp_keywords",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "category",
      xmlKey: "pp_category",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "theme",
      xmlKey: "pp_theme",
      type: "string",
      defaultValue: "base",
      category: "core"
    },
    {
      key: "customStyles",
      xmlKey: "pp_customStyles",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    {
      key: "exelearningVersion",
      xmlKey: "pp_exelearning_version",
      type: "string",
      defaultValue: "",
      category: "core"
    },
    // =========================================================================
    // Export Options
    // =========================================================================
    {
      key: "addExeLink",
      xmlKey: "pp_addExeLink",
      type: "boolean",
      defaultValue: true,
      category: "export"
    },
    {
      key: "addPagination",
      xmlKey: "pp_addPagination",
      type: "boolean",
      defaultValue: false,
      category: "export"
    },
    {
      key: "addSearchBox",
      xmlKey: "pp_addSearchBox",
      type: "boolean",
      defaultValue: false,
      category: "export"
    },
    {
      key: "addAccessibilityToolbar",
      xmlKey: "pp_addAccessibilityToolbar",
      type: "boolean",
      defaultValue: false,
      category: "export"
    },
    {
      key: "addMathJax",
      xmlKey: "pp_addMathJax",
      type: "boolean",
      defaultValue: false,
      category: "export"
    },
    {
      key: "exportSource",
      xmlKey: "exportSource",
      // No pp_ prefix for legacy compatibility
      type: "boolean",
      defaultValue: true,
      category: "export"
    },
    {
      key: "globalFont",
      xmlKey: "pp_globalFont",
      type: "string",
      defaultValue: "default",
      category: "export"
    },
    // =========================================================================
    // Custom Content
    // =========================================================================
    {
      key: "extraHeadContent",
      xmlKey: "pp_extraHeadContent",
      type: "string",
      defaultValue: "",
      category: "content"
    },
    {
      key: "footer",
      xmlKey: "footer",
      // No pp_ prefix for legacy compatibility
      type: "string",
      defaultValue: "",
      category: "content"
    },
    // =========================================================================
    // Internal Properties (excluded from XML export)
    // =========================================================================
    {
      key: "odeIdentifier",
      xmlKey: "odeIdentifier",
      type: "string",
      defaultValue: "",
      excludeFromXml: true,
      category: "internal"
    },
    {
      key: "createdAt",
      xmlKey: "createdAt",
      type: "string",
      defaultValue: "",
      excludeFromXml: true,
      category: "internal"
    },
    {
      key: "modifiedAt",
      xmlKey: "modifiedAt",
      type: "string",
      defaultValue: "",
      excludeFromXml: true,
      category: "internal"
    },
    // =========================================================================
    // SCORM-specific Properties (go in manifest, not odeProperties)
    // =========================================================================
    {
      key: "scormIdentifier",
      xmlKey: "scormIdentifier",
      type: "string",
      defaultValue: "",
      excludeFromXml: true,
      category: "scorm"
    },
    {
      key: "masteryScore",
      xmlKey: "masteryScore",
      type: "string",
      defaultValue: "",
      excludeFromXml: true,
      category: "scorm"
    }
  ];
  function getPropertyConfig(key) {
    return METADATA_PROPERTIES.find((p) => p.key === key);
  }
  function getXmlKeyForProperty(key) {
    const config = getPropertyConfig(key);
    return config?.xmlKey ?? `pp_${key}`;
  }
  function isExcludedFromXml(key) {
    const config = getPropertyConfig(key);
    return config?.excludeFromXml === true;
  }
  function valueToXmlString(key, value) {
    const config = getPropertyConfig(key);
    if (config?.type === "boolean") {
      return value === true || value === "true" ? "true" : "false";
    }
    return String(value ?? "");
  }

  // src/shared/export/generators/OdeXmlGenerator.ts
  function generateOdeXml(meta, pages, options) {
    const odeId = options?.odeId || meta.odeIdentifier || generateOdeId();
    const versionId = options?.versionId || generateOdeId();
    const includeDoctype = options?.includeDoctype ?? true;
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    if (includeDoctype) {
      xml += `<!DOCTYPE ode SYSTEM "${ODE_DTD_FILENAME}">
`;
    }
    xml += '<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">\n';
    xml += generateUserPreferencesXml(meta);
    xml += generateOdeResourcesXml(odeId, versionId);
    xml += generateOdePropertiesXml(meta);
    xml += "<odeNavStructures>\n";
    for (let i = 0; i < pages.length; i++) {
      xml += generateOdeNavStructureXml(pages[i], i);
    }
    xml += "</odeNavStructures>\n";
    xml += "</ode>";
    return xml;
  }
  function generateUserPreferencesXml(meta) {
    let xml = "<userPreferences>\n";
    xml += generateUserPreferenceEntry("theme", meta.theme || "base");
    xml += "</userPreferences>\n";
    return xml;
  }
  function generateUserPreferenceEntry(key, value) {
    return `  <userPreference>
    <key>${escapeXml(key)}</key>
    <value>${escapeXml(value)}</value>
  </userPreference>
`;
  }
  function generateOdeResourcesXml(odeId, versionId) {
    let xml = "<odeResources>\n";
    xml += generateOdeResourceEntry("odeId", odeId);
    xml += generateOdeResourceEntry("odeVersionId", versionId);
    xml += generateOdeResourceEntry("exe_version", ODE_VERSION);
    xml += "</odeResources>\n";
    return xml;
  }
  function generateOdeResourceEntry(key, value) {
    return `  <odeResource>
    <key>${escapeXml(key)}</key>
    <value>${escapeXml(value)}</value>
  </odeResource>
`;
  }
  function generateOdePropertiesXml(meta) {
    let xml = "<odeProperties>\n";
    for (const [key, value] of Object.entries(meta)) {
      if (isExcludedFromXml(key)) continue;
      if (value === void 0 || value === null || value === "") continue;
      const strValue = valueToXmlString(key, value);
      const xmlKey = getXmlKeyForProperty(key);
      xml += generateOdePropertyEntry(xmlKey, strValue);
    }
    xml += "</odeProperties>\n";
    return xml;
  }
  function generateOdePropertyEntry(key, value) {
    return `  <odeProperty>
    <key>${escapeXml(key)}</key>
    <value>${escapeXml(value)}</value>
  </odeProperty>
`;
  }
  function generateOdeNavStructureXml(page, order) {
    const pageId = page.id;
    const parentId = page.parentId || "";
    let xml = `<odeNavStructure>
`;
    xml += `  <odePageId>${escapeXml(pageId)}</odePageId>
`;
    xml += `  <odeParentPageId>${escapeXml(parentId)}</odeParentPageId>
`;
    xml += `  <pageName>${escapeXml(page.title || "Page")}</pageName>
`;
    xml += `  <odeNavStructureOrder>${page.order ?? order}</odeNavStructureOrder>
`;
    xml += "  <odeNavStructureProperties>\n";
    xml += generateNavStructurePropertyEntry("titlePage", page.title || "");
    if (page.properties) {
      for (const [key, value] of Object.entries(page.properties)) {
        if (value !== void 0 && value !== null) {
          xml += generateNavStructurePropertyEntry(key, String(value));
        }
      }
    }
    xml += "  </odeNavStructureProperties>\n";
    xml += "  <odePagStructures>\n";
    for (let i = 0; i < (page.blocks || []).length; i++) {
      xml += generateOdePagStructureXml(page.blocks[i], pageId, i);
    }
    xml += "  </odePagStructures>\n";
    xml += "</odeNavStructure>\n";
    return xml;
  }
  function generateNavStructurePropertyEntry(key, value) {
    return `    <odeNavStructureProperty>
      <key>${escapeXml(key)}</key>
      <value>${escapeXml(value)}</value>
    </odeNavStructureProperty>
`;
  }
  function generateOdePagStructureXml(block, pageId, order) {
    const blockId = block.id;
    let xml = `    <odePagStructure>
`;
    xml += `      <odePageId>${escapeXml(pageId)}</odePageId>
`;
    xml += `      <odeBlockId>${escapeXml(blockId)}</odeBlockId>
`;
    xml += `      <blockName>${escapeXml(block.name || "")}</blockName>
`;
    xml += `      <iconName>${escapeXml(block.iconName || "")}</iconName>
`;
    xml += `      <odePagStructureOrder>${block.order ?? order}</odePagStructureOrder>
`;
    xml += "      <odePagStructureProperties>\n";
    if (block.properties) {
      const blockPropKeys = [
        "visibility",
        "teacherOnly",
        "allowToggle",
        "minimized",
        "identifier",
        "cssClass"
      ];
      for (const key of blockPropKeys) {
        if (block.properties[key] !== void 0) {
          xml += generatePagStructurePropertyEntry(key, String(block.properties[key]));
        }
      }
    }
    xml += "      </odePagStructureProperties>\n";
    xml += "      <odeComponents>\n";
    for (let i = 0; i < (block.components || []).length; i++) {
      xml += generateOdeComponentXml(block.components[i], pageId, blockId, i);
    }
    xml += "      </odeComponents>\n";
    xml += `    </odePagStructure>
`;
    return xml;
  }
  function generatePagStructurePropertyEntry(key, value) {
    return `        <odePagStructureProperty>
          <key>${escapeXml(key)}</key>
          <value>${escapeXml(value)}</value>
        </odePagStructureProperty>
`;
  }
  function transformAssetUrlsForXml(content) {
    return content || "";
  }
  function generateOdeComponentXml(component, pageId, blockId, order) {
    const componentId = component.id;
    const ideviceType = component.type || "FreeTextIdevice";
    let xml = `        <odeComponent>
`;
    xml += `          <odePageId>${escapeXml(pageId)}</odePageId>
`;
    xml += `          <odeBlockId>${escapeXml(blockId)}</odeBlockId>
`;
    xml += `          <odeIdeviceId>${escapeXml(componentId)}</odeIdeviceId>
`;
    xml += `          <odeIdeviceTypeName>${escapeXml(ideviceType)}</odeIdeviceTypeName>
`;
    const htmlContent = transformAssetUrlsForXml(component.content || "");
    xml += `          <htmlView><![CDATA[${escapeCdata(htmlContent)}]]></htmlView>
`;
    if (component.properties && Object.keys(component.properties).length > 0) {
      const jsonStr = transformAssetUrlsForXml(JSON.stringify(component.properties));
      xml += `          <jsonProperties><![CDATA[${escapeCdata(jsonStr)}]]></jsonProperties>
`;
    } else {
      xml += `          <jsonProperties></jsonProperties>
`;
    }
    xml += `          <odeComponentsOrder>${component.order ?? order}</odeComponentsOrder>
`;
    xml += "          <odeComponentsProperties>\n";
    if (component.structureProperties) {
      const componentPropKeys = ["visibility", "teacherOnly", "identifier", "cssClass"];
      for (const key of componentPropKeys) {
        if (component.structureProperties[key] !== void 0) {
          xml += generateComponentPropertyEntry(key, String(component.structureProperties[key]));
        }
      }
    } else {
      xml += generateComponentPropertyEntry("visibility", "true");
    }
    xml += "          </odeComponentsProperties>\n";
    xml += `        </odeComponent>
`;
    return xml;
  }
  function generateComponentPropertyEntry(key, value) {
    return `            <odeComponentsProperty>
              <key>${escapeXml(key)}</key>
              <value>${escapeXml(value)}</value>
            </odeComponentsProperty>
`;
  }
  function generateOdeId() {
    const now = /* @__PURE__ */ new Date();
    const timestamp = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0") + String(now.getSeconds()).padStart(2, "0");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    for (let i = 0; i < 6; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return timestamp + random;
  }
  function escapeXml(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  function escapeCdata(str) {
    if (!str) return "";
    return String(str).replace(/\]\]>/g, "]]]]><![CDATA[>");
  }

  // src/shared/export/adapters/YjsDocumentAdapter.ts
  var YjsDocumentAdapter = class {
    /**
     * Create adapter from YjsDocumentManager
     * @param manager - Active YjsDocumentManager instance
     */
    constructor(manager) {
      this.manager = manager;
    }
    /**
     * Get export metadata from Y.Map
     * @returns Export metadata
     */
    getMetadata() {
      const meta = this.manager.getMetadata();
      return {
        title: meta.get("title") || "eXeLearning",
        subtitle: meta.get("subtitle") || "",
        author: meta.get("author") || "",
        description: meta.get("description") || "",
        language: meta.get("language") || "en",
        license: meta.get("license") || "",
        licenseUrl: getLicenseUrl(meta.get("license") || ""),
        keywords: meta.get("keywords") || "",
        theme: meta.get("theme") || "base",
        exelearningVersion: meta.get("exelearning_version") || (typeof window !== "undefined" ? window.eXeLearning?.version : void 0),
        createdAt: meta.get("createdAt") || (/* @__PURE__ */ new Date()).toISOString(),
        modified: meta.get("modifiedAt") || (/* @__PURE__ */ new Date()).toISOString(),
        // Custom styles support
        customStyles: meta.get("customStyles") || void 0,
        // Export options (values stored as strings 'true'/'false' in Yjs)
        addExeLink: this.parseBoolean(meta.get("addExeLink"), true),
        // Default: true
        addPagination: this.parseBoolean(meta.get("addPagination"), false),
        addSearchBox: this.parseBoolean(meta.get("addSearchBox"), false),
        addAccessibilityToolbar: this.parseBoolean(meta.get("addAccessibilityToolbar"), false),
        addMathJax: this.parseBoolean(meta.get("addMathJax"), false),
        exportSource: this.parseBoolean(meta.get("exportSource"), true),
        // Default: true
        globalFont: meta.get("globalFont") || "default",
        // Custom content
        extraHeadContent: meta.get("extraHeadContent") || void 0,
        footer: meta.get("footer") || void 0
      };
    }
    /**
     * Parse boolean value from Yjs storage
     * Values may be stored as strings 'true'/'false' or actual booleans
     * @param value - Value to parse
     * @param defaultValue - Default value if not found
     * @returns Boolean value
     */
    parseBoolean(value, defaultValue) {
      if (value === void 0 || value === null) return defaultValue;
      if (typeof value === "boolean") return value;
      if (typeof value === "string") return value.toLowerCase() === "true";
      return defaultValue;
    }
    /**
     * Get navigation structure as flat array of pages
     *
     * Note: The Yjs navigation stores pages in a FLAT structure where each page
     * has a `parentId` attribute referencing its parent (not nested `children` arrays).
     * This matches how ElpxImporter.js stores pages in the browser.
     *
     * @returns Array of export pages with parentId references
     */
    getNavigation() {
      const navigation = this.manager.getNavigation();
      const pages = [];
      navigation.forEach((pageMap) => {
        const page = this.convertPage(pageMap);
        pages.push(page);
      });
      return this.sortPagesHierarchically(pages);
    }
    /**
     * Sort pages in hierarchical reading order
     * Root pages come first (sorted by order), children follow their parent (also sorted by order)
     * @param pages - Flat array of pages with parentId references
     * @returns Pages sorted in reading order
     */
    sortPagesHierarchically(pages) {
      const childrenMap = /* @__PURE__ */ new Map();
      for (const page of pages) {
        const parentId = page.parentId;
        if (!childrenMap.has(parentId)) {
          childrenMap.set(parentId, []);
        }
        childrenMap.get(parentId).push(page);
      }
      for (const children of childrenMap.values()) {
        children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
      const result = [];
      const addPageAndChildren = (parentId) => {
        const children = childrenMap.get(parentId) || [];
        for (const child of children) {
          result.push(child);
          addPageAndChildren(child.id);
        }
      };
      addPageAndChildren(null);
      return result;
    }
    /**
     * Convert a Y.Map page to ExportPage format
     * @param pageMap - Y.Map representing a page
     * @returns Export page
     */
    convertPage(pageMap) {
      const blocksArray = pageMap.get("blocks");
      const blocks = [];
      if (blocksArray) {
        blocksArray.forEach((blockMap, index) => {
          blocks.push(this.convertBlock(blockMap, index));
        });
        blocks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
      const propsMap = pageMap.get("properties");
      const properties = propsMap ? propsMap.toJSON() : {};
      return {
        id: pageMap.get("id") || pageMap.get("pageId") || "",
        title: pageMap.get("title") || pageMap.get("pageName") || "Page",
        parentId: pageMap.get("parentId") || null,
        order: pageMap.get("order") || 0,
        blocks,
        properties
      };
    }
    /**
     * Convert a Y.Map block to ExportBlock format
     * @param blockMap - Y.Map representing a block
     * @param index - Block index for ordering
     * @returns Export block
     */
    convertBlock(blockMap, index) {
      const componentsArray = blockMap.get("components");
      const components = [];
      if (componentsArray) {
        componentsArray.forEach((compMap, compIndex) => {
          components.push(this.convertComponent(compMap, compIndex));
        });
        components.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
      const propsMap = blockMap.get("properties");
      const rawProps = propsMap ? propsMap.toJSON() : {};
      const properties = {
        visibility: rawProps.visibility,
        teacherOnly: rawProps.teacherOnly,
        allowToggle: rawProps.allowToggle,
        minimized: rawProps.minimized,
        identifier: rawProps.identifier,
        cssClass: rawProps.cssClass
      };
      const iconName = blockMap.get("iconName") || "";
      return {
        id: blockMap.get("id") || blockMap.get("blockId") || `block-${index}`,
        name: blockMap.get("name") || blockMap.get("blockName") || "",
        order: blockMap.get("order") || index,
        components,
        iconName,
        properties
      };
    }
    /**
     * Convert a Y.Map component to ExportComponent format
     * @param compMap - Y.Map representing a component (iDevice)
     * @param index - Component index for ordering
     * @returns Export component
     */
    convertComponent(compMap, index) {
      let content = compMap.get("content") || compMap.get("htmlContent") || compMap.get("htmlView") || "";
      if (content && typeof content === "object" && "toString" in content) {
        content = content.toString();
      }
      const rawJsonProps = compMap.get("jsonProperties");
      let properties = {};
      if (rawJsonProps) {
        if (typeof rawJsonProps === "string") {
          try {
            properties = JSON.parse(rawJsonProps);
          } catch {
          }
        } else if (typeof rawJsonProps === "object" && "toJSON" in rawJsonProps) {
          properties = rawJsonProps.toJSON();
        } else if (typeof rawJsonProps === "object") {
          properties = rawJsonProps;
        }
      }
      const structPropsMap = compMap.get("properties");
      const rawStructProps = structPropsMap ? structPropsMap.toJSON() : {};
      const structureProperties = {
        visibility: rawStructProps.visibility,
        teacherOnly: rawStructProps.teacherOnly,
        identifier: rawStructProps.identifier,
        cssClass: rawStructProps.cssClass
      };
      return {
        id: compMap.get("id") || compMap.get("ideviceId") || `comp-${index}`,
        type: compMap.get("type") || compMap.get("ideviceType") || "FreeTextIdevice",
        order: compMap.get("order") || index,
        content,
        properties,
        structureProperties
      };
    }
    /**
     * Get all unique iDevice types used in the document
     * @returns Array of iDevice type names
     */
    getUsedIdeviceTypes() {
      const types = /* @__PURE__ */ new Set();
      const pages = this.getNavigation();
      for (const page of pages) {
        for (const block of page.blocks) {
          for (const comp of block.components) {
            if (comp.type) {
              types.add(comp.type);
            }
          }
        }
      }
      return Array.from(types);
    }
    /**
     * Get combined HTML content from all pages (for library detection)
     * @returns Combined HTML string
     */
    getAllHtmlContent() {
      const htmlParts = [];
      const pages = this.getNavigation();
      for (const page of pages) {
        for (const block of page.blocks) {
          for (const comp of block.components) {
            if (comp.content) {
              htmlParts.push(comp.content);
            }
          }
        }
      }
      return htmlParts.join("\n");
    }
    /**
     * Generate content.xml from Yjs document structure
     * This enables SCORM exports to include the ODE XML for re-editing
     * @returns ODE-format XML string with DOCTYPE declaration
     */
    async getContentXml() {
      const metadata = this.getMetadata();
      const pages = this.getNavigation();
      return generateOdeXml(metadata, pages);
    }
  };

  // src/shared/export/adapters/BrowserResourceProvider.ts
  var BrowserResourceProvider = class {
    /**
     * Create provider with ResourceFetcher instance
     * @param fetcher - ResourceFetcher instance
     */
    constructor(fetcher) {
      this.fetcher = fetcher;
    }
    /**
     * Fetch theme files
     * @param themeName - Theme name (e.g., 'base', 'blue')
     * @returns Map of path -> content
     */
    async fetchTheme(themeName) {
      const blobMap = await this.fetcher.fetchTheme(themeName);
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Fetch iDevice resources
     * @param ideviceType - iDevice type name
     * @returns Map of path -> content (excluding test files)
     */
    async fetchIdeviceResources(ideviceType) {
      const blobMap = await this.fetcher.fetchIdevice(ideviceType);
      const files = await this.convertBlobMapToUint8ArrayMap(blobMap);
      for (const filePath of files.keys()) {
        if (filePath.endsWith(".test.js") || filePath.endsWith(".spec.js")) {
          files.delete(filePath);
        }
      }
      return files;
    }
    /**
     * Fetch base libraries (jQuery, common.js, etc.)
     * @returns Map of path -> content
     */
    async fetchBaseLibraries() {
      const blobMap = await this.fetcher.fetchBaseLibraries();
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Fetch SCORM API wrapper files
     * @param version - SCORM version: '1.2' or '2004' (files are the same for both)
     * @returns Map of path -> content
     */
    async fetchScormFiles(_version = "1.2") {
      const blobMap = await this.fetcher.fetchScormFiles();
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Fetch specific library files by path
     * @param files - Array of file paths
     * @param patterns - Optional library patterns to identify directory-based libraries
     * @returns Map of path -> content
     */
    async fetchLibraryFiles(files, patterns) {
      const directoriesToInclude = /* @__PURE__ */ new Set();
      if (patterns) {
        for (const lib of patterns) {
          if (lib.isDirectory) {
            for (const file of lib.files) {
              const dirName = file.split("/")[0];
              directoriesToInclude.add(dirName);
            }
          }
        }
      }
      const regularFiles = [];
      const directoriesToFetch = /* @__PURE__ */ new Set();
      for (const file of files) {
        const dirName = file.split("/")[0];
        if (directoriesToInclude.has(dirName)) {
          directoriesToFetch.add(dirName);
        } else {
          regularFiles.push(file);
        }
      }
      const result = /* @__PURE__ */ new Map();
      if (regularFiles.length > 0) {
        const blobMap = await this.fetcher.fetchLibraryFiles(regularFiles);
        const converted = await this.convertBlobMapToUint8ArrayMap(blobMap);
        for (const [filePath, content] of converted) {
          result.set(filePath, content);
        }
      }
      for (const dir of directoriesToFetch) {
        const blobMap = await this.fetcher.fetchLibraryDirectory(dir);
        const converted = await this.convertBlobMapToUint8ArrayMap(blobMap);
        for (const [filePath, content] of converted) {
          if (!filePath.endsWith(".test.js") && !filePath.endsWith(".spec.js")) {
            result.set(filePath, content);
          }
        }
      }
      return result;
    }
    /**
     * Fetch all files in a library directory
     * @param libraryName - Library name (e.g., 'exe_effects')
     * @returns Map of path -> content
     */
    async fetchLibraryDirectory(libraryName) {
      const blobMap = await this.fetcher.fetchLibraryDirectory(libraryName);
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Normalize iDevice type name to directory name
     * @param ideviceType - Raw iDevice type name (e.g., 'FreeTextIdevice')
     * @returns Normalized directory name (e.g., 'text')
     */
    normalizeIdeviceType(ideviceType) {
      return normalizeIdeviceType(ideviceType);
    }
    /**
     * Fetch the eXeLearning "powered by" logo
     * @returns Logo image as Uint8Array, or null if not found
     */
    async fetchExeLogo() {
      const blob = await this.fetcher.fetchExeLogo();
      if (blob) {
        const arrayBuffer = await blob.arrayBuffer();
        return new Uint8Array(arrayBuffer);
      }
      return null;
    }
    /**
     * Fetch content CSS files (base.css, etc.)
     * @returns Map of path -> content
     */
    async fetchContentCss() {
      const blobMap = await this.fetcher.fetchContentCss();
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Fetch global font files for embedding in exports
     * @param fontId - Font identifier (e.g., 'opendyslexic', 'andika', 'nunito', 'playwrite-es')
     * @returns Map of file paths to content (paths like 'fonts/global/opendyslexic/OpenDyslexic-Regular.woff')
     */
    async fetchGlobalFontFiles(fontId) {
      if (!fontId || fontId === "default") {
        return /* @__PURE__ */ new Map();
      }
      const blobMap = await this.fetcher.fetchGlobalFontFiles(fontId);
      return this.convertBlobMapToUint8ArrayMap(blobMap);
    }
    /**
     * Convert Map<string, Blob> to Map<string, Uint8Array>
     * In browser, we convert Blob to ArrayBuffer then to Uint8Array
     * @param blobMap - Map of path -> Blob
     * @returns Map of path -> Uint8Array
     */
    async convertBlobMapToUint8ArrayMap(blobMap) {
      const result = /* @__PURE__ */ new Map();
      const entries = Array.from(blobMap.entries());
      const conversions = entries.map(async ([path, blob]) => {
        const arrayBuffer = await blob.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        return { path, data };
      });
      const converted = await Promise.all(conversions);
      for (const { path, data } of converted) {
        result.set(path, data);
      }
      return result;
    }
  };

  // src/shared/export/adapters/BrowserAssetProvider.ts
  var BrowserAssetProvider = class {
    /**
     * Create provider with AssetCacheManager and/or AssetManager instance
     * @param assetCache - AssetCacheManager instance (legacy, optional)
     * @param assetManager - AssetManager instance (preferred, optional)
     *
     * Note: At least one of assetCache or assetManager should be provided.
     * AssetManager is preferred for getAllAssets() as it contains the actual imported assets.
     */
    constructor(assetCache, assetManager = null) {
      this.assetCache = assetCache;
      this.assetManager = assetManager;
    }
    /**
     * Get asset data by path/id
     * @param assetId - Asset path or ID (e.g., 'abc123/image.png')
     * @returns ExportAsset or null if not found
     */
    async getAsset(assetId) {
      try {
        if (this.assetManager?.getAsset) {
          const asset = await this.assetManager.getAsset(assetId);
          if (asset?.blob) {
            const arrayBuffer = await asset.blob.arrayBuffer();
            return {
              id: asset.id,
              filename: assetId.split("/").pop() || "unknown",
              originalPath: assetId,
              mime: asset.mime || "application/octet-stream",
              data: new Uint8Array(arrayBuffer)
            };
          }
        }
        if (this.assetCache) {
          const cached = await this.assetCache.getAssetByPath(assetId);
          if (cached?.blob) {
            const arrayBuffer = await cached.blob.arrayBuffer();
            const filename = cached.metadata?.filename || assetId.split("/").pop() || "unknown";
            return {
              id: assetId,
              filename,
              originalPath: assetId,
              mime: cached.metadata?.mimeType || "application/octet-stream",
              data: new Uint8Array(arrayBuffer)
            };
          }
        }
        return null;
      } catch (error) {
        console.warn(`[BrowserAssetProvider] Failed to get asset: ${assetId}`, error);
        return null;
      }
    }
    /**
     * Check if an asset exists
     * @param assetPath - Asset path
     * @returns true if asset exists
     */
    async hasAsset(assetPath) {
      try {
        if (this.assetManager?.getAsset) {
          const asset = await this.assetManager.getAsset(assetPath);
          if (asset?.blob) {
            return true;
          }
        }
        if (this.assetCache) {
          const cached = await this.assetCache.getAssetByPath(assetPath);
          return cached !== null && cached.blob !== void 0;
        }
        return false;
      } catch {
        return false;
      }
    }
    /**
     * List all available assets
     * @returns Array of asset paths
     */
    async listAssets() {
      try {
        if (this.assetManager) {
          const assets = await this.assetManager.getProjectAssets();
          return assets.filter((a) => a.originalPath || a.filename).map((a) => a.originalPath || `${a.id}/${a.filename}`);
        }
        if (this.assetCache) {
          const assets = await this.assetCache.getAllAssets();
          return assets.filter((a) => a.metadata?.originalPath).map((a) => a.metadata.originalPath);
        }
        return [];
      } catch (error) {
        console.warn("[BrowserAssetProvider] Failed to list assets:", error);
        return [];
      }
    }
    /**
     * Get all assets as ExportAsset array
     * This is the main method used for exports - it retrieves all project assets
     * and converts them to the ExportAsset format.
     *
     * @returns Array of ExportAsset
     */
    async getAllAssets() {
      const result = [];
      try {
        if (this.assetManager) {
          const projectId = this.assetManager.projectId;
          console.log(`[BrowserAssetProvider] AssetManager available, projectId: ${projectId}`);
          console.log(`[BrowserAssetProvider] Calling getProjectAssets...`);
          const assets = await this.assetManager.getProjectAssets();
          console.log(`[BrowserAssetProvider] Found ${assets.length} assets from AssetManager`);
          if (assets.length > 0) {
            console.log(
              `[BrowserAssetProvider] First asset:`,
              JSON.stringify({
                id: assets[0].id,
                filename: assets[0].filename,
                mime: assets[0].mime,
                hasBlob: !!assets[0].blob
              })
            );
          }
          const assetsWithBlob = assets.filter((asset) => asset.blob);
          const conversions = await Promise.all(
            assetsWithBlob.map(async (asset) => {
              const arrayBuffer = await asset.blob.arrayBuffer();
              return { asset, arrayBuffer };
            })
          );
          for (const { asset, arrayBuffer } of conversions) {
            const assetId = String(asset.id);
            const filename = asset.filename || `asset-${assetId}`;
            let originalPath;
            if (asset.folderPath) {
              originalPath = `${asset.folderPath}/${filename}`;
            } else if (asset.originalPath?.includes(assetId)) {
              originalPath = asset.originalPath;
            } else {
              originalPath = `${assetId}/${filename}`;
            }
            result.push({
              id: assetId,
              filename,
              originalPath,
              folderPath: asset.folderPath || "",
              mime: asset.mime || "application/octet-stream",
              data: new Uint8Array(arrayBuffer)
            });
          }
          if (result.length > 0) {
            console.log(`[BrowserAssetProvider] Converted ${result.length} assets for export`);
            return result;
          } else {
            console.log(`[BrowserAssetProvider] AssetManager returned 0 usable assets (no blobs)`);
            if (this.assetManager.getAllAssetsRaw) {
              console.log(`[BrowserAssetProvider] Trying fallback: getAllAssetsRaw...`);
              const allAssets = await this.assetManager.getAllAssetsRaw();
              if (allAssets.length > 0) {
                console.warn(
                  `[BrowserAssetProvider] FALLBACK: Found ${allAssets.length} assets in DB (different projectIds)`
                );
                const projectIds = [...new Set(allAssets.map((a) => a.projectId))];
                console.warn(`[BrowserAssetProvider] ProjectIds in DB: ${projectIds.join(", ")}`);
                console.warn(`[BrowserAssetProvider] Expected projectId: ${projectId}`);
                const filteredAssets = allAssets.filter((a) => a.projectId === projectId);
                if (filteredAssets.length < allAssets.length) {
                  console.warn(
                    `[BrowserAssetProvider] Filtered out ${allAssets.length - filteredAssets.length} assets from other projects`
                  );
                }
                console.log(
                  `[BrowserAssetProvider] FALLBACK filtered to ${filteredAssets.length} assets matching projectId: ${projectId}`
                );
                for (const asset of filteredAssets) {
                  if (asset.blob) {
                    const arrayBuffer = await asset.blob.arrayBuffer();
                    const assetId = String(asset.id);
                    const filename = asset.filename || `asset-${assetId}`;
                    let originalPath;
                    if (asset.folderPath) {
                      originalPath = `${asset.folderPath}/${filename}`;
                    } else if (asset.originalPath?.includes(assetId)) {
                      originalPath = asset.originalPath;
                    } else {
                      originalPath = `${assetId}/${filename}`;
                    }
                    result.push({
                      id: assetId,
                      filename,
                      originalPath,
                      folderPath: asset.folderPath || "",
                      mime: asset.mime || "application/octet-stream",
                      data: new Uint8Array(arrayBuffer)
                    });
                  }
                }
                if (result.length > 0) {
                  console.log(
                    `[BrowserAssetProvider] FALLBACK converted ${result.length} assets for export`
                  );
                  return result;
                }
              }
            }
          }
        } else {
          console.log(`[BrowserAssetProvider] AssetManager not available`);
          if (this.assetCache) {
            console.log(`[BrowserAssetProvider] Trying legacy AssetCacheManager...`);
            try {
              const assets = await this.assetCache.getAllAssets();
              console.log(
                `[BrowserAssetProvider] Found ${assets.length} assets from AssetCacheManager (legacy)`
              );
              for (const asset of assets) {
                if (asset.blob) {
                  const arrayBuffer = await asset.blob.arrayBuffer();
                  const assetId = String(asset.assetId);
                  const filename = asset.metadata?.filename || `asset-${assetId}`;
                  const originalPath = asset.metadata?.originalPath || `${assetId}/${filename}`;
                  result.push({
                    id: assetId,
                    filename,
                    originalPath,
                    mime: asset.metadata?.mimeType || "application/octet-stream",
                    data: new Uint8Array(arrayBuffer)
                  });
                }
              }
            } catch (legacyError) {
              console.warn("[BrowserAssetProvider] Legacy AssetCacheManager failed:", legacyError);
            }
          }
        }
      } catch (error) {
        console.warn("[BrowserAssetProvider] Failed to get all assets:", error);
      }
      return result;
    }
    /**
     * Get all project assets (alias for getAllAssets)
     * @returns Array of ExportAsset
     */
    async getProjectAssets() {
      return this.getAllAssets();
    }
    /**
     * Resolve asset URL for preview (returns blob URL)
     * @param assetPath - Asset path
     * @returns Blob URL or null
     */
    async resolveAssetUrl(assetPath) {
      try {
        if (this.assetManager?.resolveAssetURL) {
          const url = await this.assetManager.resolveAssetURL(assetPath);
          if (url) return url;
        }
        if (this.assetCache) {
          return await this.assetCache.resolveAssetUrl(assetPath);
        }
        return null;
      } catch {
        return null;
      }
    }
  };

  // src/shared/export/adapters/ExportAssetResolver.ts
  var ExportAssetResolver = class _ExportAssetResolver {
    constructor(options = {}) {
      this.basePath = options.basePath ?? "";
      this.resourceDir = options.resourceDir ?? "content/resources";
    }
    /**
     * Resolve a single asset URL
     */
    resolve(assetUrl) {
      return this.resolveSync(assetUrl);
    }
    /**
     * Synchronous resolution
     */
    resolveSync(assetUrl) {
      if (assetUrl.startsWith("blob:") || assetUrl.startsWith("data:")) {
        return assetUrl;
      }
      if (assetUrl.startsWith("asset://")) {
        const assetPath = assetUrl.slice("asset://".length);
        return `${this.basePath}${this.resourceDir}/${assetPath}`;
      }
      if (assetUrl.includes("{{context_path}}")) {
        return assetUrl.replace("{{context_path}}/", `${this.basePath}${this.resourceDir}/`);
      }
      return assetUrl;
    }
    /**
     * Process HTML content, resolving all asset URLs
     */
    processHtml(html) {
      return this.processHtmlSync(html);
    }
    /**
     * Synchronous HTML processing
     */
    processHtmlSync(html) {
      if (!html) return "";
      let result = html;
      result = result.replace(/\{\{context_path\}\}\/([^"'\s]+)/g, (_match, assetPath) => {
        if (assetPath.startsWith("blob:") || assetPath.startsWith("data:")) {
          return _match;
        }
        return `${this.basePath}${this.resourceDir}/${assetPath}`;
      });
      result = result.replace(/asset:\/\/([^"']+)/g, (_match, assetPath) => {
        if (assetPath.startsWith("blob:") || assetPath.startsWith("data:")) {
          return _match;
        }
        return `${this.basePath}${this.resourceDir}/${assetPath}`;
      });
      result = result.replace(/files\/tmp\/[^"'\s]+\/([^/]+\/[^"'\s]+)/g, (_match, relativePath) => {
        if (relativePath.startsWith("blob:") || relativePath.startsWith("data:")) {
          return _match;
        }
        return `${this.basePath}${this.resourceDir}/${relativePath}`;
      });
      result = result.replace(/["']\/files\/tmp\/[^"']+\/([^"']+)["']/g, (_match, path) => {
        if (path.startsWith("blob:") || path.startsWith("data:")) {
          return _match;
        }
        return `"${this.basePath}${this.resourceDir}/${path}"`;
      });
      return result;
    }
    /**
     * Create a new resolver with a different base path
     */
    withBasePath(basePath) {
      return new _ExportAssetResolver({
        basePath,
        resourceDir: this.resourceDir
      });
    }
  };

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b[i] = start += 1 << eb[i - 1];
    }
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j = b[i]; j < b[i + 1]; ++j) {
        r[j] = j - b[i] << 5 | i;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i = 0;
    var l = new u16(mb);
    for (; i < s; ++i) {
      if (cd[i])
        ++l[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
      le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v = le[cd[i] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flm = /* @__PURE__ */ hMap(flt, 9, 0);
  var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var wbits = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
  };
  var wbits16 = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
    d[o + 2] |= v >> 16;
  };
  var hTree = function(d, mb) {
    var t = [];
    for (var i = 0; i < d.length; ++i) {
      if (d[i])
        t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
      return { t: et, l: 0 };
    if (s == 1) {
      var v = new u8(t[0].s + 1);
      v[t[0].s] = 1;
      return { t: v, l: 1 };
    }
    t.sort(function(a, b) {
      return a.f - b.f;
    });
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l, r };
    while (i1 != s - 1) {
      l = t[t[i0].f < t[i2].f ? i0++ : i2++];
      r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
      t[i1++] = { s: -1, f: l.f + r.f, l, r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
      if (t2[i].s > maxSym)
        maxSym = t2[i].s;
    }
    var tr = new u16(maxSym + 1);
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
      var i = 0, dt = 0;
      var lft = mbt - mb, cst = 1 << lft;
      t2.sort(function(a, b) {
        return tr[b.s] - tr[a.s] || a.f - b.f;
      });
      for (; i < s; ++i) {
        var i2_1 = t2[i].s;
        if (tr[i2_1] > mb) {
          dt += cst - (1 << mbt - tr[i2_1]);
          tr[i2_1] = mb;
        } else
          break;
      }
      dt >>= lft;
      while (dt > 0) {
        var i2_2 = t2[i].s;
        if (tr[i2_2] < mb)
          dt -= 1 << mb - tr[i2_2]++ - 1;
        else
          ++i;
      }
      for (; i >= 0 && dt; --i) {
        var i2_3 = t2[i].s;
        if (tr[i2_3] == mb) {
          --tr[i2_3];
          ++dt;
        }
      }
      mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
  };
  var ln = function(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
  };
  var lc = function(c) {
    var s = c.length;
    while (s && !c[--s])
      ;
    var cl = new u16(++s);
    var cli = 0, cln = c[0], cls = 1;
    var w = function(v) {
      cl[cli++] = v;
    };
    for (var i = 1; i <= s; ++i) {
      if (c[i] == cln && i != s)
        ++cls;
      else {
        if (!cln && cls > 2) {
          for (; cls > 138; cls -= 138)
            w(32754);
          if (cls > 2) {
            w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
            cls = 0;
          }
        } else if (cls > 3) {
          w(cln), --cls;
          for (; cls > 6; cls -= 6)
            w(8304);
          if (cls > 2)
            w(cls - 3 << 5 | 8208), cls = 0;
        }
        while (cls--)
          w(cln);
        cls = 1;
        cln = c[i];
      }
    }
    return { c: cl.subarray(0, cli), n: s };
  };
  var clen = function(cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
      l += cf[i] * cl[i];
    return l;
  };
  var wfblk = function(out, pos, dat) {
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
      out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
  };
  var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
    var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
      ++lcfreq[lclt[i] & 31];
    for (var i = 0; i < lcdt.length; ++i)
      ++lcfreq[lcdt[i] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
      ;
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
      return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
      lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
      var llm = hMap(lct, mlcb, 0);
      wbits(out, p, nlc - 257);
      wbits(out, p + 5, ndc - 1);
      wbits(out, p + 10, nlcc - 4);
      p += 14;
      for (var i = 0; i < nlcc; ++i)
        wbits(out, p + 3 * i, lct[clim[i]]);
      p += 3 * nlcc;
      var lcts = [lclt, lcdt];
      for (var it = 0; it < 2; ++it) {
        var clct = lcts[it];
        for (var i = 0; i < clct.length; ++i) {
          var len = clct[i] & 31;
          wbits(out, p, llm[len]), p += lct[len];
          if (len > 15)
            wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
        }
      }
    } else {
      lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
      var sym = syms[i];
      if (sym > 255) {
        var len = sym >> 18 & 31;
        wbits16(out, p, lm[len + 257]), p += ll[len + 257];
        if (len > 7)
          wbits(out, p, sym >> 23 & 31), p += fleb[len];
        var dst = sym & 31;
        wbits16(out, p, dm[dst]), p += dl[dst];
        if (dst > 3)
          wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
      } else {
        wbits16(out, p, lm[sym]), p += ll[sym];
      }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
  };
  var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var et = /* @__PURE__ */ new u8(0);
  var dflt = function(dat, lvl, plvl, pre, post, st) {
    var s = st.z || dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
    var w = o.subarray(pre, o.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
      if (pos)
        w[0] = st.r >> 3;
      var opt = deo[lvl - 1];
      var n = opt >> 13, c = opt & 8191;
      var msk_1 = (1 << plvl) - 1;
      var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
      var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
      var hsh = function(i2) {
        return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
      };
      var syms = new i32(25e3);
      var lf = new u16(288), df = new u16(32);
      var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
      for (; i + 2 < s; ++i) {
        var hv = hsh(i);
        var imod = i & 32767, pimod = head[hv];
        prev[imod] = pimod;
        head[hv] = imod;
        if (wi <= i) {
          var rem = s - i;
          if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
            pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
            li = lc_1 = eb = 0, bs = i;
            for (var j = 0; j < 286; ++j)
              lf[j] = 0;
            for (var j = 0; j < 30; ++j)
              df[j] = 0;
          }
          var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
          if (rem > 2 && hv == hsh(i - dif)) {
            var maxn = Math.min(n, rem) - 1;
            var maxd = Math.min(32767, i);
            var ml = Math.min(258, rem);
            while (dif <= maxd && --ch_1 && imod != pimod) {
              if (dat[i + l] == dat[i + l - dif]) {
                var nl = 0;
                for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                  ;
                if (nl > l) {
                  l = nl, d = dif;
                  if (nl > maxn)
                    break;
                  var mmd = Math.min(dif, nl - 2);
                  var md = 0;
                  for (var j = 0; j < mmd; ++j) {
                    var ti = i - dif + j & 32767;
                    var pti = prev[ti];
                    var cd = ti - pti & 32767;
                    if (cd > md)
                      md = cd, pimod = ti;
                  }
                }
              }
              imod = pimod, pimod = prev[imod];
              dif += imod - pimod & 32767;
            }
          }
          if (d) {
            syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
            var lin = revfl[l] & 31, din = revfd[d] & 31;
            eb += fleb[lin] + fdeb[din];
            ++lf[257 + lin];
            ++df[din];
            wi = i + l;
            ++lc_1;
          } else {
            syms[li++] = dat[i];
            ++lf[dat[i]];
          }
        }
      }
      for (i = Math.max(i, wi); i < s; ++i) {
        syms[li++] = dat[i];
        ++lf[dat[i]];
      }
      pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
      if (!lst) {
        st.r = pos & 7 | w[pos / 8 | 0] << 3;
        pos -= 7;
        st.h = head, st.p = prev, st.i = i, st.w = wi;
      }
    } else {
      for (var i = st.w || 0; i < s + lst; i += 65535) {
        var e = i + 65535;
        if (e >= s) {
          w[pos / 8 | 0] = lst;
          e = s;
        }
        pos = wfblk(w, pos + 1, dat.subarray(i, e));
      }
      st.i = s;
    }
    return slc(o, 0, pre + shft(pos) + post);
  };
  var crct = /* @__PURE__ */ (function() {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
      var c = i, k = 9;
      while (--k)
        c = (c & 1 && -306674912) ^ c >>> 1;
      t[i] = c;
    }
    return t;
  })();
  var crc = function() {
    var c = -1;
    return {
      p: function(d) {
        var cr = c;
        for (var i = 0; i < d.length; ++i)
          cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
        c = cr;
      },
      d: function() {
        return ~c;
      }
    };
  };
  var dopt = function(dat, opt, pre, post, st) {
    if (!st) {
      st = { l: 1 };
      if (opt.dictionary) {
        var dict = opt.dictionary.subarray(-32768);
        var newDat = new u8(dict.length + dat.length);
        newDat.set(dict);
        newDat.set(dat, dict.length);
        dat = newDat;
        st.w = dict.length;
      }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
  };
  var mrg = function(a, b) {
    var o = {};
    for (var k in a)
      o[k] = a[k];
    for (var k in b)
      o[k] = b[k];
    return o;
  };
  var wbytes = function(d, b, v) {
    for (; v; ++b)
      d[b] = v, v >>>= 8;
  };
  function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
  }
  var fltn = function(d, p, t, o) {
    for (var k in d) {
      var val = d[k], n = p + k, op = o;
      if (Array.isArray(val))
        op = mrg(o, val[1]), val = val[0];
      if (val instanceof u8)
        t[n] = [val, op];
      else {
        t[n += "/"] = [new u8(0), op];
        fltn(val, n, t, o);
      }
    }
  };
  var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  function strToU8(str, latin1) {
    if (latin1) {
      var ar_1 = new u8(str.length);
      for (var i = 0; i < str.length; ++i)
        ar_1[i] = str.charCodeAt(i);
      return ar_1;
    }
    if (te)
      return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function(v) {
      ar[ai++] = v;
    };
    for (var i = 0; i < l; ++i) {
      if (ai + 5 > ar.length) {
        var n = new u8(ai + 8 + (l - i << 1));
        n.set(ar);
        ar = n;
      }
      var c = str.charCodeAt(i);
      if (c < 128 || latin1)
        w(c);
      else if (c < 2048)
        w(192 | c >> 6), w(128 | c & 63);
      else if (c > 55295 && c < 57344)
        c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
      else
        w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
    }
    return slc(ar, 0, ai);
  }
  var exfl = function(ex) {
    var le = 0;
    if (ex) {
      for (var k in ex) {
        var l = ex[k].length;
        if (l > 65535)
          err(9);
        le += l + 4;
      }
    }
    return le;
  };
  var wzh = function(d, b, f, fn, u, c, ce, co) {
    var fl2 = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
    if (ce != null)
      d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2;
    d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
      err(10);
    wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
    if (c != -1) {
      wbytes(d, b, f.crc);
      wbytes(d, b + 4, c < 0 ? -c - 2 : c);
      wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl2);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
      wbytes(d, b, col);
      wbytes(d, b + 6, f.attrs);
      wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl2;
    if (exl) {
      for (var k in ex) {
        var exf = ex[k], l = exf.length;
        wbytes(d, b, +k);
        wbytes(d, b + 2, l);
        d.set(exf, b + 4), b += 4 + l;
      }
    }
    if (col)
      d.set(co, b), b += col;
    return b;
  };
  var wzf = function(o, b, c, d, e) {
    wbytes(o, b, 101010256);
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
  };
  function zipSync(data, opts) {
    if (!opts)
      opts = {};
    var r = {};
    var files = [];
    fltn(data, "", r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
      var _a2 = r[fn], file = _a2[0], p = _a2[1];
      var compression = p.level == 0 ? 0 : 8;
      var f = strToU8(fn), s = f.length;
      var com = p.comment, m = com && strToU8(com), ms = m && m.length;
      var exl = exfl(p.extra);
      if (s > 65535)
        err(11);
      var d = compression ? deflateSync(file, p) : file, l = d.length;
      var c = crc();
      c.p(file);
      files.push(mrg(p, {
        size: file.length,
        crc: c.d(),
        c: d,
        f,
        m,
        u: s != fn.length || m && com.length != ms,
        o,
        compression
      }));
      o += 30 + s + exl + l;
      tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
      var f = files[i];
      wzh(out, f.o, f, f.f, f.u, f.c.length);
      var badd = 30 + f.f.length + exfl(f.extra);
      out.set(f.c, f.o + badd);
      wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
  }

  // src/shared/export/providers/FflateZipProvider.ts
  function toUint8Array(content) {
    if (content instanceof Uint8Array) {
      return content;
    }
    if (typeof content === "string") {
      return new TextEncoder().encode(content);
    }
    throw new Error("Blob content must be converted to Uint8Array before adding to ZIP");
  }
  var FflateZipProvider = class {
    constructor() {
      this.files = /* @__PURE__ */ new Map();
    }
    /**
     * Create a new ZIP archive (returns self for compatibility)
     */
    createZip() {
      this.reset();
      return this;
    }
    /**
     * Add a file to the archive
     */
    addFile(path, content) {
      const data = toUint8Array(content);
      this.files.set(path, data);
    }
    /**
     * Add multiple files from a Map
     */
    addFiles(files) {
      for (const [path, content] of files) {
        this.addFile(path, content);
      }
    }
    /**
     * Generate the ZIP archive (async version for compatibility)
     */
    async generateAsync() {
      return this.generate();
    }
    /**
     * Generate the ZIP archive
     */
    async generate() {
      const zipData = {};
      for (const [path, data] of this.files) {
        zipData[path] = [data, { level: 6 }];
      }
      return zipSync(zipData);
    }
    /**
     * Reset the archive for reuse
     */
    reset() {
      this.files.clear();
    }
    /**
     * Get the number of files in the archive
     */
    getFileCount() {
      return this.files.size;
    }
    /**
     * Check if a file exists in the archive
     */
    hasFile(path) {
      return this.files.has(path);
    }
    /**
     * Get all file paths in the archive
     * Used for generating complete manifest listings (e.g., imsmanifest.xml)
     */
    getFilePaths() {
      return Array.from(this.files.keys());
    }
    /**
     * Get file content (for testing)
     */
    getFile(path) {
      return this.files.get(path);
    }
    /**
     * Get file content as string (for testing)
     */
    getFileAsString(path) {
      const data = this.files.get(path);
      if (!data) return void 0;
      return new TextDecoder().decode(data);
    }
  };

  // src/shared/export/renderers/IdeviceRenderer.ts
  var IdeviceRenderer = class {
    /**
     * Render a single iDevice component to HTML
     * @param component - Component data
     * @param options - Rendering options
     * @returns HTML string
     */
    render(component, options = { basePath: "", includeDataAttributes: true }) {
      const { basePath = "", includeDataAttributes = true, assetExportPathMap } = options;
      const type = component.type || "text";
      const config = getIdeviceConfig(type);
      const ideviceId = component.id;
      const htmlContent = component.content || "";
      const structProps = component.structureProperties || {};
      const jsonProps = component.properties || {};
      const classes = ["idevice_node", config.cssClass];
      if (!htmlContent) {
        classes.push("db-no-data");
      }
      if (structProps.visibility === false || structProps.visibility === "false") {
        classes.push("novisible");
      }
      if (structProps.teacherOnly === true || structProps.teacherOnly === "true" || jsonProps.visibilityType === "teacher") {
        classes.push("teacher-only");
      }
      if (structProps.cssClass && typeof structProps.cssClass === "string") {
        classes.push(structProps.cssClass);
      }
      let dataAttrs = "";
      if (includeDataAttributes) {
        const isPreviewModeForPath = basePath.startsWith("/") || basePath.includes("://");
        const normalizedType = config.cssClass;
        const idevicePath = isPreviewModeForPath ? `${basePath}${normalizedType}/export/` : `${basePath}idevices/${normalizedType}/`;
        dataAttrs = ` data-idevice-path="${this.escapeAttr(idevicePath)}"`;
        dataAttrs += ` data-idevice-type="${this.escapeAttr(normalizedType)}"`;
        const isPreviewModeForUrls = basePath.startsWith("/") || basePath.includes("://");
        if (config.componentType === "json") {
          dataAttrs += ` data-idevice-component-type="json"`;
          const isTextType = normalizedType === "text";
          if (isTextType || Object.keys(jsonProps).length > 0) {
            const transformedProps = isTextType ? { ideviceId } : this.transformPropertiesUrls(jsonProps, basePath, isPreviewModeForUrls, assetExportPathMap);
            const jsonData = JSON.stringify(transformedProps);
            dataAttrs += ` data-idevice-json-data="${this.escapeAttr(jsonData)}"`;
          }
          if (config.template && !isTextType) {
            dataAttrs += ` data-idevice-template="${this.escapeAttr(config.template)}"`;
          }
        }
      }
      const isPreviewMode = basePath.startsWith("/") || basePath.includes("://");
      const fixedContent = this.fixAssetUrls(htmlContent, basePath, isPreviewMode, assetExportPathMap);
      const escapedContent = this.escapePreCodeContent(fixedContent);
      const isTextIdevice = type === "text" || type === "FreeTextIdevice" || type === "TextIdevice";
      const contentHtml = isTextIdevice && escapedContent ? `<div class="exe-text">${escapedContent}</div>` : escapedContent;
      return `<div id="${this.escapeAttr(ideviceId)}" class="${classes.join(" ")}"${dataAttrs}>
${contentHtml}
</div>`;
    }
    /**
     * Render a block with multiple iDevices
     * @param block - Block data
     * @param options - Rendering options
     * @returns HTML string
     */
    renderBlock(block, options = { basePath: "", includeDataAttributes: true }) {
      const { basePath = "", includeDataAttributes = true, themeIconBasePath, assetExportPathMap } = options;
      const blockId = block.id;
      const blockName = block.name || "";
      const components = block.components || [];
      const properties = block.properties || {};
      const iconName = block.iconName || "";
      const classes = ["box"];
      const hasHeader = blockName && blockName.trim() !== "";
      if (!hasHeader) {
        classes.push("no-header");
      }
      if (String(properties.minimized) === "true") {
        classes.push("minimized");
      }
      if (String(properties.visibility) === "false") {
        classes.push("novisible");
      }
      if (String(properties.teacherOnly) === "true" || properties.visibilityType === "teacher") {
        classes.push("teacher-only");
      }
      if (properties.cssClass) {
        classes.push(properties.cssClass);
      }
      const hasIcon = iconName && iconName.trim() !== "";
      const headerClass = hasIcon ? "box-head" : "box-head no-icon";
      let iconHtml = "";
      if (hasIcon) {
        const iconPath = themeIconBasePath ? `${themeIconBasePath}${iconName}.png` : `${basePath}theme/icons/${iconName}.png`;
        iconHtml = `<div class="box-icon exe-icon">
<img src="${this.escapeAttr(iconPath)}" alt="">
</div>
`;
      }
      let toggleHtml = "";
      const shouldShowToggle = properties.allowToggle !== false && properties.allowToggle !== "false";
      if (shouldShowToggle) {
        const toggleClass = properties.minimized === true || properties.minimized === "true" ? "box-toggle box-toggle-off" : "box-toggle box-toggle-on";
        const toggleText = "Toggle content";
        toggleHtml = `<button class="${toggleClass}" title="${this.escapeAttr(toggleText)}">
<span>${this.escapeHtml(toggleText)}</span>
</button>`;
      }
      const titleHtml = hasHeader ? `<h1 class="box-title">${this.escapeHtml(blockName)}</h1>
` : "";
      const headerHtml = `<header class="${headerClass}">
${iconHtml}${titleHtml}${toggleHtml}</header>`;
      let contentHtml = "";
      for (const component of components) {
        contentHtml += this.render(component, { basePath, includeDataAttributes, assetExportPathMap });
      }
      let extraAttrs = "";
      if (properties.identifier) {
        extraAttrs += ` identifier="${this.escapeAttr(properties.identifier)}"`;
      }
      return `<article id="${this.escapeAttr(blockId)}" class="${classes.join(" ")}"${extraAttrs}>
${headerHtml}
<div class="box-content">
${contentHtml}
</div>
</article>`;
    }
    /**
     * Fix asset URLs in HTML content
     * @param content - HTML content
     * @param basePath - Base path prefix
     * @param isPreviewMode - If true, skip asset:// transformation (keep for blob resolution)
     * @param assetExportPathMap - Optional map of asset UUID to export path (for new URL format)
     * @returns Fixed HTML content
     */
    fixAssetUrls(content, basePath, isPreviewMode = false, assetExportPathMap) {
      if (!content) return "";
      let result = content;
      if (!isPreviewMode) {
        result = result.replace(/\{\{context_path\}\}\/([^"'\s]+)/g, (_match, assetPath) => {
          if (assetPath.startsWith("blob:") || assetPath.startsWith("data:")) {
            return _match;
          }
          if (assetPath.startsWith("content/resources/")) {
            return `${basePath}${assetPath}`;
          }
          return `${basePath}content/resources/${assetPath}`;
        });
      }
      if (!isPreviewMode) {
        result = result.replace(/asset:\/\/([^"']+)/gi, (_match, fullPath) => {
          if (fullPath.startsWith("blob:") || fullPath.startsWith("data:")) {
            return _match;
          }
          const newFormatMatch = fullPath.match(/^([a-f0-9-]{36})(?:\.([a-z0-9]+))?$/i);
          if (newFormatMatch) {
            const uuid = newFormatMatch[1];
            if (assetExportPathMap?.has(uuid)) {
              const exportPath2 = assetExportPathMap.get(uuid);
              return `${basePath}content/resources/${exportPath2}`;
            }
            return _match;
          }
          const slashIndex = fullPath.indexOf("/");
          if (slashIndex === -1) {
            return _match;
          }
          const exportPath = fullPath.substring(slashIndex + 1);
          return `${basePath}content/resources/${exportPath}`;
        });
      }
      result = result.replace(/files\/tmp\/[^"'\s]+\/([^/]+\/[^"'\s]+)/g, (_match, relativePath) => {
        if (relativePath.startsWith("blob:") || relativePath.startsWith("data:")) {
          return _match;
        }
        return `${basePath}content/resources/${relativePath}`;
      });
      result = result.replace(/["']\/files\/tmp\/[^"']+\/([^"']+)["']/g, (_match, path) => {
        if (path.startsWith("blob:") || path.startsWith("data:")) {
          return _match;
        }
        return `"${basePath}content/resources/${path}"`;
      });
      result = result.replace(/(src|href)=(["'])resources\/([^"']+)\2/g, (_match, attr, quote, assetPath) => {
        if (assetPath.startsWith("blob:") || assetPath.startsWith("data:")) {
          return _match;
        }
        return `${attr}=${quote}${basePath}content/resources/${assetPath}${quote}`;
      });
      result = result.replace(
        /http:\/\/localhost:\d+\/(files|scripts)\/(perm\/)?([^"'\s]+)/g,
        (_match, prefix, _perm, path) => {
          return `${basePath}files/perm/${path}`;
        }
      );
      return result;
    }
    /**
     * Escape HTML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeHtml(str) {
      if (!str) return "";
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return String(str).replace(/[&<>"']/g, (m) => map[m]);
    }
    /**
     * Unescape HTML entities
     * @param str - String with HTML entities
     * @returns Unescaped string
     */
    unescapeHtml(str) {
      if (!str) return "";
      const map = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#039;": "'",
        "&#39;": "'"
      };
      return String(str).replace(/&(amp|lt|gt|quot|#0?39);/gi, (m) => map[m.toLowerCase()] || m);
    }
    /**
     * Escape HTML entities inside <pre><code>...</code></pre> blocks
     * while preserving the rest of the HTML content.
     * This prevents script tags and other HTML from being executed
     * when shown as example code.
     *
     * @param content - HTML content string
     * @returns HTML with escaped content inside pre>code blocks
     */
    escapePreCodeContent(content) {
      if (!content) return "";
      const PRE_CODE_REGEX = /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/gi;
      return content.replace(PRE_CODE_REGEX, (_match, openTags, innerContent, closeTags) => {
        if (!innerContent.trim()) return openTags + innerContent + closeTags;
        const decoded = this.unescapeHtml(innerContent);
        const escaped = this.escapeHtml(decoded);
        return openTags + escaped + closeTags;
      });
    }
    /**
     * Escape attribute value
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeAttr(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    /**
     * Transform asset URLs in properties object recursively
     * Applies same URL transformation as fixAssetUrls to all string values in the object
     * @param obj - Properties object (can contain nested objects and arrays)
     * @param basePath - Base path prefix
     * @param isPreviewMode - If true, skip asset:// transformation (keep for blob resolution)
     * @param assetExportPathMap - Optional map of asset UUID to export path (for new URL format)
     * @returns Transformed properties object with fixed URLs
     */
    transformPropertiesUrls(obj, basePath, isPreviewMode, assetExportPathMap) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string") {
          result[key] = this.fixAssetUrls(value, basePath, isPreviewMode, assetExportPathMap);
        } else if (Array.isArray(value)) {
          result[key] = value.map((item) => {
            if (typeof item === "string") {
              return this.fixAssetUrls(item, basePath, isPreviewMode, assetExportPathMap);
            } else if (typeof item === "object" && item !== null) {
              return this.transformPropertiesUrls(
                item,
                basePath,
                isPreviewMode,
                assetExportPathMap
              );
            }
            return item;
          });
        } else if (typeof value === "object" && value !== null) {
          result[key] = this.transformPropertiesUrls(
            value,
            basePath,
            isPreviewMode,
            assetExportPathMap
          );
        } else {
          result[key] = value;
        }
      }
      return result;
    }
    /**
     * Get list of CSS link tags needed for given iDevice types
     * @param ideviceTypes - Array of iDevice type names
     * @param basePath - Base path prefix
     * @returns Array of CSS link tags as strings
     */
    getCssLinks(ideviceTypes, basePath = "") {
      const links = [];
      const seen = /* @__PURE__ */ new Set();
      for (const type of ideviceTypes) {
        const config = getIdeviceConfig(type);
        const typeName = config.cssClass;
        if (!seen.has(typeName)) {
          seen.add(typeName);
          const cssFiles = getIdeviceExportFiles(typeName, ".css");
          for (const cssFile of cssFiles) {
            links.push(`<link rel="stylesheet" href="${basePath}idevices/${typeName}/${cssFile}">`);
          }
        }
      }
      return links;
    }
    /**
     * Get list of JS script tags needed for given iDevice types
     * @param ideviceTypes - Array of iDevice type names
     * @param basePath - Base path prefix
     * @returns Array of script tags as strings
     */
    getJsScripts(ideviceTypes, basePath = "") {
      const scripts = [];
      const seen = /* @__PURE__ */ new Set();
      for (const type of ideviceTypes) {
        const config = getIdeviceConfig(type);
        const typeName = config.cssClass;
        if (!seen.has(typeName)) {
          seen.add(typeName);
          const jsFiles = getIdeviceExportFiles(typeName, ".js");
          for (const jsFile of jsFiles) {
            scripts.push(`<script src="${basePath}idevices/${typeName}/${jsFile}"><\/script>`);
          }
        }
      }
      return scripts;
    }
    /**
     * Get list of CSS link info (without full tag) for given iDevice types
     * @param ideviceTypes - Array of iDevice type names
     * @param basePath - Base path prefix
     * @returns Array of link info objects
     */
    getCssLinkInfo(ideviceTypes, basePath = "") {
      const links = [];
      const seen = /* @__PURE__ */ new Set();
      for (const type of ideviceTypes) {
        const config = getIdeviceConfig(type);
        const typeName = config.cssClass;
        if (!seen.has(typeName)) {
          seen.add(typeName);
          const cssFiles = getIdeviceExportFiles(typeName, ".css");
          for (const cssFile of cssFiles) {
            const href = `${basePath}idevices/${typeName}/${cssFile}`;
            links.push({
              href,
              tag: `<link rel="stylesheet" href="${href}">`
            });
          }
        }
      }
      return links;
    }
    /**
     * Get list of JS script info (without full tag) for given iDevice types
     * @param ideviceTypes - Array of iDevice type names
     * @param basePath - Base path prefix
     * @returns Array of script info objects
     */
    getJsScriptInfo(ideviceTypes, basePath = "") {
      const scripts = [];
      const seen = /* @__PURE__ */ new Set();
      for (const type of ideviceTypes) {
        const config = getIdeviceConfig(type);
        const typeName = config.cssClass;
        if (!seen.has(typeName)) {
          seen.add(typeName);
          const jsFiles = getIdeviceExportFiles(typeName, ".js");
          for (const jsFile of jsFiles) {
            const src = `${basePath}idevices/${typeName}/${jsFile}`;
            scripts.push({
              src,
              tag: `<script src="${src}"><\/script>`
            });
          }
        }
      }
      return scripts;
    }
  };

  // src/shared/export/renderers/PageRenderer.ts
  var PageRenderer = class {
    /**
     * @param ideviceRenderer - Renderer for iDevice content
     */
    constructor(ideviceRenderer = null) {
      this.ideviceRenderer = ideviceRenderer || new IdeviceRenderer();
    }
    /**
     * Check if a property value is truthy (handles both boolean and string "true")
     */
    isTruthyProperty(value) {
      return value === true || value === "true";
    }
    /**
     * Check if a property value is falsy (handles both boolean and string "false")
     */
    isFalsyProperty(value) {
      return value === false || value === "false";
    }
    /**
     * Render a complete HTML page
     * @param page - Page data
     * @param options - Rendering options
     * @returns Complete HTML document
     */
    render(page, options) {
      const {
        projectTitle = "eXeLearning",
        language = "en",
        customStyles = "",
        allPages = [],
        basePath = "",
        isIndex = false,
        usedIdevices = [],
        license = "",
        description = "",
        licenseUrl = "",
        // Page counter options
        totalPages,
        currentPageIndex,
        userFooterContent = "",
        // Export options (with defaults)
        addExeLink = true,
        addPagination = false,
        addSearchBox = false,
        addAccessibilityToolbar = false,
        addMathJax = false,
        // Custom head content
        extraHeadContent = "",
        // SCORM-specific options
        isScorm = false,
        scormVersion = "",
        bodyClass = "",
        extraHeadScripts = "",
        onLoadScript = "",
        onUnloadScript = "",
        // Theme files (CSS/JS from theme root directory)
        themeFiles = [],
        // Navigation visibility options (for SCORM/IMS where LMS handles navigation)
        hideNavigation = false,
        hideNavButtons = false,
        // Asset URL transformation map
        assetExportPathMap,
        // Application version for generator meta tag
        version
      } = options;
      const pageTitle = isIndex ? projectTitle : page.title || "Page";
      const originalContent = this.collectPageContent(page);
      const detectedLibraries = this.detectContentLibraries(originalContent);
      const pageContent = this.renderPageContent(page, basePath, projectTitle, assetExportPathMap);
      const total = totalPages ?? allPages.length;
      const currentIdx = currentPageIndex ?? allPages.findIndex((p) => p.id === page.id);
      const bodyClassStr = bodyClass || "exe-export exe-web-site";
      const onLoadAttr = onLoadScript ? ` onload="${onLoadScript}"` : "";
      const onUnloadAttr = onUnloadScript ? ` onunload="${onUnloadScript}" onbeforeunload="${onUnloadScript}"` : "";
      const pageHeaderHtml = this.renderPageHeader(page, {
        projectTitle,
        projectSubtitle: options.projectSubtitle,
        currentPageIndex: currentIdx,
        totalPages: total,
        addPagination
      });
      const searchBoxHtml = addSearchBox ? `<div id="exe-client-search" data-block-order-string="Caja %e" data-no-results-string="Sin resultados.">
</div>` : "";
      const madeWithExeHtml = addExeLink ? this.renderMadeWithEXe() : "";
      const pageFilenameMap = options.pageFilenameMap;
      const navHtml = hideNavigation ? "" : this.renderNavigation(allPages, page.id, basePath, pageFilenameMap);
      const navButtonsHtml = hideNavButtons ? "" : this.renderNavButtons(page, allPages, basePath, language, pageFilenameMap);
      return `<!DOCTYPE html>
<html lang="${language}" id="exe-${isIndex ? "index" : page.id}">
<head>
${this.renderHead({ pageTitle, basePath, usedIdevices, customStyles, extraHeadScripts, isScorm, scormVersion, description, licenseUrl, addAccessibilityToolbar, addMathJax, extraHeadContent, addSearchBox, detectedLibraries, themeFiles, faviconPath: options.faviconPath, faviconType: options.faviconType, version })}
</head>
<body class="${bodyClassStr}"${onLoadAttr}${onUnloadAttr}>
<script>document.body.className+=" js"<\/script>
<div class="exe-content exe-export pre-js siteNav-hidden"> ${navHtml}<main id="${page.id}" class="page"> ${searchBoxHtml}
${pageHeaderHtml}<div id="page-content-${page.id}" class="page-content">
${pageContent}
</div></main>${navButtonsHtml}
${this.renderFooterSection({ license, licenseUrl, userFooterContent })}
</div>
${madeWithExeHtml}
</body>
</html>`;
    }
    /**
     * Render HTML head section
     * Legacy order: SCRIPTS first, then CSS (required for proper initialization)
     * @param options - Head render options
     * @returns HTML head content
     */
    renderHead(options) {
      const {
        pageTitle,
        basePath,
        usedIdevices,
        customStyles,
        extraHeadScripts = "",
        isScorm: _isScorm = false,
        description = "",
        licenseUrl = "",
        addAccessibilityToolbar = false,
        addMathJax = false,
        extraHeadContent = "",
        addSearchBox = false,
        detectedLibraries = [],
        themeFiles = [],
        faviconPath = "libs/favicon.ico",
        faviconType = "image/x-icon",
        version
      } = options;
      let head = `<meta charset="utf-8">
<meta name="generator" content="eXeLearning${version ? ` ${version}` : ""}">
<meta name="viewport" content="width=device-width, initial-scale=1">
${licenseUrl ? `<link rel="license" type="text/html" href="${licenseUrl}">
` : ""}<title>${this.escapeHtml(pageTitle)}</title>`;
      head += `
${this.renderFavicon(basePath, faviconPath, faviconType)}`;
      if (description) {
        head += `
<meta name="description" content="${this.escapeAttr(description)}">`;
      }
      head += `
<script>document.querySelector("html").classList.add("js");<\/script>`;
      head += `<script src="${basePath}libs/jquery/jquery.min.js"> <\/script>`;
      head += `<script src="${basePath}libs/common_i18n.js"> <\/script>`;
      head += `<script src="${basePath}libs/common.js"> <\/script>`;
      head += `<script src="${basePath}libs/exe_export.js"> <\/script>`;
      if (addSearchBox) {
        head += `<script src="${basePath}search_index.js"> <\/script>`;
      }
      head += `<script src="${basePath}libs/bootstrap/bootstrap.bundle.min.js"> <\/script>`;
      head += `<link rel="stylesheet" href="${basePath}libs/bootstrap/bootstrap.min.css">`;
      const jsScripts = this.ideviceRenderer.getJsScripts(usedIdevices, basePath);
      const cssLinks = this.ideviceRenderer.getCssLinks(usedIdevices, basePath);
      for (let i = 0; i < jsScripts.length; i++) {
        head += `
${jsScripts[i]}`;
        if (cssLinks[i]) {
          head += cssLinks[i];
        }
      }
      for (const libName of detectedLibraries) {
        const libPattern = LIBRARY_PATTERNS.find((p) => p.name === libName);
        if (!libPattern) continue;
        const jsFiles = libPattern.files.filter((f) => f.endsWith(".js"));
        const cssFiles = libPattern.files.filter((f) => f.endsWith(".css"));
        for (const jsFile of jsFiles) {
          head += `
<script src="${basePath}libs/${jsFile}"> <\/script>`;
        }
        for (const cssFile of cssFiles) {
          head += `
<link rel="stylesheet" href="${basePath}libs/${cssFile}">`;
        }
      }
      head += `
<link rel="stylesheet" href="${basePath}content/css/base.css">`;
      if (themeFiles.length > 0) {
        const sortedFiles = [...themeFiles].sort();
        const jsFiles = sortedFiles.filter((f) => f.endsWith(".js"));
        const cssFiles = sortedFiles.filter((f) => f.endsWith(".css"));
        for (const jsFile of jsFiles) {
          head += `<script src="${basePath}theme/${jsFile}"> <\/script>`;
        }
        for (const cssFile of cssFiles) {
          head += `<link rel="stylesheet" href="${basePath}theme/${cssFile}">`;
        }
      } else {
        head += `<script src="${basePath}theme/default.js"> <\/script>`;
        head += `<link rel="stylesheet" href="${basePath}theme/content.css">`;
      }
      if (customStyles) {
        head += `
<style>
${customStyles}
</style>`;
      }
      if (addAccessibilityToolbar) {
        head += `
<script src="${basePath}libs/exe_atools/exe_atools.js"> <\/script>`;
        head += `<link rel="stylesheet" href="${basePath}libs/exe_atools/exe_atools.css">`;
      }
      if (addMathJax) {
        head += `
<script src="${basePath}libs/exe_math/tex-mml-svg.js"> <\/script>`;
      }
      if (extraHeadContent) {
        head += `
${extraHeadContent}`;
      }
      if (extraHeadScripts) {
        head += `
${extraHeadScripts}`;
      }
      return head;
    }
    /**
     * Render navigation menu
     * @param allPages - All pages in the project
     * @param currentPageId - ID of the current page
     * @param basePath - Base path for links
     * @returns Navigation HTML
     */
    renderNavigation(allPages, currentPageId, basePath, pageFilenameMap) {
      const rootPages = allPages.filter((p) => !p.parentId);
      let html = '<nav id="siteNav">\n<ul>\n';
      for (const page of rootPages) {
        html += this.renderNavItem(page, allPages, currentPageId, basePath, pageFilenameMap);
      }
      html += "</ul>\n</nav>";
      return html;
    }
    /**
     * Render a single navigation item (recursive for children)
     * @param page - Page to render
     * @param allPages - All pages
     * @param currentPageId - Current page ID
     * @param basePath - Base path
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional)
     * @returns Navigation item HTML
     */
    renderNavItem(page, allPages, currentPageId, basePath, pageFilenameMap) {
      if (!this.isPageVisible(page, allPages)) {
        return "";
      }
      const children = allPages.filter((p) => p.parentId === page.id && this.isPageVisible(p, allPages));
      const isCurrent = page.id === currentPageId;
      const hasChildren = children.length > 0;
      const isAncestor = this.isAncestorOf(page.id, currentPageId, allPages);
      const isFirstPage = page.id === allPages[0]?.id;
      const liClass = isCurrent ? ' class="active"' : isAncestor ? ' class="current-page-parent"' : "";
      const link = this.getPageLink(page, allPages, basePath, pageFilenameMap);
      const linkClasses = [];
      if (isCurrent) linkClasses.push("active");
      if (isFirstPage) linkClasses.push("main-node");
      linkClasses.push(hasChildren ? "daddy" : "no-ch");
      if (this.isPageHighlighted(page)) {
        linkClasses.push("highlighted-link");
      }
      let html = `<li${liClass}>`;
      html += ` <a href="${link}" class="${linkClasses.join(" ")}">${this.escapeHtml(page.title)}</a>
`;
      if (hasChildren) {
        html += '<ul class="other-section">\n';
        for (const child of children) {
          html += this.renderNavItem(child, allPages, currentPageId, basePath, pageFilenameMap);
        }
        html += "</ul>\n";
      }
      html += "</li>\n";
      return html;
    }
    /**
     * Check if a page is an ancestor of another
     * @param ancestorId - Potential ancestor ID
     * @param childId - Child ID
     * @param allPages - All pages
     * @returns True if ancestorId is an ancestor of childId
     */
    isAncestorOf(ancestorId, childId, allPages) {
      const child = allPages.find((p) => p.id === childId);
      if (!child || !child.parentId) return false;
      if (child.parentId === ancestorId) return true;
      return this.isAncestorOf(ancestorId, child.parentId, allPages);
    }
    /**
     * Check if a page is visible in export
     * First page is always visible regardless of visibility setting.
     * If a parent is hidden, all its children are also hidden.
     * @param page - Page to check
     * @param allPages - All pages
     * @returns True if page should be visible
     */
    isPageVisible(page, allPages) {
      if (page.id === allPages[0]?.id) {
        return true;
      }
      if (this.isFalsyProperty(page.properties?.visibility)) {
        return false;
      }
      if (page.parentId) {
        const parent = allPages.find((p) => p.id === page.parentId);
        if (parent && !this.isPageVisible(parent, allPages)) {
          return false;
        }
      }
      return true;
    }
    /**
     * Filter pages to only include visible ones
     * @param pages - All pages
     * @returns Pages that should be visible in navigation and exports
     */
    getVisiblePages(pages) {
      return pages.filter((page) => this.isPageVisible(page, pages));
    }
    /**
     * Check if a page has highlight property enabled
     * @param page - Page to check
     * @returns True if page should be highlighted in navigation
     */
    isPageHighlighted(page) {
      return this.isTruthyProperty(page.properties?.highlight);
    }
    /**
     * Check if a page's title should be hidden
     * @param page - Page to check
     * @returns True if page title should be hidden
     */
    shouldHidePageTitle(page) {
      return this.isTruthyProperty(page.properties?.hidePageTitle);
    }
    /**
     * Get effective page title (respects editableInPage + titlePage properties)
     * If editableInPage is true and titlePage is set, use titlePage
     * Otherwise use the default page title
     * @param page - Page to get title for
     * @returns Effective title string
     */
    getEffectivePageTitle(page) {
      if (this.isTruthyProperty(page.properties?.editableInPage)) {
        const titlePage = page.properties?.titlePage;
        if (titlePage) return titlePage;
      }
      return page.title;
    }
    /**
     * Get page link URL
     * @param page - Page
     * @param allPages - All pages
     * @param basePath - Base path
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     * @returns Link URL
     */
    getPageLink(page, allPages, basePath, pageFilenameMap) {
      const isFirstPage = page.id === allPages[0]?.id;
      if (isFirstPage) {
        return basePath ? `${basePath}index.html` : "index.html";
      }
      const mapFilename = pageFilenameMap?.get(page.id);
      const filename = mapFilename || `${this.sanitizeFilename(page.title)}.html`;
      return `${basePath}html/${filename}`;
    }
    /**
     * Sanitize title for use as filename
     * @param title - Title to sanitize
     * @returns Sanitized filename
     */
    sanitizeFilename(title) {
      if (!title) return "page";
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
    }
    /**
     * Render page header with page counter, package title (h1), subtitle, and page title (h2)
     * @param page - Page
     * @param options - Header options including counter info
     * @returns Header HTML
     */
    renderPageHeader(page, options) {
      const { projectTitle, projectSubtitle, currentPageIndex, totalPages, addPagination } = options;
      const pageCounterHtml = addPagination ? ` <p class="page-counter"> <span class="page-counter-label">P\xE1gina </span><span class="page-counter-content"> <strong class="page-counter-current-page">${currentPageIndex + 1}</strong><span class="page-counter-sep">/</span><strong class="page-counter-total">${totalPages}</strong></span></p>
` : "";
      const hideTitle = this.shouldHidePageTitle(page);
      const effectiveTitle = this.getEffectivePageTitle(page);
      const pageTitleClass = hideTitle ? "page-title sr-av" : "page-title";
      const subtitleHtml = projectSubtitle ? `
<p class="package-subtitle">${this.escapeHtml(projectSubtitle)}</p>` : "";
      return `<header class="main-header">${pageCounterHtml}
<div class="package-header"><h1 class="package-title">${this.escapeHtml(projectTitle)}</h1>${subtitleHtml}</div>
<div class="page-header"><h2 class="${pageTitleClass}">${this.escapeHtml(effectiveTitle)}</h2></div>
</header>`;
    }
    /**
     * Render page content (blocks with iDevices)
     * @param page - Page
     * @param basePath - Base path
     * @param projectTitle - Project title (for exe-package:elp transformation)
     * @param assetExportPathMap - Map of asset UUID to export path for URL transformation
     * @returns Content HTML
     */
    renderPageContent(page, basePath, projectTitle, assetExportPathMap) {
      let html = "";
      for (const block of page.blocks || []) {
        html += this.ideviceRenderer.renderBlock(block, {
          basePath,
          includeDataAttributes: true,
          assetExportPathMap
        });
      }
      if (projectTitle) {
        html = this.replaceElpxProtocol(html, projectTitle);
      }
      return html;
    }
    /**
     * Collect all content from a page's components (for library detection)
     * @param page - Page to collect content from
     * @returns Combined HTML content from all components
     */
    collectPageContent(page) {
      const parts = [];
      for (const block of page.blocks || []) {
        for (const component of block.components || []) {
          if (component.content) {
            parts.push(component.content);
          }
        }
      }
      return parts.join("\n");
    }
    /**
     * Replace exe-package:elp protocol with client-side download handler
     * This enables the download-source-file iDevice to generate ELPX files on-the-fly
     *
     * @param content - HTML content
     * @param projectTitle - Project title for the download filename
     * @returns Content with exe-package:elp replaced with onclick handler
     */
    replaceElpxProtocol(content, projectTitle) {
      if (!content || !content.includes("exe-package:elp")) {
        return content;
      }
      let result = content.replace(
        /href="exe-package:elp"/g,
        `href="#" onclick="if(typeof downloadElpx==='function')downloadElpx();return false;"`
      );
      const safeTitle = this.escapeHtml(projectTitle);
      result = result.replace(/download="exe-package:elp-name"/g, `download="${safeTitle}.elpx"`);
      return result;
    }
    /**
     * Render navigation buttons (prev/next links)
     * Outputs English text with data-i18n attributes for runtime translation via $exe_i18n.
     * @param page - Current page
     * @param allPages - All pages
     * @param basePath - Base path
     * @param _language - Deprecated, translation now happens at runtime via $exe_i18n
     * @returns Navigation buttons HTML
     */
    renderNavButtons(page, allPages, basePath, _language = "en", pageFilenameMap) {
      const currentIndex = allPages.findIndex((p) => p.id === page.id);
      const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
      const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
      const parts = ['<div class="nav-buttons">'];
      if (prevPage) {
        const link = this.getPageLink(prevPage, allPages, basePath, pageFilenameMap);
        parts.push(
          `<a href="${link}" title="Previous" class="nav-button nav-button-left"><span>Previous</span></a>`
        );
      } else {
        parts.push('<span class="nav-button nav-button-left" aria-hidden="true"><span>Previous</span></span>');
      }
      if (nextPage) {
        const link = this.getPageLink(nextPage, allPages, basePath, pageFilenameMap);
        parts.push(`<a href="${link}" title="Next" class="nav-button nav-button-right"><span>Next</span></a>`);
      } else {
        parts.push('<span class="nav-button nav-button-right" aria-hidden="true"><span>Next</span></span>');
      }
      parts.push("</div>");
      return parts.join("\n");
    }
    /**
     * Render pagination (prev/next links) - legacy method kept for backward compatibility
     * @param page - Current page
     * @param allPages - All pages
     * @param basePath - Base path
     * @param language - Language for button text translation
     * @returns Pagination HTML
     * @deprecated Use renderNavButtons instead
     */
    renderPagination(page, allPages, basePath, language = "en") {
      return this.renderNavButtons(page, allPages, basePath, language);
    }
    /**
     * Render complete footer section with license and optional user content
     * @param options - Footer options
     * @returns Footer HTML with siteFooter wrapper
     */
    renderFooterSection(options) {
      const { license, licenseUrl = "", userFooterContent } = options;
      let userFooterHtml = "";
      if (userFooterContent) {
        userFooterHtml = `<div id="siteUserFooter"> <div>${userFooterContent}</div>
</div>`;
      }
      if (!shouldShowLicenseFooter(license)) {
        return `<footer id="siteFooter"><div id="siteFooterContent">${userFooterHtml}</div></footer>`;
      }
      const licenseText = formatLicenseText(license);
      const licenseClass = getLicenseClass(license);
      const licenseContent = licenseUrl ? `<a href="${licenseUrl}" class="license">${licenseText}</a>` : `<span class="license">${licenseText}</span>`;
      return `<footer id="siteFooter"><div id="siteFooterContent"> <div id="packageLicense" class="${licenseClass}"> <p> <span class="license-label">Licencia: </span>${licenseContent}</p>
</div>
${userFooterHtml}</div></footer>`;
    }
    /**
     * Render "Made with eXeLearning" credit
     * @returns Made with eXe HTML
     */
    renderMadeWithEXe() {
      return `<p id="made-with-eXe"> <a href="https://exelearning.net/" target="_blank" rel="noopener"> <span>Creado con eXeLearning <span>(nueva ventana)</span></span></a></p>`;
    }
    /**
     * Render license div (inside main, before pagination)
     * @param options - License options
     * @returns License HTML
     * @deprecated Use renderFooterSection instead
     */
    renderLicense(options) {
      const { license, licenseUrl = "" } = options;
      if (!shouldShowLicenseFooter(license)) {
        return "";
      }
      const licenseContent = licenseUrl ? `<a rel="license" href="${licenseUrl}">${this.escapeHtml(license)}</a>` : `<span>${this.escapeHtml(license)}</span>`;
      return `<div id="packageLicense" class="${getLicenseClass(license)}">
<p><span>Licensed under the</span> ${licenseContent}</p>
</div>`;
    }
    /**
     * Render footer section (legacy method, kept for backward compatibility)
     * @param options - Footer options
     * @returns Footer HTML
     * @deprecated Use renderFooterSection instead
     */
    renderFooter(options) {
      return this.renderLicense({ ...options, licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" });
    }
    /**
     * Generate search data JSON for client-side search functionality
     * @param allPages - All pages in the project
     * @param _basePath - Base path for URLs (unused but kept for API compatibility)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     * @returns JSON string with page structure
     */
    generateSearchData(allPages, _basePath, pageFilenameMap) {
      const pagesData = {};
      for (let i = 0; i < allPages.length; i++) {
        const page = allPages[i];
        const isIndex = i === 0;
        const prevPage = i > 0 ? allPages[i - 1] : null;
        const nextPage = i < allPages.length - 1 ? allPages[i + 1] : null;
        const mapFilename = pageFilenameMap?.get(page.id);
        const fileName = isIndex ? "index.html" : mapFilename || `${this.sanitizeFilename(page.title)}.html`;
        const fileUrl = isIndex ? "index.html" : `html/${fileName}`;
        const blocksData = {};
        for (const block of page.blocks || []) {
          const idevicesData = {};
          for (let j = 0; j < (block.components || []).length; j++) {
            const component = block.components[j];
            idevicesData[component.id] = {
              order: j + 1,
              htmlView: component.content || "",
              jsonProperties: JSON.stringify(component.properties || {})
            };
          }
          blocksData[block.id] = {
            name: block.name || "",
            order: block.order || 1,
            idevices: idevicesData
          };
        }
        pagesData[page.id] = {
          name: page.title,
          isIndex,
          fileName,
          fileUrl,
          prePageId: prevPage?.id || null,
          nextPageId: nextPage?.id || null,
          blocks: blocksData
        };
      }
      return JSON.stringify(pagesData);
    }
    /**
     * Generate the content for search_index.js file
     * @param allPages - All pages in the project
     * @param basePath - Base path for URLs
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     * @returns JavaScript file content with window.exeSearchData assignment
     */
    generateSearchIndexFile(allPages, basePath, pageFilenameMap) {
      const searchDataJson = this.generateSearchData(allPages, basePath, pageFilenameMap);
      return `window.exeSearchData = ${searchDataJson};`;
    }
    /**
     * Render favicon link tag
     * @param basePath - Base path for links
     * @param faviconPath - Path to favicon file
     * @param faviconType - MIME type of favicon
     * @returns Link tag HTML
     */
    renderFavicon(basePath, faviconPath = "libs/favicon.ico", faviconType = "image/x-icon") {
      const faviconHref = `${basePath}${faviconPath}`;
      return `<link rel="icon" type="${this.escapeAttr(faviconType)}" href="${this.escapeAttr(faviconHref)}">`;
    }
    /**
     * Render a single-page HTML document with all pages
     * @param allPages - All pages in the project
     * @param options - Rendering options
     * @returns Complete HTML document
     */
    renderSinglePage(allPages, options = {}) {
      const {
        projectTitle = "eXeLearning",
        projectSubtitle = "",
        language = "en",
        customStyles = "",
        usedIdevices = [],
        license = "",
        licenseUrl = "",
        faviconPath = "libs/favicon.ico",
        faviconType = "image/x-icon",
        addExeLink = true,
        userFooterContent = "",
        version
      } = options;
      let contentHtml = "";
      for (const page of allPages) {
        const hideTitle = this.shouldHidePageTitle(page);
        const effectiveTitle = this.getEffectivePageTitle(page);
        const pageTitleClass = hideTitle ? "page-title sr-av" : "page-title";
        contentHtml += `<section>
<header class="main-header">
<div class="page-header">
<h1 class="${pageTitleClass}">${this.escapeHtml(effectiveTitle)}</h1>
</div>
</header>
<div class="page-content">
${this.renderPageContent(page, "", projectTitle)}
</div>
</section>
`;
      }
      const jsScripts = this.ideviceRenderer.getJsScripts(usedIdevices, "");
      const cssLinks = this.ideviceRenderer.getCssLinks(usedIdevices, "");
      let ideviceIncludes = "";
      for (let i = 0; i < jsScripts.length; i++) {
        ideviceIncludes += `
${jsScripts[i]}`;
        if (cssLinks[i]) {
          ideviceIncludes += cssLinks[i];
        }
      }
      return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="generator" content="eXeLearning${version ? ` ${version}` : ""}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${this.escapeHtml(projectTitle)}</title>
<script>document.querySelector("html").classList.add("js");<\/script>
<script src="libs/jquery/jquery.min.js"> <\/script>
<script src="libs/common_i18n.js"> <\/script>
<script src="libs/common.js"> <\/script>
<script src="libs/exe_export.js"> <\/script>
<script src="libs/bootstrap/bootstrap.bundle.min.js"> <\/script>
<link rel="stylesheet" href="libs/bootstrap/bootstrap.min.css">${ideviceIncludes}
<link rel="stylesheet" href="content/css/base.css">
<script src="theme/style.js"> <\/script>
<link rel="stylesheet" href="theme/style.css">
${this.renderFavicon("", faviconPath, faviconType)}
${customStyles ? `<style>
${customStyles}
</style>` : ""}
</head>
<body class="exe-export exe-single-page">
<script>document.body.className+=" js"<\/script>
<div class="exe-content exe-export pre-js siteNav-hidden">
<main class="page">
<header class="package-header"><h1 class="package-title">${this.escapeHtml(projectTitle)}</h1>${projectSubtitle ? `
<p class="package-subtitle">${this.escapeHtml(projectSubtitle)}</p>` : ""}</header>
${contentHtml}
</main>
${this.renderFooterSection({ license, licenseUrl, userFooterContent })}
</div>
${addExeLink ? this.renderMadeWithEXe() : ""}
</body>
</html>`;
    }
    /**
     * Render navigation for single-page export (anchor links)
     * @param allPages - All pages
     * @returns Navigation HTML
     */
    renderSinglePageNav(allPages) {
      const rootPages = allPages.filter((p) => !p.parentId);
      let html = '<nav id="siteNav" class="single-page-nav">\n<ul>\n';
      for (const page of rootPages) {
        html += this.renderSinglePageNavItem(page, allPages);
      }
      html += "</ul>\n</nav>";
      return html;
    }
    /**
     * Render a single navigation item for single-page (anchor links)
     * @param page - Page
     * @param allPages - All pages
     * @returns Navigation item HTML
     */
    renderSinglePageNavItem(page, allPages) {
      if (!this.isPageVisible(page, allPages)) {
        return "";
      }
      const children = allPages.filter((p) => p.parentId === page.id && this.isPageVisible(p, allPages));
      const hasChildren = children.length > 0;
      const linkClasses = [];
      linkClasses.push(hasChildren ? "daddy" : "no-ch");
      if (this.isPageHighlighted(page)) {
        linkClasses.push("highlighted-link");
      }
      let html = "<li>";
      html += ` <a href="#section-${page.id}" class="${linkClasses.join(" ")}">${this.escapeHtml(page.title)}</a>
`;
      if (hasChildren) {
        html += '<ul class="other-section">\n';
        for (const child of children) {
          html += this.renderSinglePageNavItem(child, allPages);
        }
        html += "</ul>\n";
      }
      html += "</li>\n";
      return html;
    }
    /**
     * Detect content-based libraries from HTML content
     * Scans the content for patterns that indicate specific libraries are needed
     * @param html - HTML content to scan
     * @returns Array of library names detected
     */
    detectContentLibraries(html) {
      const detectedLibs = /* @__PURE__ */ new Set();
      for (const lib of LIBRARY_PATTERNS) {
        let found = false;
        switch (lib.type) {
          case "class":
            found = html.includes(`class="${lib.pattern}"`) || html.includes(`class='${lib.pattern}'`) || new RegExp(`class="[^"]*\\b${lib.pattern}\\b[^"]*"`, "i").test(html) || new RegExp(`class='[^']*\\b${lib.pattern}\\b[^']*'`, "i").test(html);
            break;
          case "rel":
            found = html.includes(`rel="${lib.pattern}"`) || html.includes(`rel='${lib.pattern}'`);
            break;
          case "data":
            found = html.includes(`data-${lib.pattern}`) || html.includes(`data-${lib.pattern}=`);
            break;
          case "regex":
            found = lib.pattern.test(html);
            break;
        }
        if (found) {
          detectedLibs.add(lib.name);
        }
      }
      return Array.from(detectedLibs);
    }
    /**
     * Escape HTML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeHtml(str) {
      if (!str) return "";
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return String(str).replace(/[&<>"']/g, (m) => map[m]);
    }
    /**
     * Escape attribute value for use in HTML attributes
     * @param str - String to escape
     * @returns Escaped string safe for attribute values
     */
    escapeAttr(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  };

  // src/shared/export/utils/LibraryDetector.ts
  var LibraryDetector = class {
    constructor() {
      this.detectedLibraries = /* @__PURE__ */ new Set();
      this.filesToInclude = /* @__PURE__ */ new Set();
      this.detectedPatterns = [];
    }
    /**
     * Detect all required libraries by scanning HTML content
     * @param html - HTML content to scan
     * @param options - Detection options
     * @returns Detected libraries info
     */
    detectLibraries(html, options = {}) {
      this.detectedLibraries.clear();
      this.filesToInclude.clear();
      this.detectedPatterns = [];
      if (!html || typeof html !== "string") {
        return this._buildResult();
      }
      for (const lib of LIBRARY_PATTERNS) {
        if (options.skipMathJax && (lib.name === "exe_math" || lib.name === "exe_math_datagame")) {
          continue;
        }
        if (this._matchesPattern(html, lib)) {
          if (lib.requiresLatexCheck) {
            if (!this._hasLatexInDataGame(html)) {
              continue;
            }
          }
          this._addLibrary(lib);
        }
      }
      if (options.includeAccessibilityToolbar) {
        const atoolsLib = LIBRARY_PATTERNS.find((l) => l.name === "exe_atools");
        if (atoolsLib) {
          this._addLibrary(atoolsLib);
        }
      }
      if (options.includeMathJax) {
        const mathLib = LIBRARY_PATTERNS.find((l) => l.name === "exe_math");
        if (mathLib) {
          this._addLibrary(mathLib);
        }
      }
      return this._buildResult();
    }
    /**
     * Check if HTML matches a library pattern
     * @param html - HTML content
     * @param lib - Library pattern definition
     * @returns True if pattern matches
     */
    _matchesPattern(html, lib) {
      switch (lib.type) {
        case "class":
          return new RegExp(`class="[^"]*${this._escapeRegex(lib.pattern)}[^"]*"`, "i").test(html);
        case "rel":
          return new RegExp(`rel="[^"]*${this._escapeRegex(lib.pattern)}[^"]*"`, "i").test(html);
        case "regex":
          return lib.pattern.test(html);
        default:
          return false;
      }
    }
    /**
     * Check if DataGame content contains LaTeX after decryption
     * @param html - HTML content
     * @returns True if LaTeX is found in decrypted DataGame content
     */
    _hasLatexInDataGame(html) {
      const match = html.match(/<div[^>]*class="[^"]*DataGame[^"]*"[^>]*>(.*?)<\/div>/s);
      if (!match) return false;
      const decrypted = this._decrypt(match[1]);
      return /\\\(|\\\[/.test(decrypted);
    }
    /**
     * Decrypt XOR-encoded string (matches Symfony's decrypt method)
     * @param str - Encrypted string
     * @returns Decrypted string
     */
    _decrypt(str) {
      if (!str || str === "undefined" || str === "null") return "";
      try {
        str = decodeURIComponent(str);
        const key = 146;
        let result = "";
        for (let i = 0; i < str.length; i++) {
          result += String.fromCharCode(key ^ str.charCodeAt(i));
        }
        return result;
      } catch {
        return "";
      }
    }
    /**
     * Add a library and its files to the detected set
     * @param lib - Library pattern
     */
    _addLibrary(lib) {
      if (this.detectedLibraries.has(lib.name)) return;
      this.detectedLibraries.add(lib.name);
      this.detectedPatterns.push(lib);
      for (const file of lib.files) {
        this.filesToInclude.add(file);
      }
    }
    /**
     * Build the result object
     * @returns Detection result
     */
    _buildResult() {
      const libraries = [];
      for (const lib of LIBRARY_PATTERNS) {
        if (this.detectedLibraries.has(lib.name)) {
          libraries.push({
            name: lib.name,
            files: lib.files
          });
        }
      }
      return {
        libraries,
        files: Array.from(this.filesToInclude),
        count: libraries.length,
        patterns: this.detectedPatterns
      };
    }
    /**
     * Get base libraries (always included)
     * @returns Array of base library file paths
     */
    getBaseLibraries() {
      return [...BASE_LIBRARIES];
    }
    /**
     * Get SCORM-specific libraries
     * @returns Array of SCORM library file paths
     */
    getScormLibraries() {
      return [...SCORM_LIBRARIES];
    }
    /**
     * Get all files needed for export (base + detected)
     * @param html - HTML content to scan
     * @param options - Options
     * @returns Array of file paths
     */
    getAllRequiredFiles(html, options = {}) {
      return this.getAllRequiredFilesWithPatterns(html, options).files;
    }
    /**
     * Get all files needed for export with pattern information
     * @param html - HTML content to scan
     * @param options - Options
     * @returns Object with files and patterns for directory-based libraries
     */
    getAllRequiredFilesWithPatterns(html, options = {}) {
      const detected = this.detectLibraries(html, options);
      const files = new Set(this.getBaseLibraries());
      for (const file of detected.files) {
        files.add(file);
      }
      if (options.includeScorm) {
        for (const file of this.getScormLibraries()) {
          files.add(file);
        }
      }
      return {
        files: Array.from(files),
        patterns: detected.patterns
      };
    }
    /**
     * Group files by type for HTML head generation
     * @param files - Array of file paths
     * @returns Object with js and css arrays
     */
    groupFilesByType(files) {
      const js = [];
      const css = [];
      for (const file of files) {
        const ext = file.split(".").pop()?.toLowerCase();
        if (ext === "js") {
          js.push(file);
        } else if (ext === "css") {
          css.push(file);
        }
      }
      return { js, css };
    }
    /**
     * Escape special regex characters in a string
     * @param str - String to escape
     * @returns Escaped string
     */
    _escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  };

  // src/shared/export/exporters/BaseExporter.ts
  var BaseExporter = class {
    constructor(document2, resources, assets, zip2) {
      // Cache for asset filename lookups
      this.assetFilenameMap = null;
      // Cache for asset export path lookups (folderPath-based)
      this.assetExportPathMap = null;
      this.document = document2;
      this.resources = resources;
      this.assets = assets;
      this.zip = zip2;
      this.ideviceRenderer = new IdeviceRenderer();
      this.pageRenderer = new PageRenderer(this.ideviceRenderer);
      this.libraryDetector = new LibraryDetector();
    }
    // =========================================================================
    // Structure Access Methods
    // =========================================================================
    /**
     * Get project metadata
     */
    getMetadata() {
      return this.document.getMetadata();
    }
    /**
     * Get navigation structure (pages)
     */
    getNavigation() {
      return this.document.getNavigation();
    }
    /**
     * Build a flat list of pages from the navigation structure
     */
    buildPageList() {
      return this.getNavigation();
    }
    /**
     * Get list of unique iDevice types used in the project
     */
    getUsedIdevices(pages) {
      const types = /* @__PURE__ */ new Set();
      for (const page of pages) {
        for (const block of page.blocks || []) {
          for (const component of block.components || []) {
            if (component.type) {
              types.add(component.type);
            }
          }
        }
      }
      return Array.from(types);
    }
    /**
     * Get list of iDevice types used in a specific page
     */
    getUsedIdevicesForPage(page) {
      const types = /* @__PURE__ */ new Set();
      for (const block of page.blocks || []) {
        for (const component of block.components || []) {
          if (component.type) {
            types.add(component.type);
          }
        }
      }
      return Array.from(types);
    }
    /**
     * Get root pages (pages without parent)
     */
    getRootPages(pages) {
      return pages.filter((p) => !p.parentId);
    }
    /**
     * Get child pages of a given page
     */
    getChildPages(parentId, pages) {
      return pages.filter((p) => p.parentId === parentId);
    }
    // =========================================================================
    // String Utilities
    // =========================================================================
    /**
     * Escape XML special characters
     */
    escapeXml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    /**
     * Escape content for use in CDATA sections
     * CDATA cannot contain the sequence ]]> as it closes the CDATA block.
     * We split it into multiple CDATA sections when this sequence appears.
     */
    escapeCdata(str) {
      if (!str) return "";
      return String(str).replace(/\]\]>/g, "]]]]><![CDATA[>");
    }
    /**
     * Escape HTML special characters
     */
    escapeHtml(str) {
      if (!str) return "";
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return String(str).replace(/[&<>"']/g, (m) => map[m]);
    }
    /**
     * Sanitize string for use as filename (with accent normalization)
     */
    sanitizeFilename(str, maxLength = 50) {
      if (!str) return "export";
      return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, maxLength);
    }
    /**
     * Sanitize page title for use as filename (with accent normalization)
     */
    sanitizePageFilename(title) {
      if (!title) return "page";
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
    }
    /**
     * Generate unique identifier with optional prefix
     */
    generateId(prefix = "") {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 8);
      return `${prefix}${timestamp}${random}`.toUpperCase();
    }
    // =========================================================================
    // File Handling
    // =========================================================================
    /**
     * Build export filename from metadata
     */
    buildFilename() {
      const meta = this.getMetadata();
      const title = meta.title || "export";
      const sanitized = this.sanitizeFilename(title);
      return `${sanitized}${this.getFileSuffix()}${this.getFileExtension()}`;
    }
    /**
     * Add assets to ZIP
     */
    async addAssetsToZip(prefix = "") {
      let assetsAdded = 0;
      try {
        const assets = await this.assets.getAllAssets();
        for (const asset of assets) {
          const assetId = asset.id;
          const filename = asset.filename || `asset-${assetId}`;
          const assetPath = asset.originalPath || `${assetId}/${filename}`;
          const zipPath = prefix ? `${prefix}${assetPath}` : assetPath;
          this.zip.addFile(zipPath, asset.data);
          assetsAdded++;
        }
      } catch (e) {
        console.warn("[BaseExporter] Failed to add assets to ZIP:", e);
      }
      return assetsAdded;
    }
    /**
     * Add assets to ZIP with content/resources/ prefix
     * Uses folderPath-based structure for cleaner exports
     * @param trackingList - Optional array to track added file paths (for ELPX manifest)
     */
    async addAssetsToZipWithResourcePath(trackingList) {
      let assetsAdded = 0;
      try {
        const assets = await this.assets.getAllAssets();
        const exportPathMap = await this.buildAssetExportPathMap();
        console.log(`[BaseExporter] addAssetsToZipWithResourcePath: Found ${assets.length} assets to add`);
        for (const asset of assets) {
          const exportPath = exportPathMap.get(asset.id);
          if (!exportPath) {
            console.warn(`[BaseExporter] No export path for asset: ${asset.id}`);
            continue;
          }
          console.log(`[BaseExporter] Adding asset: ${asset.id} -> content/resources/${exportPath}`);
          const zipPath = `content/resources/${exportPath}`;
          this.zip.addFile(zipPath, asset.data);
          if (trackingList) trackingList.push(zipPath);
          assetsAdded++;
        }
      } catch (e) {
        console.warn("[BaseExporter] Failed to add assets to ZIP:", e);
      }
      return assetsAdded;
    }
    // =========================================================================
    // Navigation Helpers
    // =========================================================================
    /**
     * Check if a page is an ancestor of another page
     */
    isAncestorOf(potentialAncestor, childId, allPages) {
      const child = allPages.find((p) => p.id === childId);
      if (!child || !child.parentId) return false;
      if (child.parentId === potentialAncestor.id) return true;
      return this.isAncestorOf(potentialAncestor, child.parentId, allPages);
    }
    /**
     * Get page link (index.html for first page, id.html for others)
     */
    getPageLink(page, allPages, extension = ".html") {
      if (page.id === allPages[0]?.id) {
        return `index${extension}`;
      }
      return `${page.id}${extension}`;
    }
    /**
     * Get previous page in flat list
     */
    getPreviousPage(currentPage, allPages) {
      const currentIndex = allPages.findIndex((p) => p.id === currentPage.id);
      return currentIndex > 0 ? allPages[currentIndex - 1] : null;
    }
    /**
     * Get next page in flat list
     */
    getNextPage(currentPage, allPages) {
      const currentIndex = allPages.findIndex((p) => p.id === currentPage.id);
      return currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
    }
    // =========================================================================
    // Asset URL Transformation
    // =========================================================================
    /**
     * Get file extension from MIME type
     */
    getExtensionFromMime(mime) {
      const mimeToExt = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
        "image/bmp": ".bmp",
        "image/tiff": ".tiff",
        "image/x-icon": ".ico",
        "application/pdf": ".pdf",
        "video/mp4": ".mp4",
        "video/webm": ".webm",
        "video/ogg": ".ogv",
        "video/quicktime": ".mov",
        "audio/mpeg": ".mp3",
        "audio/ogg": ".ogg",
        "audio/wav": ".wav",
        "audio/webm": ".weba",
        "application/zip": ".zip",
        "application/json": ".json",
        "text/plain": ".txt",
        "text/html": ".html",
        "text/css": ".css",
        "application/javascript": ".js",
        "application/octet-stream": ".bin"
      };
      return mimeToExt[mime] || ".bin";
    }
    /**
     * Build asset filename map for URL transformation
     */
    async buildAssetFilenameMap() {
      if (this.assetFilenameMap) {
        return this.assetFilenameMap;
      }
      this.assetFilenameMap = /* @__PURE__ */ new Map();
      try {
        const assets = await this.assets.getAllAssets();
        for (const asset of assets) {
          const id = asset.id;
          let filename = asset.filename;
          if (!filename) {
            const ext = this.getExtensionFromMime(asset.mimeType || "application/octet-stream");
            filename = `asset-${id.substring(0, 8)}${ext}`;
          }
          this.assetFilenameMap.set(id, filename);
        }
      } catch (e) {
        console.warn("[BaseExporter] Failed to build asset map:", e);
      }
      return this.assetFilenameMap;
    }
    /**
     * Build asset export path map for URL transformation
     * Uses folderPath instead of UUID for cleaner export structure
     * Handles filename collisions by appending counter
     *
     * @returns Map of asset UUID to export path (e.g., "images/photo.jpg" or "photo.jpg" for root)
     */
    async buildAssetExportPathMap() {
      if (this.assetExportPathMap) {
        return this.assetExportPathMap;
      }
      this.assetExportPathMap = /* @__PURE__ */ new Map();
      const usedPaths = /* @__PURE__ */ new Set();
      try {
        const assets = await this.assets.getAllAssets();
        for (const asset of assets) {
          let folderPath = asset.folderPath || "";
          const filename = asset.filename || `asset-${asset.id.substring(0, 8)}`;
          if (folderPath === filename) {
            folderPath = "";
          } else if (folderPath.endsWith(`/${filename}`)) {
            folderPath = folderPath.slice(0, -(filename.length + 1));
          }
          const basePath = folderPath ? `${folderPath}/${filename}` : filename;
          let finalPath = basePath;
          let counter = 1;
          while (usedPaths.has(finalPath.toLowerCase())) {
            const ext = filename.includes(".") ? "." + filename.split(".").pop() : "";
            const nameWithoutExt = ext ? filename.slice(0, -ext.length) : filename;
            finalPath = folderPath ? `${folderPath}/${nameWithoutExt}_${counter}${ext}` : `${nameWithoutExt}_${counter}${ext}`;
            counter++;
          }
          usedPaths.add(finalPath.toLowerCase());
          this.assetExportPathMap.set(asset.id, finalPath);
        }
      } catch (e) {
        console.warn("[BaseExporter] Failed to build asset export path map:", e);
      }
      return this.assetExportPathMap;
    }
    /**
     * Convert asset:// URLs directly to {{context_path}}/content/resources/ format
     * for XML export. This is the single transformation step.
     *
     * Supported input formats:
     * - asset://uuid.ext (new format with extension)
     * - asset://uuid (simple UUID without extension)
     *
     * Output: {{context_path}}/content/resources/{exportPath}
     *
     * Also fixes duplicated filename patterns that may exist in content
     * (e.g., content/resources/file.pdf/file.pdf → content/resources/file.pdf)
     */
    async addFilenamesToAssetUrls(content) {
      if (!content) return "";
      const assetMap = await this.buildAssetExportPathMap();
      let result = content.replace(/asset:\/\/([a-f0-9-]{36})(\.[a-z0-9]+)?/gi, (_match, uuid, ext) => {
        const exportPath = assetMap.get(uuid);
        if (exportPath) {
          return `{{context_path}}/content/resources/${exportPath}`;
        }
        return `{{context_path}}/content/resources/${uuid}${ext || ""}`;
      });
      result = result.replace(/asset:\/\/([^"'\s]+)/g, (_match, assetPath) => {
        if (assetPath.includes("{{context_path}}")) {
          return _match;
        }
        const exportPath = assetMap.get(assetPath) || assetMap.get(`resources/${assetPath}`);
        if (exportPath) {
          return `{{context_path}}/content/resources/${exportPath}`;
        }
        const filename = assetPath.includes("/") ? assetPath.split("/").pop() : assetPath;
        const filenameExportPath = assetMap.get(filename);
        if (filenameExportPath) {
          return `{{context_path}}/content/resources/${filenameExportPath}`;
        }
        return `{{context_path}}/content/resources/${assetPath}`;
      });
      result = result.replace(/content\/resources\/([^/"]+)\/\1(?=["'\s>])/g, "content/resources/$1");
      return result;
    }
    /**
     * Pre-process pages to add filenames to asset URLs in all component content
     * And converts internal links (exe-node:) to proper page URLs
     *
     * Note: exe-package:elp protocol transformation is now done in PageRenderer.renderPageContent()
     * so the XML content keeps the original protocol for re-import compatibility
     */
    async preprocessPagesForExport(pages) {
      const clonedPages = JSON.parse(JSON.stringify(pages));
      const pageUrlMap = this.buildPageUrlMap(clonedPages);
      for (let pageIndex = 0; pageIndex < clonedPages.length; pageIndex++) {
        const page = clonedPages[pageIndex];
        const isIndex = pageIndex === 0;
        for (const block of page.blocks || []) {
          for (const component of block.components || []) {
            if (component.content) {
              component.content = await this.addFilenamesToAssetUrls(component.content);
              component.content = this.replaceInternalLinks(component.content, pageUrlMap, isIndex);
            }
            if (component.properties && Object.keys(component.properties).length > 0) {
              const propsStr = JSON.stringify(component.properties);
              const processedStr = await this.addFilenamesToAssetUrls(propsStr);
              component.properties = JSON.parse(processedStr);
            }
          }
        }
      }
      return clonedPages;
    }
    /**
     * Build a map of page IDs to unique filenames
     * Handles collisions by incrementing trailing numbers or appending -1, -2, etc.
     * First page is always index.html, others are {sanitized-title}.html
     *
     * For filenames ending with a number (e.g., "new-page-1"), collisions increment
     * that number (e.g., "new-page-2", "new-page-3") instead of appending another number.
     */
    buildPageFilenameMap(pages) {
      const filenameMap = /* @__PURE__ */ new Map();
      const usedFilenames = /* @__PURE__ */ new Set();
      const maxAttempts = 20;
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (i === 0) {
          filenameMap.set(page.id, "index.html");
          usedFilenames.add("index.html");
          continue;
        }
        const baseFilename = this.sanitizePageFilename(page.title);
        let filename = `${baseFilename}.html`;
        if (usedFilenames.has(filename)) {
          const match = baseFilename.match(/^(.*?)-?(\d+)$/);
          if (match) {
            const base = match[1] ? `${match[1]}-` : "";
            const startNum = parseInt(match[2], 10);
            let counter = startNum + 1;
            while (counter <= startNum + maxAttempts) {
              filename = `${base}${counter}.html`;
              if (!usedFilenames.has(filename)) break;
              counter++;
            }
          } else {
            let counter = 2;
            while (usedFilenames.has(filename) && counter <= maxAttempts + 1) {
              filename = `${baseFilename}-${counter}.html`;
              counter++;
            }
          }
        }
        usedFilenames.add(filename);
        filenameMap.set(page.id, filename);
      }
      return filenameMap;
    }
    /**
     * Build a map of page IDs to their export URLs
     * Used for internal link (exe-node:) conversion
     */
    buildPageUrlMap(pages) {
      const map = /* @__PURE__ */ new Map();
      const filenameMap = this.buildPageFilenameMap(pages);
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const filename = filenameMap.get(page.id) || "page.html";
        const isFirstPage = i === 0;
        if (isFirstPage) {
          map.set(page.id, {
            url: "index.html",
            urlFromSubpage: "../index.html"
          });
        } else {
          map.set(page.id, {
            url: `html/${filename}`,
            urlFromSubpage: filename
          });
        }
      }
      return map;
    }
    /**
     * Replace exe-node: internal links with proper page URLs
     *
     * @param content - HTML content
     * @param pageUrlMap - Map of page IDs to their export URLs
     * @param isFromIndex - Whether the content is from the index page (affects relative paths)
     * @returns Content with internal links replaced
     */
    replaceInternalLinks(content, pageUrlMap, isFromIndex) {
      if (!content || !content.includes("exe-node:")) {
        return content;
      }
      return content.replace(/href=["']exe-node:([^"']+)["']/gi, (match, pageId) => {
        const pageUrls = pageUrlMap.get(pageId);
        if (pageUrls) {
          const url = isFromIndex ? pageUrls.url : pageUrls.urlFromSubpage;
          return `href="${url}"`;
        }
        console.warn(`[BaseExporter] Internal link target not found: ${pageId}`);
        return match;
      });
    }
    /**
     * Replace exe-package:elp protocol with client-side download handler
     * This enables the download-source-file iDevice to generate ELPX files on-the-fly
     *
     * @param content - HTML content
     * @param projectTitle - Project title for the download filename
     * @returns Content with exe-package:elp replaced with onclick handler
     */
    replaceElpxProtocol(content, projectTitle) {
      if (!content) return "";
      if (!content.includes("exe-package:elp")) {
        return content;
      }
      let result = content.replace(
        /href="exe-package:elp"/g,
        `href="#" onclick="if(typeof downloadElpx==='function')downloadElpx();return false;"`
      );
      const safeTitle = this.escapeXml(projectTitle);
      result = result.replace(/download="exe-package:elp-name"/g, `download="${safeTitle}.elpx"`);
      return result;
    }
    /**
     * Collect all HTML content from all pages (for library detection)
     */
    collectAllHtmlContent(pages) {
      const htmlParts = [];
      for (const page of pages) {
        for (const block of page.blocks || []) {
          for (const component of block.components || []) {
            if (component.content) {
              htmlParts.push(component.content);
            }
          }
        }
      }
      return htmlParts.join("\n");
    }
    // =========================================================================
    // Download Source File iDevice Detection
    // =========================================================================
    /**
     * Check if any page contains the download-source-file iDevice
     * (needs ELPX manifest for client-side ZIP recreation)
     */
    needsElpxDownloadSupport(pages) {
      return pages.some((page) => this.pageHasDownloadSourceFile(page));
    }
    /**
     * Check if a specific page contains the download-source-file iDevice
     * or a manual link using exe-package:elp protocol
     */
    pageHasDownloadSourceFile(page) {
      for (const block of page.blocks || []) {
        for (const component of block.components || []) {
          const type = (component.type || "").toLowerCase();
          if (type.includes("download-source-file") || type.includes("downloadsourcefile")) {
            return true;
          }
          if (component.content?.includes("exe-download-package-link")) {
            return true;
          }
          if (component.content?.includes("exe-package:elp")) {
            return true;
          }
        }
      }
      return false;
    }
    // =========================================================================
    // ELPX Manifest Generation (for download-source-file iDevice)
    // =========================================================================
    /**
     * Generate ELPX manifest as a standalone JS file
     * Used for HTML5 exports where the manifest is a separate file
     *
     * @param fileList - List of file paths in the export
     * @returns JavaScript file content
     */
    generateElpxManifestFile(fileList) {
      const manifest = {
        version: 1,
        files: fileList,
        projectTitle: this.getMetadata().title || "eXeLearning-project"
      };
      return `/**
 * ELPX Manifest - Auto-generated for download-source-file iDevice
 * Used by exe_elpx_download.js to recreate the complete export package
 */
window.__ELPX_MANIFEST__=${JSON.stringify(manifest, null, 2)};
`;
    }
    // =========================================================================
    // Content XML Generation (for re-import capability)
    // =========================================================================
    /**
     * Generate content.xml from document structure
     * Uses unified OdeXmlGenerator for consistent output across all exporters
     *
     * @param preprocessedPages - Optional preprocessed pages (with asset URLs already transformed).
     *                            If not provided, uses raw navigation from document.
     */
    generateContentXml(preprocessedPages) {
      const metadata = this.getMetadata();
      const pages = preprocessedPages || this.getNavigation();
      return generateOdeXml(metadata, pages);
    }
    // =========================================================================
    // Fallback Styles (used when resources can't be fetched)
    // =========================================================================
    /**
     * Get fallback theme CSS
     */
    getFallbackThemeCss() {
      return `/* Default theme CSS */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
`;
    }
    /**
     * Get fallback theme JS
     */
    getFallbackThemeJs() {
      return `// Default theme JS
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Theme initialization
    console.log('[Theme] Default theme loaded');
  });
})();
`;
    }
  };

  // src/shared/export/utils/GlobalFontGenerator.ts
  var GLOBAL_FONTS = {
    opendyslexic: {
      id: "opendyslexic",
      displayName: "OpenDyslexic",
      fontFamily: "OpenDyslexic",
      fallback: "serif",
      files: [
        { weight: 400, style: "normal", filename: "OpenDyslexic-Regular.woff", format: "woff" },
        { weight: 400, style: "italic", filename: "OpenDyslexic-Italic.woff", format: "woff" },
        { weight: 700, style: "normal", filename: "OpenDyslexic-Bold.woff", format: "woff" },
        { weight: 700, style: "italic", filename: "OpenDyslexic-BoldItalic.woff", format: "woff" }
      ]
    },
    andika: {
      id: "andika",
      displayName: "Andika",
      fontFamily: "Andika",
      fallback: "sans-serif",
      files: [
        { weight: 400, style: "normal", filename: "Andika-Regular.woff2", format: "woff2" },
        { weight: 400, style: "italic", filename: "Andika-Italic.woff2", format: "woff2" },
        { weight: 700, style: "normal", filename: "Andika-Bold.woff2", format: "woff2" },
        { weight: 700, style: "italic", filename: "Andika-BoldItalic.woff2", format: "woff2" }
      ]
    },
    nunito: {
      id: "nunito",
      displayName: "Nunito",
      fontFamily: "Nunito",
      fallback: "sans-serif",
      files: [
        { weight: 400, style: "normal", filename: "Nunito-Regular.woff2", format: "woff2" },
        { weight: 400, style: "italic", filename: "Nunito-Italic.woff2", format: "woff2" },
        { weight: 700, style: "normal", filename: "Nunito-Bold.woff2", format: "woff2" },
        { weight: 700, style: "italic", filename: "Nunito-BoldItalic.woff2", format: "woff2" }
      ]
    },
    "playwrite-es": {
      id: "playwrite-es",
      displayName: "Playwrite ES",
      fontFamily: "Playwrite ES",
      fallback: "cursive, sans-serif",
      files: [
        {
          weight: 400,
          style: "normal",
          filename: "PlaywriteES-Regular.woff2",
          format: "woff2"
        }
      ],
      lineHeight: "2em"
    }
  };
  var FONT_SELECTORS = "body, main, article, .exe-content, .iDevice_wrapper, .idevice-content";
  function buildFontCss(fontConfig, fontPath, label) {
    let css = `/* Global Font: ${fontConfig.displayName}${label} */
`;
    for (const file of fontConfig.files) {
      css += `@font-face {
    font-family: '${fontConfig.fontFamily}';
    font-style: ${file.style};
    font-weight: ${file.weight};
    font-display: swap;
    src: url('${fontPath}${file.filename}') format('${file.format}');
}
`;
    }
    const lineHeightRule = fontConfig.lineHeight ? `
    line-height: ${fontConfig.lineHeight} !important;` : "";
    css += `
${FONT_SELECTORS} {
    font-family: '${fontConfig.fontFamily}', ${fontConfig.fallback} !important;${lineHeightRule}
}
`;
    if (fontConfig.attribution) {
      css += `/* ${fontConfig.attribution} */
`;
    }
    return css;
  }
  var GlobalFontGenerator = class {
    /**
     * Check if a font ID is valid
     */
    static isValidFont(fontId) {
      return fontId !== "default" && fontId in GLOBAL_FONTS;
    }
    /**
     * Get font configuration
     */
    static getFontConfig(fontId) {
      return GLOBAL_FONTS[fontId] || null;
    }
    /**
     * Generate CSS for global font including @font-face rules and body style
     * @param fontId - Font identifier (e.g., 'opendyslexic')
     * @param basePath - Base path for font URLs (e.g., '' for index, '../' for subpages)
     * @returns CSS string or empty string if font is 'default'
     */
    static generateCss(fontId, basePath = "") {
      if (!fontId || fontId === "default") {
        return "";
      }
      const fontConfig = GLOBAL_FONTS[fontId];
      if (!fontConfig) {
        console.warn(`[GlobalFontGenerator] Unknown font: ${fontId}`);
        return "";
      }
      return buildFontCss(fontConfig, `${basePath}fonts/global/${fontId}/`, "");
    }
    /**
     * Generate CSS for preview (uses absolute server URLs)
     * @param fontId - Font identifier
     * @param serverBasePath - Server base path (e.g., '/files/perm')
     * @returns CSS string
     */
    static generatePreviewCss(fontId, serverBasePath = "/files/perm") {
      if (!fontId || fontId === "default") {
        return "";
      }
      const fontConfig = GLOBAL_FONTS[fontId];
      if (!fontConfig) {
        return "";
      }
      return buildFontCss(fontConfig, `${serverBasePath}/fonts/global/${fontId}/`, " (Preview)");
    }
    /**
     * Get list of font file paths to include in export
     * @param fontId - Font identifier
     * @returns Array of relative file paths
     */
    static getFontFilePaths(fontId) {
      const fontConfig = GLOBAL_FONTS[fontId];
      if (!fontConfig) {
        return [];
      }
      return fontConfig.files.map((f) => `fonts/global/${fontId}/${f.filename}`);
    }
    /**
     * Get attribution text for a font
     */
    static getAttribution(fontId) {
      return GLOBAL_FONTS[fontId]?.attribution || null;
    }
    /**
     * Get all available font IDs (excluding 'default')
     */
    static getAvailableFontIds() {
      return Object.keys(GLOBAL_FONTS);
    }
    /**
     * Get CSS class name for body element based on font
     * @param fontId - Font identifier
     * @returns CSS class name (e.g., 'exe-global-font-playwrite-es') or empty string if default
     */
    static getBodyClassName(fontId) {
      if (!fontId || fontId === "default") {
        return "";
      }
      return `exe-global-font-${fontId}`;
    }
  };

  // src/shared/export/generators/I18nGenerator.ts
  var TRANSLATIONS = {
    // Navigation
    previous: {
      en: "Previous",
      es: "Anterior",
      ca: "Anterior",
      va: "Anterior",
      gl: "Anterior",
      eu: "Aurrekoa",
      pt: "Anterior",
      eo: "Antauxe",
      ro: "Anterior"
    },
    next: {
      en: "Next",
      es: "Siguiente",
      ca: "Seg\xFCent",
      va: "Seg\xFCent",
      gl: "Seguinte",
      eu: "Hurrengoa",
      pt: "Pr\xF3ximo",
      eo: "Sekvanta",
      ro: "Urm\u0103tor"
    },
    menu: {
      en: "Menu",
      es: "Men\xFA",
      ca: "Men\xFA",
      va: "Men\xFA",
      gl: "Men\xFA",
      eu: "Menua",
      pt: "Menu",
      eo: "Menuo",
      ro: "Meniu"
    },
    // Toggle/visibility
    show: {
      en: "Show",
      es: "Mostrar",
      ca: "Mostra",
      va: "Mostra",
      gl: "Amosar",
      eu: "Erakutsi",
      pt: "Mostrar",
      eo: "Montri",
      ro: "Afi\u0219eaz\u0103"
    },
    hide: {
      en: "Hide",
      es: "Ocultar",
      ca: "Amaga",
      va: "Amaga",
      gl: "Ocultar",
      eu: "Ezkutatu",
      pt: "Ocultar",
      eo: "Ka\u015Di",
      ro: "Ascunde"
    },
    toggleContent: {
      en: "Toggle content",
      es: "Ocultar/Mostrar contenido",
      ca: "Commuta el contingut",
      va: "Alternar contingut",
      gl: "Ocultar/Amosar contido",
      eu: "Edukia erakutsi/ezkutatu",
      pt: "Alternar conte\xFAdo",
      eo: "\u015Calti enhavon",
      ro: "Comut\u0103 con\u021Binutul"
    },
    // Feedback
    showFeedback: {
      en: "Show feedback",
      es: "Mostrar retroalimentaci\xF3n",
      ca: "Mostra la retroalimentaci\xF3",
      va: "Mostra la retroalimentaci\xF3",
      gl: "Mostrar retroalimentaci\xF3n",
      eu: "Erakutsi feedbacka",
      pt: "Mostrar feedback",
      eo: "Montri komentaron",
      ro: "Afi\u0219eaz\u0103 feedback"
    },
    hideFeedback: {
      en: "Hide feedback",
      es: "Ocultar retroalimentaci\xF3n",
      ca: "Amaga la retroalimentaci\xF3",
      va: "Amaga la retroalimentaci\xF3",
      gl: "Ocultar retroalimentaci\xF3n",
      eu: "Ezkutatu feedbacka",
      pt: "Ocultar feedback",
      eo: "Ka\u015Di komentaron",
      ro: "Ascunde feedback"
    },
    correct: {
      en: "Correct",
      es: "Correcto",
      ca: "Correcte",
      va: "Correcte",
      gl: "Correcto",
      eu: "Zuzena",
      pt: "Correto",
      eo: "\u011Custe",
      ro: "Corect"
    },
    incorrect: {
      en: "Incorrect",
      es: "Incorrecto",
      ca: "Incorrecte",
      va: "Incorrecte",
      gl: "Incorrecto",
      eu: "Okerra",
      pt: "Incorreto",
      eo: "Mal\u011Duste",
      ro: "Incorect"
    },
    yourScoreIs: {
      en: "Your score",
      es: "Tu puntuaci\xF3n",
      ca: "La teva puntuaci\xF3",
      va: "La teua puntuaci\xF3",
      gl: "A t\xFAa puntuaci\xF3n",
      eu: "Zure puntuazioa",
      pt: "Sua pontua\xE7\xE3o",
      eo: "Via poentaro",
      ro: "Scorul t\u0103u"
    },
    solution: {
      en: "Solution",
      es: "Soluci\xF3n",
      ca: "Soluci\xF3",
      va: "Soluci\xF3",
      gl: "Soluci\xF3n",
      eu: "Irtenbidea",
      pt: "Solu\xE7\xE3o",
      eo: "Solvo",
      ro: "Solu\u021Bie"
    },
    // Actions
    download: {
      en: "Download",
      es: "Descargar",
      ca: "Descarrega",
      va: "Descarrega",
      gl: "Descargar",
      eu: "Deskargatu",
      pt: "Baixar",
      eo: "El\u015Duti",
      ro: "Descarc\u0103"
    },
    print: {
      en: "Print",
      es: "Imprimir",
      ca: "Imprimeix",
      va: "Imprimeix",
      gl: "Imprimir",
      eu: "Inprimatu",
      pt: "Imprimir",
      eo: "Presi",
      ro: "Imprim\u0103"
    },
    search: {
      en: "Search",
      es: "Buscar",
      ca: "Cerca",
      va: "Cerca",
      gl: "Buscar",
      eu: "Bilatu",
      pt: "Buscar",
      eo: "Ser\u0109i",
      ro: "Caut\u0103"
    },
    // Errors and messages
    dataError: {
      en: "Data error",
      es: "Error de datos",
      ca: "Error de dades",
      va: "Error de dades",
      gl: "Erro de datos",
      eu: "Datu errorea",
      pt: "Erro de dados",
      eo: "Datenaro eraro",
      ro: "Eroare de date"
    },
    epubJSerror: {
      en: "This might not work in this ePub reader",
      es: "Esto podr\xEDa no funcionar en este lector ePub",
      ca: "Aix\xF2 pot no funcionar en aquest lector ePub",
      va: "A\xE7\xF2 pot no funcionar en aquest lector ePub",
      gl: "Isto poder\xEDa non funcionar neste lector ePub",
      eu: "Hau agian ez da ePub irakurgailu honetan funtzionatuko",
      pt: "Isso pode n\xE3o funcionar neste leitor ePub",
      eo: "Tio eble ne funkcios en \u0109i tiu ePub-legilo",
      ro: "Aceasta ar putea s\u0103 nu func\u021Bioneze \xEEn acest cititor ePub"
    },
    epubDisabled: {
      en: "This activity does not work in ePub format",
      es: "Esta actividad no funciona en formato ePub",
      ca: "Aquesta activitat no funciona en format ePub",
      va: "Aquesta activitat no funciona en format ePub",
      gl: "Esta actividade non funciona en formato ePub",
      eu: "Jarduera hau ez dabil ePub formatuan",
      pt: "Esta atividade n\xE3o funciona no formato ePub",
      eo: "\u0108i tiu aktiveco ne funkcias en ePub-formato",
      ro: "Aceast\u0103 activitate nu func\u021Bioneaz\u0103 \xEEn formatul ePub"
    },
    // Search
    fullSearch: {
      en: "Full search",
      es: "B\xFAsqueda completa",
      ca: "Cerca completa",
      va: "Cerca completa",
      gl: "Busca completa",
      eu: "Bilaketa osoa",
      pt: "Busca completa",
      eo: "Plena ser\u0109o",
      ro: "C\u0103utare complet\u0103"
    },
    noSearchResults: {
      en: "No search results",
      es: "Sin resultados de b\xFAsqueda",
      ca: "Sense resultats de cerca",
      va: "Sense resultats de cerca",
      gl: "Sen resultados de busca",
      eu: "Bilaketa emaitzarik ez",
      pt: "Sem resultados de busca",
      eo: "Neniuj ser\u0109rezultoj",
      ro: "Niciun rezultat de c\u0103utare"
    },
    searchResults: {
      en: "Search results for",
      es: "Resultados de b\xFAsqueda para",
      ca: "Resultats de cerca per a",
      va: "Resultats de cerca per a",
      gl: "Resultados de busca para",
      eu: "Bilaketa emaitzak honentzat",
      pt: "Resultados de busca para",
      eo: "Ser\u0109rezultoj por",
      ro: "Rezultate de c\u0103utare pentru"
    },
    hideResults: {
      en: "Hide results",
      es: "Ocultar resultados",
      ca: "Amaga els resultats",
      va: "Amaga els resultats",
      gl: "Ocultar resultados",
      eu: "Ezkutatu emaitzak",
      pt: "Ocultar resultados",
      eo: "Ka\u015Di rezultojn",
      ro: "Ascunde rezultatele"
    },
    block: {
      en: "block",
      es: "bloque",
      ca: "bloc",
      va: "bloc",
      gl: "bloque",
      eu: "blokea",
      pt: "bloco",
      eo: "bloko",
      ro: "bloc"
    },
    // UI elements
    more: {
      en: "More",
      es: "M\xE1s",
      ca: "M\xE9s",
      va: "M\xE9s",
      gl: "M\xE1is",
      eu: "Gehiago",
      pt: "Mais",
      eo: "Pli",
      ro: "Mai mult"
    },
    newWindow: {
      en: "New window",
      es: "Nueva ventana",
      ca: "Nova finestra",
      va: "Nova finestra",
      gl: "Nova xanela",
      eu: "Leiho berria",
      pt: "Nova janela",
      eo: "Nova fenestro",
      ro: "Fereastr\u0103 nou\u0103"
    },
    fullSize: {
      en: "Full size",
      es: "Tama\xF1o completo",
      ca: "Mida completa",
      va: "Mida completa",
      gl: "Tama\xF1o completo",
      eu: "Tamaina osoa",
      pt: "Tamanho completo",
      eo: "Plena grandeco",
      ro: "Dimensiune complet\u0103"
    },
    // Accessibility toolbar
    accessibility_tools: {
      en: "Accessibility tools",
      es: "Herramientas de accesibilidad",
      ca: "Eines d'accessibilitat",
      va: "Eines d'accessibilitat",
      gl: "Ferramentas de accesibilidade",
      eu: "Irisgarritasun tresnak",
      pt: "Ferramentas de acessibilidade",
      eo: "Alireblecaj iloj",
      ro: "Instrumente de accesibilitate"
    },
    close_toolbar: {
      en: "Close",
      es: "Cerrar",
      ca: "Tanca",
      va: "Tanca",
      gl: "Pechar",
      eu: "Itxi",
      pt: "Fechar",
      eo: "Fermi",
      ro: "\xCEnchide"
    },
    default_font: {
      en: "Default font",
      es: "Fuente predeterminada",
      ca: "Lletra predeterminada",
      va: "Lletra predeterminada",
      gl: "Fonte predeterminada",
      eu: "Letra lehenetsia",
      pt: "Fonte padr\xE3o",
      eo: "Defa\u016Dlta tiparo",
      ro: "Font implicit"
    },
    increase_text_size: {
      en: "Increase text size",
      es: "Aumentar tama\xF1o del texto",
      ca: "Augmenta la mida del text",
      va: "Augmenta la mida del text",
      gl: "Aumentar tama\xF1o do texto",
      eu: "Handitu testuaren tamaina",
      pt: "Aumentar tamanho do texto",
      eo: "Pligrandigi tekston",
      ro: "M\u0103re\u0219te dimensiunea textului"
    },
    decrease_text_size: {
      en: "Decrease text size",
      es: "Disminuir tama\xF1o del texto",
      ca: "Redueix la mida del text",
      va: "Redueix la mida del text",
      gl: "Diminu\xEDr tama\xF1o do texto",
      eu: "Txikitu testuaren tamaina",
      pt: "Diminuir tamanho do texto",
      eo: "Malpligrandigi tekston",
      ro: "Mic\u0219oreaz\u0103 dimensiunea textului"
    },
    read: {
      en: "Read",
      es: "Leer",
      ca: "Llegeix",
      va: "Llig",
      gl: "Ler",
      eu: "Irakurri",
      pt: "Ler",
      eo: "Legi",
      ro: "Cite\u0219te"
    },
    stop_reading: {
      en: "Stop reading",
      es: "Detener lectura",
      ca: "Atura la lectura",
      va: "Atura la lectura",
      gl: "Deter lectura",
      eu: "Gelditu irakurketa",
      pt: "Parar leitura",
      eo: "\u0108esi legadon",
      ro: "Opre\u0219te citirea"
    },
    translate: {
      en: "Translate",
      es: "Traducir",
      ca: "Tradueix",
      va: "Tradueix",
      gl: "Traducir",
      eu: "Itzuli",
      pt: "Traduzir",
      eo: "Traduki",
      ro: "Traduce"
    },
    drag_and_drop: {
      en: "Drag and drop",
      es: "Arrastrar y soltar",
      ca: "Arrossega i deixa anar",
      va: "Arrossega i deixa anar",
      gl: "Arrastrar e soltar",
      eu: "Arrastatu eta jaregin",
      pt: "Arrastar e soltar",
      eo: "Treni kaj faligi",
      ro: "Trage \u0219i plaseaz\u0103"
    },
    reset: {
      en: "Reset",
      es: "Restablecer",
      ca: "Restableix",
      va: "Restableix",
      gl: "Restablecer",
      eu: "Berrezarri",
      pt: "Reiniciar",
      eo: "Restarigi",
      ro: "Reseteaz\u0103"
    },
    mode_toggler: {
      en: "Light/Dark mode",
      es: "Modo claro/oscuro",
      ca: "Mode clar/fosc",
      va: "Mode clar/fosc",
      gl: "Modo claro/escuro",
      eu: "Modu argia/iluna",
      pt: "Modo claro/escuro",
      eo: "Hela/Malhela re\u011Dimo",
      ro: "Mod luminos/\xEEntunecat"
    },
    teacher_mode: {
      en: "Teacher mode",
      es: "Modo profesor",
      ca: "Mode professor",
      va: "Mode professor",
      gl: "Modo profesor",
      eu: "Irakasle modua",
      pt: "Modo professor",
      eo: "Instruista re\u011Dimo",
      ro: "Mod profesor"
    }
  };
  var GAME_TRANSLATIONS = {
    hangManGame: {
      en: "Hangman game",
      es: "Juego del ahorcado",
      ca: "Joc del penjat",
      va: "Joc del penjat",
      gl: "Xogo do aforcado",
      eu: "Urkamenduaren jokoa",
      pt: "Jogo da forca",
      eo: "Pendumita ludo",
      ro: "Jocul sp\xE2nzur\u0103toarea"
    },
    accept: {
      en: "Accept",
      es: "Aceptar",
      ca: "Accepta",
      va: "Accepta",
      gl: "Aceptar",
      eu: "Onartu",
      pt: "Aceitar",
      eo: "Akcepti",
      ro: "Accept\u0103"
    },
    yes: {
      en: "Yes",
      es: "S\xED",
      ca: "S\xED",
      va: "S\xED",
      gl: "Si",
      eu: "Bai",
      pt: "Sim",
      eo: "Jes",
      ro: "Da"
    },
    no: {
      en: "No",
      es: "No",
      ca: "No",
      va: "No",
      gl: "Non",
      eu: "Ez",
      pt: "N\xE3o",
      eo: "Ne",
      ro: "Nu"
    },
    right: {
      en: "Right",
      es: "Correcto",
      ca: "Correcte",
      va: "Correcte",
      gl: "Correcto",
      eu: "Zuzena",
      pt: "Correto",
      eo: "\u011Custe",
      ro: "Corect"
    },
    wrong: {
      en: "Wrong",
      es: "Incorrecto",
      ca: "Incorrecte",
      va: "Incorrecte",
      gl: "Incorrecto",
      eu: "Okerra",
      pt: "Incorreto",
      eo: "Mal\u011Duste",
      ro: "Gre\u0219it"
    },
    rightAnswer: {
      en: "Right answer",
      es: "Respuesta correcta",
      ca: "Resposta correcta",
      va: "Resposta correcta",
      gl: "Resposta correcta",
      eu: "Erantzun zuzena",
      pt: "Resposta correta",
      eo: "\u011Custa respondo",
      ro: "R\u0103spuns corect"
    },
    stat: {
      en: "Status",
      es: "Estado",
      ca: "Estat",
      va: "Estat",
      gl: "Estado",
      eu: "Egoera",
      pt: "Estado",
      eo: "Stato",
      ro: "Stare"
    },
    selectedLetters: {
      en: "Selected letters",
      es: "Letras seleccionadas",
      ca: "Lletres seleccionades",
      va: "Lletres seleccionades",
      gl: "Letras seleccionadas",
      eu: "Hautatutako hizkiak",
      pt: "Letras selecionadas",
      eo: "Elektitaj literoj",
      ro: "Litere selectate"
    },
    word: {
      en: "Word",
      es: "Palabra",
      ca: "Paraula",
      va: "Paraula",
      gl: "Palabra",
      eu: "Hitza",
      pt: "Palavra",
      eo: "Vorto",
      ro: "Cuv\xE2nt"
    },
    words: {
      en: "Words",
      es: "Palabras",
      ca: "Paraules",
      va: "Paraules",
      gl: "Palabras",
      eu: "Hitzak",
      pt: "Palavras",
      eo: "Vortoj",
      ro: "Cuvinte"
    },
    play: {
      en: "Play",
      es: "Jugar",
      ca: "Juga",
      va: "Juga",
      gl: "Xogar",
      eu: "Jolastu",
      pt: "Jogar",
      eo: "Ludi",
      ro: "Joac\u0103"
    },
    playAgain: {
      en: "Restart",
      es: "Reiniciar",
      ca: "Reinicia",
      va: "Reinicia",
      gl: "Reiniciar",
      eu: "Berrabiarazi",
      pt: "Reiniciar",
      eo: "Reludi",
      ro: "Reporne\u0219te"
    },
    results: {
      en: "Results",
      es: "Resultados",
      ca: "Resultats",
      va: "Resultats",
      gl: "Resultados",
      eu: "Emaitzak",
      pt: "Resultados",
      eo: "Rezultoj",
      ro: "Rezultate"
    },
    total: {
      en: "Total",
      es: "Total",
      ca: "Total",
      va: "Total",
      gl: "Total",
      eu: "Guztira",
      pt: "Total",
      eo: "Sumo",
      ro: "Total"
    },
    otherWord: {
      en: "Other word",
      es: "Otra palabra",
      ca: "Altra paraula",
      va: "Altra paraula",
      gl: "Outra palabra",
      eu: "Beste hitza",
      pt: "Outra palavra",
      eo: "Alia vorto",
      ro: "Alt cuv\xE2nt"
    },
    gameOver: {
      en: "Game over",
      es: "Fin del juego",
      ca: "Fi del joc",
      va: "Fi del joc",
      gl: "Fin do xogo",
      eu: "Jokoa amaitu da",
      pt: "Fim de jogo",
      eo: "Ludo finita",
      ro: "Jocul s-a terminat"
    },
    confirmReload: {
      en: "Reload game?",
      es: "\xBFRecargar el juego?",
      ca: "Recarregar el joc?",
      va: "Recarregar el joc?",
      gl: "Recargar o xogo?",
      eu: "Jokoa birkargatu?",
      pt: "Recarregar o jogo?",
      eo: "Re\u015Dar\u011Di la ludon?",
      ro: "Re\xEEncarc\u0103 jocul?"
    },
    clickOnPlay: {
      en: "Click Play to start",
      es: "Haz clic en Jugar para empezar",
      ca: "Fes clic a Juga per comen\xE7ar",
      va: "Fes clic a Juga per a comen\xE7ar",
      gl: "Fai clic en Xogar para comezar",
      eu: "Sakatu Jolastu hasteko",
      pt: "Clique em Jogar para come\xE7ar",
      eo: "Klaku Ludi por komenci",
      ro: "Apas\u0103 pe Joac\u0103 pentru a \xEEncepe"
    },
    clickOnOtherWord: {
      en: "Click Other word to continue",
      es: "Haz clic en Otra palabra para continuar",
      ca: "Fes clic a Altra paraula per continuar",
      va: "Fes clic a Altra paraula per a continuar",
      gl: "Fai clic en Outra palabra para continuar",
      eu: "Sakatu Beste hitza jarraitzeko",
      pt: "Clique em Outra palavra para continuar",
      eo: "Klaku Alia vorto por da\u016Drigi",
      ro: "Apas\u0103 pe Alt cuv\xE2nt pentru a continua"
    }
  };
  var GAME_ALPHABETS = {
    es: "abcdefghijklmn\xF1opqrstuvwxyz",
    ca: "abcdefghijklmnopqrstuvwxyz",
    va: "abcdefghijklmnopqrstuvwxyz",
    gl: "abcdefghijklmn\xF1opqrstuvwxyz",
    eu: "abcdefghijklmnopqrstuvwxyz",
    pt: "abcdefghijklmnopqrstuvwxyz",
    eo: "abc\u0109defg\u011Dh\u0125ij\u0135klmnoprs\u015Dtu\u016Dvz",
    ro: "a\u0103\xE2bcdefghi\xEEjklmnopqrs\u0219t\u021Buvwxyz",
    en: "abcdefghijklmnopqrstuvwxyz"
  };
  function getTranslation(translations, key, language) {
    const langTranslations = translations[key];
    if (!langTranslations) {
      return key;
    }
    return langTranslations[language] || langTranslations.en || key;
  }
  function buildTranslationsForLanguage(translations, language) {
    const result = {};
    for (const key of Object.keys(translations)) {
      result[key] = getTranslation(translations, key, language);
    }
    return result;
  }
  function generateI18nScript(language) {
    const mainTranslations = buildTranslationsForLanguage(TRANSLATIONS, language);
    let script = `$exe_i18n=${JSON.stringify(mainTranslations)};`;
    const gameTranslations = buildTranslationsForLanguage(GAME_TRANSLATIONS, language);
    gameTranslations.az = GAME_ALPHABETS[language] || GAME_ALPHABETS.en;
    script += `
$exe_i18n.exeGames=${JSON.stringify(gameTranslations)};`;
    script += `

// Export for Node.js/CommonJS (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = $exe_i18n;
}`;
    return script;
  }

  // src/shared/export/exporters/Html5Exporter.ts
  var Html5Exporter = class extends BaseExporter {
    /**
     * Get file extension for HTML5 format
     */
    getFileExtension() {
      return ".zip";
    }
    /**
     * Get file suffix for HTML5 format
     */
    getFileSuffix() {
      return "_web";
    }
    /**
     * Export to HTML5 ZIP
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      const html5Options = options;
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = html5Options?.theme || meta.theme || "base";
        const needsElpxDownload = this.needsElpxDownloadSupport(pages);
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        const fileList = needsElpxDownload ? [] : null;
        const addFile = (path, content) => {
          this.zip.addFile(path, content);
          if (fileList) fileList.push(path);
        };
        const {
          themeFilesMap,
          themeRootFiles,
          faviconInfo: detectedFavicon
        } = await this.prepareThemeData(themeName);
        if (themeFilesMap) {
          console.log(`[Html5Exporter] Theme '${themeName}' files count: ${themeFilesMap.size}`);
        }
        const faviconInfo = html5Options?.faviconPath ? { path: html5Options.faviconPath, type: html5Options.faviconType || "image/x-icon" } : detectedFavicon;
        const assetExportPathMap = await this.buildAssetExportPathMap();
        const pageHtmlMap = /* @__PURE__ */ new Map();
        let latexWasRendered = false;
        let mermaidWasRendered = false;
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          let html = this.generatePageHtml(
            page,
            pages,
            meta,
            i === 0,
            i,
            themeRootFiles,
            faviconInfo,
            pageFilenameMap,
            assetExportPathMap
          );
          if (!meta.addMathJax) {
            if (options?.preRenderDataGameLatex) {
              try {
                const result = await options.preRenderDataGameLatex(html);
                if (result.count > 0) {
                  html = result.html;
                  latexWasRendered = true;
                  console.log(
                    `[Html5Exporter] Pre-rendered LaTeX in ${result.count} DataGame(s) on page: ${page.title}`
                  );
                }
              } catch (error) {
                console.warn(
                  "[Html5Exporter] DataGame LaTeX pre-render failed for page:",
                  page.title,
                  error
                );
              }
            }
            if (options?.preRenderLatex) {
              try {
                const result = await options.preRenderLatex(html);
                if (result.latexRendered) {
                  html = result.html;
                  latexWasRendered = true;
                  console.log(
                    `[Html5Exporter] Pre-rendered ${result.count} LaTeX expressions on page: ${page.title}`
                  );
                }
              } catch (error) {
                console.warn("[Html5Exporter] LaTeX pre-render failed for page:", page.title, error);
              }
            }
          }
          if (options?.preRenderMermaid) {
            try {
              const result = await options.preRenderMermaid(html);
              if (result.mermaidRendered) {
                html = result.html;
                mermaidWasRendered = true;
                console.log(
                  `[Html5Exporter] Pre-rendered ${result.count} Mermaid diagram(s) on page: ${page.title}`
                );
              }
            } catch (error) {
              console.warn("[Html5Exporter] Mermaid pre-render failed for page:", page.title, error);
            }
          }
          const filename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = i === 0 ? "index.html" : `html/${filename}`;
          pageHtmlMap.set(pageFilename, html);
        }
        if (meta.addSearchBox) {
          const searchIndexContent = this.pageRenderer.generateSearchIndexFile(pages, "", pageFilenameMap);
          addFile("search_index.js", searchIndexContent);
        }
        if (meta.exportSource !== false) {
          const contentXml = this.generateContentXml(pages);
          addFile("content.xml", contentXml);
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        let baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        if (latexWasRendered || mermaidWasRendered) {
          const decoder = new TextDecoder();
          let baseCssText = decoder.decode(baseCss);
          if (latexWasRendered) {
            baseCssText += "\n" + this.getPreRenderedLatexCss();
          }
          if (mermaidWasRendered) {
            baseCssText += "\n" + this.getPreRenderedMermaidCss();
          }
          const encoder = new TextEncoder();
          baseCss = encoder.encode(baseCssText);
        }
        addFile("content/css/base.css", baseCss);
        try {
          const logoData = await this.resources.fetchExeLogo();
          if (logoData) {
            addFile("content/img/exe_powered_logo.png", logoData);
          }
        } catch {
        }
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            console.log(`[Html5Exporter] Adding theme file: theme/${filePath}`);
            addFile(`theme/${filePath}`, content);
          }
        } else {
          addFile("theme/style.css", this.getFallbackThemeCss());
          addFile("theme/style.js", this.getFallbackThemeJs());
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [libPath, content] of baseLibs) {
            addFile(`libs/${libPath}`, content);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        addFile("libs/common_i18n.js", new TextEncoder().encode(i18nContent));
        const allHtmlContent = this.collectAllHtmlContent(pages);
        const { files: allRequiredFiles, patterns } = this.libraryDetector.getAllRequiredFilesWithPatterns(
          allHtmlContent,
          {
            includeAccessibilityToolbar: meta.addAccessibilityToolbar === true,
            includeMathJax: meta.addMathJax === true,
            skipMathJax: latexWasRendered && !meta.addMathJax
            // Don't skip if explicitly requested
          }
        );
        if (latexWasRendered) {
          console.log("[Html5Exporter] LaTeX pre-rendered - skipping MathJax library (~1MB saved)");
        }
        try {
          const libFiles = await this.resources.fetchLibraryFiles(allRequiredFiles, patterns);
          for (const [libPath, content] of libFiles) {
            const zipPath = `libs/${libPath}`;
            if (!this.zip.hasFile(zipPath)) {
              addFile(zipPath, content);
            }
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const normalizedType = this.resources.normalizeIdeviceType(idevice);
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [filePath, content] of ideviceFiles) {
              addFile(`idevices/${normalizedType}/${filePath}`, content);
            }
          } catch {
          }
        }
        if (meta.globalFont && meta.globalFont !== "default") {
          try {
            const fontFiles = await this.resources.fetchGlobalFontFiles(meta.globalFont);
            if (fontFiles) {
              for (const [filePath, content] of fontFiles) {
                addFile(filePath, content);
              }
              console.log(
                `[Html5Exporter] Added ${fontFiles.size} global font files for: ${meta.globalFont}`
              );
            }
          } catch (e) {
            console.warn(`[Html5Exporter] Failed to fetch global font files: ${meta.globalFont}`, e);
          }
        }
        await this.addAssetsToZipWithResourcePath(fileList);
        if (needsElpxDownload && fileList) {
          for (const [htmlFile] of pageHtmlMap) {
            if (!fileList.includes(htmlFile)) {
              fileList.push(htmlFile);
            }
          }
          const manifestJs = this.generateElpxManifestFile(fileList);
          addFile("libs/elpx-manifest.js", manifestJs);
        }
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const pageFilename = pageFilenameMap.get(page.id) || "page.html";
          const filename = i === 0 ? "index.html" : `html/${pageFilename}`;
          let html = pageHtmlMap.get(filename) || "";
          if (needsElpxDownload && this.pageHasDownloadSourceFile(page)) {
            const basePath = i === 0 ? "" : "../";
            const manifestScriptTag = `<script src="${basePath}libs/elpx-manifest.js"> <\/script>`;
            html = html.replace(/<\/body>/i, `${manifestScriptTag}
</body>`);
          }
          this.zip.addFile(filename, html);
        }
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate complete HTML for a page
     * @param page - Page data
     * @param allPages - All pages in the project
     * @param meta - Project metadata
     * @param isIndex - Whether this is the index page
     * @param pageIndex - Page index for page counter
     * @param themeFiles - List of root-level theme CSS/JS files
     * @param faviconInfo - Favicon info (optional)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     * @param assetExportPathMap - Map of asset UUID to export path for URL transformation
     */
    generatePageHtml(page, allPages, meta, isIndex, pageIndex, themeFiles, faviconInfo, pageFilenameMap, assetExportPathMap) {
      const basePath = isIndex ? "" : "../";
      const usedIdevices = this.getUsedIdevicesForPage(page);
      const currentPageIndex = pageIndex ?? allPages.findIndex((p) => p.id === page.id);
      let customStyles = meta.customStyles || "";
      let bodyClass = "exe-export exe-web-site";
      if (meta.globalFont && meta.globalFont !== "default") {
        const globalFontCss = GlobalFontGenerator.generateCss(meta.globalFont, basePath);
        if (globalFontCss) {
          customStyles = globalFontCss + "\n" + customStyles;
        }
        const fontBodyClass = GlobalFontGenerator.getBodyClassName(meta.globalFont);
        if (fontBodyClass) {
          bodyClass += ` ${fontBodyClass}`;
        }
      }
      return this.pageRenderer.render(page, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: meta.language || "en",
        theme: meta.theme || "base",
        customStyles,
        bodyClass,
        allPages,
        basePath,
        isIndex,
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        description: meta.description || "",
        licenseUrl: meta.licenseUrl || "",
        // Page counter options
        totalPages: allPages.length,
        currentPageIndex,
        userFooterContent: meta.footer,
        // Export options
        addExeLink: meta.addExeLink ?? true,
        addPagination: meta.addPagination ?? false,
        addSearchBox: meta.addSearchBox ?? false,
        addAccessibilityToolbar: meta.addAccessibilityToolbar ?? false,
        addMathJax: meta.addMathJax ?? false,
        // Custom head content
        extraHeadContent: meta.extraHeadContent,
        // Theme files for HTML head includes
        themeFiles: themeFiles || [],
        // Favicon options
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Page filename map for navigation links (handles title collisions)
        pageFilenameMap,
        // Asset URL transformation map
        assetExportPathMap,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
    }
    /**
     * Detect theme-specific favicon from theme files map
     * @param themeFilesMap - Map of theme files
     * @returns Favicon info or null if not found
     */
    detectFavicon(themeFilesMap) {
      if (themeFilesMap.has("img/favicon.ico")) {
        return { path: "theme/img/favicon.ico", type: "image/x-icon" };
      }
      if (themeFilesMap.has("img/favicon.png")) {
        return { path: "theme/img/favicon.png", type: "image/png" };
      }
      return null;
    }
    /**
     * Prepare theme data for export: fetch theme files, extract root-level CSS/JS, detect favicon
     * @param themeName - Name of the theme to fetch
     * @returns ThemeData with files, root files list, and favicon info
     */
    async prepareThemeData(themeName) {
      const themeRootFiles = [];
      let themeFilesMap = null;
      let faviconInfo = null;
      try {
        themeFilesMap = await this.resources.fetchTheme(themeName);
        for (const [filePath] of themeFilesMap) {
          if (!filePath.includes("/") && (filePath.endsWith(".css") || filePath.endsWith(".js"))) {
            themeRootFiles.push(filePath);
          }
        }
        faviconInfo = this.detectFavicon(themeFilesMap);
      } catch (e) {
        console.warn(`[Html5Exporter] Failed to fetch theme: ${themeName}`, e);
        themeRootFiles.push("style.css", "style.js");
      }
      return { themeFilesMap, themeRootFiles, faviconInfo };
    }
    /**
     * Get page link for HTML5 export
     */
    getPageLinkForHtml5(page, allPages, basePath) {
      const isFirstPage = page.id === allPages[0]?.id;
      if (isFirstPage) {
        return basePath ? `${basePath}index.html` : "index.html";
      }
      const filename = this.sanitizePageFilename(page.title);
      return `${basePath}html/${filename}.html`;
    }
    /**
     * Get CSS for pre-rendered LaTeX (SVG+MathML)
     * This CSS is needed when LaTeX is pre-rendered instead of using MathJax at runtime
     */
    getPreRenderedLatexCss() {
      return `/* Pre-rendered LaTeX (SVG+MathML) - MathJax not included */
.exe-math-rendered { display: inline-block; vertical-align: middle; }
.exe-math-rendered[data-display="block"] { display: block; text-align: center; margin: 1em 0; }
.exe-math-rendered svg { vertical-align: middle; max-width: 100%; height: auto; }
/* Fix for MathJax array/table borders - SVG has stroke-width:0 which hides lines */
.exe-math-rendered svg line.mjx-solid { stroke-width: 60 !important; }
.exe-math-rendered svg rect[data-frame="true"] { fill: none; stroke-width: 60 !important; }
/* Hide MathML visually but keep accessible for screen readers */
.exe-math-rendered math { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }`;
    }
    /**
     * Get CSS for pre-rendered Mermaid diagrams (static SVG)
     * This CSS is needed when Mermaid is pre-rendered instead of using the library at runtime
     */
    getPreRenderedMermaidCss() {
      return `/* Pre-rendered Mermaid (static SVG) - Mermaid library not included */
.exe-mermaid-rendered { display: block; text-align: center; margin: 1.5em 0; }
.exe-mermaid-rendered svg { max-width: 100%; height: auto; }`;
    }
    /**
     * Generate preview files map (for Service Worker-based preview)
     * Returns a map of file paths to content (Uint8Array or string)
     * Same structure as ZIP export but without creating the archive
     *
     * This enables unified preview/export rendering using the eXeViewer approach:
     * - Preview uses Service Worker to serve files from memory
     * - Files are the same as what would be in the HTML5 export
     * - No blob:// URLs, no special preview rendering path
     */
    async generateForPreview(options) {
      const files = /* @__PURE__ */ new Map();
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = options?.theme || meta.theme || "base";
        const needsElpxDownload = this.needsElpxDownloadSupport(pages);
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        const fileList = needsElpxDownload ? [] : null;
        const addFile = (path, content) => {
          files.set(path, content);
          if (fileList) fileList.push(path);
        };
        const {
          themeFilesMap,
          themeRootFiles,
          faviconInfo: detectedFavicon
        } = await this.prepareThemeData(themeName);
        const faviconInfo = options?.faviconPath ? { path: options.faviconPath, type: options.faviconType || "image/x-icon" } : detectedFavicon;
        const assetExportPathMap = await this.buildAssetExportPathMap();
        const pageHtmlMap = /* @__PURE__ */ new Map();
        let latexWasRendered = false;
        let mermaidWasRendered = false;
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          let html = this.generatePageHtml(
            page,
            pages,
            meta,
            i === 0,
            i,
            themeRootFiles,
            faviconInfo,
            pageFilenameMap,
            assetExportPathMap
          );
          if (!meta.addMathJax) {
            if (options?.preRenderDataGameLatex) {
              try {
                const result = await options.preRenderDataGameLatex(html);
                if (result.count > 0) {
                  html = result.html;
                  latexWasRendered = true;
                }
              } catch {
              }
            }
            if (options?.preRenderLatex) {
              try {
                const result = await options.preRenderLatex(html);
                if (result.latexRendered) {
                  html = result.html;
                  latexWasRendered = true;
                }
              } catch {
              }
            }
          }
          if (options?.preRenderMermaid) {
            try {
              const result = await options.preRenderMermaid(html);
              if (result.mermaidRendered) {
                html = result.html;
                mermaidWasRendered = true;
              }
            } catch {
            }
          }
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = i === 0 ? "index.html" : `html/${uniqueFilename}`;
          pageHtmlMap.set(pageFilename, html);
        }
        if (meta.addSearchBox) {
          const searchIndexContent = this.pageRenderer.generateSearchIndexFile(pages, "", pageFilenameMap);
          addFile("search_index.js", searchIndexContent);
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        let baseCss = contentCssFiles.get("content/css/base.css");
        if (baseCss) {
          if (latexWasRendered || mermaidWasRendered) {
            const decoder = new TextDecoder();
            let baseCssText = decoder.decode(baseCss);
            if (latexWasRendered) {
              baseCssText += "\n" + this.getPreRenderedLatexCss();
            }
            if (mermaidWasRendered) {
              baseCssText += "\n" + this.getPreRenderedMermaidCss();
            }
            const encoder = new TextEncoder();
            baseCss = encoder.encode(baseCssText);
          }
          addFile("content/css/base.css", baseCss);
        }
        try {
          const logoData = await this.resources.fetchExeLogo();
          if (logoData) {
            addFile("content/img/exe_powered_logo.png", logoData);
          }
        } catch {
        }
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            addFile(`theme/${filePath}`, content);
          }
        } else {
          const encoder = new TextEncoder();
          addFile("theme/style.css", encoder.encode(this.getFallbackThemeCss()));
          addFile("theme/style.js", encoder.encode(this.getFallbackThemeJs()));
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [libPath, content] of baseLibs) {
            addFile(`libs/${libPath}`, content);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        addFile("libs/common_i18n.js", new TextEncoder().encode(i18nContent));
        const allHtmlContent = this.collectAllHtmlContent(pages);
        const { files: allRequiredFiles, patterns } = this.libraryDetector.getAllRequiredFilesWithPatterns(
          allHtmlContent,
          {
            includeAccessibilityToolbar: meta.addAccessibilityToolbar === true,
            includeMathJax: meta.addMathJax === true,
            skipMathJax: latexWasRendered && !meta.addMathJax
          }
        );
        try {
          const libFiles = await this.resources.fetchLibraryFiles(allRequiredFiles, patterns);
          for (const [libPath, content] of libFiles) {
            const filePath = `libs/${libPath}`;
            if (!files.has(filePath)) {
              addFile(filePath, content);
            }
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const normalizedType = this.resources.normalizeIdeviceType(idevice);
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [filePath, content] of ideviceFiles) {
              addFile(`idevices/${normalizedType}/${filePath}`, content);
            }
          } catch {
          }
        }
        await this.addAssetsToPreviewFiles(files, fileList);
        if (needsElpxDownload && fileList) {
          for (const [htmlFile] of pageHtmlMap) {
            if (!fileList.includes(htmlFile)) {
              fileList.push(htmlFile);
            }
          }
          const manifestJs = this.generateElpxManifestFile(fileList);
          addFile("libs/elpx-manifest.js", manifestJs);
        }
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const filename = i === 0 ? "index.html" : `html/${uniqueFilename}`;
          let html = pageHtmlMap.get(filename) || "";
          if (needsElpxDownload && this.pageHasDownloadSourceFile(page)) {
            const basePath = i === 0 ? "" : "../";
            const manifestScriptTag = `<script src="${basePath}libs/elpx-manifest.js"> <\/script>`;
            html = html.replace(/<\/body>/i, `${manifestScriptTag}
</body>`);
          }
          const encoder = new TextEncoder();
          files.set(filename, encoder.encode(html));
        }
        return files;
      } catch (error) {
        console.error("[Html5Exporter] generateForPreview failed:", error);
        throw error;
      }
    }
    /**
     * Add project assets to preview files map
     */
    async addAssetsToPreviewFiles(files, trackingList) {
      let assetsAdded = 0;
      try {
        const assets = await this.assets.getAllAssets();
        const exportPathMap = await this.buildAssetExportPathMap();
        for (const asset of assets) {
          const exportPath = exportPathMap.get(asset.id);
          if (!exportPath) continue;
          const filePath = `content/resources/${exportPath}`;
          files.set(filePath, asset.data);
          if (trackingList) trackingList.push(filePath);
          assetsAdded++;
        }
      } catch (e) {
        console.warn("[Html5Exporter] Failed to add assets to preview files:", e);
      }
      return assetsAdded;
    }
  };

  // src/shared/export/exporters/PageExporter.ts
  var PageExporter = class extends Html5Exporter {
    /**
     * Get file suffix for PAGE format
     */
    getFileSuffix() {
      return "_page";
    }
    /**
     * Export to single-page HTML ZIP
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = options?.theme || meta.theme || "base";
        pages = await this.preprocessPagesForExport(pages);
        const usedIdevices = this.getUsedIdevices(pages);
        const { themeFilesMap, faviconInfo } = await this.prepareThemeData(themeName);
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`theme/${filePath}`, content);
          }
        } else {
          this.zip.addFile("theme/style.css", this.getFallbackThemeCss());
          this.zip.addFile("theme/style.js", this.getFallbackThemeJs());
        }
        const html = this.generateSinglePageHtml(pages, meta, usedIdevices, faviconInfo);
        this.zip.addFile("index.html", html);
        const contentCssFiles = await this.resources.fetchContentCss();
        const baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        this.zip.addFile("content/css/base.css", baseCss);
        this.zip.addFile("content/css/single-page.css", this.getSinglePageCss());
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [path, content] of baseLibs) {
            this.zip.addFile(`libs/${path}`, content);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("libs/common_i18n.js", i18nContent);
        for (const idevice of usedIdevices) {
          try {
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [path, content] of ideviceFiles) {
              this.zip.addFile(`idevices/${idevice}/${path}`, content);
            }
          } catch {
          }
        }
        await this.addAssetsToZipWithResourcePath();
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate single-page HTML with all pages
     */
    generateSinglePageHtml(pages, meta, usedIdevices, faviconInfo) {
      return this.pageRenderer.renderSinglePage(pages, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: meta.language || "en",
        customStyles: meta.customStyles || "",
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
    }
    /**
     * Override page URL map for single-page export
     * Uses anchor fragments instead of file paths
     */
    buildPageUrlMap(pages) {
      const map = /* @__PURE__ */ new Map();
      for (const page of pages) {
        const anchor = `#section-${page.id}`;
        map.set(page.id, {
          url: anchor,
          urlFromSubpage: anchor
          // Same since it's all one page
        });
      }
      return map;
    }
    /**
     * Get CSS specific to single-page layout
     */
    getSinglePageCss() {
      return `/* Single-page specific styles */
.exe-single-page .single-page-section {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 40px;
  margin-bottom: 40px;
}

.exe-single-page .single-page-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.exe-single-page .single-page-nav {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
}

.exe-single-page .single-page-content {
  padding: 20px 30px;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Section target offset for fixed header */
.single-page-section:target {
  scroll-margin-top: 20px;
}

/* Print styles for single page */
@media print {
  .exe-single-page .single-page-nav {
    display: none;
  }
  .exe-single-page .single-page-section {
    page-break-inside: avoid;
  }
}
`;
    }
  };

  // src/shared/export/generators/Scorm12Manifest.ts
  var Scorm12ManifestGenerator = class {
    /**
     * @param projectId - Unique project identifier
     * @param pages - Pages from navigation structure
     * @param metadata - Project metadata
     */
    constructor(projectId, pages, metadata = {}) {
      this.projectId = projectId || this.generateId();
      this.pages = pages || [];
      this.metadata = metadata;
    }
    /**
     * Generate a unique ID for the project
     * @returns Unique ID string
     */
    generateId() {
      return "exe-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate complete imsmanifest.xml content
     * @param options - Generation options
     * @returns Complete XML string
     */
    generate(options = {}) {
      const { commonFiles = [], pageFiles = {}, allZipFiles } = options;
      let effectiveCommonFiles = commonFiles;
      if (allZipFiles && allZipFiles.length > 0) {
        effectiveCommonFiles = this.categorizeFilesForCommon(allZipFiles, pageFiles);
      }
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += this.generateManifestOpen();
      xml += this.generateMetadata();
      xml += this.generateOrganizations();
      xml += this.generateResources(effectiveCommonFiles, pageFiles);
      xml += "</manifest>\n";
      return xml;
    }
    /**
     * Categorize files into COMMON_FILES based on complete ZIP file list.
     * All files except page HTML files and imsmanifest.xml go into COMMON_FILES.
     * @param allFiles - Complete list of files in the ZIP
     * @param pageFiles - Map of page file info (to identify page HTML files)
     * @returns List of files for COMMON_FILES resource
     */
    categorizeFilesForCommon(allFiles, pageFiles) {
      const pageHtmlFiles = /* @__PURE__ */ new Set();
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id];
        if (pageFile?.fileUrl) {
          pageHtmlFiles.add(pageFile.fileUrl);
        } else {
          const isIndex = this.pages.indexOf(page) === 0;
          const defaultUrl = isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`;
          pageHtmlFiles.add(defaultUrl);
        }
      }
      const excludedFiles = /* @__PURE__ */ new Set([...pageHtmlFiles, "imsmanifest.xml"]);
      return allFiles.filter((file) => !excludedFiles.has(file)).sort();
    }
    /**
     * Generate manifest opening tag with namespaces
     * @returns Manifest opening XML
     */
    generateManifestOpen() {
      return `<manifest identifier="eXe-MANIFEST-${this.escapeXml(this.projectId)}"
  xmlns="${SCORM_12_NAMESPACES.imscp}"
  xmlns:adlcp="${SCORM_12_NAMESPACES.adlcp}"
  xmlns:imsmd="${SCORM_12_NAMESPACES.imsmd}">
`;
    }
    /**
     * Generate metadata section
     * @returns Metadata XML
     */
    generateMetadata() {
      let xml = "  <metadata>\n";
      xml += "    <schema>ADL SCORM</schema>\n";
      xml += "    <schemaversion>1.2</schemaversion>\n";
      xml += "    <adlcp:location>imslrm.xml</adlcp:location>\n";
      xml += "  </metadata>\n";
      return xml;
    }
    /**
     * Generate organizations section with hierarchical structure
     * @returns Organizations XML
     */
    generateOrganizations() {
      const orgId = `eXe-${this.projectId}`;
      const title = this.metadata.title || "eXeLearning";
      let xml = `  <organizations default="${this.escapeXml(orgId)}">
`;
      xml += `    <organization identifier="${this.escapeXml(orgId)}" structure="hierarchical">
`;
      xml += `      <title>${this.escapeXml(title)}</title>
`;
      xml += this.generateItems();
      xml += "    </organization>\n";
      xml += "  </organizations>\n";
      return xml;
    }
    /**
     * Generate item elements for pages in hierarchical structure
     * @returns Items XML
     */
    generateItems() {
      const pageMap = /* @__PURE__ */ new Map();
      for (const page of this.pages) {
        pageMap.set(page.id, page);
      }
      const rootPages = this.pages.filter((p) => !p.parentId);
      let xml = "";
      for (const page of rootPages) {
        xml += this.generateItemRecursive(page, pageMap, 3);
      }
      return xml;
    }
    /**
     * Generate item element recursively for nested pages
     * @param page - Page object
     * @param pageMap - Map of all pages by ID
     * @param indent - Indentation level
     * @returns Item XML
     */
    generateItemRecursive(page, pageMap, indent) {
      const indentStr = "  ".repeat(indent);
      const isVisible = "true";
      let xml = `${indentStr}<item identifier="ITEM-${this.escapeXml(page.id)}" identifierref="RES-${this.escapeXml(page.id)}" isvisible="${isVisible}">
`;
      xml += `${indentStr}  <title>${this.escapeXml(page.title || "Page")}</title>
`;
      const children = this.pages.filter((p) => p.parentId === page.id);
      for (const child of children) {
        xml += this.generateItemRecursive(child, pageMap, indent + 1);
      }
      xml += `${indentStr}</item>
`;
      return xml;
    }
    /**
     * Generate resources section
     * @param commonFiles - List of common file paths
     * @param pageFiles - Map of pageId to file info
     * @returns Resources XML
     */
    generateResources(commonFiles, pageFiles) {
      let xml = "  <resources>\n";
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id] || {};
        xml += this.generatePageResource(page, pageFile);
      }
      xml += this.generateCommonFilesResource(commonFiles);
      xml += "  </resources>\n";
      return xml;
    }
    /**
     * Generate resource element for a page
     * @param page - Page object
     * @param pageFile - Page file info
     * @returns Resource XML
     */
    generatePageResource(page, pageFile) {
      const pageId = page.id;
      const isIndex = this.pages.indexOf(page) === 0;
      const fileUrl = pageFile.fileUrl || (isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`);
      let xml = `    <resource identifier="RES-${this.escapeXml(pageId)}" type="webcontent" adlcp:scormtype="sco" href="${this.escapeXml(fileUrl)}">
`;
      xml += `      <file href="${this.escapeXml(fileUrl)}"/>
`;
      const files = pageFile.files || [];
      for (const file of files) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += '      <dependency identifierref="COMMON_FILES"/>\n';
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Generate COMMON_FILES resource for shared assets
     * @param commonFiles - List of common file paths
     * @returns Resource XML
     */
    generateCommonFilesResource(commonFiles) {
      let xml = '    <resource identifier="COMMON_FILES" type="webcontent" adlcp:scormtype="asset">\n';
      for (const file of commonFiles) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Escape XML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeXml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    /**
     * Sanitize filename for use in paths
     * @param title - Title to sanitize
     * @returns Sanitized filename
     */
    sanitizeFilename(title) {
      if (!title) return "page";
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
    }
  };

  // src/shared/export/generators/LomMetadata.ts
  var TRANSLATIONS2 = {
    "Metadata creation date": {
      en: "Metadata creation date",
      es: "Fecha de creaci\xF3n de los metadatos",
      fr: "Date de cr\xE9ation des m\xE9tadonn\xE9es",
      de: "Erstellungsdatum der Metadaten",
      pt: "Data de cria\xE7\xE3o dos metadados",
      ca: "Data de creaci\xF3 de les metadades",
      eu: "Metadatuen sorrera data",
      gl: "Data de creaci\xF3n dos metadatos"
    }
  };
  var LomMetadataGenerator = class {
    /**
     * @param projectId - Unique project identifier
     * @param metadata - Project metadata
     */
    constructor(projectId, metadata = {}) {
      this.projectId = projectId || this.generateId();
      this.metadata = metadata;
    }
    /**
     * Generate a unique ID for the project
     * @returns Unique ID string
     */
    generateId() {
      return "exe-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate complete imslrm.xml content
     * @returns Complete XML string
     */
    generate() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += this.generateLomOpen();
      xml += this.generateGeneral();
      xml += this.generateLifeCycle();
      xml += this.generateMetaMetadata();
      xml += this.generateTechnical();
      xml += this.generateEducational();
      xml += this.generateRights();
      xml += "</lom>\n";
      return xml;
    }
    /**
     * Generate lom opening tag with namespaces
     * @returns LOM opening XML
     */
    generateLomOpen() {
      return `<lom xmlns="${LOM_NAMESPACES.lom}">
`;
    }
    /**
     * Generate general section
     * @returns General XML
     */
    generateGeneral() {
      const title = this.metadata.title || "eXe-p-" + this.projectId;
      const lang = this.metadata.language || "en";
      const description = this.metadata.description || "";
      const catalogName = this.metadata.catalogName || "none";
      const catalogEntry = this.metadata.catalogEntry || "ODE-" + this.projectId;
      let xml = '  <general uniqueElementName="general">\n';
      xml += "    <identifier>\n";
      xml += `      <catalog uniqueElementName="catalog">${this.escapeXml(catalogName)}</catalog>
`;
      xml += `      <entry uniqueElementName="entry">${this.escapeXml(catalogEntry)}</entry>
`;
      xml += "    </identifier>\n";
      xml += "    <title>\n";
      xml += `      <string language="${this.escapeXml(lang)}">${this.escapeXml(title)}</string>
`;
      xml += "    </title>\n";
      xml += `    <language>${this.escapeXml(lang)}</language>
`;
      xml += "    <description>\n";
      xml += `      <string language="${this.escapeXml(lang)}">${this.escapeXml(description)}</string>
`;
      xml += "    </description>\n";
      xml += '    <aggregationLevel uniqueElementName="aggregationLevel">\n';
      xml += '      <source uniqueElementName="source">LOM-ESv1.0</source>\n';
      xml += '      <value uniqueElementName="value">2</value>\n';
      xml += "    </aggregationLevel>\n";
      xml += "  </general>\n";
      return xml;
    }
    /**
     * Generate lifeCycle section
     * @returns LifeCycle XML
     */
    generateLifeCycle() {
      const author = this.metadata.author || "";
      const lang = this.metadata.language || "en";
      const dateTime = this.getCurrentDateTime();
      let xml = "  <lifeCycle>\n";
      xml += "    <contribute>\n";
      xml += '      <role uniqueElementName="role">\n';
      xml += '        <source uniqueElementName="source">LOM-ESv1.0</source>\n';
      xml += '        <value uniqueElementName="value">author</value>\n';
      xml += "      </role>\n";
      const vcard = `BEGIN:VCARD VERSION:3.0 FN:${author} EMAIL;TYPE=INTERNET: ORG: END:VCARD`;
      xml += `      <entity>${this.escapeXml(vcard)}</entity>
`;
      xml += "      <date>\n";
      xml += `        <dateTime uniqueElementName="dateTime">${dateTime}</dateTime>
`;
      xml += "        <description>\n";
      xml += `          <string language="${this.escapeXml(lang)}">${this.getLocalizedString("Metadata creation date", lang)}</string>
`;
      xml += "        </description>\n";
      xml += "      </date>\n";
      xml += "    </contribute>\n";
      xml += "  </lifeCycle>\n";
      return xml;
    }
    /**
     * Generate metaMetadata section
     * @returns MetaMetadata XML
     */
    generateMetaMetadata() {
      const author = this.metadata.author || "";
      const lang = this.metadata.language || "en";
      const dateTime = this.getCurrentDateTime();
      let xml = '  <metaMetadata uniqueElementName="metaMetadata">\n';
      xml += "    <contribute>\n";
      xml += '      <role uniqueElementName="role">\n';
      xml += '        <source uniqueElementName="source">LOM-ESv1.0</source>\n';
      xml += '        <value uniqueElementName="value">creator</value>\n';
      xml += "      </role>\n";
      const vcard = `BEGIN:VCARD VERSION:3.0 FN:${author} EMAIL;TYPE=INTERNET: ORG: END:VCARD`;
      xml += `      <entity>${this.escapeXml(vcard)}</entity>
`;
      xml += "      <date>\n";
      xml += `        <dateTime uniqueElementName="dateTime">${dateTime}</dateTime>
`;
      xml += "        <description>\n";
      xml += `          <string language="${this.escapeXml(lang)}">${this.getLocalizedString("Metadata creation date", lang)}</string>
`;
      xml += "        </description>\n";
      xml += "      </date>\n";
      xml += "    </contribute>\n";
      xml += "    <metadataSchema>LOM-ESv1.0</metadataSchema>\n";
      xml += `    <language>${this.escapeXml(lang)}</language>
`;
      xml += "  </metaMetadata>\n";
      return xml;
    }
    /**
     * Generate technical section
     * @returns Technical XML
     */
    generateTechnical() {
      const lang = this.metadata.language || "en";
      let xml = '  <technical uniqueElementName="technical">\n';
      xml += "    <otherPlatformRequirements>\n";
      xml += `      <string language="${this.escapeXml(lang)}">editor: eXe Learning</string>
`;
      xml += "    </otherPlatformRequirements>\n";
      xml += "  </technical>\n";
      return xml;
    }
    /**
     * Generate educational section
     * @returns Educational XML
     */
    generateEducational() {
      const lang = this.metadata.language || "en";
      let xml = "  <educational>\n";
      xml += `    <language>${this.escapeXml(lang)}</language>
`;
      xml += "  </educational>\n";
      return xml;
    }
    /**
     * Generate rights section
     * @returns Rights XML
     */
    generateRights() {
      const license = this.metadata.license || "";
      let xml = '  <rights uniqueElementName="rights">\n';
      xml += '    <copyrightAndOtherRestrictions uniqueElementName="copyrightAndOtherRestrictions">\n';
      xml += '      <source uniqueElementName="source">LOM-ESv1.0</source>\n';
      xml += `      <value uniqueElementName="value">${this.escapeXml(license)}</value>
`;
      xml += "    </copyrightAndOtherRestrictions>\n";
      xml += '    <access uniqueElementName="access">\n';
      xml += '      <accessType uniqueElementName="accessType">\n';
      xml += '        <source uniqueElementName="source">LOM-ESv1.0</source>\n';
      xml += '        <value uniqueElementName="value">universal</value>\n';
      xml += "      </accessType>\n";
      xml += "      <description>\n";
      xml += '        <string language="en">Default</string>\n';
      xml += "      </description>\n";
      xml += "    </access>\n";
      xml += "  </rights>\n";
      return xml;
    }
    /**
     * Get current date/time in ISO format with timezone
     * @returns ISO date time string
     */
    getCurrentDateTime() {
      const now = /* @__PURE__ */ new Date();
      const offset = now.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, "0");
      const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, "0");
      const offsetSign = offset <= 0 ? "+" : "-";
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.00${offsetSign}${offsetHours}:${offsetMinutes}`;
    }
    /**
     * Get localized string (basic implementation)
     * @param key - Translation key
     * @param lang - Language code
     * @returns Localized string
     */
    getLocalizedString(key, lang) {
      const langShort = lang.substring(0, 2).toLowerCase();
      if (TRANSLATIONS2[key]?.[langShort]) {
        return TRANSLATIONS2[key][langShort];
      }
      return TRANSLATIONS2[key]?.en || key;
    }
    /**
     * Escape XML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeXml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
  };

  // src/shared/export/exporters/Scorm12Exporter.ts
  var Scorm12Exporter = class extends Html5Exporter {
    constructor() {
      super(...arguments);
      this.manifestGenerator = null;
      this.lomGenerator = null;
    }
    /**
     * Get file suffix for SCORM 1.2 format
     */
    getFileSuffix() {
      return "_scorm";
    }
    /**
     * Export to SCORM 1.2 ZIP
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = options?.theme || meta.theme || "base";
        const projectId = this.generateProjectId();
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        this.manifestGenerator = new Scorm12ManifestGenerator(projectId, pages, {
          title: meta.title || "eXeLearning",
          language: meta.language || "en",
          author: meta.author || "",
          description: meta.description || "",
          license: meta.license || ""
        });
        this.lomGenerator = new LomMetadataGenerator(projectId, {
          title: meta.title || "eXeLearning",
          language: meta.language || "en",
          author: meta.author || "",
          description: meta.description || "",
          license: meta.license || ""
        });
        const commonFiles = [];
        const pageFiles = {};
        const { themeFilesMap, themeRootFiles, faviconInfo } = await this.prepareThemeData(themeName);
        let latexWasRendered = false;
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const isIndex = i === 0;
          let html = this.generateScormPageHtml(
            page,
            pages,
            meta,
            isIndex,
            themeRootFiles,
            i,
            faviconInfo,
            pageFilenameMap
          );
          if (!meta.addMathJax && options?.preRenderLatex) {
            try {
              const result = await options.preRenderLatex(html);
              if (result.latexRendered) {
                html = result.html;
                latexWasRendered = true;
                console.log(
                  `[Scorm12Exporter] Pre-rendered ${result.count} LaTeX expressions on page: ${page.title}`
                );
              }
            } catch (error) {
              console.warn("[Scorm12Exporter] LaTeX pre-render failed for page:", page.title, error);
            }
          }
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = isIndex ? "index.html" : `html/${uniqueFilename}`;
          this.zip.addFile(pageFilename, html);
          pageFiles[page.id] = {
            fileUrl: pageFilename,
            files: []
          };
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        let baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        if (latexWasRendered) {
          const latexCss = this.getPreRenderedLatexCss();
          const decoder = new TextDecoder();
          const baseCssText = decoder.decode(baseCss);
          const encoder = new TextEncoder();
          baseCss = encoder.encode(baseCssText + "\n" + latexCss);
        }
        this.zip.addFile("content/css/base.css", baseCss);
        commonFiles.push("content/css/base.css");
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`theme/${filePath}`, content);
            commonFiles.push(`theme/${filePath}`);
          }
        } else {
          this.zip.addFile("theme/style.css", this.getFallbackThemeCss());
          this.zip.addFile("theme/style.js", this.getFallbackThemeJs());
          commonFiles.push("theme/style.css", "theme/style.js");
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [path, content] of baseLibs) {
            this.zip.addFile(`libs/${path}`, content);
            commonFiles.push(`libs/${path}`);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("libs/common_i18n.js", i18nContent);
        commonFiles.push("libs/common_i18n.js");
        try {
          const scormFiles = await this.resources.fetchScormFiles("1.2");
          for (const [filePath, content] of scormFiles) {
            this.zip.addFile(`libs/${filePath}`, content);
            commonFiles.push(`libs/${filePath}`);
          }
        } catch {
          this.zip.addFile("libs/SCORM_API_wrapper.js", this.getScormApiWrapper());
          this.zip.addFile("libs/SCOFunctions.js", this.getScoFunctions());
          commonFiles.push("libs/SCORM_API_wrapper.js", "libs/SCOFunctions.js");
        }
        try {
          const contentXml = await this.getContentXml();
          if (contentXml) {
            this.zip.addFile("content.xml", contentXml);
            commonFiles.push("content.xml");
            this.zip.addFile(ODE_DTD_FILENAME, ODE_DTD_CONTENT);
            commonFiles.push(ODE_DTD_FILENAME);
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [path, content] of ideviceFiles) {
              this.zip.addFile(`idevices/${idevice}/${path}`, content);
              commonFiles.push(`idevices/${idevice}/${path}`);
            }
          } catch {
          }
        }
        await this.addAssetsToZipWithResourcePath();
        const lomXml = this.lomGenerator.generate();
        this.zip.addFile("imslrm.xml", lomXml);
        const allZipFiles = this.zip.getFilePaths();
        const manifestXml = this.manifestGenerator.generate({
          commonFiles,
          pageFiles,
          allZipFiles
        });
        this.zip.addFile("imsmanifest.xml", manifestXml);
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate project ID for SCORM package
     */
    generateProjectId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate SCORM-enabled HTML page
     * @param page - Page data
     * @param allPages - All pages in the project
     * @param meta - Project metadata
     * @param isIndex - Whether this is the index page
     * @param themeFiles - List of root-level theme CSS/JS files
     * @param pageIndex - Index of the current page (for page counter)
     * @param faviconInfo - Favicon info (optional)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    generateScormPageHtml(page, allPages, meta, isIndex, themeFiles, pageIndex, faviconInfo, pageFilenameMap) {
      const basePath = isIndex ? "" : "../";
      const usedIdevices = this.getUsedIdevicesForPage(page);
      return this.pageRenderer.render(page, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: meta.language || "en",
        theme: meta.theme || "base",
        customStyles: meta.customStyles || "",
        allPages,
        basePath,
        isIndex,
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        description: meta.description || "",
        licenseUrl: meta.licenseUrl || "",
        // Export options - SCORM specific overrides
        // SCORM/IMS exports don't use client-side search - LMS handles navigation
        addSearchBox: false,
        // Force page counter for SCORM
        addPagination: true,
        totalPages: allPages.length,
        currentPageIndex: pageIndex ?? 0,
        // SCORM-specific options
        isScorm: true,
        scormVersion: "1.2",
        bodyClass: "exe-export exe-scorm exe-scorm12",
        extraHeadScripts: this.getScormHeadScripts(basePath),
        onLoadScript: "loadPage()",
        onUnloadScript: "unloadPage()",
        // Hide navigation elements - LMS handles navigation in SCORM
        hideNavigation: true,
        hideNavButtons: true,
        // Theme files for HTML head includes
        themeFiles: themeFiles || [],
        // Favicon options
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Page filename map for navigation links (handles title collisions)
        pageFilenameMap,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
    }
    /**
     * Get SCORM-specific head scripts
     */
    getScormHeadScripts(basePath) {
      return `<script src="${basePath}libs/SCORM_API_wrapper.js"><\/script>
<script src="${basePath}libs/SCOFunctions.js"><\/script>`;
    }
    /**
     * Get minimal SCORM API wrapper (fallback)
     */
    getScormApiWrapper() {
      return `/**
 * SCORM API Wrapper
 * Minimal implementation for SCORM 1.2 communication
 */
var pipwerks = pipwerks || {};

pipwerks.SCORM = {
  version: "1.2",
  API: { handle: null, isFound: false },
  data: { completionStatus: null, exitStatus: null },
  debug: { isActive: true }
};

pipwerks.SCORM.API.find = function(win) {
  var findAttempts = 0, findAttemptLimit = 500;
  while (!win.API && win.parent && win.parent !== win && findAttempts < findAttemptLimit) {
    findAttempts++;
    win = win.parent;
  }
  return win.API || null;
};

pipwerks.SCORM.API.get = function() {
  var win = window;
  if (win.parent && win.parent !== win) { this.handle = this.find(win.parent); }
  if (!this.handle && win.opener) { this.handle = this.find(win.opener); }
  if (this.handle) { this.isFound = true; }
  return this.handle;
};

pipwerks.SCORM.API.getHandle = function() {
  if (!this.handle) { this.get(); }
  return this.handle;
};

pipwerks.SCORM.connection = { isActive: false };

pipwerks.SCORM.init = function() {
  var success = false, API = this.API.getHandle();
  if (API) {
    success = API.LMSInitialize("");
    if (success) { this.connection.isActive = true; }
  }
  return success;
};

pipwerks.SCORM.quit = function() {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.LMSFinish("");
    if (success) { this.connection.isActive = false; }
  }
  return success;
};

pipwerks.SCORM.get = function(parameter) {
  var value = "", API = this.API.getHandle();
  if (API && this.connection.isActive) {
    value = API.LMSGetValue(parameter);
  }
  return value;
};

pipwerks.SCORM.set = function(parameter, value) {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.LMSSetValue(parameter, value);
  }
  return success;
};

pipwerks.SCORM.save = function() {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.LMSCommit("");
  }
  return success;
};

// Shorthand
var scorm = pipwerks.SCORM;
`;
    }
    /**
     * Get minimal SCO Functions (fallback)
     */
    getScoFunctions() {
      return `/**
 * SCO Functions for SCORM 1.2
 * Page load/unload handlers for SCORM communication
 */

var startTimeStamp = null;
var exitPageStatus = false;

function loadPage() {
  startTimeStamp = new Date();
  var result = scorm.init();
  if (result) {
    var status = scorm.get("cmi.core.lesson_status");
    if (status === "not attempted" || status === "") {
      scorm.set("cmi.core.lesson_status", "incomplete");
    }
  }
  return result;
}

function unloadPage() {
  if (!exitPageStatus) {
    exitPageStatus = true;
    computeTime();
    scorm.quit();
  }
}

function computeTime() {
  if (startTimeStamp != null) {
    var now = new Date();
    var elapsed = now.getTime() - startTimeStamp.getTime();
    elapsed = Math.round(elapsed / 1000);
    var hours = Math.floor(elapsed / 3600);
    var mins = Math.floor((elapsed - hours * 3600) / 60);
    var secs = elapsed - hours * 3600 - mins * 60;
    hours = hours < 10 ? "0" + hours : hours;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    var sessionTime = hours + ":" + mins + ":" + secs;
    scorm.set("cmi.core.session_time", sessionTime);
  }
}

function setComplete() {
  scorm.set("cmi.core.lesson_status", "completed");
  scorm.save();
}

function setIncomplete() {
  scorm.set("cmi.core.lesson_status", "incomplete");
  scorm.save();
}

function setScore(score, maxScore, minScore) {
  scorm.set("cmi.core.score.raw", score);
  if (maxScore !== undefined) scorm.set("cmi.core.score.max", maxScore);
  if (minScore !== undefined) scorm.set("cmi.core.score.min", minScore);
  scorm.save();
}
`;
    }
    /**
     * Get content.xml from the document for inclusion in SCORM package
     * This allows the package to be re-edited in eXeLearning
     */
    async getContentXml() {
      if ("getContentXml" in this.document && typeof this.document.getContentXml === "function") {
        return this.document.getContentXml();
      }
      return null;
    }
  };

  // src/shared/export/generators/Scorm2004Manifest.ts
  var Scorm2004ManifestGenerator = class {
    /**
     * @param projectId - Unique project identifier
     * @param pages - Pages from navigation structure
     * @param metadata - Project metadata
     */
    constructor(projectId, pages, metadata = {}) {
      this.projectId = projectId || this.generateId();
      this.pages = pages || [];
      this.metadata = metadata;
    }
    /**
     * Generate a unique ID for the project
     * @returns Unique ID string
     */
    generateId() {
      return "exe-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate complete imsmanifest.xml content
     * @param options - Generation options
     * @returns Complete XML string
     */
    generate(options = {}) {
      const { commonFiles = [], pageFiles = {}, allZipFiles } = options;
      let effectiveCommonFiles = commonFiles;
      if (allZipFiles && allZipFiles.length > 0) {
        effectiveCommonFiles = this.categorizeFilesForCommon(allZipFiles, pageFiles);
      }
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += this.generateManifestOpen();
      xml += this.generateMetadata();
      xml += this.generateOrganizations();
      xml += this.generateResources(effectiveCommonFiles, pageFiles);
      xml += "</manifest>\n";
      return xml;
    }
    /**
     * Categorize files into COMMON_FILES based on complete ZIP file list.
     * All files except page HTML files and imsmanifest.xml go into COMMON_FILES.
     * @param allFiles - Complete list of files in the ZIP
     * @param pageFiles - Map of page file info (to identify page HTML files)
     * @returns List of files for COMMON_FILES resource
     */
    categorizeFilesForCommon(allFiles, pageFiles) {
      const pageHtmlFiles = /* @__PURE__ */ new Set();
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id];
        if (pageFile?.fileUrl) {
          pageHtmlFiles.add(pageFile.fileUrl);
        } else {
          const isIndex = this.pages.indexOf(page) === 0;
          const defaultUrl = isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`;
          pageHtmlFiles.add(defaultUrl);
        }
      }
      const excludedFiles = /* @__PURE__ */ new Set([...pageHtmlFiles, "imsmanifest.xml"]);
      return allFiles.filter((file) => !excludedFiles.has(file)).sort();
    }
    /**
     * Generate manifest opening tag with SCORM 2004 namespaces
     * @returns Manifest opening XML
     */
    generateManifestOpen() {
      return `<manifest identifier="eXe-MANIFEST-${this.escapeXml(this.projectId)}"
  xmlns="${SCORM_2004_NAMESPACES.imscp}"
  xmlns:adlcp="${SCORM_2004_NAMESPACES.adlcp}"
  xmlns:adlseq="${SCORM_2004_NAMESPACES.adlseq}"
  xmlns:adlnav="${SCORM_2004_NAMESPACES.adlnav}"
  xmlns:imsss="${SCORM_2004_NAMESPACES.imsss}">
`;
    }
    /**
     * Generate metadata section
     * @returns Metadata XML
     */
    generateMetadata() {
      let xml = "  <metadata>\n";
      xml += "    <schema>ADL SCORM</schema>\n";
      xml += "    <schemaversion>2004 4th Edition</schemaversion>\n";
      xml += "    <adlcp:location>imslrm.xml</adlcp:location>\n";
      xml += "  </metadata>\n";
      return xml;
    }
    /**
     * Generate organizations section with sequencing
     * @returns Organizations XML
     */
    generateOrganizations() {
      const orgId = `eXe-${this.projectId}`;
      const title = this.metadata.title || "eXeLearning";
      let xml = `  <organizations default="${this.escapeXml(orgId)}">
`;
      xml += `    <organization identifier="${this.escapeXml(orgId)}" structure="hierarchical">
`;
      xml += `      <title>${this.escapeXml(title)}</title>
`;
      xml += this.generateItems();
      xml += this.generateOrganizationSequencing();
      xml += "    </organization>\n";
      xml += "  </organizations>\n";
      return xml;
    }
    /**
     * Generate organization-level sequencing rules
     * @returns Sequencing XML
     */
    generateOrganizationSequencing() {
      return `      <imsss:sequencing>
        <imsss:controlMode choice="true" choiceExit="true" flow="true" forwardOnly="false"/>
      </imsss:sequencing>
`;
    }
    /**
     * Generate item elements for pages in hierarchical structure
     * @returns Items XML
     */
    generateItems() {
      const pageMap = /* @__PURE__ */ new Map();
      for (const page of this.pages) {
        pageMap.set(page.id, page);
      }
      const rootPages = this.pages.filter((p) => !p.parentId);
      let xml = "";
      for (const page of rootPages) {
        xml += this.generateItemRecursive(page, pageMap, 3);
      }
      return xml;
    }
    /**
     * Generate item element recursively for nested pages
     * @param page - Page object
     * @param pageMap - Map of all pages by ID
     * @param indent - Indentation level
     * @returns Item XML
     */
    generateItemRecursive(page, pageMap, indent) {
      const indentStr = "  ".repeat(indent);
      const isVisible = "true";
      const children = this.pages.filter((p) => p.parentId === page.id);
      const hasChildren = children.length > 0;
      let xml = `${indentStr}<item identifier="ITEM-${this.escapeXml(page.id)}" identifierref="RES-${this.escapeXml(page.id)}" isvisible="${isVisible}">
`;
      xml += `${indentStr}  <title>${this.escapeXml(page.title || "Page")}</title>
`;
      for (const child of children) {
        xml += this.generateItemRecursive(child, pageMap, indent + 1);
      }
      if (hasChildren) {
        xml += this.generateItemSequencing(indentStr + "  ");
      }
      xml += `${indentStr}</item>
`;
      return xml;
    }
    /**
     * Generate sequencing rules for a parent item (cluster)
     * @param indentStr - Indentation string
     * @returns Sequencing XML
     */
    generateItemSequencing(indentStr) {
      return `${indentStr}<imsss:sequencing>
${indentStr}  <imsss:controlMode choice="true" choiceExit="true" flow="true"/>
${indentStr}</imsss:sequencing>
`;
    }
    /**
     * Generate resources section
     * @param commonFiles - List of common file paths
     * @param pageFiles - Map of pageId to file info
     * @returns Resources XML
     */
    generateResources(commonFiles, pageFiles) {
      let xml = "  <resources>\n";
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id] || {};
        xml += this.generatePageResource(page, pageFile);
      }
      xml += this.generateCommonFilesResource(commonFiles);
      xml += "  </resources>\n";
      return xml;
    }
    /**
     * Generate resource element for a page
     * @param page - Page object
     * @param pageFile - Page file info
     * @returns Resource XML
     */
    generatePageResource(page, pageFile) {
      const pageId = page.id;
      const isIndex = this.pages.indexOf(page) === 0;
      const fileUrl = pageFile.fileUrl || (isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`);
      let xml = `    <resource identifier="RES-${this.escapeXml(pageId)}" type="webcontent" adlcp:scormType="sco" href="${this.escapeXml(fileUrl)}">
`;
      xml += `      <file href="${this.escapeXml(fileUrl)}"/>
`;
      const files = pageFile.files || [];
      for (const file of files) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += '      <dependency identifierref="COMMON_FILES"/>\n';
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Generate COMMON_FILES resource for shared assets
     * @param commonFiles - List of common file paths
     * @returns Resource XML
     */
    generateCommonFilesResource(commonFiles) {
      let xml = '    <resource identifier="COMMON_FILES" type="webcontent" adlcp:scormType="asset">\n';
      for (const file of commonFiles) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Escape XML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeXml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    /**
     * Sanitize filename for use in paths
     * @param title - Title to sanitize
     * @returns Sanitized filename
     */
    sanitizeFilename(title) {
      if (!title) return "page";
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
    }
  };

  // src/shared/export/exporters/Scorm2004Exporter.ts
  var Scorm2004Exporter = class extends Html5Exporter {
    constructor() {
      super(...arguments);
      this.manifestGenerator = null;
      this.lomGenerator = null;
    }
    /**
     * Get file suffix for SCORM 2004 format
     */
    getFileSuffix() {
      return "_scorm2004";
    }
    /**
     * Export to SCORM 2004 ZIP
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = options?.theme || meta.theme || "base";
        const projectId = this.generateProjectId();
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        this.manifestGenerator = new Scorm2004ManifestGenerator(projectId, pages, {
          title: meta.title || "eXeLearning",
          language: meta.language || "en",
          author: meta.author || "",
          description: meta.description || "",
          license: meta.license || ""
        });
        this.lomGenerator = new LomMetadataGenerator(projectId, {
          title: meta.title || "eXeLearning",
          language: meta.language || "en",
          author: meta.author || "",
          description: meta.description || "",
          license: meta.license || ""
        });
        const commonFiles = [];
        const pageFiles = {};
        const { themeFilesMap, themeRootFiles, faviconInfo } = await this.prepareThemeData(themeName);
        let latexWasRendered = false;
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const isIndex = i === 0;
          let html = this.generateScorm2004PageHtml(
            page,
            pages,
            meta,
            isIndex,
            themeRootFiles,
            i,
            faviconInfo,
            pageFilenameMap
          );
          if (!meta.addMathJax && options?.preRenderLatex) {
            try {
              const result = await options.preRenderLatex(html);
              if (result.latexRendered) {
                html = result.html;
                latexWasRendered = true;
                console.log(
                  `[Scorm2004Exporter] Pre-rendered ${result.count} LaTeX expressions on page: ${page.title}`
                );
              }
            } catch (error) {
              console.warn("[Scorm2004Exporter] LaTeX pre-render failed for page:", page.title, error);
            }
          }
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = isIndex ? "index.html" : `html/${uniqueFilename}`;
          this.zip.addFile(pageFilename, html);
          pageFiles[page.id] = {
            fileUrl: pageFilename,
            files: []
          };
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        let baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        if (latexWasRendered) {
          const latexCss = this.getPreRenderedLatexCss();
          const decoder = new TextDecoder();
          const baseCssText = decoder.decode(baseCss);
          const encoder = new TextEncoder();
          baseCss = encoder.encode(baseCssText + "\n" + latexCss);
        }
        this.zip.addFile("content/css/base.css", baseCss);
        commonFiles.push("content/css/base.css");
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`theme/${filePath}`, content);
            commonFiles.push(`theme/${filePath}`);
          }
        } else {
          this.zip.addFile("theme/style.css", this.getFallbackThemeCss());
          this.zip.addFile("theme/style.js", this.getFallbackThemeJs());
          commonFiles.push("theme/style.css", "theme/style.js");
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [path, content] of baseLibs) {
            this.zip.addFile(`libs/${path}`, content);
            commonFiles.push(`libs/${path}`);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("libs/common_i18n.js", i18nContent);
        commonFiles.push("libs/common_i18n.js");
        try {
          const scormFiles = await this.resources.fetchScormFiles("2004");
          for (const [filePath, content] of scormFiles) {
            this.zip.addFile(`libs/${filePath}`, content);
            commonFiles.push(`libs/${filePath}`);
          }
        } catch {
          this.zip.addFile("libs/SCORM_API_wrapper.js", this.getScorm2004ApiWrapper());
          this.zip.addFile("libs/SCOFunctions.js", this.getSco2004Functions());
          commonFiles.push("libs/SCORM_API_wrapper.js", "libs/SCOFunctions.js");
        }
        try {
          const contentXml = await this.getContentXml();
          if (contentXml) {
            this.zip.addFile("content.xml", contentXml);
            commonFiles.push("content.xml");
            this.zip.addFile(ODE_DTD_FILENAME, ODE_DTD_CONTENT);
            commonFiles.push(ODE_DTD_FILENAME);
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [path, content] of ideviceFiles) {
              this.zip.addFile(`idevices/${idevice}/${path}`, content);
              commonFiles.push(`idevices/${idevice}/${path}`);
            }
          } catch {
          }
        }
        await this.addAssetsToZipWithResourcePath();
        const lomXml = this.lomGenerator.generate();
        this.zip.addFile("imslrm.xml", lomXml);
        const allZipFiles = this.zip.getFilePaths();
        const manifestXml = this.manifestGenerator.generate({
          commonFiles,
          pageFiles,
          allZipFiles
        });
        this.zip.addFile("imsmanifest.xml", manifestXml);
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate project ID for SCORM package
     */
    generateProjectId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate SCORM 2004-enabled HTML page
     * @param page - Page data
     * @param allPages - All pages in the project
     * @param meta - Project metadata
     * @param isIndex - Whether this is the index page
     * @param themeFiles - List of root-level theme CSS/JS files
     * @param pageIndex - Index of the current page (for page counter)
     * @param faviconInfo - Favicon info (optional)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    generateScorm2004PageHtml(page, allPages, meta, isIndex, themeFiles, pageIndex, faviconInfo, pageFilenameMap) {
      const basePath = isIndex ? "" : "../";
      const usedIdevices = this.getUsedIdevicesForPage(page);
      return this.pageRenderer.render(page, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: meta.language || "en",
        theme: meta.theme || "base",
        customStyles: meta.customStyles || "",
        allPages,
        basePath,
        isIndex,
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        description: meta.description || "",
        licenseUrl: meta.licenseUrl || "",
        // Export options - SCORM specific overrides
        // SCORM/IMS exports don't use client-side search - LMS handles navigation
        addSearchBox: false,
        // Force page counter for SCORM
        addPagination: true,
        totalPages: allPages.length,
        currentPageIndex: pageIndex ?? 0,
        // SCORM 2004-specific options
        isScorm: true,
        scormVersion: "2004",
        bodyClass: "exe-export exe-scorm exe-scorm2004",
        extraHeadScripts: this.getScorm2004HeadScripts(basePath),
        onLoadScript: "loadPage()",
        onUnloadScript: "unloadPage()",
        // Hide navigation elements - LMS handles navigation in SCORM
        hideNavigation: true,
        hideNavButtons: true,
        // Theme files for HTML head includes
        themeFiles: themeFiles || [],
        // Favicon options
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Page filename map for navigation links (handles title collisions)
        pageFilenameMap,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
    }
    /**
     * Get SCORM 2004-specific head scripts
     */
    getScorm2004HeadScripts(basePath) {
      return `<script src="${basePath}libs/SCORM_API_wrapper.js"><\/script>
<script src="${basePath}libs/SCOFunctions.js"><\/script>`;
    }
    /**
     * Get SCORM 2004 API wrapper (fallback)
     */
    getScorm2004ApiWrapper() {
      return `/**
 * SCORM 2004 API Wrapper
 * Minimal implementation for SCORM 2004 communication
 */
var pipwerks = pipwerks || {};

pipwerks.SCORM = {
  version: "2004",
  API: { handle: null, isFound: false },
  data: { completionStatus: null, exitStatus: null },
  debug: { isActive: true }
};

pipwerks.SCORM.API.find = function(win) {
  var findAttempts = 0, findAttemptLimit = 500;
  while (!win.API_1484_11 && win.parent && win.parent !== win && findAttempts < findAttemptLimit) {
    findAttempts++;
    win = win.parent;
  }
  return win.API_1484_11 || null;
};

pipwerks.SCORM.API.get = function() {
  var win = window;
  if (win.parent && win.parent !== win) { this.handle = this.find(win.parent); }
  if (!this.handle && win.opener) { this.handle = this.find(win.opener); }
  if (this.handle) { this.isFound = true; }
  return this.handle;
};

pipwerks.SCORM.API.getHandle = function() {
  if (!this.handle) { this.get(); }
  return this.handle;
};

pipwerks.SCORM.connection = { isActive: false };

pipwerks.SCORM.init = function() {
  var success = false, API = this.API.getHandle();
  if (API) {
    success = API.Initialize("");
    if (success === "true" || success === true) {
      this.connection.isActive = true;
      success = true;
    }
  }
  return success;
};

pipwerks.SCORM.quit = function() {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.Terminate("");
    if (success === "true" || success === true) {
      this.connection.isActive = false;
      success = true;
    }
  }
  return success;
};

pipwerks.SCORM.get = function(parameter) {
  var value = "", API = this.API.getHandle();
  if (API && this.connection.isActive) {
    value = API.GetValue(parameter);
  }
  return value;
};

pipwerks.SCORM.set = function(parameter, value) {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.SetValue(parameter, value);
    success = (success === "true" || success === true);
  }
  return success;
};

pipwerks.SCORM.save = function() {
  var success = false, API = this.API.getHandle();
  if (API && this.connection.isActive) {
    success = API.Commit("");
    success = (success === "true" || success === true);
  }
  return success;
};

// Shorthand
var scorm = pipwerks.SCORM;
`;
    }
    /**
     * Get SCO Functions for SCORM 2004 (fallback)
     */
    getSco2004Functions() {
      return `/**
 * SCO Functions for SCORM 2004
 * Page load/unload handlers for SCORM 2004 communication
 */

var startTimeStamp = null;
var exitPageStatus = false;

function loadPage() {
  startTimeStamp = new Date();
  var result = scorm.init();
  if (result) {
    var status = scorm.get("cmi.completion_status");
    if (status === "not attempted" || status === "unknown" || status === "") {
      scorm.set("cmi.completion_status", "incomplete");
    }
  }
  return result;
}

function unloadPage() {
  if (!exitPageStatus) {
    exitPageStatus = true;
    computeTime();
    scorm.set("cmi.exit", "suspend");
    scorm.save();
    scorm.quit();
  }
}

function computeTime() {
  if (startTimeStamp != null) {
    var now = new Date();
    var elapsed = now.getTime() - startTimeStamp.getTime();
    // SCORM 2004 uses ISO 8601 duration format
    var seconds = Math.round(elapsed / 1000);
    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor((seconds - hours * 3600) / 60);
    var secs = seconds - hours * 3600 - mins * 60;
    // Format: PT#H#M#S
    var sessionTime = "PT" + hours + "H" + mins + "M" + secs + "S";
    scorm.set("cmi.session_time", sessionTime);
  }
}

function setComplete() {
  scorm.set("cmi.completion_status", "completed");
  scorm.set("cmi.success_status", "passed");
  scorm.save();
}

function setIncomplete() {
  scorm.set("cmi.completion_status", "incomplete");
  scorm.save();
}

function setScore(score, maxScore, minScore) {
  // SCORM 2004 score must be between 0 and 1
  var scaledScore = maxScore ? score / maxScore : score / 100;
  scorm.set("cmi.score.scaled", scaledScore);
  scorm.set("cmi.score.raw", score);
  if (maxScore !== undefined) scorm.set("cmi.score.max", maxScore);
  if (minScore !== undefined) scorm.set("cmi.score.min", minScore);
  scorm.save();
}
`;
    }
    /**
     * Get content.xml from the document for inclusion in SCORM package
     * This allows the package to be re-edited in eXeLearning
     */
    async getContentXml() {
      if ("getContentXml" in this.document && typeof this.document.getContentXml === "function") {
        return this.document.getContentXml();
      }
      return null;
    }
  };

  // src/shared/export/generators/ImsManifest.ts
  var ImsManifestGenerator = class {
    /**
     * @param projectId - Unique project identifier
     * @param pages - Pages from navigation structure
     * @param metadata - Project metadata
     */
    constructor(projectId, pages, metadata = {}) {
      this.projectId = projectId || this.generateId();
      this.pages = pages || [];
      this.metadata = metadata;
    }
    /**
     * Generate a unique ID for the project
     * @returns Unique ID string
     */
    generateId() {
      return "exe-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate complete imsmanifest.xml content
     * @param options - Generation options
     * @returns Complete XML string
     */
    generate(options = {}) {
      const { commonFiles = [], pageFiles = {}, allZipFiles } = options;
      let effectiveCommonFiles = commonFiles;
      if (allZipFiles && allZipFiles.length > 0) {
        effectiveCommonFiles = this.categorizeFilesForCommon(allZipFiles, pageFiles);
      }
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += this.generateManifestOpen();
      xml += this.generateMetadata();
      xml += this.generateOrganizations();
      xml += this.generateResources(effectiveCommonFiles, pageFiles);
      xml += "</manifest>\n";
      return xml;
    }
    /**
     * Categorize files into COMMON_FILES based on complete ZIP file list.
     * All files except page HTML files and imsmanifest.xml go into COMMON_FILES.
     * @param allFiles - Complete list of files in the ZIP
     * @param pageFiles - Map of page file info (to identify page HTML files)
     * @returns List of files for COMMON_FILES resource
     */
    categorizeFilesForCommon(allFiles, pageFiles) {
      const pageHtmlFiles = /* @__PURE__ */ new Set();
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id];
        if (pageFile?.fileUrl) {
          pageHtmlFiles.add(pageFile.fileUrl);
        } else {
          const isIndex = this.pages.indexOf(page) === 0;
          const defaultUrl = isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`;
          pageHtmlFiles.add(defaultUrl);
        }
      }
      const excludedFiles = /* @__PURE__ */ new Set([...pageHtmlFiles, "imsmanifest.xml", "imslrm.xml"]);
      return allFiles.filter((file) => !excludedFiles.has(file)).sort();
    }
    /**
     * Generate manifest opening tag with IMS CP namespaces
     * @returns Manifest opening XML
     */
    generateManifestOpen() {
      return `<manifest identifier="eXe-MANIFEST-${this.escapeXml(this.projectId)}"
  xmlns="${IMS_NAMESPACES.imscp}"
  xmlns:imsmd="${IMS_NAMESPACES.imsmd}">
`;
    }
    /**
     * Generate metadata section with inline LOM
     * @returns Metadata XML
     */
    generateMetadata() {
      const title = this.metadata.title || "eXeLearning";
      const description = this.metadata.description || "";
      const language = this.metadata.language || "en";
      const author = this.metadata.author || "";
      let xml = "  <metadata>\n";
      xml += "    <schema>IMS Content</schema>\n";
      xml += "    <schemaversion>1.1.3</schemaversion>\n";
      xml += "    <imsmd:lom>\n";
      xml += "      <imsmd:general>\n";
      xml += `        <imsmd:title>
`;
      xml += `          <imsmd:langstring xml:lang="${this.escapeXml(language)}">${this.escapeXml(title)}</imsmd:langstring>
`;
      xml += `        </imsmd:title>
`;
      if (description) {
        xml += `        <imsmd:description>
`;
        xml += `          <imsmd:langstring xml:lang="${this.escapeXml(language)}">${this.escapeXml(description)}</imsmd:langstring>
`;
        xml += `        </imsmd:description>
`;
      }
      xml += `        <imsmd:language>${this.escapeXml(language)}</imsmd:language>
`;
      xml += "      </imsmd:general>\n";
      if (author) {
        xml += "      <imsmd:lifecycle>\n";
        xml += "        <imsmd:contribute>\n";
        xml += "          <imsmd:role>\n";
        xml += "            <imsmd:value>Author</imsmd:value>\n";
        xml += "          </imsmd:role>\n";
        xml += "          <imsmd:centity>\n";
        xml += `            <imsmd:vcard>BEGIN:VCARD\\nFN:${this.escapeXml(author)}\\nEND:VCARD</imsmd:vcard>
`;
        xml += "          </imsmd:centity>\n";
        xml += "        </imsmd:contribute>\n";
        xml += "      </imsmd:lifecycle>\n";
      }
      xml += "    </imsmd:lom>\n";
      xml += "  </metadata>\n";
      return xml;
    }
    /**
     * Generate organizations section
     * @returns Organizations XML
     */
    generateOrganizations() {
      const orgId = `eXe-${this.projectId}`;
      const title = this.metadata.title || "eXeLearning";
      let xml = `  <organizations default="${this.escapeXml(orgId)}">
`;
      xml += `    <organization identifier="${this.escapeXml(orgId)}" structure="hierarchical">
`;
      xml += `      <title>${this.escapeXml(title)}</title>
`;
      xml += this.generateItems();
      xml += "    </organization>\n";
      xml += "  </organizations>\n";
      return xml;
    }
    /**
     * Generate item elements for pages in hierarchical structure
     * @returns Items XML
     */
    generateItems() {
      const pageMap = /* @__PURE__ */ new Map();
      for (const page of this.pages) {
        pageMap.set(page.id, page);
      }
      const rootPages = this.pages.filter((p) => !p.parentId);
      let xml = "";
      for (const page of rootPages) {
        xml += this.generateItemRecursive(page, pageMap, 3);
      }
      return xml;
    }
    /**
     * Generate item element recursively for nested pages
     * @param page - Page object
     * @param pageMap - Map of all pages by ID
     * @param indent - Indentation level
     * @returns Item XML
     */
    generateItemRecursive(page, pageMap, indent) {
      const indentStr = "  ".repeat(indent);
      const isVisible = "true";
      const children = this.pages.filter((p) => p.parentId === page.id);
      let xml = `${indentStr}<item identifier="ITEM-${this.escapeXml(page.id)}" identifierref="RES-${this.escapeXml(page.id)}" isvisible="${isVisible}">
`;
      xml += `${indentStr}  <title>${this.escapeXml(page.title || "Page")}</title>
`;
      for (const child of children) {
        xml += this.generateItemRecursive(child, pageMap, indent + 1);
      }
      xml += `${indentStr}</item>
`;
      return xml;
    }
    /**
     * Generate resources section
     * @param commonFiles - List of common file paths
     * @param pageFiles - Map of pageId to file info
     * @returns Resources XML
     */
    generateResources(commonFiles, pageFiles) {
      let xml = "  <resources>\n";
      for (const page of this.pages) {
        const pageFile = pageFiles[page.id] || {};
        xml += this.generatePageResource(page, pageFile);
      }
      xml += this.generateCommonFilesResource(commonFiles);
      xml += "  </resources>\n";
      return xml;
    }
    /**
     * Generate resource element for a page
     * @param page - Page object
     * @param pageFile - Page file info
     * @returns Resource XML
     */
    generatePageResource(page, pageFile) {
      const pageId = page.id;
      const isIndex = this.pages.indexOf(page) === 0;
      const fileUrl = pageFile.fileUrl || (isIndex ? "index.html" : `html/${this.sanitizeFilename(page.title)}.html`);
      let xml = `    <resource identifier="RES-${this.escapeXml(pageId)}" type="webcontent" href="${this.escapeXml(fileUrl)}">
`;
      xml += `      <file href="${this.escapeXml(fileUrl)}"/>
`;
      const files = pageFile.files || [];
      for (const file of files) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += '      <dependency identifierref="COMMON_FILES"/>\n';
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Generate COMMON_FILES resource for shared assets
     * @param commonFiles - List of common file paths
     * @returns Resource XML
     */
    generateCommonFilesResource(commonFiles) {
      let xml = '    <resource identifier="COMMON_FILES" type="webcontent">\n';
      for (const file of commonFiles) {
        xml += `      <file href="${this.escapeXml(file)}"/>
`;
      }
      xml += "    </resource>\n";
      return xml;
    }
    /**
     * Escape XML special characters
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeXml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    /**
     * Sanitize filename for use in paths
     * @param title - Title to sanitize
     * @returns Sanitized filename
     */
    sanitizeFilename(title) {
      if (!title) return "page";
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
    }
  };

  // src/shared/export/exporters/ImsExporter.ts
  var ImsExporter = class extends Html5Exporter {
    constructor() {
      super(...arguments);
      this.manifestGenerator = null;
    }
    /**
     * Get file suffix for IMS CP format
     */
    getFileSuffix() {
      return "_ims";
    }
    /**
     * Export to IMS Content Package ZIP
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = options?.theme || meta.theme || "base";
        const projectId = this.generateProjectId();
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        this.manifestGenerator = new ImsManifestGenerator(projectId, pages, {
          title: meta.title || "eXeLearning",
          language: meta.language || "en",
          author: meta.author || "",
          description: meta.description || "",
          license: meta.license || ""
        });
        const commonFiles = [];
        const pageFiles = {};
        const { themeFilesMap, themeRootFiles, faviconInfo } = await this.prepareThemeData(themeName);
        let latexWasRendered = false;
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const isIndex = i === 0;
          let html = this.generateImsPageHtml(
            page,
            pages,
            meta,
            isIndex,
            themeRootFiles,
            i,
            faviconInfo,
            pageFilenameMap
          );
          if (!meta.addMathJax && options?.preRenderLatex) {
            try {
              const result = await options.preRenderLatex(html);
              if (result.latexRendered) {
                html = result.html;
                latexWasRendered = true;
                console.log(
                  `[ImsExporter] Pre-rendered ${result.count} LaTeX expressions on page: ${page.title}`
                );
              }
            } catch (error) {
              console.warn("[ImsExporter] LaTeX pre-render failed for page:", page.title, error);
            }
          }
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = isIndex ? "index.html" : `html/${uniqueFilename}`;
          this.zip.addFile(pageFilename, html);
          pageFiles[page.id] = {
            fileUrl: pageFilename,
            files: []
          };
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        let baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        if (latexWasRendered) {
          const latexCss = this.getPreRenderedLatexCss();
          const decoder = new TextDecoder();
          const baseCssText = decoder.decode(baseCss);
          const encoder = new TextEncoder();
          baseCss = encoder.encode(baseCssText + "\n" + latexCss);
        }
        this.zip.addFile("content/css/base.css", baseCss);
        commonFiles.push("content/css/base.css");
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`theme/${filePath}`, content);
            commonFiles.push(`theme/${filePath}`);
          }
        } else {
          this.zip.addFile("theme/style.css", this.getFallbackThemeCss());
          this.zip.addFile("theme/style.js", this.getFallbackThemeJs());
          commonFiles.push("theme/style.css", "theme/style.js");
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [path, content] of baseLibs) {
            this.zip.addFile(`libs/${path}`, content);
            commonFiles.push(`libs/${path}`);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("libs/common_i18n.js", i18nContent);
        commonFiles.push("libs/common_i18n.js");
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [path, content] of ideviceFiles) {
              this.zip.addFile(`idevices/${idevice}/${path}`, content);
              commonFiles.push(`idevices/${idevice}/${path}`);
            }
          } catch {
          }
        }
        await this.addAssetsToZipWithResourcePath();
        const contentXml = generateOdeXml(meta, pages);
        this.zip.addFile("content.xml", contentXml);
        this.zip.addFile(ODE_DTD_FILENAME, ODE_DTD_CONTENT);
        commonFiles.push("content.xml", ODE_DTD_FILENAME);
        const allZipFiles = this.zip.getFilePaths();
        const manifestXml = this.manifestGenerator.generate({
          commonFiles,
          pageFiles,
          allZipFiles
        });
        this.zip.addFile("imsmanifest.xml", manifestXml);
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate project ID for IMS package
     */
    generateProjectId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    }
    /**
     * Generate IMS CP HTML page (standard website, no SCORM)
     * @param page - Page data
     * @param allPages - All pages in the project
     * @param meta - Project metadata
     * @param isIndex - Whether this is the index page
     * @param themeFiles - List of root-level theme CSS/JS files
     * @param pageIndex - Index of the current page (for page counter)
     * @param faviconInfo - Favicon info (optional)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    generateImsPageHtml(page, allPages, meta, isIndex, themeFiles, pageIndex, faviconInfo, pageFilenameMap) {
      const basePath = isIndex ? "" : "../";
      const usedIdevices = this.getUsedIdevicesForPage(page);
      return this.pageRenderer.render(page, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: meta.language || "en",
        theme: meta.theme || "base",
        customStyles: meta.customStyles || "",
        allPages,
        basePath,
        isIndex,
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        description: meta.description || "",
        licenseUrl: meta.licenseUrl || "",
        // Export options - IMS specific overrides
        // IMS exports don't use client-side search - LMS handles navigation
        addSearchBox: false,
        // Force page counter for IMS
        addPagination: true,
        totalPages: allPages.length,
        currentPageIndex: pageIndex ?? 0,
        bodyClass: "exe-export exe-ims",
        // Hide navigation elements - LMS handles navigation in IMS
        hideNavigation: true,
        hideNavButtons: true,
        // Theme files for HTML head includes
        themeFiles: themeFiles || [],
        // Favicon options
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Page filename map for navigation links (handles title collisions)
        pageFilenameMap,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
    }
  };

  // src/shared/export/exporters/Epub3Exporter.ts
  var EPUB3_NAMESPACES = {
    OPF: "http://www.idpf.org/2007/opf",
    DC: "http://purl.org/dc/elements/1.1/",
    XHTML: "http://www.w3.org/1999/xhtml",
    EPUB: "http://www.idpf.org/2007/ops",
    CONTAINER: "urn:oasis:names:tc:opendocument:xmlns:container"
  };
  var EPUB3_MIMETYPE = "application/epub+zip";
  var VOID_ELEMENTS = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ];
  var MIME_TYPES = {
    ".xhtml": "application/xhtml+xml",
    ".html": "application/xhtml+xml",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".ogg": "audio/ogg",
    ".ogv": "video/ogg",
    ".webm": "video/webm",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".eot": "application/vnd.ms-fontobject"
  };
  var Epub3Exporter = class extends BaseExporter {
    constructor() {
      super(...arguments);
      this.manifestItems = [];
      this.spineItems = [];
      this.usedIds = /* @__PURE__ */ new Set();
    }
    /**
     * Get file extension for EPUB3 format
     */
    getFileExtension() {
      return ".epub";
    }
    /**
     * Get file suffix for EPUB3 format
     */
    getFileSuffix() {
      return "";
    }
    /**
     * Export to EPUB3
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      const epub3Options = options;
      try {
        this.manifestItems = [];
        this.spineItems = [];
        this.usedIds = /* @__PURE__ */ new Set();
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = epub3Options?.theme || meta.theme || "base";
        const bookId = epub3Options?.bookId || this.generateBookId();
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        const { themeFilesMap, themeRootFiles, faviconInfo } = await this.prepareThemeData(themeName);
        this.zip.addFile("mimetype", EPUB3_MIMETYPE);
        this.zip.addFile("META-INF/container.xml", this.generateContainerXml());
        const navXhtml = this.generateNavXhtml(pages, meta, pageFilenameMap);
        this.zip.addFile("EPUB/nav.xhtml", navXhtml);
        this.addManifestItem("nav", "nav.xhtml", "application/xhtml+xml", "nav");
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const xhtml = this.generatePageXhtml(page, pages, meta, i === 0, i, themeRootFiles, faviconInfo);
          const mapFilename = pageFilenameMap.get(page.id) || "page.html";
          const xhtmlFilename = mapFilename.replace(/\.html$/, ".xhtml");
          const filename = i === 0 ? "index.xhtml" : `html/${xhtmlFilename}`;
          this.zip.addFile(`EPUB/${filename}`, xhtml);
          const pageId = this.generateUniqueId(`page-${i}`);
          this.addManifestItem(pageId, filename, "application/xhtml+xml", "scripted");
          this.spineItems.push({ idref: pageId });
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        const fetchedBaseCss = contentCssFiles.get("content/css/base.css");
        if (!fetchedBaseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        const baseCssContent = typeof fetchedBaseCss === "string" ? fetchedBaseCss : new TextDecoder().decode(fetchedBaseCss);
        const baseCss = baseCssContent + "\n" + this.getEpubSpecificCss();
        this.zip.addFile("EPUB/content/css/base.css", baseCss);
        this.addManifestItem("css-base", "content/css/base.css", "text/css");
        try {
          const logoData = await this.resources.fetchExeLogo();
          if (logoData) {
            this.zip.addFile("EPUB/content/img/exe_powered_logo.png", logoData);
            this.addManifestItem("exe-logo", "content/img/exe_powered_logo.png", "image/png");
          }
        } catch {
        }
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`EPUB/theme/${filePath}`, content);
            const ext = this.getFileExtensionFromPath(filePath);
            const mimeType = MIME_TYPES[ext] || "application/octet-stream";
            this.addManifestItem(this.generateUniqueId(`theme-${filePath}`), `theme/${filePath}`, mimeType);
          }
        } else {
          this.zip.addFile("EPUB/theme/style.css", this.getFallbackThemeCss());
          this.addManifestItem("theme-css", "theme/style.css", "text/css");
        }
        const allHtmlContent = this.collectAllHtmlContent(pages);
        const { files: allRequiredFiles, patterns } = this.libraryDetector.getAllRequiredFilesWithPatterns(
          allHtmlContent,
          {
            includeAccessibilityToolbar: meta.addAccessibilityToolbar === true
          }
        );
        try {
          const libFiles = await this.resources.fetchLibraryFiles(allRequiredFiles, patterns);
          for (const [path, content] of libFiles) {
            this.zip.addFile(`EPUB/libs/${path}`, content);
            const ext = this.getFileExtensionFromPath(path);
            const mimeType = MIME_TYPES[ext] || "application/octet-stream";
            this.addManifestItem(this.generateUniqueId(`lib-${path}`), `libs/${path}`, mimeType);
          }
        } catch {
          try {
            const baseLibs = await this.resources.fetchBaseLibraries();
            for (const [path, content] of baseLibs) {
              this.zip.addFile(`EPUB/libs/${path}`, content);
              const ext = this.getFileExtensionFromPath(path);
              const mimeType = MIME_TYPES[ext] || "application/octet-stream";
              this.addManifestItem(this.generateUniqueId(`lib-${path}`), `libs/${path}`, mimeType);
            }
          } catch {
          }
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("EPUB/libs/common_i18n.js", i18nContent);
        this.addManifestItem("common-i18n", "libs/common_i18n.js", "application/javascript");
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [path, content] of baseLibs) {
            const zipPath = `EPUB/libs/${path}`;
            if (!this.zip.hasFile(zipPath)) {
              this.zip.addFile(zipPath, content);
              const ext = this.getFileExtensionFromPath(path);
              const mimeType = MIME_TYPES[ext] || "application/octet-stream";
              this.addManifestItem(this.generateUniqueId(`baselib-${path}`), `libs/${path}`, mimeType);
            }
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [filePath, content] of ideviceFiles) {
              if (filePath.endsWith(".html")) {
                continue;
              }
              if (filePath.endsWith(".test.js") || filePath.endsWith(".spec.js")) {
                continue;
              }
              this.zip.addFile(`EPUB/idevices/${idevice}/${filePath}`, content);
              const ext = this.getFileExtensionFromPath(filePath);
              const mimeType = MIME_TYPES[ext] || "application/octet-stream";
              this.addManifestItem(
                this.generateUniqueId(`idevice-${idevice}-${filePath}`),
                `idevices/${idevice}/${filePath}`,
                mimeType
              );
            }
          } catch {
          }
        }
        if (meta.globalFont && meta.globalFont !== "default") {
          try {
            const fontFiles = await this.resources.fetchGlobalFontFiles(meta.globalFont);
            if (fontFiles) {
              for (const [filePath, content] of fontFiles) {
                this.zip.addFile(`EPUB/${filePath}`, content);
                const ext = this.getFileExtensionFromPath(filePath);
                const mimeType = MIME_TYPES[ext] || "application/octet-stream";
                this.addManifestItem(this.generateUniqueId(`font-${filePath}`), filePath, mimeType);
              }
              console.log(
                `[Epub3Exporter] Added ${fontFiles.size} global font files for: ${meta.globalFont}`
              );
            }
          } catch (e) {
            console.warn(`[Epub3Exporter] Failed to fetch global font files: ${meta.globalFont}`, e);
          }
        }
        const _assetsAdded = await this.addEpubAssets();
        const packageOpf = this.generatePackageOpf(meta, bookId);
        this.zip.addFile("EPUB/package.opf", packageOpf);
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    /**
     * Generate unique book ID (URN UUID format)
     */
    generateBookId() {
      return `urn:uuid:${crypto.randomUUID()}`;
    }
    /**
     * Generate unique manifest ID
     */
    generateUniqueId(base) {
      const sanitized = base.replace(/[^a-zA-Z0-9-_]/g, "-").replace(/-+/g, "-").substring(0, 50);
      if (!this.usedIds.has(sanitized)) {
        this.usedIds.add(sanitized);
        return sanitized;
      }
      let counter = 1;
      while (this.usedIds.has(`${sanitized}-${counter}`)) {
        counter++;
      }
      const uniqueId = `${sanitized}-${counter}`;
      this.usedIds.add(uniqueId);
      return uniqueId;
    }
    /**
     * Add item to manifest
     */
    addManifestItem(id, href, mediaType, properties) {
      this.manifestItems.push({ id, href, mediaType, properties });
    }
    /**
     * Get file extension from path
     */
    getFileExtensionFromPath(filePath) {
      const lastDot = filePath.lastIndexOf(".");
      return lastDot > 0 ? filePath.substring(lastDot).toLowerCase() : "";
    }
    /**
     * Generate container.xml
     */
    generateContainerXml() {
      return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="${EPUB3_NAMESPACES.CONTAINER}">
  <rootfiles>
    <rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;
    }
    /**
     * Generate package.opf (OPF manifest)
     */
    generatePackageOpf(meta, bookId) {
      const modified = (/* @__PURE__ */ new Date()).toISOString().replace(/\.\d{3}Z$/, "Z");
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" unique-identifier="pub-id" xmlns="${EPUB3_NAMESPACES.OPF}">
  <metadata xmlns:dc="${EPUB3_NAMESPACES.DC}">
    <dc:identifier id="pub-id">${this.escapeXml(bookId)}</dc:identifier>
    <dc:title>${this.escapeXml(meta.title || "eXeLearning")}</dc:title>
    <dc:language>${this.escapeXml(meta.language || "en")}</dc:language>
    <dc:creator>${this.escapeXml(meta.author || "")}</dc:creator>`;
      if (meta.description) {
        xml += `
    <dc:description>${this.escapeXml(meta.description)}</dc:description>`;
      }
      if (meta.license) {
        xml += `
    <dc:rights>${this.escapeXml(meta.license)}</dc:rights>`;
      }
      xml += `
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>`;
      for (const item of this.manifestItems) {
        const props = item.properties ? ` properties="${item.properties}"` : "";
        xml += `
    <item id="${this.escapeXml(item.id)}" href="${this.escapeXml(item.href)}" media-type="${item.mediaType}"${props}/>`;
      }
      xml += `
  </manifest>
  <spine>`;
      for (const item of this.spineItems) {
        xml += `
    <itemref idref="${this.escapeXml(item.idref)}"/>`;
      }
      xml += `
  </spine>
</package>`;
      return xml;
    }
    /**
     * Generate nav.xhtml (EPUB3 navigation document)
     * @param pages - All pages
     * @param meta - Export metadata
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    generateNavXhtml(pages, meta, pageFilenameMap) {
      const lang = meta.language || "en";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="${EPUB3_NAMESPACES.XHTML}" xmlns:epub="${EPUB3_NAMESPACES.EPUB}" xml:lang="${lang}" lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <title>Table of Contents</title>
  <link rel="stylesheet" href="content/css/base.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>${this.escapeXml(meta.title || "Table of Contents")}</h1>
    <ol>`;
      xml += this.buildNavList(pages, pages, null, pageFilenameMap);
      xml += `
    </ol>
  </nav>
</body>
</html>`;
      return xml;
    }
    /**
     * Build navigation list recursively
     * @param pages - All pages
     * @param allPages - All pages (for first page detection)
     * @param parentId - Parent page ID (null for root)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    buildNavList(pages, allPages, parentId = null, pageFilenameMap) {
      const children = parentId === null ? pages.filter((p) => !p.parentId) : pages.filter((p) => p.parentId === parentId);
      if (children.length === 0) return "";
      let html = "";
      for (const page of children) {
        const filename = this.getPageFilename(page, allPages, pageFilenameMap);
        const grandchildren = pages.filter((p) => p.parentId === page.id);
        html += `
      <li><a href="${filename}">${this.escapeXml(page.title)}</a>`;
        if (grandchildren.length > 0) {
          html += `
        <ol>${this.buildNavList(pages, allPages, page.id, pageFilenameMap)}
        </ol>`;
        }
        html += `</li>`;
      }
      return html;
    }
    /**
     * Get page filename for navigation
     * @param page - Page data
     * @param allPages - All pages (for first page detection)
     * @param pageFilenameMap - Map of page IDs to unique filenames (optional, handles title collisions)
     */
    getPageFilename(page, allPages, pageFilenameMap) {
      const isFirst = page.id === allPages[0]?.id;
      if (isFirst) {
        return "index.xhtml";
      }
      const mapFilename = pageFilenameMap?.get(page.id);
      if (mapFilename) {
        return `html/${mapFilename.replace(/\.html$/, ".xhtml")}`;
      }
      return `html/${this.sanitizePageFilename(page.title)}.xhtml`;
    }
    /**
     * Generate XHTML page
     * @param page - Page data
     * @param allPages - All pages in the project
     * @param meta - Project metadata
     * @param isIndex - Whether this is the index page
     * @param themeFiles - List of root-level theme CSS/JS files
     * @param faviconInfo - Favicon info for theme or default
     */
    generatePageXhtml(page, allPages, meta, isIndex, pageIndex, themeFiles, faviconInfo) {
      const lang = meta.language || "en";
      const basePath = isIndex ? "" : "../";
      const usedIdevices = this.getUsedIdevicesForPage(page);
      let customStyles = meta.customStyles || "";
      let bodyClass = "exe-export exe-epub";
      if (meta.globalFont && meta.globalFont !== "default") {
        const globalFontCss = GlobalFontGenerator.generateCss(meta.globalFont, basePath);
        if (globalFontCss) {
          customStyles = globalFontCss + "\n" + customStyles;
        }
        const fontBodyClass = GlobalFontGenerator.getBodyClassName(meta.globalFont);
        if (fontBodyClass) {
          bodyClass += ` ${fontBodyClass}`;
        }
      }
      const pageHtml = this.pageRenderer.render(page, {
        projectTitle: meta.title || "eXeLearning",
        projectSubtitle: meta.subtitle || "",
        language: lang,
        theme: meta.theme || "base",
        customStyles,
        allPages,
        basePath,
        isIndex,
        usedIdevices,
        author: meta.author || "",
        license: meta.license || "",
        description: meta.description || "",
        licenseUrl: meta.licenseUrl || "",
        bodyClass,
        // Theme files for HTML head includes
        themeFiles: themeFiles || [],
        // Favicon options
        faviconPath: faviconInfo?.path,
        faviconType: faviconInfo?.type,
        // Hide navigation - EPUB uses nav.xhtml for TOC, not embedded nav
        hideNavigation: true,
        // Hide nav buttons - EPUB reader handles navigation
        hideNavButtons: true,
        // Page counter (only if user has the option enabled)
        addPagination: meta.addPagination === true,
        totalPages: allPages.length,
        currentPageIndex: pageIndex,
        // Application version for generator meta tag
        version: meta.exelearningVersion
      });
      return this.htmlToXhtml(pageHtml, lang);
    }
    /**
     * Convert HTML to XHTML
     */
    htmlToXhtml(html, lang) {
      let xhtml = html;
      if (!xhtml.startsWith("<?xml")) {
        xhtml = `<?xml version="1.0" encoding="UTF-8"?>
${xhtml}`;
      }
      if (!xhtml.includes("<!DOCTYPE")) {
        xhtml = xhtml.replace(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>'
        );
      }
      xhtml = xhtml.replace(/<html([^>]*)>/i, (match, attrs) => {
        const cleanAttrs = attrs.replace(/\s+xml:lang=["'][^"']*["']/gi, "").replace(/\s+lang=["'][^"']*["']/gi, "");
        return `<html xmlns="${EPUB3_NAMESPACES.XHTML}" xml:lang="${lang}" lang="${lang}"${cleanAttrs}>`;
      });
      for (const element of VOID_ELEMENTS) {
        const regex = new RegExp(`<(${element})\\b([^>]*[^/])>`, "gi");
        xhtml = xhtml.replace(regex, "<$1$2/>");
        const simpleRegex = new RegExp(`<(${element})>`, "gi");
        xhtml = xhtml.replace(simpleRegex, "<$1/>");
      }
      xhtml = xhtml.replace(/&(?!(?:amp|lt|gt|quot|apos|nbsp|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
      xhtml = xhtml.replace(/(\s)([a-zA-Z][a-zA-Z0-9-]*)=(true|false|[a-zA-Z0-9_-]+)(?=[\s>/])/g, '$1$2="$3"');
      xhtml = xhtml.replace(/(\s[a-zA-Z][a-zA-Z0-9-]*)=""([^"<>/]+)>/g, '$1="$2">');
      xhtml = xhtml.replace(/\.html(['"#\s])/g, ".xhtml$1");
      xhtml = xhtml.replace(/\.html$/g, ".xhtml");
      xhtml = xhtml.replace(/\s+style=["']\s*["']/g, "");
      return xhtml;
    }
    /**
     * Add assets to EPUB with manifest entries
     */
    async addEpubAssets() {
      let assetsAdded = 0;
      try {
        const assets = await this.assets.getAllAssets();
        for (const asset of assets) {
          const assetId = asset.id;
          const filename = asset.filename || `asset-${assetId}`;
          const zipPath = `content/resources/${assetId}/${filename}`;
          this.zip.addFile(`EPUB/${zipPath}`, asset.data);
          const ext = this.getFileExtensionFromPath(filename);
          const mimeType = MIME_TYPES[ext] || asset.mime || "application/octet-stream";
          this.addManifestItem(this.generateUniqueId(`asset-${assetId}`), zipPath, mimeType);
          assetsAdded++;
        }
      } catch (e) {
        console.warn("[Epub3Exporter] Failed to add assets:", e);
      }
      return assetsAdded;
    }
    /**
     * Get EPUB-specific CSS additions
     */
    getEpubSpecificCss() {
      return `
/* EPUB3 Specific Styles */
body {
  margin: 0;
  padding: 1em;
}

/* Page breaks */
.page-break-before {
  page-break-before: always;
}
.page-break-after {
  page-break-after: always;
}
.avoid-page-break {
  page-break-inside: avoid;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
}

/* Hide navigation in EPUB (handled by reader) */
#siteNav {
  display: none;
}

/* Pagination links hidden in EPUB */
.pagination {
  display: none;
}

/* Tables */
table {
  max-width: 100%;
  border-collapse: collapse;
}
td, th {
  padding: 0.5em;
  border: 1px solid #ccc;
}
`;
    }
    /**
     * Detect theme-specific favicon from theme files map
     * @param themeFilesMap - Map of theme files
     * @returns Favicon info or null if not found
     */
    detectFavicon(themeFilesMap) {
      if (themeFilesMap.has("img/favicon.ico")) {
        return { path: "theme/img/favicon.ico", type: "image/x-icon" };
      }
      if (themeFilesMap.has("img/favicon.png")) {
        return { path: "theme/img/favicon.png", type: "image/png" };
      }
      return null;
    }
    /**
     * Prepare theme data for export: fetch theme files, extract root-level CSS/JS, detect favicon
     * @param themeName - Name of the theme to fetch
     * @returns ThemeData with files, root files list, and favicon info
     */
    async prepareThemeData(themeName) {
      const themeRootFiles = [];
      let themeFilesMap = null;
      let faviconInfo = null;
      try {
        themeFilesMap = await this.resources.fetchTheme(themeName);
        for (const [filePath] of themeFilesMap) {
          if (!filePath.includes("/") && (filePath.endsWith(".css") || filePath.endsWith(".js"))) {
            themeRootFiles.push(filePath);
          }
        }
        faviconInfo = this.detectFavicon(themeFilesMap);
      } catch (e) {
        console.warn(`[Epub3Exporter] Failed to fetch theme: ${themeName}`, e);
        themeRootFiles.push("style.css", "style.js");
      }
      return { themeFilesMap, themeRootFiles, faviconInfo };
    }
  };

  // src/shared/export/browser/xml-validator-shim.ts
  function validateXml(_xmlContent) {
    return { valid: true, errors: [], warnings: [] };
  }
  function formatValidationErrors(_result) {
    return "";
  }

  // src/shared/export/exporters/ElpxExporter.ts
  var ElpxExporter = class extends Html5Exporter {
    /**
     * Get file extension for ELPX format
     */
    getFileExtension() {
      return ".elpx";
    }
    /**
     * Get file suffix for ELPX format (no suffix for ELPX)
     */
    getFileSuffix() {
      return "";
    }
    /**
     * Export to ELPX format
     *
     * ELPX is a complete HTML5 export + content.xml (ODE format) + DTD for re-import.
     * This method generates all HTML5 content (index.html, html/*.html, libs/, theme/, etc.)
     * and then adds the content.xml with full ODE structure and DTD.
     */
    async export(options) {
      const exportFilename = options?.filename || this.buildFilename();
      const elpxOptions = options;
      try {
        let pages = this.buildPageList();
        const meta = this.getMetadata();
        const themeName = elpxOptions?.theme || meta.theme || "base";
        pages = await this.preprocessPagesForExport(pages);
        const pageFilenameMap = this.buildPageFilenameMap(pages);
        const { themeFilesMap, themeRootFiles, faviconInfo } = await this.prepareThemeData(themeName);
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const html = this.generatePageHtml(
            page,
            pages,
            meta,
            i === 0,
            i,
            themeRootFiles,
            faviconInfo,
            pageFilenameMap
          );
          const uniqueFilename = pageFilenameMap.get(page.id) || "page.html";
          const pageFilename = i === 0 ? "index.html" : `html/${uniqueFilename}`;
          this.zip.addFile(pageFilename, html);
        }
        if (meta.addSearchBox) {
          const searchIndexContent = this.pageRenderer.generateSearchIndexFile(pages, "", pageFilenameMap);
          this.zip.addFile("search_index.js", searchIndexContent);
        }
        const contentCssFiles = await this.resources.fetchContentCss();
        const baseCss = contentCssFiles.get("content/css/base.css");
        if (!baseCss) {
          throw new Error("Failed to fetch content/css/base.css");
        }
        this.zip.addFile("content/css/base.css", baseCss);
        try {
          const logoData = await this.resources.fetchExeLogo();
          if (logoData) {
            this.zip.addFile("content/img/exe_powered_logo.png", logoData);
          }
        } catch {
        }
        if (themeFilesMap) {
          for (const [filePath, content] of themeFilesMap) {
            this.zip.addFile(`theme/${filePath}`, content);
          }
        } else {
          this.zip.addFile("theme/style.css", this.getFallbackThemeCss());
          this.zip.addFile("theme/style.js", this.getFallbackThemeJs());
        }
        try {
          const baseLibs = await this.resources.fetchBaseLibraries();
          for (const [libPath, content] of baseLibs) {
            this.zip.addFile(`libs/${libPath}`, content);
          }
        } catch {
        }
        const i18nContent = generateI18nScript(meta.language || "en");
        this.zip.addFile("libs/common_i18n.js", i18nContent);
        const allHtmlContent = this.collectAllHtmlContent(pages);
        const { files: allRequiredFiles, patterns } = this.libraryDetector.getAllRequiredFilesWithPatterns(
          allHtmlContent,
          {
            includeAccessibilityToolbar: meta.addAccessibilityToolbar === true
          }
        );
        try {
          const libFiles = await this.resources.fetchLibraryFiles(allRequiredFiles, patterns);
          for (const [libPath, content] of libFiles) {
            const zipPath = `libs/${libPath}`;
            if (!this.zip.hasFile(zipPath)) {
              this.zip.addFile(zipPath, content);
            }
          }
        } catch {
        }
        const usedIdevices = this.getUsedIdevices(pages);
        for (const idevice of usedIdevices) {
          try {
            const normalizedType = this.resources.normalizeIdeviceType(idevice);
            const ideviceFiles = await this.resources.fetchIdeviceResources(idevice);
            for (const [filePath, content] of ideviceFiles) {
              this.zip.addFile(`idevices/${normalizedType}/${filePath}`, content);
            }
          } catch {
          }
        }
        await this.addAssetsToZipWithResourcePath();
        const contentXml = generateOdeXml(meta, pages);
        const validation = validateXml(contentXml);
        if (!validation.valid) {
          const errorMsg = formatValidationErrors(validation);
          console.error(`[ElpxExporter] Generated XML failed validation:
${errorMsg}`);
          throw new Error(`Generated content.xml is invalid:
${errorMsg}`);
        }
        if (validation.warnings.length > 0) {
          console.warn(`[ElpxExporter] XML validation warnings:
${formatValidationErrors(validation)}`);
        }
        this.zip.addFile("content.xml", contentXml);
        this.zip.addFile(ODE_DTD_FILENAME, ODE_DTD_CONTENT);
        this.zip.addFile("custom/.gitkeep", "");
        const buffer = await this.zip.generateAsync();
        return {
          success: true,
          filename: exportFilename,
          data: buffer
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
  };

  // src/shared/export/exporters/PrintPreviewExporter.ts
  var PrintPreviewExporter = class _PrintPreviewExporter {
    /**
     * Create a PrintPreviewExporter
     * @param document - Export document adapter
     * @param resourceProvider - Resource provider for theme/iDevice info
     */
    constructor(document2, resourceProvider) {
      this.document = document2;
      this.ideviceRenderer = new IdeviceRenderer(resourceProvider);
    }
    /**
     * Generate print preview HTML
     * @param options - Preview options
     * @returns Preview result with HTML string
     */
    async generatePreview(options = {}) {
      try {
        const pages = this.document.getNavigation();
        const meta = this.document.getMetadata();
        if (pages.length === 0) {
          return { success: false, error: "No pages to preview" };
        }
        const usedIdevices = this.getUsedIdevices(pages);
        const html = await this.generateSinglePageHtml(pages, meta, usedIdevices, options);
        return { success: true, html };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { success: false, error: errorMessage };
      }
    }
    /**
     * Get all unique iDevice types used in pages
     */
    getUsedIdevices(pages) {
      const types = /* @__PURE__ */ new Set();
      for (const page of pages) {
        for (const block of page.blocks) {
          for (const component of block.components) {
            if (component.type) {
              types.add(component.type);
            }
          }
        }
      }
      return Array.from(types);
    }
    /**
     * Get versioned asset path for server resources
     */
    getVersionedPath(path, options) {
      const baseUrl = options.baseUrl || "";
      const basePath = options.basePath || "";
      const version = options.version || "v1.0.0";
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return `${baseUrl}${basePath}/${version}/${cleanPath}`;
    }
    static {
      /**
       * Libraries that are located in /libs/ instead of /app/common/
       */
      this.LIBS_FOLDER_LIBRARIES = /* @__PURE__ */ new Set(["jquery-ui", "fflate", "exe_atools", "exe_elpx_download"]);
    }
    /**
     * Get the correct server path for a detected library file
     */
    getLibraryServerPath(file, options) {
      const firstPart = file.split("/")[0];
      if (_PrintPreviewExporter.LIBS_FOLDER_LIBRARIES.has(firstPart) || _PrintPreviewExporter.LIBS_FOLDER_LIBRARIES.has(file)) {
        return this.getVersionedPath(`/libs/${file}`, options);
      }
      return this.getVersionedPath(`/app/common/${file}`, options);
    }
    /**
     * Check if a page is visible in export
     */
    isPageVisible(page, allPages) {
      if (page.id === allPages[0]?.id) {
        return true;
      }
      const visibility = page.properties?.visibility;
      if (visibility === false || visibility === "false") {
        return false;
      }
      if (page.parentId) {
        const parent = allPages.find((p) => p.id === page.parentId);
        if (parent && !this.isPageVisible(parent, allPages)) {
          return false;
        }
      }
      return true;
    }
    /**
     * Check if a page has highlight property enabled
     */
    isPageHighlighted(page) {
      const highlight = page.properties?.highlight;
      return highlight === true || highlight === "true";
    }
    /**
     * Check if a page's title should be hidden
     */
    shouldHidePageTitle(page) {
      const hideTitle = page.properties?.hidePageTitle;
      return hideTitle === true || hideTitle === "true";
    }
    /**
     * Get effective page title
     */
    getEffectivePageTitle(page) {
      const editableInPage = page.properties?.editableInPage;
      if (editableInPage === true || editableInPage === "true") {
        const titlePage = page.properties?.titlePage;
        if (titlePage) return titlePage;
      }
      return page.title;
    }
    /**
     * Generate complete single-page HTML for printing
     */
    async generateSinglePageHtml(pages, meta, usedIdevices, options) {
      const lang = meta.language || "en";
      const projectTitle = meta.title || "eXeLearning";
      const customStyles = meta.customStyles || "";
      const license = meta.license || "";
      const themeName = meta.theme || "base";
      const userFooterContent = meta.footer || "";
      const addExeLink = meta.addExeLink ?? true;
      const addAccessibilityToolbar = meta.addAccessibilityToolbar ?? false;
      const visiblePages = pages.filter((page) => this.isPageVisible(page, pages));
      let sectionsHtml = "";
      for (const page of visiblePages) {
        sectionsHtml += this.renderPageSection(page, options, themeName);
      }
      const madeWithExeHtml = addExeLink ? this.renderMadeWithEXe(lang) : "";
      const bodyContent = `<div class="exe-content exe-export pre-js">
${this.renderSinglePageNav(pages)}
<main class="single-page-content">
<header class="package-header"><h1 class="package-title">${this.escapeHtml(projectTitle)}</h1></header>
${sectionsHtml}
</main>
${this.renderFooterSection({ license, userFooterContent })}
</div>
${madeWithExeHtml}`;
      let finalBodyContent = bodyContent;
      let latexWasRendered = false;
      let mermaidWasRendered = false;
      if (!meta.addMathJax) {
        if (options.preRenderDataGameLatex) {
          try {
            const result = await options.preRenderDataGameLatex(bodyContent);
            if (result.count > 0) {
              finalBodyContent = result.html;
              latexWasRendered = true;
            }
          } catch (error) {
            console.warn("[PrintPreview] DataGame LaTeX pre-render failed:", error);
          }
        }
        if (options.preRenderLatex) {
          try {
            const result = await options.preRenderLatex(finalBodyContent);
            if (result.latexRendered) {
              finalBodyContent = result.html;
              latexWasRendered = true;
            }
          } catch (error) {
            console.warn("[PrintPreview] LaTeX pre-render failed:", error);
          }
        }
      }
      if (options.preRenderMermaid) {
        try {
          const result = await options.preRenderMermaid(finalBodyContent);
          if (result.mermaidRendered) {
            finalBodyContent = result.html;
            mermaidWasRendered = true;
            console.log(`[PrintPreview] Pre-rendered ${result.count} Mermaid diagram(s) to SVG`);
          }
        } catch (error) {
          console.warn("[PrintPreview] Mermaid pre-render failed:", error);
        }
      }
      const libraryDetector = new LibraryDetector();
      const detectedLibraries = libraryDetector.detectLibraries(finalBodyContent, {
        includeAccessibilityToolbar: addAccessibilityToolbar,
        includeMathJax: meta.addMathJax === true,
        skipMathJax: latexWasRendered && !meta.addMathJax
      });
      return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${this.generateHead(themeName, usedIdevices, projectTitle, customStyles, options, addAccessibilityToolbar, detectedLibraries)}
</head>
<body class="exe-web-site exe-export exe-single-page exe-preview">
<script>document.body.className+=" js"<\/script>
${finalBodyContent}
${this.generateScripts(themeName, usedIdevices, options, addAccessibilityToolbar, detectedLibraries)}
</body>
</html>`;
    }
    /**
     * Render a page as a section (for single-page layout)
     */
    renderPageSection(page, options, themeName = "base") {
      const hideTitle = this.shouldHidePageTitle(page);
      const effectiveTitle = this.getEffectivePageTitle(page);
      const headerStyle = hideTitle ? ' style="display:none"' : "";
      const ideviceBasePath = this.getVersionedPath("/files/perm/idevices/base/", options);
      const themeBase = options.themeUrl ? options.themeUrl.replace(/\/$/, "") : this.getVersionedPath(`/files/perm/themes/base/${themeName}`, options);
      const themeIconBasePath = `${themeBase}/icons/`;
      let blockHtml = "";
      for (const block of page.blocks || []) {
        blockHtml += this.ideviceRenderer.renderBlock(block, {
          basePath: ideviceBasePath,
          includeDataAttributes: true,
          themeIconBasePath
        });
      }
      return `<section id="section-${page.id}" class="single-page-section">
<header class="page-header"${headerStyle}>
<h2 class="page-title">${this.escapeHtml(effectiveTitle)}</h2>
</header>
<div class="page-content">
${blockHtml}
</div>
</section>
`;
    }
    /**
     * Render navigation for single-page (anchor links)
     */
    renderSinglePageNav(pages) {
      const rootPages = pages.filter((p) => !p.parentId);
      let html = '<nav id="siteNav" class="single-page-nav">\n<ul>\n';
      for (const page of rootPages) {
        html += this.renderNavItem(page, pages);
      }
      html += "</ul>\n</nav>";
      return html;
    }
    /**
     * Render a navigation item for single-page (anchor links)
     */
    renderNavItem(page, allPages) {
      if (!this.isPageVisible(page, allPages)) {
        return "";
      }
      const children = allPages.filter((p) => p.parentId === page.id && this.isPageVisible(p, allPages));
      const hasChildren = children.length > 0;
      const linkClasses = [];
      linkClasses.push(hasChildren ? "daddy" : "no-ch");
      if (this.isPageHighlighted(page)) {
        linkClasses.push("highlighted-link");
      }
      let html = "<li>";
      html += ` <a href="#section-${page.id}" class="${linkClasses.join(" ")}">${this.escapeHtml(page.title)}</a>
`;
      if (hasChildren) {
        html += '<ul class="other-section">\n';
        for (const child of children) {
          html += this.renderNavItem(child, allPages);
        }
        html += "</ul>\n";
      }
      html += "</li>\n";
      return html;
    }
    /**
     * Render footer section
     */
    renderFooterSection(options) {
      const { license, licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/", userFooterContent } = options;
      let userFooterHtml = "";
      if (userFooterContent) {
        userFooterHtml = `<div id="siteUserFooter"><div>${userFooterContent}</div></div>`;
      }
      if (!shouldShowLicenseFooter(license)) {
        return `<footer id="siteFooter"><div id="siteFooterContent">${userFooterHtml}</div></footer>`;
      }
      return `<footer id="siteFooter"><div id="siteFooterContent"><div id="packageLicense" class="cc cc-by-sa"><p><span class="license-label">Licencia: </span><a href="${licenseUrl}" class="license">${this.escapeHtml(license)}</a></p>
</div>
${userFooterHtml}</div></footer>`;
    }
    static {
      /**
       * Translations for "Made with eXeLearning" text
       */
      this.MADE_WITH_TRANSLATIONS = {
        en: "Made with eXeLearning",
        es: "Creado con eXeLearning",
        ca: "Creat amb eXeLearning",
        eu: "eXeLearning-ekin egina",
        gl: "Creado con eXeLearning",
        pt: "Criado com eXeLearning",
        va: "Creat amb eXeLearning",
        ro: "Creat cu eXeLearning",
        eo: "Kreita per eXeLearning"
      };
    }
    /**
     * Render "Made with eXeLearning" credit
     */
    renderMadeWithEXe(lang) {
      const text = _PrintPreviewExporter.MADE_WITH_TRANSLATIONS[lang] || _PrintPreviewExporter.MADE_WITH_TRANSLATIONS["en"];
      return `<p id="made-with-eXe"><a href="https://exelearning.net/" target="_blank" rel="noopener"><span>${this.escapeHtml(text)} </span></a></p>`;
    }
    /**
     * Generate <head> content
     */
    generateHead(themeName, usedIdevices, projectTitle, customStyles, options, addAccessibilityToolbar = false, detectedLibraries = {
      libraries: [],
      files: [],
      count: 0
    }) {
      const bootstrapCss = this.getVersionedPath("/libs/bootstrap/bootstrap.min.css", options);
      const themeBasePath = options.themeUrl ? options.themeUrl.replace(/\/$/, "") : this.getVersionedPath(`/files/perm/themes/base/${themeName}`, options);
      const themeCss = `${themeBasePath}/style.css`;
      const fallbackCss = this.getVersionedPath("/style/content.css", options);
      const jqueryUiRequiredTypes = /* @__PURE__ */ new Set([
        "ordena",
        "sort",
        "clasifica",
        "classify",
        "relaciona",
        "relate",
        "dragdrop",
        "complete",
        "completa"
      ]);
      let needsJqueryUiCss = false;
      for (const idevice of usedIdevices) {
        const typeName = idevice.toLowerCase().replace(/idevice$/i, "").replace(/-idevice$/i, "");
        if (jqueryUiRequiredTypes.has(typeName)) {
          needsJqueryUiCss = true;
          break;
        }
      }
      let jqueryUiCssLink = "";
      if (needsJqueryUiCss) {
        const jqueryUiCss = this.getVersionedPath("/libs/jquery-ui/jquery-ui.min.css", options);
        jqueryUiCssLink = `
<link rel="stylesheet" href="${jqueryUiCss}">`;
      }
      let detectedLibraryCss = "";
      for (const file of detectedLibraries.files) {
        if (file.endsWith(".css")) {
          const serverPath = this.getLibraryServerPath(file, options);
          detectedLibraryCss += `
<link rel="stylesheet" href="${serverPath}" onerror="this.remove()">`;
        }
      }
      let head = `<meta charset="utf-8">
<meta name="generator" content="eXeLearning 4.0 - exelearning.net (Print Preview)">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${this.escapeHtml(projectTitle)} - Print</title>
<script>document.querySelector("html").classList.add("js");<\/script>

<!-- Server-hosted libraries -->
<link rel="stylesheet" href="${bootstrapCss}">${jqueryUiCssLink}${detectedLibraryCss}

<!-- Print-specific CSS -->
<style>
${this.getPrintPreviewCss(options)}
</style>

<!-- Theme from server -->
<link rel="stylesheet" href="${themeCss}" onerror="this.href='${fallbackCss}'">`;
      const seen = /* @__PURE__ */ new Set();
      for (const idevice of usedIdevices) {
        const typeName = normalizeIdeviceType(idevice);
        if (!seen.has(typeName)) {
          seen.add(typeName);
          const cssFiles = getIdeviceExportFiles(typeName, ".css");
          for (const cssFile of cssFiles) {
            const ideviceCss = this.getVersionedPath(
              `/files/perm/idevices/base/${typeName}/export/${cssFile}`,
              options
            );
            head += `
<link rel="stylesheet" href="${ideviceCss}" onerror="this.remove()">`;
          }
        }
      }
      if (customStyles) {
        head += `
<style>
${customStyles}
</style>`;
      }
      if (addAccessibilityToolbar) {
        const atoolsCss = this.getVersionedPath("/libs/exe_atools/exe_atools.css", options);
        head += `
<link rel="stylesheet" href="${atoolsCss}">`;
      }
      head += `
<style>
${this.getMadeWithExeCss(options)}
</style>`;
      return head;
    }
    /**
     * Get print preview specific CSS
     */
    getPrintPreviewCss(options) {
      return `/* Single-page Print Preview Styles */

/* All sections visible */
.single-page-section {
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 40px;
    margin-bottom: 40px;
}

.single-page-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

/* Navigation styling */
.single-page-nav {
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: auto;
}

.single-page-content {
    padding: 20px 30px;
}

/* Smooth scrolling for anchor links */
html {
    scroll-behavior: smooth;
}

/* Section target offset */
.single-page-section:target {
    scroll-margin-top: 20px;
}

/* JavaScript visibility classes */
.js-hidden { display: none; }
.exe-hidden, .js-required, .js .js-hidden, .exe-mindmap-code { display: none; }
.js .js-required { display: block; }

/* Teacher mode - hide teacher-only content */
html:not(.mode-teacher) .js .teacher-only {
    display: none !important;
}

/* Block minimized - hide content */
.exe-export article.minimized .box-content {
    display: none;
}

/* Block/iDevice novisible */
.exe-export article.novisible.box {
    display: none !important;
}
.exe-export article.box .idevice_node.novisible {
    display: none !important;
}

/* Pre-rendered LaTeX */
.exe-math-rendered { display: inline-block; vertical-align: middle; }
.exe-math-rendered[data-display="block"] { display: block; text-align: center; margin: 1em 0; }
.exe-math-rendered svg { vertical-align: middle; max-width: 100%; height: auto; }
.exe-math-rendered svg line.mjx-solid { stroke-width: 60 !important; }
.exe-math-rendered svg rect[data-frame="true"] { fill: none; stroke-width: 60 !important; }
.exe-math-rendered math { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* Print-specific styles */
@media print {
    .single-page-nav {
        display: none;
    }
    .single-page-section {
        page-break-inside: avoid;
        border-bottom: none;
    }
    #made-with-eXe {
        display: none;
    }
    .nav-buttons {
        display: none;
    }
}`;
    }
    /**
     * Get Made-with-eXe CSS
     */
    getMadeWithExeCss(options) {
      const logoUrl = this.getVersionedPath("/app/common/exe_powered_logo/exe_powered_logo.png", options);
      return `/* Made with eXeLearning */
#made-with-eXe {
    margin: 0;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
}
#made-with-eXe a {
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-top-left-radius: 4px;
    color: #222;
    font-size: 11px;
    font-family: Arial, sans-serif;
    line-height: 35px;
    width: 35px;
    height: 35px;
    background: #fff url(${logoUrl}) no-repeat 3px 50%;
    display: block;
    background-size: auto 20px;
    transition: .5s;
    opacity: .8;
    overflow: hidden;
}
#made-with-eXe span {
    padding-left: 35px;
    padding-right: 5px;
    white-space: nowrap;
}
#made-with-eXe a:hover {
    width: auto;
    padding: 0 5px;
    background-position: 5px 50%;
    opacity: 1;
}
@media print {
    #made-with-eXe { display: none; }
}`;
    }
    /**
     * Generate scripts section
     */
    generateScripts(themeName, usedIdevices, options, addAccessibilityToolbar = false, detectedLibraries = {
      libraries: [],
      files: [],
      count: 0
    }) {
      const jqueryJs = this.getVersionedPath("/libs/jquery/jquery.min.js", options);
      const bootstrapJs = this.getVersionedPath("/libs/bootstrap/bootstrap.bundle.min.js", options);
      const commonJs = this.getVersionedPath("/app/common/common.js", options);
      const commonI18nJs = this.getVersionedPath("/app/common/common_i18n.js", options);
      const exeExportJs = this.getVersionedPath("/app/common/exe_export.js", options);
      const themeJsBasePath = options.themeUrl ? options.themeUrl.replace(/\/$/, "") : this.getVersionedPath(`/files/perm/themes/base/${themeName}`, options);
      const themeJs = `${themeJsBasePath}/style.js`;
      const jqueryUiRequiredTypes = /* @__PURE__ */ new Set([
        "ordena",
        "sort",
        "clasifica",
        "classify",
        "relaciona",
        "relate",
        "dragdrop",
        "complete",
        "completa"
      ]);
      let needsJqueryUi = false;
      for (const idevice of usedIdevices) {
        const typeName = idevice.toLowerCase().replace(/idevice$/i, "").replace(/-idevice$/i, "");
        if (jqueryUiRequiredTypes.has(typeName)) {
          needsJqueryUi = true;
          break;
        }
      }
      let jqueryUiScript = "";
      if (needsJqueryUi) {
        const jqueryUiJs = this.getVersionedPath("/libs/jquery-ui/jquery-ui.min.js", options);
        jqueryUiScript = `
<script src="${jqueryUiJs}"><\/script>`;
      }
      const needsMathJax = detectedLibraries.libraries.some(
        (lib) => lib.name === "exe_math" || lib.name === "exe_math_datagame"
      );
      let mathJaxScripts = "";
      if (needsMathJax) {
        const mathJaxJs = this.getVersionedPath("/app/common/exe_math/tex-mml-svg.js", options);
        mathJaxScripts = `
<script>
window.MathJax = {
    startup: {
        typeset: true
    }
};
<\/script>
<script src="${mathJaxJs}"><\/script>`;
      }
      let detectedLibraryScripts = "";
      for (const file of detectedLibraries.files) {
        if (file.endsWith(".js")) {
          const serverPath = this.getLibraryServerPath(file, options);
          detectedLibraryScripts += `
<script src="${serverPath}" onerror="this.remove()"><\/script>`;
        }
      }
      let ideviceScripts = "";
      const seenJs = /* @__PURE__ */ new Set();
      for (const idevice of usedIdevices) {
        const typeName = normalizeIdeviceType(idevice);
        if (!seenJs.has(typeName)) {
          seenJs.add(typeName);
          const jsFiles = getIdeviceExportFiles(typeName, ".js");
          for (const jsFile of jsFiles) {
            const ideviceJs = this.getVersionedPath(
              `/files/perm/idevices/base/${typeName}/export/${jsFile}`,
              options
            );
            ideviceScripts += `
<script src="${ideviceJs}" onerror="this.remove()"><\/script>`;
          }
        }
      }
      let atoolsScript = "";
      if (addAccessibilityToolbar) {
        const atoolsJs = this.getVersionedPath("/libs/exe_atools/exe_atools.js", options);
        atoolsScript = `
<script src="${atoolsJs}"><\/script>`;
      }
      return `<script src="${jqueryJs}"><\/script>
<script src="${bootstrapJs}"><\/script>${jqueryUiScript}
<script src="${commonJs}"><\/script>
<script src="${commonI18nJs}"><\/script>
<script src="${exeExportJs}"><\/script>${mathJaxScripts}${detectedLibraryScripts}${ideviceScripts}${atoolsScript}
<script src="${themeJs}" onerror="this.remove()"><\/script>
<script>
// Initialize iDevices after DOM is ready
if (typeof $exeExport !== 'undefined' && $exeExport.init) {
    $exeExport.init();
}
<\/script>`;
    }
    /**
     * Escape HTML special characters
     */
    escapeHtml(text) {
      const escapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return text.replace(/[&<>"']/g, (char) => escapes[char] || char);
    }
  };

  // src/shared/export/exporters/ComponentExporter.ts
  var ComponentExporter = class extends BaseExporter {
    /**
     * Get file extension for component export
     */
    getFileExtension() {
      return ".elp";
    }
    /**
     * Get file suffix for component export
     */
    getFileSuffix() {
      return "";
    }
    /**
     * Standard export method (not typically used for components)
     * Use exportComponent() instead for targeted exports
     */
    async export(options) {
      const componentOptions = options;
      if (!componentOptions?.blockId) {
        return {
          success: false,
          error: "blockId is required for component export"
        };
      }
      return this.exportComponent(componentOptions.blockId, componentOptions.ideviceId);
    }
    /**
     * Export a single component (iDevice) or entire block
     * @param blockId - Block ID to export
     * @param ideviceId - iDevice ID (null or 'null' = export whole block)
     * @returns Export result with data buffer
     */
    async exportComponent(blockId, ideviceId) {
      const isIdevice = ideviceId && ideviceId !== "null";
      const filename = isIdevice ? `${ideviceId}.idevice` : `${blockId}.block`;
      console.log(`[ComponentExporter] Exporting ${isIdevice ? "iDevice" : "block"}: ${filename}`);
      try {
        const { block, component, pageId } = this.findComponent(blockId, ideviceId);
        if (!block) {
          console.log(`[ComponentExporter] Block not found: ${blockId}`);
          return { success: false, error: "Block not found" };
        }
        if (isIdevice && !component) {
          console.log(`[ComponentExporter] Component not found: ${ideviceId}`);
          return { success: false, error: "Component not found" };
        }
        const processedBlock = await this.preprocessBlockForExport(block, component);
        const contentXml = this.generateComponentExportXml(
          processedBlock,
          component ? processedBlock.components[0] : null,
          pageId
        );
        this.zip.addFile("content.xml", new TextEncoder().encode(contentXml));
        await this.addComponentAssetsToZip(block, component);
        const data = await this.zip.generate();
        console.log(`[ComponentExporter] Export complete: ${filename}`);
        return { success: true, data, filename };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[ComponentExporter] Export failed:", error);
        return { success: false, error: message };
      }
    }
    /**
     * Preprocess block for export: convert asset:// URLs to {{context_path}}/content/resources/path
     * Uses BaseExporter's addFilenamesToAssetUrls (same as ELPX export) for consistency.
     *
     * @param block - Original block data
     * @param singleComponent - Single component to export (null = all components in block)
     * @returns Processed block with URLs transformed
     */
    async preprocessBlockForExport(block, singleComponent) {
      const clonedBlock = JSON.parse(JSON.stringify(block));
      const components = singleComponent ? [clonedBlock.components.find((c) => c.id === singleComponent.id)] : clonedBlock.components || [];
      for (const comp of components) {
        if (comp.content) {
          comp.content = await this.addFilenamesToAssetUrls(comp.content);
        }
        if (comp.properties && Object.keys(comp.properties).length > 0) {
          const propsStr = JSON.stringify(comp.properties);
          const processedStr = await this.addFilenamesToAssetUrls(propsStr);
          comp.properties = JSON.parse(processedStr);
        }
      }
      if (singleComponent) {
        clonedBlock.components = components;
      }
      return clonedBlock;
    }
    /**
     * Export and trigger browser download
     * @param blockId - Block ID to export
     * @param ideviceId - iDevice ID (null = export whole block)
     * @returns Export result
     */
    async exportAndDownload(blockId, ideviceId) {
      const result = await this.exportComponent(blockId, ideviceId);
      if (result.success && result.data && result.filename) {
        this.downloadBlob(result.data, result.filename);
      }
      return result;
    }
    /**
     * Find block and component in document navigation structure
     * @param blockId - Block ID to find
     * @param ideviceId - Optional iDevice ID to find within block
     */
    findComponent(blockId, ideviceId) {
      const pages = this.buildPageList();
      for (const page of pages) {
        for (const block of page.blocks || []) {
          if (block.id === blockId) {
            if (ideviceId && ideviceId !== "null") {
              const component = (block.components || []).find((c) => c.id === ideviceId);
              return { block, component: component || null, pageId: page.id };
            }
            return { block, component: null, pageId: page.id };
          }
        }
      }
      return { block: null, component: null, pageId: null };
    }
    /**
     * Generate XML for component export (ODE format)
     * @param block - Block data
     * @param component - Single component to export (null = all components in block)
     * @param pageId - Page ID containing the block
     */
    generateComponentExportXml(block, component, pageId) {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">\n';
      xml += "<odeResources>\n";
      xml += "  <odeResource>\n";
      xml += "    <key>odeComponentsResources</key>\n";
      xml += "    <value>true</value>\n";
      xml += "  </odeResource>\n";
      xml += "</odeResources>\n";
      xml += "<odePagStructures>\n";
      xml += this.generateBlockExportXml(block, component, pageId);
      xml += "</odePagStructures>\n";
      xml += "</ode>";
      return xml;
    }
    /**
     * Generate XML for the block structure
     * @param block - Block data
     * @param singleComponent - Single component to include (null = all)
     * @param pageId - Page ID
     */
    generateBlockExportXml(block, singleComponent, pageId) {
      let xml = "  <odePagStructure>\n";
      xml += `    <odeBlockId>${this.escapeXml(block.id)}</odeBlockId>
`;
      xml += `    <blockName>${this.escapeXml(block.name || "Block")}</blockName>
`;
      xml += `    <iconName>${this.escapeXml(block.iconName || "")}</iconName>
`;
      xml += `    <odePagStructureOrder>0</odePagStructureOrder>
`;
      xml += `    <odePagStructureProperties>${this.escapeXml(JSON.stringify(block.properties || {}))}</odePagStructureProperties>
`;
      xml += "    <odeComponents>\n";
      const components = singleComponent ? [singleComponent] : block.components || [];
      for (const comp of components) {
        xml += this.generateIdeviceExportXml(comp, block.id, pageId);
      }
      xml += "    </odeComponents>\n";
      xml += "  </odePagStructure>\n";
      return xml;
    }
    /**
     * Generate XML for a single iDevice/component
     * Content is already preprocessed with {{context_path}} URLs by preprocessBlockForExport()
     *
     * @param comp - Component data (already preprocessed)
     * @param blockId - Parent block ID
     * @param pageId - Parent page ID
     */
    generateIdeviceExportXml(comp, blockId, pageId) {
      const htmlContent = comp.content || "";
      const propsJson = JSON.stringify(comp.properties || {});
      let xml = "      <odeComponent>\n";
      xml += `        <odeIdeviceId>${this.escapeXml(comp.id)}</odeIdeviceId>
`;
      xml += `        <odePageId>${this.escapeXml(pageId)}</odePageId>
`;
      xml += `        <odeBlockId>${this.escapeXml(blockId)}</odeBlockId>
`;
      xml += `        <odeIdeviceTypeName>${this.escapeXml(comp.type || "FreeTextIdevice")}</odeIdeviceTypeName>
`;
      xml += `        <ideviceSrcType>json</ideviceSrcType>
`;
      xml += `        <userIdevice>0</userIdevice>
`;
      xml += `        <htmlView><![CDATA[${this.escapeCdata(htmlContent)}]]></htmlView>
`;
      xml += `        <jsonProperties><![CDATA[${this.escapeCdata(propsJson)}]]></jsonProperties>
`;
      xml += `        <odeComponentsOrder>${comp.order || 0}</odeComponentsOrder>
`;
      xml += `        <odeComponentsProperties></odeComponentsProperties>
`;
      xml += "      </odeComponent>\n";
      return xml;
    }
    /**
     * Add only assets used by this component to ZIP
     * Scans component content for asset:// URLs and includes only those assets.
     *
     * Assets are stored at `content/resources/{folderPath}/{filename}` to match ELPX format.
     * Uses buildAssetExportPathMap() for consistent path generation with addFilenamesToAssetUrls().
     *
     * @param block - Block data (with original asset:// URLs for ID extraction)
     * @param singleComponent - Single component (null = all in block)
     */
    async addComponentAssetsToZip(block, singleComponent) {
      try {
        const allAssets = await this.assets.getAllAssets();
        const exportPathMap = await this.buildAssetExportPathMap();
        const components = singleComponent ? [singleComponent] : block.components || [];
        const usedAssetIds = /* @__PURE__ */ new Set();
        for (const comp of components) {
          const content = comp.content || "";
          const matches = content.matchAll(/asset:\/\/([a-f0-9-]{36})/gi);
          for (const match of matches) {
            usedAssetIds.add(match[1]);
          }
          if (comp.properties) {
            const propsStr = JSON.stringify(comp.properties);
            const propsMatches = propsStr.matchAll(/asset:\/\/([a-f0-9-]{36})/gi);
            for (const match of propsMatches) {
              usedAssetIds.add(match[1]);
            }
          }
        }
        console.log(`[ComponentExporter] Found ${usedAssetIds.size} referenced assets`);
        let addedCount = 0;
        for (const asset of allAssets) {
          if (usedAssetIds.has(asset.id)) {
            const exportPath = exportPathMap.get(asset.id);
            if (exportPath) {
              const zipPath = `content/resources/${exportPath}`;
              this.zip.addFile(zipPath, asset.data);
              console.log(`[ComponentExporter] Added asset: ${zipPath}`);
              addedCount++;
            } else {
              console.warn(`[ComponentExporter] No export path for asset: ${asset.id}`);
            }
          }
        }
        console.log(`[ComponentExporter] Added ${addedCount} assets to ZIP`);
      } catch (e) {
        console.warn("[ComponentExporter] Failed to add assets:", e);
      }
    }
    /**
     * Trigger browser download of blob data
     * @param data - ZIP data buffer
     * @param filename - Download filename
     */
    downloadBlob(data, filename) {
      if (typeof window === "undefined" || typeof document === "undefined") {
        console.warn("[ComponentExporter] downloadBlob only works in browser environment");
        return;
      }
      const blob = new Blob([data], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // src/shared/export/exporters/PageElpxExporter.ts
  var PageElpxExporter = class extends ElpxExporter {
    constructor() {
      super(...arguments);
      // Set of asset IDs that are referenced by the pages being exported
      // null means no filtering (export all assets)
      this.filteredAssetIds = null;
    }
    /**
     * Get file extension for ELPX format
     */
    getFileExtension() {
      return ".elpx";
    }
    /**
     * Get file suffix for ELPX PAGE format
     */
    getFileSuffix() {
      return "";
    }
    /**
     * Export to ELPX format (subtree)
     *
     * Key: We extract asset IDs from the original pages BEFORE calling super.export(),
     * because super.export() will preprocess pages and transform asset:// URLs to
     * {{context_path}}/content/resources/ format, losing the asset UUIDs.
     */
    async export(options) {
      const elpxOptions = options;
      this.rootPageId = elpxOptions?.rootPageId;
      if (this.rootPageId) {
        const pages = this.buildPageList();
        this.filteredAssetIds = this.extractAssetIdsFromPages(pages);
        console.log(
          `[PageElpxExporter] Extracted ${this.filteredAssetIds.size} asset IDs from ${pages.length} pages`
        );
      } else {
        this.filteredAssetIds = null;
      }
      return super.export(options);
    }
    /**
     * Override to only add assets used by the exported page subtree
     *
     * This follows the same pattern as ComponentExporter.addComponentAssetsToZip()
     * which successfully filters assets for component exports.
     */
    async addAssetsToZipWithResourcePath(trackingList) {
      if (!this.filteredAssetIds) {
        return super.addAssetsToZipWithResourcePath(trackingList);
      }
      let assetsAdded = 0;
      try {
        const allAssets = await this.assets.getAllAssets();
        const exportPathMap = await this.buildAssetExportPathMap();
        console.log(
          `[PageElpxExporter] Filtering ${allAssets.length} total assets, keeping ${this.filteredAssetIds.size} referenced`
        );
        for (const asset of allAssets) {
          if (this.filteredAssetIds.has(asset.id)) {
            const exportPath = exportPathMap.get(asset.id);
            if (exportPath) {
              const zipPath = `content/resources/${exportPath}`;
              this.zip.addFile(zipPath, asset.data);
              if (trackingList) trackingList.push(zipPath);
              assetsAdded++;
              console.log(`[PageElpxExporter] Added referenced asset: ${zipPath}`);
            } else {
              console.warn(`[PageElpxExporter] No export path for referenced asset: ${asset.id}`);
            }
          }
        }
        console.log(`[PageElpxExporter] Added ${assetsAdded} filtered assets to ZIP`);
      } catch (e) {
        console.warn("[PageElpxExporter] Failed to add assets to ZIP:", e);
      }
      return assetsAdded;
    }
    /**
     * Extract asset IDs from all component content and properties in pages
     *
     * This scans for the asset:// URL pattern used in eXeLearning content.
     * Supports both formats:
     * - New format: asset://aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.jpg (UUID with extension)
     * - Legacy format: asset://aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/filename (UUID with path)
     * - ODE ID format: asset://20251009090601SQPBIF.jpg (18-char alphanumeric with extension)
     *
     * @param pages - Pages to scan for asset references
     * @returns Set of asset IDs found in the content
     */
    extractAssetIdsFromPages(pages) {
      const assetIds = /* @__PURE__ */ new Set();
      const assetPattern = /asset:\/\/([a-zA-Z0-9-]+)(?:[./"'])/gi;
      for (const page of pages) {
        for (const block of page.blocks || []) {
          for (const component of block.components || []) {
            if (component.content) {
              const matches = component.content.matchAll(assetPattern);
              for (const match of matches) {
                assetIds.add(match[1]);
              }
            }
            if (component.properties && Object.keys(component.properties).length > 0) {
              const propsStr = JSON.stringify(component.properties);
              const matches = propsStr.matchAll(assetPattern);
              for (const match of matches) {
                assetIds.add(match[1]);
              }
            }
          }
        }
      }
      return assetIds;
    }
    /**
     * Override buildPageList to filter subtree
     */
    buildPageList() {
      const allPages = super.buildPageList();
      if (!this.rootPageId) {
        return allPages;
      }
      const rootPage = allPages.find((p) => p.id === this.rootPageId);
      if (!rootPage) {
        console.warn(`[PageElpxExporter] Root page ${this.rootPageId} not found, exporting all.`);
        return allPages;
      }
      const subtree = [];
      const visited = /* @__PURE__ */ new Set();
      const collect = (parentId) => {
        const children = allPages.filter((p) => p.parentId === parentId);
        children.sort((a, b) => a.order - b.order);
        for (const child of children) {
          if (!visited.has(child.id)) {
            visited.add(child.id);
            subtree.push(child);
            collect(child.id);
          }
        }
      };
      const newRoot = { ...rootPage, parentId: null };
      visited.add(rootPage.id);
      subtree.push(newRoot);
      collect(rootPage.id);
      return subtree;
    }
  };

  // src/shared/export/browser/index.ts
  function createNullResourceProvider() {
    return {
      fetchTheme: async () => /* @__PURE__ */ new Map(),
      fetchIdeviceResources: async () => /* @__PURE__ */ new Map(),
      fetchBaseLibraries: async () => /* @__PURE__ */ new Map(),
      fetchScormFiles: async () => /* @__PURE__ */ new Map(),
      fetchLibraryFiles: async () => /* @__PURE__ */ new Map(),
      fetchLibraryDirectory: async () => /* @__PURE__ */ new Map(),
      fetchSchemas: async () => /* @__PURE__ */ new Map(),
      fetchContentCss: async () => /* @__PURE__ */ new Map(),
      normalizeIdeviceType: (type) => type.toLowerCase().replace(/idevice$/i, "") || "text"
    };
  }
  function createNullAssetProvider() {
    return {
      getAsset: async () => null,
      hasAsset: async () => false,
      listAssets: async () => [],
      getAllAssets: async () => [],
      resolveAssetUrl: async () => null,
      getProjectAssets: async () => []
    };
  }
  function createExporter(format, documentManager, assetCache, resourceFetcher, assetManager) {
    if (!documentManager) {
      throw new Error("[SharedExporters] documentManager is required for export");
    }
    const document2 = new YjsDocumentAdapter(documentManager);
    const resources = resourceFetcher ? new BrowserResourceProvider(resourceFetcher) : createNullResourceProvider();
    const assets = assetCache || assetManager ? new BrowserAssetProvider(
      assetCache,
      assetManager
    ) : createNullAssetProvider();
    const zip2 = new FflateZipProvider();
    const normalizedFormat = format.toLowerCase().replace("-", "");
    switch (normalizedFormat) {
      case "html5":
      case "web":
        return new Html5Exporter(document2, resources, assets, zip2);
      case "html5sp":
      case "page":
        return new PageExporter(document2, resources, assets, zip2);
      case "scorm12":
      case "scorm":
        return new Scorm12Exporter(document2, resources, assets, zip2);
      case "scorm2004":
        return new Scorm2004Exporter(document2, resources, assets, zip2);
      case "ims":
      case "imscp":
        return new ImsExporter(document2, resources, assets, zip2);
      case "epub3":
      case "epub":
        return new Epub3Exporter(document2, resources, assets, zip2);
      case "elpx":
      case "elp":
        return new ElpxExporter(document2, resources, assets, zip2);
      case "pageelpx":
      case "pageelp":
        return new PageElpxExporter(document2, resources, assets, zip2);
      case "component":
      case "block":
      case "idevice":
        return new ComponentExporter(document2, resources, assets, zip2);
      default:
        throw new Error(`Unknown export format: ${format}`);
    }
  }
  function getLatexPreRendererHooks() {
    if (typeof window === "undefined") return void 0;
    const windowLatexPreRenderer = window.LatexPreRenderer;
    const windowMathJax = window.MathJax;
    if (windowLatexPreRenderer && windowMathJax) {
      return {
        preRenderLatex: windowLatexPreRenderer.preRender.bind(windowLatexPreRenderer),
        preRenderDataGameLatex: windowLatexPreRenderer.preRenderDataGameLatex.bind(windowLatexPreRenderer)
      };
    }
    return void 0;
  }
  function getMermaidPreRendererHooks() {
    if (typeof window === "undefined") return void 0;
    const windowMermaidPreRenderer = window.MermaidPreRenderer;
    if (windowMermaidPreRenderer) {
      return {
        preRenderMermaid: windowMermaidPreRenderer.preRender.bind(windowMermaidPreRenderer)
      };
    }
    return void 0;
  }
  async function quickExport(format, documentManager, assetCache, resourceFetcher, options, assetManager) {
    const exporter = createExporter(format, documentManager, assetCache, resourceFetcher, assetManager);
    const latexHooks = getLatexPreRendererHooks();
    const mermaidHooks = getMermaidPreRendererHooks();
    const exportOptions = { ...options, ...latexHooks, ...mermaidHooks };
    return exporter.export(exportOptions);
  }
  async function exportAndDownload(format, documentManager, assetCache, resourceFetcher, filename, options, assetManager) {
    const exporter = createExporter(format, documentManager, assetCache, resourceFetcher, assetManager);
    const latexHooks = getLatexPreRendererHooks();
    const mermaidHooks = getMermaidPreRendererHooks();
    const exportOptions = { ...options, ...latexHooks, ...mermaidHooks };
    const result = await exporter.export(exportOptions);
    if (!result.success || !result.data) {
      throw new Error(result.error || "Export failed");
    }
    const extension = exporter.getFileExtension();
    const fullFilename = filename.endsWith(extension) ? filename : `${filename}${extension}`;
    const blob = new Blob([result.data], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fullFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return result;
  }
  async function generatePrintPreview(documentManager, resourceFetcher, options) {
    const document2 = new YjsDocumentAdapter(documentManager);
    const resources = resourceFetcher ? new BrowserResourceProvider(resourceFetcher) : createNullResourceProvider();
    const exporter = new PrintPreviewExporter(document2, resources);
    const latexHooks = getLatexPreRendererHooks();
    const mermaidHooks = getMermaidPreRendererHooks();
    options = {
      ...options,
      ...latexHooks,
      ...mermaidHooks
    };
    return exporter.generatePreview(options);
  }
  function createPrintPreviewExporter(documentManager, resourceFetcher) {
    const document2 = new YjsDocumentAdapter(documentManager);
    const resources = resourceFetcher ? new BrowserResourceProvider(resourceFetcher) : createNullResourceProvider();
    return new PrintPreviewExporter(document2, resources);
  }
  async function generatePreviewForSW(documentManager, assetCache, resourceFetcher, assetManager, options) {
    try {
      if (!documentManager) {
        throw new Error("[SharedExporters] documentManager is required for preview");
      }
      const document2 = new YjsDocumentAdapter(documentManager);
      const resources = resourceFetcher ? new BrowserResourceProvider(resourceFetcher) : createNullResourceProvider();
      const assets = assetCache || assetManager ? new BrowserAssetProvider(
        assetCache,
        assetManager
      ) : createNullAssetProvider();
      const zip2 = new FflateZipProvider();
      const exporter = new Html5Exporter(document2, resources, assets, zip2);
      const latexHooks = getLatexPreRendererHooks();
      const mermaidHooks = getMermaidPreRendererHooks();
      const exportOptions = { ...options, ...latexHooks, ...mermaidHooks };
      const filesMap = await exporter.generateForPreview(exportOptions);
      const files = {};
      for (const [path, content] of filesMap) {
        if (content instanceof Uint8Array) {
          files[path] = content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength);
        } else if (typeof content === "string") {
          const encoder = new TextEncoder();
          const encoded = encoder.encode(content);
          files[path] = encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength);
        } else {
          files[path] = content;
        }
      }
      console.log(`[SharedExporters] Generated ${Object.keys(files).length} preview files for SW`);
      return {
        success: true,
        files
      };
    } catch (error) {
      console.error("[SharedExporters] generatePreviewForSW failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  if (typeof window !== "undefined") {
    const windowExports = {
      // Factory functions
      createExporter,
      quickExport,
      exportAndDownload,
      // SW-based preview functions
      generatePreviewForSW,
      // Print preview functions
      generatePrintPreview,
      createPrintPreviewExporter,
      // Adapters
      YjsDocumentAdapter,
      BrowserResourceProvider,
      BrowserAssetProvider,
      ExportAssetResolver,
      // Providers
      FflateZipProvider,
      // Exporters
      Html5Exporter,
      PageExporter,
      Scorm12Exporter,
      Scorm2004Exporter,
      ImsExporter,
      Epub3Exporter,
      ElpxExporter,
      PrintPreviewExporter,
      ComponentExporter,
      PageElpxExporter,
      // Renderers
      IdeviceRenderer,
      PageRenderer,
      // Generators
      Scorm12ManifestGenerator,
      Scorm2004ManifestGenerator,
      ImsManifestGenerator,
      LomMetadataGenerator,
      // Utilities
      LibraryDetector
    };
    window.PrintPreviewExporter = PrintPreviewExporter;
    window.generatePrintPreview = generatePrintPreview;
    window.SharedExporters = windowExports;
    window.createSharedExporter = createExporter;
    window.createExporter = createExporter;
    window.ElpxExporter = ElpxExporter;
    console.log("[SharedExporters] Browser export system loaded");
  }
})();
