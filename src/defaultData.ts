import { CMSData } from "./types";

export const defaultCMSData: CMSData = {
  cottages: [
    {
      id: "cottage-1",
      name: {
        ge: "პრემიუმ კოტეჯი ტყის ხედით",
        en: "Premium Forest View Cottage",
      },
      description: {
        ge: "აღმოაჩინეთ მყუდროება ჩვენს ორსართულიან პრემიუმ კოტეჯში. კოტეჯი გარშემორტყმულია საუკუნოვანი ტყით და გთავაზობთ სრულ კონფიდენციალურობას, პანორამულ ტერასას, სადაც შეგიძლიათ დატკბეთ დილის ყავითა და მთების ულამაზესი ხედებით. იდეალურია წყვილებისა და ოჯახებისთვის.",
        en: "Discover tranquility in our two-story premium wooden cottage. Surrounded by an ancient forest, it offers complete privacy, a panoramic terrace to enjoy your morning coffee, and breathtaking mountain views. Ideal for couples and families looking to unplug and reconnect.",
      },
      price: 220,
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: [
        "wifi",
        "parking",
        "ac",
        "heating",
        "kitchen",
        "coffee",
        "tv",
        "bbq",
        "terrace",
        "forest",
        "mountain",
        "peaceful",
      ],
      images: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000",
      ],
      availability: [{ from: "2026-08-10", to: "2026-08-15" }],
    },
    {
      id: "cottage-2",
      name: {
        ge: "ლუქს პანორამული კოტეჯი",
        en: "Luxury Panoramic Cabin",
      },
      description: {
        ge: "ჩვენი მდიდრული პანორამული კოტეჯი გამოირჩევა დიდი შუშის ვიტრაჟებით, საიდანაც იშლება მომაჯადოებელი ხედები ერგეს ხეობასა და ჩამავალ მზეზე. აღჭურვილია უმაღლესი ხარისხის ავეჯით, ბუხრით, თანამედროვე სამზარეულოთი და ფართო აივნით. შექმნილია მათთვის, ვინც ეძებს მაქსიმალურ კომფორტს ბუნების წიაღში.",
        en: "Our luxurious panoramic wooden cabin features massive floor-to-ceiling glass windows that display a magical landscape of the Erge valley and sunset. Equipped with premium furniture, an indoor fireplace, a state-of-the-art kitchen, and a spacious terrace. Crafted for those seeking ultimate luxury in nature.",
      },
      price: 280,
      guests: 5,
      bedrooms: 2,
      bathrooms: 1,
      amenities: [
        "wifi",
        "parking",
        "ac",
        "heating",
        "kitchen",
        "coffee",
        "tv",
        "bbq",
        "terrace",
        "forest",
        "mountain",
        "peaceful",
      ],
      images: [
        "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1000",
      ],
      availability: [{ from: "2026-07-22", to: "2026-07-25" }],
    },
  ],
  bookings: [
    {
      id: "booking-101",
      cottageId: "cottage-1",
      checkIn: "2026-07-20",
      checkOut: "2026-07-23",
      guests: 2,
      customerName: "მარიამ ბერიძე",
      customerEmail: "mariam.b@gmail.com",
      customerPhone: "+995 599 12 34 56",
      customerNotes:
        "გთხოვთ ყავის მარცვლები დაგვიხვედროთ აპარატისთვის. მადლობა!",
      status: "Confirmed",
      totalPrice: 660,
      createdAt: "2026-07-15T14:30:00Z",
    },
    {
      id: "booking-102",
      cottageId: "cottage-2",
      checkIn: "2026-07-28",
      checkOut: "2026-07-31",
      guests: 4,
      customerName: "John Smith",
      customerEmail: "john.smith@gmail.com",
      customerPhone: "+1 202 555 0143",
      customerNotes: "Honeymoon stay, looking forward to the mountain sunsets!",
      status: "Pending",
      totalPrice: 840,
      createdAt: "2026-07-16T09:12:00Z",
    },
  ],
  reviews: [
    {
      id: "review-1",
      authorName: "გიორგი მახარაძე",
      rating: 5,
      text: {
        ge: "საოცარი ადგილია! ხედები პირდაპირ ტყეზე და მთებზე განსაკუთრებულ სიმშვიდეს განიჭებს. კოტეჯი არის ძალიან სუფთა, მყუდრო და ყველანაირად კეთილმოწყობილი. მასპინძლები საოცრად თბილი ხალხია. აუცილებლად დავბრუნდებით კიდევ ბევრჯერ!",
        en: "An absolutely magical place! The direct views of the forests and mountains bring incredible peace. The cabin is super clean, cozy, and fully equipped with everything you could need. The hosts are incredibly warm. We will definitely visit again!",
      },
      date: "2026-06-12",
    },
    {
      id: "review-2",
      authorName: "Sophia Richardson",
      rating: 5,
      text: {
        ge: "ილიასეული საუკეთესო კოტეჯია, სადაც კი ოდესმე ვყოფილვარ საქართველოში. ვიტრაჟებიდან ჩამავალი მზის ყურება უბრალოდ თვალწარმტაცია. საწოლები საოცრად კომფორტულია, სამზარეულოში კი ყველაფერია მოსამზადებლად. ტყის სიახლოვე საოცარ ჰაერს ქმნის.",
        en: "Iliaseul is by far the best cabin experience I have had in Georgia. Watching the sunset through the massive glass windows was jaw-dropping. The beds are extremely comfortable, and the kitchen has all utensils. Close to the forest, the air is pure.",
      },
      date: "2026-07-01",
    },
    {
      id: "review-3",
      authorName: "ლაშა ჩხეიძე",
      rating: 5,
      text: {
        ge: "სრული კონფიდენციალურობა, საოცარი სიმშვიდე და კომფორტი. ტერასა და BBQ ზონა იდეალურია მეგობრებთან ერთად საღამოს გასატარებლად. ინტერნეტი მუშაობდა ძალიან სწრაფად, რაც მუშაობის საშუალებასაც მაძლევდა. 10/10!",
        en: "Complete privacy, exceptional silence, and extreme luxury. The terrace and BBQ area are ideal for spending the evening with friends. The Wi-Fi was super fast, which let me do some remote work easily. Highly recommended!",
      },
      date: "2026-07-10",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: {
        ge: "როგორ ხდება დაჯავშნის დადასტურება?",
        en: "How is my booking reservation confirmed?",
      },
      answer: {
        ge: "საიტზე ჯავშნის მოთხოვნის გაგზავნის შემდეგ, ჩვენი ადმინისტრატორი განიხილავს თქვენს განაცხადს და დაგიკავშირდებათ მითითებულ ტელეფონის ნომერზე ან WhatsApp-ში დეტალების შესათანხმებლად და ჯავშნის დასადასტურებლად.",
        en: "After sending a booking request on our website, our administrator will review your application and contact you directly on your phone or WhatsApp to verify details and confirm your stay.",
      },
    },
    {
      id: "faq-2",
      question: {
        ge: "რა შედის კოტეჯის ღირებულებაში?",
        en: "What amenities are included in the nightly rate?",
      },
      answer: {
        ge: "ღირებულებაში შედის კოტეჯის სრული გამოყენება, თეთრეული, პირსახოცები, ჰიგიენური საშუალებები, უფასო ყავა და ჩაი, სწრაფი WiFi, BBQ ხელსაწყოები და შეშა, პარკინგი და ყველა საყოფაცხოვრებო ტექნიკა.",
        en: "The price includes entire cabin access, premium bed sheets, bath towels, hygiene kits, complimentary coffee & tea, high-speed Wi-Fi, BBQ charcoal/firewood tools, secure parking, and all kitchen/heating appliances.",
      },
    },
    {
      id: "faq-3",
      question: {
        ge: "შესაძლებელია თუ არა შინაური ცხოველების მოყვანა?",
        en: "Are pets allowed in the cottages?",
      },
      answer: {
        ge: "დიახ, ჩვენ ძალიან გვიყვარს ოთხფეხა მეგობრები! შინაური ცხოველების განთავსება ნებადართულია წინასწარი შეთანხმებით, ყოველგვარი დამატებითი საფასურის გარეშე.",
        en: "Yes, we are pet-friendly! Well-behaved pets are welcome to join your stay with prior notice, completely free of any extra charges.",
      },
    },
    {
      id: "faq-4",
      question: {
        ge: "როდის არის შესვლის (Check-In) და გასვლის (Check-Out) დრო?",
        en: "What are the standard Check-In and Check-Out times?",
      },
      answer: {
        ge: "შემოსვლა (Check-In) იწყება 14:00 საათიდან, ხოლო გასვლა (Check-Out) ხდება 12:00 საათამდე. თავისუფალი დღეების არსებობის შემთხვევაში, შესაძლებელია დროის ინდივიდუალურად შეთანხმებაც.",
        en: "Standard Check-In starts from 14:00 (2:00 PM), and Check-Out is until 12:00 (12:00 PM). If there are no immediate bookings on those days, we can adjust these times upon request.",
      },
    },
  ],
  gallery: [
    {
      id: "g-1",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000",
      category: "Exterior",
      title: {
        ge: "კოტეჯის ექსტერიერი ზამთარში",
        en: "Cottage Exterior in Winter",
      },
    },
    {
      id: "g-2",
      url: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1000",
      category: "Exterior",
      title: {
        ge: "თანამედროვე ხის არქიტექტურა",
        en: "Modern Wooden Architecture",
      },
    },
    {
      id: "g-3",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000",
      category: "Interior",
      title: {
        ge: "მყუდრო მისაღები ოთახი და ბუხარი",
        en: "Cozy Living Room & Fireplace",
      },
    },
    {
      id: "g-4",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000",
      category: "Bedroom",
      title: {
        ge: "კომფორტული საძინებელი ტყის ხედით",
        en: "Comfortable Bedroom with Forest View",
      },
    },
    {
      id: "g-5",
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
      category: "Kitchen",
      title: {
        ge: "სრულად აღჭურვილი სამზარეულო ზონა",
        en: "Fully Equipped Modern Kitchen",
      },
    },
    {
      id: "g-6",
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1000",
      category: "Bathroom",
      title: {
        ge: "თანამედროვე აბაზანა ესთეტიური დეტალებით",
        en: "Modern Aesthetic Bathroom",
      },
    },
    {
      id: "g-7",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
      category: "Views",
      title: {
        ge: "მზის ამოსვლა ერგეს მთებიდან",
        en: "Sunrise over Erge Hills",
      },
    },
    {
      id: "g-8",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
      category: "Views",
      title: {
        ge: "პანორამული ხედი მთებზე ტერასიდან",
        en: "Panoramic Mountain View from Terrace",
      },
    },
  ],
  contact: {
    phone: "+995 599 88 88 88",
    email: "info@iliaseul.ge",
    whatsapp: "https://wa.me/995599888888",
    facebook: "https://facebook.com/iliaseul.erge",
    instagram: "https://instagram.com/iliaseul.cottages",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11933.243577777174!2d41.6912345!3d41.5645312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a66fbcba86cb0f%3A0x6b49e6f21221f15d!2sErge%2C%20Georgia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    address: {
      ge: "სოფელი ერგე, ხელვაჩაურის მუნიციპალიტეტი, აჭარა, საქართველო",
      en: "Erge Village, Khelvachauri Municipality, Adjara, Georgia",
    },
  },
  webSettings: {
    logoTextGe: "ილიასეული",
    logoTextEn: "Iliaseul",
    metaTitleGe: "ილიასეული • იდეალური ხის კოტეჯები ერგეში",
    metaTitleEn: "Iliaseul • Luxury Wooden Cottages in Erge, Georgia",
    metaDescriptionGe:
      "დასვენება ერგეში, აჭარაში. ორი მდიდრული ხის კოტეჯი იდეალური ხედებით, კომფორტით, ტერასითა და ტყის პირას. დაჯავშნეთ თქვენი უქმეები ახლავე.",
    metaDescriptionEn:
      "Escape to luxury wooden cottages in Erge Village, Georgia. Unmatched mountain and forest views, peaceful environment, and modern amenities. Secure your stay.",
    defaultLanguage: "ge",
  },
  texts: {
    heroTitle: {
      ge: "გაიქეცით ბუნებაში",
      en: "Escape to Nature",
    },
    heroSubtitle: {
      ge: "განიცადეთ მყუდრო და მდიდრული ცხოვრება მთის ფერდობზე, გარშემორტყმული საუკუნოვანი ტყითა და საოცარი პანორამული ხედებით.",
      en: "Experience peaceful hillside living in our luxury wooden cottages surrounded by dense forests and beautiful mountain views.",
    },
    heroBookBtn: {
      ge: "დაჯავშნე ახლავე",
      en: "Book Now",
    },
    heroExploreBtn: {
      ge: "აღმოაჩინე კოტეჯები",
      en: "Explore Cabins",
    },
    aboutTitle: {
      ge: "ილიასეულის ისტორია",
      en: "The Story of Iliaseul",
    },
    aboutSubtitle: {
      ge: "ბუნებასთან ჰარმონია და თანამედროვე კომფორტი",
      en: "Harmony with Nature & Modern Comfort",
    },
    aboutStory: {
      ge: "ილიასეული შეიქმნა იმისათვის, რომ შემოგთავაზოთ სრულყოფილი განტვირთვა ხმაურიანი ქალაქისგან. მდებარეობს ულამაზეს სოფელ ერგეში, ხელვაჩაურის რაიონში, ბათუმიდან სულ რაღაც 20 წუთის სავალზე, მთის ფერდობზე. ჩვენი ორი ეკოლოგიურად სუფთა ხის კოტეჯი აშენებულია მაღალი ხარისხის მასალებით და აერთიანებს რუსტიკულ სილამაზეს თანამედროვე ფუფუნებასთან. აქ დაგხვდებათ სრული სიმშვიდე, ხელუხლებელი ბუნება, ტყის შრიალი და განსაცვიფრებელი ხედები, რაც თქვენს დასვენებას დაუვიწყარს გახდის.",
      en: "Iliaseul was created to offer an ideal shelter from the noisy city tempo. Located on a peaceful hillside in the gorgeous Erge Village, just 20 minutes away from Batumi, our resort consists of two premium wooden cabins. Built using eco-friendly materials, they blend rustic wood charm with luxury details. Here, complete privacy, wild forest landscapes, rustling leaves, and breathtaking sunsets await to turn your vacation into a refreshing memory.",
    },
    aboutFeature1: {
      ge: "სრული კონფიდენციალურობა",
      en: "Absolute Privacy",
    },
    aboutFeature2: {
      ge: "მდიდრული დიზაინი",
      en: "Premium Luxury Design",
    },
    aboutFeature3: {
      ge: "საუკუნოვანი ტყე",
      en: "Ancient Forests",
    },
    aboutFeature4: {
      ge: "მყუდრო გარემო",
      en: "Cozy Atmosphere",
    },
    amenitiesTitle: {
      ge: "ყველაფერი თქვენი კომფორტისთვის",
      en: "Premium Amenities",
    },
    amenitiesSubtitle: {
      ge: "ჩვენი კოტეჯები აღჭურვილია უმაღლესი ხარისხის საყოფაცხოვრებო ნივთებითა და თანამედროვე ტექნიკით სრულყოფილი დასვენებისთვის.",
      en: "Our cottages are thoughtfully fitted with top-tier appliances, high-speed connectivity, and rustic wooden details.",
    },
    galleryTitle: {
      ge: "ილიასეულის მომენტები",
      en: "Moments of Iliaseul",
    },
    gallerySubtitle: {
      ge: "დაათვალიერეთ ჩვენი კოტეჯების ექსტერიერისა და ინტერიერის ულამაზესი ფოტოები.",
      en: "Take a visual journey through our exquisite cabin interior, breathtaking scenery, and nature trails.",
    },
    attractionsTitle: {
      ge: "აღმოაჩინე გარემო",
      en: "Nearby Wonders",
    },
    attractionsSubtitle: {
      ge: "ერგე საუკეთესო წერტილია ულამაზესი აჭარის ღირსშესანიშნაობების მოსანახულებლად.",
      en: "Erge Village is an incredible base camp to explore the historic sights and trails of Adjara.",
    },
    testimonialsTitle: {
      ge: "რას ამბობენ ჩვენი სტუმრები",
      en: "What Our Guests Say",
    },
    testimonialsSubtitle: {
      ge: "გაეცანით ჩვენი დამსვენებლების გულწრფელ ემოციებსა და გამოცდილებას.",
      en: "Read genuine feedback and impressions from people who experienced the comfort of Iliaseul.",
    },
    faqTitle: {
      ge: "ხშირად დასმული კითხვები",
      en: "Frequently Asked Questions",
    },
    faqSubtitle: {
      ge: "გაქვთ კითხვები დაჯავშნის ან კოტეჯის პირობების შესახებ? იხილეთ ჩვენი პასუხები.",
      en: "Find answers to the most common inquiries regarding pricing, policies, and facilities.",
    },
    contactTitle: {
      ge: "დაგვიკავშირდით",
      en: "Get in Touch",
    },
    contactSubtitle: {
      ge: "მზად ხართ დაუვიწყარი დღეებისთვის? დაგვიკავშირდით ნებისმიერ დროს ტელეფონით, სოციალური ქსელებით ან შეავსეთ ფორმა.",
      en: "Ready to start your mountain retreat? Contact us via phone, WhatsApp, social networks, or use the form.",
    },
  },
};
