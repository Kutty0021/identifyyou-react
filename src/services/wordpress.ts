import pipelineData from '@/data/api_pipeline_data.json';
import scrapedData from '@/data/scraped_data.json';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://identifyyou.in/wp-json';

// TypeScript Interfaces for WordPress REST API Response Objects
export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featured_media?: number;
  acf?: Record<string, unknown>;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media?: number;
  acf?: Record<string, unknown>;
}

export interface WPCaseStudy {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  clientName?: string;
  technologiesUsed?: string[];
  excerpt?: string;
  link: string;
}

export interface WPSolution {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  icon?: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
  excerpt?: string;
  content: string;
}

export interface WPGalleryItem {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
}

export interface WPEdgeProject {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  hardware?: string;
  location?: string;
  status?: string;
  content: string;
}

// Inner Raw Response Interfaces for custom CPT endpoints to bypass @typescript-eslint/no-explicit-any
interface WPRawCaseStudy {
  id: number;
  slug: string;
  title?: { rendered: string };
  featured_media_url?: string;
  excerpt?: { rendered: string };
  acf?: {
    featured_image_url?: string;
    client_name?: string;
    technologies_used?: string;
    excerpt?: string;
  };
}

interface WPRawSolution {
  id: number;
  slug: string;
  title?: { rendered: string };
  featured_media_url?: string;
  excerpt?: { rendered: string };
  content?: { rendered: string };
  acf?: {
    featured_image_url?: string;
    solution_icon?: string;
    features_list?: string;
    button_text?: string;
    button_link?: string;
    excerpt?: string;
  };
}

interface WPRawGalleryItem {
  acf?: {
    gallery_images?: (string | { url: string })[];
  };
  featured_media_url?: string;
}

interface WPRawEdgeProject {
  id: number;
  slug: string;
  title?: { rendered: string };
  featured_media_url?: string;
  content?: { rendered: string };
  acf?: {
    featured_image_url?: string;
    project_hardware?: string;
    project_location?: string;
    project_status?: string;
  };
}

// Generic Fetch Wrapper
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour by default
  });

  if (!res.ok) {
    throw new Error(`WordPress REST API Error [${res.status}]: ${res.statusText} at ${url}`);
  }

  return res.json() as Promise<T>;
}

// 1. Pages API
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
    const pages = await fetchAPI<WPPage[]>(`/wp/v2/pages?slug=${cleanSlug}`);
    if (pages && pages.length > 0) {
      return pages[0];
    }
  } catch (error) {
    console.warn(`Failed to fetch page "${slug}" from WordPress REST API. Falling back to local data.`, error);
  }

  // Fallback to local crawled pipeline data
  const localPage = pipelineData.find(
    (item) => item.slug === slug || item.slug === `/${slug}` || item.slug === slug + '/'
  );
  if (localPage) {
    return {
      id: localPage.id || 0,
      slug: localPage.slug,
      title: { rendered: localPage.title },
      content: { rendered: localPage.content },
      featured_media: 0,
    };
  }

  return null;
}

// 2. Posts (Blogs & News) API
export async function getPosts(params: { perPage?: number; page?: number } = {}): Promise<WPPost[]> {
  const { perPage = 9, page = 1 } = params;
  try {
    const posts = await fetchAPI<WPPost[]>(`/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=true`);
    if (posts && posts.length > 0) {
      return posts;
    }
  } catch (error) {
    console.warn('Failed to fetch posts from WordPress REST API. Falling back to local data.', error);
  }

  // Fallback to local scraped blog data
  // Exclude major standard pages from blog posts
  const mainPages = [
    '/', '/aboutus', '/about-us', '/iiot-vision-ai', '/edge-computing', '/solutions', 
    '/gallery', '/tailored-enterprise-solutions', '/power-bi-case-studies', '/ai-chatbot', 
    '/ml-ai', '/smart-mobility', '/snowflake-case-studies', '/power-app-case-studies', 
    '/crm-case-studies', '/erp-case-studies', '/case-study', '/erp-solutions', 
    '/crm-solutions', '/services', '/contact-us', '/blogs-news', '/privacy-policy', 
    '/terms-of-service', '/privacy-policy-2', '/my-account-2', '/my-account-3', 
    '/faqs', '/team-grid', '/testimonials', '/testimonial-request-form', '/for-clients', 
    '/terms-and-conditions'
  ];

  return scrapedData
    .filter(item => !mainPages.includes(item.slug) && item.paragraphs && item.paragraphs.length > 0)
    .map((post, idx) => ({
      id: idx,
      slug: post.slug.replace(/^\//, ''),
      title: { rendered: post.title.replace(' – identifyyou.in', '').trim() },
      content: { rendered: post.paragraphs.join('\n\n') },
      excerpt: { rendered: post.paragraphs[0] ? post.paragraphs[0].substring(0, 140) + '...' : '' },
      date: 'Recent',
      acf: {
        featured_image_url: post.images && post.images.length > 0 ? post.images[0] : '/images/Cloud-Data-Migration.png',
      }
    }));
}

// 3. Case Studies API
export async function getCaseStudies(): Promise<WPCaseStudy[]> {
  try {
    const rawCaseStudies = await fetchAPI<WPRawCaseStudy[]>('/wp/v2/case-studies');
    if (rawCaseStudies && rawCaseStudies.length > 0) {
      return rawCaseStudies.map((cs) => ({
        id: cs.id,
        slug: cs.slug,
        title: cs.title?.rendered || '',
        imageUrl: cs.acf?.featured_image_url || cs.featured_media_url || '/images/Cloud-Data-Migration.png',
        clientName: cs.acf?.client_name || '',
        technologiesUsed: cs.acf?.technologies_used ? cs.acf.technologies_used.split(',').map((t: string) => t.trim()) : [],
        excerpt: cs.acf?.excerpt || cs.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
        link: `/case-study/${cs.slug}`,
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch case-studies from WordPress REST API. Falling back to local data.', error);
  }

  // Fallback to local erp/crm/snowflake case studies
  // We can construct case studies from the headings of erp-case-studies, crm-case-studies, snowflake-case-studies etc
  const erpPage = pipelineData.find(p => p.slug === '/erp-case-studies' || p.slug === 'erp-case-studies');
  const erpHeadings = erpPage?.sections?.headings || [];
  const erpImages = erpPage?.images || [];

  return erpHeadings.map((heading, index) => ({
    id: index + 100,
    slug: `erp-case-study-${index}`,
    title: heading,
    imageUrl: erpImages[index] || '/images/Cloud-Data-Migration.png',
    clientName: 'Enterprise Client',
    technologiesUsed: ['Microsoft D365', 'ERP', 'Azure'],
    excerpt: 'Digital transformation and operational excellence deployment details.',
    link: '/erp-case-studies',
  }));
}

// 4. Solutions API
export async function getSolutions(category?: 'crm' | 'erp' | 'ai-ml'): Promise<WPSolution[]> {
  try {
    const endpoint = category ? `/wp/v2/solutions?category=${category}` : '/wp/v2/solutions';
    const rawSolutions = await fetchAPI<WPRawSolution[]>(endpoint);
    if (rawSolutions && rawSolutions.length > 0) {
      return rawSolutions.map((sol) => ({
        id: sol.id,
        slug: sol.slug,
        title: sol.title?.rendered || '',
        imageUrl: sol.acf?.featured_image_url || sol.featured_media_url || '/images/Cloud-Data-Migration.png',
        icon: sol.acf?.solution_icon || 'fas fa-cogs',
        features: sol.acf?.features_list ? sol.acf.features_list.split('\n').filter(Boolean) : [],
        buttonText: sol.acf?.button_text || 'View Details',
        buttonLink: sol.acf?.button_link || '#',
        excerpt: sol.acf?.excerpt || sol.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
        content: sol.content?.rendered || '',
      }));
    }
  } catch (error) {
    console.warn(`Failed to fetch solutions for category "${category}" from WordPress. Falling back to local.`, error);
  }

  // Fallback to local solutions mapping
  const targetSlug = category === 'crm' ? 'crm-solutions' : category === 'erp' ? 'erp-solutions' : 'ai-ml';
  const pageData = pipelineData.find(p => p.slug === targetSlug || p.slug === `/${targetSlug}`);
  if (!pageData) return [];

  // Simple parser
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
  const images: string[] = [];
  let imgMatch;
  while ((imgMatch = imgRegex.exec(pageData.content || '')) !== null) {
    images.push(imgMatch[1]);
  }
  
  const titleRegex = /<h4[^>]*class="[^"]*title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<\/h4>/g;
  const titles: string[] = [];
  const links: string[] = [];
  let titleMatch;
  while ((titleMatch = titleRegex.exec(pageData.content || '')) !== null) {
    links.push(titleMatch[1]);
    titles.push(titleMatch[2].trim());
  }

  const excerptRegex = /<div class="excerpt">\s*([\s\S]*?)\s*<\/div>/g;
  const excerpts: string[] = [];
  let excerptMatch;
  while ((excerptMatch = excerptRegex.exec(pageData.content || '')) !== null) {
    excerpts.push(excerptMatch[1].trim());
  }

  const count = Math.max(titles.length, images.length);
  const cards: WPSolution[] = [];
  for (let i = 0; i < count; i++) {
    if (titles[i] || images[i]) {
      cards.push({
        id: i + 200,
        slug: `${targetSlug}-item-${i}`,
        title: titles[i] || 'Solution Details',
        imageUrl: images[i] || '/images/placeholder.jpg',
        icon: 'fas fa-arrow-right',
        features: [],
        buttonText: 'Case Study',
        buttonLink: links[i]?.replace('https://identifyyou.in', '') || '#',
        excerpt: excerpts[i] || 'Comprehensive solution implementation and customization insights.',
        content: '',
      });
    }
  }

  return cards;
}

// 5. Gallery API
export async function getGalleryImages(): Promise<string[]> {
  try {
    const rawGallery = await fetchAPI<WPRawGalleryItem[]>('/wp/v2/gallery');
    if (rawGallery && rawGallery.length > 0) {
      const images: string[] = [];
      rawGallery.forEach((item) => {
        if (item.acf?.gallery_images) {
          const itemImages = item.acf.gallery_images.map((img: string | { url: string }) => typeof img === 'string' ? img : img.url);
          images.push(...itemImages);
        } else if (item.featured_media_url) {
          images.push(item.featured_media_url);
        }
      });
      if (images.length > 0) return images;
    }
  } catch (error) {
    console.warn('Failed to fetch gallery images from WordPress. Falling back to local gallery data.', error);
  }

  // Fallback to local gallery page data
  const galleryPage = pipelineData.find(p => p.slug === 'gallery' || p.slug === '/gallery');
  return galleryPage?.images || [];
}

// 6. Edge Projects API
export async function getEdgeProjects(): Promise<WPEdgeProject[]> {
  try {
    const rawProjects = await fetchAPI<WPRawEdgeProject[]>('/wp/v2/edge-projects');
    if (rawProjects && rawProjects.length > 0) {
      return rawProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || '',
        imageUrl: p.acf?.featured_image_url || p.featured_media_url || '/images/T40-Edge-Computing-Image.jpg',
        hardware: p.acf?.project_hardware || 'Fluke Edge Gateway',
        location: p.acf?.project_location || '',
        status: p.acf?.project_status || 'Active',
        content: p.content?.rendered || '',
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch edge-projects from WordPress. Falling back to local data.', error);
  }

  // Fallback to local edge computing page contents
  const edgePage = pipelineData.find(p => p.slug === 'edge-computing' || p.slug === '/edge-computing');
  if (edgePage) {
    return [
      {
        id: 301,
        slug: 'fluke-thermalert-gateway',
        title: edgePage.title,
        imageUrl: edgePage.images?.[0] || '/images/T40-Edge-Computing-Image.jpg',
        hardware: 'Fluke Thermalert® T40 & TV30 Pyrometer',
        location: 'Industrial Site',
        status: 'Active',
        content: edgePage.content,
      }
    ];
  }

  return [];
}

// 7. Contact Form Submission API
export async function submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const contactFormId = process.env.NEXT_PUBLIC_WP_CONTACT_FORM_ID || 'contact-form';
  
  try {
    // If contactFormId is numeric, send to CF7 REST endpoint
    if (/^\d+$/.test(contactFormId)) {
      const formData = new FormData();
      formData.append('first-name', data.firstName);
      formData.append('last-name', data.lastName);
      formData.append('your-email', data.email);
      formData.append('your-message', data.message);

      const res = await fetch(`${BASE_URL}/contact-form-7/v1/contact-forms/${contactFormId}/feedback`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`WordPress CF7 REST endpoint error: ${res.statusText}`);
      }

      const result = await res.json() as { status: string; message: string };
      if (result.status === 'validation_failed' || result.status === 'mail_failed') {
        return { success: false, message: result.message || 'Validation or sending failed.' };
      }
      return { success: true, message: result.message || 'Thank you! Your message has been sent.' };
    } else {
      // Simulate/Post to a custom form endpoint
      const res = await fetch(`${BASE_URL}/identifyyou/v1/contact-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`WordPress custom endpoint error: ${res.statusText}`);
      }
      const result = await res.json() as { message: string };
      return { success: true, message: result.message || 'Message sent successfully.' };
    }
  } catch (error) {
    console.warn('Contact form API submit failed. Running simulation fallback.', error);
    
    // Simulate successful form submit for user testability/fallback when API is offline/local development
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: 'Thank you! Your submission has been received. (Local simulation fallback active)',
    };
  }
}
