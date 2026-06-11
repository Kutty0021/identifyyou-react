import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import data from "@/data/api_pipeline_data.json";

export default function Home() {
  const homeData = data.find(p => p.slug === '' || p.slug === '/' || p.slug === 'home');
  
  // Find specific text from the API payload that matches the previous hardcoded text's semantic meaning
  // We can search the paragraphs for matching content to keep it robust against ordering changes
  const abmHeading = homeData?.sections?.headings.find(h => h.includes("Precision ABM")) || "Precision ABM Powered by Snowflake Cortex AI";
  const abmParagraph = homeData?.sections?.paragraphs.find(p => p.includes("High-level visibility")) || "High-level visibility meets operational agility. Our latest implementation within the Snowflake AI Data Cloud empowers Sales Leaders with trend analysis and equips AEs with AI-driven deal health scores—all in a single pane of glass.";
  const featuredImage = homeData?.images.find(img => img.includes("Edge-Computing") || img.includes("T40")) || "/images/T40-Edge-Computing-Image.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <PartnersCarousel />

      {/* Feature Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden border-4 border-white">
                <Image
                  src={featuredImage}
                  alt={abmHeading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Featured Solution
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: abmHeading.replace('Snowflake Cortex AI', '<span class="text-blue-600">Snowflake Cortex AI</span>') }} />
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {abmParagraph}
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start bg-gray-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <span className="block text-gray-900 font-bold mb-1">Zero Data Egress</span>
                    <span className="text-gray-600 text-sm">Keep your sensitive enterprise data within your Snowflake perimeter.</span>
                  </div>
                </li>
                <li className="flex items-start bg-gray-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                  <div>
                    <span className="block text-gray-900 font-bold mb-1">Single Source of Truth</span>
                    <span className="text-gray-600 text-sm">Leverage your existing Snowflake tables with no syncing required.</span>
                  </div>
                </li>
              </ul>
              <Link
                href="/services"
                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors"
              >
                Explore More Solutions
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <CaseStudies />
    </div>
  );
}
