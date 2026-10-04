import React from 'react';
import { ShebaLogo } from './ShebaBranding';
import { ShieldCheck, Wifi, QrCode, ArrowDownToLine, Globe, CheckCircle2, Lock } from 'lucide-react';

export const ShebaHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between text-white shadow-2xl border-2 border-emerald-700/60">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
        <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="6" fill="none" />
          <path d="M30 55 C30 40 40 30 55 30 H70 M70 45 C70 60 60 70 45 70 H30" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Top Bar of Card */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <ShebaLogo variant="white" showDomain={true} />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-mono-numbers">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-200">BB-MFS Licensed</span>
        </div>
      </div>

      {/* Centerpiece: Sheba Smart MFS Wallet Card */}
      <div className="relative z-10 my-auto py-2">
        <div className="bg-gradient-to-r from-emerald-800/90 to-teal-800/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-400/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-6 bg-amber-400/90 rounded-md flex items-center justify-center shadow-inner">
                <div className="w-4 h-3 border border-amber-800/40 rounded-sm" />
              </div>
              <Wifi className="w-4 h-4 text-emerald-200 rotate-90" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-mono-numbers block">
                Official Web Portal
              </span>
              <span className="text-xs font-bold text-white font-mono-numbers">
                shebabd.org
              </span>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-[11px] text-emerald-200 uppercase tracking-widest">
              Sheba Wallet Balance
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-numbers text-white tracking-tight flex items-baseline gap-1">
              <span>৳</span>
              <span>14,850.50</span>
              <span className="text-xs text-emerald-300 font-normal ml-2">BDT</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
            <div>
              <span className="text-neutral-300 block text-[9px]">A/C HOLDER</span>
              <span className="font-semibold text-white">TANVIR AHMED</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-300 block text-[9px]">DIAL OFFLINE</span>
              <span className="font-bold text-amber-300 font-mono-numbers">*266#</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Key Indicators */}
      <div className="relative z-10 pt-2 flex items-center justify-between text-xs text-emerald-200 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>১০০% সেবা নিজস্ব এমএফএস নেটওয়ার্ক</span>
        </div>
        <div className="font-mono-numbers text-[11px] text-neutral-300">
          WEB: shebabd.org
        </div>
      </div>
    </div>
  );
};

export const ShebaAgentPointVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-emerald-900 to-slate-900 rounded-t-2xl p-6 flex flex-col justify-between text-white overflow-hidden border-b border-emerald-700/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-sm text-white">
            সেবা
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Sheba Uddokta Point
          </span>
        </div>
        <span className="text-[11px] font-mono-numbers px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-100 border border-emerald-600/50">
          Agent: SHB-4012
        </span>
      </div>

      <div className="my-auto space-y-1.5 text-center">
        <div className="text-xs text-emerald-300 uppercase tracking-widest font-mono-numbers">
          LOWEST CASH OUT CHARGE IN BANGLADESH
        </div>
        <div className="text-3xl font-extrabold text-white font-mono-numbers">
          ১.৪৯%
        </div>
        <div className="text-xs text-neutral-300">
          প্রতি হাজারে মাত্র ১৪.৯০ টাকা · কোনো বাড়তি ফি নেই
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-emerald-300 pt-2 border-t border-white/10">
        <span>২৫০,০০০+ দেশব্যাপী এজেন্ট</span>
        <span className="font-mono-numbers font-semibold">shebabd.org/agent</span>
      </div>
    </div>
  );
};

export const ShebaMerchantQrVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-neutral-900 via-emerald-950 to-neutral-900 rounded-t-2xl p-6 flex items-center justify-between text-white overflow-hidden border-b border-emerald-700/40">
      <div className="space-y-2 max-w-[55%]">
        <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
          BANGLA QR · SHEBA
        </div>
        <div className="text-lg font-bold leading-tight text-white">
          ক্যাশলেস কেনাকাটা যেকোনো দোকানে
        </div>
        <div className="text-xs text-neutral-300">
          বাংলা কিউআর স্ক্যান করে সেকেন্ডে পেমেন্ট
        </div>
        <div className="text-[11px] font-mono-numbers text-emerald-300 pt-1">
          shebabd.org/pay
        </div>
      </div>

      <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg border-2 border-emerald-500 shrink-0">
        <QrCode className="w-20 h-20 text-emerald-900" />
      </div>
    </div>
  );
};

export const ShebaRemittanceVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 rounded-t-2xl p-6 flex flex-col justify-between text-white overflow-hidden border-b border-emerald-700/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-200">
            সেবা প্রবাস বন্ধু রেমিট্যান্স
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 font-mono-numbers">
          +২.৫% বোনাস
        </span>
      </div>

      <div className="my-auto space-y-1">
        <div className="text-2xl font-black text-white">
          বৈধ পথে সরাসরি ওয়ালেটে
        </div>
        <div className="text-xs text-neutral-300">
          সৌদি আরব, ইউএই, কাতার, মালয়েশিয়া ও ইউকে থেকে সরাসরি টাকা জমা
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-emerald-300 pt-2 border-t border-white/10">
        <span>বাংলাদেশ ব্যাংক অনুমোদিত চ্যানেল</span>
        <span className="font-mono-numbers">shebabd.org/remittance</span>
      </div>
    </div>
  );
};
