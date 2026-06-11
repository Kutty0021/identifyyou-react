import Link from 'next/link';
import data from "@/data/api_pipeline_data.json";

export const metadata = {
  title: "Our Solutions | Identifyyou",
  description: "Comprehensive Our Solutions driving digital transformation and operational excellence.",
};

export default function SolutionsPage() {
  const solutionsData = data.find(p => p.slug === 'solutions');
  
  const heading = solutionsData?.title || "Our Solutions";
  
  // Extract parsed sections to dynamically generate the list
  const rawSections = solutionsData?.sections?.serviceSections || [];
  
  const formattedSolutions = rawSections.map(section => {
    // The string is separated by tabs and newlines, let's clean it up
    const parts = section.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const title = parts[0] || "Solution";
    const description = parts.slice(1).join(" ") || "Discover how this solution can benefit your enterprise.";
    return { title, description };
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Page Header */}
      <div className="bg-[#121212] py-20 border-b border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">{heading}</h1>
          <p className="text-xl text-gray-400 leading-relaxed text-center max-w-3xl mx-auto">
            A comprehensive suite of technology solutions designed to modernize your infrastructure and accelerate growth.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Enterprise Digital Solutions</h2>
              <div className="prose prose-lg text-gray-400">
                <p className="mb-6 leading-relaxed">We deliver tailored digital engineering and enterprise solutions that drive operational efficiency and business growth. Our expertise covers full-stack development using modern web technologies like ReactJS, NodeJS, and Python.</p>
                <p className="mb-6 leading-relaxed">Whether you need custom automation workflows, rapid application development using Microsoft PowerApps, or robust data integrations, IdentifYou acts as your strategic partner to accelerate your digital transformation.</p>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] rounded-2xl p-8 lg:p-12 border border-[#333] shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Key Enterprise Solutions</h3>
              <ul className="space-y-6">
                {formattedSolutions.length > 0 ? formattedSolutions.map((sol, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-12 h-12 bg-[#1a1a1a] text-primary rounded-lg flex items-center justify-center shrink-0 mr-4 border border-[#333] group-hover:border-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-white font-bold mb-1 group-hover:text-primary transition-colors">{sol.title}</span>
                      <span className="text-gray-400 text-sm leading-relaxed">{sol.description}</span>
                    </div>
                  </li>
                )) : (
                  <li className="flex items-start group">
                    <div className="w-12 h-12 bg-[#1a1a1a] text-primary rounded-lg flex items-center justify-center shrink-0 mr-4 border border-[#333] group-hover:border-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-white font-bold mb-1 group-hover:text-primary transition-colors">Custom Digital Engineering</span>
                      <span className="text-gray-400 text-sm leading-relaxed">Python, NodeJS, and ReactJS expertise.</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#121212] border-t border-[#333]">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Technology Solutions?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Partner with Identifyyou to leverage cutting-edge technology and domain expertise for your enterprise.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase tracking-wider text-sm hover:bg-[#86b32b] transition-colors shadow-lg hover:shadow-xl"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
