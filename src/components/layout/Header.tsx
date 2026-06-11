"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Study", href: "/case-study" },
    { name: "Solutions", href: "/solutions" },
    { name: "Edge Computing", href: "/edge-computing" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs & News", href: "/blogs-news" },
    { name: "AboutUs", href: "/aboutus" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[90px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="https://identifyyou.in/wp-content/uploads/2025/01/id_logo-dark.png"
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
                className="text-[#444444] hover:text-primary font-medium text-[15px] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden xl:flex items-center">
            <Link
              href="/contact-us"
              className="bg-primary text-white px-8 py-3 rounded-[3px] font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#7ab033] transition-colors"
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact-us"
              className="block mt-6 px-3 py-4 text-base font-bold text-white bg-primary rounded-md text-center uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
