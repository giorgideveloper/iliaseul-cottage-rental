export type Language = 'ge' | 'en';

export interface LocalizedString {
  ge: string;
  en: string;
}

export interface Cottage {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[]; // keys like 'wifi', 'ac', 'kitchen', etc.
  images: string[];
  availability: { from: string; to: string }[]; // blocked date ranges
}

export interface Booking {
  id: string;
  cottageId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: LocalizedString;
  date: string;
}

export interface FAQItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string; // 'Exterior' | 'Interior' | 'Bedroom' | 'Kitchen' | 'Bathroom' | 'Views'
  title: LocalizedString;
}

export interface ContactSettings {
  phone: string;
  email: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  mapUrl: string;
  address: LocalizedString;
}

export interface WebSettings {
  logoTextGe: string;
  logoTextEn: string;
  metaTitleGe: string;
  metaTitleEn: string;
  metaDescriptionGe: string;
  metaDescriptionEn: string;
  defaultLanguage: 'ge' | 'en';
}

export interface ContentTexts {
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  heroBookBtn: LocalizedString;
  heroExploreBtn: LocalizedString;
  aboutTitle: LocalizedString;
  aboutSubtitle: LocalizedString;
  aboutStory: LocalizedString;
  aboutFeature1: LocalizedString;
  aboutFeature2: LocalizedString;
  aboutFeature3: LocalizedString;
  aboutFeature4: LocalizedString;
  amenitiesTitle: LocalizedString;
  amenitiesSubtitle: LocalizedString;
  galleryTitle: LocalizedString;
  gallerySubtitle: LocalizedString;
  attractionsTitle: LocalizedString;
  attractionsSubtitle: LocalizedString;
  testimonialsTitle: LocalizedString;
  testimonialsSubtitle: LocalizedString;
  faqTitle: LocalizedString;
  faqSubtitle: LocalizedString;
  contactTitle: LocalizedString;
  contactSubtitle: LocalizedString;
}

export interface CMSData {
  cottages: Cottage[];
  bookings: Booking[];
  reviews: Review[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
  contact: ContactSettings;
  webSettings: WebSettings;
  texts: ContentTexts;
}
