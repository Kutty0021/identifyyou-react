"use client";

import { useState, useEffect } from 'react';
import { getPageDataBySlug } from '@/utils/dataFetcher';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

export default function Page() {
  const pageData = getPageDataBySlug('gallery');
  const pageTitle = pageData?.title || "Gallery";
  const images = pageData?.images || [];
  
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Key bindings for lightbox navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % images.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, images.length]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIdx]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader title={pageTitle} />
      
      <div className="py-20 max-w-[1200px] mx-auto px-5 w-full bg-white">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((imgUrl, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedIdx(idx)}
                className="relative aspect-square rounded-none overflow-hidden shadow-sm border border-gray-100 group bg-gray-50 cursor-pointer"
              >
                <Image
                  src={imgUrl}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">No gallery images found.</div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 select-none">
          {/* Backdrop close click */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedIdx(null)}></div>
          
          {/* Close button */}
          <button 
            onClick={() => setSelectedIdx(null)}
            className="absolute top-5 right-5 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={() => setSelectedIdx((selectedIdx - 1 + images.length) % images.length)}
              className="absolute left-5 z-10 w-14 h-14 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={() => setSelectedIdx((selectedIdx + 1) % images.length)}
              className="absolute right-5 z-10 w-14 h-14 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Centered Image */}
          <div className="relative max-w-full max-h-[90vh] flex flex-col justify-center items-center z-10 pointer-events-none">
            <div className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[80vh]">
              <Image
                src={images[selectedIdx]}
                alt={`Lightbox gallery image ${selectedIdx + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-white/60 text-sm font-semibold select-none">
              {selectedIdx + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
