import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ROUTES, COLORS, FONTS } from '../../constants';
import { guideSections, SOP_VERSION } from '../../data/guide';

// accent opacity 20% (bg-accent/20) dan rose-50 dari referensi
const ACCENT_SOFT = COLORS.accent + '33';
const DANGER_SOFT = '#FFF1F2';

const GuideBookScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const keyword = query.trim().toLowerCase();

  // Saring item berdasarkan kata kunci; seksi kosong disembunyikan
  const sections = useMemo(() => {
    if (!keyword) return guideSections;

    return guideSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.judul.toLowerCase().includes(keyword) ||
            item.keterangan.toLowerCase().includes(keyword)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [keyword]);

  const goToDashboard = () => {
    navigation.navigate(ROUTES.DASHBOARD);
  };

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
            <Text style={styles.screenTitle}>Buku Panduan</Text>
            <Text style={styles.screenSubtitle}>Petunjuk Ringkas Penggunaan</Text>
          </View>
        </View>

        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>{SOP_VERSION}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.onSurfaceVariant} />

          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Cari petunjuk bahan..."
            placeholderTextColor={COLORS.onSurfaceVariant + '99'}
            returnKeyType="search"
            autoCorrect={false}
            accessibilityLabel="Cari petunjuk bahan"
          />

          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery('')}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={COLORS.onSurfaceVariant}
              />
            </Pressable>
          )}
        </View>

        {/* SEKSI PANDUAN */}
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.judul}</Text>

            <View style={styles.card}>
              {section.items.map((item, index) => (
                <View
                  key={item.id}
                  style={[styles.row, index > 0 && styles.rowDivider]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: section.diizinkan
                          ? ACCENT_SOFT
                          : DANGER_SOFT,
                      },
                    ]}
                  >
                    <Ionicons
                      name={section.diizinkan ? 'checkmark' : 'close'}
                      size={18}
                      color={section.diizinkan ? COLORS.primary : COLORS.danger}
                    />
                  </View>

                  <View style={styles.rowInfo}>
                    <Text style={styles.itemTitle}>{item.judul}</Text>
                    <Text style={styles.itemDescription}>{item.keterangan}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* HASIL KOSONG */}
        {sections.length === 0 && (
          <Text style={styles.emptyText}>
            Tidak ada petunjuk yang cocok dengan “{query.trim()}”.
          </Text>
        )}
      </ScrollView>
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

  versionBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  versionText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSecondary,
  },

  // KONTEN
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 20,
  },

  // SEARCH BAR
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurface,
  },

  // SEKSI
  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  card: {
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 26,
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  rowDivider: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
  },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowInfo: {
    flex: 1,
    minWidth: 0,
  },

  itemTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.onSurface,
  },

  itemDescription: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  emptyText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
    paddingVertical: 16,
  },
});

export default GuideBookScreen;