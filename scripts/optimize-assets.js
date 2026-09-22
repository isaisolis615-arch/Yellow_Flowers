import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_IMAGES = path.resolve(PROJECT_ROOT, '..', 'Yellow_Flowers', 'Imagenes');
const SOURCE_AUDIO = path.resolve(PROJECT_ROOT, '..', 'Yellow_Flowers', 'Canciones');
const PUBLIC_PHOTOS = path.join(PROJECT_ROOT, 'public', 'photos');
const PUBLIC_AUDIO = path.join(PROJECT_ROOT, 'public', 'audio');

async function optimizeImages() {
  console.log('🖼️  Optimizando imágenes...');

  if (!fs.existsSync(SOURCE_IMAGES)) {
    console.warn(`⚠️  Carpeta de origen no encontrada: ${SOURCE_IMAGES}`);
    return;
  }

  if (!fs.existsSync(PUBLIC_PHOTOS)) {
    fs.mkdirSync(PUBLIC_PHOTOS, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_IMAGES).filter(f =>
    /\.(jpe?g|png|webp)$/i.test(f)
  );

  console.log(`Encontradas ${files.length} imágenes para optimizar`);

  for (const file of files) {
    const inputPath = path.join(SOURCE_IMAGES, file);
    const name = path.parse(file).name;
    const outputPath = path.join(PUBLIC_PHOTOS, `${name}.webp`);
    const thumbPath = path.join(PUBLIC_PHOTOS, `${name}-thumb.webp`);

    try {
      // Imagen principal: max 1200px, quality 80
      await sharp(inputPath)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      // Thumbnail: 400px para lightbox rápido
      await sharp(inputPath)
        .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 70, effort: 6 })
        .toFile(thumbPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✅ ${file} → ${name}.webp (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ❌ Error con ${file}:`, err.message);
    }
  }
}

function compressAudio(inputPath, outputPath, bitrate = '128k') {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-codec:a', 'libmp3lame',
      '-b:a', bitrate,
      '-map_metadata', '-1',
      outputPath
    ]);

    ffmpeg.stderr.on('data', (data) => {
      // Silenciar output de ffmpeg a menos que haya error
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });

    ffmpeg.on('error', reject);
  });
}

async function optimizeAudio() {
  console.log('🎵 Optimizando audio...');

  if (!fs.existsSync(SOURCE_AUDIO)) {
    console.warn(`⚠️  Carpeta de audio no encontrada: ${SOURCE_AUDIO}`);
    return;
  }

  if (!fs.existsSync(PUBLIC_AUDIO)) {
    fs.mkdirSync(PUBLIC_AUDIO, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_AUDIO).filter(f =>
    /\.(mp3|wav|flac|m4a)$/i.test(f)
  );

  console.log(`Encontrados ${files.length} archivos de audio`);

  for (const file of files) {
    const inputPath = path.join(SOURCE_AUDIO, file);
    const name = path.parse(file).name;
    const outputPath = path.join(PUBLIC_AUDIO, `${name}.mp3`);

    try {
      // Comprimir a 128kbps para web
      await compressAudio(inputPath, outputPath, '128k');

      const stats = fs.statSync(outputPath);
      console.log(`  ✅ ${file} → ${name}.mp3 (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`  ❌ Error con ${file}:`, err.message);
      // Fallback: copiar original si ffmpeg falla
      try {
        fs.copyFileSync(inputPath, outputPath);
        console.log(`  ⚠️  Copiado original sin comprimir`);
      } catch (e) {
        console.error(`  ❌ Fallback también falló:`, e.message);
      }
    }
  }
}

async function copyFavicon() {
  const src = path.join(PROJECT_ROOT, 'public', 'favicon.svg');
  const dest = path.join(PROJECT_ROOT, 'public', 'favicon.svg');
  // Ya existe del template
}

async function main() {
  console.log('🚀 Iniciando optimización de assets...\n');

  await optimizeImages();
  console.log('');
  await optimizeAudio();
  console.log('');

  console.log('✅ Optimización completada');
  console.log(`📁 Imágenes en: ${PUBLIC_PHOTOS}`);
  console.log(`📁 Audio en: ${PUBLIC_AUDIO}`);
}

main().catch(console.error);