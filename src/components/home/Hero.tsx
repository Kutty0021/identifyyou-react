import Link from "next/link";
import Image from "next/image";
import data from "@/data/api_pipeline_data.json";

export default function Hero() {
  const homeData = data.find(p => p.slug === '' || p.slug === '/' || p.slug === 'home' || p.slug === 'home-layout19-dark');
  const heading = "Transforming Enterprises with Next-Gen Data Engineering, Edge Intelligence & Enterprise AI Solutions";
  const paragraph = homeData?.sections?.paragraphs[0] || "Our vision is to empower your organization and you with Data and Technology to drive rapid growth, achieve more, and become sustainable value creators.";
  const bgImage = "/images/service4.jpg";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Background Image exactly like Elementor */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10 py-20 lg:py-20 w-full mt-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold text-white tracking-tight mb-8 leading-[1.6]">
            <span className="bg-black/70 px-5 py-2.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline">
              {heading}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-8 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            {paragraph}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/services"
              className="bg-primary text-white px-8 py-4 rounded font-bold text-sm tracking-wider hover:bg-primary-hover transition-colors w-full sm:w-auto text-center uppercase"
            >
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Bottom Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-20">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#1a1a1a]"
          ></path>
        </svg>
      </div>
    </section>
  );
}
