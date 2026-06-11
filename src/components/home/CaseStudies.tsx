import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    title: "AI Data Cloud - Snowflake",
    category: "Data Engineering",
    imageUrl: "https://identifyyou.in/wp-content/uploads/2026/04/Account-Based-Sales-Marketing.jpg",
    link: "/snowflake-case-studies"
  },
  {
    title: "Edge Computing Integration",
    category: "IoT & Edge",
    imageUrl: "https://identifyyou.in/wp-content/uploads/2026/04/T40-Edge-Computing-Image.jpg",
    link: "/edge-computing"
  },
  {
    title: "Smart Mobility Analytics",
    category: "Smart Systems",
    imageUrl: "https://identifyyou.in/wp-content/uploads/2026/05/ipatt_Scan_system.jpg",
    link: "/smart-mobility"
  }
];

export default function CaseStudies() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
          <p className="text-xl text-gray-600">Discover how we've helped leading enterprises transform their operations and achieve unprecedented growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Link 
              key={index} 
              href={study.link}
              className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image 
                  src={study.imageUrl} 
                  alt={study.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="text-primary font-semibold text-sm mb-2 uppercase tracking-wider">{study.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                <div className="flex items-center text-gray-600 font-medium text-sm group-hover:text-primary transition-colors">
                  Read Full Story
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/case-study"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 md:py-4 md:text-lg transition-colors"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
