"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPosts, WPPost } from "@/services/wordpress";

export default function BlogList() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Dynamic fetch of posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const data = await getPosts({ perPage: 100 });
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load insights. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Map to visual structure
  const allPosts = posts.map((post, idx) => {
    const imageFile = (post.acf?.featured_image_url as string) || "/images/Cloud-Data-Migration.png";
    const cleanTitle = post.title?.rendered || "";
    const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || "";
    const cleanExcerpt = rawExcerpt.replace(/<[^>]*>/g, '').substring(0, 140) + "...";
    
    return {
      id: post.id || idx,
      title: cleanTitle,
      category: "INSIGHTS",
      date: post.date && post.date !== "Recent" 
        ? new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : "Recent",
      excerpt: cleanExcerpt,
      image: imageFile,
      link: post.slug.startsWith('/') ? post.slug : `/${post.slug}`
    };
  });

  // Pagination calculations
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of list smoothly
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-[1200px] mx-auto px-5 bg-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[40px] md:text-[50px] font-extrabold text-white mb-6 tracking-tight">Latest Insights</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-400">
            Read our latest articles, news, and technical deep-dives from the Identifyyou team.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden h-[400px] animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-950 border border-red-800 text-red-400 px-4 py-3 rounded-none max-w-md mx-auto">
              {error}
            </div>
          </div>
        ) : currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
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
                    <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors leading-snug h-14 overflow-hidden text-ellipsis line-clamp-2">
                      <Link href={post.link}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-[14px] mb-6 flex-1 leading-relaxed line-clamp-3">
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 space-x-2">
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-800 text-gray-400 hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-800 disabled:hover:text-gray-400 transition-colors duration-200 uppercase font-semibold text-xs tracking-wider"
                >
                  Prev
                </button>

                {startPage > 1 && (
                  <>
                    <button
                      onClick={() => paginate(1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 text-sm font-semibold"
                    >
                      1
                    </button>
                    {startPage > 2 && <span className="text-gray-600">...</span>}
                  </>
                )}

                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 flex items-center justify-center border text-sm font-semibold transition-colors duration-200 ${
                      currentPage === number
                        ? "border-primary bg-primary text-black"
                        : "border-gray-800 text-gray-400 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && <span className="text-gray-600">...</span>}
                    <button
                      onClick={() => paginate(totalPages)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 text-sm font-semibold"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-800 text-gray-400 hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-800 disabled:hover:text-gray-400 transition-colors duration-200 uppercase font-semibold text-xs tracking-wider"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">No articles found.</div>
        )}
      </div>
    </section>
  );
}
