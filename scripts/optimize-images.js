import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_SIZE = 1920;

const directoriesToProcess = [
  { source: './image_artwork', dest: './src/assets/images/artwork' },
  { source: './image_exhibition', dest: './src/assets/images/exhibition' }
];

const singleFilesToProcess = [
  { source: './poster1.jpg', dest: './src/assets/images/posters/poster1.webp' },
  { source: './poster2.jpg', dest: './src/assets/images/posters/poster2.webp' },
  { source: './curator.jpg', dest: './src/assets/images/curator.webp' }
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processImage(sourcePath, destPath) {
  try {
    const originalSize = fs.statSync(sourcePath).size;
    await sharp(sourcePath)
      .resize(MAX_SIZE, MAX_SIZE, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(destPath);
    const newSize = fs.statSync(destPath).size;
    console.log(`✅ Processed: ${path.basename(sourcePath)}`);
    console.log(`   Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error(`❌ Error processing ${sourcePath}:`, error.message);
  }
}

async function main() {
  console.log('Starting image optimization...');
  
  // Process directories
  for (const dir of directoriesToProcess) {
    if (!fs.existsSync(dir.source)) continue;
    
    await ensureDir(dir.dest);
    const files = fs.readdirSync(dir.source);
    
    for (const file of files) {
      if (file.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
        const sourcePath = path.join(dir.source, file);
        const nameWithoutExt = path.parse(file).name;
        // Clean name (optional but we will just keep the name to parse for captions later)
        const destPath = path.join(dir.dest, `${nameWithoutExt}.webp`);
        await processImage(sourcePath, destPath);
      }
    }
  }

  // Process single files (Posters)
  for (const file of singleFilesToProcess) {
    if (fs.existsSync(file.source)) {
      await ensureDir(path.dirname(file.dest));
      // For curator.jpg we just process normally to the original dest
      if (file.source.includes('curator')) {
        await processImage(file.source, file.dest);
      } else {
        // For posters we generate 1x (1920) and 2x (3840) versions
        try {
          const originalSize = fs.statSync(file.source).size;
          const dest1x = file.dest.replace('.webp', '-1x.webp');
          const dest2x = file.dest.replace('.webp', '-2x.webp');

          await sharp(file.source).resize(1920, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest1x);
          await sharp(file.source).resize(3840, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest2x);

          console.log(`✅ Processed 1x & 2x: ${path.basename(file.source)}`);
        } catch (error) {
          console.error(`❌ Error processing ${file.source}:`, error.message);
        }
      }
    }
  }

  console.log('Image optimization complete!');
}

main();
