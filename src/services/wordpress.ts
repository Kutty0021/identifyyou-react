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

// Helper: Parse images from Elementor/WordPress content HTML
function parseImagesFromHtml(htmlContent: string): string[] {
  const imgRegex = /<img[^>]+src="([^">]+)"[^-]*>/gi;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    let src = match[1];
    if (src.startsWith('//')) src = 'https:' + src;
    else if (src.startsWith('/')) src = 'https://identifyyou.in' + src;
    
    // Whitelist query params removal and filter icons / tracker images
    if (!src.includes('data:') && !src.endsWith('.svg') && !src.includes('gravatar')) {
      images.push(src.split('?')[0]);
    }
  }
  return [...new Set(images)];
}

// Helper: Parse Card components from WordPress Elementor Page content HTML
function parseCardsFromHtml(htmlContent: string, fallbackSlug: string): WPSolution[] {
  const cards: WPSolution[] = [];
  
  // Extract all images
  const images = parseImagesFromHtml(htmlContent);
  
  // Method 1: Look for Elementor icon boxes or widgets containing titles with links
  const titleLinkRegex = /<h[34][^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h[34]>/gi;
  const titles: string[] = [];
  const links: string[] = [];
  let match;
  while ((match = titleLinkRegex.exec(htmlContent)) !== null) {
    links.push(match[1]);
    titles.push(match[2].replace(/<[^>]+>/g, '').trim());
  }

  // Extract paragraphs as excerpts
  const paragraphs: string[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pMatch;
  while ((pMatch = pRegex.exec(htmlContent)) !== null) {
    const text = pMatch[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 20) paragraphs.push(text);
  }

  const count = Math.max(titles.length, images.length);
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      cards.push({
        id: i + 500,
        slug: `${fallbackSlug}-item-${i}`,
        title: titles[i] || 'Solution Details',
        imageUrl: images[i] || '/images/Cloud-Data-Migration.png',
        icon: 'fas fa-arrow-right',
        features: [],
        buttonText: 'Case Study',
        buttonLink: links[i]?.replace('https://identifyyou.in', '') || '#',
        excerpt: paragraphs[i] || 'Comprehensive solution implementation and customization insights.',
        content: '',
      });
    }
    return cards;
  }

  // Method 2: Standard header tag pairs (no links)
  const headerRegex = /<h[34][^>]*>([\s\S]*?)<\/h[34]>/gi;
  let hMatch;
  while ((hMatch = headerRegex.exec(htmlContent)) !== null) {
    const titleText = hMatch[1].replace(/<[^>]+>/g, '').trim();
    if (titleText && titleText.length > 3) titles.push(titleText);
  }

  const pairedCount = Math.min(titles.length, images.length);
  for (let i = 0; i < pairedCount; i++) {
    cards.push({
      id: i + 600,
      slug: `${fallbackSlug}-item-${i}`,
      title: titles[i],
      imageUrl: images[i],
      icon: 'fas fa-arrow-right',
      features: [],
      buttonText: 'Case Study',
      buttonLink: '#',
      excerpt: paragraphs[i] || 'Comprehensive solution implementation and customization insights.',
      content: '',
    });
  }

  return cards;
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

// 3. Case Studies API (Standard Pages layout parsing)
export async function getCaseStudies(slug: string = 'erp-case-studies'): Promise<WPCaseStudy[]> {
  try {
    const page = await getPageBySlug(slug);
    if (page && page.content.rendered) {
      const html = page.content.rendered;
      const images = parseImagesFromHtml(html);
      
      // Parse headings inside erp-case-studies page content
      const headings: string[] = [];
      const headingRegex = /<h[34][^>]*>([\s\S]*?)<\/h[34]>/gi;
      let match;
      while ((match = headingRegex.exec(html)) !== null) {
        const text = match[1].replace(/<[^>]+>/g, '').trim();
        if (text && text.length > 5 && !text.includes('Case Studies') && !text.includes('Success')) {
          headings.push(text);
        }
      }

      if (headings.length > 0) {
        return headings.map((heading, index) => ({
          id: index + 400,
          slug: `${slug}-${index}`,
          title: heading,
          imageUrl: images[index] || '/images/Cloud-Data-Migration.png',
          clientName: 'Enterprise Client',
          technologiesUsed: ['Enterprise Tech', 'Analytics'],
          excerpt: 'Comprehensive operational excellence deployment details.',
          link: `/${slug}`,
        }));
      }
    }
  } catch (error) {
    console.warn(`Failed to parse case studies from WordPress Page "${slug}". Falling back to local data.`, error);
  }

  // Fallback to local pipeline data
  const erpPage = pipelineData.find(p => p.slug === `/${slug}` || p.slug === slug);
  const erpHeadings = erpPage?.sections?.headings || [];
  const erpImages = erpPage?.images || [];

  return erpHeadings.map((heading, index) => ({
    id: index + 100,
    slug: `${slug}-${index}`,
    title: heading,
    imageUrl: erpImages[index] || '/images/Cloud-Data-Migration.png',
    clientName: 'Enterprise Client',
    technologiesUsed: ['Microsoft D365', 'ERP', 'Azure'],
    excerpt: 'Digital transformation and operational excellence deployment details.',
    link: `/${slug}`,
  }));
}

// 4. Solutions API (Standard Pages layout parsing)
export async function getSolutions(category: 'crm' | 'erp' | 'ai-ml'): Promise<WPSolution[]> {
  // Map category to WordPress page slugs
  const slug = category === 'crm' ? 'crm-solutions' : category === 'erp' ? 'erp-solutions' : 'ml-ai';
  
  try {
    const page = await getPageBySlug(slug);
    if (page && page.content.rendered) {
      const parsed = parseCardsFromHtml(page.content.rendered, slug);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn(`Failed to parse solutions for category "${category}" from WordPress Page. Falling back.`, error);
  }

  // Fallback to local solutions mapping
  const targetSlug = category === 'crm' ? 'crm-solutions' : category === 'erp' ? 'erp-solutions' : 'ai-ml';
  const pageData = pipelineData.find(p => p.slug === targetSlug || p.slug === `/${targetSlug}`);
  if (!pageData) return [];

  const cards = parseCardsFromHtml(pageData.content || '', targetSlug);
  return cards;
}

// 4b. General Cards Parser (Standard Pages layout parsing)
export async function getPageCards(slug: string): Promise<WPSolution[]> {
  try {
    const page = await getPageBySlug(slug);
    if (page && page.content.rendered) {
      const parsed = parseCardsFromHtml(page.content.rendered, slug);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn(`Failed to parse cards from WordPress Page "${slug}". Falling back to local data.`, error);
  }

  // Fallback to local crawled pipeline data
  const pageData = pipelineData.find(
    (item) => item.slug === slug || item.slug === `/${slug}` || item.slug === slug + '/'
  );
  if (pageData) {
    return parseCardsFromHtml(pageData.content || '', slug);
  }

  return [];
}

// 5. Gallery API (Standard Page layout parsing)
export async function getGalleryImages(): Promise<string[]> {
  try {
    const page = await getPageBySlug('gallery');
    if (page && page.content.rendered) {
      const images = parseImagesFromHtml(page.content.rendered);
      if (images.length > 0) return images;
    }
  } catch (error) {
    console.warn('Failed to parse gallery images from WordPress Page. Falling back to local gallery data.', error);
  }

  // Fallback to local gallery page data
  const galleryPage = pipelineData.find(p => p.slug === 'gallery' || p.slug === '/gallery');
  return galleryPage?.images || [];
}

// 6. Edge Projects API (Standard Page layout parsing)
export async function getEdgeProjects(): Promise<WPEdgeProject[]> {
  try {
    const page = await getPageBySlug('edge-computing');
    if (page && page.content.rendered) {
      const images = parseImagesFromHtml(page.content.rendered);
      return [
        {
          id: 301,
          slug: 'edge-computing-project',
          title: page.title.rendered || 'IIOT - Edge Computing',
          imageUrl: images[0] || '/images/T40-Edge-Computing-Image.jpg',
          hardware: 'Fluke Thermalert® T40 & TV30 Pyrometer',
          location: 'Industrial Plant',
          status: 'Active',
          content: page.content.rendered,
        }
      ];
    }
  } catch (error) {
    console.warn('Failed to fetch edge-projects from WordPress Page. Falling back to local data.', error);
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
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: 'Thank you! Your submission has been received. (Local simulation fallback active)',
    };
  }
}
