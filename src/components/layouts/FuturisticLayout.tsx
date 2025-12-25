'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface FuturisticLayoutProps {
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

// RTP Badge - Futuristic Style
function FuturisticRtpBadge({ rtp, primaryColor }: { rtp: number; primaryColor: string }) {
  const bgColor = rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444';
  return (
    <div
      className="px-2 py-1 font-black text-[11px] text-white"
      style={{
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}99)`,
        borderRadius: '0 0 0 8px',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        boxShadow: `0 0 15px ${bgColor}`
      }}
    >
      {rtp}%
    </div>
  );
}

// Futuristic Game Card
function FuturisticGameCard({ game, rtp, cardSize, primaryColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string }) {
  const darkPrimary = adjustColor(primaryColor, -50);

  return (
    <div
      className="relative overflow-hidden group"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${darkPrimary}80, #00000099)`,
        borderRadius: '8px',
        border: `1px solid ${primaryColor}50`,
        clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
        boxShadow: `0 0 20px ${primaryColor}30, inset 0 0 15px rgba(0,0,0,0.5)`
      }}
    >
      {/* Scanning Lines Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
        }}
      />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2300ffff" font-family="Arial" font-size="12"%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute top-0 right-0">
          <FuturisticRtpBadge rtp={rtp} primaryColor={primaryColor} />
        </div>
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center relative"
        style={{
          background: `linear-gradient(to top, ${darkPrimary}, transparent)`
        }}
      >
        <h3
          className="text-[13px] font-bold leading-tight uppercase tracking-wide"
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            overflow: 'hidden',
            height: '28px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontFamily: 'monospace'
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

// Futuristic Trik Panel
function FuturisticTrikPanel({
  trik,
  primaryColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
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
  const darkPrimary = adjustColor(primaryColor, -50);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(180deg, ${darkPrimary}90, #000000cc)`,
        borderRadius: '8px',
        border: `2px solid ${primaryColor}60`,
        clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
        boxShadow: `0 0 30px ${primaryColor}30, inset 0 0 20px rgba(0,0,0,0.7)`
      }}
    >
      {/* Scanning Lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, ${primaryColor}20 3px, ${primaryColor}20 6px)`
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{
          padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px`,
          background: `linear-gradient(90deg, transparent, ${primaryColor}40, transparent)`,
          borderBottom: `1px solid ${primaryColor}40`
        }}
      >
        <h3
          className="font-black uppercase tracking-widest"
          style={{
            color: '#ffffff',
            fontSize: `${sizes.title}px`,
            textShadow: `0 0 10px ${primaryColor}, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`,
            fontFamily: 'monospace'
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
        {/* Deposit Kode | Fitur Ganda | Putaran Bet */}
        <div
          className="flex items-stretch gap-2"
          style={{
            background: 'rgba(0,0,0,0.6)',
            padding: `${sizes.padding + 5}px`,
            borderRadius: '4px',
            border: `1px solid ${primaryColor}30`
          }}
        >
          {/* Deposit Kode */}
          <div className="flex-1 text-center">
            <span className="block leading-tight uppercase tracking-wider" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: primaryColor, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.depositKode * 0.7 + 3}px`,
                textShadow: `0 0 10px ${primaryColor}, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`,
                fontFamily: 'monospace'
              }}
            >
              {trik.depositKode}
            </span>
          </div>

          {/* Fitur Ganda */}
          <div
            className="flex-1 text-center flex flex-col justify-center"
            style={{
              visibility: hideFiturGanda ? 'hidden' : 'visible',
              pointerEvents: hideFiturGanda ? 'none' : 'auto'
            }}
          >
            <span className="block leading-tight uppercase tracking-wider" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: primaryColor, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
              FITUR GANDA
            </span>
            <span
              className="font-bold inline-block"
              style={{
                color: trik.fiturGanda ? '#00ff88' : '#ff4444',
                fontSize: `${sizes.value * 0.85 + 3}px`,
                textShadow: trik.fiturGanda ? '0 0 10px #00ff88' : '0 0 10px #ff4444',
                fontFamily: 'monospace'
              }}
            >
              {trik.fiturGanda ? '[ ON ]' : '[ OFF ]'}
            </span>
          </div>

          {/* Putaran Bet */}
          <div className="flex-1 text-center">
            <span className="block leading-tight uppercase tracking-wider" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: primaryColor, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
              PUTARAN BET
            </span>
            <span
              className="font-bold leading-tight"
              style={{ color: '#ffffff', fontSize: `${sizes.value * 0.85 + 3}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
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
                background: `linear-gradient(90deg, ${primaryColor}10, ${primaryColor}20, ${primaryColor}10)`,
                padding: `${sizes.padding}px`,
                borderRadius: '4px',
                borderLeft: `2px solid ${primaryColor}`,
                borderRight: `2px solid ${primaryColor}`
              }}
            >
              <span className="font-semibold flex-1 text-left uppercase" style={{ fontSize: `${sizes.itemName}px`, color: primaryColor, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
                {item.name}
              </span>
              <span
                className="font-bold flex-1 text-center"
                style={{ color: '#ffffff', fontSize: `${sizes.itemValue}px`, textShadow: `0 0 5px ${primaryColor}`, fontFamily: 'monospace' }}
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
              background: `linear-gradient(90deg, transparent, ${primaryColor}30, transparent)`,
              padding: `${sizes.padding}px`,
              borderRadius: '4px'
            }}
          >
            <p
              className="font-bold uppercase leading-tight tracking-widest"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value}px`,
                textShadow: `0 0 10px ${primaryColor}`,
                fontFamily: 'monospace'
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

export default function FuturisticLayout({
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
}: FuturisticLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

  const primaryColor = selectedStyle.primaryColor;
  const darkPrimary = adjustColor(primaryColor, -50);
  const cardSize = 145;

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
        overflow: 'hidden',
        background: '#050510'
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}15 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}15 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header 1 - Title */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: `linear-gradient(90deg, transparent, ${darkPrimary}80, transparent)`,
          borderBottom: `2px solid ${primaryColor}60`
        }}
      >
        {/* Corner decorations */}
        <div className="absolute left-2 top-2 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
        <div className="absolute right-2 top-2 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: primaryColor }} />

        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-widest leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: `0 0 20px ${primaryColor}, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`
          }}
        >
          {customHeaderText}
        </h1>
      </div>

      {/* Header 2 - Logo, Time, Date */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkPrimary}40, #00000080, ${darkPrimary}40)`,
          borderBottom: `1px solid ${primaryColor}30`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2300ffff" font-family="monospace" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold tracking-wider"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: `0 0 10px ${primaryColor}` }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: primaryColor }}>|</span>
            <span
              className="font-medium tracking-wider"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* Badge */}
          <div
            className="px-3 py-1"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}80, ${primaryColor}40)`,
              border: `1px solid ${primaryColor}`,
              clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
              boxShadow: `0 0 15px ${primaryColor}`
            }}
          >
            <span className="text-xs font-black text-white tracking-widest">RTP LIVE</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden relative" style={{ minHeight: 0 }}>
        {/* Game Modal Row */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary}60, #000000aa)`,
              borderRadius: '8px',
              border: `2px solid ${primaryColor}50`,
              clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
              boxShadow: `0 0 30px ${primaryColor}30`
            }}
          >
            <div className="text-center mb-2">
              <h2
                className="font-black tracking-widest uppercase"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: `0 0 15px ${primaryColor}, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`
                }}
              >
                PRAGMATIC PLAY
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <FuturisticGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className="flex-1 overflow-hidden p-3 relative"
            style={{
              background: `linear-gradient(135deg, ${darkPrimary}60, #000000aa)`,
              borderRadius: '8px',
              border: `2px solid ${primaryColor}50`,
              clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
              boxShadow: `0 0 30px ${primaryColor}30`
            }}
          >
            <div className="text-center mb-2">
              <h2
                className="font-black tracking-widest uppercase"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: `0 0 15px ${primaryColor}, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`
                }}
              >
                PG SOFT
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <FuturisticGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <FuturisticTrikPanel
                  trik={pragmaticTrik}
                  primaryColor={primaryColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <FuturisticTrikPanel
                  trik={pgSoftTrik}
                  primaryColor={primaryColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 relative">
        <div className="absolute left-2 bottom-2 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: primaryColor }} />
        <div className="absolute right-2 bottom-2 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />

        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, transparent, ${darkPrimary}80, transparent)`,
            borderTop: `2px solid ${primaryColor}60`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor} style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold tracking-wider"
            style={{ color: '#ffffff', textShadow: `0 0 10px ${primaryColor}` }}
          >
            {footerConfig?.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
