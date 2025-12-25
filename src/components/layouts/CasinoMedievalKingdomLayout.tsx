'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface CasinoMedievalKingdomLayoutProps {
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
}

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
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

// Medieval Game Card
function MedievalGameCard({ game, rtp, cardSize, primaryColor, secondaryColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string; secondaryColor: string }) {
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(180deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`,
        borderRadius: '8px',
        border: `3px solid ${primaryColor}`,
        boxShadow: `0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.3), 0 0 20px ${primaryColor}40`
      }}
    >
      {/* Medieval Stone Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          borderRadius: '8px'
        }}
      />

      {/* Ornamental Corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

      {/* Crown RTP Badge */}
      <div
        className="absolute top-1 right-1 px-2 py-1 z-20"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          color: '#1a0a00',
          borderRadius: '6px',
          border: '1px solid rgba(255,215,0,0.5)',
          boxShadow: `0 2px 4px rgba(0,0,0,0.4), 0 0 8px ${primaryColor}80`,
          fontFamily: 'serif',
          fontSize: '10px',
          fontWeight: 'bold'
        }}
      >
        👑 {rtp}%
      </div>

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px`, borderRadius: '8px 8px 0 0' }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          style={{
            filter: 'contrast(1.1) brightness(0.95)'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23261a0d'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='serif' font-size='12'%3E[MISSING]%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Inner Frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: `1px solid ${secondaryColor}30`,
            boxShadow: `inset 0 0 10px ${primaryColor}20`
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: `linear-gradient(to bottom, ${darkPrimary}f0, ${darkerPrimary})`
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontFamily: 'serif',
            overflow: 'hidden',
            height: '28px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {game.name.toUpperCase()}
        </h3>
      </div>
    </div>
  );
}

// Medieval Trik Panel
function MedievalTrikPanel({
  trik,
  providerColor,
  primaryColor,
  secondaryColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
  primaryColor: string;
  secondaryColor: string;
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
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`,
        borderRadius: '8px',
        border: `3px double ${providerColor}`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${providerColor}20`
      }}
    >
      {/* Stone Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          borderRadius: '8px'
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">⚔️</span>
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: '#ffffff',
              fontSize: `${sizes.title}px`,
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              fontFamily: 'serif'
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <span className="text-lg">⚔️</span>
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
              {trik.fiturGanda ? '🍀 ON' : '❌ OFF'}
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
              ⚔️ {trik.customText} ⚔️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CasinoMedievalKingdomLayout({
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
  footerConfig
}: CasinoMedievalKingdomLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  // Use selectedStyle colors
  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  // Card size for 3 games per side
  const cardSize = 145;

  // Generate RTP for games
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
        fontFamily: 'serif',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Parchment Texture Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Header 1 - Medieval Title with Decorations */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: `linear-gradient(180deg, ${darkPrimary}e6, ${darkerPrimary}f2)`,
          border: `3px solid ${primaryColor}`,
          borderLeft: 'none',
          borderRight: 'none',
          boxShadow: `0 10px 30px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,215,0,0.2), 0 0 40px ${primaryColor}30`
        }}
      >
        {/* Decorative elements */}
        <div className="absolute left-4 text-2xl">⚔️</div>
        <div className="absolute left-12 text-xl" style={{ color: primaryColor }}>⚜️</div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >
          {customHeaderText}
        </h1>
        <div className="absolute right-12 text-xl" style={{ color: secondaryColor }}>⚜️</div>
        <div className="absolute right-4 text-2xl">🏰</div>
      </div>

      {/* Header 2 - Logo, Time, Date, RTP LIVE Badge */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: '45px',
          background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
          borderBottom: `2px solid ${primaryColor}50`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">👑</span>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 4px 8px ${primaryColor}80) contrast(1.1)` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: '#ffffff' }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* RTP LIVE Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              border: '1px solid rgba(255,215,0,0.5)',
              boxShadow: `0 0 15px ${primaryColor}80`
            }}
          >
            <span className="text-xs font-black" style={{ color: '#1a0a00' }}>👑 RTP LIVE</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Game Modal Row */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Play Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
              borderRadius: '8px',
              border: `3px double ${primaryColor}`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
            }}
          >
            {/* Ornamental Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  fontFamily: 'serif'
                }}
              >
                ⚔️ PRAGMATIC PLAY ⚔️
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <MedievalGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} secondaryColor={secondaryColor} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
              borderRadius: '8px',
              border: `3px double ${primaryColor}`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
            }}
          >
            {/* Ornamental Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  fontFamily: 'serif'
                }}
              >
                🛡️ PG SOFT 🛡️
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <MedievalGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} secondaryColor={secondaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <MedievalTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <MedievalTrikPanel
                  trik={pgSoftTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Telegram Info */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4 relative"
          style={{
            height: '40px',
            background: `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6)`,
            border: `3px double ${primaryColor}`,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
          }}
        >
          {/* Ornamental Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

          {/* Royal Seal Icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${secondaryColor}, ${primaryColor})`,
              border: `2px solid rgba(255,215,0,0.6)`,
              boxShadow: `0 0 10px ${secondaryColor}`
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="#1a0a00"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.48 1.02-.73 3.99-1.74 6.66-2.89 8-3.45 3.82-1.66 4.61-1.95 5.13-1.96.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.29.01.45z"/>
            </svg>
          </div>
          <span
            className="text-sm font-bold"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'serif' }}
          >
            {footerConfig?.footer1 || `Join Komunitas Telegram : @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <span className="text-xl">🏰</span>
        </div>
      </div>
    </div>
  );
}
