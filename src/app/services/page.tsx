import ServicesComponent from "@/components/home/Services";

export const metadata = {
  title: "Our Services | Identifyyou",
  description: "Explore our Data Advisory, Data Engineering, Data Operations, Data Analytics, Data Governance, and ML/AI Solutions.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-24 border-b border-[#333]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[40px] md:text-[50px] font-extrabold text-white text-center mb-4 tracking-tight">Our Services</h1>
          <p className="text-[18px] md:text-[20px] text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of data and IT solutions tailored to elevate your business.
          </p>
        </div>
      </div>
      
      <div className="py-12">
        <ServicesComponent />
      </div>
    </div>
  );
}
