const fs = require('fs');
const path = require('path');

const generateLegalContent = (title) => `export const metadata = {
  title: "${title} | Identifyyou",
  description: "Read our ${title}.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">${title}</h1>
        </div>
      </div>
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg mx-auto bg-white p-8 lg:p-12 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introduction</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to Identifyyou. By accessing our website and utilizing our services, you agree to comply with and be bound by the following ${title.toLowerCase()}. Please review them carefully. 
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">2. Data Privacy & Security</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. We implement industry-standard security measures to safeguard the data you entrust to us, whether through our cloud deployments, CRM integrations, or edge computing gateways.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">3. Use of Services</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our enterprise solutions and consulting services are provided "as is". Clients are responsible for ensuring that their use of our tailored architectures complies with all applicable local, state, and international laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">4. Contact Information</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            If you have any questions or concerns about our ${title.toLowerCase()}, please contact us at info@identifyyou.in or visit our Contact Us page.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

const routes = ['terms-of-service', 'privacy-policy'];

routes.forEach(route => {
  const title = route.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const fileContent = generateLegalContent(title);
  const filePath = path.join(__dirname, 'src', 'app', route, 'page.tsx');
  fs.writeFileSync(filePath, fileContent);
  console.log('Updated ' + route);
});
