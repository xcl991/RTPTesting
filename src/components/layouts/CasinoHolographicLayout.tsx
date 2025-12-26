'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Jackpot Badge
function JackpotBadge({ rtp }: { rtp: number }) {
  const bgColor = rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444';

  return (
    <div
      className="px-2 py-1 font-black text-[11px] text-white"
      style={{
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
        borderRadius: '4px',
        boxShadow: `0 0 10px ${bgColor}, 0 2px 4px rgba(0,0,0,0.5)`,
        border: '1px solid rgba(255,255,255,0.3)'
      }}
    >
      {rtp}% HOT
    </div>
  );
}

// Holographic Game Card
function HolographicGameCard({ game, rtp, cardSize, primaryColor, secondaryColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string; secondaryColor: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10, ${primaryColor}10)`,
        borderRadius: '16px',
        border: `1px solid ${primaryColor}40`,
        boxShadow: `0 0 30px ${primaryColor}30, 0 0 60px ${secondaryColor}20, inset 0 0 30px rgba(255,255,255,0.05)`,
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Holographic corner lights */}
      <div className="absolute top-0 left-0 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}` }} />
      <div className="absolute top-0 right-0 w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}, 0 0 20px ${secondaryColor}` }} />

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px`, borderRadius: '12px 12px 0 0' }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23001a33"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2300ffff" font-family="monospace" font-size="10"%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Badge */}
        <div className="absolute top-1 right-1">
          <JackpotBadge rtp={rtp} />
        </div>
        {/* Holographic overlay effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}20 0%, transparent 20%, transparent 80%, ${secondaryColor}20 100%)`
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: `rgba(0,0,0,0.4)`,
          backdropFilter: 'blur(5px)'
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            overflow: 'hidden',
            height: '28px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {game.name}
        </h3>
      </div>
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

// Holographic Trik Panel
function HolographicTrikPanel({
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

  // Apply card style with theme fallbacks
  const themeBackground = `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15, ${primaryColor}15)`;
  const containerBackground = cardStyle?.background === 'theme' ? themeBackground : (cardStyle?.background || themeBackground);
  const containerBorder = cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid ${providerColor}60`;
  const containerShadow = cardStyle?.shadow ? (cardStyle.shadow.includes('0 0 20px') ? `${cardStyle.shadow} ${providerColor}` : cardStyle.shadow) : `0 0 20px ${providerColor}40, inset 0 0 30px rgba(255,255,255,0.05)`;
  const containerOpacity = cardStyle?.opacity || 1;
  const blurClass = cardStyle?.blur && cardStyle.blur !== 'none' ? cardStyle.blur : '';

  return (
    <div
      className={`h-full overflow-hidden flex flex-col relative ${blurClass}`}
      style={{
        background: containerBackground,
        borderRadius: '16px',
        border: containerBorder,
        boxShadow: containerShadow,
        backdropFilter: 'blur(15px)',
        opacity: containerOpacity
      }}
    >
      {/* Pattern overlay */}
      {cardStyle?.pattern && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[16px]"
          style={{
            backgroundImage: cardStyle.pattern,
            opacity: 0.1
          }}
        />
      )}
      {/* Holographic shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[13px]"
        style={{
          background: `linear-gradient(45deg, transparent 40%, ${providerColor}20 50%, transparent 60%)`,
          backgroundSize: '200% 200%'
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">💎</span>
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: '#ffffff',
              fontSize: `${sizes.title}px`,
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <span className="text-lg">💎</span>
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
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            padding: `${sizes.padding + 5}px`,
            borderRadius: '12px',
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
                backdropFilter: 'blur(5px)',
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
              backdropFilter: 'blur(5px)',
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
              💎 {trik.customText} 💎
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface CasinoHolographicLayoutProps {
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

export default function CasinoHolographicLayout({
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
}: CasinoHolographicLayoutProps) {
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

  const primaryColor = selectedStyle.primaryColor;
  const secondaryColor = selectedStyle.secondaryColor;

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
        fontFamily: 'monospace',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Grid Mesh Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header 1 - Holographic Title (55px) - Hologram Projection Theme */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          height: '55px',
          background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20, ${primaryColor}20)`,
          backdropFilter: 'blur(10px)',
          borderBottom: `3px solid transparent`,
          borderImage: `linear-gradient(90deg, ${primaryColor}, #ff00ff, ${secondaryColor}, #00ffff, ${primaryColor}) 1`,
          boxShadow: `0 0 20px ${primaryColor}30, inset 0 0 30px rgba(255,255,255,0.05)`
        }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${primaryColor}30 40%, ${secondaryColor}30 50%, #ff00ff30 60%, transparent 70%)`,
            backgroundSize: '200% 200%'
          }}
        />
        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
          }}
        />
        {/* Holographic grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `linear-gradient(${primaryColor}30 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}30 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        {/* Holographic decorations */}
        <div className="absolute left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}, 0 0 30px ${primaryColor}80` }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 15px ${secondaryColor}, 0 0 30px ${secondaryColor}80` }} />
        </div>
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center relative z-10`}
          style={{
            color: '#ffffff',
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px ${primaryColor}, 0 0 40px ${secondaryColor}, 0 4px 8px rgba(0,0,0,0.5)`
          }}
        >
          {customHeaderText}
        </h1>
        <div className="absolute right-4 flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 15px ${secondaryColor}, 0 0 30px ${secondaryColor}80` }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}, 0 0 30px ${primaryColor}80` }} />
        </div>
      </div>

      {/* Header 2 - Logo, Time, Date, RTP LIVE badge (45px) - Hologram Theme */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative overflow-hidden"
        style={{
          height: '45px',
          background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
          backdropFilter: 'blur(10px)',
          borderBottom: `2px solid transparent`,
          borderImage: `linear-gradient(90deg, ${primaryColor}60, ${secondaryColor}60, #ff00ff60, ${primaryColor}60) 1`
        }}
      >
        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
          }}
        />
        {/* Holographic grid pattern - subtle */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${secondaryColor}20 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 12px ${primaryColor}, 0 0 24px ${primaryColor}80` }} />
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80) drop-shadow(0 0 20px ${secondaryColor}60)` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23001a33"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2300ffff" font-family="monospace" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{
                fontSize: '20px',
                color: '#ffffff',
                textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 10px ${primaryColor}, 0 2px 4px rgba(0,0,0,0.5)`
              }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: '#ffffff' }}>|</span>
            <span
              className="font-medium"
              style={{
                fontSize: '18px',
                color: '#ffffff',
                textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 8px ${secondaryColor}, 0 2px 4px rgba(0,0,0,0.5)`
              }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* RTP LIVE indicator - Prism/rainbow effect */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full relative"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40, #ff00ff40)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid transparent`,
              borderImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, #ff00ff, #00ffff) 1`,
              boxShadow: `0 0 15px ${primaryColor}50, 0 0 25px ${secondaryColor}30, inset 0 0 15px rgba(255,255,255,0.1)`
            }}
          >
            {/* Holographic shimmer on badge */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent 20%, ${primaryColor}40 40%, ${secondaryColor}40 60%, transparent 80%)`,
                backgroundSize: '200% 100%'
              }}
            />
            <div className="w-2 h-2 rounded-full animate-pulse relative z-10" style={{ backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e, 0 0 16px #22c55e80' }} />
            <span className="text-xs font-black text-white relative z-10" style={{ textShadow: '0 0 8px rgba(0,0,0,0.8), 1px 1px 2px #000' }}>RTP LIVE</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Game Modal Row */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Games */}
          <div
            className={`flex-1 overflow-hidden p-3 relative ${getBlurClass()}`}
            style={{
              ...getCardContainerStyle(primaryColor),
              borderRadius: '20px'
            }}
          >
            {/* Pattern overlay */}
            {selectedCardStyle?.pattern && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[20px]"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  opacity: 0.1
                }}
              />
            )}
            {/* Holographic corner dots */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                💎 PRAGMATIC PLAY 💎
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <HolographicGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} secondaryColor={secondaryColor} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className={`flex-1 overflow-hidden p-3 relative ${getBlurClass()}`}
            style={{
              ...getCardContainerStyle(secondaryColor),
              borderRadius: '20px'
            }}
          >
            {/* Pattern overlay */}
            {selectedCardStyle?.pattern && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[20px]"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  opacity: 0.1
                }}
              />
            )}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                💎 PG SOFT 💎
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <HolographicGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={secondaryColor} secondaryColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <HolographicTrikPanel
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
                <HolographicTrikPanel
                  trik={pgSoftTrik}
                  providerColor={secondaryColor}
                  primaryColor={secondaryColor}
                  secondaryColor={primaryColor}
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
          className={`mx-4 mb-2 rounded-xl p-3 relative overflow-hidden ${getBlurClass()}`}
          style={{
            background: selectedCardStyle?.background === 'theme' ? `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15, ${primaryColor}15)` : (selectedCardStyle?.background || `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15, ${primaryColor}15)`),
            backdropFilter: 'blur(15px)',
            border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${primaryColor}` : `2px solid transparent`,
            borderImage: selectedCardStyle?.border ? undefined : `linear-gradient(90deg, ${primaryColor}, #ff00ff, ${secondaryColor}, #00ffff, ${primaryColor}) 1`,
            boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${primaryColor}` : selectedCardStyle.shadow) : `0 0 30px ${primaryColor}30, 0 0 60px ${secondaryColor}20, inset 0 0 30px rgba(255,255,255,0.05)`,
            opacity: selectedCardStyle?.opacity || 1
          }}
        >
          {/* Pattern overlay */}
          {selectedCardStyle?.pattern && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                backgroundImage: selectedCardStyle.pattern,
                opacity: 0.1
              }}
            />
          )}
          {/* Holographic shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${primaryColor}30 40%, ${secondaryColor}30 50%, #ff00ff30 60%, transparent 70%)`,
              backgroundSize: '200% 200%'
            }}
          />
          {/* Scanlines effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
            }}
          />

          {/* Heading 1 */}
          <div className="text-center mb-2 relative z-10">
            <h2
              className="text-lg font-black uppercase tracking-wide"
              style={{
                color: '#ffffff',
                textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px ${primaryColor}, 0 0 40px ${secondaryColor}`
              }}
            >
              {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
            </h2>
          </div>

          {/* Heading 2 */}
          {maxwinConfig.heading2 && (
            <div className="text-center mb-2 relative z-10">
              <h3
                className="text-base font-bold uppercase"
                style={{
                  color: '#ffffff',
                  textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 15px ${secondaryColor}`
                }}
              >
                {maxwinConfig.heading2}
              </h3>
            </div>
          )}

          {/* Text Items in 2-column grid */}
          {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
            <div className="grid grid-cols-2 gap-2 relative z-10">
              {maxwinConfig.textItems.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}20, ${secondaryColor}20, ${primaryColor}20)`,
                    backdropFilter: 'blur(5px)',
                    border: `1px solid ${index % 2 === 0 ? primaryColor : secondaryColor}50`,
                    boxShadow: `0 0 15px ${index % 2 === 0 ? primaryColor : secondaryColor}20`
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: '#ffffff',
                      textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer - Holographic Style */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20, ${primaryColor}20)`,
            backdropFilter: 'blur(10px)',
            borderTop: `2px solid ${primaryColor}40`,
            boxShadow: `0 0 20px ${primaryColor}30, inset 0 0 30px rgba(255,255,255,0.05)`
          }}
        >
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.5s' }} />
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor} style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {footerConfig?.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}`, animationDelay: '0.25s' }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '0.75s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
