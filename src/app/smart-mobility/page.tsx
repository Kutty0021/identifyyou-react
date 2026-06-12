import { getPageBySlug } from '@/services/wordpress';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Smart Mobility | Identifyyou",
  description: "Discover our next-generation Smart Mobility and IIoT applications.",
};

export default async function Page() {
  const pageData = await getPageBySlug('smart-mobility');
  const pageTitle = pageData?.title.rendered || "Smart Mobility";

  // Parse images dynamically
  const content = pageData?.content.rendered || "";
  const imgRegex = /<img[^>]+src="([^">]+)"/gi;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {images.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100">
            <Image
              src={images[0]}
              alt="Smart Mobility Feature image"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {content ? (
          <div 
            className="prose prose-lg max-w-none text-gray-800 prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        ) : (
          <div className="text-center text-gray-500 py-10">Content is being updated.</div>
        )}

        {images.length > 1 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-secondary mb-10 border-b border-gray-100 pb-4">Gallery Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.slice(1).map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group">
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
