
import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ROUTES, COLORS, FONTS } from '../../constants';
import { batches } from '../../data/batches';
import { hitungSusut } from '../../utils/calculations';

// accent dengan opacity 20% (setara bg-accent/20 di referensi)
const ACCENT_SOFT = COLORS.accent + '33';

// Format berat dengan 1 desimal, sama seperti kartu riwayat di Beranda
const formatBerat = (value, digits = 1) => {
  if (value == null) return '—';

  const berat = Number(value);

  return Number.isFinite(berat) ? `${berat.toFixed(digits)} kg` : '—';
};

const HistoryScreen = ({ navigation }) => {
  // Ringkasan seluruh batch selesai
  const totalAwal = batches.reduce(
    (sum, batch) => sum + (Number(batch.beratAwal) || 0),
    0
  );
  const totalAkhir = batches.reduce(
    (sum, batch) => sum + (Number(batch.beratAkhir) || 0),
    0
  );
  const susutTotal = hitungSusut(totalAwal, totalAkhir);

  const goToDashboard = () => {
    navigation.navigate(ROUTES.DASHBOARD);
  };

  const goToDetail = (batch) => {
    navigation.navigate(ROUTES.BATCH_DETAIL, { batchId: batch.id });
  };

  const renderBatch = ({ item, index }) => {
    const terbaru = index === 0;

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => goToDetail(item)}
        android_ripple={{ color: COLORS.outline }}
        accessibilityRole="button"
        accessibilityLabel={`Detail batch ${item.id}, ${item.jenis}`}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.avatar, terbaru && styles.avatarLatest]}>
            <Text style={styles.avatarText}>#{item.id}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.batchName} numberOfLines={1}>
              {item.jenis}
            </Text>

            <Text style={styles.batchMeta} numberOfLines={1}>
              {item.tanggal} • {item.durasiJam} jam
            </Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={styles.resultValue}>{formatBerat(item.beratAkhir)}</Text>

          <Text style={styles.initialWeight}>
            Awal {formatBerat(item.beratAwal)}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => (
    <View style={styles.listHeader}>
      {/* HERO: TOTAL TEROLAH */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Total Sampah Diproses</Text>

        <View style={styles.heroRow}>
          <Text style={styles.heroValue} numberOfLines={1}>
            {formatBerat(totalAwal, 2)}
          </Text>

          <View style={styles.susutBadge}>
            <Text style={styles.susutText}>
              {susutTotal.toFixed(1)}% Susut
            </Text>
          </View>
        </View>
      </View>

      {/* JUDUL DAFTAR */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Daftar Batch</Text>
        <Text style={styles.sectionNote}>Terbaru</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={goToDashboard}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke beranda"
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.onSurface} />
          </Pressable>

          <View style={styles.headerInfo}>
            <Text style={styles.screenTitle}>Riwayat Pengolahan</Text>
            <Text style={styles.screenSubtitle}>Catatan Sampah & Kompos</Text>
          </View>
        </View>

        <Text style={styles.countText}>{batches.length} Batch</Text>
      </View>

      <FlatList
        data={batches}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderBatch}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada riwayat pengolahan.</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerInfo: {
    flex: 1,
  },

  screenTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  screenSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  countText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.onSurfaceVariant,
  },

  // LIST
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  listHeader: {
    gap: 24,
    marginBottom: 12,
  },

  separator: {
    height: 10,
  },

  // HERO
  hero: {
    gap: 4,
  },

  heroLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyMedium,
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
    fontFamily: FONTS.headingBold,
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
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSecondary,
  },

  // SECTION
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  sectionNote: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  // KARTU BATCH
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 26,
    padding: 16,
    overflow: 'hidden',
  },

  cardPressed: {
    opacity: 0.85,
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarLatest: {
    backgroundColor: ACCENT_SOFT,
    borderColor: 'transparent',
  },

  avatarText: {
    fontSize: 16,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  batchName: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  batchMeta: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  cardRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },

  resultValue: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingBold,
    color: COLORS.onSurface,
  },

  initialWeight: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.secondary,
  },

  emptyText: {
    fontSize: 12,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
    paddingVertical: 16,
  },
});

export default HistoryScreen;