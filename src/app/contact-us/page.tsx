import ContactComponent from "@/components/contact/Contact";

export const metadata = {
  title: "Contact Us | Identifyyou",
  description: "Get in touch with Identifyyou for Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Contact Us</h1>
        </div>
      </div>
      
      <ContactComponent />
    </div>
  );
}
