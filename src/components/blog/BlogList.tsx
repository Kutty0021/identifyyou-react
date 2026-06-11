import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_data.json";

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
        excerpt: post.paragraphs && post.paragraphs.length > 0 ? post.paragraphs[0].substring(0, 150) + "..." : "",
        image: imageFile,
        link: post.slug
      };
    });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Insights</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600">
            Read our latest articles, news, and technical deep-dives from the Identifyyou team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-[16/9] w-full bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={post.link}
                  className="text-primary font-medium hover:underline inline-flex items-center mt-auto"
                >
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
