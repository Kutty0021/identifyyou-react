import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blogs & News | Identifyyou",
  description: "Stay up to date with the latest insights, news, and technical deep-dives from Identifyyou.",
};

export default function BlogsNewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Blogs & News</h1>
        </div>
      </div>
      
      <BlogList />
    </div>
  );
}
