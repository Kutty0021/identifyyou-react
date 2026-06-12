import { getEdgeProjects, WPEdgeProject } from '@/services/wordpress';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: "Edge Computing | Identifyyou",
  description: "Learn more about Edge Computing and our offerings.",
};

export default async function Page() {
  let projects: WPEdgeProject[] = [];
  let error = null;

  try {
    projects = await getEdgeProjects();
  } catch (err) {
    console.error("Error loading edge projects:", err);
    error = "Failed to load edge projects dynamically.";
  }

  const project = projects[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={project?.title || "Edge Computing"} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full">
        {error ? (
          <div className="text-center py-10">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none max-w-md mx-auto">
              {error}
            </div>
          </div>
        ) : project ? (
          <>
            {project.imageUrl && (
              <div className="mb-12 w-full relative aspect-[21/9] rounded-none overflow-hidden shadow-md border border-gray-100 bg-gray-50">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} Feature image`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
            )}

            {project.content ? (
              <div 
                className="prose prose-lg max-w-none text-gray-800 prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-gray-600 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: project.content }} 
              />
            ) : (
              <div className="text-center text-gray-500 py-10">Content is being updated.</div>
            )}
            
            {(project.hardware || project.location || project.status) && (
              <div className="mt-8 p-6 bg-gray-50 border border-gray-100">
                <h4 className="text-lg font-bold text-secondary mb-2">Project Specifications</h4>
                {project.hardware && <p className="text-sm text-gray-600"><strong>Hardware Platform:</strong> {project.hardware}</p>}
                {project.location && <p className="text-sm text-gray-600 mt-1"><strong>Location:</strong> {project.location}</p>}
                {project.status && <p className="text-sm text-gray-600 mt-1"><strong>Status:</strong> {project.status}</p>}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">No edge computing projects found.</div>
        )}
      </div>
    </div>
  );
}
