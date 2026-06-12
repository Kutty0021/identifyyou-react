const fs = require('fs');
const path = require('path');

// 1. Update src/app/[...slug]/page.tsx (Dynamic Route)
const dynamicPageContent = `import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import data from '@/data/api_pipeline_data.json';
import PageHeader from '@/components/layout/PageHeader';

export async function generateStaticParams() {
  return data.map((item) => {
    const slugArray = item.slug.split('/').filter(Boolean);
    return {
      slug: slugArray.length > 0 ? slugArray : ['home'],
    };
  });
}

export default async function ScrapedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentSlug = '/' + slug.join('/');
  
  const pageData = data.find((item) => item.slug === currentSlug || item.slug + '/' === currentSlug);

  if (!pageData) {
    notFound();
  }

  const title = pageData.title || '';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={title} />

      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {pageData.images && pageData.images.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100">
            <Image
              src={pageData.images[0]}
              alt="Feature image"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg text-gray-800 max-w-none prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600" 
          dangerouslySetInnerHTML={{ __html: pageData.content }} 
        />

        {pageData.images && pageData.images.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pageData.images.slice(1).map((imgUrl: string, idx: number) => {
                return (
                  <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group">
                    <Image
                      src={imgUrl}
                      alt={\`Gallery image \${idx + 1}\`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`;

// 2. Update Article/Prose Pages
const makeArticlePage = (slug, title, desc) => `import { getPageDataBySlug } from '@/utils/dataFetcher';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "${title} | Identifyyou",
  description: "${desc}",
};

export default function Page() {
  const pageData = getPageDataBySlug('${slug}');
  const pageTitle = pageData?.title || "${title}";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {pageData && pageData.images && pageData.images.length > 0 && (
          <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100">
            <Image
              src={pageData.images[0]}
              alt="${title} Feature image"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {pageData?.content ? (
          <div 
            className="prose prose-lg max-w-none text-gray-800 prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: pageData.content }} 
          />
        ) : (
          <div className="text-center text-gray-500 py-10">Content is being updated.</div>
        )}

        {pageData && pageData.images && pageData.images.length > 1 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-secondary mb-10 border-b border-gray-100 pb-4">Gallery Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pageData.images.slice(1).map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group">
                  <Image
                    src={imgUrl}
                    alt={\`Gallery image \${idx + 1}\`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`;

// 3. Update Listing/Card Pages
const makeListingPage = (slug, title, desc, defaultLabel = 'Case Study') => `import { getPageDataBySlug, extractCardsFromHtml } from '@/utils/dataFetcher';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "${title} | Identifyyou",
  description: "${desc}",
};

export default function ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page() {
  const pageData = getPageDataBySlug('${slug}');
  const cards = pageData ? extractCardsFromHtml(pageData.content || '') : [];
  const pageTitle = pageData?.title || "${title}";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-black">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const routeUrl = card.link.replace('https://identifyyou.in', '');
              return (
                <Link key={idx} href={routeUrl || '#'} className="group block h-full">
                  <div className="bg-white border border-[#eeeeee] rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary h-full flex flex-col">
                    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                      <Image 
                        src={card.image} 
                        alt={card.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors leading-snug">{card.title}</h3>
                      <p className="text-gray-500 leading-relaxed mb-6 flex-grow text-[15px]">{card.excerpt || 'Discover details about this implementation.'}</p>
                      <div className="flex items-center text-primary font-bold mt-auto group-hover:text-secondary transition-colors">
                        <span className="uppercase tracking-wider text-sm">${defaultLabel}</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">No entries found for this category.</div>
        )}
      </div>
    </div>
  );
}
`;

// Helper for other pages
const writePage = (dir, content) => {
  const filePath = path.join('src', 'app', dir, 'page.tsx');
  if (fs.existsSync(path.dirname(filePath))) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`Directory does not exist: ${path.dirname(filePath)}`);
  }
};

// Write Dynamic Route Page
fs.writeFileSync(path.join('src', 'app', '[...slug]', 'page.tsx'), dynamicPageContent);
console.log('Updated: [...slug]/page.tsx');

// Write Article/Prose Pages
writePage('edge-computing', makeArticlePage('edge-computing', 'Edge Computing', 'Learn more about Edge Computing and our offerings.'));
writePage('smart-mobility', makeArticlePage('smart-mobility', 'Smart Mobility', 'Discover our next-generation Smart Mobility and IIoT applications.'));
writePage('gallery', makeArticlePage('gallery', 'Gallery', 'View our photo gallery and structural highlights.'));

// Write Listing/Card Pages
writePage('crm-solutions', makeListingPage('crm-solutions', 'CRM Solutions', 'Comprehensive CRM Implementation, Integration, and Customization.'));
writePage('erp-solutions', makeListingPage('erp-solutions', 'ERP Solutions', 'Enterprise Resource Planning solutions tailored for your business operations.'));
writePage('snowflake-case-studies', makeListingPage('snowflake-case-studies', 'Snowflake Case Studies', 'Snowflake AI Data Cloud implementations.'));
writePage('power-bi-case-studies', makeListingPage('power-bi-case-studies', 'Power BI Case Studies', 'Business Intelligence and interactive data dashboard case studies.'));
writePage('power-app-case-studies', makeListingPage('power-app-case-studies', 'Power App Case Studies', 'Microsoft Power Apps development and custom automation case studies.'));
writePage('services', makeListingPage('services', 'Our Services', 'Explore our comprehensive range of data and IT solutions.', 'View Details'));
writePage('solutions', makeListingPage('solutions', 'Our Solutions', 'A comprehensive suite of technology solutions designed to accelerate growth.', 'View Details'));
writePage('ai-ml', makeListingPage('ai-ml', 'AI & ML Solutions', 'Leveraging AI and Machine Learning to drive next-generation innovation.', 'View Details'));
writePage('case-study', makeListingPage('case-study', 'Case Studies', 'Discover how we deliver transformative IT solutions across domains.', 'Case Studies'));

// Write Custom Case Study Pages
const crmCaseStudiesContent = `import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "CRM Case Studies | Identifyyou",
  description: "Comprehensive CRM Case Studies driving digital transformation and operational excellence.",
};

export default function CRMCaseStudiesPage() {
  const pageData = data.find(p => p.slug === 'crm-case-studies');
  const headings = pageData?.sections?.headings || [];
  const images = pageData?.images || [];

  const caseStudies = headings.map((heading, index) => ({
    title: heading,
    imageUrl: images[index] || "/images/Cloud-Data-Migration.png",
    link: "/crm-case-studies"
  }));

  const pageTitle = pageData?.title || "CRM Case Studies";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 bg-black">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className="group bg-white border border-[#eeeeee] rounded-none overflow-hidden flex flex-col hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-lg font-bold text-secondary mb-6 leading-snug group-hover:text-primary transition-colors flex-grow">
                    {study.title}
                  </h3>
                  
                  <Link
                    href={study.link}
                    className="inline-block bg-primary text-white font-bold px-8 py-3 text-sm tracking-wider uppercase hover:bg-primary-hover transition-colors w-full mt-auto"
                  >
                    CASE STUDIES
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
writePage('crm-case-studies', crmCaseStudiesContent);

const erpCaseStudiesContent = `import Image from "next/image";
import Link from "next/link";
import data from "@/data/api_pipeline_data.json";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "ERP Case Studies | Identifyyou",
  description: "Comprehensive ERP Case Studies driving digital transformation and operational excellence.",
};

export default function ERPCaseStudiesPage() {
  const pageData = data.find(p => p.slug === 'erp-case-studies');
  const headings = pageData?.sections?.headings || [];
  const images = pageData?.images || [];

  const caseStudies = headings.map((heading, index) => ({
    title: heading,
    imageUrl: images[index] || "/images/Cloud-Data-Migration.png",
    link: "/erp-case-studies"
  }));

  const pageTitle = pageData?.title || "ERP Case Studies";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 bg-black">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className="group bg-white border border-[#eeeeee] rounded-none overflow-hidden flex flex-col hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-lg font-bold text-secondary mb-6 leading-snug group-hover:text-primary transition-colors flex-grow">
                    {study.title}
                  </h3>
                  
                  <Link
                    href={study.link}
                    className="inline-block bg-primary text-white font-bold px-8 py-3 text-sm tracking-wider uppercase hover:bg-primary-hover transition-colors w-full mt-auto"
                  >
                    CASE STUDIES
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
writePage('erp-case-studies', erpCaseStudiesContent);

// Write tailored-enterprise-solutions/page.tsx
const tailoredPageContent = `import Link from 'next/link';
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
`;
writePage('tailored-enterprise-solutions', tailoredPageContent);

// Write privacy-policy/page.tsx
const privacyPolicyContent = `import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Privacy Policy | Identifyyou",
  description: "Read our Privacy Policy.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="Privacy Policy" />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 bg-white">
        <div className="prose prose-lg mx-auto bg-white p-8 lg:p-12 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-6">1. Introduction</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to Identifyyou. By accessing our website and utilizing our services, you agree to comply with and be bound by the following privacy policy. Please review them carefully. 
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">2. Data Privacy & Security</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. We implement industry-standard security measures to safeguard the data you entrust to us, whether through our cloud deployments, CRM integrations, or edge computing gateways.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">3. Use of Services</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our enterprise solutions and consulting services are provided "as is". Clients are responsible for ensuring that their use of our tailored architectures complies with all applicable local, state, and international laws.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">4. Contact Information</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            If you have any questions or concerns about our privacy policy, please contact us at info@identifyyou.in or visit our Contact Us page.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
writePage('privacy-policy', privacyPolicyContent);

// Write terms-of-service/page.tsx
const termsOfServiceContent = `import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Terms Of Service | Identifyyou",
  description: "Read our Terms Of Service.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="Terms Of Service" />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 bg-white">
        <div className="prose prose-lg mx-auto bg-white p-8 lg:p-12 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-6">1. Introduction</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to Identifyyou. By accessing our website and utilizing our services, you agree to comply with and be bound by the following terms of service. Please review them carefully. 
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">2. Data Privacy & Security</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. We implement industry-standard security measures to safeguard the data you entrust to us, whether through our cloud deployments, CRM integrations, or edge computing gateways.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">3. Use of Services</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our enterprise solutions and consulting services are provided "as is". Clients are responsible for ensuring that their use of our tailored architectures complies with all applicable local, state, and international laws.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-6">4. Contact Information</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            If you have any questions or concerns about our terms of service, please contact us at info@identifyyou.in or visit our Contact Us page.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
writePage('terms-of-service', termsOfServiceContent);

// Write about-us/page.tsx
const aboutUsContent = `import AboutComponent from "@/components/about/About";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "About Us | Identifyyou",
  description: "Learn more about Identifyyou and our mission to empower businesses with intelligent IT solutions.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="About Us" />
      <AboutComponent />
    </div>
  );
}
`;
writePage('about-us', aboutUsContent);

// Write contact-us/page.tsx
const contactUsContent = `import ContactComponent from "@/components/contact/Contact";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Contact Us | Identifyyou",
  description: "Get in touch with Identifyyou for Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title="Contact Us" />
      <ContactComponent />
    </div>
  );
}
`;
writePage('contact-us', contactUsContent);

// Write blogs-news/page.tsx
const blogsNewsContent = `import BlogList from "@/components/blog/BlogList";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Blogs & News | Identifyyou",
  description: "Stay up to date with the latest insights, news, and technical deep-dives from Identifyyou.",
};

export default function BlogsNewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <PageHeader title="Blogs & News" />
      <BlogList />
    </div>
  );
}
`;
writePage('blogs-news', blogsNewsContent);
