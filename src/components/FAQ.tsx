import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Language, CMSData } from "../types";

interface FAQProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function FAQ({ currentLang, cmsData }: FAQProps) {
  const title =
    currentLang === "ge"
      ? cmsData.texts.faqTitle.ge
      : cmsData.texts.faqTitle.en;
  const subtitle =
    currentLang === "ge"
      ? cmsData.texts.faqSubtitle.ge
      : cmsData.texts.faqSubtitle.en;

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-stone-900 border-b border-stone-800 text-white scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === "ge" ? "კითხვა-პასუხი" : "HELPFUL ANSWERS"}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 font-light">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {cmsData.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const qText =
              currentLang === "ge" ? faq.question.ge : faq.question.en;
            const aText = currentLang === "ge" ? faq.answer.ge : faq.answer.en;

            return (
              <div
                key={faq.id}
                className="bg-stone-950 border border-stone-850 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-stone-900/50 transition-colors focus:outline-none"
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle
                      className="text-amber-400 mt-1 shrink-0"
                      size={18}
                    />
                    <span className="font-serif text-sm md:text-base font-bold text-stone-100 tracking-wide">
                      {qText}
                    </span>
                  </div>

                  <div className="shrink-0 p-1.5 rounded-full bg-stone-900 text-amber-300">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Accordion Collapse Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pl-13 md:pl-14 text-xs md:text-sm text-stone-300 leading-relaxed font-light border-t border-stone-900 pt-3">
                        {aText}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
