import React from 'react';
import { Compass, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { Language, CMSData } from '../types';

interface NearbyAttractionsProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function NearbyAttractions({ currentLang, cmsData }: NearbyAttractionsProps) {
  const title = currentLang === 'ge' ? cmsData.texts.attractionsTitle.ge : cmsData.texts.attractionsTitle.en;
  const subtitle = currentLang === 'ge' ? cmsData.texts.attractionsSubtitle.ge : cmsData.texts.attractionsSubtitle.en;

  const attractions = [
    {
      name: {
        ge: "მაჭახელას ეროვნული პარკი",
        en: "Machakhela National Park"
      },
      desc: {
        ge: "საოცარი ეროვნული პარკი უნიკალური კოლხური ტყეებით, თვალწარმტაცი ჩანჩქერებით, ისტორიული თაღოვანი ხიდებითა და სალაშქრო მარშრუტებით.",
        en: "A stunning National Park featuring lush Colchian rainforests, rushing rivers, medieval stone bridges, and exciting hiking paths."
      },
      dist: "12 km",
      time: "15 mins",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      mapLink: "https://maps.google.com/?q=Machakhela+National+Park+Georgia"
    },
    {
      name: {
        ge: "მირვეთის ჩანჩქერი და თაღოვანი ხიდი",
        en: "Mirveti Waterfall & Stone Bridge"
      },
      desc: {
        ge: "ჯადოსნური, ხავსით დაფარული ბზის კორომები, რომელიც მიგიყვანთ ულამაზეს ჩანჩქერთან და XII საუკუნის შოთა რუსთაველის სახელობის ქვის ხიდთან.",
        en: "A fairytale pathway wrapped in moss-covered boxwood forests leading to a hidden waterfall and an authentic 12th-century stone arch bridge."
      },
      dist: "9 km",
      time: "10 mins",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
      mapLink: "https://maps.google.com/?q=Mirveti+Waterfall+Georgia"
    },
    {
      name: {
        ge: "ბათუმის ბულვარი და სანაპირო",
        en: "Batumi Boulevard & Seaside"
      },
      desc: {
        ge: "შავი ზღვის სანაპირო, კაფეები, რესტორნები და ცოცხალი ქალაქის რიტმი სულ რაღაც 20 წუთის სავალზე თქვენი მშვიდი მთის თავშესაფრიდან.",
        en: "The Black Sea coastline, seaside walkways, exquisite seafood, and vibrant nightlife are located just a short 20-minute drive down the mountains."
      },
      dist: "18 km",
      time: "20 mins",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800", // substitute with general Batumi or modern beach/sea look
      mapLink: "https://maps.google.com/?q=Batumi+Boulevard+Georgia"
    },
    {
      name: {
        ge: "გონიო-აფსაროსის ციხე-სიმაგრე",
        en: "Gonio-Apsaros Roman Fortress"
      },
      desc: {
        ge: "საქართველოს უძველესი რომაული ციხესიმაგრე, რომელიც თარიღდება I საუკუნით, მდიდარი არქეოლოგიური მუზეუმითა და ისტორიით.",
        en: "Georgia's oldest Roman fortress dating back to the 1st century AD, famous for archaeological discoveries and proximity to borders."
      },
      dist: "22 km",
      time: "25 mins",
      image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=800",
      mapLink: "https://maps.google.com/?q=Gonio+Fortress+Georgia"
    }
  ];

  return (
    <section id="nearby" className="py-24 bg-stone-900 border-b border-stone-800 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'გაიცანით აჭარა' : 'EXPLORE ADJARA'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction, i) => {
            const attName = currentLang === 'ge' ? attraction.name.ge : attraction.name.en;
            const attDesc = currentLang === 'ge' ? attraction.desc.ge : attraction.desc.en;

            return (
              <div 
                key={i}
                className="group relative flex flex-col md:flex-row bg-stone-950 border border-stone-850 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/20 transition-all duration-300"
              >
                {/* Photo Side */}
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Distance badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
                      {attraction.dist}
                    </span>
                    <span className="bg-stone-950/80 backdrop-blur-md text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 text-center">
                      {attraction.time}
                    </span>
                  </div>
                </div>

                {/* Text Side */}
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {attName}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      {attDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-900 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest flex items-center space-x-1 font-mono">
                      <MapPin size={10} className="text-amber-500" />
                      <span>{currentLang === 'ge' ? 'ერგედან' : 'from Erge'}</span>
                    </span>
                    
                    <a
                      href={attraction.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-300 hover:text-amber-400 font-semibold tracking-wide flex items-center space-x-1"
                    >
                      <span>{currentLang === 'ge' ? 'მარშრუტი' : 'Get Directions'}</span>
                      <Navigation size={12} className="rotate-45" />
                    </a>
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
