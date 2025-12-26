'use client';

import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig, MaxwinConfig } from '@/types';

interface ClassicLayoutProps {
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

// RTP Badge - Classic Style
function ClassicRtpBadge({ rtp }: { rtp: number }) {
  const bgColor = rtp >= 95 ? '#22c55e' : rtp >= 90 ? '#eab308' : '#ef4444';
  return (
    <div
      className="px-2 py-1 font-black text-[11px] text-white"
      style={{
        background: bgColor,
        borderRadius: '0',
        border: '2px solid #000',
        boxShadow: '2px 2px 0 #000'
      }}
    >
      {rtp}%
    </div>
  );
}

// Classic Game Card - Retro/Classic Style
function ClassicGameCard({ game, rtp, cardSize, primaryColor }: { game: Game; rtp: number; cardSize: number; primaryColor: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${cardSize}px`,
        flexShrink: 0,
        background: '#2a2a2a',
        border: '3px solid #000',
        boxShadow: '4px 4px 0 #000',
        borderRadius: '4px'
      }}
    >
      {/* Game Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: `${cardSize}px`,
          border: '2px solid #000',
          borderBottom: 'none'
        }}
      >
        <img
          src={game.src}
          alt={game.name}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'auto' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute top-1 right-1">
          <ClassicRtpBadge rtp={rtp} />
        </div>
      </div>

      {/* Game Name */}
      <div
        className="p-2 text-center"
        style={{
          background: '#1a1a1a',
          borderTop: '2px solid #000'
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
            WebkitBoxOrient: 'vertical',
            fontFamily: 'Georgia, serif'
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

// Classic Trik Panel
function ClassicTrikPanel({
  trik,
  primaryColor,
  hideFiturGanda = false,
  cardStyle
}: {
  trik: TrikConfig;
  primaryColor: string;
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

  return (
    <div
      className={`h-full overflow-hidden flex flex-col relative ${cardStyle?.blur || ''}`}
      style={{
        background: cardStyle?.background === 'theme'
          ? `linear-gradient(135deg, ${adjustColor(primaryColor, -30)}ee 0%, ${adjustColor(primaryColor, -50)}ee 50%, ${adjustColor(primaryColor, -60)}ee 100%)`
          : (cardStyle?.background || '#1a1a1a'),
        border: cardStyle?.border ? `${cardStyle.border} ${primaryColor}` : '4px solid #000',
        opacity: cardStyle?.opacity || 1,
        boxShadow: cardStyle?.shadow ? (cardStyle.shadow.includes('0 0 20px') ? `${cardStyle.shadow} ${primaryColor}` : cardStyle.shadow) : '6px 6px 0 #000',
        borderRadius: '4px'
      }}
    >
      {cardStyle?.pattern && cardStyle.pattern !== 'none' && (
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ backgroundImage: cardStyle.pattern, backgroundRepeat: 'repeat', opacity: 0.3 }} />
      )}
      {/* Header */}
      <div
        className="text-center flex-shrink-0 relative"
        style={{
          padding: `${sizes.padding + 2}px ${sizes.padding}px ${sizes.padding}px`,
          background: primaryColor,
          borderBottom: '3px solid #000'
        }}
      >
        <h3
          className="font-black uppercase tracking-wider"
          style={{
            color: '#ffffff',
            fontSize: `${sizes.title}px`,
            textShadow: '2px 2px 0 #000',
            fontFamily: 'Georgia, serif'
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
            background: '#2a2a2a',
            padding: `${sizes.padding + 5}px`,
            border: '2px solid #000'
          }}
        >
          {/* Deposit Kode */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>
              DEPOSIT KODE
            </span>
            <span
              className="font-black leading-tight"
              style={{
                color: primaryColor,
                fontSize: `${sizes.depositKode * 0.7 + 3}px`,
                textShadow: '2px 2px 0 #000',
                fontFamily: 'Georgia, serif'
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
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>
              FITUR GANDA
            </span>
            <span
              className="font-bold inline-block"
              style={{
                color: trik.fiturGanda ? '#22c55e' : '#ef4444',
                fontSize: `${sizes.value * 0.85 + 3}px`,
                textShadow: '1px 1px 0 #000',
                fontFamily: 'Georgia, serif'
              }}
            >
              {trik.fiturGanda ? '✓ ON' : '✗ OFF'}
            </span>
          </div>

          {/* Putaran Bet */}
          <div className="flex-1 text-center">
            <span className="block leading-tight" style={{ fontSize: `${sizes.label * 0.9 + 3}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>
              PUTARAN BET
            </span>
            <span
              className="font-bold leading-tight"
              style={{ color: '#ffffff', fontSize: `${sizes.value * 0.85 + 3}px`, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}
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
                background: '#2a2a2a',
                padding: `${sizes.padding}px`,
                border: '2px solid #000',
                borderLeft: `4px solid ${primaryColor}`
              }}
            >
              <span className="font-semibold flex-1 text-left" style={{ fontSize: `${sizes.itemName}px`, color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>
                {item.name}
              </span>
              <span
                className="font-bold flex-1 text-center"
                style={{ color: primaryColor, fontSize: `${sizes.itemValue}px`, textShadow: '1px 1px 0 #000', fontFamily: 'Georgia, serif' }}
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
              background: primaryColor,
              padding: `${sizes.padding}px`,
              border: '2px solid #000'
            }}
          >
            <p
              className="font-bold uppercase leading-tight"
              style={{
                color: '#ffffff',
                fontSize: `${sizes.value}px`,
                textShadow: '2px 2px 0 #000',
                fontFamily: 'Georgia, serif'
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

export default function ClassicLayout({
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
}: ClassicLayoutProps) {
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
      background: selectedCardStyle?.background === 'theme' ? themeBackground : (selectedCardStyle?.background || '#1a1a1a'),
      border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${color}` : '4px solid #000',
      opacity: selectedCardStyle?.opacity || 1,
      boxShadow: selectedCardStyle?.shadow || '4px 4px 0 #000'
    };
  };

  const primaryColor = selectedStyle.primaryColor;
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
        fontFamily: 'Georgia, serif',
        height: '1000px',
        width: '1000px',
        overflow: 'hidden',
        background: '#0f0f0f'
      }}
    >
      {/* Header 1 - Title */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 relative"
        style={{
          height: '55px',
          background: `linear-gradient(to bottom, ${adjustColor(primaryColor, 15)}, ${primaryColor}, ${adjustColor(primaryColor, -10)})`,
          borderTop: '3px solid #d4af37',
          borderBottom: '3px solid #d4af37',
          boxShadow: 'inset 0 2px 4px rgba(212, 175, 55, 0.3), 0 4px 0 #000'
        }}
      >
        {/* Art Deco Corner Ornaments - Top Left */}
        <div className="absolute top-0 left-0 text-2xl leading-none" style={{ color: '#d4af37', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', padding: '2px 0 0 4px' }}>⚜</div>

        {/* Art Deco Corner Ornaments - Top Right */}
        <div className="absolute top-0 right-0 text-2xl leading-none" style={{ color: '#d4af37', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', padding: '2px 4px 0 0' }}>⚜</div>

        {/* Art Deco Corner Ornaments - Bottom Left */}
        <div className="absolute bottom-0 left-0 text-2xl leading-none" style={{ color: '#d4af37', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', padding: '0 0 2px 4px', transform: 'rotate(180deg)' }}>⚜</div>

        {/* Art Deco Corner Ornaments - Bottom Right */}
        <div className="absolute bottom-0 right-0 text-2xl leading-none" style={{ color: '#d4af37', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', padding: '0 4px 2px 0', transform: 'rotate(180deg)' }}>⚜</div>

        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight text-center`}
          style={{
            color: '#ffffff',
            textShadow: '3px 3px 0 #000, 0 0 10px rgba(212, 175, 55, 0.5)',
            fontFamily: 'Georgia, serif'
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
          background: `linear-gradient(to bottom, #2a2a2a, #1a1a1a)`,
          borderTop: '2px solid #d4af37',
          borderBottom: '2px solid #d4af37',
          boxShadow: 'inset 0 1px 2px rgba(212, 175, 55, 0.2)'
        }}
      >
        {/* Decorative corner elements using pseudo-element style borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: '#d4af37' }} />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: '#d4af37' }} />

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-9 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Georgia" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ fontSize: '20px', color: '#ffffff', textShadow: '2px 2px 0 #000', fontFamily: 'Georgia, serif' }}
            >
              {customTimeLabel}
            </span>
            <span style={{ color: '#d4af37', fontSize: '20px' }}>|</span>
            <span
              className="font-medium"
              style={{ fontSize: '18px', color: '#ffffff', textShadow: '1px 1px 0 #000', fontFamily: 'Georgia, serif' }}
            >
              {getCurrentDate()}
            </span>
          </div>
          {/* Badge */}
          <div
            className="px-3 py-1 relative"
            style={{
              background: `linear-gradient(to bottom, ${adjustColor(primaryColor, 10)}, ${primaryColor})`,
              border: '2px solid #d4af37',
              boxShadow: '2px 2px 0 #000, inset 0 1px 2px rgba(255,255,255,0.2)'
            }}
          >
            <span className="text-xs font-black text-white" style={{ textShadow: '1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>RTP LIVE</span>
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
            style={getCardContainerStyle(primaryColor)}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat',
                  opacity: 0.3
                }}
              />
            )}
            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: primaryColor,
                  fontSize: '20px',
                  textShadow: '2px 2px 0 #000'
                }}
              >
                PRAGMATIC PLAY
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pragmaticGamesWithRtp.map((game, index) => (
                <ClassicGameCard key={`pragmatic-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
              ))}
            </div>
          </div>

          {/* PG Soft Games */}
          <div
            className={`flex-1 overflow-hidden p-3 relative ${getBlurClass()}`}
            style={getCardContainerStyle(primaryColor)}
          >
            {/* Pattern Overlay */}
            {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: selectedCardStyle.pattern,
                  backgroundRepeat: 'repeat',
                  opacity: 0.3
                }}
              />
            )}
            <div className="text-center mb-2">
              <h2
                className="font-black tracking-wider"
                style={{
                  color: primaryColor,
                  fontSize: '20px',
                  textShadow: '2px 2px 0 #000'
                }}
              >
                PG SOFT
              </h2>
            </div>
            <div className="flex gap-2 justify-center">
              {pgSoftGamesWithRtp.map((game, index) => (
                <ClassicGameCard key={`pgsoft-${index}`} game={game} rtp={game.rtp} cardSize={cardSize} primaryColor={primaryColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Trik Panel Row */}
        {(pragmaticTrik.enabled || pgSoftTrik.enabled) && (
          <div className="flex gap-3 items-stretch" style={{ height: '400px' }}>
            {pragmaticTrik.enabled && (
              <div className="flex-1">
                <ClassicTrikPanel
                  trik={pragmaticTrik}
                  primaryColor={primaryColor}
                  cardStyle={selectedCardStyle}
                />
              </div>
            )}
            {pgSoftTrik.enabled && (
              <div className="flex-1">
                <ClassicTrikPanel
                  trik={pgSoftTrik}
                  primaryColor={primaryColor}
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
          className={`mx-4 mb-2 p-3 relative ${getBlurClass()}`}
          style={{
            background: selectedCardStyle?.background === 'theme'
              ? `linear-gradient(135deg, ${adjustColor(primaryColor, -30)}ee 0%, ${adjustColor(primaryColor, -50)}ee 50%, ${adjustColor(primaryColor, -60)}ee 100%)`
              : (selectedCardStyle?.background || '#1a1a1a'),
            border: selectedCardStyle?.border ? `${selectedCardStyle.border} ${primaryColor}` : '4px solid #000',
            opacity: selectedCardStyle?.opacity || 1,
            boxShadow: selectedCardStyle?.shadow ? (selectedCardStyle.shadow.includes('0 0 20px') ? `${selectedCardStyle.shadow} ${primaryColor}` : selectedCardStyle.shadow) : '6px 6px 0 #000',
            borderRadius: '4px'
          }}
        >
          {selectedCardStyle?.pattern && selectedCardStyle.pattern !== 'none' && (
            <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ backgroundImage: selectedCardStyle.pattern, backgroundRepeat: 'repeat', opacity: 0.3 }} />
          )}
          {/* Heading 1 */}
          <div className="text-center mb-2">
            <h2
              className="text-lg font-black uppercase tracking-wide"
              style={{
                color: primaryColor,
                textShadow: '2px 2px 0 #000',
                fontFamily: 'Georgia, serif'
              }}
            >
              {maxwinConfig.heading1 || 'KODE MAXWIN GACOR MALAM INI'}
            </h2>
          </div>

          {/* Heading 2 */}
          {maxwinConfig.heading2 && (
            <div className="text-center mb-2">
              <h3 className="text-sm font-bold uppercase" style={{ color: '#ffffff', textShadow: '1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>
                {maxwinConfig.heading2}
              </h3>
            </div>
          )}

          {/* Text Items */}
          {maxwinConfig.textItems && maxwinConfig.textItems.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {maxwinConfig.textItems.map((text, index) => (
                text && (
                  <div
                    key={index}
                    className="p-2 text-center"
                    style={{
                      background: '#2a2a2a',
                      border: '2px solid #000',
                      borderLeft: `4px solid ${primaryColor}`
                    }}
                  >
                    <p className="font-semibold text-xs" style={{ color: '#ffffff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Georgia, serif' }}>{text}</p>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex-shrink-0">
        <div
          className="flex items-center justify-center gap-3 px-4"
          style={{
            height: '40px',
            background: primaryColor,
            borderTop: '4px solid #000'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span
            className="text-sm font-bold"
            style={{ color: '#ffffff', textShadow: '2px 2px 0 #000' }}
          >
            {footerConfig?.footer1 || `Join: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
          </span>
        </div>
      </div>
    </div>
  );
}
