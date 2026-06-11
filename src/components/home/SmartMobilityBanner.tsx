import Link from "next/link";
import Image from "next/image";

export default function SmartMobilityBanner() {
  return (
    <section className="relative py-32 bg-[#121212] overflow-hidden border-t border-[#333]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/T40-Edge-Computing-Image.jpg"
          alt="Smart Mobility Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-[40px] md:text-[50px] lg:text-[60px] font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
            Your Trusted<br />
            <span className="text-primary">Smart Mobility Partner</span>
          </h2>
          <p className="text-[18px] md:text-[22px] text-gray-300 mb-12 border-l-[4px] border-primary pl-6">
            Enriching the Global Ecosystem for Electric Vehicles
          </p>
          <Link
            href="/smart-mobility"
            className="inline-block bg-primary text-white font-bold px-10 py-4 text-[14px] tracking-[1px] uppercase hover:bg-[#86b32b] transition-colors shadow-lg"
          >
            DISCOVER MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
