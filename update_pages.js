const fs = require('fs');
const path = require('path');

const slugs = [
  'smart-mobility',
  'edge-computing',
  'crm-solutions',
  'erp-solutions',
  'snowflake-case-studies',
  'power-bi-case-studies'
];

slugs.forEach(slug => {
  const filePath = path.join('src', 'app', slug, 'page.tsx');
  if (fs.existsSync(filePath)) {
    const componentName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
    const content = `import React from 'react';
import data from '@/data/api_pipeline_data.json';
import { notFound } from 'next/navigation';

export function generateMetadata() {
  const pageData = data.find(p => p.slug === '${slug}');
  if (!pageData) return { title: 'Not Found' };
  return {
    title: \`\${pageData.title} | Identifyyou\`,
  };
}

export default function ${componentName}() {
  const pageData = data.find(p => p.slug === '${slug}');

  if (!pageData) {
    notFound();
  }

  // We render the raw Elementor HTML to perfectly preserve the original site's complex layout,
  // since this page contains specialized widgets that cannot be easily mapped to standard Tailwind placeholders.
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">{pageData.title}</h1>
        </div>
      </div>
      
      <div 
        className="wp-content-container"
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </div>
  );
}
`;
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + slug);
  } else {
    console.log('Not found: ' + slug);
  }
});
