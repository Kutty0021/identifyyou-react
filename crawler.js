const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractContent(html) {
    const $ = cheerio.load(html);
    
    // Remove unwanted elements like scripts, styles, navs, footers
    $('script, style, nav, footer, header').remove();
    
    const title = $('title').text().trim() || $('h1').first().text().trim();
    
    const headings = [];
    $('h1, h2, h3').each((i, el) => headings.push($(el).text().trim()));
    
    const paragraphs = [];
    $('p').each((i, el) => paragraphs.push($(el).text().trim()));
    
    const images = [];
    $('img').each((i, el) => {
        let src = $(el).attr('src');
        if (src && !src.startsWith('data:') && !src.endsWith('.svg')) {
            if (src.startsWith('/')) {
                src = 'https://identifyyou.in' + src;
            }
            images.push(src);
        }
    });

    return {
        title,
        headings: [...new Set(headings)].filter(h => h),
        paragraphs: [...new Set(paragraphs)].filter(p => p),
        images: [...new Set(images)].filter(img => img)
    };
}

async function run() {
  const urlsFile = path.join(__dirname, 'sitemap_urls.json');
  if (!fs.existsSync(urlsFile)) {
    console.error('sitemap_urls.json not found');
    return;
  }
  
  const urls = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
  const scrapedData = [];
  
  console.log(`Starting crawl of ${urls.length} URLs...`);
  
  // We'll process them in batches to not overwhelm the server
  const batchSize = 10;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (url) => {
      try {
          const html = await fetchUrl(url);
          const data = extractContent(html);
          
          let slug = url.replace('https://identifyyou.in', '').replace(/\/$/, '');
          if (slug === '') slug = '/';
          
          scrapedData.push({
              url,
              slug,
              ...data
          });
          console.log(`Scraped: ${url}`);
      } catch (err) {
          console.error(`Failed to scrape ${url}:`, err.message);
      }
    }));
  }
  
  fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2));
  console.log('Finished scraping! Data saved to scraped_data.json');
}

run();
