import React from 'react';
import { Star, Quote, QuoteIcon } from 'lucide-react';
import { Language, Review, CMSData } from '../types';

interface TestimonialsProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function Testimonials({ currentLang, cmsData }: TestimonialsProps) {
  const title = currentLang === 'ge' ? cmsData.texts.testimonialsTitle.ge : cmsData.texts.testimonialsTitle.en;
  const subtitle = currentLang === 'ge' ? cmsData.texts.testimonialsSubtitle.ge : cmsData.texts.testimonialsSubtitle.en;

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-stone-700'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-stone-950 border-b border-stone-800 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'სტუმრების გამოხმაურება' : 'GUEST REVIEWS'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cmsData.reviews.map((review) => {
            const reviewText = currentLang === 'ge' ? review.text.ge : review.text.en;

            return (
              <div 
                key={review.id}
                className="relative bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col justify-between hover:border-amber-400/10 transition-all duration-300"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-6 text-stone-800 pointer-events-none">
                  <Quote size={32} />
                </div>

                <div>
                  {/* Stars Rating */}
                  <div className="mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Text */}
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light mb-6 italic">
                    "{reviewText}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 border-t border-stone-850 pt-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-400/20 flex items-center justify-center text-sm font-bold text-amber-300 uppercase tracking-wider shadow-inner">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">
                      {review.authorName}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {review.date}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
