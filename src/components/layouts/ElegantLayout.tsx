'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

// Helper function to create darker/lighter colors from hex
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * percent / 100)));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// RTP Badge Component
function RTPBadge({ rtp }: { rtp: number }) {
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

// Elegant Game Card Component
interface ElegantGameCardProps {
  game: Game;
  rtp: number;
  primaryColor: string;
  cardSize: number;
}

function ElegantGameCard({ game, rtp, primaryColor, cardSize }: ElegantGameCardProps) {
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(145deg, ${darkPrimary}f2 0%, ${darkerPrimary} 100%)`,
        borderRadius: '12px',
        border: `2px solid ${primaryColor}80`,
        boxShadow: `0 4px 20px ${primaryColor}30, inset 0 2px 10px rgba(255,255,255,0.1)`
      }}
    >
      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Badge */}
        <div className="absolute top-1 right-1">
          <RTPBadge rtp={rtp} />
        </div>
        {/* Elegant overlay effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}10 0%, transparent 50%, ${primaryColor}15 100%)`
          }}
        />
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: `linear-gradient(to bottom, ${darkPrimary}f0, ${darkerPrimary})`,
          borderTop: `1px solid ${primaryColor}30`
        }}
      >
        <h3
          className="text-[13px] font-semibold leading-tight"
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

// Elegant Trik Panel Component
function ElegantTrikPanel({
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
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(145deg, ${darkPrimary}f2 0%, ${darkerPrimary} 100%)`,
        borderRadius: '12px',
        border: `2px solid ${providerColor}80`,
        boxShadow: `0 4px 20px ${providerColor}30, inset 0 2px 10px rgba(255,255,255,0.1)`
      }}
    >
      {/* Elegant border effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[10px]"
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
        <h3
          className="font-bold uppercase tracking-wider"
          style={{
            color: '#ffffff',
            fontSize: `${sizes.title}px`,
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >
          {trik.title || 'TRIK GACOR'}
        </h3>
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
            padding: `${sizes.padding + 5}px`,
            borderRadius: '8px',
            border: `1px solid ${providerColor}40`
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
                background: `linear-gradient(90deg, ${providerColor}10, ${providerColor}20, ${providerColor}10)`,
                padding: `${sizes.padding}px`,
                borderRadius: '6px',
                borderLeft: `2px solid ${providerColor}80`
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
              background: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
              padding: `${sizes.padding}px`,
              borderRadius: '6px'
            }}
          >
            <p
              className="font-semibold uppercase leading-tight"
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

interface ElegantLayoutProps {
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

export default function ElegantLayout({
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
}: ElegantLayoutProps) {
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
        fontFamily: 'var(--font-exo2), sans-serif',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='${encodeURIComponent(primaryColor)}' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header 1 - Title (55px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          height: '55px',
          background: `linear-gradient(135deg, rgba(20,20,20,0.95), rgba(40,35,30,0.95))`,
          backgroundImage: `linear-gradient(135deg, rgba(20,20,20,0.95), rgba(40,35,30,0.95)), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)`,
          borderBottom: `1px solid ${primaryColor}`,
          borderTop: `1px solid ${primaryColor}60`,
          boxShadow: `0 2px 15px ${primaryColor}30, inset 0 1px 0 rgba(255,255,255,0.1)`
        }}
      >
        {/* Diamond pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='${encodeURIComponent(primaryColor)}' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Decorative diamond icons */}
        <div className="absolute left-6 flex items-center gap-1.5">
          <span style={{ color: primaryColor, fontSize: '14px', textShadow: `0 0 8px ${primaryColor}` }}>♦</span>
          <span style={{ color: primaryColor, fontSize: '12px', textShadow: `0 0 6px ${primaryColor}` }}>✧</span>
        </div>

        <h1
          className={`${getFontSizeClass()} uppercase tracking-wider leading-tight text-center relative z-10`}
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${adjustColor(primaryColor, 20)} 50%, ${primaryColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            filter: `drop-shadow(0 0 8px ${primaryColor}60) drop-shadow(0 2px 4px rgba(0,0,0,0.5))`
          }}
        >
          {customHeaderText}
        </h1>

        <div className="absolute right-6 flex items-center gap-1.5">
          <span style={{ color: primaryColor, fontSize: '12px', textShadow: `0 0 6px ${primaryColor}` }}>✧</span>
          <span style={{ color: primaryColor, fontSize: '14px', textShadow: `0 0 8px ${primaryColor}` }}>♦</span>
        </div>
      </div>

      {/* Header 2 - Logo, Time, Date, RTP LIVE badge (45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative overflow-hidden"
        style={{
          height: '45px',
          background: `linear-gradient(135deg, rgba(30,28,25,0.95), rgba(45,40,35,0.95))`,
          backgroundImage: `linear-gradient(135deg, rgba(30,28,25,0.95), rgba(45,40,35,0.95)), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.01) 8px, rgba(255,255,255,0.01) 16px)`,
          borderBottom: `1px solid ${primaryColor}80`,
          borderTop: `1px solid ${primaryColor}40`,
          boxShadow: `0 2px 12px ${primaryColor}25, inset 0 1px 0 rgba(255,255,255,0.08)`
        }}
      >
        {/* Marble texture hint overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${primaryColor}40 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${primaryColor}30 0%, transparent 50%)`
          }}
        />

        {/* Logo with elegant divider */}
        <div className="flex items-center gap-3 relative z-10">
          <span style={{ color: primaryColor, fontSize: '16px', opacity: 0.6 }}>✧</span>
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-8 object-contain"
            style={{ filter: `drop-shadow(0 0 6px ${primaryColor}80) drop-shadow(0 2px 4px rgba(0,0,0,0.4))` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
          <div style={{ width: '1px', height: '24px', background: `linear-gradient(to bottom, transparent, ${primaryColor}80, transparent)` }} />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4 relative z-10">
          <div style={{ width: '1px', height: '24px', background: `linear-gradient(to bottom, transparent, ${primaryColor}60, transparent)` }} />
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '17px',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, 15)})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 4px ${primaryColor}60) drop-shadow(0 1px 2px rgba(0,0,0,0.5))`
              }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: primaryColor, opacity: 0.5, fontSize: '12px' }}>♦</span>
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                fontWeight: 500,
                background: `linear-gradient(135deg, ${primaryColor}dd, ${adjustColor(primaryColor, 10)}dd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 3px ${primaryColor}50) drop-shadow(0 1px 2px rgba(0,0,0,0.4))`
              }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* RTP LIVE badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}e6, ${adjustColor(primaryColor, 20)}e6)`,
              boxShadow: `0 0 12px ${primaryColor}60, inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.25)`,
              border: `1px solid ${primaryColor}`,
              borderRadius: '4px'
            }}
          >
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>RTP LIVE</span>
          </div>
          <span style={{ color: primaryColor, fontSize: '16px', opacity: 0.6 }}>✧</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Game Modal Row (264px height) */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(145deg, ${darkPrimary}f2 0%, ${darkerPrimary} 100%)`,
              borderRadius: '12px',
              border: `2px solid ${primaryColor}80`,
              boxShadow: `0 4px 20px ${primaryColor}30, inset 0 2px 10px rgba(255,255,255,0.1)`
            }}
          >
            {/* Elegant corner decorations */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-bold tracking-wider uppercase"
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PRAGMATIC PLAY
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <ElegantGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} primaryColor={primaryColor} cardSize={cardSize} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(145deg, ${darkPrimary}f2 0%, ${darkerPrimary} 100%)`,
              borderRadius: '12px',
              border: `2px solid ${secondaryColor}80`,
              boxShadow: `0 4px 20px ${secondaryColor}30, inset 0 2px 10px rgba(255,255,255,0.1)`
            }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}` }} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor, boxShadow: `0 0 8px ${secondaryColor}` }} />

            <div className="text-center mb-2">
              <h2
                className="font-bold tracking-wider uppercase"
                style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PG SOFT
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <ElegantGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} primaryColor={secondaryColor} cardSize={cardSize} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row (400px height) */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <ElegantTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <ElegantTrikPanel
                  trik={pgSoftTrik}
                  providerColor={secondaryColor}
                  primaryColor={primaryColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Telegram Info (40px) */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(135deg, ${darkPrimary}, ${darkerPrimary})`,
            borderTop: `2px solid ${primaryColor}80`,
            boxShadow: `0 -2px 10px ${primaryColor}20`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor} style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-semibold"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {footerConfig?.footer1 || `@${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
