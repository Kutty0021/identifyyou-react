import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";

export default function About() {
  const aboutData = data.find(p => p.slug === 'aboutus');
  const heading = aboutData?.sections?.headings[0] || "Providing Best Technology IT Services";
  const image1 = aboutData?.images?.[0] || "/images/team2.jpg";
  const image2 = aboutData?.images?.[1] || "/images/h3-about1-1.jpg";

  return (
    <div className="bg-white">
      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">About Us</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-secondary mb-6 leading-tight">
                {heading}
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                While we take responsibility of your Technology roadmap, Implementation and Maintenance, you can focus on your Business.
              </p>
              <ul className="text-lg text-gray-600 mb-8 leading-relaxed space-y-2 list-disc pl-5">
                <li>Design principles with Zero effort for modernization</li>
                <li>Faster time to market through Pre-built ready-to-launch solutions</li>
                <li>Reduction in implementation cost</li>
                <li>Expertise in End to End Digital Transformation Services</li>
              </ul>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed font-semibold">
                At IdentifYou Technologies, we empower your digital transformation journey with tailored solutions that meet diverse business needs.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-3xl font-bold text-secondary mb-1">50+</p>
                  <p className="text-sm text-gray-500 font-medium">Enterprise Clients</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-3xl font-bold text-secondary mb-1">100%</p>
                  <p className="text-sm text-gray-500 font-medium">Delivery Success</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square w-full rounded-none shadow-sm overflow-hidden mt-8 border border-gray-100">
                <Image
                  src={image1}
                  alt="Team collaboration"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full rounded-none shadow-sm overflow-hidden border border-gray-100">
                <Image
                  src={image2}
                  alt="Office discussion"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full rounded-none shadow-sm overflow-hidden mt-4 border border-gray-100 bg-gray-50">
                <Image
                  src="/images/id_logo-dark.png"
                  alt="Development logo"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6"
                />
              </div>
              <div className="relative aspect-square w-full rounded-none shadow-sm overflow-hidden -mt-4 border border-gray-100">
                <Image
                  src="/images/Cloud-Data-Migration.png"
                  alt="Leadership team"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">Why Choose Identifyyou?</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 bg-gray-50 text-primary border border-gray-100 rounded-none flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Technical Excellence</h4>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                Our team consists of certified architects and engineers who bring years of domain expertise to every project.
              </p>
            </div>

            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 bg-gray-50 text-primary border border-gray-100 rounded-none flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Security First</h4>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                We implement robust security measures and data governance policies from day one, ensuring your IP remains protected.
              </p>
            </div>

            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 bg-gray-50 text-primary border border-gray-100 rounded-none flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Client Partnership</h4>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                We don't just act as vendors; we partner with you to understand your core business challenges and solve them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Let's discuss how our tailored IT solutions can drive growth and operational efficiency for your organization.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase tracking-wider text-sm hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md"
          >
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
}
