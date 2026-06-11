import Image from "next/image";

const partners = [
  { name: "Microsoft", url: "https://identifyyou.in/wp-content/uploads/2025/02/mslogo.webp" },
  { name: "Snowflake", url: "https://identifyyou.in/wp-content/uploads/2025/02/headerLogoLight-1.webp" },
  { name: "Monday.com", url: "https://identifyyou.in/wp-content/uploads/2025/02/monday-logo-x2.webp" },
  { name: "Zendesk", url: "https://identifyyou.in/wp-content/uploads/2025/02/Zendesk-Logo.webp" }
];

export default function PartnersCarousel() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 tracking-wide uppercase mb-8">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
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
