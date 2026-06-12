"use client";

import { useState } from "react";
import data from "@/data/api_pipeline_data.json";
import { submitContact } from "@/services/wordpress";

export default function Contact() {
  const contactData = data.find(p => p.slug === 'contact-us');
  
  // Extracting details from API data (or using fallbacks to ensure structural integrity)
  const mainParagraph = contactData?.sections?.paragraphs[0] || "Have a question or want to work together? Leave your details and we will get back to you as soon as possible.";
  const ukHeading = contactData?.sections?.headings.find(h => h.includes("UK")) || "UK Office";
  const indiaHeading = contactData?.sections?.headings.find(h => h.includes("India")) || "India Office";
  
  // Formatted India Address from the extracted paragraphs
  const indiaAddress = contactData?.sections?.paragraphs
    .filter(p => p.includes("Survey") || p.includes("Plot") || p.includes("Floor") || p.includes("Madurai") || p.includes("India 625"))
    .join(" ") || "Survey Number : 149/4, Plot Number : B-3 , First Floor, Pandi Kovil Ring Road, Madurai, Tamil Nadu, India 625 107";

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Submission Status States
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) {
      setStatus("error");
      setStatusText("Please fill out all required fields.");
      return;
    }

    setIsPending(true);
    setStatus(null);
    setStatusText("");

    try {
      const response = await submitContact({ firstName, lastName, email, message });
      if (response.success) {
        setStatus("success");
        setStatusText(response.message);
        // Clear fields on success
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusText(response.message);
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setStatus("error");
      setStatusText("An unexpected network error occurred. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600">
            {mainParagraph}
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-none shadow-sm p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-secondary">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-none bg-white text-primary border border-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-secondary">{ukHeading}</h3>
                  <p className="mt-1 text-gray-600">Flat 2, 3 Northwood Avenue,<br />Purley, London, UK CR8 2ER.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-none bg-white text-primary border border-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-secondary">{indiaHeading}</h3>
                  <p className="mt-1 text-gray-600">{indiaAddress}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-none bg-white text-primary border border-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-secondary">Email</h3>
                  <p className="mt-1 text-gray-600">Support@identifyyou.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-none bg-white text-primary border border-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-secondary">Phone</h3>
                  <p className="mt-1 text-gray-600">+91 9597046682</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-none shadow-sm p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-600 mb-2">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 text-secondary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors disabled:opacity-50"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-600 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isPending}
                    className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 text-secondary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors disabled:opacity-50"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 text-secondary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-2">Message *</label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 text-secondary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {status && (
                <div 
                  className={`p-4 text-sm font-medium border ${
                    status === "success" 
                      ? "bg-green-50 border-green-200 text-green-700" 
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {statusText}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-none uppercase tracking-wider text-sm hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

