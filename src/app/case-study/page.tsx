import CaseStudiesComponent from "@/components/home/CaseStudies";

export const metadata = {
  title: "Case Studies & Portfolio | Identifyyou",
  description: "Explore our successful projects in AI Data Cloud, CRM, ERP, Smart Mobility, and Tailored Enterprise Solutions.",
};

export default function CaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Case Studies</h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Discover how we deliver transformative IT solutions across various industries and technological domains.
          </p>
        </div>
      </div>
      
      <div className="py-10">
        <CaseStudiesComponent />
      </div>
    </div>
  );
}
