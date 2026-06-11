const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  const dataFile = path.join(__dirname, 'scraped_data.json');
  if (!fs.existsSync(dataFile)) {
    console.error('scraped_data.json not found');
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const allImages = new Set();
  data.forEach(page => {
    page.images.forEach(img => allImages.add(img));
  });
  
  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const imagesList = Array.from(allImages);
  console.log(`Found ${imagesList.length} unique images. Downloading...`);
  
  let downloadedCount = 0;
  for (const imgUrl of imagesList) {
    try {
      const filename = path.basename(new URL(imgUrl).pathname);
      const filepath = path.join(imagesDir, filename);
      if (!fs.existsSync(filepath)) {
        await downloadImage(imgUrl, filepath);
        console.log(`Downloaded: ${filename}`);
      } else {
        console.log(`Skipped (already exists): ${filename}`);
      }
      downloadedCount++;
    } catch (e) {
      console.error(`Error downloading ${imgUrl}:`, e.message);
    }
  }
  
  console.log(`Finished downloading ${downloadedCount} images.`);
}

run();
