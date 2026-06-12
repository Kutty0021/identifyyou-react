import BlogList from "@/components/blog/BlogList";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Blogs & News | Identifyyou",
  description: "Stay up to date with the latest insights, news, and technical deep-dives from Identifyyou.",
};

export default function BlogsNewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title="Blogs & News" />
      <BlogList />
    </div>
  );
}
