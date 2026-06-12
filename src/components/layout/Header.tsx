"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCaseStudyOpen, setIsMobileCaseStudyOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change automatically
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed w-full top-0 z-[60] bg-white border-t-[8px] border-[#1d2e32] border-b border-gray-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex justify-between items-center h-[80px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/images/id_logo-dark.png"
                  alt="Identifyyou Logo"
                  width={200}
                  height={50}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-6 items-center">
              <Link href="/" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                Home
              </Link>
              <Link href="/services" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                Services
              </Link>
              
              {/* Case Study Dropdown */}
              <div className="relative group py-5">
                <Link
                  href="/case-study"
                  className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors flex items-center gap-1"
                >
                  Case Study
                  <svg className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {/* Dropdown Card */}
                <div className="absolute top-[75px] left-0 w-[320px] bg-white border border-gray-100 shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 rounded-none">
                  <Link href="/snowflake-case-studies" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    AI Data Cloud – Snowflake Case Studies
                  </Link>
                  <Link href="/power-bi-case-studies" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    Data Analytics – MS Power BI Case Studies
                  </Link>
                  <Link href="/tailored-enterprise-solutions" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    Tailored Enterprise Solutions Case Studies
                  </Link>
                  <Link href="/crm-case-studies" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    CRM Case Studies
                  </Link>
                  <Link href="/erp-case-studies" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    ERP – MS D365 Business Central Case Studies
                  </Link>
                  <Link href="/smart-mobility" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold">
                    Smart Mobility
                  </Link>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group py-5">
                <Link
                  href="/solutions"
                  className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors flex items-center gap-1"
                >
                  Solutions
                  <svg className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {/* Dropdown Card */}
                <div className="absolute top-[75px] left-0 w-[240px] bg-white border border-gray-100 shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 rounded-none">
                  <Link href="/crm-solutions" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold border-b border-gray-50">
                    CRM Solutions
                  </Link>
                  <Link href="/erp-solutions" className="block px-6 py-2.5 text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors font-semibold">
                    ERP Solutions
                  </Link>
                </div>
              </div>

              <Link href="/edge-computing" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                Edge Computing
              </Link>
              <Link href="/gallery" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                Gallery
              </Link>
              <Link href="/blogs-news" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                Blogs & News
              </Link>
              <Link href="/about-us" className="text-[#333333] hover:text-primary font-semibold text-[15px] transition-colors py-5">
                AboutUs
              </Link>
            </nav>

            {/* Contact Button */}
            <div className="hidden xl:flex items-center">
              <Link
                href="/contact-us"
                className="bg-primary text-white px-8 py-3 rounded-[3px] font-bold text-[13px] tracking-[1px] uppercase hover:bg-primary-hover transition-colors"
              >
                CONACT US
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center z-[70]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-primary focus:outline-none p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Backdrop */}
      <div 
        className={`xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Navigation Drawer - slides from LEFT */}
      <div 
        className={`xl:hidden fixed top-0 left-0 bottom-0 h-screen w-[350px] max-w-[85vw] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
      >
        {/* Drawer Header with branding and close button */}
        <div className="flex justify-between items-center px-5 py-6 border-b border-gray-100">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images/id_logo-dark.png"
              alt="Identifyyou Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu list items */}
        <div className="flex-grow flex flex-col py-4 px-5">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            Services
          </Link>
          
          {/* Case Study with Accordion */}
          <div className="border-b border-gray-100">
            <div className="flex justify-between items-center py-4">
              <Link 
                href="/case-study" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-gray-800 hover:text-primary transition-colors"
              >
                Case Study
              </Link>
              <button 
                onClick={() => setIsMobileCaseStudyOpen(!isMobileCaseStudyOpen)}
                className={`w-10 h-10 flex items-center justify-center text-white transition-colors select-none ${isMobileCaseStudyOpen ? 'bg-primary' : 'bg-black'}`}
              >
                <svg className={`w-4 h-4 transform transition-transform duration-200 ${isMobileCaseStudyOpen ? 'rotate-180' : 'rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {/* Accordion dropdown */}
            <div className={`overflow-hidden transition-all duration-300 pl-4 bg-gray-50 ${isMobileCaseStudyOpen ? 'max-h-[500px] border-t border-gray-100 py-2' : 'max-h-0'}`}>
              <Link href="/snowflake-case-studies" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                AI Data Cloud – Snowflake Case Studies
              </Link>
              <Link href="/power-bi-case-studies" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                Data Analytics – MS Power BI Case Studies
              </Link>
              <Link href="/tailored-enterprise-solutions" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                Tailored Enterprise Solutions Case Studies
              </Link>
              <Link href="/crm-case-studies" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                CRM Case Studies
              </Link>
              <Link href="/erp-case-studies" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                ERP – MS D365 Business Central Case Studies
              </Link>
              <Link href="/smart-mobility" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors">
                Smart Mobility
              </Link>
            </div>
          </div>

          {/* Solutions with Accordion */}
          <div className="border-b border-gray-100">
            <div className="flex justify-between items-center py-4">
              <Link 
                href="/solutions" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-gray-800 hover:text-primary transition-colors"
              >
                Solutions
              </Link>
              <button 
                onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                className={`w-10 h-10 flex items-center justify-center text-white transition-colors select-none ${isMobileSolutionsOpen ? 'bg-primary' : 'bg-black'}`}
              >
                <svg className={`w-4 h-4 transform transition-transform duration-200 ${isMobileSolutionsOpen ? 'rotate-180' : 'rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {/* Accordion dropdown */}
            <div className={`overflow-hidden transition-all duration-300 pl-4 bg-gray-50 ${isMobileSolutionsOpen ? 'max-h-[300px] border-t border-gray-100 py-2' : 'max-h-0'}`}>
              <Link href="/crm-solutions" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors border-b border-gray-100/50">
                CRM Solutions
              </Link>
              <Link href="/erp-solutions" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-primary transition-colors">
                ERP Solutions
              </Link>
            </div>
          </div>

          <Link 
            href="/edge-computing" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            Edge Computing
          </Link>
          <Link 
            href="/gallery" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            Gallery
          </Link>
          <Link 
            href="/blogs-news" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            Blogs & News
          </Link>
          <Link 
            href="/about-us" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-4 text-base font-bold text-gray-800 hover:text-primary transition-colors border-b border-gray-100"
          >
            AboutUs
          </Link>

          {/* Contact Button */}
          <div className="py-8 mt-auto">
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-4 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded-none text-center uppercase tracking-wider transition-colors active:scale-95"
            >
              CONACT US
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
