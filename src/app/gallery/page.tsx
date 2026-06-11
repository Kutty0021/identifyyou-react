import Link from 'next/link';
import Image from 'next/image';
import data from "@/data/api_pipeline_data.json";

export const metadata = {
  title: "Gallery | Identifyyou",
  description: "Comprehensive Gallery driving digital transformation and operational excellence.",
};

export default function GalleryPage() {
  const galleryData = data.find(p => p.slug === 'gallery');
  const title = galleryData?.title || "Gallery";
  
  // Use all images from the API
  const apiImages = galleryData?.images || [];
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-20 border-b border-[#333]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiImages.map((src, idx) => (
              <div key={idx} className="relative aspect-[4/3] w-full rounded-lg shadow-sm hover:shadow-xl transition-shadow overflow-hidden group bg-[#0a0a0a] border border-[#333]">
                <Image
                  src={src}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#121212] border-t border-[#333]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Corporate Experience?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Partner with Identifyyou to leverage cutting-edge technology and domain expertise for your enterprise.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase tracking-wider text-sm hover:bg-[#86b32b] transition-colors shadow-lg hover:shadow-xl"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
