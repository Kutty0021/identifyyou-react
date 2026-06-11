import Image from "next/image";
import Link from "next/link";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "AI Data Cloud",
      description: "Our certified Snowflake and Power BI professionals leverage Cortex AI to deliver intelligent data engineering and visualizations that drive data-driven excellence",
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
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className="group flex flex-col border border-[#333] bg-[#0a0a0a] p-8 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white rounded flex items-center justify-center p-2 shrink-0">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    width={60}
                    height={60}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{study.title}</h3>
              </div>
              
              <p className="text-gray-400 text-base leading-relaxed mb-10 flex-grow">
                {study.description}
              </p>
              
              <Link
                href={study.link}
                className="inline-block bg-primary text-white font-bold px-6 py-3 text-center uppercase tracking-wider text-sm hover:bg-[#86b32b] transition-colors w-full"
              >
                CASE STUDIES
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
