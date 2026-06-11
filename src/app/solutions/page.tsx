import Link from 'next/link';

export const metadata = {
  title: "Our Solutions | Identifyyou",
  description: "Comprehensive Our Solutions driving digital transformation and operational excellence.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Solutions</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              A comprehensive suite of technology solutions designed to modernize your infrastructure and accelerate growth.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6 leading-relaxed">Identifyyou provides end-to-end technology solutions that bridge the gap between business strategy and technical execution. We don't just write code; we solve fundamental business problems.</p>
                <p className="mb-6 leading-relaxed">From intelligent data platforms to scalable cloud architectures, our solutions are built on a foundation of reliability, security, and exceptional user experience.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Capabilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">Cloud Infrastructure & DevOps</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">Data Engineering & AI/ML</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">Enterprise Application Development</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">Digital Workspace & Mobility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Accelerate Your Technology Solutions?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Partner with Identifyyou to leverage cutting-edge technology and domain expertise for your enterprise.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
