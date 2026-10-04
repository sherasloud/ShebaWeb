import React from 'react';
import { Language } from '../types/sheba';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onScrollTo }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & License */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-bold tracking-tight text-white block">
              {lang === 'bn' ? 'সেবা এমএফএস' : 'Sheba MFS'}
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'সেবা ডিজিটাল ফিন্যান্সিয়াল সার্ভিস লিমিটেড — বাংলাদেশ ব্যাংক অনুমোদিত পূর্ণাঙ্গ মোবাইল ফিন্যান্সিয়াল সার্ভিস (এমএফএস)। সহজে লেনদেন, নিরাপদ সঞ্চয় ও সমৃদ্ধির পথে আপনার সাথী।'
                : "Sheba Digital Financial Services Limited — Bangladesh Bank licensed Mobile Financial Service provider. Empowering millions across Bangladesh with instant, secure financial access."}
            </p>
            <div className="text-[11px] text-neutral-500 font-mono-numbers">
              License No: BB/MFS/REG-2024/09 · AML & CFT Compliant
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সেন্ড মানি ও ক্যাশ আউট' : 'Send Money & Cash Out'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'মোবাইল রিচার্জ ও অফার' : 'Mobile Recharge Packs'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'ইউটিলিটি ও শিক্ষা বিল' : 'Utility & Tuition Bill Pay'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'বাংলা কিউআর পেমেন্ট' : 'Bangla QR Merchant Pay'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সঞ্চয় ও ডিপিএস স্কিম' : 'Savings & Micro-DPS'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Network & Tools */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'টুলস ও সাহায্য' : 'Tools & Network'}
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onScrollTo('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'চার্জ ক্যালকুলেটর' : 'Fee Calculator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('locator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'এজেন্ট ও এটিএম ফাইন্ডার' : 'Agent & ATM Locator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('merchant')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'উদ্যোক্তা ও মার্চেন্ট নিবন্ধন' : 'Merchant Registration'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('simulator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'ওয়েব সিমুলেটর' : 'Web App Simulator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সচরাচর জিজ্ঞাসা (FAQ)' : 'FAQ & Limits'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'হেল্পলাইন ও ঠিকানা' : 'Helpline & Office'}
            </div>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-white font-bold font-mono-numbers">16266</span>
                <span className="text-[10px] text-neutral-500">(24/7 Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2 font-mono-numbers">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+880 96123-SHEBA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:support@shebabd.org" className="hover:text-emerald-400 transition-colors">
                  support@shebabd.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">WEB:</span>
                <a href="https://shebabd.org" className="text-white font-bold hover:text-emerald-400 transition-colors font-mono-numbers">
                  shebabd.org
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  Sheba Tower, Plot 14, Gulshan-1, Dhaka-1212, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 Sheba Digital Financial Services Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">
              {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              {lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              {lang === 'bn' ? 'নিরাপত্তা চার্টার' : 'Security Charter'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
