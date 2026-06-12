import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import Testimonials from "@/components/home/Testimonials";
import LatestNews from "@/components/home/LatestNews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Hero />
      <HomeSections />
      <PartnersCarousel />
      <Testimonials />
      <LatestNews />
    </div>
  );
}
