'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface CasinoCyberpunkLayoutProps {
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

// RTP Badge
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

// Cyberpunk Game Card
function CyberpunkGameCard({ game, rtp, cardSize, primaryColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string }) {
  const darkPrimary = adjustColor(primaryColor, -40);
  const darkerPrimary = adjustColor(primaryColor, -60);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${primaryColor}15)`,
        borderRadius: '8px',
        border: `2px solid ${primaryColor}`,
        boxShadow: `0 0 20px ${primaryColor}60, inset 0 0 20px rgba(0,0,0,0.5)`,
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
    >
      {/* Scanning Lines */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${primaryColor}20 3px, ${primaryColor}20 6px)`
        }}
      />

      {/* Game Image */}
      <div className="relative w-full overflow-hidden" style={{ height: `${cardSize}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-contain bg-black/70"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23f0f' font-family='monospace' font-size='10'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* RTP Badge */}
        <div className="absolute top-1 right-1">
          <RTPBadge rtp={rtp} />
        </div>
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center relative z-10"
        style={{
          background: `linear-gradient(to bottom, ${darkPrimary}f0, ${darkerPrimary})`
        }}
      >
        <h3
          className="text-xs font-black tracking-wider truncate"
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontFamily: 'monospace'
          }}
        >
          {game.name.toUpperCase()}
        </h3>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />
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

// Cyberpunk Trik Panel
function CyberpunkTrikPanel({
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
        background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${primaryColor}15)`,
        borderRadius: '8px',
        border: `2px solid ${providerColor}`,
        boxShadow: `0 0 20px ${providerColor}60, inset 0 0 20px rgba(0,0,0,0.5)`,
        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
      }}
    >
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${providerColor}40 1px, transparent 1px), linear-gradient(90deg, ${providerColor}40 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Scanning Lines */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${providerColor}30 3px, ${providerColor}30 6px)`
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative z-10"
        style={{ padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px` }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: providerColor, boxShadow: `0 0 10px ${providerColor}` }} />
          <h3
            className="font-black uppercase tracking-wider"
            style={{
              color: '#ffffff',
              fontSize: `${sizes.title}px`,
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              fontFamily: 'monospace'
            }}
          >
            {trik.title || 'TRIK GACOR'}
          </h3>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: providerColor, boxShadow: `0 0 10px ${providerColor}` }} />
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
            border: `1px solid ${providerColor}50`,
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
          }}
        >
          {/* Deposit Kode */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.depositKode * 0.7 + 3}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                fontFamily: 'monospace'
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
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
              FITUR GANDA
            </span>
            <span
              className="font-bold inline-block"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value * 0.85 + 3}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                fontFamily: 'monospace'
              }}
            >
              {trik.fiturGanda ? '🍀 ON' : '❌ OFF'}
            </span>
          </div>

          {/* Putaran Bet */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
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
                background: `linear-gradient(90deg, ${providerColor}15, ${providerColor}25, ${providerColor}15)`,
                padding: `${sizes.padding}px`,
                borderRadius: '6px',
                borderLeft: `3px solid ${providerColor}`,
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
              }}
            >
              <span className="font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}>
                {item.name}
              </span>
              <span
                className="font-bold flex-1 text-center"
                style={{ color: '#ffffff', fontSize: `${sizes.itemValue}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
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
              borderRadius: '6px'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value}px`,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
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

export default function CasinoCyberpunkLayout({
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
}: CasinoCyberpunkLayoutProps) {
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
        fontFamily: 'monospace',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}20 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header 1 - Neon Dystopia Title with Glitch Effect (55px) */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative z-10 overflow-hidden"
        style={{
          height: '55px',
          background: `linear-gradient(90deg, ${adjustColor(primaryColor, -80)}dd, ${darkerPrimary}ee, ${adjustColor(primaryColor, -80)}dd), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='2' height='2' fill='%23ff00ff' opacity='0.1'/%3E%3Crect x='30' y='10' width='3' height='1' fill='%2300ffff' opacity='0.15'/%3E%3Crect x='60' y='5' width='1' height='3' fill='%23ff00ff' opacity='0.1'/%3E%3Crect x='80' y='15' width='2' height='2' fill='%2300ffff' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay',
          borderBottom: `3px solid ${primaryColor}`,
          borderTop: `1px solid #ff00ff40`,
          boxShadow: `0 0 30px ${primaryColor}60, 0 0 10px #ff00ff40, inset 0 0 20px rgba(0,0,0,0.6)`,
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        }}
      >
        {/* Danger stripe borders */}
        <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: 'repeating-linear-gradient(45deg, #ffff00, #ffff00 5px, #000 5px, #000 10px)', opacity: 0.3 }} />
        <div className="absolute right-0 top-0 bottom-0 w-3" style={{ background: 'repeating-linear-gradient(-45deg, #ff00ff, #ff00ff 5px, #000 5px, #000 10px)', opacity: 0.3 }} />

        {/* Grunge overlay texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,255,0.1) 2px, rgba(255,0,255,0.1) 4px)'
          }}
        />

        {/* Warning symbols - Left */}
        <div className="absolute left-6 flex flex-col gap-1 opacity-70">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #ef4444' }} />
            <span className="text-xs font-bold" style={{ color: '#ff00ff' }}>⚠</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #eab308', animationDelay: '0.5s' }} />
            <span className="text-xs font-bold" style={{ color: '#00ffff' }}>◢</span>
          </div>
        </div>

        {/* Augmented reality HUD elements */}
        <div className="absolute left-24 opacity-60">
          <div className="flex items-center gap-1">
            <div className="w-6 h-px" style={{ background: `linear-gradient(to right, #ff00ff, transparent)` }} />
            <div className="w-1 h-1 border border-cyan-400" />
          </div>
        </div>

        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px ${primaryColor}`,
            fontFamily: 'monospace',
            letterSpacing: '0.15em'
          }}
        >
          {customHeaderText}
        </h1>

        {/* Augmented reality HUD elements - Right */}
        <div className="absolute right-24 opacity-60">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 border border-pink-500" />
            <div className="w-6 h-px" style={{ background: `linear-gradient(to left, #00ffff, transparent)` }} />
          </div>
        </div>

        {/* Warning symbols - Right */}
        <div className="absolute right-6 flex flex-col gap-1 opacity-70">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold" style={{ color: '#00ffff' }}>◣</span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff00ff', boxShadow: '0 0 10px #ff00ff', animationDelay: '0.7s' }} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold" style={{ color: '#ff00ff' }}>⚠</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #22d3ee', animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Header 2 - Cyberpunk HUD Panel (45px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative z-10"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkerPrimary}dd, ${darkPrimary}ee, ${darkerPrimary}dd), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,0,255,0.05) 50px, rgba(255,0,255,0.05) 100px)`,
          backgroundBlendMode: 'overlay',
          borderBottom: `2px solid ${primaryColor}60`,
          borderTop: `1px solid #00ffff20`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.3)`
        }}
      >
        {/* Glitch line decorations */}
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, #ff00ff80, #00ffff80, #ff00ff80, transparent)` }} />

        {/* Danger stripe - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(45deg, #ff00ff30, #ff00ff30 3px, transparent 3px, transparent 6px)' }} />

        {/* Logo with Neon Accent */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="w-1 h-2" style={{ backgroundColor: '#ff00ff', boxShadow: '0 0 10px #ff00ff' }} />
            <div className="w-1 h-2" style={{ backgroundColor: '#00ffff', boxShadow: '0 0 10px #00ffff' }} />
          </div>
          <div className="relative">
            <img
              src={selectedWebsite.logo}
              alt={`${selectedWebsite.name} logo`}
              className="h-9 object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${primaryColor}) drop-shadow(2px 0 0 #ff00ff) drop-shadow(-2px 0 0 #00ffff)` }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
              }}
            />
            {/* Glitch overlay on logo */}
            <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff00ff 2px, #ff00ff 4px)' }} />
          </div>
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4" style={{ backgroundColor: '#ff00ff', opacity: 0.5 }} />
            <div className="w-0.5 h-3" style={{ backgroundColor: '#00ffff', opacity: 0.6 }} />
            <div className="w-0.5 h-5" style={{ backgroundColor: '#ff00ff', opacity: 0.4 }} />
          </div>
        </div>

        {/* Time & Date with Glitch Effect */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 relative">
            <span
              className="font-bold relative"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 10px #ff00ff', fontFamily: 'monospace' }}
            >
              {customTimeLabel}
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-2" style={{ backgroundColor: '#ff00ff' }} />
              <div className="w-1 h-1" style={{ backgroundColor: '#00ffff', boxShadow: '0 0 5px #00ffff' }} />
              <div className="w-px h-2" style={{ backgroundColor: '#ff00ff' }} />
            </div>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 10px #00ffff', fontFamily: 'monospace' }}
            >
              {getCurrentDate()}
            </span>
          </div>

          {/* RTP LIVE Badge - Cyberpunk Style */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 relative"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}dd, ${adjustColor(primaryColor, 20)}dd)`,
              border: `1px solid #ff00ff`,
              boxShadow: `0 0 20px ${primaryColor}80, 0 0 10px #ff00ff60, inset 0 0 15px rgba(255,0,255,0.2)`,
              borderRadius: '2px',
              clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
            }}
          >
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l" style={{ borderColor: '#00ffff' }} />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r" style={{ borderColor: '#00ffff' }} />
            <div className="w-1.5 h-1.5 animate-pulse" style={{ background: '#00ffff', boxShadow: '0 0 8px #00ffff', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-xs font-black text-white relative" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              RTP LIVE
            </span>
            {/* Scanning line animation */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff00ff 2px, #ff00ff 3px)' }} />
          </div>
        </div>

        {/* Danger stripe - Right */}
        <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(-45deg, #00ffff30, #00ffff30 3px, transparent 3px, transparent 6px)' }} />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden relative z-10" style={{ minHeight: 0 }}>
        {/* Game Modal Row (264px height) */}
        <div className="flex gap-3" style={{ height: '264px' }}>
          {/* Pragmatic Games */}
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

            {/* Scanning effect */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${primaryColor}30 3px, ${primaryColor}30 6px)`
              }}
            />

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PRAGMATIC PLAY
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pragmaticGamesWithRtp.map((game, index) => (
                <CyberpunkGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
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

            {/* Scanning effect */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${primaryColor}30 3px, ${primaryColor}30 6px)`
              }}
            />

            <div className="text-center mb-2 relative z-10">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                PG SOFT
              </h2>
            </div>
            <div className="flex gap-2 justify-center relative z-10">
              {pgSoftGamesWithRtp.map((game, index) => (
                <CyberpunkGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row (400px height) */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <CyberpunkTrikPanel
                  trik={pragmaticTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <CyberpunkTrikPanel
                  trik={pgSoftTrik}
                  providerColor={primaryColor}
                  primaryColor={primaryColor}
                  hideFiturGanda={true}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Maxwin Info Panel */}
      {maxwinConfig?.enabled && (
        <div
          className="mx-4 mb-2 rounded-xl p-3 relative"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.95), ${primaryColor}20, rgba(0,0,0,0.95))`,
            border: `2px solid ${primaryColor}`,
            boxShadow: `0 0 30px ${primaryColor}60, 0 0 15px #ff00ff40, inset 0 0 40px rgba(0,0,0,0.5)`,
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}
        >
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#ff00ff40 1px, transparent 1px), linear-gradient(90deg, #00ffff40 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Scanning Lines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${primaryColor}30 3px, ${primaryColor}30 6px)`
            }}
          />

          {/* Danger Stripes - Left */}
          <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(45deg, #ff00ff40, #ff00ff40 5px, transparent 5px, transparent 10px)' }} />

          {/* Danger Stripes - Right */}
          <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(-45deg, #00ffff40, #00ffff40 5px, transparent 5px, transparent 10px)' }} />

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#ff00ff' }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: '#00ffff' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: '#00ffff' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#ff00ff' }} />

          {/* Heading 1 */}
          <div className="text-center mb-2 relative z-10">
            <h2 className="text-lg font-black uppercase tracking-wide relative" style={{
              color: '#ffffff',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 2px 0 0 #ff00ff, -2px 0 0 #00ffff, 0 0 20px ' + primaryColor,
              fontFamily: 'monospace'
            }}>
              <span style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#ff00ff',
                opacity: 0.5,
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
              }}>
                {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
              </span>
              <span style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#00ffff',
                opacity: 0.5,
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
              }}>
                {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
              </span>
              {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
            </h2>
          </div>

          {/* Heading 2 */}
          {maxwinConfig.heading2 && (
            <div className="text-center mb-2 relative z-10">
              <h3 className="text-base font-bold uppercase" style={{
                color: '#00ffff',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 15px #00ffff',
                fontFamily: 'monospace'
              }}>
                ⚠ {maxwinConfig.heading2} ⚠
              </h3>
            </div>
          )}

          {/* Text Items */}
          {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
            <div className="relative z-10" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {maxwinConfig.textItems.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}15, ${primaryColor}30, ${primaryColor}15)`,
                    border: `1px solid ${primaryColor}`,
                    borderLeft: `3px solid ${index % 2 === 0 ? '#ff00ff' : '#00ffff'}`,
                    boxShadow: `0 0 10px ${primaryColor}40`,
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                  }}
                >
                  <span className="text-sm font-bold" style={{
                    color: '#ffffff',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    fontFamily: 'monospace'
                  }}>
                    ◢ {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer (40px) - Telegram Info */}
      <div className="flex-shrink-0 relative z-10">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(90deg, ${adjustColor(primaryColor, -70)}, ${darkerPrimary}, ${adjustColor(primaryColor, -70)})`,
            borderTop: `3px solid ${primaryColor}`,
            boxShadow: `0 0 20px ${primaryColor}40`
          }}
        >
          <div className="w-1 h-6" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill={primaryColor} style={{ filter: `drop-shadow(0 0 5px ${primaryColor})` }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {footerConfig?.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
          <div className="w-1 h-6" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
        </div>
      </div>
    </div>
  );
}
