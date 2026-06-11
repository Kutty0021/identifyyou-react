import AboutComponent from "@/components/about/About";

export const metadata = {
  title: "About Us | Identifyyou",
  description: "Learn more about Identifyyou and our mission to empower businesses with intelligent IT solutions.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About Us</h1>
        </div>
      </div>
      
      <AboutComponent />
    </div>
  );
}
