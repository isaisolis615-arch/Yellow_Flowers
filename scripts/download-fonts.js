import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.resolve(__dirname, '..', 'public', 'fonts');

// URLs directas conocidas de Google Fonts (woff2)
// Estas son las URLs actuales conocidas para estos fuentes
const fontFiles = [
  // Cormorant Garamond
  { file: 'CormorantGaramond-Regular.woff2', urls: [
    'https://fonts.gstatic.com/s/cormorantgaramond/v17/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2',
    'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2'
  ]},
  { file: 'CormorantGaramond-SemiBold.woff2', urls: [
    'https://fonts.gstatic.com/s/cormorantgaramond/v17/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2',
    'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2'
  ]},
  { file: 'CormorantGaramond-Bold.woff2', urls: [
    'https://fonts.gstatic.com/s/cormorantgaramond/v17/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2',
    'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3DmWZfqlDpnYSRI6lC34hPqFlg.woff2'
  ]},
  // Caveat
  { file: 'Caveat-Regular.woff2', urls: [
    'https://fonts.gstatic.com/s/caveat/v14/WnzHHAAc5SR1JzpfUBtWaJtn.woff2',
    'https://fonts.gstatic.com/s/caveat/v13/WnzHHAAc5SR1JzpfUBtWaJtn.woff2'
  ]},
  { file: 'Caveat-Bold.woff2', urls: [
    'https://fonts.gstatic.com/s/caveat/v14/WnzHHAAc5SR1JzpfUBtWaJtn.woff2',
    'https://fonts.gstatic.com/s/caveat/v13/WnzHHAAc5SR1JzpfUBtWaJtn.woff2'
  ]},
  // DM Sans
  { file: 'DMSans-Regular.woff2', urls: [
    'https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZ2IHTGs6Q.woff2',
    'https://fonts.gstatic.com/s/dmsans/v14/rP2Hp2ywxg089UriCZ2IHTGs6Q.woff2'
  ]},
  { file: 'DMSans-Medium.woff2', urls: [
    'https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZ2IHTGs6Q.woff2',
    'https://fonts.gstatic.com/s/dmsans/v14/rP2Hp2ywxg089UriCZ2IHTGs6Q.woff2'
  ]},
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    });
    request.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
    request.setTimeout(10000, () => {
      request.destroy();
      file.close();
      fs.unlink(dest, () => {});
      reject(new Error('Timeout'));
    });
  });
}

async function downloadWithFallback(file, urls) {
  const destPath = path.join(FONTS_DIR, file);

  for (const url of urls) {
    try {
      console.log(`  ⬇️  Intentando ${file} desde ${url.split('/').slice(-2).join('/')}...`);
      await downloadFile(url, destPath);
      const stats = fs.statSync(destPath);
      if (stats.size > 1000) {
        console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
        return true;
      } else {
        fs.unlinkSync(destPath);
        throw new Error('Archivo demasiado pequeño');
      }
    } catch (err) {
      console.log(`  ⚠️  Falló: ${err.message}`);
    }
  }
  return false;
}

async function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log('📥 Descargando fuentes (woff2)...');

  let success = 0;
  for (const { file, urls } of fontFiles) {
    const destPath = path.join(FONTS_DIR, file);
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 1000) {
        console.log(`  ⏭️  ${file} ya existe (${(stats.size / 1024).toFixed(1)} KB)`);
        success++;
        continue;
      }
    }

    const ok = await downloadWithFallback(file, urls);
    if (ok) success++;
  }

  console.log(`\n✅ ${success}/${fontFiles.length} fuentes descargadas`);
  if (success < fontFiles.length) {
    console.log('⚠️  Algunas fuentes fallaron. El @import de Google Fonts en CSS servirá como fallback.');
  }
}

main().catch(console.error);