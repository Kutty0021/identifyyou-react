import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export default function BlogList() {
  // Filter for blogs/news
  const posts = data
    .filter(item => item.slug.startsWith("/category/") || item.slug.includes("blog") || item.slug.includes("news"))
    .slice(0, 6)
    .map((post, idx) => {
      const category = post.slug.split('/')[2] || "News";
      const imageFile = post.images && post.images.length > 0 
        ? post.images[0] 
        : "/images/placeholder.jpg";
      
      return {
        id: idx,
        title: post.title,
        category: category.toUpperCase(),
        date: "Recent",
        excerpt: post.sections.paragraphs && post.sections.paragraphs.length > 0 ? post.sections.paragraphs[0].substring(0, 150) + "..." : "",
        image: imageFile,
        link: post.slug
      };
    });

  return (
    <section className="py-20 bg-black">
      <div className="max-w-[1200px] mx-auto px-5 bg-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Insights</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-400">
            Read our latest articles, news, and technical deep-dives from the Identifyyou team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-none shadow-sm border border-[#eeeeee] overflow-hidden flex flex-col hover:border-primary transition-all duration-300 group"
            >
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors leading-snug">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-gray-500 text-[14px] mb-6 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={post.link}
                  className="text-primary font-bold hover:text-secondary inline-flex items-center mt-auto uppercase text-xs tracking-wider transition-colors"
                >
                  Read Article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
