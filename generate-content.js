const fs = require('fs');
const path = require('path');

const generateContent = (title, category, specifics) => `import Link from 'next/link';

export const metadata = {
  title: "${title} | Identifyyou",
  description: "Comprehensive ${title} driving digital transformation and operational excellence.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">${title}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              ${specifics.heroSubtitle}
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
                ${specifics.paragraphs.map(p => `<p className="mb-6 leading-relaxed">${p}</p>`).join('\n                ')}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Capabilities</h3>
              <ul className="space-y-4">
                ${specifics.features.map(f => `<li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mt-1 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">${f}</span>
                </li>`).join('\n                ')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Accelerate Your ${category}?</h2>
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
`;

const pages = {
  'snowflake-case-studies': {
    title: 'Snowflake Case Studies',
    category: 'Data Cloud Journey',
    specifics: {
      heroSubtitle: 'Discover how we help enterprises harness the full potential of the Snowflake AI Data Cloud for unparalleled analytics and agility.',
      paragraphs: [
        "In today's data-driven landscape, migrating to a modern cloud data platform is just the first step. Our Snowflake implementations focus on delivering measurable business value through optimized architectures, secure data sharing, and advanced analytics.",
        "We have successfully partnered with organizations across finance, healthcare, and retail to consolidate siloed data, reduce operational overhead, and empower teams with real-time insights powered by Snowflake Cortex AI."
      ],
      features: [
        "Zero-Copy Cloning and Data Sharing optimizations",
        "Integration of Snowflake Cortex AI for predictive modeling",
        "Automated data pipelines and DBT integrations",
        "Performance tuning and compute cost optimization"
      ]
    }
  },
  'power-bi-case-studies': {
    title: 'Power BI Case Studies',
    category: 'Business Intelligence Strategy',
    specifics: {
      heroSubtitle: 'Transforming complex enterprise data into intuitive, actionable visualizations that drive strategic decision-making.',
      paragraphs: [
        "Data is only as valuable as the insights you can extract from it. Our Power BI deployments focus on creating intuitive, interactive, and highly performant dashboards that cater to both executives and operational teams.",
        "From complex DAX formulations to seamless integration with ERPs and cloud data warehouses, our case studies demonstrate how we turn disparate data sources into a unified, single source of truth."
      ],
      features: [
        "Custom dashboard design and UX optimization",
        "Complex DAX logic and tabular model design",
        "Real-time streaming datasets and automated refreshes",
        "Row-Level Security (RLS) implementation"
      ]
    }
  },
  'tailored-enterprise-solutions': {
    title: 'Tailored Enterprise Solutions',
    category: 'Digital Transformation',
    specifics: {
      heroSubtitle: 'Bespoke software architecture designed specifically to solve your unique operational bottlenecks and scale with your growth.',
      paragraphs: [
        "Off-the-shelf software often forces businesses to adapt their processes to the tool. Our Tailored Enterprise Solutions do the exact opposite—we build robust, scalable architectures that perfectly map to your proprietary workflows.",
        "Whether it's a specialized portal, a complex integration layer, or a complete legacy system modernization, our engineering teams utilize modern tech stacks to deliver future-proof solutions."
      ],
      features: [
        "Microservices architecture and API-first design",
        "Legacy system modernization and cloud migration",
        "Custom workflow engines and automation",
        "Enterprise-grade security and compliance"
      ]
    }
  },
  'crm-case-studies': {
    title: 'CRM Case Studies',
    category: 'Customer Relationship Management',
    specifics: {
      heroSubtitle: 'Real-world examples of how our tailored CRM implementations increase sales velocity and improve customer retention.',
      paragraphs: [
        "A properly implemented CRM is the lifeblood of customer-facing operations. Our case studies highlight how we've helped organizations transition from chaotic, manual processes to streamlined, automated workflows.",
        "By focusing on user adoption, data integrity, and intelligent automation, we ensure that your sales and support teams spend less time doing data entry and more time engaging with customers."
      ],
      features: [
        "Lead routing and automated scoring models",
        "Omnichannel support ticketing optimization",
        "Integration with marketing automation platforms",
        "Custom sales forecasting dashboards"
      ]
    }
  },
  'erp-case-studies': {
    title: 'ERP Case Studies',
    category: 'Enterprise Resource Planning',
    specifics: {
      heroSubtitle: 'Explore our track record of unifying finance, supply chain, and operations through strategic ERP implementations.',
      paragraphs: [
        "ERP projects are notoriously complex, but our proven methodology mitigates risk and ensures alignment with business objectives. These case studies showcase successful deployments across manufacturing, retail, and professional services.",
        "We specialize in navigating the intricacies of multi-entity financial consolidation, dynamic supply chain routing, and automated compliance reporting."
      ],
      features: [
        "Multi-company financial consolidation workflows",
        "Automated procurement and inventory tracking",
        "Custom billing and revenue recognition engines",
        "Real-time operational KPI tracking"
      ]
    }
  },
  'solutions': {
    title: 'Our Solutions',
    category: 'Technology Solutions',
    specifics: {
      heroSubtitle: 'A comprehensive suite of technology solutions designed to modernize your infrastructure and accelerate growth.',
      paragraphs: [
        "Identifyyou provides end-to-end technology solutions that bridge the gap between business strategy and technical execution. We don't just write code; we solve fundamental business problems.",
        "From intelligent data platforms to scalable cloud architectures, our solutions are built on a foundation of reliability, security, and exceptional user experience."
      ],
      features: [
        "Cloud Infrastructure & DevOps",
        "Data Engineering & AI/ML",
        "Enterprise Application Development",
        "Digital Workspace & Mobility"
      ]
    }
  },
  'crm-solutions': {
    title: 'CRM Solutions',
    category: 'CRM Implementations',
    specifics: {
      heroSubtitle: 'Drive sales efficiency and elevate customer experiences with our customized CRM platforms.',
      paragraphs: [
        "We deploy and customize industry-leading CRM platforms like Salesforce, HubSpot, and MS Dynamics to perfectly align with your sales methodology and support processes.",
        "Our solutions encompass everything from initial data migration and architecture design to complex third-party integrations and custom app development within the CRM ecosystem."
      ],
      features: [
        "Platform selection and architecture design",
        "Complex data migration and deduplication",
        "Custom APEX/scripting and API integrations",
        "User training and change management"
      ]
    }
  },
  'erp-solutions': {
    title: 'ERP Solutions',
    category: 'ERP Implementations',
    specifics: {
      heroSubtitle: 'Unify your operational data and streamline global processes with our robust ERP solutions.',
      paragraphs: [
        "We specialize in the implementation and optimization of leading ERP systems like MS Dynamics 365 Business Central, ensuring your organization has a single source of truth for finance, operations, and supply chain.",
        "Our expertise extends to building custom extensions, automating intercompany transactions, and designing specialized portals for vendors and partners."
      ],
      features: [
        "End-to-end system implementation",
        "Custom extension and module development",
        "Vendor portal and EDI integrations",
        "Advanced financial reporting architectures"
      ]
    }
  },
  'smart-mobility': {
    title: 'Smart Mobility',
    category: 'Mobility Initiatives',
    specifics: {
      heroSubtitle: 'Fostering collaboration between OEMs and Tier 1 suppliers to accelerate EV adoption and localization efforts.',
      paragraphs: [
        "B2B Connect sessions for Electric Vehicles (EVs) serve as strategic platforms to foster collaboration between Original Equipment Manufacturers (OEMs) and Tier 1 suppliers. These sessions are designed to facilitate direct engagement, enabling discussions on critical aspects such as technology development, component sourcing, supply chain resilience, and regulatory compliance.",
        "As part of this initiative, a B2B Connect session was conducted in collaboration with CODISSIA, Coimbatore, bringing together key stakeholders in the EV ecosystem. The event provided a structured platform for OEMs and Tier 1 suppliers to explore synergies and establish partnerships."
      ],
      features: [
        "Aligning Tier 1 offerings with advanced EV architectures",
        "Addressing raw material procurement and localization strategies",
        "Exploring cost reduction while maintaining high-quality standards",
        "Encouraging joint R&D for next-gen solid-state batteries and thermal management"
      ]
    }
  },
  'edge-computing': {
    title: 'Edge Computing',
    category: 'Industrial Edge Solutions',
    specifics: {
      heroSubtitle: 'Transforming raw thermal data into actionable business intelligence right at the source.',
      paragraphs: [
        "In high-stakes industrial environments, a slight temperature deviation can mean the difference between seamless production and costly equipment failure. Our Industrial Edge Gateway, purpose-built for the Fluke Thermalert T40 Pyrometer, processes data locally for immediate response.",
        "Move beyond static thresholds with an engine that analyzes real-time thermal patterns and subtle deviations. By identifying irregularities that simple alarms miss, the system flags potential issues in their early stages, allowing your team to intervene before they escalate into critical failures or costly downtime."
      ],
      features: [
        "High-Performance Edge Computing architecture",
        "Intelligent Anomaly Detection Engine",
        "Real-time thermal pattern analysis",
        "Sub-millisecond latency for critical alerts"
      ]
    }
  },
  'gallery': {
    title: 'Gallery',
    category: 'Corporate Experience',
    specifics: {
      heroSubtitle: 'A visual journey through our projects, team events, and technological innovations.',
      paragraphs: [
        "Explore our gallery to see the Identifyyou team in action. From intensive collaborative workshops and client deployments to industry conferences and team-building events.",
        "Our culture is built on continuous learning and collaborative problem-solving, and these snapshots capture the essence of our dynamic work environment."
      ],
      features: [
        "Industry conference keynotes",
        "Client onsite deployments",
        "Team hackathons and innovation labs",
        "Corporate social responsibility initiatives"
      ]
    }
  }
};

Object.keys(pages).forEach(route => {
  const fileContent = generateContent(pages[route].title, pages[route].category, pages[route].specifics);
  const filePath = path.join(__dirname, 'src', 'app', route, 'page.tsx');
  fs.writeFileSync(filePath, fileContent);
  console.log('Updated ' + route);
});
