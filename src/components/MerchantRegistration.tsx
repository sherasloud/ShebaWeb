import React, { useState } from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { QrCode, CheckCircle2, Building2, Download, Printer, ArrowRight } from 'lucide-react';

interface MerchantRegistrationProps {
  lang: Language;
}

export const MerchantRegistration: React.FC<MerchantRegistrationProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [businessName, setBusinessName] = useState<string>('নিউ জননী ডিপার্টমেন্টাল স্টোর');
  const [ownerName, setOwnerName] = useState<string>('মো: হাবিবুর রহমান');
  const [mobile, setMobile] = useState<string>('01712-998877');
  const [nid, setNid] = useState<string>('1988269182390192');
  const [tradeLicense, setTradeLicense] = useState<string>('TRAD/DSCC/019283/2026');
  const [category, setCategory] = useState<string>('grocery');
  const [district, setDistrict] = useState<string>('Dhaka');
  const [thana, setThana] = useState<string>('Mirpur');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [merchantCode, setMerchantCode] = useState<string>('SHB-M-882910');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !mobile || !nid) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন' : 'Please fill all required fields');
      return;
    }

    const randomCode = `SHB-M-${Math.floor(100000 + Math.random() * 900000)}`;
    setMerchantCode(randomCode);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="merchant" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
            {lang === 'bn' ? 'মার্চেন্ট ও উদ্যোক্তা নেটওয়ার্ক' : 'PARTNER WITH SHEBA MFS'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            {t.merchant.title}
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            {t.merchant.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Registration Form */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <span>{t.merchant.formTitle}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.businessName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.ownerName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.mobile} *
                  </label>
                  <input
                    type="text"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm font-mono-numbers focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.nid} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm font-mono-numbers focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.businessType}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="grocery">{lang === 'bn' ? 'মুদি ও ডিপার্টমেন্টাল' : 'Grocery / Retail'}</option>
                    <option value="pharmacy">{lang === 'bn' ? 'ফার্মেসি ও ঔষধ' : 'Pharmacy'}</option>
                    <option value="restaurant">{lang === 'bn' ? 'রেস্তোরাঁ ও ক্যাফে' : 'Restaurant & Food'}</option>
                    <option value="fashion">{lang === 'bn' ? 'পোশাক ও ফ্যাশন' : 'Clothing & Fashion'}</option>
                    <option value="online">{lang === 'bn' ? 'অনলাইন ও ই-কমার্স' : 'Online / Freelancer'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.district}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.merchant.thana}
                  </label>
                  <input
                    type="text"
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.merchant.tradeLicense}
                </label>
                <input
                  type="text"
                  value={tradeLicense}
                  onChange={(e) => setTradeLicense(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm font-mono-numbers"
                  placeholder="TRAD/DSCC/..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.merchant.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Generated Sheba Bangla QR Merchant Display Stand */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-emerald-800 to-emerald-950 p-6 rounded-3xl shadow-2xl text-white text-center border-4 border-emerald-700 relative">
              {/* Stand Header */}
              <div className="text-xs uppercase tracking-widest text-emerald-200 font-bold mb-1">
                {lang === 'bn' ? 'বাংলাদেশ ব্যাংক অনুমোদিত' : 'BANGLADESH BANK INTEROPERABLE'}
              </div>
              <div className="text-2xl font-black tracking-tight text-white mb-1">
                {lang === 'bn' ? 'বাংলা কিউআর · সেবা' : 'BANGLA QR · SHEBA'}
              </div>
              <div className="text-[11px] font-mono-numbers text-emerald-300 font-bold mb-4">
                shebabd.org
              </div>

              {/* QR Plate */}
              <div className="bg-white p-6 rounded-2xl shadow-inner text-neutral-900 inline-block mx-auto border-2 border-emerald-100">
                {/* SVG Bangla QR Representation */}
                <div className="w-48 h-48 mx-auto relative flex items-center justify-center bg-white p-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corner finder patterns */}
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="#047857" />
                    <rect x="9" y="9" width="17" height="17" rx="2" fill="#ffffff" />
                    <rect x="13" y="13" width="9" height="9" fill="#047857" />

                    <rect x="70" y="5" width="25" height="25" rx="3" fill="#047857" />
                    <rect x="74" y="9" width="17" height="17" rx="2" fill="#ffffff" />
                    <rect x="78" y="13" width="9" height="9" fill="#047857" />

                    <rect x="5" y="70" width="25" height="25" rx="3" fill="#047857" />
                    <rect x="9" y="74" width="17" height="17" rx="2" fill="#ffffff" />
                    <rect x="13" y="78" width="9" height="9" fill="#047857" />

                    {/* QR Matrix Elements */}
                    <rect x="35" y="8" width="8" height="8" fill="#111827" />
                    <rect x="50" y="8" width="6" height="6" fill="#111827" />
                    <rect x="38" y="22" width="6" height="6" fill="#111827" />
                    <rect x="52" y="20" width="8" height="8" fill="#111827" />

                    <rect x="8" y="38" width="8" height="8" fill="#111827" />
                    <rect x="22" y="42" width="8" height="6" fill="#111827" />
                    <rect x="36" y="36" width="6" height="10" fill="#111827" />
                    <rect x="48" y="38" width="8" height="8" fill="#047857" />
                    <rect x="62" y="36" width="10" height="8" fill="#111827" />
                    <rect x="78" y="38" width="6" height="8" fill="#111827" />

                    <rect x="8" y="52" width="6" height="6" fill="#111827" />
                    <rect x="20" y="52" width="10" height="6" fill="#111827" />
                    <rect x="38" y="50" width="8" height="8" fill="#111827" />
                    <rect x="52" y="52" width="6" height="12" fill="#111827" />
                    <rect x="66" y="50" width="8" height="8" fill="#111827" />
                    <rect x="80" y="52" width="12" height="6" fill="#111827" />

                    <rect x="38" y="68" width="8" height="8" fill="#111827" />
                    <rect x="52" y="70" width="12" height="6" fill="#111827" />
                    <rect x="70" y="68" width="8" height="8" fill="#111827" />
                    <rect x="82" y="72" width="8" height="8" fill="#111827" />

                    <rect x="38" y="82" width="10" height="6" fill="#111827" />
                    <rect x="54" y="84" width="8" height="8" fill="#111827" />
                    <rect x="70" y="82" width="6" height="8" fill="#111827" />
                    <rect x="80" y="84" width="10" height="6" fill="#111827" />
                  </svg>
                </div>

                <div className="mt-2 text-xs font-bold text-neutral-900 truncate max-w-[200px] mx-auto">
                  {businessName}
                </div>
                <div className="text-[11px] font-mono-numbers text-neutral-500 font-semibold">
                  Merchant ID: {merchantCode}
                </div>
              </div>

              {/* Bangla QR Footnote */}
              <div className="mt-4 text-xs text-emerald-200">
                {lang === 'bn'
                  ? 'সেবা অ্যাপ ও ইন্টারঅপারেবল বাংলা কিউআর দিয়ে পেমেন্ট গ্রহণ করুন · shebabd.org'
                  : 'Accept payments seamlessly via Sheba App & Bangla QR · shebabd.org'}
              </div>

              {submitted && (
                <div className="mt-4 p-3 bg-emerald-700/80 rounded-xl text-xs text-white flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>{lang === 'bn' ? 'আবেদন অনুমোদিত হয়েছে!' : 'Approved instantly!'}</span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'স্ট্যান্ড প্রিন্ট করুন' : 'Print Stand'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
