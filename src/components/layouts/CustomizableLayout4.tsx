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

interface CustomizableLayout4Props {
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
  footerConfig: FooterConfig;
  maxwinConfig?: MaxwinConfig;
}

// Glassmorphism Game Card
function GlassGameCard({ game, rtp, style, cardSize }: { game: Game; rtp: number; style: RTPStyle; cardSize: number }) {
  const darkPrimary = adjustColor(style.primaryColor, -70);

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: `0 8px 32px ${darkPrimary}80, inset 0 0 30px rgba(255,255,255,0.05)`
      }}
    >
      {/* Holographic shine effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          opacity: 0.5
        }}
      />

      {/* Game Image - +5% height */}
      <div className="relative w-full overflow-hidden rounded-t-xl" style={{ height: `${Math.floor(cardSize * 1.05) + 5}px` }}>
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* RTP Badge with gradient */}
        <div
          className="absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold"
          style={{
            background: rtp >= 95
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : rtp >= 90
                ? 'linear-gradient(135deg, #eab308, #ca8a04)'
                : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            boxShadow: `0 2px 10px ${darkPrimary}80`
          }}
        >
          {rtp}%
        </div>
      </div>

      {/* Game Name with frosted glass */}
      <div
        className="p-2 text-center"
        style={{
          background: `linear-gradient(to top, ${darkPrimary}CC, ${darkPrimary}4D)`
        }}
      >
        <h3
          className="text-white font-bold text-[11px] leading-tight"
          style={{
            overflow: 'hidden',
            height: '22px',
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
    <div className="flex items-center gap-1">
      {pattern.split('').map((char, index) => (
        <span
          key={index}
          className="rounded-full p-0.5"
          style={{
            background: char === 'V' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'
          }}
        >
          {char === 'V' ? (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
  hideFiturGanda = false,
  style
}: {
  trik: TrikConfig;
  providerColor: string;
  hideFiturGanda?: boolean;
  style: RTPStyle;
}) {
  const itemCount = trik.trikItems?.length || 0;
  const totalRows = itemCount + 3;
  const darkPrimary = adjustColor(style.primaryColor, -70);

  // Font sizes +5%
  const getFontSize = () => {
    if (totalRows <= 4) return { title: 24, label: 17, depositKode: 33, value: 20, itemName: 20, itemValue: 24, icon: 24, gap: 5, padding: 6 };
    if (totalRows <= 5) return { title: 22, label: 16, depositKode: 28, value: 18, itemName: 18, itemValue: 22, icon: 22, gap: 4, padding: 5 };
    if (totalRows <= 6) return { title: 20, label: 15, depositKode: 24, value: 17, itemName: 17, itemValue: 20, icon: 20, gap: 3, padding: 4 };
    return { title: 18, label: 14, depositKode: 22, value: 16, itemName: 16, itemValue: 18, icon: 18, gap: 2, padding: 3 };
  };

  const sizes = getFontSize();

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col relative"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(20px)',
        border: `2px solid ${providerColor}60`,
        boxShadow: `0 8px 32px ${providerColor}20, inset 0 0 60px ${darkPrimary}4D`,
        minHeight: '115%' // +15% trik modal height
      }}
    >
      {/* Rainbow border effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${providerColor}30, transparent 30%, transparent 70%, ${providerColor}30)`,
          opacity: 0.3
        }}
      />

      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{
          padding: `${sizes.padding + 4}px`,
          background: `linear-gradient(180deg, ${providerColor}20, transparent)`,
          borderBottom: `1px solid ${providerColor}30`
        }}
      >
        <h3
          className="font-black uppercase tracking-wider relative z-10"
          style={{
            color: 'white',
            fontSize: `${sizes.title}px`,
            textShadow: `0 0 20px ${providerColor}, 0 2px 4px rgba(0,0,0,0.5)`
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
        {/* Deposit Kode | Fitur Ganda | Putaran Bet - 1 Row - With black outline */}
        <div
          className="flex items-stretch gap-2 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: `${sizes.padding}px`,
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Deposit Kode */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.depositKode * 0.7}px`,
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
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              FITUR GANDA
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full inline-block ${
                trik.fiturGanda ? 'bg-green-500/30' : 'bg-red-500/30'
              }`}
              style={{ fontSize: `${sizes.value * 0.85}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              {trik.fiturGanda ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Putaran Bet */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              PUTARAN BET
            </span>
            <span className="font-bold leading-tight" style={{ fontSize: `${sizes.value * 0.85}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
              {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Trik Items */}
        <div className="flex-1 flex flex-col justify-center" style={{ gap: `${sizes.gap}px` }}>
          {trik.trikItems && trik.trikItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                padding: `${sizes.padding}px ${sizes.padding * 1.5}px`,
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <span className="font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                {item.name}
              </span>
              <span className="font-bold flex-1 text-center" style={{ color: '#ffffff', fontSize: `${sizes.itemValue}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
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
            className="text-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${providerColor}15, ${providerColor}05)`,
              border: `1px solid ${providerColor}30`,
              padding: `${sizes.padding}px`
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

// Glass Game Modal
function GlassGameModal({
  title,
  games,
  providerColor,
  style,
  cardSize
}: {
  title: string;
  games: Game[];
  providerColor: string;
  style: RTPStyle;
  cardSize: number;
}) {
  const displayGames = games.slice(0, 3).map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  return (
    <div
      className="flex-1 rounded-3xl overflow-hidden p-3 relative"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(20px)',
        border: `2px solid ${providerColor}40`,
        boxShadow: `0 8px 32px ${providerColor}15`
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${providerColor}20, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${providerColor}15, transparent 70%)` }}
      />

      {/* Provider Title */}
      <div className="text-center mb-2 relative z-10">
        <h2
          className="font-bold"
          style={{
            color: '#ffffff',
            fontSize: '18px',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >
          {title}
        </h2>
        <div
          className="mx-auto mt-1 rounded-full"
          style={{
            width: '60px',
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${providerColor}, transparent)`
          }}
        />
      </div>

      {/* Game Grid */}
      <div className="flex gap-3 justify-center relative z-10">
        {displayGames.map((game, index) => (
          <GlassGameCard
            key={`${game.name}-${index}`}
            game={game}
            rtp={game.rtp}
            style={style}
            cardSize={cardSize}
          />
        ))}
      </div>
    </div>
  );
}

export default function CustomizableLayout4({
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
}: CustomizableLayout4Props) {
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
  const darkPrimary = adjustColor(primaryColor, -70);
  const darkerPrimary = adjustColor(primaryColor, -85);
  const darkSecondary = adjustColor(secondaryColor, -70);

  const cardSize = Math.floor(140 * 1.10); // +10% modal height

  return (
    <div
      className="relative z-10 flex flex-col"
      style={{
        fontFamily: 'var(--font-orbitron), sans-serif',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden'
      }}
    >
      {/* Header 1 - Glass Style */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 relative"
        style={{
          height: '60px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-10 object-contain"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Title */}
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center flex-1`}
          style={{
            color: '#ffffff',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >
          {customHeaderText}
        </h1>

        <div className="w-24"></div>
      </div>

      {/* Header 2 - Time & Date */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4"
        style={{
          height: '40px',
          background: `linear-gradient(135deg, ${darkPrimary}80, ${darkerPrimary}80)`,
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-bold"
            style={{ fontSize: '20px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            {customTimeLabel}
          </span>
          <span className="text-xl" style={{ color: '#ffffff' }}>•</span>
          <span className="font-medium" style={{ fontSize: '18px', color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
            {getCurrentDate()}
          </span>
          {/* Live Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full ml-2"
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.5)'
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" style={{ boxShadow: '0 0 10px #22c55e' }} />
            <span className="text-xs font-bold text-green-400">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-3 p-3 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Row 1: Game Modals */}
        <div className="flex gap-3" style={{ height: '240px' }}>
          <GlassGameModal
            title="PRAGMATIC PLAY"
            games={selectedPragmaticGames}
            providerColor="#ffd700"
            style={selectedStyle}
            cardSize={cardSize}
          />
          <GlassGameModal
            title="PG SOFT"
            games={selectedPgSoftGames}
            providerColor="#00f0ff"
            style={selectedStyle}
            cardSize={cardSize}
          />
        </div>

        {/* Row 2: Trik Gacor Panels */}
        <div className="flex gap-3 items-stretch">
          {pragmaticTrik.enabled && (
            <div className="flex-1">
              <HolographicTrikPanel
                trik={pragmaticTrik}
                providerColor="#ffd700"
                hideFiturGanda={false}
                style={selectedStyle}
              />
            </div>
          )}
          {pgSoftTrik.enabled && (
            <div className="flex-1">
              <HolographicTrikPanel
                trik={pgSoftTrik}
                providerColor="#00f0ff"
                hideFiturGanda={true}
                style={selectedStyle}
              />
            </div>
          )}
        </div>

        {/* Row 3: Maxwin Info */}
        {maxwinConfig?.enabled && (
          <div
            className="rounded-3xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${selectedStyle.secondaryColor}40`,
              boxShadow: `0 8px 32px ${selectedStyle.secondaryColor}15`
            }}
          >
            {/* Decorative gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${selectedStyle.primaryColor}10, transparent 50%, ${selectedStyle.secondaryColor}10)`
              }}
            />

            {/* Heading 1 */}
            <div className="text-center mb-3 relative z-10">
              <h2
                className="text-xl font-black uppercase tracking-wide"
                style={{
                  color: '#ffffff',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
              </h2>
            </div>

            {/* Heading 2 */}
            {maxwinConfig.heading2 && (
              <div className="text-center mb-3 relative z-10">
                <h3 className="text-base font-bold uppercase" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                  {maxwinConfig.heading2}
                </h3>
              </div>
            )}

            {/* Text Items */}
            {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {maxwinConfig.textItems.map((text, index) => (
                  text && (
                    <div
                      key={index}
                      className="p-3 rounded-xl text-center"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <p className="font-semibold text-sm" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>{text}</p>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-2 px-4"
          style={{
            height: '40px',
            background: `linear-gradient(135deg, ${darkPrimary}80, ${darkerPrimary}80)`,
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.8 }}>
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-base font-bold" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
            {footerConfig.footer1 || `Join Telegram: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
