"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    {
      name: "Case Study",
      href: "/case-study",
      dropdown: [
        { name: "AI Data Cloud", href: "/snowflake-case-studies" },
        { name: "Data Analytics", href: "/power-bi-case-studies" },
        { name: "Tailored Enterprise Solutions", href: "/tailored-enterprise-solutions" },
        { name: "CRM Case Studies", href: "/crm-case-studies" },
        { name: "ERP Case Studies", href: "/erp-case-studies" },
        { name: "Smart Mobility", href: "/smart-mobility" },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      dropdown: [
        { name: "CRM Solutions", href: "/crm-solutions" },
        { name: "ERP Solutions", href: "/erp-solutions" },
      ],
    },
    { name: "Edge Computing", href: "/edge-computing" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs & News", href: "/blogs-news" },
    { name: "AboutUs", href: "/aboutus" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="https://identifyyou.in/wp-content/uploads/2025/01/id_logo-dark.png"
                alt="Identifyyou Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium text-sm transition-colors"
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white shadow-lg border border-gray-100 rounded-md py-2">
                    {link.dropdown.map((dropLink) => (
                      <Link
                        key={dropLink.name}
                        href={dropLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                      >
                        {dropLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact-us"
              className="bg-black text-white px-6 py-2.5 rounded hover:bg-gray-800 transition-colors font-medium text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.dropdown.map((dropLink) => (
                      <Link
                        key={dropLink.name}
                        href={dropLink.href}
                        className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md"
                      >
                        {dropLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact-us"
              className="block mt-4 px-3 py-2 text-base font-medium text-white bg-black rounded-md text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
