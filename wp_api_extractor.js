const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const BASE_URL = 'https://identifyyou.in/wp-json/wp/v2';
const ENDPOINTS = ['pages', 'posts', 'services', 'projects'];
const IMAGE_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

async function fetchAllPages(endpoint) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    console.log(`Fetching /${endpoint} - page ${page}`);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}?per_page=100&page=${page}`);
      
      if (!response.ok) {
        if (response.status === 400 && page > 1) {
          // Reached end of pagination
          break;
        }
        // Custom post types might return 404 if not exposed via REST API
        if (response.status === 404) {
           console.log(`Endpoint /${endpoint} not found (might not be exposed to REST API). Skipping.`);
           break;
        }
        throw new Error(`Failed to fetch ${endpoint} page ${page}: ${response.statusText}`);
      }

      // Check total pages header
      const totalPagesHeader = response.headers.get('x-wp-totalpages');
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10);
      }

      const data = await response.json();
      allItems = allItems.concat(data);
      page++;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err.message);
      break;
    }
  }
  return allItems;
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      return resolve(dest); // Skip if already downloaded
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  const aggregatedData = [];
  const imageUrls = new Set();

  for (const endpoint of ENDPOINTS) {
    const items = await fetchAllPages(endpoint);
    console.log(`Fetched ${items.length} items from /${endpoint}`);

    for (const item of items) {
      const title = item.title ? item.title.rendered : '';
      let rawContent = item.content ? item.content.rendered : '';
      const slug = item.slug || '';
      let link = item.link || '';
      
      // Calculate local path slug
      let localSlug = link.replace('https://identifyyou.in', '').replace(/\/$/, '');
      if (localSlug === '') localSlug = '/';
      
      const $ = cheerio.load(rawContent || '');
      
      // Extract structure
      const headings = $('h1, h2, h3, h4, h5, h6').map((_, el) => $(el).text().trim()).get().filter(Boolean);
      const paragraphs = $('p').map((_, el) => $(el).text().trim()).get().filter(Boolean);
      
      // Images
      const images = [];
      $('img').each((_, el) => {
        let src = $(el).attr('src');
        if (src && !src.startsWith('data:') && !src.endsWith('.svg')) {
           // Standardize URL
           if (src.startsWith('//')) src = 'https:' + src;
           else if (src.startsWith('/')) src = 'https://identifyyou.in' + src;
           
           imageUrls.add(src);
           const filename = src.split('/').pop().split('?')[0];
           images.push(`/images/${filename}`);
        }
      });
      
      // Extract specific card components based on class names
      const serviceCards = $('.service-card, .elementor-widget-icon-box').map((_, el) => $(el).text().trim()).get().filter(Boolean);
      const caseStudyCards = $('.case-study-card, .portfolio-item').map((_, el) => $(el).text().trim()).get().filter(Boolean);
      const blogCards = $('.blog-card, .post-item').map((_, el) => $(el).text().trim()).get().filter(Boolean);

      aggregatedData.push({
        slug: localSlug,
        title: title,
        content: paragraphs.join('\n\n'),
        headings,
        paragraphs,
        images,
        cards: {
            services: serviceCards,
            caseStudies: caseStudyCards,
            blogs: blogCards
        }
      });
    }
  }

  // Create Data directory
  const dataDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Save JSON
  fs.writeFileSync(path.join(dataDir, 'api_data.json'), JSON.stringify(aggregatedData, null, 2));
  console.log(`Saved ${aggregatedData.length} records to src/data/api_data.json`);

  // Download all images
  const allImagesArray = Array.from(imageUrls);
  console.log(`Starting download of ${allImagesArray.length} unique images...`);
  
  let successCount = 0;
  let failCount = 0;
  
  // Batch processing
  const batchSize = 10;
  for (let i = 0; i < allImagesArray.length; i += batchSize) {
    const batch = allImagesArray.slice(i, i + batchSize);
    await Promise.all(batch.map(async (url) => {
      const filename = url.split('/').pop().split('?')[0];
      const dest = path.join(IMAGE_DIR, filename);
      try {
        await downloadImage(url, dest);
        successCount++;
      } catch (e) {
        console.error(e.message);
        failCount++;
      }
    }));
  }
  
  console.log(`Image downloads complete: ${successCount} successful, ${failCount} failed.`);
  console.log('WordPress REST API Extraction finished successfully.');
}

run();
