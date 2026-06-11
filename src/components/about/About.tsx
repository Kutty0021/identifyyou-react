import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-white">
      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">About Us</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Providing Best Technology IT Services
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
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                At IdentifYou Technologies, we empower your digital transformation journey with tailored solutions that meet diverse business needs.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-3xl font-bold text-gray-900 mb-1">50+</p>
                  <p className="text-sm text-gray-500 font-medium">Enterprise Clients</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
                  <p className="text-sm text-gray-500 font-medium">Delivery Success</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square w-full rounded-2xl shadow-lg overflow-hidden mt-8">
                <Image
                  src="/images/team2.jpg"
                  alt="Team collaboration"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/images/h3-about1-1.jpg"
                  alt="Office discussion"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full rounded-2xl shadow-lg overflow-hidden mt-4">
                <Image
                  src="/images/team3.jpg"
                  alt="Development team"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full rounded-2xl shadow-lg overflow-hidden -mt-4">
                <Image
                  src="/images/team7.jpg"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Identifyyou?</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Technical Excellence</h4>
              <p className="text-gray-600 leading-relaxed">
                Our team consists of certified architects and engineers who bring years of domain expertise to every project.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Security First</h4>
              <p className="text-gray-600 leading-relaxed">
                We implement robust security measures and data governance policies from day one, ensuring your IP remains protected.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Client Partnership</h4>
              <p className="text-gray-600 leading-relaxed">
                We don't just act as vendors; we partner with you to understand your core business challenges and solve them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Let's discuss how our tailored IT solutions can drive growth and operational efficiency for your organization.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
}
