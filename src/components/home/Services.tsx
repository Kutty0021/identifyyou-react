import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export default function Services() {
  const servicesData = data.find(p => p.slug === 'services');
  const headings = servicesData?.sections?.headings || [];
  
  const getHeading = (keyword: string, fallback: string) => {
    return headings.find(h => h.toLowerCase().includes(keyword.toLowerCase())) || fallback;
  };

  const services = [
    {
      title: getHeading("Snowflake", "AI Data Cloud - Snowflake"),
      description: "Accelerate your data initiatives with Snowflake's AI Data Cloud.",
      iconUrl: "/images/snow.png",
      link: "/snowflake-case-studies"
    },
    {
      title: getHeading("Power BI", "Data Analytics - MS Power BI"),
      description: "Transform raw data into actionable insights.",
      iconUrl: "/images/powerapps-icon.png",
      link: "/power-bi-case-studies"
    },
    {
      title: getHeading("Enterprise", "Tailored Enterprise Solutions"),
      description: "Custom solutions for complex business challenges.",
      iconUrl: "/images/Cloud-Data-Migration.png",
      link: "/tailored-enterprise-solutions"
    },
    {
      title: getHeading("Edge", "Edge Computing"),
      description: "Bring compute power closer to data sources.",
      iconUrl: "/images/T40-Edge-Computing-Image.jpg",
      link: "/edge-computing"
    },
    {
      title: getHeading("CRM", "CRM Solutions"),
      description: "Build stronger relationships with integrated CRM.",
      iconUrl: "/images/CR.png",
      link: "/crm-solutions"
    },
    {
      title: getHeading("ERP", "ERP - MS D365"),
      description: "Streamline operations with Business Central.",
      iconUrl: "/images/pinpng.com-microsoft-dynamics-logo-png-3444175-1.png",
      link: "/erp-solutions"
    },
    {
      title: "Smart Mobility",
      description: "Advanced IoT and connected systems.",
      iconUrl: "/images/ipatt_Scan_system.jpg",
      link: "/smart-mobility"
    },
    {
      title: getHeading("PowerApps", "DevOps & Cloud"),
      description: "Continuous integration and deployment pipelines.",
      iconUrl: "/images/DevOps-Infinity-Symbol-Design.png",
      link: "/services"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Empowering your digital transformation journey with cutting-edge technology solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center group border border-gray-100"
            >
              <div className="w-24 h-24 relative mb-6 rounded-lg overflow-hidden flex items-center justify-center p-2 bg-gray-50 group-hover:scale-110 transition-transform duration-500">
                <Image 
                  src={service.iconUrl} 
                  alt={service.title} 
                  fill
                  sizes="96px"
                  className="object-contain p-2"
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
