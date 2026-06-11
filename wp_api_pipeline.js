const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const BASE_URL = 'https://identifyyou.in/wp-json/wp/v2';
const IMAGE_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

async function fetchAllItems(endpoint) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    console.log(`Fetching /${endpoint} - page ${page}`);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}?per_page=100&page=${page}`);
      
      if (!response.ok) {
        if (response.status === 400 && page > 1) break;
        throw new Error(`Failed to fetch ${endpoint} page ${page}: ${response.statusText}`);
      }

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
    if (fs.existsSync(dest)) return resolve(dest);
    
    // Some urls might be http
    const protocol = url.startsWith('https') ? https : require('http');
    const file = fs.createWriteStream(dest);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        file.close();
        fs.unlink(dest, () => reject(new Error(`Failed to download ${url}: ${response.statusCode}`)));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  const aggregatedData = [];
  const imageUrlsToDownload = new Set();
  
  // 1. Fetch Media and create mapping
  console.log("==> Phase 1: Fetching Media Mapping");
  const mediaItems = await fetchAllItems('media');
  const mediaMap = {}; // media_id -> source_url
  mediaItems.forEach(media => {
      if (media.source_url) {
          mediaMap[media.id] = media.source_url;
      }
  });
  console.log(`Mapped ${Object.keys(mediaMap).length} media items.`);

  // 2. Fetch Pages
  console.log("==> Phase 2: Fetching Pages");
  const pages = await fetchAllItems('pages');
  
  for (const page of pages) {
    const id = page.id;
    const title = page.title ? page.title.rendered : '';
    let rawContent = page.content ? page.content.rendered : '';
    const slug = page.slug || '';
    
    const $ = cheerio.load(rawContent || '');
    
    // Extract structured data from content
    const headings = $('h1, h2, h3, h4, h5, h6').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const paragraphs = $('p').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const buttons = $('.btn, .button, .elementor-button, a[role="button"]').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const cards = $('.card, .elementor-icon-box, .elementor-widget-icon-box').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    
    // Specific sections based on CSS class mapping heuristics
    const serviceSections = $('.services, .elementor-widget-services').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const portfolioSections = $('.portfolio, .case-studies, .projects').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    
    // Extract in-content images
    const images = [];
    $('img').each((_, el) => {
      let src = $(el).attr('src');
      if (src && !src.startsWith('data:') && !src.endsWith('.svg')) {
         if (src.startsWith('//')) src = 'https:' + src;
         else if (src.startsWith('/')) src = 'https://identifyyou.in' + src;
         
         imageUrlsToDownload.add(src);
         const filename = src.split('/').pop().split('?')[0];
         images.push(`/images/${filename}`);
      }
    });

    // Handle featured media
    if (page.featured_media && page.featured_media > 0) {
      const sourceUrl = mediaMap[page.featured_media];
      if (sourceUrl) {
          imageUrlsToDownload.add(sourceUrl);
          const filename = sourceUrl.split('/').pop().split('?')[0];
          // Prepend featured media to images list
          images.unshift(`/images/${filename}`);
      }
    }

    aggregatedData.push({
      id,
      slug,
      title,
      content: rawContent,
      images: [...new Set(images)], // unique array
      sections: {
          headings,
          paragraphs,
          buttons,
          cards,
          serviceSections,
          portfolioSections
      }
    });
  }

  // Create Data directory and save JSON
  const dataDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(path.join(dataDir, 'api_pipeline_data.json'), JSON.stringify(aggregatedData, null, 2));
  console.log(`Saved ${aggregatedData.length} records to src/data/api_pipeline_data.json`);

  // 3. Download Images
  console.log("==> Phase 3: Downloading Images");
  const allImagesArray = Array.from(imageUrlsToDownload);
  console.log(`Starting download of ${allImagesArray.length} unique images...`);
  
  let successCount = 0;
  let failCount = 0;
  
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
        failCount++;
      }
    }));
  }
  
  console.log(`Image downloads complete: ${successCount} successful, ${failCount} failed.`);
  console.log('Pipeline execution complete!');
}

run();
