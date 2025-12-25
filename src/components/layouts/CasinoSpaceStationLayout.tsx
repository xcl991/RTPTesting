'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface CasinoSpaceStationLayoutProps {
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

// Space Game Card Component
function SpaceGameCard({ game, rtp, primaryColor, secondaryColor, bayNumber, darkBackground }: { game: Game; rtp: number; primaryColor: string; secondaryColor: string; bayNumber: number; darkBackground: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '145px',
        flexShrink: 0,
        background: `linear-gradient(135deg, ${darkBackground}e6, ${darkBackground}f2)`,
        border: `1px solid ${primaryColor}60`,
        borderRadius: '8px',
        boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
      }}
    >
      {/* Hexagonal Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          borderRadius: '8px'
        }}
      />

      {/* Status Indicators */}
      <div className="absolute top-2 left-2 flex gap-1 z-20">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, animationDelay: '0.5s' }} />
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, animationDelay: '1s' }} />
      </div>

      {/* Bay Number */}
      <div
        className="absolute top-2 right-2 px-2 py-1 text-xs font-mono font-bold z-20"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          color: '#000',
          borderRadius: '4px',
          boxShadow: `0 0 10px ${primaryColor}`
        }}
      >
        BAY-{bayNumber.toString().padStart(3, '0')}
      </div>

      {/* Game Image */}
      <div className="relative z-10 p-3">
        <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/60" style={{ borderRadius: '8px' }}>
          <img
            src={game.src}
            alt={game.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23001428'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234da6ff' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
            }}
          />
          {/* RTP Badge */}
          <div className="absolute top-1 right-1">
            <div
              className="px-2 py-1 font-black text-[11px] text-white"
              style={{
                background: rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444',
                borderRadius: '4px',
                boxShadow: `0 0 10px ${rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444'}`,
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              {rtp}%
            </div>
          </div>
        </div>

        {/* Game Name */}
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

      {/* Hover Frame */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `2px solid ${primaryColor}`,
          boxShadow: `0 0 30px ${primaryColor} inset`,
          borderRadius: '8px'
        }}
      />
    </div>
  );
}

// Pattern Display
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

// Space Station Trik Panel
function SpaceTrikPanel({
  trik,
  providerColor,
  primaryColor,
  darkBackground,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  primaryColor: string;
  darkBackground: string;
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

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkBackground}e6, ${darkBackground}f2)`,
        borderRadius: '8px',
        border: `1px solid ${providerColor}60`,
        boxShadow: `0 0 30px ${providerColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
      }}
    >
      {/* Hexagonal Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          borderRadius: '8px'
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative z-10"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">⚡</span>
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: '#ffffff',
              fontSize: `${sizes.title}px`,
              fontFamily: 'monospace',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <span className="text-lg">⚡</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-10"
        style={{ padding: `${sizes.padding}px`, gap: `${sizes.gap}px` }}
      >
        {/* Deposit Kode | Fitur Ganda | Putaran Bet - 1 Row */}
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
              {trik.fiturGanda ? '⚡ ON' : '❌ OFF'}
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
              ⚡ {trik.customText} ⚡
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CasinoSpaceStationLayout({
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
}: CasinoSpaceStationLayoutProps) {
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

  // Card size 145px for 3 games
  const cardSize = 145;

  // Generate RTP for games (3 games each)
  const pragmaticGamesWithRTP = selectedPragmaticGames.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const pgSoftGamesWithRTP = selectedPgSoftGames.slice(0, 3).map(game => ({
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
      {/* Space Nebula Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${primaryColor}40 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${secondaryColor}40 0%, transparent 50%)`,
          filter: 'blur(60px)'
        }}
      />

      {/* Header 1 - Space Command Center Title (55px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative z-10"
        style={{
          height: '55px',
          background: `radial-gradient(ellipse at center, ${darkPrimary}e6, ${darkerPrimary}f2), url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.5' fill='white' opacity='0.3'/%3E%3Ccircle cx='80' cy='25' r='0.7' fill='white' opacity='0.4'/%3E%3Ccircle cx='150' cy='15' r='0.4' fill='white' opacity='0.5'/%3E%3Ccircle cx='220' cy='30' r='0.6' fill='white' opacity='0.3'/%3E%3Ccircle cx='300' cy='20' r='0.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='45' cy='40' r='0.3' fill='white' opacity='0.6'/%3E%3Ccircle cx='360' cy='35' r='0.8' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(5px)',
          border: `2px solid ${primaryColor}80`,
          borderLeft: `4px solid ${primaryColor}`,
          borderRight: `4px solid ${secondaryColor}`,
          boxShadow: `0 4px 20px ${primaryColor}40, inset 0 0 30px rgba(0,50,100,0.2)`
        }}
      >
        {/* Control Panel LED Indicators - Left */}
        <div className="absolute left-4 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px #4ade80' }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '0.3s' }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.6s' }} />
        </div>

        {/* Constellation Pattern Decorations */}
        <div className="absolute left-20 flex items-center gap-1 opacity-60">
          <div className="w-1 h-1 rounded-full" style={{ background: primaryColor }} />
          <div className="w-0.5 h-px" style={{ width: '12px', background: primaryColor }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: primaryColor }} />
        </div>

        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px ${primaryColor}80`,
            fontFamily: 'monospace'
          }}
        >
          {customHeaderText}
        </h1>

        {/* Constellation Pattern Decorations - Right */}
        <div className="absolute right-20 flex items-center gap-1 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: secondaryColor }} />
          <div className="w-0.5 h-px" style={{ width: '12px', background: secondaryColor }} />
          <div className="w-1 h-1 rounded-full" style={{ background: secondaryColor }} />
        </div>

        {/* Control Panel LED Indicators - Right */}
        <div className="absolute right-4 flex gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.9s' }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '1.2s' }} />
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ boxShadow: '0 0 8px #60a5fa', animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Header 2 - Mission Control Panel (45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative z-10"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkerPrimary}dd, ${darkPrimary}ee, ${darkerPrimary}dd), url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white' opacity='0.2'/%3E%3Ccircle cx='80' cy='15' r='0.5' fill='white' opacity='0.3'/%3E%3Ccircle cx='140' cy='25' r='0.7' fill='white' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(5px)',
          borderBottom: `2px solid ${primaryColor}60`,
          boxShadow: `inset 0 0 20px rgba(0,50,100,0.15)`
        }}
      >
        {/* Technical Border Elements */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, ${primaryColor}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${secondaryColor})` }} />

        {/* Logo with LED */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 6px #22d3ee' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 6px #4ade80', animationDelay: '0.5s' }} />
          </div>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time, Date & Badges */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: primaryColor, opacity: 0.6 }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
            >
              {getCurrentDate()}
            </span>
          </div>

          {/* Maxwin Button */}
          {maxwinConfig?.enabled && (
            <button
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                <path d="M20 3v4"/>
                <path d="M22 5h-4"/>
                <path d="M4 17v2"/>
                <path d="M5 18H3"/>
              </svg>
              Maxwin Info
            </button>
          )}

          {/* RTP LIVE Badge - Mission Control Style */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}dd, ${adjustColor(primaryColor, 20)})`,
              border: `1px solid ${primaryColor}`,
              boxShadow: `0 0 15px ${primaryColor}80, inset 0 0 10px rgba(255,255,255,0.1)`
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ boxShadow: '0 0 6px #fff' }} />
            <span className="text-xs font-black text-white" style={{ fontFamily: 'monospace' }}>RTP LIVE</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden relative z-10" style={{ minHeight: 0 }}>
        {/* Game Modal Row (264px height) */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Play */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `${darkPrimary}99`,
              borderRadius: '12px',
              border: `2px solid ${primaryColor}60`,
              boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
            }}
          >
            {/* Hexagonal Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
                borderRadius: '12px'
              }}
            />

            {/* Status Indicators */}
            <div className="absolute top-2 left-2 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor }} />
            </div>
            <div className="absolute top-2 right-2 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, animationDelay: '0.5s' }} />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                🚀 PRAGMATIC PLAY 🚀
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pragmaticGamesWithRTP.map((game, index) => (
                <SpaceGameCard
                  key={`pragmatic-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  bayNumber={index + 1}
                  darkBackground={darkerPrimary}
                />
              ))}
            </div>
          </div>

          {/* PG Soft */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `${darkSecondary}99`,
              borderRadius: '12px',
              border: `2px solid ${secondaryColor}60`,
              boxShadow: `0 0 30px ${secondaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
            }}
          >
            {/* Hexagonal Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(secondaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
                borderRadius: '12px'
              }}
            />

            {/* Status Indicators */}
            <div className="absolute top-2 left-2 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor }} />
            </div>
            <div className="absolute top-2 right-2 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, animationDelay: '0.5s' }} />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                🛸 PG SOFT 🛸
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pgSoftGamesWithRTP.map((game, index) => (
                <SpaceGameCard
                  key={`pgsoft-${index}`}
                  game={game}
                  rtp={game.rtp}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
                  bayNumber={index + 101}
                  darkBackground={adjustColor(secondaryColor, -90)}
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
                <SpaceTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                  darkBackground={darkerPrimary}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <SpaceTrikPanel
                  trik={pgSoftTrik}
                  providerColor={secondaryColor}
                  primaryColor={secondaryColor}
                  darkBackground={adjustColor(secondaryColor, -90)}
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
              background: `linear-gradient(135deg, ${darkPrimary}e6, ${darkPrimary}f2)`,
              border: `2px solid ${primaryColor}60`,
              boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px rgba(0,50,100,0.3)`
            }}
          >
            {/* Hexagonal Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Star field effect - scattered stars */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white' opacity='0.3'/%3E%3Ccircle cx='80' cy='15' r='0.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='140' cy='25' r='0.7' fill='white' opacity='0.3'/%3E%3Ccircle cx='60' cy='50' r='0.6' fill='white' opacity='0.5'/%3E%3Ccircle cx='170' cy='60' r='0.4' fill='white' opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
              }}
            />

            {/* LED Indicators - left */}
            <div className="absolute left-4 top-3 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px #4ade80' }} />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '0.3s' }} />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.6s' }} />
            </div>

            {/* LED Indicators - right */}
            <div className="absolute right-4 top-3 flex gap-1 z-20">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.9s' }} />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '1.2s' }} />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px #4ade80', animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10">
              {/* Heading 1 */}
              <div className="text-center mb-2">
                <h2 className="text-lg font-black uppercase tracking-wide" style={{color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                  <span style={{ marginRight: '6px' }}>🚀</span>
                  {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
                  <span style={{ marginLeft: '6px' }}>🚀</span>
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

      {/* Footer - Space Station Telegram (40px) */}
      <div className="flex-shrink-0 relative z-10">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, ${darkPrimary}cc, ${darkerPrimary}ee, ${darkPrimary}cc)`,
            border: `2px solid ${primaryColor}60`,
            boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 40px ${primaryColor}10`
          }}
        >
          {/* Animated scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${primaryColor}08 50%, transparent 100%)`,
              backgroundSize: '100% 4px'
            }}
          />

          {/* Hexagonal pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L30 10L30 20L20 25L10 20L10 10Z' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='0.5' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Status indicators left */}
          <div className="flex items-center gap-2 absolute left-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, animationDelay: '0.3s' }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, animationDelay: '0.6s' }} />
          </div>

          {/* Telegram Icon with Space Frame */}
          <div
            className="relative w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
              border: `2px solid ${primaryColor}`,
              boxShadow: `0 0 20px ${primaryColor}80, inset 0 0 10px ${primaryColor}40`
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill={primaryColor}
              style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.48 1.02-.73 3.99-1.74 6.66-2.89 8-3.45 3.82-1.66 4.61-1.95 5.13-1.96.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.29.01.45z"/>
            </svg>
          </div>

          {/* Telegram Text */}
          <span
            className="text-sm font-bold relative z-10"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {footerConfig?.footer1 || `@${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>

          {/* Status indicators right */}
          <div className="flex items-center gap-2 absolute right-4">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: secondaryColor, animationDelay: '0.9s' }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor, animationDelay: '1.2s' }} />
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
