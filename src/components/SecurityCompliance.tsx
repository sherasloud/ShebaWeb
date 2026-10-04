import React, { useState } from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, Lock, CheckCircle2, ChevronDown, ChevronUp, Phone, KeyRound, AlertTriangle } from 'lucide-react';

interface SecurityComplianceProps {
  lang: Language;
}

export const SecurityCompliance: React.FC<SecurityComplianceProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 }
  ];

  return (
    <section id="faq" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Pillars */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
              {lang === 'bn' ? 'বিশ্বাস ও গ্রাহক নিরাপত্তা' : 'SECURITY & REGULATION'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              {t.compliance.title}
            </h2>
            <p className="text-base text-neutral-600 mt-2">
              {t.compliance.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                {lang === 'bn' ? 'বাংলাদেশ ব্যাংক নিয়ন্ত্রিত' : 'Bangladesh Bank Regulated'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.compliance.c1}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                {lang === 'bn' ? '২৫৬-বিট এনক্রিপশন' : '256-Bit Bank Security'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.compliance.c2}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                {lang === 'bn' ? 'পিন ও ওটিপি সতর্কতা' : 'PIN & OTP Privacy'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.compliance.c3}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                {lang === 'bn' ? 'সেন্ট্রাল অ্যান্টি-ফ্রড' : 'Central Fraud Prevention'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.compliance.c4}
              </p>
            </div>
          </div>
        </div>

        {/* USSD Guide Callout */}
        <div id="ussd-guide" className="mb-20 bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="text-xs font-bold text-emerald-300 tracking-wider uppercase">
              {lang === 'bn' ? 'বাটন ফোন ও অফলাইন ব্যাংকিং' : 'FEATURE PHONE & OFFLINE BANKING'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'ইন্টারনেট বা ডেটা প্যাক নেই? ডায়াল করুন *266#'
                : 'No internet or smartphone? Dial *266# anytime'}
            </h3>
            <p className="text-sm text-neutral-200 leading-relaxed">
              {lang === 'bn'
                ? 'বাংলাদেশের যেকোনো প্রান্ত থেকে গ্রামীণফোন, বাংলালিংক, রবি, এয়ারটেল ও টেলিটক সিমের বাটন মোবাইল থেকে *266# ডায়াল করে মুহূর্তেই টাকা পাঠানো, ক্যাশ আউট ও মোবাইল রিচার্জ করুন।'
                : 'Dial *266# from any simple button mobile across Bangladesh on GP, Banglalink, Robi, Airtel, or Teletalk to transact instantly without any internet.'}
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm font-bold font-mono-numbers text-emerald-300">
              <Phone className="w-4 h-4" />
              <span>USSD CODE: *266# (FREE DIAL)</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {t.faq.title}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/50"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
