import Image from "next/image";
import Link from "next/link";

export default function OurSolutions() {
  const solutions = [
    {
      title: "Automerger of Duplicate Tickets in Freshdesk",
      description: "System dynamically builds merge algorithm based on the configurations.",
      imageUrl: "/images/Automerger_centered_550x550.png",
      link: "/solutions"
    },
    {
      title: "Azure DevOps – monday.com Integration",
      description: "Rapid information exchange helps IT support team and build teams stay aligned.",
      imageUrl: "/images/DevOps-Infinity-Symbol-Design.png",
      link: "/solutions"
    },
    {
      title: "Multi Vendor for Purchase Quotation",
      description: "Purchase Quotation to multiple vendors in MS D365 Business Central",
      imageUrl: "/images/multivendor_rfq_logo.png",
      link: "/solutions"
    }
  ];

  return (
    <section className="py-20 bg-[#121212]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[50px] font-extrabold text-white mb-6 tracking-tight">Our Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Link 
              key={index} 
              href={solution.link}
              className="group flex flex-col items-center text-center bg-[#1a1a1a] p-10 border border-[#333] hover:border-primary transition-colors duration-300 shadow-md cursor-pointer"
            >
              <div className="w-32 h-32 mb-8 bg-white border-2 border-white rounded-full p-4 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src={solution.imageUrl} 
                  alt={solution.title} 
                  width={100}
                  height={100}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <h3 className="text-[24px] font-bold text-white mb-4 leading-tight">{solution.title}</h3>
              <p className="text-gray-400 text-[16px] leading-relaxed mb-8 flex-grow">
                {solution.description}
              </p>
              
              <span
                className="inline-block border-2 border-primary text-white font-bold px-8 py-3 text-[14px] tracking-wider uppercase group-hover:bg-primary transition-colors mt-auto"
              >
                VIEW DETAILS
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
