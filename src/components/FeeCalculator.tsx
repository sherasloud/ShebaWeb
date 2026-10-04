import React, { useState } from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { Calculator, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';

interface FeeCalculatorProps {
  lang: Language;
}

type ServiceMode = 'cashout_app' | 'cashout_ussd' | 'send_priyo' | 'send_regular' | 'bill_pay';

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [amount, setAmount] = useState<number>(5000);
  const [serviceMode, setServiceMode] = useState<ServiceMode>('cashout_app');

  // Quick preset amounts
  const presetAmounts = [500, 1000, 3000, 5000, 10000, 25000];

  // Calculate fees
  let fee = 0;
  let otherMfsFee = 0;

  switch (serviceMode) {
    case 'cashout_app':
      fee = (amount * 1.49) / 100;
      otherMfsFee = (amount * 1.85) / 100;
      break;
    case 'cashout_ussd':
      fee = (amount * 1.85) / 100;
      otherMfsFee = (amount * 1.85) / 100;
      break;
    case 'send_priyo':
      fee = 0;
      otherMfsFee = 5;
      break;
    case 'send_regular':
      fee = 5;
      otherMfsFee = 5;
      break;
    case 'bill_pay':
      fee = 0; // First 3 free
      otherMfsFee = 10;
      break;
  }

  const savings = Math.max(0, otherMfsFee - fee);

  return (
    <section id="calculator" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
            {lang === 'bn' ? 'স্বচ্ছ চার্জ কাঠামো' : 'TRANSPARENT TARIFF'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            {t.calc.title}
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            {t.calc.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
            {/* Service Tabs */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                {lang === 'bn' ? 'লেনদেনের ধরন নির্বাচন করুন' : 'Select Transaction Type'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setServiceMode('cashout_app')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'cashout_app'
                      ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/60 hover:bg-white text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{t.calc.cashOutApp}</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">৳ ১৪.৯০ / ১০০০ টাকা</div>
                </button>

                <button
                  onClick={() => setServiceMode('send_priyo')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'send_priyo'
                      ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/60 hover:bg-white text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{t.calc.sendPriyo}</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">সম্পূর্ণ ফ্রি (০ টাকা)</div>
                </button>

                <button
                  onClick={() => setServiceMode('cashout_ussd')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'cashout_ussd'
                      ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/60 hover:bg-white text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{t.calc.cashOutUssd}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">৳ ১৮.৫০ / ১০০০ টাকা</div>
                </button>

                <button
                  onClick={() => setServiceMode('bill_pay')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceMode === 'bill_pay'
                      ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/60 hover:bg-white text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{t.calc.billPay}</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">১ম ৩টি বিল ৳০ ফি</div>
                </button>
              </div>
            </div>

            {/* Amount Slider and Quick Preset Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  {t.calc.amountLabel}
                </label>
                <span className="text-xl font-extrabold text-neutral-900 font-mono-numbers">
                  ৳ {amount.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min={100}
                max={25000}
                step={100}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />

              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono-numbers mt-1">
                <span>৳ ১০০</span>
                <span>৳ ১২,৫০০</span>
                <span>৳ ২৫,০০০ (দৈনিক সীমা)</span>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-3 py-1.5 text-xs font-mono-numbers rounded-lg border transition-all cursor-pointer ${
                      amount === preset
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    ৳ {preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Calculation Result & Savings Breakdown */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <Calculator className="w-4 h-4" />
              <span>{lang === 'bn' ? 'হিসাব বিবরণী' : 'CALCULATION SUMMARY'}</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm text-neutral-300">{lang === 'bn' ? 'মূল লেনদেন:' : 'Base Amount:'}</span>
                <span className="text-lg font-bold font-mono-numbers">
                  ৳ {amount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm text-neutral-300">{t.calc.totalCost}</span>
                <span className="text-xl font-extrabold text-emerald-300 font-mono-numbers">
                  ৳ {fee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">{t.calc.recipientGets}</span>
                <span className="text-base font-bold font-mono-numbers text-white">
                  ৳ {serviceMode === 'cashout_app' || serviceMode === 'cashout_ussd' ? amount.toLocaleString() : amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings Callout */}
            {savings > 0 && (
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">
                    {lang === 'bn'
                      ? `এই লেনদেনে আপনি সাশ্রয় করছেন ৳ ${savings.toFixed(2)}!`
                      : `You save ৳ ${savings.toFixed(2)} on this transaction!`}
                  </div>
                  <div className="text-[11px] text-neutral-300 mt-0.5">
                    {t.calc.savingNotice}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 text-xs text-neutral-400 leading-relaxed">
              {lang === 'bn'
                ? '* বাংলাদেশ ব্যাংকের সার্কুলার মোতাবেক সেবা এমএফএস চার্জ নির্ধারিত। সরকার নির্ধারিত ১৫% ভ্যাট অন্তর্ভুক্ত।'
                : '* Fees adhere to Bangladesh Bank MFS tariff guidelines, inclusive of statutory 15% VAT.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
