const fs = require('fs');
const path = require('path');

const gridPages = [
  { slug: 'case-study', title: 'Case Studies', desc: 'Discover how we deliver transformative IT solutions across various industries and technological domains.' },
  { slug: 'crm-solutions', title: 'CRM Solutions', desc: 'Comprehensive CRM Implementation, Integration, and Customization to drive customer success.' },
  { slug: 'erp-solutions', title: 'ERP Solutions', desc: 'Modernize your core business processes with our specialized ERP integrations and dashboards.' },
  { slug: 'snowflake-case-studies', title: 'Snowflake Case Studies', desc: 'Unleash the Power of Snowflake & AI Data Cloud.' },
  { slug: 'power-bi-case-studies', title: 'Power BI Case Studies', desc: 'Transform Your Data into Actionable Insights with MS Power BI.' },
  { slug: 'power-app-case-studies', title: 'Power Apps Case Studies', desc: 'Accelerate Innovation with Microsoft PowerApps.' },
  { slug: 'ai-ml', title: 'AI & ML Solutions', desc: 'Leveraging AI and Machine Learning to drive next-generation innovation.' }
];

const template = (title, desc, slug) => `import { getPageDataBySlug, extractCardsFromHtml } from '@/utils/dataFetcher';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "${title} | Identifyyou",
  description: "${desc}",
};

export default function ${slug.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())}Page() {
  const pageData = getPageDataBySlug('${slug}');
  const cards = pageData ? extractCardsFromHtml(pageData.content || '') : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] pt-[80px] pb-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5 mt-10">
          <h1 className="text-[40px] md:text-[50px] font-extrabold text-white text-center mb-4 tracking-tight">${title}</h1>
          <p className="text-[18px] md:text-[20px] text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            ${desc}
          </p>
        </div>
      </div>
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const routeUrl = card.link.replace('https://identifyyou.in', '');
              return (
                <Link key={idx} href={routeUrl || '#'} className="group block h-full">
                  <div className="bg-[#121212] border border-[#333] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:border-[#9ACD32] group-hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-56 w-full bg-[#1a1a1a] overflow-hidden">
                      <Image 
                        src={card.image} 
                        alt={card.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#9ACD32] transition-colors">{card.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{card.excerpt || 'Discover details about this case study and implementation.'}</p>
                      <div className="flex items-center text-[#9ACD32] font-semibold mt-auto">
                        <span className="uppercase tracking-wider text-sm">View Details</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">No entries found for this category.</div>
        )}
      </div>
    </div>
  );
}
`;

gridPages.forEach(page => {
  const dirPath = path.join(__dirname, 'src', 'app', page.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(page.title, page.desc, page.slug));
  console.log("Generated " + page.slug + "/page.tsx");
});
