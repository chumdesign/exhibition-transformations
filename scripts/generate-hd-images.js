import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// ─── Налаштування ────────────────────────────────────────────────────────────
// MAX_SIZE для HD: більший ніж мініатюри (1920px), але не більше оригіналу
const HD_MAX_SIZE  = 3200;
const HD_QUALITY   = 90;            // вищий ніж у мініатюр (80)
const SOURCE_DIR   = './image_artwork';
const DEST_DIR     = './src/assets/images/artwork_hd';
const SKIP_EXISTING = true;         // не перезаписувати вже оброблені

// ─── Утиліти ─────────────────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function formatMb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function processHD(sourcePath, destPath) {
  if (SKIP_EXISTING && fs.existsSync(destPath)) {
    console.log(`⏭  Skip (exists): ${path.basename(destPath)}`);
    return;
  }

  try {
    const originalSize = fs.statSync(sourcePath).size;

    // Отримуємо розміри оригіналу — якщо він вже менший за HD_MAX_SIZE,
    // залишаємо як є (withoutEnlargement: true)
    const meta = await sharp(sourcePath).metadata();
    const maxDim = Math.max(meta.width || 0, meta.height || 0);

    await sharp(sourcePath)
      .resize(HD_MAX_SIZE, HD_MAX_SIZE, {
        fit: 'inside',
        withoutEnlargement: true   // не збільшуємо маленькі оригінали
      })
      .webp({ quality: HD_QUALITY, effort: 4 })
      .toFile(destPath);

    const newSize = fs.statSync(destPath).size;
    const ratio   = ((1 - newSize / originalSize) * 100).toFixed(0);

    console.log(`✅ HD done: ${path.basename(sourcePath)}`);
    console.log(`   ${formatMb(originalSize)} → ${formatMb(newSize)} (-${ratio}%)  [orig: ${maxDim}px]`);
  } catch (err) {
    console.error(`❌ Error: ${path.basename(sourcePath)} —`, err.message);
  }
}

// ─── Головна функція ─────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source dir not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  ensureDir(DEST_DIR);

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  if (files.length === 0) {
    console.warn('⚠️  No images found in', SOURCE_DIR);
    return;
  }

  console.log(`\n🖼  Processing ${files.length} images for HD lightbox...`);
  console.log(`   Source:  ${SOURCE_DIR}`);
  console.log(`   Output:  ${DEST_DIR}`);
  console.log(`   MaxPx:   ${HD_MAX_SIZE}   Quality: ${HD_QUALITY}\n`);

  let done = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const nameNoExt  = path.parse(file).name;
    const destPath   = path.join(DEST_DIR, `${nameNoExt}.webp`);

    const existedBefore = fs.existsSync(destPath);
    await processHD(sourcePath, destPath);

    if (fs.existsSync(destPath)) {
      existedBefore && SKIP_EXISTING ? skipped++ : done++;
    } else {
      failed++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Done:    ${done}`);
  console.log(`⏭  Skipped: ${skipped}`);
  console.log(`❌ Failed:  ${failed}`);
  console.log(`─────────────────────────────`);
  console.log(`\n💡 HD images ready in: ${DEST_DIR}\n`);
}

main();
