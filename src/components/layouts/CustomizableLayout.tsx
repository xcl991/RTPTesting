'use client';

import GameGrid from '../GameGrid';
import TrikPanel from '../TrikPanel';
import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

interface CustomizableLayoutProps {
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
}

export default function CustomizableLayout({
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
}: CustomizableLayoutProps) {
  const getFontSizeClass = () => {
    switch (headerFontSize) {
      case 'small': return 'text-lg';
      case 'medium': return 'text-xl';
      case 'large': return 'text-2xl';
      case 'xlarge': return 'text-3xl';
    }
  };

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
      {/* Header 1 - Custom Title (Height: ~45px) */}
      <div
        className="flex-shrink-0 text-center py-2 px-3"
        style={{
          height: '45px',
          background: `linear-gradient(135deg, ${selectedStyle.primaryColor}40 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.secondaryColor}40 100%)`,
          borderBottom: `2px solid ${selectedStyle.primaryColor}60`
        }}
      >
        <h1
          className={`${getFontSizeClass()} font-black uppercase tracking-wider leading-tight`}
          style={{
            color: selectedStyle.primaryColor,
            textShadow: `0 0 20px ${selectedStyle.primaryColor}, 0 0 40px ${selectedStyle.primaryColor}50, 0 2px 4px rgba(0,0,0,0.8)`
          }}
        >
          {customHeaderText}
        </h1>
      </div>

      {/* Header 2 - Logo, Time, Date (Height: ~40px) */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-3"
        style={{
          height: '40px',
          background: `linear-gradient(90deg, ${selectedStyle.backgroundColor}90 0%, ${selectedStyle.primaryColor}20 50%, ${selectedStyle.backgroundColor}90 100%)`,
          borderBottom: `1px solid ${selectedStyle.primaryColor}40`
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={selectedWebsite.logo}
            alt={`${selectedWebsite.name} logo`}
            className="h-7 object-contain"
            style={{
              filter: `drop-shadow(0 0 6px ${selectedStyle.primaryColor}60)`
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
            }}
          />
          <span
            className="text-xs font-bold uppercase"
            style={{ color: selectedStyle.primaryColor }}
          >
            {selectedWebsite.name}
          </span>
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end leading-tight">
            <span
              className="text-xs font-bold"
              style={{
                color: selectedStyle.secondaryColor,
                textShadow: `0 0 10px ${selectedStyle.secondaryColor}`
              }}
            >
              {customTimeLabel}
            </span>
            <span className="text-white text-[10px] opacity-80">
              {getCurrentDate()}
            </span>
          </div>
          {/* Live Indicator */}
          <div
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, #22c55e40, #16a34a40)`,
              border: '1px solid #22c55e60'
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#22c55e' }}
            />
            <span className="text-[10px] font-bold text-green-400">LIVE</span>
          </div>
        </div>
      </div>

      {/* Games Container (Height: ~830px) */}
      <div
        className="flex-1 flex flex-col gap-2 p-2 overflow-hidden"
        style={{ height: '830px' }}
      >
        {/* Pragmatic Play Section (Height: ~410px) */}
        <div
          className="flex-1 grid gap-2"
          style={{
            gridTemplateColumns: pragmaticTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
            minHeight: 0
          }}
        >
          {/* RTP Grid */}
          <div
            className="min-w-0 overflow-hidden rounded-lg"
            style={{
              background: `linear-gradient(180deg, ${selectedStyle.primaryColor}10 0%, transparent 100%)`,
              border: `1px solid ${selectedStyle.primaryColor}30`
            }}
          >
            <GameGrid
              title="PRAGMATIC PLAY"
              games={selectedPragmaticGames}
              gameCount={pragmaticCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              providerColor="#ffd700"
              style={selectedStyle}
              cardStyle={selectedCardStyle}
              sizeConfig={defaultLayoutSize}
            />
          </div>
          {/* Trik Panel Pragmatic */}
          {pragmaticTrik.enabled && (
            <div className="overflow-hidden">
              <TrikPanel
                trik={pragmaticTrik}
                providerColor="#ffd700"
                fontFamily="var(--font-orbitron), sans-serif"
                cardStyle={selectedCardStyle}
                variant="default"
                horizontalItems={true}
              />
            </div>
          )}
        </div>

        {/* PG Soft Section (Height: ~410px) */}
        <div
          className="flex-1 grid gap-2"
          style={{
            gridTemplateColumns: pgSoftTrik.enabled ? `1fr ${defaultLayoutSize.trikPanelWidth}px` : '1fr',
            minHeight: 0
          }}
        >
          {/* RTP Grid */}
          <div
            className="min-w-0 overflow-hidden rounded-lg"
            style={{
              background: `linear-gradient(180deg, ${selectedStyle.secondaryColor}10 0%, transparent 100%)`,
              border: `1px solid ${selectedStyle.secondaryColor}30`
            }}
          >
            <GameGrid
              title="PG SOFT"
              games={selectedPgSoftGames}
              gameCount={pgSoftCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              providerColor="#00f0ff"
              style={selectedStyle}
              cardStyle={selectedCardStyle}
              sizeConfig={defaultLayoutSize}
            />
          </div>
          {/* Trik Panel PG Soft */}
          {pgSoftTrik.enabled && (
            <div className="overflow-hidden">
              <TrikPanel
                trik={pgSoftTrik}
                hideFiturGanda={true}
                providerColor="#00f0ff"
                fontFamily="var(--font-orbitron), sans-serif"
                cardStyle={selectedCardStyle}
                variant="default"
                horizontalItems={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer Section (Height: ~85px total) */}
      <div className="flex-shrink-0">
        {/* Footer 1 - Main Footer with Telegram (Height: ~32px) */}
        <div
          className="text-center py-1.5 px-3"
          style={{
            height: '32px',
            background: `linear-gradient(90deg, ${selectedStyle.primaryColor}30 0%, ${selectedStyle.backgroundColor}80 50%, ${selectedStyle.primaryColor}30 100%)`,
            borderTop: `1px solid ${selectedStyle.primaryColor}40`
          }}
        >
          <div className="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill={selectedStyle.primaryColor}>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span
              className="text-sm font-bold"
              style={{ color: selectedStyle.primaryColor }}
            >
              {footerConfig.footer1 || `Join Telegram: @${telegramUsername || selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
            </span>
          </div>
        </div>

        {/* Sub Footer 1 (Height: ~24px) */}
        {footerConfig.subFooter1 && (
          <div
            className="text-center py-1 px-3"
            style={{
              height: '24px',
              background: `${selectedStyle.backgroundColor}60`
            }}
          >
            <span
              className="text-[10px]"
              style={{ color: selectedStyle.secondaryColor, opacity: 0.9 }}
            >
              {footerConfig.subFooter1}
            </span>
          </div>
        )}

        {/* Footer 2 (Height: ~26px) */}
        {footerConfig.footer2 && (
          <div
            className="text-center py-1 px-3"
            style={{
              height: '26px',
              background: `linear-gradient(90deg, ${selectedStyle.secondaryColor}20 0%, ${selectedStyle.primaryColor}20 100%)`,
              borderTop: `1px solid ${selectedStyle.primaryColor}20`
            }}
          >
            <span
              className="text-[10px] font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {footerConfig.footer2}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
