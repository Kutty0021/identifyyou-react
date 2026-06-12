import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import pipelineData from '@/data/api_pipeline_data.json';
import scrapedData from '@/data/scraped_data.json';
import PageHeader from '@/components/layout/PageHeader';

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
  
  // 1. Try finding in pipelineData (rich Elementor HTML)
  const pipelinePage = pipelineData.find(
    (item) => item.slug === currentSlug || item.slug + '/' === currentSlug
  );

  if (pipelinePage) {
    const title = pipelinePage.title || '';
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <PageHeader title={title} />
        <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-white">
          {pipelinePage.images && pipelinePage.images.length > 0 && (
            <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100 bg-gray-50">
              <Image
                src={pipelinePage.images[0]}
                alt="Feature image"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-lg text-gray-800 max-w-none prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600" 
            dangerouslySetInnerHTML={{ __html: pipelinePage.content }} 
          />

          {pipelinePage.images && pipelinePage.images.length > 1 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pipelinePage.images.slice(1).map((imgUrl: string, idx: number) => (
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

  // 2. Try finding in scrapedData (standard blog text content)
  const scrapedPage = scrapedData.find(
    (item) => item.slug === currentSlug || item.slug + '/' === currentSlug
  );

  if (scrapedPage) {
    const title = scrapedPage.title.replace(' – identifyyou.in', '').trim();
    const hasImages = scrapedPage.images && scrapedPage.images.length > 0;
    
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <PageHeader title={title} />
        
        <div className="py-20 max-w-[900px] mx-auto px-5 w-full bg-white">
          {hasImages && (
            <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100 bg-gray-50">
              <Image
                src={scrapedPage.images[0]}
                alt={title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Heading title */}
          <h2 className="text-3xl font-extrabold text-secondary mb-8 leading-snug">
            {scrapedPage.headings[0] || title}
          </h2>

          {/* Render blog post paragraphs */}
          <div className="prose prose-lg text-gray-700 max-w-none leading-relaxed space-y-6">
            {scrapedPage.paragraphs && scrapedPage.paragraphs.map((para, idx) => {
              // Check if paragraph matches any subheading
              const isSubheading = scrapedPage.headings.slice(1).some(h => h.trim() === para.trim());
              if (isSubheading) {
                return (
                  <h3 key={idx} className="text-2xl font-bold text-secondary mt-10 mb-4">
                    {para}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-[17px] text-gray-600">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Inline Gallery for other images */}
          {scrapedPage.images && scrapedPage.images.length > 1 && (
            <div className="mt-16 border-t border-gray-100 pt-10">
              <h3 className="text-xl font-bold text-secondary mb-6">Related Media</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {scrapedPage.images.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-none overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                    <Image
                      src={imgUrl}
                      alt={`Blog image ${idx + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
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

  // 3. Fallback to 404
  notFound();
}
