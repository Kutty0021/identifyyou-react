const fs = require('fs');
const path = require('path');

const textPages = [
  { slug: 'smart-mobility', title: 'Smart Mobility', route: 'smart-mobility' },
  { slug: 'edge-computing', title: 'Edge Computing', route: 'edge-computing' },
  { slug: 'aboutus', title: 'About Us', route: 'about-us' },
  { slug: 'contact-us', title: 'Contact Us', route: 'contact-us' },
  { slug: 'gallery', title: 'Gallery', route: 'gallery' }
];

const template = (title, slug) => `import { getPageDataBySlug } from '@/utils/dataFetcher';
import Image from 'next/image';

export const metadata = {
  title: "${title} | Identifyyou",
  description: "Learn more about ${title} and our offerings.",
};

export default function Page() {
  const pageData = getPageDataBySlug('${slug}');

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] pt-[80px] pb-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5 mt-10">
          <h1 className="text-[40px] md:text-[50px] font-extrabold text-white text-center tracking-tight"
              dangerouslySetInnerHTML={{ __html: pageData?.title || "${title}" }} 
          />
        </div>
      </div>
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {pageData && pageData.images && pageData.images.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#333]">
            <Image
              src={pageData.images[0]}
              alt="${title} Feature image"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {pageData?.content ? (
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#9ACD32] prose-strong:text-white prose-ul:text-gray-300 prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: pageData.content }} 
          />
        ) : (
          <div className="text-center text-gray-400 py-10">Content is being updated.</div>
        )}

        {pageData && pageData.images && pageData.images.length > 1 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-10 border-b border-[#333] pb-4">Gallery Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pageData.images.slice(1).map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-[#333] group">
                  <Image
                    src={imgUrl}
                    alt={\`Gallery image \${idx + 1}\`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`;

textPages.forEach(page => {
  const dirPath = path.join(__dirname, 'src', 'app', page.route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(page.title, page.slug));
  console.log("Generated " + page.route + "/page.tsx");
});
