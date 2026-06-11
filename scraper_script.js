const fs = require('fs');

const routes = [
  'snowflake-case-studies',
  'power-bi-case-studies',
  'tailored-enterprise-solutions',
  'crm-case-studies',
  'erp-case-studies',
  'smart-mobility',
  'solutions',
  'crm-solutions',
  'erp-solutions',
  'edge-computing',
  'gallery'
];

async function scrape() {
  const data = {};
  for (const r of routes) {
    try {
      const res = await fetch('https://identifyyou.in/' + r);
      const text = await res.text();
      
      const h1s = [...text.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean);
      const h2s = [...text.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean);
      const ps = [...text.matchAll(/<p[^>]*>(.*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean);
      const imgs = [...text.matchAll(/<img[^>]*src=[\"']([^\"']+)[\"'][^>]*>/gi)].map(m => m[1]);

      // filter out common footer/header text
      const filteredPs = ps.filter(p => !p.includes('Copyright') && !p.includes('All rights reserved') && p.length > 20);
      
      data[r] = {
        h1s: h1s.slice(0, 2),
        h2s: h2s.slice(0, 5),
        ps: filteredPs.slice(0, 5), // get first 5 substantial paragraphs
        imgs: imgs.slice(0, 3)
      };
    } catch(e) {
      console.error(e);
    }
  }
  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
}

scrape();
