// SettingsScreen — pengaturan aplikasi & preferensi simulasi I-REOC
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, ROUTES } from '../../constants';
import { device } from '../../data/device';
import { sensors } from '../../data/sensors';
import { phases } from '../../data/phases';
import { notifications } from '../../data/notification';
import { SOP_VERSION } from '../../data/guide';
import { RASIO_EM4_ML_PER_KG, TARIF_PER_KWH } from '../../data/konstanta';
import { formatRupiah } from '../../utils/formatters';

const APP_VERSION = '1.0.0';
const ACCENT_SOFT = COLORS.accent + '33';

const DEFAULT_PREFERENCES = {
  notifEnabled: true,
  highTempAlert: true,
  phaseDoneAlert: true,
};

const SectionBlock = ({ title, subtitle, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
    <View style={styles.card}>{children}</View>
  </View>
);

const SettingIcon = ({ name, color = COLORS.primary, background = ACCENT_SOFT }) => (
  <View style={[styles.iconCircle, { backgroundColor: background }]}>
    <Ionicons name={name} size={18} color={color} />
  </View>
);

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
      background={disabled ? COLORS.outlineVariant : COLORS.secondaryContainer}
    />

    <View style={styles.rowInfo}>
      <Text style={styles.rowLabel}>{title}</Text>
      {subtitle ? <Text style={styles.rowSublabel}>{subtitle}</Text> : null}
    </View>

    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: COLORS.outline, true: COLORS.secondary }}
      thumbColor={COLORS.white}
      accessibilityLabel={title}
    />
  </View>
);

const SettingActionRow = ({
  icon,
  iconColor = COLORS.primary,
  iconBackground = ACCENT_SOFT,
  title,
  subtitle,
  value,
  onPress,
  showDivider = false,
  isDanger = false,
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
    <SettingIcon name={icon} color={iconColor} background={iconBackground} />

    <View style={styles.rowInfo}>
      <Text style={[styles.rowLabel, isDanger && styles.dangerLabel]}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.rowSublabel}>{subtitle}</Text> : null}
    </View>

    <View style={styles.rowRight}>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color={COLORS.onSurfaceVariant} />
    </View>
  </Pressable>
);

const SettingInfoRow = ({ label, value, showDivider = false }) => (
  <View style={[styles.infoRow, showDivider && styles.rowDivider]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [lastDiagnostic, setLastDiagnostic] = useState(null);

  const unreadCount = notifications.filter((item) => !item.dibaca).length;
  const heatingPhase = phases.find((phase) => phase.id === 'HEATING');
  const modelSpec = device.spesifikasi.find((item) => item.id === 'model');
  const networkSpec = device.spesifikasi.find((item) => item.id === 'jaringan');

  const updatePreference = (key, nextValue) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
  };

  const handleOpenNotification = () => {
    navigation.navigate(ROUTES.NOTIFICATION);
  };

  const handleOpenGuide = () => {
    navigation.navigate('MainTabs', { screen: ROUTES.GUIDE });
  };

  const handleOpenSensor = () => {
    navigation.navigate('MainTabs', { screen: ROUTES.SENSOR });
  };

  const handleShowPhaseTargets = () => {
    const phaseLines = phases
      .filter((phase) => phase.rentangSuhu)
      .map(
        (phase) =>
          `• ${phase.nama}: ${phase.rentangSuhu.min}°C – ${phase.rentangSuhu.max}°C`
      )
      .join('\n');

    Alert.alert('Rentang Suhu Fase I-REOC', phaseLines);
  };

  const handleShowEm4Info = () => {
    Alert.alert(
      'Rasio Dosis Bioaktivator EM4',
      `Aplikasi menghitung kebutuhan EM4 sebesar ${RASIO_EM4_ML_PER_KG} ml untuk setiap 1 kg sampah organik awal.`
    );
  };

  const handleShowTariffInfo = () => {
    Alert.alert(
      'Tarif Listrik Simulasi',
      `Estimasi biaya listrik dihitung menggunakan tarif acuan ${formatRupiah(
        TARIF_PER_KWH
      )} per kWh berdasarkan pembacaan energi simulasi.`
    );
  };

  const handleRunDiagnostic = () => {
    const normalCount = sensors.filter((item) => item.status === 'normal').length;
    const summaryLines = sensors
      .map((item) => `• ${item.nama} (${item.perangkat}): ${item.nilai} ${item.satuan}`)
      .join('\n');

    const timestamp = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setLastDiagnostic(`${normalCount}/${sensors.length} sensor normal (${timestamp})`);

    Alert.alert(
      'Hasil Uji Diagnostik Simulasi',
      `Status Perangkat: ${device.id} (${networkSpec?.nilai || 'Lokal'})\n` +
        `${normalCount} dari ${sensors.length} sensor berada dalam kondisi normal:\n\n` +
        `${summaryLines}\n\n` +
        'Catatan: Pengujian membaca data telemetri simulasi lokal dan belum terhubung ke perangkat fisik.',
      [
        { text: 'Tutup', style: 'cancel' },
        { text: 'Buka Sensor', onPress: handleOpenSensor },
      ]
    );
  };

  const isDefaultPreferences =
    preferences.notifEnabled === DEFAULT_PREFERENCES.notifEnabled &&
    preferences.highTempAlert === DEFAULT_PREFERENCES.highTempAlert &&
    preferences.phaseDoneAlert === DEFAULT_PREFERENCES.phaseDoneAlert;

  const handleResetPreferences = () => {
    if (isDefaultPreferences) {
      Alert.alert(
        'Pengaturan Sudah Default',
        'Seluruh preferensi notifikasi saat ini sudah berada pada konfigurasi awal.'
      );
      return;
    }

    Alert.alert(
      'Reset Preferensi Pengaturan',
      'Kembalikan semua preferensi notifikasi simulasi ke pengaturan awal?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setPreferences(DEFAULT_PREFERENCES);
            Alert.alert('Berhasil', 'Preferensi pengaturan dikembalikan ke setelan awal.');
          },
        },
      ]
    );
  };

  const handleShowSimulationLimit = () => {
    Alert.alert(
      'Mode Simulasi Lokal',
      'Aplikasi I-REOC saat ini berjalan dalam mode simulasi tanpa koneksi perangkat keras IoT maupun penyimpanan persisten (database/cloud). Perubahan toggle di halaman ini berlaku selama sesi aplikasi berjalan.'
    );
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
              <Ionicons name="hardware-chip-outline" size={20} color={COLORS.accent} />
            </View>
            <View style={styles.heroBrandInfo}>
              <Text style={styles.heroTitle}>{modelSpec?.nilai || 'I-REOC Dekomposer'}</Text>
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
          Preferensi disimpan secara lokal selama sesi aktif berlangsung (in-memory).
        </Text>
      </View>

      {/* PREFERENSI NOTIFIKASI */}
      <SectionBlock title="Notifikasi Simulasi" subtitle="Preferensi sesi">
        <SettingSwitchRow
          icon="notifications-outline"
          title="Aktifkan Notifikasi"
          subtitle="Kontrol utama peringatan aktivitas reaktor"
          value={preferences.notifEnabled}
          onValueChange={(value) => updatePreference('notifEnabled', value)}
        />
        <SettingSwitchRow
          icon="thermometer-outline"
          title="Peringatan Suhu Kritis"
          subtitle="Peringatan jika suhu melebihi 60°C"
          value={preferences.highTempAlert}
          onValueChange={(value) => updatePreference('highTempAlert', value)}
          disabled={!preferences.notifEnabled}
          showDivider
        />
        <SettingSwitchRow
          icon="checkmark-done-outline"
          title="Notifikasi Fase & Batch"
          subtitle="Informasi perpindahan tahap dan batch selesai"
          value={preferences.phaseDoneAlert}
          onValueChange={(value) => updatePreference('phaseDoneAlert', value)}
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

      {/* PARAMETER & ACUAN PROSES */}
      <SectionBlock title="Parameter Proses" subtitle="Acuan perhitungan">
        <SettingActionRow
          icon="flame-outline"
          iconColor="#D97706"
          iconBackground="#FEF3C7"
          title="Target Suhu Fase Panas"
          subtitle="Ketuk untuk melihat rentang suhu 3 fase"
          value={
            heatingPhase?.rentangSuhu
              ? `${heatingPhase.rentangSuhu.min}–${heatingPhase.rentangSuhu.max}°C`
              : '—'
          }
          onPress={handleShowPhaseTargets}
        />
        <SettingActionRow
          icon="flask-outline"
          title="Rasio Bioaktivator EM4"
          subtitle="Takaran per kilogram sampah awal"
          value={`${RASIO_EM4_ML_PER_KG} ml/kg`}
          onPress={handleShowEm4Info}
          showDivider
        />
        <SettingActionRow
          icon="flash-outline"
          iconColor={COLORS.secondary}
          iconBackground={COLORS.secondaryContainer}
          title="Tarif Listrik Simulasi"
          subtitle="Acuan estimasi biaya per batch"
          value={`${formatRupiah(TARIF_PER_KWH)}/kWh`}
          onPress={handleShowTariffInfo}
          showDivider
        />
        <SettingActionRow
          icon="book-outline"
          iconColor={COLORS.secondary}
          iconBackground={COLORS.secondaryContainer}
          title="Buku Panduan Bahan"
          subtitle="Buka daftar bahan yang diizinkan & dilarang"
          value={SOP_VERSION}
          onPress={handleOpenGuide}
          showDivider
        />
      </SectionBlock>

      {/* PERANGKAT & PEMELIHARAAN */}
      <SectionBlock title="Perangkat & Pemeliharaan" subtitle="Diagnostik">
        {device.spesifikasi.map((spec, index) => (
          <SettingInfoRow
            key={spec.id}
            label={spec.label}
            value={spec.nilai}
            showDivider={index > 0}
          />
        ))}
        <SettingActionRow
          icon="pulse-outline"
          iconColor={COLORS.secondary}
          iconBackground={COLORS.secondaryContainer}
          title="Uji Diagnostik Simulasi"
          subtitle={lastDiagnostic || 'Periksa kondisi pembacaan 5 sensor simulasi'}
          onPress={handleRunDiagnostic}
          showDivider
        />
        <SettingActionRow
          icon="refresh-outline"
          iconColor={COLORS.danger}
          iconBackground="#FEE2E2"
          title="Reset Preferensi Pengaturan"
          subtitle="Kembalikan pengaturan notifikasi ke default"
          onPress={handleResetPreferences}
          showDivider
          isDanger
        />
      </SectionBlock>

      {/* TENTANG APLIKASI */}
      <SectionBlock title="Tentang Aplikasi">
        <SettingInfoRow label="Nama Aplikasi" value="I-REOC" />
        <SettingInfoRow label="Versi" value={APP_VERSION} showDivider />
        <SettingActionRow
          icon="information-circle-outline"
          title="Status Penyimpanan & Koneksi"
          subtitle="Mode simulasi lokal tanpa backend aktif"
          value="Info"
          onPress={handleShowSimulationLimit}
          showDivider
        />
        <View style={[styles.aboutBox, styles.rowDivider]}>
          <Text style={styles.aboutText}>{device.tentang}</Text>
        </View>
      </SectionBlock>
    </ScrollView>
  );
};

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

  dangerLabel: {
    color: COLORS.danger,
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
