// App-wide constants

// ─── Warna desain I-REOC (sesuai HTML design) ───────────────────────────────
export const COLORS = {
  // Primary (dark navy/charcoal)
  primary: '#111827',
  onPrimary: '#FFFFFF',
  primaryContainer: '#F3F4F6',
  onPrimaryContainer: '#111827',

  // Secondary (green)
  secondary: '#2E7D5B',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8F5E9',
  onSecondaryContainer: '#1B5E20',

  // Accent (lime green)
  accent: '#7EE838',
  accentLight: '#98F057',

  // Surface
  surface: '#FFFFFF',
  onSurface: '#111827',
  surfaceVariant: '#FAFAFA',
  onSurfaceVariant: '#6B7280',
  outline: '#E5E7EB',
  outlineVariant: '#F3F4F6',

  // Semantic
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#0EA5E9',

  // Shorthand
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
};

export const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

// ─── Route names ─────────────────────────────────────────────────────────────
export const ROUTES = {
  // Main Tabs (5 tab I-REOC)
  DASHBOARD: 'Beranda',
  SENSOR: 'Sensor',
  HISTORY: 'Riwayat',
  GUIDE: 'Panduan',
  PROFILE: 'Profil',

  // Stack screens
  NOTIFICATION: 'Notification',
  SETTINGS: 'Settings',
  BATCH_DETAIL: 'BatchDetail',
};

// ─── Data dummy (ganti dengan API response nanti) ─────────────────────────────
export const MACHINE_PHASES = ['Idle', 'Pemanasan', 'Fase Panas', 'Pematangan', 'Selesai'];

export const SENSOR_KEYS = {
  TEMPERATURE: 'temperature',   // DS18B20 — °C
  HUMIDITY: 'humidity',         // DHT22 — %
  POWER: 'power',               // PZEM-004T — Watt
  ENERGY: 'energy',             // PZEM-004T — kWh
  WEIGHT: 'weight',             // HX711 Load Cell — kg
  EM4_DOSE: 'em4Dose',          // ml
};
