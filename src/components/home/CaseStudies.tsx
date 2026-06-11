import Image from "next/image";
import Link from "next/link";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "AI Data Cloud",
      description: "Our certified Snowflake and Power BI professionals leverage Cortex AI to deliver intelligent data engineering and visualizations that drive data-driven excellence.",
      imageUrl: "/images/snow.png",
      link: "/snowflake-case-studies"
    },
    {
      title: "IIOT & Vision AI",
      description: "Leveraging IIoT and edge computing, we deliver computer/machine vision and image intelligence solutions that transform data assets into intelligent business decisions.",
      imageUrl: "/images/T40-Edge-Computing-Image.jpg",
      link: "/smart-mobility"
    },
    {
      title: "Digital Engineering",
      description: "Our Python, NodeJS, and ReactJS experts deliver tailored digital engineering and enterprise solutions that drive operational efficiency and business growth.",
      imageUrl: "/images/Software-Product-Engineering.jpg",
      link: "/solutions"
    }
  ];

  return (
    <section className="py-24 bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[50px] font-extrabold text-white mb-6 tracking-tight">Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className="group flex flex-col bg-[#121212] overflow-hidden border border-[#333] hover:border-primary transition-colors duration-300 shadow-lg"
            >
              {/* Image Section */}
              <div className="relative h-[250px] w-full overflow-hidden bg-white flex items-center justify-center p-4">
                <Image 
                  src={study.imageUrl} 
                  alt={study.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content Section */}
              <div className="flex flex-col flex-grow p-8">
                <h3 className="text-[26px] font-bold text-white leading-snug mb-4">{study.title}</h3>
                
                <p className="text-gray-400 text-[16px] leading-relaxed mb-8 flex-grow">
                  {study.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-[#333]">
                  <Link
                    href={study.link}
                    className="inline-block text-primary font-bold text-[14px] uppercase tracking-[1px] hover:text-white transition-colors flex items-center group/link"
                  >
                    CASE STUDIES
                    <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
