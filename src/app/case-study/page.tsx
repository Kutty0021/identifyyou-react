import CaseStudiesComponent from "@/components/home/CaseStudies";

export const metadata = {
  title: "Case Studies & Portfolio | Identifyyou",
  description: "Explore our successful projects in AI Data Cloud, CRM, ERP, Smart Mobility, and Tailored Enterprise Solutions.",
};

export default function CaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-24 border-b border-[#333]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[40px] md:text-[50px] font-extrabold text-white text-center mb-4 tracking-tight">Case Studies</h1>
          <p className="text-[18px] md:text-[20px] text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            Discover how we deliver transformative IT solutions across various industries and technological domains.
          </p>
        </div>
      </div>
      
      <div className="py-12">
        <CaseStudiesComponent />
      </div>
    </div>
  );
}
