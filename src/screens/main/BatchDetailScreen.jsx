import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants';
import { batches } from '../../data/batches';
import { hitungSusut, hitungDosisEM4, hitungBiayaListrik } from '../../utils/calculations';
import { formatRupiah, formatKg, formatSuhu, formatPersen, formatMl } from '../../utils/formatters';

const ACCENT_SOFT = COLORS.accent + '33';

const STATUS_LABEL = {
  selesai: 'Selesai',
  aktif: 'Berjalan',
};

const formatEnergi = (value) => {
  const energi = Number(value);

  if (value == null || !Number.isFinite(energi)) {
    return '—';
  }

  return `${energi.toLocaleString('id-ID', { maximumFractionDigits: 2 })} kWh`;
};

const StatTile = ({ icon, label, value }) => (
  <View style={styles.tile}>
    <View style={styles.tileIcon}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />
    </View>

    <View style={styles.tileInfo}>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

const BatchDetailScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { batchId } = route.params || {};


  const batch = batches.find((b) => b.id === batchId) || route.params?.batch;


  if (!batch) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.danger} />
        <Text style={styles.errorText}>Batch tidak ditemukan</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const susut = hitungSusut(batch.beratAwal, batch.beratAkhir);
  const dosisEM4 = hitungDosisEM4(batch.beratAwal);
  const biayaListrik = hitungBiayaListrik(batch.energiKwh);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: 24 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* INFORMASI UTAMA */}
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.batchName}>{batch.jenis}</Text>
          <Text style={styles.batchMeta}>
            {batch.tanggal} • {batch.durasiJam} jam
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {STATUS_LABEL[batch.status] || batch.status}
          </Text>
        </View>
      </View>

      {/* HASIL OLAHAN */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Hasil Olahan</Text>

        <View style={styles.heroRow}>
          <Text style={styles.heroValue} numberOfLines={1}>
            {formatKg(batch.beratAkhir)}
          </Text>

          <View style={styles.susutBadge}>
            <Text style={styles.susutText}>{formatPersen(susut)} susut</Text>
          </View>
        </View>

        <Text style={styles.heroNote}>Dari {formatKg(batch.beratAwal)} sampah</Text>
      </View>

      {/* RINCIAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rincian Proses</Text>

        <View style={styles.grid}>
          <StatTile icon="scale-outline" label="Berat Awal" value={formatKg(batch.beratAwal)} />
          <StatTile icon="leaf-outline" label="Berat Akhir" value={formatKg(batch.beratAkhir)} />
          <StatTile icon="thermometer-outline" label="Suhu Puncak" value={formatSuhu(batch.suhuPuncak)} />
          <StatTile icon="flash-outline" label="Energi" value={formatEnergi(batch.energiKwh)} />
          <StatTile icon="cash-outline" label="Biaya Listrik" value={formatRupiah(biayaListrik)} />
          <StatTile icon="flask-outline" label="Dosis EM4" value={formatMl(dosisEM4)} />
        </View>
      </View>

      {/* CATATAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catatan</Text>

        <View style={styles.card}>
          <Text style={styles.noteText}>{batch.catatan || '—'}</Text>
        </View>
      </View>
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
    gap: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 26,
    padding: 16,
  },

  cardInfo: {
    flex: 1,
    minWidth: 0,
  },

  batchName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },

  batchMeta: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.onSurfaceVariant,
  },

  statusBadge: {
    backgroundColor: ACCENT_SOFT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // HERO
  hero: {
    gap: 4,
  },

  heroLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },

  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingTop: 4,
  },

  heroValue: {
    flexShrink: 1,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.onSurface,
  },

  susutBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },

  susutText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: COLORS.onSecondary,
  },

  heroNote: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  // SEKSI
  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 20,
    padding: 14,
  },

  tileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ACCENT_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tileInfo: {
    flex: 1,
    minWidth: 0,
  },

  tileLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.onSurfaceVariant,
  },

  tileValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: COLORS.onSurface,
  },

  noteText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.onSurface,
  },

  // ERROR
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.surface,
    gap: 12,
  },

  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
  },

  backButton: {
    marginTop: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default BatchDetailScreen;