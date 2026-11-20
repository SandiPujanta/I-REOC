/**
 * BatchDetailScreen — Detail satu batch pengolahan
 * Dibuka dari HistoryScreen saat user tap salah satu batch
 *
 * Konten yang bisa ditampilkan:
 *   - Nomor & jenis batch
 *   - Tanggal mulai, durasi
 *   - Bobot awal vs hasil kompos + % susut
 *   - Rata-rata suhu, kelembapan, daya selama proses
 *   - Catatan / keterangan tambahan
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const BatchDetailScreen = ({ route }) => {
  // batch object dikirim dari HistoryScreen via navigation.navigate(ROUTES.BATCH_DETAIL, { batch })
  const { batch } = route.params;

  // Helper: hitung % susut
  const shrinkPercent = batch.initialKg > 0
    ? Math.round(((batch.initialKg - batch.resultKg) / batch.initialKg) * 100)
    : 0;

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   batch.batchNumber     → "#4"
  //   batch.type            → "Campuran Organik"
  //   batch.date            → "11 Nov 2026"
  //   batch.durationHours   → "36 jam"
  //   batch.initialKg       → 4.0 kg (bobot awal)
  //   batch.resultKg        → 1.2 kg (hasil kompos)
  //   shrinkPercent         → 70% susut
  //
  //   (opsional — jika API mendukung data historis per batch):
  //   batch.avgTemperature  → suhu rata-rata
  //   batch.avgHumidity     → kelembapan rata-rata
  //   batch.avgPowerWatt    → daya rata-rata
  //   batch.totalEnergyKwh  → total energi
  //   batch.totalCostRupiah → estimasi biaya listrik
  //   batch.notes           → catatan operator
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <ScrollView style={styles.container}>
      {/* TODO: Bangun UI di sini */}
      <Text>Batch #{batch.batchNumber}</Text>
      <Text>{batch.type}</Text>
      <Text>{batch.date} • {batch.durationHours} jam</Text>
      <Text>Awal: {batch.initialKg} kg</Text>
      <Text>Hasil: {batch.resultKg} kg</Text>
      <Text>Susut: {shrinkPercent}%</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  // TODO: tambah styles sesuai desain Anda
});

export default BatchDetailScreen;
