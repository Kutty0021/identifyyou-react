"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Study", href: "/case-study" },
    { name: "Solutions", href: "/solutions" },
    { name: "Edge Computing", href: "/edge-computing" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs & News", href: "/blogs-news" },
    { name: "About Us", href: "/about-us" },
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-[60] bg-[#121212] border-b border-[#333] shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[90px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/images/headerLogoLight-1.webp"
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-primary font-medium text-[15px] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="hidden xl:flex items-center">
              <Link
                href="/contact-us"
                className="bg-primary text-white px-8 py-3 rounded-[3px] font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#86b32b] transition-colors"
              >
                CONTACT US
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center z-[70]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2"
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

      {/* Mobile Navigation Overlay - Placed outside header for better z-index context */}
      <div 
        className={`xl:hidden fixed inset-0 top-[90px] z-[40] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Navigation Drawer - Placed outside header */}
      <div 
        className={`xl:hidden fixed top-[90px] right-0 bottom-0 w-64 bg-[#1a1a1a] border-l border-[#333] shadow-2xl z-[50] transform transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="px-4 py-6 space-y-1 flex-grow">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded-md transition-colors border-b border-[#333] active:bg-[#333]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8 pb-4">
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-4 py-4 text-base font-bold text-white bg-primary rounded-md text-center uppercase tracking-wider hover:bg-[#86b32b] transition-colors active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
