'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface CasinoQuantumLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  customTimeLabel: string;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
  selectedCardStyle: CardStyleOption;
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
  telegramUsername: string;
  customHeaderText: string;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  defaultLayoutSize: DefaultLayoutSizeConfig;
  footerConfig?: FooterConfig;
  maxwinConfig?: MaxwinConfig;
}

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Pattern Display Component
function PatternDisplay({ pattern, size }: { pattern: string; size: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index}>
          {char === 'V' ? (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

// Quantum Trik Panel Component
function QuantumTrikPanel({
  trik,
  providerColor,
  primaryColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  primaryColor: string;
  hideFiturGanda?: boolean;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 4;

  const getFontSize = () => {
    if (totalRows <= 5) return { title: 24, label: 14, depositKode: 36, value: 20, itemName: 20, itemValue: 24, icon: 26, gap: 8, padding: 10 };
    if (totalRows <= 6) return { title: 22, label: 13, depositKode: 32, value: 18, itemName: 18, itemValue: 22, icon: 24, gap: 7, padding: 9 };
    if (totalRows <= 7) return { title: 20, label: 12, depositKode: 28, value: 16, itemName: 16, itemValue: 20, icon: 22, gap: 6, padding: 8 };
    return { title: 18, label: 11, depositKode: 24, value: 14, itemName: 14, itemValue: 18, icon: 20, gap: 5, padding: 7 };
  };

  const sizes = getFontSize();
  const darkPrimary = adjustColor(primaryColor, -80);
  const darkerPrimary = adjustColor(primaryColor, -90);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkPrimary}e6, ${primaryColor}15)`,
        borderRadius: '8px',
        border: `1px solid ${providerColor}60`,
        boxShadow: `0 0 20px ${providerColor}40, inset 0 0 15px rgba(0,0,0,0.5)`
      }}
    >
      {/* Circuit Board Pattern */}
      <div
        className="absolute inset-0 opacity-20 rounded-lg"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(providerColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(providerColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(providerColor)}'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative z-10"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <h3
          className="font-black uppercase tracking-wider"
          style={{
            color: '#ffffff',
            fontSize: `${sizes.title}px`,
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontFamily: 'monospace'
          }}
        >
          {trik.title || 'QUANTUM TRIK'}
        </h3>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-10"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode | Fitur Ganda | Putaran Bet Row */}
        <div
          className="flex items-stretch gap-2"
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: `${sizes.padding + 5}px`,
            borderRadius: '8px',
            border: `1px solid ${providerColor}50`
          }}
        >
          {/* Deposit Kode */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.depositKode * 0.7 + 3}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {trik.depositKode}
            </span>
          </div>

          {/* Fitur Ganda - Center */}
          <div
            className="flex-1 text-center flex flex-col justify-center"
            style={{
              visibility: hideFiturGanda ? 'hidden' : 'visible',
              pointerEvents: hideFiturGanda ? 'none' : 'auto'
            }}
          >
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              FITUR GANDA
            </span>
            <span
              className="font-bold inline-block"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value * 0.85 + 3}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {trik.fiturGanda ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Putaran Bet */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              PUTARAN BET
            </span>
            <span
              className="font-bold leading-tight"
              style={{ color: '#ffffff', fontSize: `${sizes.value * 0.85 + 3}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Trik Items */}
        <div className="flex-1 flex flex-col justify-center" style={{ gap: `${sizes.gap}px` }}>
          {trik.trikItems && trik.trikItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
              style={{
                background: `linear-gradient(90deg, ${providerColor}15, ${providerColor}25, ${providerColor}15)`,
                padding: `${sizes.padding}px`,
                borderRadius: '8px',
                borderLeft: `3px solid ${providerColor}`
              }}
            >
              <span className="font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                {item.name}
              </span>
              <span
                className="font-bold flex-1 text-center"
                style={{ color: '#ffffff', fontSize: `${sizes.itemValue}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
              >
                {item.value}
              </span>
              <div className="flex-1 flex justify-end">
                {item.pattern && <PatternDisplay pattern={item.pattern} size={sizes.icon} />}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Text */}
        {trik.customText && (
          <div
            className="text-center"
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
              padding: `${sizes.padding}px`,
              borderRadius: '8px'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              {trik.customText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Quantum Game Card Component
function QuantumGameCard({ game, rtp, primaryColor, secondaryColor, quantumId, darkBackground }: { game: Game; rtp: number; primaryColor: string; secondaryColor: string; quantumId: string; darkBackground: string }) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        width: '145px',
        flexShrink: 0,
        background: `linear-gradient(135deg, ${darkBackground}e6, ${primaryColor}15)`,
        border: `1px solid ${primaryColor}60`,
        borderRadius: '8px',
        boxShadow: `0 0 20px ${primaryColor}40, inset 0 0 15px rgba(0,0,0,0.5)`
      }}
    >
      {/* Circuit Board Pattern */}
      <div
        className="absolute inset-0 opacity-20 rounded-lg"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Quantum ID Badge */}
      <div
        className="absolute top-2 left-2 px-2 py-1 text-xs font-mono font-black z-20"
        style={{
          background: primaryColor,
          color: '#000',
          borderRadius: '2px',
          boxShadow: `0 0 10px ${primaryColor}`
        }}
      >
        {quantumId}
      </div>

      {/* Status LED */}
      <div className="absolute top-2 right-2 z-20">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}` }}
        />
      </div>

      {/* RTP Badge */}
      <div className="absolute top-10 right-2 z-20">
        <div
          className="px-2 py-1 font-black text-[10px] text-white"
          style={{
            background: rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444',
            borderRadius: '4px',
            boxShadow: `0 0 8px ${rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444'}`
          }}
        >
          {rtp}%
        </div>
      </div>

      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/60 rounded">
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234da6ff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="text-center">
          <div className="text-xs font-bold mb-1 truncate" style={{
            color: '#ffffff',
            fontFamily: 'monospace',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}>
            {game.name.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Circuit Connections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-2" style={{ background: primaryColor, transform: 'translateX(-50%)' }} />
        <div className="absolute bottom-0 left-1/2 w-px h-2" style={{ background: primaryColor, transform: 'translateX(-50%)' }} />
        <div className="absolute left-0 top-1/2 h-px w-2" style={{ background: primaryColor, transform: 'translateY(-50%)' }} />
        <div className="absolute right-0 top-1/2 h-px w-2" style={{ background: primaryColor, transform: 'translateY(-50%)' }} />
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{
          border: `1px solid ${primaryColor}`,
          boxShadow: `0 0 20px ${primaryColor} inset`
        }}
      />
    </div>
  );
}

export default function CasinoQuantumLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  getCurrentDate,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  footerConfig,
  maxwinConfig
}: CasinoQuantumLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const darkPrimary = adjustColor(primaryColor, -80);
  const darkerPrimary = adjustColor(primaryColor, -90);
  const darkSecondary = adjustColor(secondaryColor, -80);

  // Generate RTP for games (3 games each)
  const pragmaticGamesWithRtp = selectedPragmaticGames.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRtp = selectedPgSoftGames.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div
      className="relative z-10 flex flex-col"
      style={{
        fontFamily: 'monospace',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Quantum Grid Mesh */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header 1 - Title (55px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative z-10 overflow-hidden"
        style={{
          height: '55px',
          background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
          borderBottom: `2px solid ${primaryColor}`,
          backdropFilter: 'blur(5px)'
        }}
      >
        {/* Wave pattern effects - sine wave styled borders */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='55' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 27.5 Q 12.5 15 25 27.5 T 50 27.5 T 75 27.5 T 100 27.5' stroke='${encodeURIComponent(primaryColor)}' stroke-width='1' fill='none' opacity='0.6'/%3E%3Cpath d='M0 20 Q 12.5 8 25 20 T 50 20 T 75 20 T 100 20' stroke='${encodeURIComponent(secondaryColor)}' stroke-width='0.5' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 55px',
            backgroundRepeat: 'repeat-x'
          }}
        />
        {/* Quantum dots effect */}
        <div className="absolute left-8 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, animationDelay: '0.3s' }} />
            <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 4px ${primaryColor}`, animationDelay: '0.6s' }} />
          </div>
        </div>
        <div className="absolute right-8 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          <div className="flex gap-1">
            <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 4px ${primaryColor}`, animationDelay: '0.6s' }} />
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, animationDelay: '0.3s' }} />
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
          </div>
        </div>
        {/* Particle orbit decorations - left */}
        <div className="absolute left-16 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          <div className="relative" style={{ width: '40px', height: '40px' }}>
            <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${primaryColor}40` }} />
            <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, transform: 'translateX(-50%)' }} />
            <div className="absolute top-1/2 left-0 w-1 h-1 rounded-full" style={{ background: primaryColor, boxShadow: `0 0 6px ${primaryColor}`, transform: 'translateY(-50%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
            </div>
          </div>
        </div>
        {/* Particle orbit decorations - right */}
        <div className="absolute right-16 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          <div className="relative" style={{ width: '40px', height: '40px' }}>
            <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${secondaryColor}40` }} />
            <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full" style={{ background: primaryColor, boxShadow: `0 0 6px ${primaryColor}`, transform: 'translateX(-50%)' }} />
            <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, transform: 'translateY(-50%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}` }} />
            </div>
          </div>
        </div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center relative z-10`}
          style={{
            color: '#ffffff',
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px ${primaryColor}, 0 0 10px ${secondaryColor}`
          }}
        >
          <span style={{ marginRight: '8px' }}>⚛</span>
          {customHeaderText}
          <span style={{ marginLeft: '8px' }}>⚛</span>
        </h1>
      </div>

      {/* Header 2 - Logo, Time, Date, RTP LIVE Badge (45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative z-10 overflow-hidden"
        style={{
          height: '45px',
          background: `${darkerPrimary}cc`,
          borderBottom: `2px solid ${primaryColor}`,
          backdropFilter: 'blur(5px)'
        }}
      >
        {/* Probability wave patterns - sine wave background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='45' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 22.5 Q 10 12.5 20 22.5 T 40 22.5 T 60 22.5 T 80 22.5' stroke='${encodeURIComponent(primaryColor)}' stroke-width='1' fill='none' opacity='0.5'/%3E%3Cpath d='M0 30 Q 10 20 20 30 T 40 30 T 60 30 T 80 30' stroke='${encodeURIComponent(secondaryColor)}' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 45px',
            backgroundRepeat: 'repeat-x'
          }}
        />
        {/* Electron orbit lines as decorative elements */}
        <div className="absolute left-0 top-1/2" style={{ transform: 'translateY(-50%)', width: '60px', height: '30px' }}>
          <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="15" rx="25" ry="10" stroke={primaryColor} strokeWidth="0.5" fill="none" opacity="0.4" />
            <circle cx="10" cy="15" r="1.5" fill={secondaryColor} opacity="0.8">
              <animate attributeName="cx" values="10;50;10" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div className="absolute right-0 top-1/2" style={{ transform: 'translateY(-50%)', width: '60px', height: '30px' }}>
          <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="15" rx="25" ry="10" stroke={secondaryColor} strokeWidth="0.5" fill="none" opacity="0.4" />
            <circle cx="50" cy="15" r="1.5" fill={primaryColor} opacity="0.8">
              <animate attributeName="cx" values="50;10;50" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        {/* Quantum dots effect - smaller clusters */}
        <div className="absolute left-20 top-2">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 4px ${primaryColor}` }} />
            <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 3px ${secondaryColor}`, animationDelay: '0.2s' }} />
          </div>
        </div>
        <div className="absolute right-20 bottom-2">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 3px ${primaryColor}`, animationDelay: '0.4s' }} />
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 4px ${secondaryColor}` }} />
          </div>
        </div>
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="relative">
            <img
              src={selectedWebsite.logo}
              alt={selectedWebsite.name}
              style={{ height: '35px', filter: `drop-shadow(0 0 10px ${primaryColor}cc)` }}
            />
            {/* Particle orbit around logo */}
            <div className="absolute -top-1 -right-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}` }} />
            </div>
          </div>
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-3 relative z-10">
          <span
            className="font-bold"
            style={{ fontSize: '18px', color: '#ffffff', textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 8px ${primaryColor}` }}
          >
            {customTimeLabel}
          </span>
          <span style={{ color: primaryColor, textShadow: `0 0 5px ${primaryColor}` }}>⚛</span>
          <span
            className="font-medium"
            style={{ fontSize: '16px', color: '#ffffff', textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 6px ${secondaryColor}` }}
          >
            {getCurrentDate()}
          </span>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          {/* Maxwin Button */}
          {maxwinConfig?.enabled && maxwinConfig.buttonText && (
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: `linear-gradient(135deg, #a855f7, #7c3aed)`,
                boxShadow: `0 0 15px #a855f7, 0 0 8px #6366f1`,
                border: '1px solid #c084fc'
              }}
            >
              <span style={{ fontSize: '14px' }}>⚛</span>
              <span className="text-xs font-black text-white">{maxwinConfig.buttonText}</span>
            </div>
          )}

          {/* RTP LIVE Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded"
            style={{
              background: primaryColor,
              boxShadow: `0 0 15px ${primaryColor}, 0 0 8px ${secondaryColor}`,
              border: `1px solid ${secondaryColor}`
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ boxShadow: `0 0 6px ${secondaryColor}` }} />
            <span className="text-xs font-black text-black">RTP LIVE</span>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}` }} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden relative z-10" style={{ minHeight: 0 }}>
        {/* Game Modal Row (264px height) */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Play Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `${darkPrimary}99`,
              borderRadius: '12px',
              border: `1px solid ${primaryColor}30`,
              boxShadow: `0 0 20px ${primaryColor}30, inset 0 0 15px rgba(0,0,0,0.5)`
            }}
          >
            {/* Circuit board pattern overlay */}
            <div
              className="absolute inset-0 opacity-10 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PRAGMATIC PLAY
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pragmaticGamesWithRtp.map((game, index) => (
                <QuantumGameCard
                  key={`pragmatic-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  quantumId={`Q${(index + 1).toString().padStart(3, '0')}`}
                  darkBackground={darkPrimary}
                />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `${darkSecondary}99`,
              borderRadius: '12px',
              border: `1px solid ${secondaryColor}30`,
              boxShadow: `0 0 20px ${secondaryColor}30, inset 0 0 15px rgba(0,0,0,0.5)`
            }}
          >
            {/* Circuit board pattern overlay */}
            <div
              className="absolute inset-0 opacity-10 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(secondaryColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(secondaryColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(secondaryColor)}'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PG SOFT
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pgSoftGamesWithRtp.map((game, index) => (
                <QuantumGameCard
                  key={`pgsoft-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
                  quantumId={`Q${(index + 101).toString().padStart(3, '0')}`}
                  darkBackground={darkSecondary}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row (400px height) */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <QuantumTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <QuantumTrikPanel
                  trik={pgSoftTrik}
                  providerColor={secondaryColor}
                  primaryColor={secondaryColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Maxwin Info Panel */}
        {maxwinConfig?.enabled && (
          <div
            className="mx-4 mb-2 rounded-xl p-3 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary}e6, ${primaryColor}15)`,
              border: `1px solid ${primaryColor}60`,
              boxShadow: `0 0 20px ${primaryColor}40, inset 0 0 15px rgba(0,0,0,0.5)`
            }}
          >
            {/* Circuit Board Pattern */}
            <div
              className="absolute inset-0 opacity-20 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h10m10 0h10M15 0v10m0 10v10' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3Ccircle cx='25' cy='25' r='1' fill='${encodeURIComponent(primaryColor)}'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />

            {/* Quantum dots effect - left */}
            <div className="absolute left-4 top-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, animationDelay: '0.3s' }} />
                <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 4px ${primaryColor}`, animationDelay: '0.6s' }} />
              </div>
            </div>

            {/* Quantum dots effect - right */}
            <div className="absolute right-4 top-3">
              <div className="flex gap-1">
                <div className="w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 4px ${primaryColor}`, animationDelay: '0.6s' }} />
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, animationDelay: '0.3s' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
              </div>
            </div>

            <div className="relative z-10">
              {/* Heading 1 */}
              <div className="text-center mb-2">
                <h2 className="text-lg font-black uppercase tracking-wide" style={{color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                  <span style={{ marginRight: '6px' }}>⚛</span>
                  {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
                  <span style={{ marginLeft: '6px' }}>⚛</span>
                </h2>
              </div>

              {/* Heading 2 */}
              {maxwinConfig.heading2 && (
                <div className="text-center mb-2">
                  <h3 className="text-base font-bold uppercase" style={{color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                    {maxwinConfig.heading2}
                  </h3>
                </div>
              )}

              {/* Text Items */}
              {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
                <div className="space-y-1.5">
                  {maxwinConfig.textItems.map((item, index) => (
                    <div
                      key={index}
                      className="text-center py-1.5 px-3 rounded"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}15, ${primaryColor}25, ${primaryColor}15)`,
                        borderLeft: `3px solid ${primaryColor}`
                      }}
                    >
                      <p className="text-sm font-semibold" style={{color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer (40px) - Telegram Info */}
      <div className="flex-shrink-0 relative z-10">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
            borderTop: `2px solid ${primaryColor}50`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor} style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {footerConfig?.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
