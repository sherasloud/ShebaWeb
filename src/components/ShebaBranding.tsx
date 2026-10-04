import React from 'react';

interface ShebaLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'white';
  showDomain?: boolean;
}

export const ShebaLogo: React.FC<ShebaLogoProps> = ({
  className = 'h-9',
  variant = 'full',
  showDomain = false,
}) => {
  const isWhite = variant === 'white';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Custom Sheba Geometric Emblem */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 shrink-0"
      >
        <circle cx="22" cy="22" r="21" fill={isWhite ? 'white' : '#047857'} />
        {/* Stylized 'S' & Digital Loop */}
        <path
          d="M13 24C13 18.4772 17.4772 14 23 14H31M31 20C31 25.5228 26.5228 30 21 30H13"
          stroke={isWhite ? '#047857' : 'white'}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <circle cx="28" cy="24" r="3.5" fill="#F59E0B" />
      </svg>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`text-2xl font-black tracking-tight font-sans ${
              isWhite ? 'text-white' : 'text-emerald-900'
            }`}
          >
            সেবা
          </span>
          <span
            className={`text-sm font-extrabold tracking-wider uppercase font-mono-numbers ${
              isWhite ? 'text-emerald-200' : 'text-emerald-700'
            }`}
          >
            SHEBA
          </span>
        </div>

        {showDomain && (
          <span
            className={`text-[11px] font-bold tracking-wider font-mono-numbers mt-0.5 ${
              isWhite ? 'text-emerald-300' : 'text-emerald-600'
            }`}
          >
            shebabd.org
          </span>
        )}
      </div>
    </div>
  );
};
