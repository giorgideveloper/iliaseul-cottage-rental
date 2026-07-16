import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import { Language, GalleryItem, CMSData } from '../types';

interface GalleryProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function Gallery({ currentLang, cmsData }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'All', ge: 'ყველა', en: 'All' },
    { key: 'Exterior', ge: 'ექსტერიერი', en: 'Exterior' },
    { key: 'Interior', ge: 'ინტერიერი', en: 'Interior' },
    { key: 'Bedroom', ge: 'საძინებელი', en: 'Bedroom' },
    { key: 'Kitchen', ge: 'სამზარეულო', en: 'Kitchen' },
    { key: 'Bathroom', ge: 'აბაზანა', en: 'Bathroom' },
    { key: 'Views', ge: 'ხედები', en: 'Scenic Views' }
  ];

  // Filter gallery items
  const filteredItems = activeCategory === 'All' 
    ? cmsData.gallery 
    : cmsData.gallery.filter(item => item.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section id="gallery" className="py-24 bg-stone-900 border-b border-stone-800 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'ჩვენი გალერეა' : 'VISUAL RETREAT'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {currentLang === 'ge' ? cmsData.texts.galleryTitle.ge : cmsData.texts.galleryTitle.en}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {currentLang === 'ge' ? cmsData.texts.gallerySubtitle.ge : cmsData.texts.gallerySubtitle.en}
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 text-xs font-medium tracking-wider uppercase rounded-full border transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-lg shadow-amber-500/15'
                  : 'bg-stone-850 text-stone-300 border-stone-800 hover:text-white hover:bg-stone-800'
              }`}
            >
              {currentLang === 'ge' ? cat.ge : cat.en}
            </button>
          ))}
        </div>

        {/* Masonry-style Dynamic Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-stone-950/30 rounded-2xl border border-stone-800/80">
            <ImageIcon className="mx-auto text-stone-600 mb-3" size={40} />
            <p className="text-stone-400 text-sm">
              {currentLang === 'ge' ? 'ამ კატეგორიაში ფოტოები არ არის.' : 'No photos found in this category.'}
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const itemTitle = currentLang === 'ge' ? item.title.ge : item.title.en;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer border border-stone-800 bg-stone-950 shadow-md"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <img
                      src={item.url}
                      alt={itemTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark Glass Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block bg-amber-500 text-stone-950 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded mb-2">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
                          {itemTitle}
                        </h4>
                        <div className="flex items-center space-x-1.5 text-amber-400 text-xs mt-1.5">
                          <Eye size={12} />
                          <span>{currentLang === 'ge' ? 'დეტალურად ნახვა' : 'Click to zoom'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Immersive Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/95 flex flex-col justify-between p-4"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between py-2 text-white z-10">
                <span className="text-xs text-stone-400 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length} • {filteredItems[lightboxIndex].category}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Slide Panel */}
              <div className="relative grow flex items-center justify-center">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-white z-10"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Main Image */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-5xl max-h-[75vh] md:max-h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-stone-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredItems[lightboxIndex].url}
                    alt={currentLang === 'ge' ? filteredItems[lightboxIndex].title.ge : filteredItems[lightboxIndex].title.en}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-white z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Description Footer */}
              <div className="text-center py-4 text-white z-10" onClick={(e) => e.stopPropagation()}>
                <h4 className="font-serif text-lg md:text-xl font-semibold text-amber-300">
                  {currentLang === 'ge' ? filteredItems[lightboxIndex].title.ge : filteredItems[lightboxIndex].title.en}
                </h4>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest">
                  {currentLang === 'ge' ? 'სოფელი ერგე • ილიასეული' : 'Erge Village • Iliaseul Resort'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
