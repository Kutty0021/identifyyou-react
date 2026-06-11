import ServicesComponent from "@/components/home/Services";

export const metadata = {
  title: "Our Services | Identifyyou",
  description: "Explore our Data Advisory, Data Engineering, Data Operations, Data Analytics, Data Governance, and ML/AI Solutions.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Our Services</h1>
        </div>
      </div>
      
      <div className="py-10">
        <ServicesComponent />
      </div>
    </div>
  );
}
