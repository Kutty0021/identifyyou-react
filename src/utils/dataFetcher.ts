import data from '@/data/api_pipeline_data.json';

export function getPageDataBySlug(slug: string) {
  // Normalize slug to match with or without leading slash
  const normalized = slug.startsWith('/') ? slug.substring(1) : slug;
  return data.find(p => p.slug === normalized || p.slug === `/${normalized}`);
}

export function extractCardsFromHtml(htmlContent: string) {
  // A simple regex approach to extract cards that have titles and images
  // from the Elementor HTML in api_pipeline_data.json
  const cards = [];
  
  // Extract images
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgRegex.exec(htmlContent)) !== null) {
    images.push(imgMatch[1]);
  }
  
  // Extract titles from h4 class="title" or similar
  const titleRegex = /<h4[^>]*class="[^"]*title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<\/h4>/g;
  let titleMatch;
  const titles = [];
  const links = [];
  while ((titleMatch = titleRegex.exec(htmlContent)) !== null) {
    links.push(titleMatch[1]);
    titles.push(titleMatch[2].trim());
  }

  // Extract excerpts
  const excerptRegex = /<div class="excerpt">\s*([\s\S]*?)\s*<\/div>/g;
  let excerptMatch;
  const excerpts = [];
  while ((excerptMatch = excerptRegex.exec(htmlContent)) !== null) {
    excerpts.push(excerptMatch[1].trim());
  }
  
  // Map them together
  const count = Math.max(titles.length, images.length);
  for (let i = 0; i < count; i++) {
    if (titles[i] || images[i]) {
      cards.push({
        title: titles[i] || 'Details',
        image: images[i] || '/images/placeholder.jpg',
        link: links[i] || '#',
        excerpt: excerpts[i] || ''
      });
    }
  }
  
  return cards;
}
