const fs = require('fs');

const content = fs.readFileSync('C:/Users/acer/.gemini/antigravity-ide/brain/2de7bcaa-0beb-4e39-a212-ed32f0415aba/.system_generated/steps/721/content.md', 'utf8');

const imgRegex = /<img[^>]+src=\"([^\"]+)\"[^>]*>/g;
let match;
const images = new Set();

while ((match = imgRegex.exec(content)) !== null) {
  images.add(match[1]);
}

console.log(Array.from(images));
