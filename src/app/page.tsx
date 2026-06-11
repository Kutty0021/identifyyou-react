import Hero from "@/components/home/Hero";
import CaseStudies from "@/components/home/CaseStudies";
import OurSolutions from "@/components/home/OurSolutions";
import ITServices from "@/components/home/ITServices";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import SmartMobilityBanner from "@/components/home/SmartMobilityBanner";
import Testimonials from "@/components/home/Testimonials";
import LatestNews from "@/components/home/LatestNews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Hero />
      <CaseStudies />
      <OurSolutions />
      <ITServices />
      <PartnersCarousel />
      <SmartMobilityBanner />
      <Testimonials />
      <LatestNews />
    </div>
  );
}
