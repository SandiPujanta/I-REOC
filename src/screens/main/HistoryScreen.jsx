/**
 * HistoryScreen — Riwayat Pengolahan (Tab 3)
 *
 * Konten dari HTML History.html:
 *   - Header: judul + jumlah batch total
 *   - Hero summary: total sampah terolah (kg) + % susut keseluruhan
 *   - FlatList daftar batch:
 *       setiap batch punya: nomor, jenis sampah, tanggal, durasi, hasil kg, awal kg
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { ROUTES, COLORS } from '../../constants';

// ─── Struktur data riwayat ────────────────────────────────────────────────────
const INITIAL_SUMMARY = {
  totalProcessedKg: 11.50,   // total sampah terolah semua batch
  totalShrinkPercent: 70.4,  // rata-rata % susut
  totalBatches: 4,
};

// Setiap item batch
// { id, batchNumber, type, date, durationHours, resultKg, initialKg }
const INITIAL_BATCHES = [
  {
    id: 4,
    batchNumber: 4,
    type: 'Campuran Organik',
    date: '11 Nov 2026',
    durationHours: 36,
    resultKg: 1.2,
    initialKg: 4.0,
  },
  {
    id: 3,
    batchNumber: 3,
    type: 'Canang & Banten',
    date: '8 Nov 2026',
    durationHours: 22,
    resultKg: 0.5,
    initialKg: 1.8,
  },
  {
    id: 2,
    batchNumber: 2,
    type: 'Sisa Makanan Dapur',
    date: '5 Nov 2026',
    durationHours: 28,
    resultKg: 0.8,
    initialKg: 2.5,
  },
  {
    id: 1,
    batchNumber: 1,
    type: 'Sayur & Buah',
    date: '3 Nov 2026',
    durationHours: 30,
    resultKg: 0.9,
    initialKg: 3.2,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const HistoryScreen = ({ navigation }) => {
  const [summary, setSummary] = useState(INITIAL_SUMMARY);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // TODO: panggil API GET /batch/history
      // const res = await api.get('/batch/history', token);
      // setSummary(res.data.summary);
      // setBatches(res.data.batches);
    } catch (error) {
      console.error('fetchHistory error:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHistory();
    setRefreshing(false);
  }, []);

  const handleBatchPress = (batch) => {
    navigation.navigate(ROUTES.BATCH_DETAIL, { batchId: batch.id });
  };

  // Helper: hitung % susut per batch
  const getShrinkPercent = (initial, result) => {
    if (!initial || initial === 0) return 0;
    return Math.round(((initial - result) / initial) * 100);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   summary.totalProcessedKg      → "11.50 kg" (hero headline)
  //   summary.totalShrinkPercent    → "70.4% Susut" (badge)
  //   summary.totalBatches          → "4 Batch" (header badge)
  //
  //   batches (array) → render sebagai FlatList:
  //     item.batchNumber            → "#4" (avatar/badge)
  //     item.type                   → "Campuran Organik"
  //     item.date                   → "11 Nov 2026"
  //     item.durationHours          → "36 jam"
  //     item.resultKg               → "1.2 kg" (hasil)
  //     item.initialKg              → "Awal 4.0 kg"
  //     getShrinkPercent(item.initialKg, item.resultKg) → % susut
  //
  //   handleBatchPress(item)        → navigasi ke detail batch
  // ─────────────────────────────────────────────────────────────────────────────

  const renderBatch = ({ item }) => (
    // TODO: ganti dengan UI card sesuai desain
    <TouchableOpacity onPress={() => handleBatchPress(item)} style={styles.batchRow}>
      <Text>#{item.batchNumber} — {item.type}</Text>
      <Text>{item.date} • {item.durationHours} jam</Text>
      <Text>Hasil: {item.resultKg} kg (dari {item.initialKg} kg)</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={batches}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderBatch}
      ListHeaderComponent={
        // TODO: ganti dengan UI hero summary
        <View>
          <Text>Total Terolah: {summary.totalProcessedKg} kg</Text>
          <Text>Susut: {summary.totalShrinkPercent}%</Text>
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  list: {
    padding: 16,
  },
  batchRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline,
  },
  // TODO: tambah styles sesuai desain Anda
});

export default HistoryScreen;
