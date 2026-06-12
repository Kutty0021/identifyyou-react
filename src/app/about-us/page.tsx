import AboutComponent from "@/components/about/About";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "About Us | Identifyyou",
  description: "Learn more about Identifyyou and our mission to empower businesses with intelligent IT solutions.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="About Us" />
      <AboutComponent />
    </div>
  );
}
