import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export const metadata = {
  title: "AI & ML | Identifyyou",
  description: "Comprehensive AI & ML solutions driving digital transformation and operational excellence.",
};

export default function AIMLPage() {
  const pageData = data.find(p => p.slug === 'ml-ai');
  const headings = pageData?.sections?.headings || [];
  const images = pageData?.images || [];

  const caseStudies = headings.map((heading, index) => ({
    title: heading,
    imageUrl: images[index] || "/images/Cloud-Data-Migration.png",
    link: "/ai-ml"
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-20 border-b border-[#333]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">{pageData?.title || "AI & ML Solutions"}</h1>
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className="group bg-[#0a0a0a] border border-[#333] hover:border-gray-500 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-xl font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors flex-grow">
                    {study.title}
                  </h3>
                  
                  <Link
                    href={study.link}
                    className="inline-block bg-primary text-white font-bold px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#86b32b] transition-colors w-full"
                  >
                    CASE STUDIES
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
