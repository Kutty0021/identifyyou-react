const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Container width replacements
    content = content.replace(/max-w-\[1400px\] mx-auto px-4 sm:px-6 lg:px-8/g, 'max-w-[1200px] mx-auto px-5');
    content = content.replace(/max-w-7xl mx-auto px-4 sm:px-6 lg:px-8/g, 'max-w-[1200px] mx-auto px-5');
    
    // Padding replacements (Section Spacing)
    content = content.replace(/py-24/g, 'py-20');
    content = content.replace(/py-32/g, 'py-20');
    content = content.replace(/py-20 lg:py-32/g, 'py-20');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
