# 🌻 Ramos de Sol - Regalo para mi mejor amiga

Sitio web personal con rosas amarillas, fotos, notas y música para un regalo especial.

## ✨ Características

- **Animación 3D de caja de regalo** al entrar (CSS 3D + GSAP)
- **11 fotos optimizadas** en galería masonry con lightbox accesible
- **Notas tipo post-it, cartas y poemas** intercaladas con las fotos
- **Música de fondo** (Michael Jackson) con reproductor flotante
- **Lluvia de pétalos** al llegar al final
- **Mobile-first responsive** - se ve perfecto en móvil
- **Paleta pastel** amarillo/rosa/verde
- **Accesible** - navegación por teclado, screen readers, prefers-reduced-motion
- **Protegido por contraseña** vía Netlify (gratis)

## 🚀 Desarrollo local

```bash
# Instalar dependencias
npm install

# Optimizar assets (imágenes + audio)
npm run optimize

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del proyecto

```
yellow-flowers/
├── src/
│   ├── components/       # Componentes Astro (GiftBox3D, PhotoMasonry, NoteCard, etc.)
│   ├── layouts/          # Layout principal
│   ├── pages/            # Páginas (index.astro)
│   ├── styles/           # CSS (variables, globals)
│   ├── scripts/          # JS principal
│   └── data/             # JSON con fotos y notas
├── public/
│   ├── photos/           # 11 imágenes WebP optimizadas
│   ├── audio/            # 2 MP3 comprimidos (128kbps)
│   └── fonts/            # Fuentes (opcional, usa Google Fonts CDN)
├── scripts/
│   └── optimize-assets.js  # Sharp + ffmpeg para optimización
└── .github/workflows/    # Deploy automático a Netlify
```

## 🔐 Despliegue con contraseña (Gratis en Netlify)

### Opción A: Netlify Dashboard (Recomendado)

1. **Crear repo en GitHub** llamado `Yellow_Flowers`
2. **Push del código:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ramos de Sol 🌻"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/Yellow_Flowers.git
   git push -u origin main
   ```
3. **En Netlify:**
   - New site from Git → GitHub → Selecciona `Yellow_Flowers`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy site
4. **Activar password protection:**
   - Site settings → Access control → Add password protection
   - Password: `1820Ñ2`
   - Save
5. **Para la rama `gift-deploy` (preview privado):**
   - Crea rama: `git checkout -b gift-deploy && git push -u origin gift-deploy`
   - Netlify creará automáticamente un Deploy Preview con password
   - Comparte esa URL: `https://yellow-flowers--gift-deploy.netlify.app`

### Opción B: GitHub Actions (Automático)

1. En GitHub repo → Settings → Secrets and variables → Actions
2. Añade estos secrets:
   - `NETLIFY_AUTH_TOKEN` (de Netlify User Settings → Applications → Personal access tokens)
   - `NETLIFY_SITE_ID` (de Netlify Site settings → General → Site details → Site ID)
3. Push a `main` → Deploy automático a producción
4. Push a `gift-deploy` → Deploy Preview con password

## 📝 Personalizar contenido

Edita estos archivos JSON:

**`src/data/photos.json`** - Tus fotos:
```json
[
  { "src": "/photos/tu-foto.webp", "alt": "Descripción", "special": true, "year": 1995 },
  ...
]
```

**`src/data/notes.json`** - Tus mensajes:
```json
[
  { "id": "n1", "type": "postit", "content": "Tu mensaje corto", "position": "left", "photoIndex": 0 },
  { "id": "n2", "type": "carta", "content": "Tu carta larga...\n\nCon saltos de línea", "position": "center", "photoIndex": null },
  { "id": "n3", "type": "poema", "content": "Verso 1\nVerso 2\nVerso 3", "position": "center", "photoIndex": null }
]
```

**Tipos de nota:**
- `postit` - Corta, estilo nota adhesiva, fuente manuscrita
- `carta` - Larga, papel rayado, fuente serif elegante
- `poema` - Centrado, rosa pálido, cursiva

## 🎵 Cambiar música

1. Pon tus MP3 en `Canciones/` (raíz del proyecto, no en public)
2. Ejecuta `npm run optimize` (usa ffmpeg para comprimir a 128kbps)
3. Actualiza `src/pages/index.astro` en el componente `AudioPlayer`

## 🎨 Personalizar colores

Edita `src/styles/variables.css`:
```css
:root {
  --color-amarillo-medio: #FFD66B;  /* Color principal */
  --color-rosa-suave: #FADADD;      /* Acento rosa */
  --color-verde-hoja: #C8E6C9;      /* Acento verde */
  ...
}
```

## 📱 Test en móvil

```bash
npm run preview -- --host
# Abre http://TU_IP_LOCAL:4321 en tu móvil
```

## 🛠️ Tech Stack

- **Astro 7** - Static site generator
- **CSS Modules + Variables** - Estilos sin dependencias
- **GSAP 3** - Animaciones (solo para GiftBox3D)
- **Sharp** - Optimización de imágenes en build
- **Netlify** - Hosting + Password protection gratis

## 📄 Licencia

Uso personal - Regalo para mi mejor amiga 💛

---

**¿Problemas?**
- `npm run optimize` falla → Instala ffmpeg: `winget install ffmpeg` (Windows) o `brew install ffmpeg` (Mac)
- Fuentes no cargan → El `@import` de Google Fonts en `globals.css` es fallback automático
- Audio no reproduce → El navegador requiere interacción del usuario primero (click en play)