import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPageBySlug } from '@/services/wordpress';
import PageHeader from '@/components/layout/PageHeader';
import pipelineData from '@/data/api_pipeline_data.json';
import scrapedData from '@/data/scraped_data.json';

// Dynamic metadata configuration for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentSlug = '/' + slug.join('/');
  try {
    const page = await getPageBySlug(currentSlug);
    if (page) {
      const cleanExcerpt = page.excerpt?.rendered
        ? page.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
        : `Learn more about ${page.title.rendered} and our IT solutions.`;
      return {
        title: `${page.title.rendered} | Identifyyou`,
        description: cleanExcerpt.substring(0, 160),
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: 'Page | Identifyyou',
    description: 'Empowering enterprises with cutting-edge IT solutions.',
  };
}

// Pre-render pages during build time for optimal speeds
export async function generateStaticParams() {
  const allSlugs = new Set<string>();
  
  pipelineData.forEach((item) => {
    if (item.slug) allSlugs.add(item.slug);
  });
  
  scrapedData.forEach((item) => {
    if (item.slug) allSlugs.add(item.slug);
  });
  
  return Array.from(allSlugs).map((slug) => {
    const slugArray = slug.split('/').filter(Boolean);
    return {
      slug: slugArray.length > 0 ? slugArray : ['home'],
    };
  });
}

export default async function ScrapedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentSlug = '/' + slug.join('/');
  
  // Fetch page data dynamically from WordPress
  const page = await getPageBySlug(currentSlug);

  if (!page) {
    notFound();
  }

  const title = page.title.rendered || '';
  const contentHtml = page.content.rendered || '';
  
  // Extract images for media rendering
  // Try to use ACF gallery images if set up, or fetch images whitelisted
  const images = page.acf?.gallery_images && Array.isArray(page.acf.gallery_images)
    ? page.acf.gallery_images.map((img: unknown) => {
        if (typeof img === 'string') return img;
        if (img && typeof img === 'object' && 'url' in img) return (img as { url: string }).url;
        return '';
      }).filter(Boolean)
    : [];

  // Fallback check: if there are no gallery images but we have crawled pipeline images
  const pipelinePage = pipelineData.find(item => item.slug === currentSlug || item.slug === `/${currentSlug}`);
  const displayImages = images.length > 0 ? images : (pipelinePage?.images || []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={title} />
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-white">
        {displayImages.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100 bg-gray-50">
            <Image
              src={displayImages[0]}
              alt={`${title} Feature`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg text-gray-800 max-w-none prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600" 
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />

        {displayImages.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayImages.slice(1).map((imgUrl: string, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group bg-gray-50">
                  <Image
                    src={imgUrl}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
