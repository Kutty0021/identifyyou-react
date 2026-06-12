import Link from "next/link";
import Image from "next/image";

export default function HomeSections() {
  return (
    <>
      {/* 1. Intro Section */}
      <section className="py-20 bg-[#181818] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-[28px] sm:text-[32px] md:text-[42px] font-bold text-white mb-8 tracking-tight leading-tight max-w-5xl mx-auto font-sans">
            Next-Gen Data Engineering, Edge Intelligence & Enterprise AI Solutions
          </h2>
          <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] max-w-5xl mx-auto font-normal font-sans text-center">
            At IdentifYou Technologies, we empower enterprises to capture and onboard data in near-real-time, directly from data-generating processes, devices, and IIoT systems via Edge Computing. By combining this instant access with intelligent Data Engineering, sophisticated ML/AI solutions, and advanced Computer Vision and Machine Vision, we turn complex raw data streams into high-value business opportunities. Through intuitive Data Insights and Visualization, we translate these capabilities into crystal-clear strategic actions. Partner with us to unlock the full potential of your data assets and fuel sustained innovation-led growth.
          </p>
        </div>
      </section>

      {/* 2. Precision ABM Powered by Snowflake Cortex AI */}
      <section className="py-20 lg:py-24 bg-[#121212] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-left">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              ENTERPRISE AI
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white mb-6 leading-[1.2] font-sans">
              Precision ABM Powered by Snowflake Cortex AI
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-6 font-sans">
              High-level visibility meets operational agility. Our latest implementation within the Snowflake AI Data Cloud empowers Sales Leaders with trend analysis and equips AEs with AI-driven deal health scores—all in a single pane of glass.
            </p>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-8 font-sans">
              Experience the power of a native AI application. Powered by Snowflake Cortex AI and seamlessly integrating Streamlit and Power BI, we’ve eliminated the &quot;data hop.&quot; Securely orchestrate account parameters and run real-time sentiment analysis where your data already lives.
            </p>
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-start">
                <span className="text-[#96c73d] mr-3 mt-1 font-bold">✓</span>
                <span className="text-gray-300 text-[15px] font-sans">
                  <strong>Bridge the gap between raw data and revenue:</strong> Turn global account data into instant deal-health scores and predictive insights that drive growth.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#96c73d] mr-3 mt-1 font-bold">✓</span>
                <span className="text-gray-300 text-[15px] font-sans">
                  <strong>Native Snowflake integration:</strong> AI-driven Lead-to-Account matching, and lightning-fast Streamlit workflows.
                </span>
              </li>
            </ul>
            <Link 
              href="/snowflake-case-studies" 
              className="inline-block bg-[#96c73d] text-white px-8 py-4 uppercase font-bold text-sm tracking-[1px] hover:bg-[#86b32b] transition-colors rounded-none font-sans"
            >
              Explore More...
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] w-full bg-[#1e1e1e] border border-[#2c2c2c] overflow-hidden">
            <Image 
              src="/images/Account-Based-Sales-Marketing.jpg" 
              alt="Precision ABM Powered by Snowflake"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Machine Vision Solution */}
      <section className="py-20 lg:py-24 bg-[#181818] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] w-full bg-[#1e1e1e] border border-[#2c2c2c] overflow-hidden">
            <Image 
              src="/images/ipatt_Scan_system.jpg" 
              alt="Machine Vision Quality Control"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              MACHINE VISION
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white mb-6 leading-[1.2] font-sans">
              Machine Vision Solution
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-6 font-sans">
              In the modern industrial landscape, Machine Vision is often misunderstood as a standalone gadget—a high-tech camera perched above a conveyor belt. In reality, machine vision is not an end unto itself. It is a critical sensory organ in the vast universe of manufacturing and quality control, leveraging advanced video image processing to feed raw data into broader ML/AI ecosystems that turn visual inputs into intelligent, automated decisions.
            </p>
            <p className="text-[#96c73d] font-bold text-[15px] mb-2 font-sans uppercase tracking-[1px]">
              From Hardware to High-Yield Data
            </p>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-8 font-sans">
              While the cameras and sensors are impressive, hardware alone should never be the primary consideration. The true value lies in the transition from Image to Data. Machine vision systems serve as the foundation for Computer Integrated Manufacturing (CIM). They tie together a company’s most vital resources: its people, its equipment, and its facilities (Man, Machine, Method).
            </p>
            <Link 
              href="/contact-us" 
              className="inline-block bg-[#96c73d] text-white px-8 py-4 uppercase font-bold text-sm tracking-[1px] hover:bg-[#86b32b] transition-colors rounded-none font-sans"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ML / AI Section */}
      <section className="py-12 bg-[#121212] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
              <Image 
                src="/images/ML_AI-r1qm3banb548yu9eimxak9jp5emw0pfemw1q6f4aj4.png"
                alt="ML AI solutions"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight font-sans">
                ML / AI Solutions
              </h2>
              <p className="text-gray-400 text-sm mt-1 font-sans">
                Leverage custom predictive modeling and machine learning architecture
              </p>
            </div>
          </div>
          <Link 
            href="/ai-ml" 
            className="bg-[#96c73d] text-white px-8 py-4 font-bold text-sm tracking-[1px] hover:bg-[#86b32b] transition-colors rounded-none whitespace-nowrap uppercase font-sans w-full md:w-auto text-center"
          >
            VIEW AI SERVICES
          </Link>
        </div>
      </section>

      {/* 5 & 6. IIOT - Edge Computing & Fluke Edge Gateway */}
      <section className="py-20 lg:py-24 bg-[#181818] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              EDGE INTELLIGENCE
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white leading-tight font-sans">
              IIOT – Edge Computing
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 text-left">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-6 leading-[1.3] font-sans">
                Industrial Edge Gateway for Fluke Thermalert® T40 & TV30 Pyrometer
              </h3>
              <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-6 font-sans">
                Our Industrial Edge Gateway for the Fluke Thermalert T40 and TV30 Pyrometers bridges the gap between precision thermal sensing and real-time business outcomes by transforming raw temperature data into actionable intelligence.
              </p>
              <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-8 font-sans">
                Engineered for industry-grade reliability and high-performance edge computing, the solution enables operators to configure custom temperature ranges and utilize intelligent anomaly detection to prevent costly downtime. Accessible through desktop and mobile platforms with integrated WhatsApp alerts.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-[#96c73d] mr-3 font-bold">✓</span>
                  <span className="text-gray-300 text-[15px] font-sans">
                    <strong>High-Performance Edge Computing:</strong> Zero-latency local processing.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#96c73d] mr-3 font-bold">✓</span>
                  <span className="text-gray-300 text-[15px] font-sans">
                    <strong>WhatsApp Alert System:</strong> Delivers critical thermal warnings straight to decision-makers.
                  </span>
                </li>
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/edge-computing" 
                  className="bg-[#96c73d] text-white px-8 py-4 font-bold text-sm tracking-[1px] hover:bg-[#86b32b] transition-colors rounded-none uppercase font-sans"
                >
                  Explore More...
                </Link>
                <Link 
                  href="/contact-us" 
                  className="border border-white text-white px-8 py-[15px] font-bold text-sm tracking-[1px] hover:bg-white hover:text-black transition-colors rounded-none uppercase font-sans"
                >
                  TO BUY
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] w-full bg-[#1e1e1e] border border-[#2c2c2c] overflow-hidden">
              <Image 
                src="/images/T40-Edge-Computing-Image.jpg" 
                alt="Fluke Thermalert Edge Gateway Device"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Data Services Section */}
      <section className="py-20 lg:py-24 bg-[#121212] border-b border-[#2a2a2a] relative overflow-hidden">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 bg-[url('/images/Offer1h16.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/tmptrn2.png')] opacity-10 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              HOW WE EMPOWER YOU
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white leading-tight font-sans">
              Our Data Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                num: "01", 
                title: "Data Advisory", 
                desc: "Experts in data architecture and domain knowledge, helping businesses unlock value through the right data strategies and governance." 
              },
              { 
                num: "02", 
                title: "Data Engineering", 
                desc: "Specialists in building and optimizing robust data pipelines and platforms, turning raw data into reliable, actionable insights." 
              },
              { 
                num: "03", 
                title: "Data Operations", 
                desc: "Ensuring smooth, efficient and secure management of data systems, enabling consistent availability and performance." 
              },
              { 
                num: "04", 
                title: "Data Analytics", 
                desc: "Transforming data into actionable insights through advanced analytics, visualization and predictive modeling." 
              },
              { 
                num: "05", 
                title: "Data Governance", 
                desc: "Establishing frameworks, policies and controls to ensure data quality, security, compliance and trust." 
              },
              { 
                num: "06", 
                title: "ML/AI Solutions", 
                desc: "Designing and deploying Machine Learning and AI models that drive automation, enhance decision-making, and create intelligent solutions." 
              },
            ].map((srv, idx) => (
              <div 
                key={idx} 
                className="bg-[#181818]/90 p-8 border border-[#2c2c2c] hover:border-[#96c73d] transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-[#96c73d] text-[22px] font-bold block mb-4 font-sans">
                    {srv.num}
                  </span>
                  <h3 className="text-white text-lg font-bold mb-3 font-sans">
                    {srv.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-[1.6] font-sans">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Case Studies Group 2 */}
      <section className="py-20 lg:py-24 bg-[#181818] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              SUCCESSFUL IMPLEMENTATIONS
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white leading-tight font-sans">
              Case Studies
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cloud Data Migration",
                desc: "Drive exponential growth with rapid, seamless cloud migration of data using our accelerator tools – transform into a data-driven, analytics-ready enterprise.",
                img: "/images/Cloud-Data-Migration.png",
                link: "/snowflake-case-studies"
              },
              {
                title: "CRM",
                desc: "Our certified professionals provide tailored solutions and seamless integrations for CRM tools such as Freshworks, Zendesk, MS D365 CRM, HubSpot, and monday.com.",
                img: "/images/CR.png",
                link: "/crm-case-studies"
              },
              {
                title: "ERP - MS D365 Business Central",
                desc: "Our experts customize MS D365 Business Central to streamline operations, financial management, and improve supply chain visibility with real-time insights.",
                img: "/images/pinpng.com-microsoft-dynamics-logo-png-3444175-1.png",
                link: "/erp-case-studies"
              }
            ].map((cs, idx) => (
              <Link 
                key={idx} 
                href={cs.link} 
                className="group flex flex-col bg-[#121212] overflow-hidden border border-[#2c2c2c] hover:border-[#96c73d] transition-colors duration-300 text-left"
              >
                <div className="relative h-[220px] w-full bg-white flex items-center justify-center p-6 border-b border-[#2c2c2c]">
                  <Image 
                    src={cs.img} 
                    alt={cs.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-white text-lg font-bold mb-4 font-sans">
                    {cs.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-[1.6] mb-8 flex-grow font-sans">
                    {cs.desc}
                  </p>
                  <div className="pt-4 border-t border-[#2c2c2c] mt-auto">
                    <span className="text-[#96c73d] font-bold text-xs uppercase tracking-[1px] group-hover:text-white transition-colors inline-flex items-center font-sans">
                      CASE STUDIES
                      <span className="ml-2">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. About - Configurable Platform & Stats */}
      <section className="py-20 lg:py-24 bg-[#121212] border-b border-[#2a2a2a]">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              ABOUT OUR PLATFORM
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white mb-6 leading-[1.2] font-sans">
              AI Driven, No Development, Fully Configurable Platform
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.8] mb-8 font-sans">
              Our AI-powered No-Code/No Development, Fully Configurable platform enables the rapid creation of business-driven digital solutions with exceptional speed and efficiency—almost instantly. Competing with leading players in the Global Technology Industry.
            </p>
            
            <div className="grid grid-cols-2 gap-6 bg-[#181818] p-8 border border-[#2c2c2c]">
              {[
                { stat: "6 +", label: "Years In Business" },
                { stat: "150 +", label: "Customers" },
                { stat: "20 +", label: "Plugins" },
                { stat: "1M +", label: "Customer Requests" },
              ].map((st, idx) => (
                <div key={idx} className="text-left">
                  <span className="text-[30px] sm:text-[36px] font-bold text-[#96c73d] block font-sans leading-none mb-1">
                    {st.stat}
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm font-sans block">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full bg-[#1e1e1e] border border-[#2c2c2c] overflow-hidden">
            <Image 
              src="/images/h3-about1-1.jpg" 
              alt="Fully Configurable AI Solutions Dashboard"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 10. Our Team Section */}
      <section className="py-20 lg:py-24 bg-[#181818]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[#96c73d] text-xs font-bold tracking-[3px] uppercase block mb-3 font-sans">
              THE EXPERTS BEHIND OUR VALUE
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-white leading-tight font-sans">
              Our Team
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Sathesh Seetharaman (Ram)", 
                role: "CEO", 
                img: "/images/team7.jpg" 
              },
              { 
                name: "Muthu Kanagalakshmi (Lakshmi)", 
                role: "VP Technology", 
                img: "/images/team2.jpg" 
              },
              { 
                name: "John Kingsly (John)", 
                role: "VP - Customer Relationship", 
                img: "/images/team3.jpg" 
              },
            ].map((member, idx) => (
              <div 
                key={idx} 
                className="bg-[#121212] overflow-hidden border border-[#2c2c2c] text-center group"
              >
                <div className="relative h-[320px] w-full bg-[#1e1e1e] overflow-hidden">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white text-lg font-bold mb-1 font-sans">
                    {member.name}
                  </h3>
                  <p className="text-[#96c73d] text-xs uppercase tracking-[2px] font-bold font-sans">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
