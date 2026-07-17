import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  MapPin,
  Tv,
  Coffee,
  Flame,
  Trees,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Language, Cottage, Booking, CMSData } from "../types";
import { translations } from "../translations";

interface CottagesProps {
  currentLang: Language;
  cmsData: CMSData;
  onBookRequest: (
    bookingData: Omit<Booking, "id" | "createdAt" | "status">,
  ) => void;
}

export default function Cottages({
  currentLang,
  cmsData,
  onBookRequest,
}: CottagesProps) {
  const t = translations[currentLang];
  const [selectedCottage, setSelectedCottage] = useState<Cottage | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<
    Record<string, number>
  >({});

  // Booking Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Status/Validation states
  const [formError, setFormError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Amenity icon dictionary
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-4 h-4" />,
    ac: <Wind className="w-4 h-4" />,
    kitchen: <Flame className="w-4 h-4" />,
    coffee: <Coffee className="w-4 h-4" />,
    tv: <Tv className="w-4 h-4" />,
    bbq: <Compass className="w-4 h-4" />,
    terrace: <MapPin className="w-4 h-4" />,
    forest: <Trees className="w-4 h-4" />,
    mountain: <Trees className="w-4 h-4" />,
    heating: <Flame className="w-4 h-4" />,
    parking: <MapPin className="w-4 h-4" />,
    peaceful: <CheckCircle2 className="w-4 h-4" />,
  };

  const getAmenityLabel = (key: string) => {
    // Falls back to key name or translation
    const translationKey = `amenity_${key}`;
    const dict = translations[currentLang] as any;
    return dict[translationKey] || key;
  };

  const nextImage = (cottageId: string, maxImages: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [cottageId]: ((prev[cottageId] || 0) + 1) % maxImages,
    }));
  };

  const prevImage = (cottageId: string, maxImages: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [cottageId]: ((prev[cottageId] || 0) - 1 + maxImages) % maxImages,
    }));
  };

  // Helper: calculate total nights and price
  const calculateBookingDetails = (cottage: Cottage) => {
    if (!checkIn || !checkOut) return { nights: 0, totalPrice: 0 };
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) return { nights: 0, totalPrice: 0 };
    return {
      nights,
      totalPrice: nights * cottage.price,
    };
  };

  const isDateBlocked = (cottageId: string, dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;

    // Check cottage custom availability ranges
    const cottage = cmsData.cottages.find((c) => c.id === cottageId);
    if (cottage) {
      for (const range of cottage.availability) {
        const fromDate = new Date(range.from);
        const toDate = new Date(range.to);
        if (date >= fromDate && date <= toDate) {
          return true;
        }
      }
    }

    // Check confirmed bookings
    const cottageBookings = cmsData.bookings.filter(
      (b) => b.cottageId === cottageId && b.status === "Confirmed",
    );
    for (const b of cottageBookings) {
      const bIn = new Date(b.checkIn);
      const bOut = new Date(b.checkOut);
      if (date >= bIn && date <= bOut) {
        return true;
      }
    }

    return false;
  };

  const handleOpenBooking = (cottage: Cottage) => {
    setSelectedCottage(cottage);
    setCheckIn("");
    setCheckOut("");
    setGuestsCount(2);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCustomerNotes("");
    setFormError("");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCottage) return;

    if (!checkIn || !checkOut) {
      setFormError(
        currentLang === "ge"
          ? "გთხოვთ მიუთითოთ თარიღები"
          : "Please specify check-in & check-out dates",
      );
      return;
    }

    const { nights, totalPrice } = calculateBookingDetails(selectedCottage);
    if (nights <= 0) {
      setFormError(
        currentLang === "ge"
          ? "გასვლის თარიღი უნდა იყოს შესვლის თარიღის შემდეგ!"
          : "Check-out date must be after check-in date!",
      );
      return;
    }

    // Check if dates are already blocked
    let datesAreBlocked = false;
    let tempDate = new Date(checkIn);
    const endTempDate = new Date(checkOut);
    while (tempDate <= endTempDate) {
      const dateStr = tempDate.toISOString().split("T")[0];
      if (isDateBlocked(selectedCottage.id, dateStr)) {
        datesAreBlocked = true;
        break;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }

    if (datesAreBlocked) {
      setFormError(
        currentLang === "ge"
          ? "სამწუხაროდ, არჩეული პერიოდი უკვე დაკავებულია!"
          : "Sorry, some dates in your selected range are already booked!",
      );
      return;
    }

    if (!customerName || !customerPhone) {
      setFormError(
        currentLang === "ge"
          ? "სახელი და ტელეფონი სავალდებულოა"
          : "Name and Phone are required",
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onBookRequest({
        cottageId: selectedCottage.id,
        checkIn,
        checkOut,
        guests: guestsCount,
        customerName,
        customerEmail,
        customerPhone,
        customerNotes,
        totalPrice,
      });

      setIsSubmitting(false);
      setSuccessModal(true);
      setSelectedCottage(null);
    }, 1000);
  };

  return (
    <section
      id="cottages"
      className="py-24 bg-stone-950 text-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === "ge"
              ? "ჩვენი საცხოვრებლები"
              : "PREMIUM ACCOMMODATION"}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {currentLang === "ge"
              ? "აღმოაჩინეთ ილიასეულის კოტეჯები"
              : "Explore Our Luxury Wooden Cottages"}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {currentLang === "ge"
              ? "ორივე ხის კოტეჯი უზრუნველყოფს სრულ სიმშვიდეს, საოცარ ხედებსა და უმაღლესი ხარისხის კომფორტს თქვენი დაუვიწყარი დღეებისთვის."
              : "Our standalone wooden cabins combine pristine wild nature, custom organic designs, and high-end modern comforts."}
          </p>
        </div>

        {/* Cottages List */}
        <div className="space-y-16">
          {cmsData.cottages.map((cottage, index) => {
            const activeImgIdx = activeImageIndexes[cottage.id] || 0;
            const cottageName =
              currentLang === "ge" ? cottage.name.ge : cottage.name.en;
            const cottageDesc =
              currentLang === "ge"
                ? cottage.description.ge
                : cottage.description.en;

            return (
              <div
                key={cottage.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/40 p-6 md:p-8 rounded-3xl border border-stone-800 hover:border-emerald-500/20 transition-all duration-300 shadow-xl ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Cottage Image Slider */}
                <div
                  className={`lg:col-span-6 relative h-75 md:h-105 rounded-2xl overflow-hidden group shadow-lg ${
                    index % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  {/* Slider Control Buttons */}
                  {cottage.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(cottage.id, cottage.images.length)
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-950/70 hover:bg-stone-950/90 flex items-center justify-center border border-white/10 text-white transition-colors"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() =>
                          nextImage(cottage.id, cottage.images.length)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-950/70 hover:bg-stone-950/90 flex items-center justify-center border border-white/10 text-white transition-colors"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Slider Images */}
                  <div className="w-full h-full relative">
                    <img
                      src={cottage.images[activeImgIdx]}
                      alt={cottageName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Index indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      {cottage.images.map((_, imgIdx) => (
                        <span
                          key={imgIdx}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            imgIdx === activeImgIdx
                              ? "bg-amber-400"
                              : "bg-stone-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cottage Information */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Badge and Title */}
                    <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
                      <Sparkles size={14} />
                      <span>
                        {currentLang === "ge"
                          ? "უმაღლესი კლასის კომფორტი"
                          : "PREMIUM LIVING"}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                      {cottageName}
                    </h3>
                    <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light mb-6">
                      {cottageDesc}
                    </p>

                    {/* Standard Specs */}
                    <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-stone-900/80 rounded-xl border border-stone-800 text-center mb-6">
                      <div className="flex flex-col items-center">
                        <Users className="text-amber-400 mb-1" size={18} />
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                          {t.capacity}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {cottage.guests}{" "}
                          {currentLang === "ge" ? "სტუმარი" : "Guests"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center border-x border-stone-800">
                        <Bed className="text-amber-400 mb-1" size={18} />
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                          {t.bedrooms}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {cottage.bedrooms}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Bath className="text-amber-400 mb-1" size={18} />
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                          {t.bathrooms}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {cottage.bathrooms}
                        </span>
                      </div>
                    </div>

                    {/* Quick Bullet Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cottage.amenities.slice(0, 8).map((amenityKey) => (
                        <div
                          key={amenityKey}
                          className="flex items-center space-x-1 px-3 py-1 bg-stone-800/80 border border-stone-700/50 rounded-full text-xs text-stone-300"
                        >
                          {amenityIcons[amenityKey] || (
                            <CheckCircle2 size={12} />
                          )}
                          <span>{getAmenityLabel(amenityKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 pt-6">
                    <div>
                      <span className="text-xs text-stone-400 block uppercase tracking-wider">
                        {currentLang === "ge"
                          ? "ღირებულება"
                          : "Price per night"}
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-serif font-semibold text-amber-300">
                          {cottage.price} ₾
                        </span>
                        <span className="text-xs text-stone-400">
                          / {t.perNight}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(cottage)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:brightness-110 text-stone-950 font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <Calendar size={14} />
                      <span>{t.bookNow}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Booking Slider Modal */}
        <AnimatePresence>
          {selectedCottage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] text-white"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-amber-300">
                      {t.bookTitle}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {currentLang === "ge"
                        ? selectedCottage.name.ge
                        : selectedCottage.name.en}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCottage(null)}
                    className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Validation Banner */}
                {formError && (
                  <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200">
                    {formError}
                  </div>
                )}

                {/* Booking Input Fields */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Step 1: Dates & Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                        {t.checkIn}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={checkIn}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            setFormError("");
                          }}
                          onClick={(e) => {
                            try {
                              (
                                e.currentTarget as HTMLInputElement
                              ).showPicker();
                            } catch {}
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                        {t.checkOut}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          min={
                            checkIn || new Date().toISOString().split("T")[0]
                          }
                          value={checkOut}
                          onChange={(e) => {
                            setCheckOut(e.target.value);
                            setFormError("");
                          }}
                          onClick={(e) => {
                            try {
                              (
                                e.currentTarget as HTMLInputElement
                              ).showPicker();
                            } catch {}
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                        {t.guests}
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) =>
                          setGuestsCount(parseInt(e.target.value))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                      >
                        {[...Array(selectedCottage.guests)].map((_, i) => (
                          <option
                            key={i + 1}
                            value={i + 1}
                            className="bg-stone-900"
                          >
                            {i + 1}{" "}
                            {currentLang === "ge" ? "სტუმარი" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 2: Customer Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +995 599 00 00 00"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">{t.email}</label>
                    <input 
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. customer@gmail.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none"
                    />
                  </div> */}

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                      {t.notes}
                    </label>
                    <textarea
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      rows={3}
                      placeholder={
                        currentLang === "ge"
                          ? "სურვილები, ჩამოსვლის დრო და სხვ..."
                          : "Arrival time, requests, grocery help..."
                      }
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 outline-none resize-none"
                    />
                  </div>

                  {/* Step 3: Real-Time Pricing Summary */}
                  {checkIn && checkOut && (
                    <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                      <div className="flex justify-between items-center text-sm mb-1.5 text-stone-400">
                        <span>
                          {selectedCottage.price} ₾ ×{" "}
                          {calculateBookingDetails(selectedCottage).nights}{" "}
                          {t.nights}
                        </span>
                        <span>
                          {calculateBookingDetails(selectedCottage).totalPrice}{" "}
                          ₾
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-base font-bold border-t border-stone-800 pt-2 text-white">
                        <span>{t.totalPrice}</span>
                        <span className="text-lg text-amber-300">
                          {calculateBookingDetails(selectedCottage).totalPrice}{" "}
                          ₾
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all duration-200 uppercase tracking-wider disabled:opacity-50"
                    >
                      {isSubmitting ? t.submitting : t.bookNow}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {successModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-2xl p-6 text-center shadow-2xl text-white"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2 text-amber-300">
                  {t.successTitle}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                  {t.successMsg}
                </p>
                <button
                  onClick={() => setSuccessModal(false)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all duration-200"
                >
                  {t.close}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
