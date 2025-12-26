'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

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
  hideFiturGanda = false,
  cardStyle
}: {
  trik: TrikConfig;
  providerColor: string;
  primaryColor: string;
  secondaryColor: string;
  hideFiturGanda?: boolean;
  cardStyle?: CardStyleOption;
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

  // Card Style Support
  const getBlurClass = () => {
    if (!cardStyle?.blur || cardStyle.blur === 'none') return '';
    return cardStyle.blur;
  };

  const themeBackground = `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`;
  const defaultBackground = `linear-gradient(135deg, ${darkPrimary} 0%, ${darkerPrimary} 50%, ${adjustColor(primaryColor, -70)} 100%)`;

  return (
    <div
      className={`h-full overflow-hidden flex flex-col relative ${getBlurClass()}`}
      style={{
        background: cardStyle?.background === 'theme' ? themeBackground : (cardStyle?.background || defaultBackground),
        borderRadius: '8px',
        border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `3px double ${providerColor}`,
        opacity: cardStyle?.opacity || 1,
        boxShadow: cardStyle?.shadow ? (cardStyle.shadow.includes('0 0 20px') ? `${cardStyle.shadow} ${providerColor}` : cardStyle.shadow) : `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${providerColor}20`
      }}
    >
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: cardStyle?.pattern || `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
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
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  footerConfig,
  maxwinConfig
}: CasinoMedievalKingdomLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  // Card Style Helpers
  const getBlurClass = () => {
    if (!selectedCardStyle?.blur || selectedCardStyle.blur === 'none') return '';
    return selectedCardStyle.blur;
  };

  const getCardContainerStyle = (color: string) => {
    const themeBackground = `linear-gradient(135deg, ${adjustColor(color, -30)}ee 0%, ${adjustColor(color, -50)}ee 50%, ${adjustColor(color, -60)}ee 100%)`;
    return {
      background: selectedCardStyle?.background === 'theme' ? themeBackground : (selectedCardStyle?.background || `linear-gradient(135deg, ${adjustColor(color, -40)} 0%, ${adjustColor(color, -60)} 100%)`),
      border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : `3px solid ${color}`,
      opacity: selectedCardStyle?.opacity || 1,
      boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${color}` : selectedCardStyle.shadow) : `0 0 30px ${color}50, inset 0 0 40px rgba(0,0,0,0.5)`
    };
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

      {/* Header 1 - Royal Kingdom Banner (55px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: `linear-gradient(180deg, ${darkPrimary}e6, ${darkerPrimary}dd, ${adjustColor(primaryColor, -70)}f2), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'multiply',
          border: `4px double ${primaryColor}`,
          borderLeft: 'none',
          borderRight: 'none',
          boxShadow: `0 10px 30px rgba(0,0,0,0.8), inset 0 3px 0 rgba(255,215,0,0.25), inset 0 -2px 0 rgba(0,0,0,0.3), 0 0 50px ${primaryColor}40`
        }}
      >
        {/* Torch flames - Left */}
        <div className="absolute left-4 flex items-center gap-1">
          <span className="text-2xl animate-pulse" style={{ animationDuration: '1.5s' }}>🔥</span>
          <div className="flex flex-col items-center">
            <span className="text-lg" style={{ color: primaryColor }}>🛡</span>
          </div>
        </div>

        {/* Royal Crest Left */}
        <div className="absolute left-20 flex items-center gap-2 opacity-80">
          <span className="text-lg" style={{ color: secondaryColor }}>👑</span>
          <span className="text-base" style={{ color: primaryColor }}>⚜️</span>
        </div>

        {/* Scroll decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}60, ${secondaryColor}60, ${primaryColor}60, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${secondaryColor}60, ${primaryColor}60, ${secondaryColor}60, transparent)` }} />

        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 15px ${primaryColor}60`,
            fontFamily: 'serif'
          }}
        >
          {customHeaderText}
        </h1>

        {/* Royal Crest Right */}
        <div className="absolute right-20 flex items-center gap-2 opacity-80">
          <span className="text-base" style={{ color: secondaryColor }}>⚜️</span>
          <span className="text-lg" style={{ color: primaryColor }}>⚔️</span>
        </div>

        {/* Torch flames & Castle - Right */}
        <div className="absolute right-4 flex items-center gap-1">
          <div className="flex flex-col items-center">
            <span className="text-lg" style={{ color: secondaryColor }}>🛡</span>
          </div>
          <span className="text-2xl animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.7s' }}>🔥</span>
        </div>
      </div>

      {/* Header 2 - Royal Court Panel (45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative"
        style={{
          height: '45px',
          background: `linear-gradient(135deg, ${darkPrimary}dd, ${darkerPrimary}e6, ${darkPrimary}dd), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zm30 0h20v20H30zM0 30h20v20H0zm30 0h20v20H30z' fill='%23000' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'multiply',
          borderBottom: `3px double ${primaryColor}60`,
          boxShadow: `inset 0 2px 0 rgba(255,215,0,0.15)`
        }}
      >
        {/* Medieval banner decorative borders */}
        <div className="absolute top-0 left-0 w-8 h-full" style={{ background: `linear-gradient(to right, ${primaryColor}20, transparent)` }} />
        <div className="absolute top-0 right-0 w-8 h-full" style={{ background: `linear-gradient(to left, ${secondaryColor}20, transparent)` }} />

        {/* Logo with Shield */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="text-xl opacity-80" style={{ color: primaryColor }}>🛡</span>
            <div className="absolute -top-1 -right-1">
              <span className="text-sm">👑</span>
            </div>
          </div>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 4px 8px ${primaryColor}80) contrast(1.15)` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
          <span className="text-base opacity-70" style={{ color: secondaryColor }}>⚔️</span>
        </div>

        {/* Time & Date with Royal Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'serif' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: primaryColor, opacity: 0.6 }}>⚜️</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'serif' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* RTP LIVE Badge - Royal Crest Style */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded relative"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}ee, ${secondaryColor}dd)`,
              border: `2px solid ${primaryColor}`,
              boxShadow: `0 4px 12px ${primaryColor}80, inset 0 1px 0 rgba(255,215,0,0.4)`
            }}
          >
            <span className="text-xs font-black" style={{ color: '#1a0a00', fontFamily: 'serif' }}>👑 RTP LIVE</span>
            {/* Corner decorations */}
            <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t-2 border-l-2" style={{ borderColor: secondaryColor }} />
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b-2 border-r-2" style={{ borderColor: secondaryColor }} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Game Modal Row */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Play Games */}
          <div
            className={`flex-1 overflow-hidden p-3 relative ${getBlurClass()}`}
            style={{
              ...getCardContainerStyle(primaryColor),
              borderRadius: '20px'
            }}
          >
            {/* Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: selectedCardStyle?.pattern || 'none',
                backgroundSize: '100px 100px',
                borderRadius: '20px'
              }}
            />

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
            className={`flex-1 overflow-hidden p-3 relative ${getBlurClass()}`}
            style={{
              ...getCardContainerStyle(primaryColor),
              borderRadius: '20px'
            }}
          >
            {/* Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: selectedCardStyle?.pattern || 'none',
                backgroundSize: '100px 100px',
                borderRadius: '20px'
              }}
            />

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
                  cardStyle={selectedCardStyle}
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
                  cardStyle={selectedCardStyle}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Maxwin Info Panel */}
      {maxwinConfig?.enabled && (
        <div
          className={`mx-4 mb-2 rounded-xl p-3 relative ${getBlurClass()}`}
          style={{
            background: selectedCardStyle?.background === 'theme' ? `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6, ${darkPrimary}d9)` : (selectedCardStyle?.background || `linear-gradient(135deg, ${darkPrimary}d9, ${darkerPrimary}e6, ${darkPrimary}d9)`),
            border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${primaryColor}` : `3px double ${primaryColor}`,
            opacity: selectedCardStyle?.opacity || 1,
            boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${primaryColor}` : selectedCardStyle.shadow) : `0 8px 24px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,215,0,0.15), 0 0 30px ${primaryColor}20`
          }}
        >
          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: selectedCardStyle?.pattern || `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm50 0h40v40H50z' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
              borderRadius: '8px'
            }}
          />

          {/* Ornamental Corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-60" style={{ borderColor: secondaryColor }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-60" style={{ borderColor: secondaryColor }} />

          {/* Heading 1 */}
          <div className="text-center mb-2 relative z-10">
            <h2 className="text-lg font-black uppercase tracking-wide" style={{
              color: '#ffffff',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              fontFamily: 'serif'
            }}>
              🛡️ {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'} 👑
            </h2>
          </div>

          {/* Heading 2 */}
          {maxwinConfig.heading2 && (
            <div className="text-center mb-2 relative z-10">
              <h3 className="text-base font-bold uppercase" style={{
                color: secondaryColor,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                fontFamily: 'serif'
              }}>
                ⚔️ {maxwinConfig.heading2} ⚔️
              </h3>
            </div>
          )}

          {/* Text Items */}
          {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
            <div className="relative z-10" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {maxwinConfig.textItems.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}15, ${primaryColor}25, ${primaryColor}15)`,
                    border: `2px solid ${primaryColor}60`,
                    borderLeft: `4px solid ${secondaryColor}`
                  }}
                >
                  <span className="text-sm font-bold" style={{
                    color: '#ffffff',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    fontFamily: 'serif'
                  }}>
                    👑 {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
