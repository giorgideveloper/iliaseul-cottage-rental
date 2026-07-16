import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, MessageSquare, 
  Facebook, Instagram, Send, CheckCircle2 
} from 'lucide-react';
import { Language, CMSData } from '../types';

interface ContactProps {
  currentLang: Language;
  cmsData: CMSData;
}

export default function Contact({ currentLang, cmsData }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = currentLang === 'ge' ? cmsData.texts.contactTitle.ge : cmsData.texts.contactTitle.en;
  const subtitle = currentLang === 'ge' ? cmsData.texts.contactSubtitle.ge : cmsData.texts.contactSubtitle.en;
  
  const address = currentLang === 'ge' ? cmsData.contact.address.ge : cmsData.contact.address.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-stone-950 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            {currentLang === 'ge' ? 'კონტაქტი' : 'GET IN TOUCH'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Form and Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-stone-900/40 rounded-2xl border border-stone-850 shadow-xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {currentLang === 'ge' ? 'საკონტაქტო ინფორმაცია' : 'Direct Contacts'}
              </h3>
              
              {/* Phone Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-amber-400 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono block">
                    {currentLang === 'ge' ? 'ტელეფონი' : 'Phone'}
                  </span>
                  <a href={`tel:${cmsData.contact.phone}`} className="text-base md:text-lg text-stone-100 hover:text-amber-300 font-semibold transition-colors">
                    {cmsData.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-amber-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono block">
                    {currentLang === 'ge' ? 'ელ-ფოსტა' : 'Email'}
                  </span>
                  <a href={`mailto:${cmsData.contact.email}`} className="text-sm md:text-base text-stone-100 hover:text-amber-300 font-semibold transition-colors">
                    {cmsData.contact.email}
                  </a>
                </div>
              </div>

              {/* Address Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-amber-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono block">
                    {currentLang === 'ge' ? 'მისამართი' : 'Address'}
                  </span>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    {address}
                  </p>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-6 border-t border-stone-850 flex items-center gap-3">
                {/* WhatsApp Button */}
                <a
                  href={cmsData.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-850 hover:bg-emerald-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={cmsData.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-400/20 hover:text-amber-300 text-stone-400 transition-colors"
                  aria-label="Facebook Page"
                >
                  <Facebook size={18} />
                </a>

                {/* Instagram */}
                <a
                  href={cmsData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-400/20 hover:text-amber-300 text-stone-400 transition-colors"
                  aria-label="Instagram Page"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Embedded Google Maps frame */}
            <div className="h-65 rounded-2xl overflow-hidden border border-stone-850 shadow-xl relative">
              <iframe
                title="Iliaseul Cottage Location Map"
                src={cmsData.contact.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Inquiry Form (col-span-7) */}
          <div className="lg:col-span-7 p-8 bg-stone-900/40 rounded-2xl border border-stone-850 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              {currentLang === 'ge' ? 'გამოგვიგზავნეთ შეტყობინება' : 'Inquiry Message'}
            </h3>

            {success ? (
              <div className="p-8 text-center bg-stone-950/60 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={44} />
                <h4 className="font-serif text-lg font-bold text-amber-300 mb-2">
                  {currentLang === 'ge' ? 'შეტყობინება გაგზავნილია!' : 'Message Received Successfully!'}
                </h4>
                <p className="text-stone-300 text-xs md:text-sm max-w-sm mx-auto leading-relaxed font-light mb-4">
                  {currentLang === 'ge' 
                    ? 'გმადლობთ მოწერისთვის. ჩვენი წარმომადგენელი უახლოეს პერიოდში გაეცნობა თქვენს წერილს და დაგიკავშირდებათ.'
                    : 'Thank you for reaching out! Our team will read your message and respond via the provided email shortly.'
                  }
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-xs font-semibold text-stone-300 transition-colors"
                >
                  {currentLang === 'ge' ? 'ახალი შეტყობინება' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                      {currentLang === 'ge' ? 'თქვენი სახელი' : 'Your Name'}
                    </label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Giorgi"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                      {currentLang === 'ge' ? 'თქვენი ელ-ფოსტა' : 'Your Email'}
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mail@example.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-medium">
                    {currentLang === 'ge' ? 'წერილის შინაარსი' : 'Message details'}
                  </label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder={currentLang === 'ge' ? 'როგორ შეგვიძლია დაგეხმაროთ...' : 'Write your inquiry details here...'}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? (currentLang === 'ge' ? 'იგზავნება...' : 'Sending...') : (currentLang === 'ge' ? 'გაგზავნა' : 'Send Inquiry')}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
