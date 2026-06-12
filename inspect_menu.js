const fs = require('fs');

const html = fs.readFileSync('original_home.html', 'utf8');

// Find the main menu elements
// WordPress usually uses <nav id="top-nav" ...> or <ul class="menuzord-menu" ...> or similar
const navRegex = /<nav[^>]*>([\s\S]*?)<\/nav>/gi;
let match;
let navIndex = 0;
while ((match = navRegex.exec(html)) !== null) {
  const content = match[1];
  console.log(`\nNav Index ${navIndex++}: Length ${content.length}`);
  
  // Find top level li items and sub-menus
  const liRegex = /<li[^>]*class=["']([^"']+)["'][^>]*>([\s\S]*?)<\/li>/gi;
  let liMatch;
  let liCount = 0;
  while ((liMatch = liRegex.exec(content)) !== null && liCount < 20) {
    const liClass = liMatch[1];
    const liContent = liMatch[2];
    const text = liContent.replace(/<[^>]+>/g, '').trim().split('\n')[0].trim();
    if (text) {
      console.log(` - LI [Class: ${liClass}]: text="${text}"`);
      // check if it has a sub-menu
      if (liContent.includes('dropdown') || liContent.includes('sub-menu') || liContent.includes('<ul')) {
        console.log(`   * Has dropdown/submenu!`);
        // Find links inside this submenu
        const subLinkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        let subLinkMatch;
        while ((subLinkMatch = subLinkRegex.exec(liContent)) !== null) {
          console.log(`     -> Sublink text: "${subLinkMatch[2].replace(/<[^>]+>/g, '').trim()}" href: "${subLinkMatch[1]}"`);
        }
      }
    }
    liCount++;
  }
}
