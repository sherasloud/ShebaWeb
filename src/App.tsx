import React, { useState } from 'react';
import { Language } from './types/sheba';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { AppSimulator } from './components/AppSimulator';
import { FeeCalculator } from './components/FeeCalculator';
import { AgentLocator } from './components/AgentLocator';
import { MerchantRegistration } from './components/MerchantRegistration';
import { SecurityCompliance } from './components/SecurityCompliance';
import { Footer } from './components/Footer';
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [simulatorInitialAction, setSimulatorInitialAction] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);

  const toggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulator = () => {
    handleScrollTo('simulator');
  };

  const handleOpenSimulatorAction = (action: string) => {
    setSimulatorInitialAction(action);
    handleScrollTo('simulator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans">
      {/* Top Bar Contract Compliant Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        onOpenSimulator={handleOpenSimulator}
        onScrollTo={handleScrollTo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenSimulator={handleOpenSimulator}
          onScrollTo={handleScrollTo}
        />

        {/* Core Services Asymmetric Bento Grid */}
        <ServicesBento
          lang={lang}
          onOpenSimulatorAction={handleOpenSimulatorAction}
          onScrollTo={handleScrollTo}
        />

        {/* Live Interactive Sheba App Simulator */}
        <AppSimulator
          lang={lang}
          initialAction={simulatorInitialAction}
        />

        {/* Transparent Tariff & Fee Calculator */}
        <FeeCalculator lang={lang} />

        {/* Nationwide Sheba Agent & ATM Point Locator */}
        <AgentLocator lang={lang} />

        {/* Merchant & Bangla QR Onboarding Form */}
        <MerchantRegistration lang={lang} />

        {/* Security, Bangladesh Bank Compliance, USSD Dial, and FAQ */}
        <SecurityCompliance lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onScrollTo={handleScrollTo} />

      {/* App Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative border border-neutral-200">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-neutral-900">
              {lang === 'bn' ? 'সেবা অ্যাপ ডাউনলোড করুন' : 'Download Sheba MFS App'}
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              {lang === 'bn'
                ? 'গুগল প্লে স্টোর ও অ্যাপল অ্যাপ স্টোর থেকে সরাসরি নামিয়ে নিন আপনার পছন্দের সেবা অ্যাপ।'
                : 'Get the official Sheba app from Google Play Store or Apple App Store for Android & iOS.'}
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(lang === 'bn' ? 'অফিসিয়াল সেবা অ্যান্ড্রয়েড APK ডাউনলোড শুরু হয়েছে।' : 'Official Sheba Android APK download started.');
                  setShowDownloadModal(false);
                }}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Google Play / Android APK</span>
              </a>

              <a
                href="#download-ios"
                onClick={(e) => {
                  e.preventDefault();
                  alert(lang === 'bn' ? 'অ্যাপল অ্যাপ স্টোরে রিডাইরেক্ট করা হচ্ছে।' : 'Redirecting to Apple App Store.');
                  setShowDownloadModal(false);
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Apple App Store (iOS)</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
              <span className="text-[11px] text-neutral-500 font-mono-numbers">
                Version 3.4.1 (Build 2026) · Bangladesh Bank Certified
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
