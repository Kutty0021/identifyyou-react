import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  const displayTitle = title || '';
  const displayBreadcrumb = breadcrumb || displayTitle;

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat pt-24 pb-20 md:pt-28 md:pb-24" 
      style={{ backgroundImage: "url('/images/page-title-bg.jpg')" }}
    >
      {/* Wave overlay graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/images/page-title-overlay.jpg')" }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45" />
      
      <div className="relative max-w-[1200px] mx-auto px-5 z-10 text-center flex flex-col items-center">
        {/* Breadcrumb Trail */}
        <nav className="mb-4 text-xs md:text-sm tracking-[2px] uppercase font-bold text-white/90 flex items-center justify-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <span className="text-white/50 text-[10px] select-none">→</span>
          <span className="text-white/70" dangerouslySetInnerHTML={{ __html: displayBreadcrumb }} />
        </nav>
        
        {/* Page Title */}
        <h1 
          className="text-[36px] md:text-[50px] lg:text-[60px] font-bold text-white leading-tight tracking-tight max-w-4xl"
          dangerouslySetInnerHTML={{ __html: displayTitle }}
        />
      </div>
    </div>
  );
}
