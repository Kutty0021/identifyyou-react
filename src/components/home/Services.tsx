import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export default function Services() {
  const servicesData = data.find(p => p.slug === 'services');
  const headings = servicesData?.sections?.headings || [];
  const images = servicesData?.images || [];
  
  // Map the 6 services from API data
  const services = headings.map((heading, index) => {
    // Generate an appropriate slug/link based on keywords
    let link = "/services";
    if (heading.toLowerCase().includes("snowflake")) link = "/snowflake-case-studies";
    if (heading.toLowerCase().includes("power bi")) link = "/power-bi-case-studies";
    if (heading.toLowerCase().includes("crm")) link = "/crm-solutions";
    if (heading.toLowerCase().includes("erp") || heading.toLowerCase().includes("business central")) link = "/erp-solutions";
    if (heading.toLowerCase().includes("enterprise") || heading.toLowerCase().includes("powerapps")) link = "/solutions";

    // Try to match an image, fallback to a placeholder pattern if needed
    const iconUrl = images[index] || "/images/Cloud-Data-Migration.png";

    return {
      title: heading,
      description: "Explore our capabilities in " + heading.replace(/–|-/g, "").substring(0, 40) + "...",
      iconUrl,
      link
    };
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{servicesData?.title || "Our Services"}</h2>
          <p className="text-xl text-gray-600">Empowering your digital transformation journey with cutting-edge technology solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center group border border-gray-100"
            >
              <div className="w-full h-40 relative mb-6 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src={service.iconUrl} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
              
              <div className="mt-auto flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
