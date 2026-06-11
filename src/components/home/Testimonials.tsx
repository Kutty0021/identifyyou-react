export default function Testimonials() {
  const testimonials = [
    {
      company: "BW Group",
      content: "The solutions provided by IdentifYou have completely transformed our operational efficiency. Their team's dedication and technical prowess are unmatched.",
      role: "Operations Director"
    },
    {
      company: "Disprz",
      content: "Their enterprise AI implementations allowed us to scale our data processing exponentially without compromising on security or accuracy.",
      role: "CTO"
    },
    {
      company: "Freshworks",
      content: "A truly reliable partner for our digital engineering needs. The integrations were seamless, and their support is incredibly responsive.",
      role: "Product Manager"
    },
    {
      company: "BATA",
      content: "IdentifYou's tailored CRM and ERP solutions gave us the visibility and control we needed across our entire supply chain.",
      role: "Head of IT"
    }
  ];

  return (
    <section className="py-24 bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-widest uppercase mb-4">Why People Love Us</p>
          <h2 className="text-[40px] md:text-[50px] font-extrabold text-white mb-4 tracking-tight">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#121212] border border-[#333] p-10 md:p-12 hover:border-primary transition-colors duration-300 relative shadow-lg"
            >
              <svg className="absolute top-8 right-10 w-16 h-16 text-[#333] opacity-30" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-300 text-[18px] md:text-[20px] leading-relaxed mb-10 italic relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-[#222] border border-[#333] rounded-full flex items-center justify-center text-primary font-bold text-2xl mr-5">
                  {testimonial.company.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-[20px]">{testimonial.company}</h4>
                  <span className="text-gray-500 text-[15px] uppercase tracking-wider">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
