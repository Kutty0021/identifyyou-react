import Link from 'next/link';
import data from '@/data/api_pipeline_data.json';

export const metadata = {
  title: "CRM Solutions | Identifyyou",
  description: "Comprehensive CRM Solutions driving digital transformation and operational excellence.",
};

export default function Page() {
  const pageData = data.find(p => p.slug === 'crm-solutions');
  const title = pageData?.title || "CRM Solutions";
  
  // Extract capabilities from serviceSections since paragraphs are empty
  const rawSections = pageData?.sections?.serviceSections || [];
  const formattedCapabilities = rawSections.map(section => {
    const parts = section.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const heading = parts[0] || "Integration";
    const description = parts.slice(1).join(" ") || "";
    return { heading, description };
  });
  
  const topCapabilities = formattedCapabilities.slice(0, 2);
  const listCapabilities = formattedCapabilities.slice(2);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{title}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Drive sales efficiency and elevate customer experiences with our customized CRM platforms.
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
                {topCapabilities.length > 0 ? topCapabilities.map((cap, i) => (
                  <div key={i} className="mb-6">
                    <strong className="text-gray-900 block mb-2">{cap.heading}</strong>
                    <p className="leading-relaxed">{cap.description}</p>
                  </div>
                )) : (
                  <>
                    <p className="mb-6 leading-relaxed">We deploy and customize industry-leading CRM platforms like Salesforce, HubSpot, and MS Dynamics to perfectly align with your sales methodology and support processes.</p>
                    <p className="mb-6 leading-relaxed">Our solutions encompass everything from initial data migration and architecture design to complex third-party integrations and custom app development within the CRM ecosystem.</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Integrations & Features</h3>
              <ul className="space-y-4">
                {listCapabilities.length > 0 ? listCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="text-gray-900 font-bold block">{cap.heading}</span>
                      {cap.description && <span className="text-gray-600 text-sm mt-1 block">{cap.description}</span>}
                    </div>
                  </li>
                )) : (
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Platform selection and architecture design</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Accelerate Your CRM Implementations?</h2>
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
