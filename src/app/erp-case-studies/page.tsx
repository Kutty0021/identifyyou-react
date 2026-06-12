import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "ERP Case Studies | Identifyyou",
  description: "Comprehensive ERP Case Studies driving digital transformation and operational excellence.",
};

export default function ERPCaseStudiesPage() {
  const pageData = data.find(p => p.slug === 'erp-case-studies');
  const headings = pageData?.sections?.headings || [];
  const images = pageData?.images || [];

  const caseStudies = headings.map((heading, index) => ({
    title: heading,
    imageUrl: images[index] || "/images/Cloud-Data-Migration.png",
    link: "/erp-case-studies"
  }));

  const pageTitle = pageData?.title || "ERP Case Studies";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 bg-black">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className="group bg-white border border-[#eeeeee] rounded-none overflow-hidden flex flex-col hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-lg font-bold text-secondary mb-6 leading-snug group-hover:text-primary transition-colors flex-grow">
                    {study.title}
                  </h3>
                  
                  <Link
                    href={study.link}
                    className="inline-block bg-primary text-white font-bold px-8 py-3 text-sm tracking-wider uppercase hover:bg-primary-hover transition-colors w-full mt-auto"
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
