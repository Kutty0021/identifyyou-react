import { notFound } from 'next/navigation';
import Image from 'next/image';
import data from '@/data/api_pipeline_data.json';

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

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8" dangerouslySetInnerHTML={{ __html: pageData.title }} />
      
      {pageData.images && pageData.images.length > 0 && (
        <div className="mb-10 w-full relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100">
          <Image
            src={pageData.images[0]}
            alt="Feature image"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      <div 
        className="prose prose-lg text-gray-700 max-w-none" 
        dangerouslySetInnerHTML={{ __html: pageData.content }} 
      />

      {pageData.images && pageData.images.length > 1 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pageData.images.slice(1).map((imgUrl: string, idx: number) => {
              return (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={imgUrl}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
