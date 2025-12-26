# eXeViewer

[English version](README.md)

Visualiza contenidos generados con eXeLearning directamente en tu navegador.

## Descripción

eXeViewer es una aplicación web que se ejecuta en el cliente y permite visualizar contenido exportado desde [eXeLearning](https://exelearning.net/) sin necesidad de tener tu propio alojamiento web.

La aplicación se ejecuta completamente en tu navegador. Cuando cargas un fichero desde tu dispositivo, no se sube nada a ningún servidor. El contenido se extrae en memoria y se muestra mediante JavaScript (un Service Worker).

## Características

- Carga ficheros `.zip` o `.elpx` desde tu dispositivo (arrastrándolos o seleccionándolos)
- Carga contenido desde una URL (enlaces directos a ficheros `.zip` o `.elpx`)
- Admite enlaces compartidos de Nextcloud, ownCloud y Google Drive
- Genera enlaces para compartir cuando visualizas contenido cargado desde URL
- Extracción en memoria (no se escribe nada en disco)
- Navegación completa con soporte para HTML, CSS, JavaScript, imágenes y multimedia
- Interfaz adaptable al dispositivo (_responsive design_)
- Modo oscuro (preferencia del sistema)
- Soporte multilingüe
- Instalable como aplicación web progresiva (PWA) para usarla sin conexión (_offline_)

## Uso

### Cargar contenido desde tu dispositivo

1. Abre eXeViewer en tu navegador
2. Arrastra un fichero `.zip` o `.elpx` a la zona de carga, o haz clic en "Seleccionar fichero"
3. El contenido se extraerá y se mostrará en el navegador

El fichero nunca sale de tu dispositivo. Todo el procesamiento ocurre en tu navegador.

### Cargar contenido desde una URL

1. Pega un enlace directo a un fichero `.zip` o `.elpx` en el campo de URL
2. Haz clic en "Cargar"
3. El fichero se descargará y se mostrará en el navegador

Funciona con:
- Enlaces directos a ficheros .zip o .elpx en cualquier servidor
- Enlaces compartidos de Nextcloud y ownCloud
- Enlaces compartidos de Google Drive

### Compartir contenido

Cuando cargas contenido desde una URL, aparece un botón "Compartir" en la barra superior. Haz clic en él para obtener un enlace directo que cualquiera puede usar para ver el contenido completo a través de eXeViewer.

**Esto resuelve un problema común**: muchos usuarios de eXeLearning crean contenido pero no tienen dónde publicarlo. Con eXeViewer:

1. Sube tu fichero `.zip` o `.elpx` a un servicio en la nube (Nextcloud, ownCloud, Google Drive o cualquier alojamiento de ficheros)
2. Genera un enlace para compartir desde tu servicio en la nube
3. Pega el enlace en eXeViewer
4. Haz clic en el botón "Compartir" para obtener una URL del visor
5. Comparte esa URL con quien quieras

El enlace funcionará mientras el fichero original permanezca en la dirección especificada.

## Instalación

eXeViewer es una aplicación HTML/CSS/JavaScript estática. Se ejecuta completamente en el navegador y no requiere Node.js, Bun ni ningún entorno de ejecución del lado del servidor en producción.

### Despliegue en un servidor web

Sube los siguientes ficheros y carpetas a cualquier servidor web:

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

La aplicación funcionará en:
- Apache (XAMPP, alojamiento compartido, etc.)
- Nginx
- GitHub Pages
- Netlify
- Vercel
- Cualquier servidor que pueda servir ficheros estáticos por HTTP/HTTPS

Para que la opción de compartir funcione, la aplicación se debe servir por HTTPS (o HTTP en localhost).

### Ejecución local sin servidor web

Si no tienes un servidor web instalado, puedes usar el `server.js` incluido:

#### Usando Bun

```bash
# Instalar Bun (si no está instalado)
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Iniciar el servidor
bun run start
```

#### Usando Node.js

```bash
# Requiere Node.js v18+
node server.js
```

Después abre `http://localhost:3000` en tu navegador.

### Cambiar el puerto

```bash
# Bun
PORT=8080 bun run server.js

# Node.js
PORT=8080 node server.js

# Windows (PowerShell)
$env:PORT=8080; bun run server.js
```

## Instalación como aplicación web progresiva (PWA)

eXeViewer se puede instalar como una aplicación independiente en tu dispositivo. Una vez instalada:

- Aparece en el lanzador de aplicaciones o menú de inicio
- Se abre en su propia ventana (sin interfaz del navegador)
- Funciona sin conexión (_offline_)

**Nota**: Cuando se ejecuta como PWA instalada, la aplicación se ejecuta localmente en tu dispositivo. Esto significa que no puedes generar enlaces para compartir, ya que esos enlaces necesitan apuntar a una instancia de eXeViewer accesible públicamente. Para la funcionalidad de compartir, usa eXeViewer en la red (una instancia alojada en un servidor).

### Escritorio (Chrome, Edge)

1. Abre eXeViewer en tu navegador
2. Haz clic en el icono de instalación en la barra de direcciones (o en el menú de tres puntos > "Instalar eXeViewer")
3. Confirma la instalación

### Escritorio (Firefox)

Firefox no soporta la instalación de PWA de forma nativa. Usa la extensión [PWAs for Firefox](https://addons.mozilla.org/firefox/addon/pwas-for-firefox/).

### Android (Chrome)

1. Abre eXeViewer en Chrome
2. Toca el menú de tres puntos
3. Selecciona "Añadir a pantalla de inicio" o "Instalar aplicación"

### iOS (Safari)

1. Abre eXeViewer en Safari
2. Toca el botón Compartir
3. Toca "Añadir a pantalla de inicio"

## Para desarrolladores

### Cómo funciona

1. **Service Worker** (`sw.js`): Realiza dos funciones:
   - Almacena en caché la estructura de la aplicación para uso sin conexión.
   - Intercepta las peticiones a `/viewer/*` y sirve el contenido ZIP extraído desde memoria.

2. **Procesamiento ZIP** (`js/app.js`): Usa JSZip para extraer el contenido en memoria. Los ficheros se envían al Service Worker codificados en base64.

3. **Visualización del contenido**: Un iframe carga `/viewer/index.html`. El Service Worker intercepta esta petición y sirve el fichero correspondiente del contenido extraído.

4. **Gestión de URLs**: Para enlaces de servicios en la nube, la aplicación transforma las URLs de compartir en URLs de descarga directa antes de hacer la petición.

5. **Persistencia del contenido**: El contenido extraído se guarda en IndexedDB y se restaura automáticamente al recargar la página. Este comportamiento se puede deshabilitar en `js/app.js`:
   ```javascript
   const config = {
       autoRestoreContent: false  // Cambiar a false para deshabilitar
   };
   ```

6. **Gestión de enlaces externos**: Los enlaces externos del contenido se abren por defecto en ventana/pestaña nueva. Eso evita problemas cuando el contenido se muestra en un iframe. El comportamiento se puede cambiar en `js/app.js`:
   ```javascript
   const config = {
       openExternalLinksInNewWindow: false  // Cambiar a false para deshabilitar
   };
   ```

### Añadir un nuevo idioma

1. Copia `lang/en.json` a `lang/XX.json` (donde `XX` es el código ISO 639-1)

2. Traduce los valores en el nuevo fichero (mantén las claves sin cambios)

3. Añade el código del idioma a `AVAILABLE_LANGUAGES` en `js/i18n.js`:
   ```javascript
   const AVAILABLE_LANGUAGES = ['en', 'es', 'XX'];
   ```

4. Añade la opción del idioma a ambos menús desplegables en `index.html`:
   ```html
   <li><a class="dropdown-item" href="#" data-lang="XX">Nombre del idioma</a></li>
   ```

5. Añade el nombre del idioma a la sección `language` en todos los ficheros de idioma:
   ```json
   "language": {
     "XX": "Nombre del idioma"
   }
   ```

### Estructura del proyecto

```
exeviewer/
├── index.html          # Página principal de la aplicación
├── manifest.json       # Manifiesto PWA
├── sw.js               # Service Worker
├── server.js           # Servidor de desarrollo (Bun/Node.js)
├── package.json        # Configuración del proyecto
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   ├── app.js          # Lógica principal de la aplicación
│   └── i18n.js         # Módulo de internacionalización
├── lang/
│   ├── en.json         # Traducciones en inglés
│   └── es.json         # Traducciones en español
├── img/                # Iconos e imágenes
├── vendor/             # Bibliotecas de terceros
│   ├── bootstrap/      # Bootstrap 5.3.2
│   ├── bootstrap-icons/# Bootstrap Icons 1.11.1
│   └── jszip/          # JSZip 3.10.1
└── scripts/
    └── generate-icons.js   # Script de generación de iconos (requiere Node.js + sharp)
```

## Licencia

Copyright (C) 2026 [Ignacio Gros](https://www.gros.es)

Este programa es software libre: puedes redistribuirlo y/o modificarlo bajo los términos de la Licencia Pública General Affero de GNU publicada por la Free Software Foundation, ya sea la versión 3 de la Licencia, o (a tu elección) cualquier versión posterior.

Este programa se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA; sin siquiera la garantía implícita de COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Consulta la Licencia Pública General Affero de GNU para más detalles.

Deberías haber recibido una copia de la Licencia Pública General Affero de GNU junto con este programa. Si no, consulta <https://www.gnu.org/licenses/>.

## Créditos

### Bibliotecas de terceros

- [Bootstrap](https://getbootstrap.com/) v5.3.2 - Copyright 2011-2023 The Bootstrap Authors - Licencia MIT
- [Bootstrap Icons](https://icons.getbootstrap.com/) v1.11.1 - Copyright 2019-2023 The Bootstrap Authors - Licencia MIT
- [JSZip](https://stuk.github.io/jszip/) v3.10.1 - Copyright 2009-2016 Stuart Knightley - Licencia MIT o GPLv3

### Proyectos relacionados

- [eXeLearning](https://exelearning.net/) - Tu editor de recursos educativos interactivos gratuito y de código abierto
