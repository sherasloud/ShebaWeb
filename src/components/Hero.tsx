import React from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { ArrowUpRight, ShieldCheck, PhoneCall, QrCode } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenSimulator: () => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenSimulator,
  onScrollTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-neutral-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust marker - quiet unboxed text */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.hero.badge}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="text-neutral-600">লাইসেন্স নং: MFS-BB-2024/09</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              <span>{t.hero.headlinePrefix} </span>
              <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSimulator}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.tryApp}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onScrollTo('merchant')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <QrCode className="w-4 h-4 text-neutral-600" />
                <span>{lang === 'bn' ? 'মার্চেন্ট বাংলা কিউআর' : 'Bangla QR Merchant'}</span>
              </button>

              <button
                onClick={() => onScrollTo('ussd-guide')}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.hero.ussdCode}</span>
              </button>
            </div>

            {/* Quantified Rigor Proof Metrics - clean unboxed layout */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono-numbers">
                  {t.hero.statAgents}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {t.hero.statAgentsLabel}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono-numbers">
                  {t.hero.statCashOut}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {t.hero.statCashOutLabel}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono-numbers">
                  {t.hero.statPriyo}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {t.hero.statPriyoLabel}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono-numbers">
                  {t.hero.statRemittance}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {t.hero.statRemittanceLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High Fidelity Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200/80 bg-neutral-100 group">
              <img
                src="/src/assets/images/hero_sheba_mfs_1791132942895.jpg"
                alt="Bangladeshi woman making mobile financial payment with Sheba MFS"
                className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs font-semibold text-emerald-300">
                  {lang === 'bn' ? 'সরাসরি লেনদেন · তাৎক্ষণিক নোটিফিকেশন' : 'Direct Transaction · Instant SMS & In-app Alert'}
                </div>
                <div className="text-sm font-medium text-neutral-200 mt-1">
                  {lang === 'bn'
                    ? 'ঢাকার যেকোনো স্টোরে বা প্রত্যন্ত গ্রামে নির্বিঘ্ন সেবা পে'
                    : 'Seamless Sheba Pay at city stores or remote villages across Bangladesh'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
