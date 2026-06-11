import Link from "next/link";
import Image from "next/image";
import data from "@/data/api_pipeline_data.json";

export default function Hero() {
  const homeData = data.find(p => p.slug === '' || p.slug === '/' || p.slug === 'home');
  const heading = homeData?.sections?.headings[0] || "Your Trusted Partner Transforming Enterprises";
  const paragraph = homeData?.sections?.paragraphs[0] || "Our vision is to empower your organization...";
  const bgImage = homeData?.images && homeData.images.length > 0 ? homeData.images[0] : "/images/ML_AI-r1qm3banb548yu9eimxak9jp5emw0pfemw1q6f4aj4.png";

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image exactly like Elementor */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: heading.replace('Next-Gen Data Engineering', '<span class="text-blue-400">Next-Gen Data Engineering</span>') }} />
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow">
            {paragraph}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-4 rounded font-semibold text-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center border border-blue-600"
            >
              Explore Services
            </Link>
            <Link
              href="/contact-us"
              className="bg-transparent text-white border border-white px-8 py-4 rounded font-semibold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
