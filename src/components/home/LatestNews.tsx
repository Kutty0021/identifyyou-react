import Link from "next/link";
import Image from "next/image";

export default function LatestNews() {
  const news = [
    {
      title: "Snowflake Supercharges Machine Learning for Enterprises with Native Integration of NVIDIA CUDA-X Libraries",
      date: "August 15, 2025",
      imageUrl: "/images/snow.png",
      link: "/blogs-news"
    },
    {
      title: "Snowflake Listed in AWS “ICMP” for the US Federal Government",
      date: "September 02, 2025",
      imageUrl: "/images/Cloud-Data-Migration.png",
      link: "/blogs-news"
    },
    {
      title: "Snowflake Unveils Cortex AI for Financial Services: Enterprise-Ready AI Built to Scale",
      date: "October 10, 2025",
      imageUrl: "/images/ML_AI-r1qm3banb548yu9eimxak9jp5emw0pfemw1q6f4aj4.png",
      link: "/blogs-news"
    }
  ];

  return (
    <section className="py-20 bg-[#121212]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-wider uppercase mb-2">Recent News</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Latest News</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="group bg-[#0a0a0a] border border-[#333] hover:border-gray-600 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-white">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-primary text-sm mb-4 font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors flex-grow">
                  {item.title}
                </h3>
                <Link
                  href={item.link}
                  className="inline-flex items-center text-white font-bold text-sm tracking-wider uppercase hover:text-primary transition-colors"
                >
                  READ MORE
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
