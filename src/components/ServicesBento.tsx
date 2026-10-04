import React from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { Send, ArrowDownToLine, Zap, Receipt, QrCode, PiggyBank, Globe, ArrowRight } from 'lucide-react';
import { ShebaAgentPointVisual, ShebaMerchantQrVisual, ShebaRemittanceVisual } from './ShebaVisuals';

interface ServicesBentoProps {
  lang: Language;
  onOpenSimulatorAction: (action: string) => void;
  onScrollTo: (id: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  lang,
  onOpenSimulatorAction,
  onScrollTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-2">
            {lang === 'bn' ? 'ডিজিটাল ব্যাংকিং ফিচারস' : 'CORE MFS CAPABILITIES'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-base text-neutral-600 mt-3">
            {t.services.subtitle}
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Send Money (Large featured card, col-span-2 on tablet/desktop) */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 mb-6">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {t.services.s1Title}
              </h3>
              <p className="text-base text-neutral-600 mt-3 max-w-xl leading-relaxed">
                {t.services.s1Desc}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span className="font-semibold text-emerald-700">০% প্রিয় নম্বর ফি</span>
                <span aria-hidden="true">·</span>
                <span>NPSB / BEFTN সরাসরি ব্যাংক ট্রান্সফার</span>
                <span aria-hidden="true">·</span>
                <span>তাৎক্ষণিক কনফার্মেশন স্লিপ</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-between">
              <button
                onClick={() => onOpenSimulatorAction('send')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>{lang === 'bn' ? 'সিমুলেটরে সেন্ড মানি টেস্ট করুন' : 'Test Send Money Simulator'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-400 font-mono-numbers">LIMIT: ৳25,000 / DAY</span>
            </div>
          </div>

          {/* Card 2: Cash Out with Pure Sheba Agent Point Visual */}
          <div className="rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-white">
            <ShebaAgentPointVisual />
            <div className="p-6">
              <div className="flex items-center gap-2 text-neutral-900 mb-2">
                <ArrowDownToLine className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold tracking-tight">
                  {t.services.s2Title}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t.services.s2Desc}
              </p>
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => onScrollTo('locator')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'এজেন্ট পয়েন্ট খুঁজুন' : 'Find Agent Point'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Mobile Recharge */}
          <div className="rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-neutral-50/50">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-100/80 flex items-center justify-center text-orange-800 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                {t.services.s3Title}
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {t.services.s3Desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <span>GP</span>
                <span aria-hidden="true">·</span>
                <span>Banglalink</span>
                <span aria-hidden="true">·</span>
                <span>Robi</span>
                <span aria-hidden="true">·</span>
                <span>Airtel</span>
                <span aria-hidden="true">·</span>
                <span>Teletalk</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80">
              <button
                onClick={() => onOpenSimulatorAction('recharge')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'অফার দেখুন ও রিচার্জ করুন' : 'Explore Packs & Recharge'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Utility Bill Pay */}
          <div className="rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-neutral-50/50">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-800 mb-4">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                {t.services.s4Title}
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {t.services.s4Desc}
              </p>
              <div className="mt-4 text-xs text-neutral-500 space-y-1">
                <div>ডেসকো · ডিপিডিসি · পল্লী বিদ্যুৎ · ওয়াসা · তিতাস</div>
                <div className="text-emerald-700 font-medium">প্রথম ৩টি বিল ফ্রি প্রতি মাসে</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/80">
              <button
                onClick={() => onOpenSimulatorAction('paybill')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'বিল পে ট্রায়াল দিন' : 'Test Bill Pay Simulator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Bangla QR Merchant with Pure Sheba Visual */}
          <div className="rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-white">
            <ShebaMerchantQrVisual />
            <div className="p-6">
              <div className="flex items-center gap-2 text-neutral-900 mb-2">
                <QrCode className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold tracking-tight">
                  {t.services.s5Title}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t.services.s5Desc}
              </p>
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => onScrollTo('merchant')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'মার্চেন্ট কিউআর তৈরি করুন' : 'Generate Merchant QR'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Inward Remittance with Pure Sheba Visual */}
          <div className="rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-white">
            <ShebaRemittanceVisual />
            <div className="p-6">
              <div className="flex items-center gap-2 text-neutral-900 mb-2">
                <Globe className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold tracking-tight">
                  {t.services.s7Title}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t.services.s7Desc}
              </p>
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenSimulatorAction('remittance')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'রেমিট্যান্স ক্যালকুলেট করুন' : 'Estimate Remittance'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 7: Sheba Savings & DPS */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 p-8 flex flex-col justify-between hover:border-emerald-500/60 transition-colors bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 mb-6">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {t.services.s6Title}
              </h3>
              <p className="text-base text-neutral-200 mt-3 max-w-xl leading-relaxed">
                {t.services.s6Desc}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
                <span>ব্র্যাক ব্যাংক (BRAC Bank)</span>
                <span aria-hidden="true">·</span>
                <span>সিটি ইসলামিক (City Islamic Mudaraba)</span>
                <span aria-hidden="true">·</span>
                <span>আইডিএলসি ফাইন্যান্স (IDLC)</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-300 font-semibold">মাসিক কিস্তি মাত্র ৫০০ টাকা থেকে</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onOpenSimulatorAction('savings')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>{lang === 'bn' ? 'ডিপিএস স্কিমসমূহ ব্রাউজ করুন' : 'View DPS Schemes'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-300 font-mono-numbers">PROFIT UP TO 9.50%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
