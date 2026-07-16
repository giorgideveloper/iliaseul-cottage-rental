import React from 'react';
import { Shield, Sparkles, Trees, Flame } from 'lucide-react';
import { Language, CMSData } from '../types';

interface AboutProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function About({ currentLang, cmsData }: AboutProps) {
  const title = currentLang === 'ge' ? cmsData.texts.aboutTitle.ge : cmsData.texts.aboutTitle.en;
  const subtitle = currentLang === 'ge' ? cmsData.texts.aboutSubtitle.ge : cmsData.texts.aboutSubtitle.en;
  const story = currentLang === 'ge' ? cmsData.texts.aboutStory.ge : cmsData.texts.aboutStory.en;

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-amber-400" />,
      title: currentLang === 'ge' ? cmsData.texts.aboutFeature1.ge : cmsData.texts.aboutFeature1.en,
      description: currentLang === 'ge' ? 'ცალკე მდგომი კოტეჯები, შემოღობილი ტერიტორია და სრული განმარტოება.' : 'Completely standalone structures, fenced grounds, and absolute isolation.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: currentLang === 'ge' ? cmsData.texts.aboutFeature2.ge : cmsData.texts.aboutFeature2.en,
      description: currentLang === 'ge' ? 'თანამედროვე ტექნიკა, მყუდრო ავეჯი და პანორამული ვიტრაჟული მინები.' : 'High-tech fittings, rustic handcrafted furniture, and huge panoramic glazing.'
    },
    {
      icon: <Trees className="w-6 h-6 text-amber-400" />,
      title: currentLang === 'ge' ? cmsData.texts.aboutFeature3.ge : cmsData.texts.aboutFeature3.en,
      description: currentLang === 'ge' ? 'ხელვაჩაურის მთების და საუკუნოვანი ტყის უნიკალური ნაზავი.' : 'A unique blend of wild forests and the majestic Adjarian mountain breeze.'
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: currentLang === 'ge' ? cmsData.texts.aboutFeature4.ge : cmsData.texts.aboutFeature4.en,
      description: currentLang === 'ge' ? 'შიდა ბუხარი, თბილი განათება და ხის არომატი, რაც მაქსიმალურ კომფორტს ქმნის.' : 'Cozy indoor stoves, warm architectural lights, and natural wooden aromas.'
    }
  ];

  const aboutImg1 = "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800";
  const aboutImg2 = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800";

  return (
    <section id="about" className="py-24 bg-stone-900 border-b border-stone-800 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'ჩვენი ისტორია' : 'OUR HERITAGE'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2 text-white">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 font-light">
            {subtitle}
          </p>
        </div>

        {/* Content Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Layout (overlapping artistic arrangement) */}
          <div className="relative h-[480px] md:h-[550px] w-full">
            {/* Background card accent */}
            <div className="absolute top-8 left-8 right-0 bottom-0 border-2 border-amber-400/20 rounded-xl" />
            
            {/* Primary large image */}
            <div className="absolute top-0 left-0 w-[78%] h-[82%] rounded-xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src={aboutImg1}
                alt="Cozy Cottage in Woods"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping small image */}
            <div className="absolute bottom-0 right-0 w-[45%] h-[50%] rounded-xl overflow-hidden shadow-2xl border-4 border-stone-900">
              <img
                src={aboutImg2}
                alt="Interior fireplace setup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Texts & Pillars */}
          <div className="space-y-8">
            <div className="text-stone-300 leading-relaxed text-base md:text-lg space-y-4 font-light">
              <p>{story}</p>
              <p className="text-stone-400 text-sm italic">
                {currentLang === 'ge' 
                  ? "* ილიასეულის კოტეჯები განლაგებულია ბათუმიდან 20 კილომეტრში, რაც შესაძლებლობას გაძლევთ დაისვენოთ წყნარ გარემოში და ამავდროულად მარტივად ესტუმროთ ზღვის სანაპიროს."
                  : "* Iliaseul Cabins are located just 20km from Batumi center, allowing you to breathe fresh mountain air while remaining close to the seaside."
                }
              </p>
            </div>

            {/* Pillar Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="p-5 rounded-xl bg-stone-800/40 border border-stone-800 hover:border-amber-400/30 hover:bg-stone-800/60 transition-all duration-300"
                >
                  <div className="mb-3 p-2 bg-stone-900/50 rounded-lg w-fit border border-stone-700/50">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-lg font-medium text-white mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
