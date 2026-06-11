import AboutComponent from "@/components/about/About";

export const metadata = {
  title: "About Us | Identifyyou",
  description: "Learn more about Identifyyou and our mission to empower businesses with intelligent IT solutions.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About Us</h1>
        </div>
      </div>
      
      <AboutComponent />
    </div>
  );
}
