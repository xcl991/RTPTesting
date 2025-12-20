export interface Game {
  name: string;
  src: string;
  rtp?: number;
}

export interface RTPStyle {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

export interface WebsiteOption {
  id: string;
  name: string;
  logo: string;
  backgrounds?: string[]; // Background khusus untuk website ini
}

export interface TimeSlot {
  id: string;
  label: string;
  startHour: number;
  endHour: number;
}

export interface GeneratorConfig {
  websiteId: string;
  pragmaticCount: number;
  pgSoftCount: number;
  timeSlotId: string;
  backgroundId: string;
  styleId: string;
}

export interface LayoutOption {
  id: string;
  name: string;
  description: string;
}

export interface TextureOption {
  id: string;
  name: string;
  pattern: string;
}

export interface CardStyleOption {
  id: string;
  name: string;
  background: string;
  border: string;
  opacity: number;
  pattern: string;
  blur: string;
  shadow: string;
}

export interface BackgroundCategory {
  id: string;
  name: string;
  backgrounds: string[];
}

export interface TrikItem {
  name: string;
  value: string;
  pattern: string; // contoh: "XVV" (X = silang, V = centang)
}

export interface TrikConfig {
  enabled: boolean;
  title: string; // Custom title untuk panel (default: "TRIK GACOR")
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Font size untuk panel
  depositKode: string;
  putaranBetMin: number;
  putaranBetMax: number;
  fiturGanda: boolean;
  trikItems: TrikItem[];
  customText: string;
}

export interface MaxwinConfig {
  enabled: boolean;
  heading1: string; // Heading utama (e.g., "KODE MAXWIN GACOR MALAM INI 6.917")
  heading2: string; // Sub-heading
  textItems: string[]; // Array of text items (dynamically add/remove)
  buttonText: string; // Text tambahan untuk tombol header
}

export interface DefaultLayoutSizeConfig {
  gameCardSize: number; // Width/height game card (px)
  gameGap: number; // Gap antar game (px)
  trikPanelWidth: number; // Lebar panel trik (px)
  providerLogoHeight: number; // Tinggi logo provider (px)
  providerTitleSize: number; // Ukuran text title provider (px)
  providerBadgeSize: number; // Ukuran text badge (px)
  // Modal provider settings
  modalPadding: number; // Padding modal container (px)
  headerPadding: number; // Padding provider header (px)
  headerMarginBottom: number; // Margin bottom provider header (px)
  // Lock state
  isLocked: boolean; // Apakah size sudah di-lock
}
