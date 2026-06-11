import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white pt-16 pb-8 border-t-[5px] border-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="pr-8">
            <Image
              src="https://identifyyou.in/wp-content/uploads/2025/01/id_logo-dark.png"
              alt="Identifyyou Logo"
              width={160}
              height={40}
              className="h-10 w-auto mb-6 bg-white p-1 rounded"
            />
            <p className="text-gray-300 leading-relaxed text-[15px]">
              At IdentifYou Technologies, we empower your digital transformation journey with tailored solutions that meet diverse business needs.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white border-b-2 border-accent inline-block pb-2 pr-4">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/case-study" className="text-gray-300 hover:text-primary transition-colors text-[15px]">
                  Case Study
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors text-[15px]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-primary transition-colors text-[15px]">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/blogs-news" className="text-gray-300 hover:text-primary transition-colors text-[15px]">
                  Blogs & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white border-b-2 border-accent inline-block pb-2 pr-4">Contact</h3>
            <ul className="space-y-6">
              <li>
                <strong className="text-white block mb-2 text-[17px]">UK Office</strong>
                <span className="text-gray-300 text-[15px] leading-relaxed block">
                  Flat 2, 3 Northwood Avenue,<br />Purley, London, UK CR8 2ER.
                </span>
              </li>
              <li>
                <strong className="text-white block mb-2 text-[17px]">India Office</strong>
                <span className="text-gray-300 text-[15px] leading-relaxed block">
                  Survey Number : 149/4,<br />Plot Number : B-3,<br />First Floor, Pandi Kovil Ring Road,<br />Madurai,<br />Tamil Nadu, India 625 107
                </span>
              </li>
              <li className="flex items-center mt-6">
                <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-white font-medium">Support@identifyyou.in</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-white font-medium">+91 9597046682</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white border-b-2 border-accent inline-block pb-2 pr-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333] pt-6 flex justify-center items-center">
          <p className="text-gray-400 text-[14px]">
            &copy; Copyright 2025 || All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
