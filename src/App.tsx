import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Compass,
  Sparkles,
  MapPin,
  MessageSquare,
  Facebook,
  Instagram,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { Language, CMSData, Booking } from "./types";
import { defaultCMSData } from "./defaultData";
import { translations } from "./translations";

// Subcomponents
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Cottages from "./components/Cottages";
import Gallery from "./components/Gallery";
import Amenities from "./components/Amenities";
import NearbyAttractions from "./components/NearbyAttractions";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>("ge");
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  // Footer lightboxes
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const t = translations[currentLang];

  // 1. Initial State Load from LocalStorage
  useEffect(() => {
    const savedCMS = localStorage.getItem("iliaseul_cms_data");
    if (savedCMS) {
      try {
        setCmsData(JSON.parse(savedCMS));
      } catch (err) {
        console.error("Error loading CMS data from localstorage", err);
      }
    } else {
      localStorage.setItem("iliaseul_cms_data", JSON.stringify(defaultCMSData));
    }

    const savedLang = localStorage.getItem("iliaseul_lang") as Language;
    if (savedLang === "ge" || savedLang === "en") {
      setCurrentLang(savedLang);
    }
  }, []);

  // 2. SEO Meta Title update in Browser Title Tab
  useEffect(() => {
    const titleText =
      currentLang === "ge"
        ? cmsData.webSettings.metaTitleGe
        : cmsData.webSettings.metaTitleEn;
    document.title =
      titleText ||
      (currentLang === "ge"
        ? "ილიასეული • კოტეჯები ერგეში"
        : "Iliaseul Cottage Resort");
  }, [currentLang, cmsData]);

  // 3. Save Language preference
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem("iliaseul_lang", lang);
  };

  // 4. Save and Update CMS Data
  const handleUpdateCMSData = (newData: CMSData) => {
    setCmsData(newData);
    localStorage.setItem("iliaseul_cms_data", JSON.stringify(newData));
  };

  // 5. Submit Booking Request
  const handleBookingRequest = (
    bookingDetails: Omit<Booking, "id" | "createdAt" | "status">,
  ) => {
    const newBooking: Booking = {
      ...bookingDetails,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    const updatedBookings = [newBooking, ...cmsData.bookings];
    handleUpdateCMSData({
      ...cmsData,
      bookings: updatedBookings,
    });
  };

  // 6. Smooth Scroll navigation helper
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowAdmin(false);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 7. Active Scroll Section Tracker
  useEffect(() => {
    if (showAdmin) return;

    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "cottages",
        "gallery",
        "amenities",
        "nearby",
        "testimonials",
        "faq",
        "contact",
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        if (section === "home" && window.scrollY < 100) {
          setActiveSection("home");
          continue;
        }
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAdmin]);

  const logoText =
    currentLang === "ge"
      ? cmsData.webSettings.logoTextGe
      : cmsData.webSettings.logoTextEn;

  return (
    <div className="min-h-screen bg-stone-950 font-sans selection:bg-amber-400 selection:text-stone-950 antialiased overflow-x-hidden relative">
      {/* Immersive Theme Background Atmospheric Layer */}
      <div className="fixed top-0 right-0 w-2/3 h-full overflow-hidden pointer-events-none z-0 opacity-40 w-[100%]">
        <div className="absolute inset-0 bg-gradient-to-l from-stone-900 via-transparent to-stone-900 z-10" />
        <div
          className="w-full h-full bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1024')",
          }}
        />
      </div>

      {/* Vertical Design Accents */}
      <div className="fixed top-0 left-0 w-[1px] h-full bg-amber-500/20 z-30 pointer-events-none hidden md:block" />
      <div className="fixed top-1/2 left-0 w-10 h-[1px] bg-amber-500/30 z-30 pointer-events-none hidden md:block" />

      {/* 1. Navbar */}
      {!showAdmin && (
        <Navbar
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isAdmin={showAdmin}
          onAdminClick={() => setShowAdmin(!showAdmin)}
          cmsData={cmsData}
        />
      )}

      <AnimatePresence mode="wait">
        {showAdmin ? (
          /* 2. Admin Dashboard View */
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pt-0"
          >
            <AdminDashboard
              currentLang={currentLang}
              cmsData={cmsData}
              onUpdateCMSData={handleUpdateCMSData}
              onClose={() => setShowAdmin(false)}
            />
          </motion.div>
        ) : (
          /* 3. Primary User Facing Website View */
          <motion.div
            key="user-website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Pages & Sections */}
            <Hero
              currentLang={currentLang}
              cmsData={cmsData}
              onExploreClick={() => handleSectionChange("cottages")}
              onBookClick={() => handleSectionChange("cottages")}
            />

            <About currentLang={currentLang} cmsData={cmsData} />

            <Cottages
              currentLang={currentLang}
              cmsData={cmsData}
              onBookRequest={handleBookingRequest}
            />

            <Gallery currentLang={currentLang} cmsData={cmsData} />

            <Amenities currentLang={currentLang} cmsData={cmsData} />

            <NearbyAttractions currentLang={currentLang} cmsData={cmsData} />

            <Testimonials currentLang={currentLang} cmsData={cmsData} />

            <FAQ currentLang={currentLang} cmsData={cmsData} />

            <Contact currentLang={currentLang} cmsData={cmsData} />

            {/* Premium Bilingual Footer */}
            <footer className="bg-stone-900 border-t border-stone-850 py-16 text-white select-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-stone-850">
                  {/* Brand column */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center border border-amber-400/40">
                        <span className="font-serif text-lg font-bold text-amber-300">
                          ი
                        </span>
                      </div>
                      <span className="font-serif text-2xl tracking-wider text-amber-300 font-semibold">
                        {logoText}
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                      {currentLang === "ge"
                        ? "პრემიუმ კლასის ხის კოტეჯები ერგეში, გარშემორტყმული საუკუნოვანი ტყეებითა და მთების ხედებით. მყუდროება, უსაფრთხოება და კომფორტი თქვენი საუკეთესო დასვენებისთვის."
                        : "Premium wooden cabins located in Erge Village, Georgia. Unmatched moss forest environments, safety bounds, and state-of-the-art comforting amenities."}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center space-x-3 pt-2">
                      <a
                        href={cmsData.contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-400/10 transition-colors"
                      >
                        <Facebook size={16} />
                      </a>
                      <a
                        href={cmsData.contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-400/10 transition-colors"
                      >
                        <Instagram size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Quick navigation */}
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
                      {currentLang === "ge" ? "ნავიგაცია" : "Explore"}
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-400">
                      <li>
                        <button
                          onClick={() => handleSectionChange("home")}
                          className="hover:text-amber-300 transition-colors"
                        >
                          {t.navHome}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSectionChange("about")}
                          className="hover:text-amber-300 transition-colors"
                        >
                          {t.navAbout}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSectionChange("cottages")}
                          className="hover:text-amber-300 transition-colors"
                        >
                          {t.navCottages}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSectionChange("gallery")}
                          className="hover:text-amber-300 transition-colors"
                        >
                          {t.navGallery}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSectionChange("contact")}
                          className="hover:text-amber-300 transition-colors"
                        >
                          {t.navContact}
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Location Column */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                      {currentLang === "ge" ? "მდებარეობა" : "Location"}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      {currentLang === "ge"
                        ? cmsData.contact.address.ge
                        : cmsData.contact.address.en}
                    </p>
                    <div className="text-xs text-amber-300">
                      <span className="font-semibold block">
                        {cmsData.contact.phone}
                      </span>
                      <span className="block font-light text-[10px] text-stone-500 font-mono">
                        {cmsData.contact.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subfooter (copyright + privacy popup links) */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
                  <div>
                    © {new Date().getFullYear()} {logoText}.{" "}
                    {t.allRightsReserved}
                  </div>
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setShowPrivacy(true)}
                      className="hover:text-amber-300 transition-colors focus:outline-none"
                    >
                      {t.privacy}
                    </button>
                    <button
                      onClick={() => setShowTerms(true)}
                      className="hover:text-amber-300 transition-colors focus:outline-none"
                    >
                      {t.terms}
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIVACY POLICY MODAL */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-4 text-white"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-stone-900 border border-stone-800 w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl font-bold text-amber-300 mb-4">
                {t.privacy}
              </h3>
              <div className="text-xs md:text-sm text-stone-300 leading-relaxed space-y-4 font-light">
                <p>
                  {currentLang === "ge"
                    ? "ჩვენთვის უმნიშვნელოვანესია თქვენი პერსონალური მონაცემების დაცვა. ილიასეულის კოტეჯების ჯავშნების სისტემა აგროვებს თქვენს სახელს, ტელეფონის ნომერს და ელ-ფოსტას მხოლოდ და მხოლოდ ჯავშნების განსახორციელებლად და დასადასტურებლად."
                    : "Your privacy is extremely important to us. The Iliaseul Cottage Resort reservation engine collects customer names, telephone numbers, and email accounts for the sole purpose of validating and processing your stay bookings."}
                </p>
                <p>
                  {currentLang === "ge"
                    ? "ეს მონაცემები არასოდეს გადაეცემა მესამე პირებს ან სარეკლამო კომპანიებს. ნებისმიერ დროს შეგიძლიათ მოგვთხოვოთ თქვენი მონაცემების სრული წაშლა ბაზიდან."
                    : "This dataset is never shared with third-party networks or marketing brokers. You can request the absolute removal of your details from our databases at any time."}
                </p>
              </div>
              <button
                onClick={() => setShowPrivacy(false)}
                className="mt-6 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
              >
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TERMS & CONDITIONS MODAL */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-4 text-white"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-stone-900 border border-stone-800 w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl font-bold text-amber-300 mb-4">
                {t.terms}
              </h3>
              <div className="text-xs md:text-sm text-stone-300 leading-relaxed space-y-4 font-light">
                <p>
                  {currentLang === "ge"
                    ? "1. კოტეჯში შესვლა (Check-In) ხდება 14:00 საათიდან, ხოლო გასვლა (Check-Out) 12:00 საათამდე."
                    : "1. Check-In starts from 14:00 (2:00 PM) on the day of arrival, and Check-Out is strictly before 12:00 (12:00 PM) noon."}
                </p>
                <p>
                  {currentLang === "ge"
                    ? "2. გთხოვთ, გაუფრთხილდეთ კოტეჯის ინვენტარს და დაიცვათ უსაფრთხოების წესები BBQ ზონაში."
                    : "2. Guests are requested to respect all cabin assets and strictly adhere to fire safety guidelines in our outdoor BBQ area."}
                </p>
                <p>
                  {currentLang === "ge"
                    ? "3. ჯავშნის გაუქმება შესაძლებელია უფასოდ ჩამოსვლამდე 5 დღით ადრე. სხვა შემთხვევაში თანხა უკან არ ბრუნდება."
                    : "3. Booking cancellations can be processed free of charge up to 5 days prior to arrival. Late cancellations will not trigger refunds."}
                </p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-6 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
              >
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
