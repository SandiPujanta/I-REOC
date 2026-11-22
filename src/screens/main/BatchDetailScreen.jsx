import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { batches } from '../../data/batches';
import { hitungSusut, hitungDosisEM4, hitungBiayaListrik } from '../../utils/calculations';
import { formatRupiah, formatKg, formatSuhu, formatPersen, formatMl } from '../../utils/formatters';

const BatchDetailScreen = ({ route, navigation }) => {
  const { batchId } = route.params || {};

  // Cari batch berdasarkan batchId atau gunakan batch langsung jika dikirim dari route
  const batch = batches.find((b) => b.id === batchId) || route.params?.batch;

  // Penjagaan: jika batch tidak ditemukan
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

  // Nilai turunan dihitung dari fungsi calculations.js
  const susut = hitungSusut(batch.beratAwal, batch.beratAkhir);
  const dosisEM4 = hitungDosisEM4(batch.beratAwal);
  const biayaListrik = hitungBiayaListrik(batch.energiKwh);

  return (
    <ScrollView style={styles.container}>
      {/* Header & Tombol Kembali */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Batch #{batch.id}</Text>
      </View>

      {/* Informasi Utama */}
      <View style={styles.card}>
        <Text style={styles.batchName}>{batch.jenis}</Text>
        <Text style={styles.batchDate}>{batch.tanggal} • {batch.durasiJam} jam</Text>
      </View>

      {/* Ringkasan Perhitungan */}
      <View style={styles.infoSection}>
        <Text>Berat Awal: {formatKg(batch.beratAwal)}</Text>
        <Text>Berat Akhir: {formatKg(batch.beratAkhir)}</Text>
        <Text>Penyusutan: {formatPersen(susut)}</Text>
        <Text>Suhu Puncak: {formatSuhu(batch.suhuPuncak)}</Text>
        <Text>Energi: {batch.energiKwh} kWh</Text>
        <Text>Biaya Listrik: {formatRupiah(biayaListrik)}</Text>
        <Text>Dosis EM4: {formatMl(dosisEM4)}</Text>
        <Text>Catatan: {batch.catatan || '—'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SIZES.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: SIZES.medium,
  },
  headerBack: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  card: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SIZES.medium,
    borderRadius: 12,
    marginBottom: SIZES.medium,
  },
  batchName: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  batchDate: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  infoSection: {
    gap: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.surface,
    gap: 12,
  },
  errorText: {
    fontSize: SIZES.medium,
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
