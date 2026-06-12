import { getPageBySlug, getPageCards, WPSolution } from '@/services/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Power BI Case Studies | Identifyyou",
  description: "Business Intelligence and interactive data dashboard case studies.",
};

export default async function PowerBiCaseStudiesPage() {
  let cards: WPSolution[] = [];
  let pageTitle = "Power BI Case Studies";
  
  try {
    const pageData = await getPageBySlug('power-bi-case-studies');
    if (pageData) {
      pageTitle = pageData.title.rendered || "Power BI Case Studies";
    }
    cards = await getPageCards('power-bi-case-studies');
  } catch (err) {
    console.error("Error loading Power BI case studies:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-black">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const routeUrl = (card.buttonLink || '#').replace('https://identifyyou.in', '');
              return (
                <Link key={card.id || idx} href={routeUrl || '#'} className="group block h-full">
                  <div className="bg-white border border-[#eeeeee] rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary h-full flex flex-col">
                    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                      <Image 
                        src={card.imageUrl} 
                        alt={card.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors leading-snug">{card.title}</h3>
                      <p className="text-gray-500 leading-relaxed mb-6 flex-grow text-[15px]">{card.excerpt || 'Discover details about this implementation.'}</p>
                      <div className="flex items-center text-primary font-bold mt-auto group-hover:text-secondary transition-colors">
                        <span className="uppercase tracking-wider text-sm">{card.buttonText || 'Case Study'}</span>
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
          <div className="text-center text-gray-500 py-10">No entries found for this category.</div>
        )}
      </div>
    </div>
  );
}
