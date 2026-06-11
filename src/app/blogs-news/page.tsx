import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blogs & News | Identifyyou",
  description: "Stay up to date with the latest insights, news, and technical deep-dives from Identifyyou.",
};

export default function BlogsNewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Blogs & News</h1>
        </div>
      </div>
      
      <BlogList />
    </div>
  );
}
