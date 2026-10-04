import React from 'react';
import { Language } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { Globe, Smartphone } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenSimulator: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenSimulator,
  onScrollTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-800 hover:text-emerald-700 transition-colors"
        >
          {lang === 'bn' ? 'সেবা' : 'Sheba'}
        </a>

        {/* Zone 2: 4-6 text nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onScrollTo('services')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => onScrollTo('simulator')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.simulator}
          </button>
          <button
            onClick={() => onScrollTo('calculator')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.calculator}
          </button>
          <button
            onClick={() => onScrollTo('locator')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.locator}
          </button>
          <button
            onClick={() => onScrollTo('merchant')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.merchant}
          </button>
          <button
            onClick={() => onScrollTo('faq')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {t.nav.faq}
          </button>
        </nav>

        {/* Zone 3: Actions - Language switch & Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-emerald-800 border border-neutral-300 rounded-md transition-colors cursor-pointer"
            title="Toggle Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span className="tabular-nums">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4" />
            <span>{t.hero.tryApp}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
