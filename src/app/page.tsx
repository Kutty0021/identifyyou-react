import Hero from "@/components/home/Hero";
import CaseStudies from "@/components/home/CaseStudies";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Hero />
      <CaseStudies />
    </div>
  );
}
