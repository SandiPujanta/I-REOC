
// SettingsScreen — pengaturan aplikasi I-REOC
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, ROUTES } from '../../constants';
import { device } from '../../data/device';
import { phases } from '../../data/phases';
import { notifications } from '../../data/notification';
import { SOP_VERSION } from '../../data/guide';
import { RASIO_EM4_ML_PER_KG, TARIF_PER_KWH } from '../../data/konstanta';
import { formatRupiah } from '../../utils/formatters';

// Versi aplikasi
const APP_VERSION = '1.0.0';
const ACCENT_SOFT = COLORS.accent + '33';

// Pengaturan notifikasi awal
const DEFAULT_PREFERENCES = {
  notifEnabled: true,
  highTempAlert: true,
  phaseDoneAlert: true,
};

// Komponen pembungkus setiap bagian pengaturan
const SectionBlock = ({ title, subtitle, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      ) : null}
    </View>

    <View style={styles.card}>{children}</View>
  </View>
);

// Komponen ikon pengaturan
const SettingIcon = ({
  name,
  color = COLORS.primary,
  background = ACCENT_SOFT,
}) => (
  <View style={[styles.iconCircle, { backgroundColor: background }]}>
    <Ionicons name={name} size={18} color={color} />
  </View>
);

// Komponen pengaturan dengan tombol Switch
const SettingSwitchRow = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  disabled = false,
  showDivider = false,
}) => (
  <View
    style={[
      styles.row,
      showDivider && styles.rowDivider,
      disabled && styles.rowDisabled,
    ]}
  >
    <SettingIcon
      name={icon}
      color={disabled ? COLORS.gray : COLORS.secondary}
      background={
        disabled ? COLORS.outlineVariant : COLORS.secondaryContainer
      }
    />

    <View style={styles.rowInfo}>
      <Text style={styles.rowLabel}>{title}</Text>
      {subtitle ? (
        <Text style={styles.rowSublabel}>{subtitle}</Text>
      ) : null}
    </View>

    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: COLORS.outline,
        true: COLORS.secondary,
      }}
      thumbColor={COLORS.white}
      accessibilityLabel={title}
    />
  </View>
);

// Komponen baris yang dapat ditekan untuk navigasi
const SettingActionRow = ({
  icon,
  iconColor = COLORS.primary,
  iconBackground = ACCENT_SOFT,
  title,
  subtitle,
  value,
  onPress,
  showDivider = false,
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.row,
      showDivider && styles.rowDivider,
      pressed && styles.rowPressed,
    ]}
    onPress={onPress}
    android_ripple={{ color: COLORS.outline }}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    <SettingIcon
      name={icon}
      color={iconColor}
      background={iconBackground}
    />

    <View style={styles.rowInfo}>
      <Text style={styles.rowLabel}>{title}</Text>
      {subtitle ? (
        <Text style={styles.rowSublabel}>{subtitle}</Text>
      ) : null}
    </View>

    <View style={styles.rowRight}>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={COLORS.onSurfaceVariant}
      />
    </View>
  </Pressable>
);

// Komponen informasi tanpa interaksi
const SettingInfoRow = ({ label, value, showDivider = false }) => (
  <View style={[styles.infoRow, showDivider && styles.rowDivider]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Menyimpan preferensi notifikasi selama aplikasi berjalan
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  // Menghitung jumlah notifikasi yang belum dibaca
  const unreadCount = notifications.filter(
    (item) => !item.dibaca
  ).length;

  // Mengambil data fase pemanasan
  const heatingPhase = phases.find(
    (phase) => phase.id === 'HEATING'
  );

  // Mengambil informasi perangkat
  const modelSpec = device.spesifikasi.find(
    (item) => item.id === 'model'
  );

  const networkSpec = device.spesifikasi.find(
    (item) => item.id === 'jaringan'
  );

  // Mengubah preferensi notifikasi
  const updatePreference = (key, nextValue) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
  };

  // Membuka pusat notifikasi
  const handleOpenNotification = () => {
    navigation.navigate(ROUTES.NOTIFICATION);
  };

  // Membuka buku panduan bahan
  const handleOpenGuide = () => {
    navigation.navigate('MainTabs', {
      screen: ROUTES.GUIDE,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: 28 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* BANNER STATUS PERANGKAT */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroBrand}>
            <View style={styles.heroIconBox}>
              <Ionicons
                name="hardware-chip-outline"
                size={20}
                color={COLORS.accent}
              />
            </View>

            <View style={styles.heroBrandInfo}>
              <Text style={styles.heroTitle}>
                {modelSpec?.nilai || 'I-REOC Dekomposer'}
              </Text>

              <Text style={styles.heroSubtitle}>
                {device.id} · {networkSpec?.nilai || 'Simulasi'}
              </Text>
            </View>
          </View>

          <View style={styles.modeBadge}>
            <View style={styles.modeDot} />
            <Text style={styles.modeText}>Simulasi</Text>
          </View>
        </View>

        <Text style={styles.heroNote}>
          Preferensi disimpan secara lokal selama sesi aktif berlangsung.
        </Text>
      </View>

      {/* PREFERENSI NOTIFIKASI */}
      <SectionBlock
        title="Notifikasi Simulasi"
        subtitle="Preferensi sesi"
      >
        <SettingSwitchRow
          icon="notifications-outline"
          title="Aktifkan Notifikasi"
          subtitle="Kontrol utama peringatan aktivitas reaktor"
          value={preferences.notifEnabled}
          onValueChange={(value) =>
            updatePreference('notifEnabled', value)
          }
        />

        <SettingSwitchRow
          icon="thermometer-outline"
          title="Peringatan Suhu Kritis"
          subtitle="Peringatan jika suhu melebihi 60°C"
          value={preferences.highTempAlert}
          onValueChange={(value) =>
            updatePreference('highTempAlert', value)
          }
          disabled={!preferences.notifEnabled}
          showDivider
        />

        <SettingSwitchRow
          icon="checkmark-done-outline"
          title="Notifikasi Fase & Batch"
          subtitle="Informasi perpindahan tahap dan batch selesai"
          value={preferences.phaseDoneAlert}
          onValueChange={(value) =>
            updatePreference('phaseDoneAlert', value)
          }
          disabled={!preferences.notifEnabled}
          showDivider
        />

        <SettingActionRow
          icon="mail-unread-outline"
          iconColor={COLORS.secondary}
          iconBackground={COLORS.secondaryContainer}
          title="Pusat Notifikasi"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi telah dibaca'
          }
          onPress={handleOpenNotification}
          showDivider
        />
      </SectionBlock>

      {/* PARAMETER PROSES */}
      <SectionBlock
        title="Parameter Proses"
        subtitle="Acuan perhitungan"
      >
        <SettingInfoRow
          label="Target Suhu Fase Panas"
          value={
            heatingPhase?.rentangSuhu
              ? `${heatingPhase.rentangSuhu.min}–${heatingPhase.rentangSuhu.max}°C`
              : '—'
          }
        />

        <SettingInfoRow
          label="Rasio Bioaktivator EM4"
          value={`${RASIO_EM4_ML_PER_KG} ml/kg`}
          showDivider
        />

        <SettingInfoRow
          label="Tarif Listrik Simulasi"
          value={`${formatRupiah(TARIF_PER_KWH)}/kWh`}
          showDivider
        />

        <SettingActionRow
          icon="book-outline"
          iconColor={COLORS.secondary}
          iconBackground={COLORS.secondaryContainer}
          title="Buku Panduan Bahan"
          subtitle="Daftar bahan yang diizinkan dan dilarang"
          value={SOP_VERSION}
          onPress={handleOpenGuide}
          showDivider
        />
      </SectionBlock>

      {/* INFORMASI PERANGKAT */}
      <SectionBlock
        title="Perangkat"
        subtitle="Informasi spesifikasi"
      >
        {device.spesifikasi.map((spec, index) => (
          <SettingInfoRow
            key={spec.id}
            label={spec.label}
            value={spec.nilai}
            showDivider={index > 0}
          />
        ))}
      </SectionBlock>

      {/* TENTANG APLIKASI */}
      <SectionBlock title="Tentang Aplikasi">
        <SettingInfoRow
          label="Nama Aplikasi"
          value="I-REOC"
        />

        <SettingInfoRow
          label="Versi"
          value={APP_VERSION}
          showDivider
        />

        <SettingInfoRow
          label="Status Penyimpanan & Koneksi"
          value="Simulasi Lokal"
          showDivider
        />

        <View style={[styles.aboutBox, styles.rowDivider]}>
          <Text style={styles.aboutText}>
            {device.tentang}
          </Text>
        </View>
      </SectionBlock>
    </ScrollView>
  );
};

// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 20,
  },

  // HERO CARD
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 18,
    gap: 12,
  },

  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  heroBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },

  heroIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroBrandInfo: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },

  heroTitle: {
    fontSize: 15,
    fontFamily: FONTS.headingBold,
    color: COLORS.white,
  },

  heroSubtitle: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: '#9CA3AF',
  },

  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  modeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },

  modeText: {
    fontSize: 10,
    fontFamily: FONTS.headingBold,
    color: COLORS.secondary,
  },

  heroNote: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: '#D1D5DB',
  },

  // SECTION
  section: {
    gap: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  sectionSubtitle: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  card: {
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    overflow: 'hidden',
  },

  // ROWS
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },

  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
  },

  rowDisabled: {
    opacity: 0.5,
  },

  rowPressed: {
    opacity: 0.75,
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowInfo: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },

  rowLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  rowSublabel: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rowValue: {
    fontSize: 12,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.secondary,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
  },

  infoLabel: {
    fontSize: 13,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  infoValue: {
    fontSize: 13,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
    textAlign: 'right',
    flexShrink: 1,
  },

  aboutBox: {
    paddingVertical: 12,
  },

  aboutText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },
});

export default SettingsScreen;
