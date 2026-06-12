import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Tailored Enterprise Solutions | Identifyyou",
  description: "Comprehensive Tailored Enterprise Solutions driving digital transformation and operational excellence.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="Tailored Enterprise Solutions" />

      {/* Main Content */}
      <section className="py-20 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p className="mb-6 leading-relaxed">Off-the-shelf software often forces businesses to adapt their processes to the tool. Our Tailored Enterprise Solutions do the exact opposite—we build robust, scalable architectures that perfectly map to your proprietary workflows.</p>
                <p className="mb-6 leading-relaxed">Whether it's a specialized portal, a complex integration layer, or a complete legacy system modernization, our engineering teams utilize modern tech stacks to deliver future-proof solutions.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-none p-8 lg:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-secondary mb-6">Key Capabilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-semibold text-[16px]">Microservices architecture and API-first design</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-semibold text-[16px]">Legacy system modernization and cloud migration</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-semibold text-[16px]">Custom workflow engines and automation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-semibold text-[16px]">Enterprise-grade security and compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-6">Ready to Accelerate Your Digital Transformation?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Partner with Identifyyou to leverage cutting-edge technology and domain expertise for your enterprise.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase tracking-wider text-sm hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
