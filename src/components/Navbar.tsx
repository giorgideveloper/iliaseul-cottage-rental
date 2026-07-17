import React, { useState } from "react";
import { Menu, X, Globe, User, LogOut, TreePine } from "lucide-react";
import { Language, CMSData } from "../types";
import { translations } from "../translations";

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isAdmin: boolean;
  onAdminClick: () => void;
  cmsData: CMSData;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  activeSection,
  onSectionChange,
  isAdmin,
  onAdminClick,
  cmsData,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang];

  const menuItems = [
    { id: "home", label: t.navHome },
    { id: "cottages", label: t.navCottages },
    { id: "gallery", label: t.navGallery },
    { id: "amenities", label: t.navAmenities },
    { id: "nearby", label: t.navAttractions },
    // { id: "testimonials", label: t.navTestimonials },
    { id: "faq", label: t.navFaq },
    // { id: "about", label: t.navAbout },
    { id: "contact", label: t.navContact },
  ];

  const logoText =
    currentLang === "ge"
      ? cmsData.webSettings.logoTextGe
      : cmsData.webSettings.logoTextEn;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-stone-900/80 backdrop-blur-md border-b border-white/10 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="shrink-0 cursor-pointer flex items-center space-x-2"
            onClick={() => onSectionChange("home")}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center border border-amber-400/40 shadow-inner">
              <TreePine className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="block font-serif text-2xl tracking-wider text-amber-300 font-semibold">
                {logoText}
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-stone-400 uppercase">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-amber-400 font-semibold border-b-2 border-amber-400 rounded-none"
                    : "text-stone-300 hover:text-white hover:bg-stone-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Toolbar Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-stone-800/80 rounded-full p-1 border border-stone-700">
              <button
                onClick={() => onLanguageChange("ge")}
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all duration-200 flex items-center space-x-1 ${
                  currentLang === "ge"
                    ? "bg-amber-500 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>🇬🇪</span>
                <span>ქარ</span>
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all duration-200 flex items-center space-x-1 ${
                  currentLang === "en"
                    ? "bg-amber-500 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>🇬🇧</span>
                <span>ENG</span>
              </button>
            </div>

            {/* Admin Switcher
            <button
              onClick={onAdminClick}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                isAdmin
                  ? "bg-amber-500 hover:bg-amber-600 text-stone-950 border-amber-400"
                  : "bg-stone-800 hover:bg-stone-700 text-amber-300 border-amber-400/20"
              }`}
            >
              <User size={14} />
              <span>{isAdmin ? t.navAdmin : t.navAdmin}</span>
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Lang Button */}
            <button
              onClick={() =>
                onLanguageChange(currentLang === "ge" ? "en" : "ge")
              }
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-stone-800 text-xs text-amber-300 border border-stone-700 font-bold"
            >
              <Globe size={14} />
              <span>{currentLang === "ge" ? "🇬🇧 EN" : "🇬🇪 GE"}</span>
            </button>

            {/* Admin Button */}
            {/* <button
              onClick={onAdminClick}
              className="p-1.5 rounded-md bg-stone-800 text-amber-400 border border-stone-700"
              title="Admin Portal"
            >
              <User size={16} />
            </button> */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-amber-500/10 text-amber-300 border-l-4 border-amber-400 pl-3"
                    : "text-stone-300 hover:bg-stone-900 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Admin Section Link */}
            <button
              onClick={() => {
                onAdminClick();
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center space-x-2 px-4 py-3 text-base font-medium text-amber-300 hover:bg-stone-900 rounded-md border-t border-stone-800"
            >
              <User size={18} />
              <span>
                {isAdmin ? `${t.navAdmin} Dashboard` : `${t.navAdmin} Portal`}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
