import ContactComponent from "@/components/contact/Contact";

export const metadata = {
  title: "Contact Us | Identifyyou",
  description: "Get in touch with Identifyyou for Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] pt-[80px] pb-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5 mt-10">
          <h1 className="text-[40px] md:text-[50px] font-extrabold text-white text-center tracking-tight">Contact Us</h1>
        </div>
      </div>
      
      <ContactComponent />
    </div>
  );
}
