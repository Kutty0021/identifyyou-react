const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function run() {
  const urlsFile = path.join(__dirname, 'sitemap_urls.json');
  if (!fs.existsSync(urlsFile)) {
    console.error('sitemap_urls.json not found');
    return;
  }
  
  const urls = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
  const scrapedData = [];
  
  console.log(`Starting Puppeteer crawl of ${urls.length} URLs...`);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set a realistic viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`[${i+1}/${urls.length}] Scraping: ${url}`);
      // Wait until network is idle to ensure JS rendering is complete
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const data = await page.evaluate(() => {
        const title = document.title || document.querySelector('h1')?.innerText || '';
        const content = document.body.innerText || '';
        
        const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && !src.startsWith('data:') && !src.endsWith('.svg'));
        
        // Function to extract text from an element, cleaning up whitespace
        const getText = (selector) => {
            const el = document.querySelector(selector);
            return el ? el.innerText.trim() : '';
        };

        const getListText = (selector) => {
            return Array.from(document.querySelectorAll(selector)).map(el => el.innerText.trim()).filter(Boolean);
        };
        
        // Heuristics for different sections based on typical WordPress/Identifyyou classes
        const heroText = getText('section.elementor-section:first-of-type, .hero-section, header.page-header');
        
        const serviceCards = getListText('.service-card, .elementor-widget-icon-box, .services-item');
        const caseStudyCards = getListText('.case-study-card, .portfolio-item, .project-item');
        const blogCards = getListText('.blog-card, .post-item, article');
        const testimonials = getListText('.testimonial, .elementor-testimonial-wrapper');
        const galleryImages = Array.from(document.querySelectorAll('.gallery img, .elementor-image-gallery img')).map(img => img.src);
        
        return {
          title,
          content,
          images: [...new Set(images)],
          sections: {
            hero: heroText,
            services: serviceCards,
            caseStudies: caseStudyCards,
            blogs: blogCards,
            testimonials: testimonials,
            gallery: [...new Set(galleryImages)]
          }
        };
      });
      
      let slug = url.replace('https://identifyyou.in', '').replace(/\/$/, '');
      if (slug === '') slug = '/';
      
      scrapedData.push({
          url,
          slug,
          ...data
      });
    } catch (err) {
      console.error(`Failed to scrape ${url}:`, err.message);
    }
  }
  
  await browser.close();
  
  fs.writeFileSync('advanced_scraped_data.json', JSON.stringify(scrapedData, null, 2));
  console.log('Finished Puppeteer scraping! Data saved to advanced_scraped_data.json');
}

run();
