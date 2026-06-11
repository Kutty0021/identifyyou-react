import Link from 'next/link';
import Image from 'next/image';
import data from "@/data/api_pipeline_data.json";

export const metadata = {
  title: "Gallery | Identifyyou",
  description: "Comprehensive Gallery driving digital transformation and operational excellence.",
};

export default function Page() {
  const galleryData = data.find(p => p.slug === 'gallery');
  
  const heading = galleryData?.sections?.headings[0] || "Gallery";
  const paragraph = galleryData?.sections?.paragraphs[0] || "A visual journey through our projects, team events, and technological innovations.";
  
  // Use images from the API, fallback to placeholders if less than 6
  const apiImages = galleryData?.images || [];
  const defaultImages = [
    "/images/team2.jpg",
    "/images/h3-about1-1.jpg",
    "/images/team3.jpg",
    "/images/team7.jpg",
    "/images/Account-Based-Sales-Marketing.jpg",
    "/images/team2.jpg"
  ];
  
  const displayImages = [...apiImages, ...defaultImages].slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{heading}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team in Action</h2>
            <p className="text-lg text-gray-600">
              Explore our gallery to see the IdentifYou team in action. From intensive collaborative workshops and client deployments to industry conferences and team-building events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayImages.map((src, idx) => (
              <div key={idx} className="relative aspect-[4/3] w-full rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden group bg-gray-50">
                <Image
                  src={src}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Accelerate Your Corporate Experience?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Partner with Identifyyou to leverage cutting-edge technology and domain expertise for your enterprise.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
