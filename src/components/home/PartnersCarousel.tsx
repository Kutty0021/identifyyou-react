import Image from "next/image";

const partners = [
  { name: "Microsoft", url: "/images/mslogo.webp" },
  { name: "Snowflake", url: "/images/headerLogoLight-1.webp" },
  { name: "Monday.com", url: "/images/monday-logo-x2.webp" },
  { name: "Zendesk", url: "/images/Zendesk-Logo.webp" }
];

export default function PartnersCarousel() {
  return (
    <section className="py-16 bg-[#0a0a0a] border-t border-[#333]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Partnership</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity duration-500">
          {partners.map((partner, idx) => (
            <div key={idx} className="relative w-32 h-12 md:w-40 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image 
                src={partner.url} 
                alt={partner.name} 
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
