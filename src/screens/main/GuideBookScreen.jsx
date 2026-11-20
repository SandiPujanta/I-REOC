/**
 * GuideBookScreen — Buku Panduan & Perawatan (Tab 4)
 *
 * Konten dari HTML GuideBook.html:
 *   - Header: judul + badge "SOP v2"
 *   - Search bar: cari petunjuk bahan
 *   - Seksi "Boleh Dimasukkan": daftar bahan organik yang aman
 *   - Seksi "Dilarang Dimasukkan": bahan yang merusak mesin
 *   (data statis — tidak butuh API)
 */
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

// ─── Data panduan (statis, bisa juga dari API CMS nanti) ─────────────────────
const ALLOWED_ITEMS = [
  {
    id: 'a1',
    title: 'Sisa Sayur & Buah',
    description: 'Kulit buah, sayuran layu, ampas tahu',
    allowed: true,
  },
  {
    id: 'a2',
    title: 'Nasi & Sisa Makanan',
    description: 'Nasi, sisa roti, ampas kopi kering',
    allowed: true,
  },
  {
    id: 'a3',
    title: 'Canang & Banten Organik',
    description: 'Bunga & janur (tanpa staples)',
    allowed: true,
  },
];

const FORBIDDEN_ITEMS = [
  {
    id: 'f1',
    title: 'Plastik, Kaca & Logam',
    description: 'Menyumbat bilah pengaduk mekanis',
    allowed: false,
  },
  {
    id: 'f2',
    title: 'Tulang Besar & Minyak Pekat',
    description: 'Merusak motor & mematikan mikroba',
    allowed: false,
  },
];

// SectionList format
const GUIDE_SECTIONS = [
  { title: 'Boleh Dimasukkan', data: ALLOWED_ITEMS },
  { title: 'Dilarang Dimasukkan', data: FORBIDDEN_ITEMS },
];

// ─── Component ────────────────────────────────────────────────────────────────
const GuideBookScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter berdasarkan search query
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return GUIDE_SECTIONS;

    return GUIDE_SECTIONS
      .map((section) => ({
        ...section,
        data: section.data.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [searchQuery]);

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   searchQuery / setSearchQuery      → state search bar
  //   filteredSections (array SectionList):
  //     section.title                  → "Boleh Dimasukkan" / "Dilarang Dimasukkan"
  //     section.data (array item):
  //       item.id                      → key
  //       item.title                   → nama bahan
  //       item.description             → keterangan
  //       item.allowed                 → true = ✓ hijau, false = ✗ merah
  // ─────────────────────────────────────────────────────────────────────────────

  const renderItem = ({ item }) => (
    // TODO: ganti dengan UI card sesuai desain
    <View style={styles.item}>
      <Text style={{ color: item.allowed ? COLORS.success : COLORS.danger }}>
        {item.allowed ? '✓' : '✗'} {item.title}
      </Text>
      <Text>{item.description}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    // TODO: ganti dengan UI header seksi
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      {/* TODO: ganti dengan UI search bar sesuai desain */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari petunjuk bahan..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: COLORS.surfaceVariant,
  },
  list: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginTop: 16,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  // TODO: tambah styles sesuai desain Anda
});

export default GuideBookScreen;
