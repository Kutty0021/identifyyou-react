import { getPageDataBySlug } from '@/utils/dataFetcher';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Gallery | Identifyyou",
  description: "View our photo gallery and structural highlights.",
};

export default function Page() {
  const pageData = getPageDataBySlug('gallery');
  const pageTitle = pageData?.title || "Gallery";
  const images = pageData?.images || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-white">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group bg-gray-50">
                <Image
                  src={imgUrl}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">No gallery images found.</div>
        )}
      </div>
    </div>
  );
}
