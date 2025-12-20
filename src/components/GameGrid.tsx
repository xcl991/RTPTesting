'use client';

import { Game, CardStyleOption, DefaultLayoutSizeConfig } from '@/types';

interface GameCardProps {
  game: Game;
  rtp: number;
  style: any;
  cardSize: number;
}

function GameCard({ game, rtp, style, cardSize }: GameCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
      style={{
        backgroundColor: style.backgroundColor,
        border: `1px solid ${style.primaryColor}`,
        width: `${cardSize}px`
      }}
    >
      {/* Game Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${cardSize}px`, position: 'relative' }}
      >
        <img
          src={game.src}
          alt={`${game.name} game preview`}
          className="w-full h-full object-contain bg-black/50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />

      </div>

      {/* Game Info */}
      <div
        className="p-1.5"
        style={{
          background: `linear-gradient(to bottom, ${style.backgroundColor}dd, ${style.backgroundColor})`
        }}
      >
        <h3
          data-game-title="true"
          className="text-white font-semibold text-[10px] text-center"
          style={{
            overflow: 'hidden',
            height: '24px',
            lineHeight: '12px',
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
        >
          {game.name}
        </h3>
      </div>
    </div>
  );
}

interface GameGridProps {
  title: string;
  games: Game[];
  gameCount: number;
  providerLogo: string;
  providerColor: string;
  style: any;
  cardStyle?: CardStyleOption;
  sizeConfig?: DefaultLayoutSizeConfig;
}

export default function GameGrid({
  title,
  games,
  gameCount,
  providerLogo,
  providerColor,
  style,
  cardStyle,
  sizeConfig
}: GameGridProps) {
  // Default values jika sizeConfig tidak provided
  const config = sizeConfig || {
    gameCardSize: 108,
    gameGap: 2,
    trikPanelWidth: 380,
    providerLogoHeight: 32,
    providerTitleSize: 14,
    providerBadgeSize: 10,
    modalPadding: 6,
    headerPadding: 6,
    headerMarginBottom: 6,
    isLocked: false
  };

  const selectedGames = games.slice(0, gameCount);

  const gamesWithRTP = selectedGames.map(game => ({
    ...game,
    rtp: Math.floor(Math.random() * 13) + 86
  }));

  const getBlurClass = () => {
    if (!cardStyle?.blur || cardStyle.blur === 'none') return '';
    return cardStyle.blur;
  };

  const getSectionStyle = () => ({
    background: cardStyle?.background || `${style.backgroundColor}dd`,
    border: cardStyle?.border ? `${cardStyle.border} ${style.primaryColor}` : `1px solid ${style.primaryColor}`,
    opacity: cardStyle?.opacity || 1,
    boxShadow: cardStyle?.shadow ? (cardStyle.shadow.includes('0 0 20px') ? `${cardStyle.shadow} ${style.primaryColor}` : cardStyle.shadow) : undefined
  });

  return (
    <div
      className={`relative h-full rounded-lg ${getBlurClass()}`}
      style={{
        ...getSectionStyle(),
        padding: `${config.modalPadding}px`
      }}
    >
      {/* Pattern Overlay */}
      {cardStyle?.pattern && cardStyle.pattern !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            backgroundImage: cardStyle.pattern,
            backgroundRepeat: 'repeat'
          }}
        />
      )}
      {/* Provider Header - Hanya title, badge dihapus */}
      <div
        className="relative z-10 flex flex-col items-center rounded-lg"
        style={{
          padding: `${config.headerPadding}px`,
          marginBottom: `${config.headerMarginBottom}px`
        }}
      >
        <h2
          className="font-bold text-center"
          style={{
            color: providerColor,
            fontSize: `${config.providerTitleSize}px`
          }}
        >
          {title}
        </h2>
      </div>

      {/* Games Grid */}
      <div
        className="relative z-10 grid grid-rows-2 grid-flow-col justify-items-center"
        style={{ gap: `${config.gameGap}px` }}
      >
        {gamesWithRTP.map((game, index) => (
          <GameCard
            key={`${game.name}-${index}`}
            game={game}
            rtp={game.rtp}
            style={style}
            cardSize={config.gameCardSize}
          />
        ))}
      </div>
    </div>
  );
}
