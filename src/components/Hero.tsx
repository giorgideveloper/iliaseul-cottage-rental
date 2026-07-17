import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, ChevronDown } from "lucide-react";
import { Language, CMSData } from "../types";

interface HeroProps {
  currentLang: Language;
  cmsData: CMSData;
  onExploreClick: () => void;
  onBookClick: () => void;
}

export default function Hero({
  currentLang,
  cmsData,
  onExploreClick,
  onBookClick,
}: HeroProps) {
  const title =
    currentLang === "ge"
      ? cmsData.texts.heroTitle.ge
      : cmsData.texts.heroTitle.en;
  const subtitle =
    currentLang === "ge"
      ? cmsData.texts.heroSubtitle.ge
      : cmsData.texts.heroSubtitle.en;
  const bookBtnText =
    currentLang === "ge"
      ? cmsData.texts.heroBookBtn.ge
      : cmsData.texts.heroBookBtn.en;
  const exploreBtnText =
    currentLang === "ge"
      ? cmsData.texts.heroExploreBtn.ge
      : cmsData.texts.heroExploreBtn.en;

  const [videoError, setVideoError] = useState(false);

  const heroBg =
    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=1600";
  const youtubeId = "ekSRmPqRjvE";

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background: YouTube video or fallback image */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Iliaseul Hero Video"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
              onError={() => setVideoError(true)}
            />
          </>
        ) : (
          <img
            src={heroBg}
            alt="Iliaseul Luxury Cottage Background"
            className="w-full h-full object-cover scale-105 filter brightness-[1] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-900/40 to-stone-950/70" />
      </div>

      {/* Decorative Forest Grid Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-stone-950/20 to-stone-950/90 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center select-none flex flex-col items-center">
        {/* Little decorative badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 flex items-center space-x-2 bg-emerald-950/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>
            {currentLang === "ge"
              ? "მოგესალმებით ილიასეულში"
              : "WELCOME TO ILIASEUL"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 drop-shadow-2xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="text-stone-200 text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-10 drop-shadow font-light"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          {/* Book Now (Glow effects, deep green/amber accents) */}
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:brightness-110 text-stone-950 font-bold uppercase tracking-widest text-xs rounded-sm shadow-[0_0_25px_rgba(197,160,89,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Calendar size={14} />
            <span>{bookBtnText}</span>
          </button>

          {/* Explore (Glassmorphic look) */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-10 py-4 glass text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            {/* <img src="/assets/fb.svg.webp" alt="" className="w-6 h-6" />{" "} */}
            {exploreBtnText}
          </button>
        </motion.div>
      </div>

      {/* Down arrow scroll helper */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-stone-400 text-[10px] tracking-widest uppercase mb-2 animate-pulse">
          {currentLang === "ge" ? "ჩამოცურება" : "SCROLL DOWN"}
        </span>
        <button
          onClick={onExploreClick}
          className="p-2 rounded-full border border-stone-700 hover:border-stone-400 text-stone-400 hover:text-white transition-all duration-300 animate-bounce"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}
