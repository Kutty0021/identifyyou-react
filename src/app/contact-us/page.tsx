import ContactComponent from "@/components/contact/Contact";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Contact Us | Identifyyou",
  description: "Get in touch with Identifyyou for Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="Contact Us" />
      <ContactComponent />
    </div>
  );
}
