import React, { useState } from 'react';
import { Language, AgentPoint } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { AGENT_POINTS, BANGLADESH_DIVISIONS } from '../data/shebaData';
import { MapPin, Search, Phone, Star, ShieldCheck, Check } from 'lucide-react';

interface AgentLocatorProps {
  lang: Language;
}

export const AgentLocator: React.FC<AgentLocatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedDivision, setSelectedDivision] = useState<string>('All Divisions');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAgents = AGENT_POINTS.filter((agent) => {
    const matchesDivision =
      selectedDivision === 'All Divisions' || agent.division === selectedDivision;
    const matchesQuery =
      agent.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.addressBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.addressEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.thana.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.agentCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesQuery;
  });

  return (
    <section id="locator" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
            {lang === 'bn' ? 'সারাদেশে এজেন্ট নেটওয়ার্ক' : 'NATIONWIDE AGENT FOOTPRINT'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            {t.locator.title}
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            {t.locator.subtitle} · <span className="font-mono-numbers text-emerald-700 font-semibold">shebabd.org</span>
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-3">
          <div className="sm:w-64">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div === 'All Divisions' ? t.locator.allDivisions : div}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.locator.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:border-emerald-600/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-neutral-900 leading-snug">
                    {lang === 'bn' ? agent.nameBn : agent.nameEn}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 font-mono-numbers shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{agent.rating}</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-neutral-500 font-mono-numbers">
                  {t.locator.code} <span className="font-bold text-neutral-800">{agent.agentCode}</span>
                </div>

                <div className="mt-3 flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{lang === 'bn' ? agent.addressBn : agent.addressEn}</span>
                </div>

                {/* Available services - clean unboxed typography */}
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <div className="text-[11px] font-semibold text-neutral-500 mb-1">
                    {t.locator.servicesOffered}
                  </div>
                  <div className="text-xs text-emerald-800 font-medium">
                    ক্যাশ ইন · ক্যাশ আউট · ইউটিলিটি বিল · প্রবাসী রেমিট্যান্স
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.locator.openStatus}</span>
                </span>

                <a
                  href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.locator.callAgent}</span>
                </a>
              </div>
            </div>
          ))}

          {filteredAgents.length === 0 && (
            <div className="col-span-full py-12 text-center text-neutral-500">
              <MapPin className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <div className="text-sm">
                {lang === 'bn'
                  ? 'আপনার অনুসন্ধানের সাথে কোনো এজেন্ট পয়েন্ট মেলেনি। দয়া করে অন্য এলাকা খুঁজুন।'
                  : 'No agent point matched your search. Please try another query.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
