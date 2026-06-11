import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export default function Services() {
  const servicesData = data.find(p => p.slug === 'services');
  const headings = servicesData?.sections?.headings || [];
  const images = servicesData?.images || [];
  
  const services = headings.map((heading, index) => {
    let link = "/services";
    if (heading.toLowerCase().includes("snowflake")) link = "/snowflake-case-studies";
    if (heading.toLowerCase().includes("power bi")) link = "/power-bi-case-studies";
    if (heading.toLowerCase().includes("crm")) link = "/crm-solutions";
    if (heading.toLowerCase().includes("erp") || heading.toLowerCase().includes("business central")) link = "/erp-solutions";
    if (heading.toLowerCase().includes("enterprise") || heading.toLowerCase().includes("powerapps")) link = "/solutions";

    const iconUrl = images[index] || "/images/Cloud-Data-Migration.png";

    return {
      title: heading,
      iconUrl,
      link
    };
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[50px] font-extrabold text-[#121212] mb-6 tracking-tight">{servicesData?.title || "Services"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.link}
              className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 p-10 flex flex-col items-center text-center group border border-gray-100"
            >
              <div className="w-full h-48 relative mb-8 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src={service.iconUrl} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="text-[24px] font-bold text-[#121212] mb-6 group-hover:text-primary transition-colors leading-snug">{service.title}</h3>
              
              <div className="mt-auto inline-flex items-center text-primary font-bold text-[14px] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Explore Service
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
