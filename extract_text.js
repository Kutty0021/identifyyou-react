const fs = require('fs');
const cheerio = require('cheerio');
const data = require('./src/data/api_pipeline_data.json');

const pagesToExtract = [
  'aboutus', 'contact-us', 'gallery', 'services', 'solutions', 'case-study', 
  'smart-mobility', 'edge-computing', 'crm-solutions', 'erp-solutions', 
  'snowflake-case-studies', 'power-bi-case-studies', 'power-app-case-studies', 'ai-ml'
];

pagesToExtract.forEach(slug => {
  const page = data.find(p => p.slug === slug || p.slug === `/${slug}`);
  if (!page) {
    console.log(`Page not found: ${slug}`);
    return;
  }
  
  const $ = cheerio.load(page.content || '');
  console.log(`\n--- PAGE: ${slug} ---`);
  
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    headings.push($(el).text().trim());
  });
  
  const paragraphs = [];
  $('p, span.elementor-icon-list-text, .elementor-text-editor').each((_, el) => {
    const text = $(el).text().trim();
    if (text) paragraphs.push(text);
  });
  
  const images = [];
  $('img').each((_, el) => {
    images.push($(el).attr('src'));
  });
  
  console.log(`Headings (${headings.length}):`, headings.slice(0, 5).join(' | '));
  console.log(`Text Blocks (${paragraphs.length}):`, paragraphs.slice(0, 5).join(' | '));
  console.log(`Images (${images.length}):`, images.slice(0, 3).join(' | '));
});
