import React from 'react';
import { 
  Wifi, Car, Tv, Flame, Coffee, Compass, 
  Wind, Thermometer, Trees, Compass as Mountains, MapPin, Heart 
} from 'lucide-react';
import { Language, CMSData } from '../types';

interface AmenitiesProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function Amenities({ currentLang, cmsData }: AmenitiesProps) {
  const title = currentLang === 'ge' ? cmsData.texts.amenitiesTitle.ge : cmsData.texts.amenitiesTitle.en;
  const subtitle = currentLang === 'ge' ? cmsData.texts.amenitiesSubtitle.ge : cmsData.texts.amenitiesSubtitle.en;

  const amenityList = [
    {
      icon: <Wifi className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "უფასო WiFi" : "High-speed WiFi",
      desc: currentLang === 'ge' ? "სწრაფი და სტაბილური ინტერნეტი მთელ ტერიტორიაზე დისტანციური მუშაობისთვის." : "Fast & stable fiber connection across the property, perfect for remote workers."
    },
    {
      icon: <Car className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "უფასო პარკინგი" : "Free Private Parking",
      desc: currentLang === 'ge' ? "დაცული და უფასო პარკინგის ზონა თქვენი ავტომობილებისთვის." : "Secure and monitored parking bays reserved exclusively for our guests."
    },
    {
      icon: <Tv className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "სმარტ ტელევიზორი" : "Smart TV & Streaming",
      desc: currentLang === 'ge' ? "Smart TV პრემიუმ არხებით, Netflix-ითა და YouTube მხარდაჭერით." : "Ultra-HD Smart TV with YouTube, Netflix, and screen mirroring capability."
    },
    {
      icon: <Flame className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "სრულად აღჭურვილი სამზარეულო" : "Equipped Kitchen",
      desc: currentLang === 'ge' ? "ყველანაირი ჭურჭელი, გაზქურა, მაცივარი კერძების მოსამზადებლად." : "Premium stove, large fridge, cookware, pans, and all necessary dining items."
    },
    {
      icon: <Coffee className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "ყავის აპარატი" : "Premium Coffee Machine",
      desc: currentLang === 'ge' ? "ესპრესო აპარატი საუკეთესო ხარისხის ყავით თქვენი დილისთვის." : "Start your forest mornings with fresh espresso, with coffee beans pre-stocked."
    },
    {
      icon: <Compass className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "BBQ მაყალი" : "BBQ Grill & Wood",
      desc: currentLang === 'ge' ? "სპეციალური კუთხე მაყალითა და შამფურებით, შეშა უფასოა." : "Dedicated backyard grill and skewers. Firewood is always fully supplied."
    },
    {
      icon: <Wind className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "კონდინცირება" : "Air Conditioning",
      desc: currentLang === 'ge' ? "ინვერტორული კონდიციონერი სასურველი ტემპერატურის შესაქმნელად." : "Modern climate control systems to keep you refreshed during summer days."
    },
    {
      icon: <Thermometer className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "ცენტრალური გათბობა" : "In-floor Central Heating",
      desc: currentLang === 'ge' ? "გათბობის სისტემა და ბუხარი, რაც უზრუნველყოფს სითბოს ზამთარში." : "Complete floor heating and fireplace to guarantee cozy mountain winter retreats."
    },
    {
      icon: <Trees className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "ტყის ხედი" : "Forest View Boundaries",
      desc: currentLang === 'ge' ? "კოტეჯი ესაზღვრება ხელუხლებელ წიწვოვან და ფოთლოვან ტყეებს." : "Step straight out onto nature boundaries bordered by gorgeous mossy forests."
    },
    {
      icon: <Mountains className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "მთის ხედი" : "Mountain Panoramic Views",
      desc: currentLang === 'ge' ? "პანორამული 360-გრადუსიანი ხედები აჭარის მთებსა და ხეობებზე." : "Spectacular, unobstructed views showcasing the wild peaks of Adjara heights."
    },
    {
      icon: <MapPin className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "პირადი ტერასა" : "Private Sunset Terrace",
      desc: currentLang === 'ge' ? "ფართო გარე აივანი მაგიდითა და სავარძლებით განტვირთვისთვის." : "Spacious timber deck fitted with comfortable swings and outdoor armchairs."
    },
    {
      icon: <Heart className="w-8 h-8 text-amber-400" />,
      title: currentLang === 'ge' ? "მშვიდი მდებარეობა" : "100% Peaceful Haven",
      desc: currentLang === 'ge' ? "სრული სიჩუმე, ბუნების ხმები, იზოლირებული ქალაქის ხმაურისგან." : "No highways or neighbor noise, pure tranquility and crisp singing mountain birds."
    }
  ];

  return (
    <section id="amenities" className="py-24 bg-stone-950 border-b border-stone-800 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'კომფორტის დონე' : 'EXCEPTIONAL COMFORT'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {amenityList.map((amenity, idx) => (
            <div 
              key={idx}
              className="p-6 bg-stone-900/40 border border-stone-800/80 rounded-2xl hover:border-amber-400/20 hover:bg-stone-900 transition-all duration-300 shadow-md group"
            >
              <div className="mb-4 p-3 bg-stone-950 rounded-xl w-fit border border-stone-800 group-hover:scale-110 transition-transform">
                {amenity.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide">
                {amenity.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
