const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const images = [
  'https://identifyyou.in/wp-content/uploads/2025/01/id_logo-dark.png',
  'https://identifyyou.in/wp-content/uploads/2025/02/snow.png',
  'https://identifyyou.in/wp-content/uploads/2025/04/Cloud-Data-Migration.png',
  'https://identifyyou.in/wp-content/uploads/2025/02/powerapps-icon.png',
  'https://identifyyou.in/wp-content/uploads/2026/04/Account-Based-Sales-Marketing.jpg',
  'https://identifyyou.in/wp-content/uploads/2026/05/ipatt_Scan_system.jpg',
  'https://identifyyou.in/wp-content/uploads/elementor/thumbs/ML_AI-r1qm3banb548yu9eimxak9jp5emw0pfemw1q6f4aj4.png',
  'https://identifyyou.in/wp-content/uploads/2026/04/T40-Edge-Computing-Image.jpg',
  'https://identifyyou.in/wp-content/uploads/2025/02/CR.png',
  'https://identifyyou.in/wp-content/uploads/2025/02/pinpng.com-microsoft-dynamics-logo-png-3444175-1.png',
  'https://identifyyou.in/wp-content/uploads/2023/04/Automerger_centered_550x550.png',
  'https://identifyyou.in/wp-content/uploads/2023/04/DevOps-Infinity-Symbol-Design.png',
  'https://identifyyou.in/wp-content/uploads/2023/10/multivendor_rfq_logo.png',
  'https://identifyyou.in/wp-content/uploads/2025/02/mslogo.webp',
  'https://identifyyou.in/wp-content/uploads/2025/02/headerLogoLight-1.webp',
  'https://identifyyou.in/wp-content/uploads/2025/02/monday-logo-x2.webp',
  'https://identifyyou.in/wp-content/uploads/2025/02/Zendesk-Logo.webp',
  'https://identifyyou.in/wp-content/uploads/2022/10/h3-about1-1.jpg',
  'https://identifyyou.in/wp-content/uploads/2022/11/team7.jpg',
  'https://identifyyou.in/wp-content/uploads/2022/10/team2.jpg',
  'https://identifyyou.in/wp-content/uploads/2022/10/team3.jpg',
  'https://identifyyou.in/wp-content/uploads/2025/11/snow.png',
  'https://identifyyou.in/wp-content/uploads/2025/11/Untitled-design-8-672x448.png',
  'https://identifyyou.in/wp-content/uploads/2025/10/Untitled-design-4-672x448.png',
  'https://identifyyou.in/wp-content/uploads/2025/01/id_logo-1.png'
];

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // delete the file async if there's an error
      reject(err);
    });
  });
};

const outputDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log(`Downloading ${images.length} images...`);
  for (const url of images) {
    const filename = path.basename(url);
    const dest = path.join(outputDir, filename);
    try {
      await downloadImage(url, dest);
      console.log(`Downloaded: ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${url}: ${err.message}`);
    }
  }
  console.log('All downloads finished!');
}

run();
