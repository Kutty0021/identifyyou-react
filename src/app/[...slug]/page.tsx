import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import data from '@/data/api_pipeline_data.json';
import PageHeader from '@/components/layout/PageHeader';

export async function generateStaticParams() {
  return data.map((item) => {
    const slugArray = item.slug.split('/').filter(Boolean);
    return {
      slug: slugArray.length > 0 ? slugArray : ['home'],
    };
  });
}

export default async function ScrapedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentSlug = '/' + slug.join('/');
  
  const pageData = data.find((item) => item.slug === currentSlug || item.slug + '/' === currentSlug);

  if (!pageData) {
    notFound();
  }

  const title = pageData.title || '';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={title} />

      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {pageData.images && pageData.images.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100">
            <Image
              src={pageData.images[0]}
              alt="Feature image"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg text-gray-800 max-w-none prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600" 
          dangerouslySetInnerHTML={{ __html: pageData.content }} 
        />

        {pageData.images && pageData.images.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pageData.images.slice(1).map((imgUrl: string, idx: number) => {
                return (
                  <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group">
                    <Image
                      src={imgUrl}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
