import React, { useState } from "react";
import {
  BarChart3,
  Calendar,
  Home,
  FileText,
  Image,
  Settings,
  Trash2,
  Check,
  X,
  Shield,
  Plus,
  Edit3,
  Eye,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  LogOut,
  Lock,
  Download,
  Upload,
} from "lucide-react";
import {
  Language,
  Cottage,
  Booking,
  Review,
  FAQItem,
  GalleryItem,
  ContactSettings,
  WebSettings,
  CMSData,
} from "../types";
import { translations } from "../translations";
import ImageUploader from "./ImageUploader";

interface AdminDashboardProps {
  currentLang: Language;
  cmsData: CMSData;
  onUpdateCMSData: (newData: CMSData) => void;
  onClose: () => void;
  preAuthenticated?: boolean;
}

export default function AdminDashboard({
  currentLang,
  cmsData,
  onUpdateCMSData,
  onClose,
  preAuthenticated = false,
}: AdminDashboardProps) {
  const t = translations[currentLang];
  const [isLoggedIn, setIsLoggedIn] = useState(preAuthenticated);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab control state
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "bookings" | "cottages" | "cms" | "media" | "settings"
  >("dashboard");

  // Language toggler inside CMS tab
  const [cmsEditLang, setCmsEditLang] = useState<Language>("ge");

  // Interactive Form Editing States
  const [editingCottage, setEditingCottage] = useState<Cottage | null>(null);
  const [newBlockedFrom, setNewBlockedFrom] = useState("");
  const [newBlockedTo, setNewBlockedTo] = useState("");

  // Media upload state
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaCat, setNewMediaCat] = useState("Exterior");
  const [newMediaTitleGe, setNewMediaTitleGe] = useState("");
  const [newMediaTitleEn, setNewMediaTitleEn] = useState("");

  // FAQ Add state
  const [faqQGe, setFaqQGe] = useState("");
  const [faqQEn, setFaqQEn] = useState("");
  const [faqAGe, setFaqAGe] = useState("");
  const [faqAEn, setFaqAEn] = useState("");

  // Testimonial Add state
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewGe, setReviewGe] = useState("");
  const [reviewEn, setReviewEn] = useState("");

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin" || passwordInput === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError(
        currentLang === "ge"
          ? "არასწორი პაროლი! გამოიყენეთ: admin"
          : "Incorrect password! Use: admin",
      );
    }
  };

  // Helper functions to update CMS lists and trigger state persistence
  const updateBookings = (updated: Booking[]) => {
    onUpdateCMSData({ ...cmsData, bookings: updated });
  };

  const updateCottages = (updated: Cottage[]) => {
    onUpdateCMSData({ ...cmsData, cottages: updated });
  };

  const updateFaqs = (updated: FAQItem[]) => {
    onUpdateCMSData({ ...cmsData, faqs: updated });
  };

  const updateReviews = (updated: Review[]) => {
    onUpdateCMSData({ ...cmsData, reviews: updated });
  };

  const updateGallery = (updated: GalleryItem[]) => {
    onUpdateCMSData({ ...cmsData, gallery: updated });
  };

  const handleBookingStatus = (
    id: string,
    status: "Confirmed" | "Cancelled",
  ) => {
    const updated = cmsData.bookings.map((b) =>
      b.id === id ? { ...b, status } : b,
    );
    updateBookings(updated);
  };

  const handleBookingDelete = (id: string) => {
    if (
      window.confirm(
        currentLang === "ge"
          ? "ნამდვილად გსურთ ამ ჯავშნის წაშლა?"
          : "Are you sure you want to delete this booking?",
      )
    ) {
      const updated = cmsData.bookings.filter((b) => b.id !== id);
      updateBookings(updated);
    }
  };

  const handleCottageSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCottage) return;
    const updated = cmsData.cottages.map((c) =>
      c.id === editingCottage.id ? editingCottage : c,
    );
    updateCottages(updated);
    setEditingCottage(null);
    alert(t.savedSuccess);
  };

  const handleAddBlockedRange = () => {
    if (!editingCottage || !newBlockedFrom || !newBlockedTo) return;
    const updatedAvailability = [
      ...editingCottage.availability,
      { from: newBlockedFrom, to: newBlockedTo },
    ];
    setEditingCottage({ ...editingCottage, availability: updatedAvailability });
    setNewBlockedFrom("");
    setNewBlockedTo("");
  };

  const handleRemoveBlockedRange = (index: number) => {
    if (!editingCottage) return;
    const updatedAvailability = editingCottage.availability.filter(
      (_, i) => i !== index,
    );
    setEditingCottage({ ...editingCottage, availability: updatedAvailability });
  };

  const handleMediaUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      url: newMediaUrl,
      category: newMediaCat,
      title: {
        ge: newMediaTitleGe || "ახალი ფოტო",
        en: newMediaTitleEn || "New Photo",
      },
    };
    updateGallery([newItem, ...cmsData.gallery]);
    setNewMediaUrl("");
    setNewMediaTitleGe("");
    setNewMediaTitleEn("");
    alert(t.savedSuccess);
  };

  const handleMediaDelete = (id: string) => {
    if (
      window.confirm(
        currentLang === "ge"
          ? "ნამდვილად გსურთ ფოტოს წაშლა?"
          : "Are you sure you want to delete this photo?",
      )
    ) {
      const updated = cmsData.gallery.filter((item) => item.id !== id);
      updateGallery(updated);
    }
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQGe || !faqQEn || !faqAGe || !faqAEn) return;
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: { ge: faqQGe, en: faqQEn },
      answer: { ge: faqAGe, en: faqAEn },
    };
    updateFaqs([...cmsData.faqs, newItem]);
    setFaqQGe("");
    setFaqQEn("");
    setFaqAGe("");
    setFaqAEn("");
    alert(t.savedSuccess);
  };

  const handleFaqDelete = (id: string) => {
    const updated = cmsData.faqs.filter((f) => f.id !== id);
    updateFaqs(updated);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewGe || !reviewEn) return;
    const newItem: Review = {
      id: `review-${Date.now()}`,
      authorName: reviewAuthor,
      rating: reviewRating,
      text: { ge: reviewGe, en: reviewEn },
      date: new Date().toISOString().split("T")[0],
    };
    updateReviews([newItem, ...cmsData.reviews]);
    setReviewAuthor("");
    setReviewGe("");
    setReviewEn("");
    alert(t.savedSuccess);
  };

  const handleReviewDelete = (id: string) => {
    const updated = cmsData.reviews.filter((r) => r.id !== id);
    updateReviews(updated);
  };

  const handleContactSave = (key: keyof ContactSettings, value: any) => {
    const updatedContact = { ...cmsData.contact, [key]: value };
    onUpdateCMSData({ ...cmsData, contact: updatedContact });
  };

  const handleContactAddressSave = (lang: Language, val: string) => {
    const updatedAddress = { ...cmsData.contact.address, [lang]: val };
    const updatedContact = { ...cmsData.contact, address: updatedAddress };
    onUpdateCMSData({ ...cmsData, contact: updatedContact });
  };

  const handleWebSettingsSave = (key: keyof WebSettings, value: any) => {
    const updatedSettings = { ...cmsData.webSettings, [key]: value };
    onUpdateCMSData({ ...cmsData, webSettings: updatedSettings });
  };

  const handleTextCMSChange = (
    sectionKey: keyof typeof cmsData.texts,
    lang: Language,
    val: string,
  ) => {
    const updatedTextSection = { ...cmsData.texts[sectionKey], [lang]: val };
    const updatedTexts = { ...cmsData.texts, [sectionKey]: updatedTextSection };
    onUpdateCMSData({ ...cmsData, texts: updatedTexts });
  };

  // Drag & drop file upload simulator (stores as base64)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setNewMediaUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Precalculated Stats
  const totalInquiries = cmsData.bookings.length;
  const confirmedInquiries = cmsData.bookings.filter(
    (b) => b.status === "Confirmed",
  );
  const totalRevenue = confirmedInquiries.reduce(
    (sum, b) => sum + b.totalPrice,
    0,
  );

  // Default login gate screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top visual accents */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-500 via-amber-500 to-emerald-700" />

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center rounded-2xl mx-auto mb-4">
              <Shield size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wide">
              {t.adminLogin}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {currentLang === "ge"
                ? "ილიასეული • მართვის პანელი"
                : "Iliaseul Cottage Resort CMS Portal"}
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@iliaseul.ge"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                {t.password}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl tracking-wider uppercase transition-colors text-sm"
            >
              {t.login}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-4 py-2.5 bg-stone-850 hover:bg-stone-800 text-xs font-semibold text-stone-300 rounded-xl transition-colors border border-stone-800"
          >
            {t.backToWeb}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top Header Panel */}
      <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-amber-400/30">
            <Shield size={18} className="text-amber-300" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-white tracking-wide">
              {t.adminDashboard}
            </h1>
            <span className="text-[10px] text-stone-400 tracking-wider uppercase">
              {currentLang === "ge"
                ? "ილიასეული ილიასეული • CMS v1.2"
                : "ILIASEUL CMS v1.2"}
            </span>
          </div>
        </div>

        {/* Header Toolbar */}
        <div className="flex items-center space-x-3">
          {/* Web preview shortcut */}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold rounded-lg text-amber-300 border border-stone-700 flex items-center space-x-1.5"
          >
            <Eye size={12} />
            <span>
              {currentLang === "ge" ? "საიტის ნახვა" : "Preview Site"}
            </span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("iliaseul_admin_token");
              localStorage.removeItem("iliaseul_admin_username");
              if (preAuthenticated) {
                window.location.href = "/admin";
              } else {
                setIsLoggedIn(false);
              }
            }}
            className="p-1.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 transition-colors"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main CMS Split Columns */}
      <div className="grow flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-stone-900 border-r border-stone-800 p-4 space-y-1.5 shrink-0">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <BarChart3 size={18} />
            <span>{t.tabDashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "bookings"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Calendar size={18} />
              <span>{t.tabBookings}</span>
            </div>
            {cmsData.bookings.filter((b) => b.status === "Pending").length >
              0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                {cmsData.bookings.filter((b) => b.status === "Pending").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("cottages")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "cottages"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <Home size={18} />
            <span>{t.tabCottages}</span>
          </button>

          <button
            onClick={() => setActiveTab("cms")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "cms"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <FileText size={18} />
            <span>{t.tabCMS}</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "media"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <Image size={18} />
            <span>{t.tabMedia}</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-300 hover:bg-stone-800"
            }`}
          >
            <Settings size={18} />
            <span>{t.tabSettings}</span>
          </button>
        </aside>

        {/* Primary Screen Area */}
        <main className="grow p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          {/* TAB 1: DASHBOARD STATS */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t.statsTitle}
                </h2>
                <p className="text-xs text-stone-400">
                  {currentLang === "ge"
                    ? "ილიასეულის ბიზნეს მაჩვენებლები"
                    : "Key rental business performance counters"}
                </p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase block">
                    {t.totalBookings}
                  </span>
                  <div className="text-3xl font-serif font-bold text-white mt-1">
                    {totalInquiries}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 block italic">
                    {currentLang === "ge"
                      ? "სისტემაში სულ შესული"
                      : "All lifetime logs"}
                  </span>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase block">
                    {t.confirmedBookings}
                  </span>
                  <div className="text-3xl font-serif font-bold text-emerald-400 mt-1">
                    {confirmedInquiries.length}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 block italic">
                    {currentLang === "ge"
                      ? "დადასტურებული ჯავშნები"
                      : "Currently active bookings"}
                  </span>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase block">
                    {t.revenue}
                  </span>
                  <div className="text-3xl font-serif font-bold text-amber-300 mt-1">
                    {totalRevenue} ₾
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 block italic">
                    {currentLang === "ge"
                      ? "დადასტურებული შემოსავალი"
                      : "Earned stay revenues"}
                  </span>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase block">
                    {t.visitors}
                  </span>
                  <div className="text-3xl font-serif font-bold text-sky-400 mt-1">
                    2,410
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 block italic">
                    {currentLang === "ge"
                      ? "სტუმარი ბოლო 30 დღეში"
                      : "Visitors past 30 days"}
                  </span>
                </div>
              </div>

              {/* Graphic simulated graph for revenue curves */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                <h3 className="font-serif text-base font-bold text-white mb-6">
                  {currentLang === "ge"
                    ? "შემოსავლის მრუდი თვეების მიხედვით"
                    : "Stay Analytics Curve"}
                </h3>
                {/* SVG Visual Graphic */}
                <div className="h-64 flex items-end justify-between space-x-2 pt-4 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 border-t border-stone-800/40" />
                  <div className="absolute inset-x-0 top-1/3 border-t border-stone-800/40" />
                  <div className="absolute inset-x-0 top-2/3 border-t border-stone-800/40" />

                  {/* Bars representing simulated bookings */}
                  {[
                    { label: "Jan", val: 30 },
                    { label: "Feb", val: 45 },
                    { label: "Mar", val: 70 },
                    { label: "Apr", val: 60 },
                    { label: "May", val: 120 },
                    { label: "Jun", val: 180 },
                    { label: "Jul", val: 240 },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="grow flex flex-col items-center group relative"
                    >
                      {/* Bar and tooltip */}
                      <div
                        className="bg-amber-500/20 group-hover:bg-amber-500/35 border-t-2 border-amber-400 rounded-t-md w-full max-w-10 transition-all duration-300"
                        style={{ height: `${item.val}px` }}
                      />
                      <span className="text-[10px] text-stone-400 mt-2 font-mono">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity lists */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md">
                <h3 className="font-serif text-base font-bold text-white mb-4">
                  {t.recentActivity}
                </h3>
                <div className="divide-y divide-stone-800">
                  {cmsData.bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-stone-200">
                          {booking.customerName}
                        </span>
                        <span className="text-stone-500 block">
                          Cottage:{" "}
                          {booking.cottageId === "cottage-1"
                            ? "Premium Cabin"
                            : "Luxury Panoramic"}{" "}
                          • {booking.checkIn} to {booking.checkOut}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : booking.status === "Cancelled"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS LIST */}
          {activeTab === "bookings" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t.navCottages} {t.tabBookings}
                </h2>
                <p className="text-xs text-stone-400">
                  {currentLang === "ge"
                    ? "შემოსული დადასტურებული და გაუქმებული ჯავშნების მონიტორინგი"
                    : "Moderate stay reservations and verify customer contact logs"}
                </p>
              </div>

              {/* Table list */}
              {cmsData.bookings.length === 0 ? (
                <div className="text-center py-20 bg-stone-900 border border-stone-800 rounded-2xl">
                  <Calendar className="mx-auto text-stone-600 mb-3" size={40} />
                  <p className="text-stone-400 text-sm">{t.noBookings}</p>
                </div>
              ) : (
                <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-950 border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                          <th className="p-4">
                            {currentLang === "ge" ? "სახელი" : "Customer"}
                          </th>
                          <th className="p-4">
                            {currentLang === "ge" ? "კოტეჯი" : "Cabin"}
                          </th>
                          <th className="p-4">
                            {currentLang === "ge" ? "თარიღები" : "Dates"}
                          </th>
                          <th className="p-4">{t.guests}</th>
                          <th className="p-4">{t.totalPrice}</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {cmsData.bookings.map((booking) => {
                          const cabin = cmsData.cottages.find(
                            (c) => c.id === booking.cottageId,
                          );
                          const cabinName = cabin
                            ? currentLang === "ge"
                              ? cabin.name.ge
                              : cabin.name.en
                            : booking.cottageId;

                          return (
                            <tr
                              key={booking.id}
                              className="hover:bg-stone-900/50 transition-colors"
                            >
                              <td className="p-4">
                                <span className="font-bold text-stone-200 block">
                                  {booking.customerName}
                                </span>
                                <span className="text-stone-400 text-[10px] block font-mono">
                                  {booking.customerPhone}
                                </span>
                                {booking.customerEmail && (
                                  <span className="text-stone-500 text-[10px] block font-mono">
                                    {booking.customerEmail}
                                  </span>
                                )}
                                {booking.customerNotes && (
                                  <span className="text-amber-400/80 bg-amber-500/5 border border-amber-500/10 p-1.5 rounded block mt-1 text-[10px] max-w-xs leading-relaxed italic">
                                    "{booking.customerNotes}"
                                  </span>
                                )}
                              </td>
                              <td className="p-4 font-semibold text-stone-300">
                                {cabinName}
                              </td>
                              <td className="p-4">
                                <div className="font-mono text-stone-200">
                                  In: {booking.checkIn}
                                </div>
                                <div className="font-mono text-stone-400">
                                  Out: {booking.checkOut}
                                </div>
                              </td>
                              <td className="p-4 text-stone-300">
                                {booking.guests}
                              </td>
                              <td className="p-4 font-bold text-amber-300">
                                {booking.totalPrice} ₾
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                                    booking.status === "Confirmed"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : booking.status === "Cancelled"
                                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  }`}
                                >
                                  {booking.status === "Pending"
                                    ? t.statusPending
                                    : booking.status === "Confirmed"
                                      ? t.statusConfirmed
                                      : t.statusCancelled}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center items-center gap-1.5">
                                  {booking.status === "Pending" && (
                                    <button
                                      onClick={() =>
                                        handleBookingStatus(
                                          booking.id,
                                          "Confirmed",
                                        )
                                      }
                                      className="p-1 rounded bg-emerald-500 hover:bg-emerald-600 text-stone-950 transition-colors"
                                      title={t.approve}
                                    >
                                      <Check size={14} />
                                    </button>
                                  )}

                                  {booking.status !== "Cancelled" && (
                                    <button
                                      onClick={() =>
                                        handleBookingStatus(
                                          booking.id,
                                          "Cancelled",
                                        )
                                      }
                                      className="p-1 rounded bg-stone-800 hover:bg-red-500/20 text-red-400 hover:text-white border border-stone-700 transition-colors"
                                      title={t.cancel}
                                    >
                                      <X size={14} />
                                    </button>
                                  )}

                                  <button
                                    onClick={() =>
                                      handleBookingDelete(booking.id)
                                    }
                                    className="p-1 rounded bg-stone-800 hover:bg-red-500 text-stone-400 hover:text-white border border-stone-700 transition-colors"
                                    title={t.delete}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COTTAGES MANAGEMENT */}
          {activeTab === "cottages" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t.tabCottages}{" "}
                  {currentLang === "ge" ? "მართვა" : "Management"}
                </h2>
                <p className="text-xs text-stone-400">
                  {currentLang === "ge"
                    ? "შეცვალეთ კოტეჯების ფასები, აღწერილობა, სურათები და აუთვისებელი კალენდარული დღეები"
                    : "Modify pricing rates, custom amenities, galleries, and date blockage schedules"}
                </p>
              </div>

              {editingCottage ? (
                /* Edit Cottage Sub-Form */
                <form
                  onSubmit={handleCottageSave}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                    <h3 className="font-serif text-lg font-bold text-amber-300">
                      {currentLang === "ge"
                        ? "კოტეჯის რედაქტირება"
                        : "Edit Cabin Particulars"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingCottage(null)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Name fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Name (ქართული)
                      </label>
                      <input
                        type="text"
                        value={editingCottage.name.ge}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            name: {
                              ...editingCottage.name,
                              ge: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Name (English)
                      </label>
                      <input
                        type="text"
                        value={editingCottage.name.en}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            name: {
                              ...editingCottage.name,
                              en: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Description fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Description (ქართული)
                      </label>
                      <textarea
                        value={editingCottage.description.ge}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            description: {
                              ...editingCottage.description,
                              ge: e.target.value,
                            },
                          })
                        }
                        rows={4}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Description (English)
                      </label>
                      <textarea
                        value={editingCottage.description.en}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            description: {
                              ...editingCottage.description,
                              en: e.target.value,
                            },
                          })
                        }
                        rows={4}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Numeric Fields */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Price (GEL)
                      </label>
                      <input
                        type="number"
                        value={editingCottage.price}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Max Guests
                      </label>
                      <input
                        type="number"
                        value={editingCottage.guests}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            guests: parseInt(e.target.value),
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={editingCottage.bedrooms}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            bedrooms: parseInt(e.target.value),
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={editingCottage.bathrooms}
                        onChange={(e) =>
                          setEditingCottage({
                            ...editingCottage,
                            bathrooms: parseInt(e.target.value),
                          })
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Availability Range Blockage CMS */}
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <h4 className="text-xs text-amber-300 font-bold mb-3 uppercase tracking-wider">
                      {currentLang === "ge"
                        ? "დაჯავშნილი/დაბლოკილი თარიღები"
                        : "Blocked Stay Dates (Reservations / Maintenance)"}
                    </h4>

                    {/* Add blocked range */}
                    <div className="flex flex-col sm:flex-row gap-3 items-end mb-4">
                      <div className="grow grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                            From
                          </label>
                          <input
                            type="date"
                            value={newBlockedFrom}
                            onChange={(e) => setNewBlockedFrom(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                            To
                          </label>
                          <input
                            type="date"
                            value={newBlockedTo}
                            onChange={(e) => setNewBlockedTo(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBlockedRange}
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs text-amber-300 border border-stone-700 rounded-lg font-bold flex items-center space-x-1"
                      >
                        <Plus size={12} />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Current list */}
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {editingCottage.availability.map((range, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1 px-3 bg-stone-900 rounded-lg border border-stone-800/80 text-xs"
                        >
                          <span className="font-mono text-stone-300">
                            {range.from} {currentLang === "ge" ? "დან" : "to"}{" "}
                            {range.to}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlockedRange(idx)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-stone-800 rounded transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image lists */}
                  <div>
                    <label className="block text-xs text-stone-400 mb-2 font-medium">
                      სურათები
                    </label>
                    <div className="space-y-2">
                      {editingCottage.images.map((img, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          {img && (
                            <img
                              src={img}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-700"
                            />
                          )}
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => {
                              const updatedImgs = [...editingCottage.images];
                              updatedImgs[idx] = e.target.value;
                              setEditingCottage({
                                ...editingCottage,
                                images: updatedImgs,
                              });
                            }}
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-300"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImgs = editingCottage.images.filter(
                                (_, i) => i !== idx,
                              );
                              setEditingCottage({
                                ...editingCottage,
                                images: updatedImgs,
                              });
                            }}
                            className="p-1.5 rounded bg-stone-800 hover:bg-red-500 text-stone-400 hover:text-white shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Upload new image for cottage */}
                    <div className="mt-3 p-3 bg-stone-950/60 border border-stone-800 rounded-xl">
                      <ImageUploader
                        label={currentLang === "ge" ? "ახალი სურათის ატვირთვა" : "Upload new image"}
                        compact
                        onImageReady={(url) =>
                          setEditingCottage({
                            ...editingCottage,
                            images: [...editingCottage.images, url],
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingCottage(null)}
                      className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold rounded-lg text-stone-300"
                    >
                      {t.close}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg uppercase tracking-wider"
                    >
                      {t.saveChanges}
                    </button>
                  </div>
                </form>
              ) : (
                /* Primary Grid list */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cmsData.cottages.map((cottage) => {
                    const cName =
                      currentLang === "ge" ? cottage.name.ge : cottage.name.en;

                    return (
                      <div
                        key={cottage.id}
                        className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-md"
                      >
                        <img
                          src={cottage.images[0]}
                          alt={cName}
                          className="w-full h-48 object-cover border-b border-stone-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-6">
                          <h3 className="font-serif text-lg font-bold text-white mb-2">
                            {cName}
                          </h3>
                          <div className="text-xs text-stone-400 space-y-1 mb-4">
                            <div>
                              Price per night:{" "}
                              <span className="font-bold text-amber-300">
                                {cottage.price} ₾
                              </span>
                            </div>
                            <div>
                              Capacity:{" "}
                              <span className="font-semibold text-stone-300">
                                {cottage.guests} {t.guests}
                              </span>{" "}
                              • Rooms:{" "}
                              <span className="font-semibold text-stone-300">
                                {cottage.bedrooms} bed / {cottage.bathrooms}{" "}
                                bath
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setEditingCottage(cottage)}
                            className="w-full py-2.5 bg-stone-850 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs font-semibold text-amber-300 tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5"
                          >
                            <Edit3 size={12} />
                            <span>
                              {currentLang === "ge"
                                ? "კოტეჯის მართვა"
                                : "Configure Cabin"}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CMS PAGE CONTENT EDITOR */}
          {activeTab === "cms" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {t.tabCMS} Editor
                  </h2>
                  <p className="text-xs text-stone-400">
                    {currentLang === "ge"
                      ? "საიტის ტექსტების და გვერდების ორენოვანი რედაქტორი"
                      : "Manage static page titles, body stories, and accordion FAQs"}
                  </p>
                </div>

                {/* Sub language selector */}
                <div className="flex items-center space-x-1 bg-stone-950 rounded-lg p-1 border border-stone-850">
                  <button
                    onClick={() => setCmsEditLang("ge")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      cmsEditLang === "ge"
                        ? "bg-amber-500 text-stone-950"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    🇬🇪 ქარ
                  </button>
                  <button
                    onClick={() => setCmsEditLang("en")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      cmsEditLang === "en"
                        ? "bg-amber-500 text-stone-950"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    🇬🇧 ENG
                  </button>
                </div>
              </div>

              {/* Editable Areas Accordion Grid */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
                <h3 className="font-serif text-base font-bold text-amber-300 pb-3 border-b border-stone-800 flex items-center space-x-2">
                  <Sparkles size={16} />
                  <span>
                    {cmsEditLang === "ge"
                      ? "გვერდების ტექსტების რედაქტორი"
                      : "Edit Website Copywriting"}{" "}
                    ({cmsEditLang.toUpperCase()})
                  </span>
                </h3>

                {/* HERO EDITOR */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    1. Hero Section
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={cmsData.texts.heroTitle[cmsEditLang]}
                        onChange={(e) =>
                          handleTextCMSChange(
                            "heroTitle",
                            cmsEditLang,
                            e.target.value,
                          )
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Hero Subtitle
                      </label>
                      <textarea
                        value={cmsData.texts.heroSubtitle[cmsEditLang]}
                        onChange={(e) =>
                          handleTextCMSChange(
                            "heroSubtitle",
                            cmsEditLang,
                            e.target.value,
                          )
                        }
                        rows={2}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ABOUT STORY EDITOR */}
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    2. About Section (Story)
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={cmsData.texts.aboutTitle[cmsEditLang]}
                        onChange={(e) =>
                          handleTextCMSChange(
                            "aboutTitle",
                            cmsEditLang,
                            e.target.value,
                          )
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Section Subtitle
                      </label>
                      <input
                        type="text"
                        value={cmsData.texts.aboutSubtitle[cmsEditLang]}
                        onChange={(e) =>
                          handleTextCMSChange(
                            "aboutSubtitle",
                            cmsEditLang,
                            e.target.value,
                          )
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        The Main Story Paragraph
                      </label>
                      <textarea
                        value={cmsData.texts.aboutStory[cmsEditLang]}
                        onChange={(e) =>
                          handleTextCMSChange(
                            "aboutStory",
                            cmsEditLang,
                            e.target.value,
                          )
                        }
                        rows={5}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-xs text-white resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* TESTIMONIAL MANAGERS */}
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    3. Testimonial / Review Cards
                  </h4>

                  {/* List current reviews */}
                  <div className="space-y-2">
                    {cmsData.reviews.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-2 bg-stone-950 rounded-lg text-xs"
                      >
                        <span>
                          {r.authorName} •{" "}
                          <span className="text-stone-400">
                            {r.text[cmsEditLang].slice(0, 45)}...
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleReviewDelete(r.id)}
                          className="p-1 text-red-400 hover:bg-stone-900 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add review */}
                  <form
                    onSubmit={handleAddReview}
                    className="p-4 bg-stone-950 rounded-xl border border-stone-850/80 space-y-3"
                  >
                    <span className="text-[10px] font-bold text-amber-300 block uppercase">
                      Add New Review Card
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Author Name"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white"
                        required
                      />
                      <select
                        value={reviewRating}
                        onChange={(e) =>
                          setReviewRating(parseInt(e.target.value))
                        }
                        className="bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★</option>
                        <option value={3}>3 Stars ★★★</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Review Text (Georgian)"
                      value={reviewGe}
                      onChange={(e) => setReviewGe(e.target.value)}
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white resize-none"
                      required
                    />
                    <textarea
                      placeholder="Review Text (English)"
                      value={reviewEn}
                      onChange={(e) => setReviewEn(e.target.value)}
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-[10px] font-bold"
                    >
                      + Add Testimonial
                    </button>
                  </form>
                </div>

                {/* FAQ MANAGER */}
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    4. Frequently Asked Questions (FAQ)
                  </h4>

                  {/* Current list */}
                  <div className="space-y-2">
                    {cmsData.faqs.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2 bg-stone-950 rounded-lg text-xs"
                      >
                        <span>
                          Q:{" "}
                          <span className="font-semibold">
                            {f.question[cmsEditLang]}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFaqDelete(f.id)}
                          className="p-1 text-red-400 hover:bg-stone-900 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Q/A */}
                  <form
                    onSubmit={handleAddFaq}
                    className="p-4 bg-stone-950 rounded-xl border border-stone-850/80 space-y-3"
                  >
                    <span className="text-[10px] font-bold text-amber-300 block uppercase">
                      Add FAQ Row
                    </span>
                    <input
                      type="text"
                      placeholder="Question (Georgian)"
                      value={faqQGe}
                      onChange={(e) => setFaqQGe(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Question (English)"
                      value={faqQEn}
                      onChange={(e) => setFaqQEn(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white"
                      required
                    />
                    <textarea
                      placeholder="Answer (Georgian)"
                      value={faqAGe}
                      onChange={(e) => setFaqAGe(e.target.value)}
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white resize-none"
                      required
                    />
                    <textarea
                      placeholder="Answer (English)"
                      value={faqAEn}
                      onChange={(e) => setFaqAEn(e.target.value)}
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-xs text-white resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-[10px] font-bold"
                    >
                      + Add FAQ Accordion
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA GALLERY MANAGER */}
          {activeTab === "media" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t.tabMedia} Manager
                </h2>
                <p className="text-xs text-stone-400">
                  {currentLang === "ge"
                    ? "აატვირთეთ ახალი სურათები ან წაშალეთ გალერეის ფოტოები"
                    : "Simulate file uploads or link image paths straight into the masonry filter"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload panel */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 lg:col-span-1 space-y-5">
                  <h3 className="font-serif text-base font-bold text-amber-300">
                    {currentLang === "ge" ? "სურათის დამატება" : "Add New Image"}
                  </h3>

                  <ImageUploader
                    label={currentLang === "ge" ? "სურათი" : "Image"}
                    onImageReady={(url) => setNewMediaUrl(url)}
                  />

                  <form onSubmit={handleMediaUpload} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                          კატეგორია
                        </label>
                        <select
                          value={newMediaCat}
                          onChange={(e) => setNewMediaCat(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="Exterior">Exterior</option>
                          <option value="Interior">Interior</option>
                          <option value="Bedroom">Bedroom</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Bathroom">Bathroom</option>
                          <option value="Views">Scenic Views</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={!newMediaUrl}
                          className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 text-xs font-bold rounded-xl transition-all"
                        >
                          {currentLang === "ge" ? "შენახვა" : "Save"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        სათაური (ქართული)
                      </label>
                      <input
                        type="text"
                        placeholder="კოტეჯის ექსტერიერი"
                        value={newMediaTitleGe}
                        onChange={(e) => setNewMediaTitleGe(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        სათაური (ინგლისური)
                      </label>
                      <input
                        type="text"
                        placeholder="Cottage Exterior"
                        value={newMediaTitleEn}
                        onChange={(e) => setNewMediaTitleEn(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </form>
                </div>

                {/* Grid layout of existing media */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 lg:col-span-2 space-y-4">
                  <h3 className="font-serif text-base font-bold text-white mb-2">
                    {currentLang === "ge"
                      ? "არსებული ფოტოები"
                      : "Current Gallery Portfolio"}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-125 overflow-y-auto pr-2">
                    {cmsData.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="relative group rounded-xl overflow-hidden aspect-square border border-stone-800"
                      >
                        <img
                          src={item.url}
                          alt="Gallery item"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <span className="bg-amber-500 text-stone-950 text-[8px] font-bold px-1.5 py-0.5 rounded w-fit">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleMediaDelete(item.id)}
                            className="self-end p-1 bg-red-600 hover:bg-red-500 text-white rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & SEO CONFIG */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t.tabSettings}
                </h2>
                <p className="text-xs text-stone-400">
                  {currentLang === "ge"
                    ? "საიტის ძირითადი პარამეტრები, SEO მეტა-მონაცემები და კონტაქტები"
                    : "Configure contact parameters, meta descriptions, and default SEO schemes"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact settings column */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5">
                  <h3 className="font-serif text-base font-bold text-amber-300 border-b border-stone-800 pb-2">
                    {currentLang === "ge"
                      ? "კონტაქტების მართვა"
                      : "Contact settings"}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.phone}
                        onChange={(e) =>
                          handleContactSave("phone", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={cmsData.contact.email}
                        onChange={(e) =>
                          handleContactSave("email", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        WhatsApp Redirect Link
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.whatsapp}
                        onChange={(e) =>
                          handleContactSave("whatsapp", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Facebook page URL
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.facebook}
                        onChange={(e) =>
                          handleContactSave("facebook", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Instagram handle URL
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.instagram}
                        onChange={(e) =>
                          handleContactSave("instagram", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Address (ქართული)
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.address.ge}
                        onChange={(e) =>
                          handleContactAddressSave("ge", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Address (English)
                      </label>
                      <input
                        type="text"
                        value={cmsData.contact.address.en}
                        onChange={(e) =>
                          handleContactAddressSave("en", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Google Maps embed URL
                      </label>
                      <textarea
                        value={cmsData.contact.mapUrl}
                        onChange={(e) =>
                          handleContactSave("mapUrl", e.target.value)
                        }
                        rows={2}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2.5 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Metatags Settings column & simulated google search snippet preview */}
                <div className="space-y-6">
                  {/* Web Settings Form */}
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-xs">
                    <h3 className="font-serif text-base font-bold text-amber-300 border-b border-stone-800 pb-2">
                      {currentLang === "ge"
                        ? "მეტა სათაურები და აღწერილობა"
                        : "SEO Parameters"}
                    </h3>

                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Meta Title (Georgian)
                      </label>
                      <input
                        type="text"
                        value={cmsData.webSettings.metaTitleGe}
                        onChange={(e) =>
                          handleWebSettingsSave("metaTitleGe", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Meta Title (English)
                      </label>
                      <input
                        type="text"
                        value={cmsData.webSettings.metaTitleEn}
                        onChange={(e) =>
                          handleWebSettingsSave("metaTitleEn", e.target.value)
                        }
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Meta Description (Georgian)
                      </label>
                      <textarea
                        value={cmsData.webSettings.metaDescriptionGe}
                        onChange={(e) =>
                          handleWebSettingsSave(
                            "metaDescriptionGe",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                        Meta Description (English)
                      </label>
                      <textarea
                        value={cmsData.webSettings.metaDescriptionEn}
                        onChange={(e) =>
                          handleWebSettingsSave(
                            "metaDescriptionEn",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-2 text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Real-time Google snippet mockup */}
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                    <span className="text-[10px] text-stone-400 font-bold tracking-wider uppercase block">
                      {currentLang === "ge"
                        ? "Google-ის ძიების წინასწარი ნახვა"
                        : "Live Google Snippet Preview"}
                    </span>

                    <div className="bg-white p-5 rounded-xl text-stone-900 font-sans shadow-inner">
                      <div className="flex items-center space-x-1.5 text-xs text-stone-500 mb-1 leading-none font-mono">
                        <span>https://iliaseul.ge</span>
                        <span>›</span>
                        <span>
                          {currentLang === "ge" ? "კოტეჯები" : "cabins"}
                        </span>
                      </div>

                      <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 font-medium font-sans">
                        {currentLang === "ge"
                          ? cmsData.webSettings.metaTitleGe
                          : cmsData.webSettings.metaTitleEn}
                      </h4>

                      <p className="text-xs text-[#4d5156] leading-relaxed font-sans font-light">
                        {currentLang === "ge"
                          ? cmsData.webSettings.metaDescriptionGe
                          : cmsData.webSettings.metaDescriptionEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
