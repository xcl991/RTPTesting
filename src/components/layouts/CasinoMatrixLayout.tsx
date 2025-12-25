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

// Matrix Trik Panel
function MatrixTrikPanel({
  trik,
  providerColor,
  hideFiturGanda = false
}: {
  trik: TrikConfig;
  providerColor: string;
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
  const darkGreen = adjustColor('#00ff00', -85);
  const darkerGreen = adjustColor('#00ff00', -95);

  return (
    <div
      className="h-full overflow-hidden flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${darkerGreen}, ${darkGreen})`,
        borderRadius: '4px',
        border: `1px solid ${providerColor}40`,
        boxShadow: `0 0 20px ${providerColor}20`,
        fontFamily: 'monospace'
      }}
    >
      {/* Matrix rain effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${providerColor}10 2px, ${providerColor}10 4px)`
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
            background: 'rgba(0,0,0,0.5)',
            padding: `${sizes.padding + 5}px`,
            borderRadius: '4px',
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
                borderRadius: '4px',
                borderLeft: `2px solid ${providerColor}`
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
              borderRadius: '4px'
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

interface CasinoMatrixLayoutProps {
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

export default function CasinoMatrixLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik,
  telegramUsername,
  customHeaderText,
  headerFontSize,
  defaultLayoutSize,
  footerConfig
}: CasinoMatrixLayoutProps) {
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
  const darkPrimary = adjustColor(primaryColor, -85);
  const darkerPrimary = adjustColor(primaryColor, -95);

  // Card size
  const cardSize = 145;

  // Generate RTP for games - 3 games each
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
      {/* Matrix Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header 1 - Title */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative z-10 overflow-hidden"
        style={{
          height: '55px',
          background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
          borderBottom: `2px solid #00ff41`
        }}
      >
        {/* Matrix code rain effect background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff0015 1px, #00ff0015 2px), repeating-linear-gradient(90deg, transparent, transparent 8px, #00ff4110 8px, #00ff4110 9px)`,
            backgroundSize: '100% 4px, 10px 100%'
          }}
        />
        {/* Binary overlay texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='12' font-family='monospace' font-size='10' fill='%2300ff00'%3E01101%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 20px'
          }}
        />
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center relative z-10`}
          style={{
            color: '#00ff00',
            textShadow: '0 0 10px #00ff00, 0 0 20px #00ff41, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontFamily: 'monospace'
          }}
        >
          {customHeaderText}
        </h1>
        {/* Digital rain effect decorations */}
        <div className="absolute left-4 top-0 bottom-0 flex items-center gap-1 opacity-30">
          <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, transparent, #00ff00, transparent)' }} />
          <div style={{ width: '1px', height: '80%', background: 'linear-gradient(to bottom, transparent, #00ff41, transparent)' }} />
        </div>
        <div className="absolute right-4 top-0 bottom-0 flex items-center gap-1 opacity-30">
          <div style={{ width: '1px', height: '80%', background: 'linear-gradient(to bottom, transparent, #00ff41, transparent)' }} />
          <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, transparent, #00ff00, transparent)' }} />
        </div>
      </div>

      {/* Header 2 - Logo, Time, Date, RTP LIVE Badge */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 relative z-10 overflow-hidden"
        style={{
          height: '45px',
          background: `linear-gradient(90deg, ${darkerPrimary}, ${darkPrimary}, ${darkerPrimary})`,
          borderBottom: `2px solid #00ff41`
        }}
      >
        {/* Matrix code rain effect background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff0015 1px, #00ff0015 2px), repeating-linear-gradient(90deg, transparent, transparent 8px, #00ff4110 8px, #00ff4110 9px)`,
            backgroundSize: '100% 4px, 10px 100%'
          }}
        />
        {/* Binary overlay texture */}
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='12' font-family='monospace' font-size='10' fill='%2300ff00'%3E01101%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 20px'
          }}
        />
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            style={{ filter: `drop-shadow(0 0 8px #00ff00) drop-shadow(0 0 4px #00ff41)` }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: '#00ff00', textShadow: '0 0 8px #00ff00, 0 0 4px #00ff41, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: '#00ff41' }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#00ff00', textShadow: '0 0 6px #00ff00, 0 0 3px #00ff41, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'monospace' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* RTP LIVE Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, #00ff00, #00ff41)`,
              boxShadow: `0 0 15px #00ff00, 0 0 8px #00ff41`,
              border: '1px solid #00ff00'
            }}
          >
            <span className="text-xs font-black" style={{ color: '#000', fontFamily: 'monospace' }}>RTP LIVE</span>
          </div>
        </div>
      </div>

      {/* Game Modal Row */}
      <div className="flex gap-2 p-2 relative z-10" style={{ height: '264px' }}>
        {/* Pragmatic Play */}
        <div
          className="flex-1 overflow-hidden p-3 relative"
          style={{
            background: `linear-gradient(135deg, ${darkPrimary}, ${darkerPrimary})`,
            borderRadius: '4px',
            border: `1px solid ${primaryColor}40`,
            boxShadow: `0 0 20px ${primaryColor}20`
          }}
        >
          {/* Matrix rain effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
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
              <div
                key={`pragmatic-${index}`}
                className="relative overflow-hidden"
                style={{
                  width: `${cardSize}px`,
                  background: `linear-gradient(135deg, ${darkPrimary}, ${darkerPrimary})`,
                  border: `1px solid ${primaryColor}40`,
                  borderRadius: '4px',
                  boxShadow: `0 0 20px ${primaryColor}20`
                }}
              >
                {/* Matrix Rain Effect */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
                  }}
                />

                <div className="relative z-10 p-3">
                  <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/50 rounded">
                    <img
                      src={game.src}
                      alt={game.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230f0' font-family='monospace' font-size='12'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {/* RTP Badge */}
                    <div className="absolute top-1 right-1">
                      <div
                        className="px-2 py-1 font-black text-[11px] text-white"
                        style={{
                          background: game.rtp >= 95 ? '#22c55e' : game.rtp >= 90 ? '#eab308' : '#ef4444',
                          borderRadius: '4px',
                          boxShadow: `0 0 10px ${game.rtp >= 95 ? '#22c55e' : game.rtp >= 90 ? '#eab308' : '#ef4444'}`,
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      >
                        {game.rtp}%
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-bold truncate" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                      {game.name.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PG Soft */}
        <div
          className="flex-1 overflow-hidden p-3 relative"
          style={{
            background: `linear-gradient(135deg, ${darkPrimary}, ${darkerPrimary})`,
            borderRadius: '4px',
            border: `1px solid ${primaryColor}40`,
            boxShadow: `0 0 20px ${primaryColor}20`
          }}
        >
          {/* Matrix rain effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
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
              <div
                key={`pgsoft-${index}`}
                className="relative overflow-hidden"
                style={{
                  width: `${cardSize}px`,
                  background: `linear-gradient(135deg, ${darkPrimary}, ${darkerPrimary})`,
                  border: `1px solid ${primaryColor}40`,
                  borderRadius: '4px',
                  boxShadow: `0 0 20px ${primaryColor}20`
                }}
              >
                {/* Matrix Rain Effect */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}10 2px, ${primaryColor}10 4px)`
                  }}
                />

                <div className="relative z-10 p-3">
                  <div className="w-full aspect-square mb-1.5 relative overflow-hidden bg-black/50 rounded">
                    <img
                      src={game.src}
                      alt={game.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230f0' font-family='monospace' font-size='12'%3E[NO_IMAGE]%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {/* RTP Badge */}
                    <div className="absolute top-1 right-1">
                      <div
                        className="px-2 py-1 font-black text-[11px] text-white"
                        style={{
                          background: game.rtp >= 95 ? '#22c55e' : game.rtp >= 90 ? '#eab308' : '#ef4444',
                          borderRadius: '4px',
                          boxShadow: `0 0 10px ${game.rtp >= 95 ? '#22c55e' : game.rtp >= 90 ? '#eab308' : '#ef4444'}`,
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      >
                        {game.rtp}%
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-bold truncate" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                      {game.name.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trik Panel Row */}
      {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
        <div className="flex gap-2 px-2 relative z-10" style={{ height: '400px' }}>
          {pragmaticTrik.enabled && (
            <div className="flex-1">
              <MatrixTrikPanel
                trik={pragmaticTrik}
                providerColor={primaryColor}
              />
            </div>
          )}
          {pgSoftTrik.enabled && (
            <div className="flex-1">
              <MatrixTrikPanel
                trik={pgSoftTrik}
                providerColor={primaryColor}
                hideFiturGanda={true}
              />
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex-shrink-0 mt-auto">
        <div
          className="flex items-center justify-center gap-3 px-4 relative z-10"
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
            {footerConfig?.footer1 || `@${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
