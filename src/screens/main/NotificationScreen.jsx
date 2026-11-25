
import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';
import { notifications } from '../../data/notification';

const NotificationScreen = ({ navigation }) => {

  // ==========================================
  // 1. STATE NOTIFIKASI
  // ==========================================

  const [dataNotifikasi, setDataNotifikasi] = useState(
    notifications.map((item) => ({ ...item }))
  );

  const [filterAktif, setFilterAktif] = useState('semua');

  // Menghitung notifikasi yang belum dibaca
  const jumlahBelumDibaca = dataNotifikasi.filter(
    (item) => !item.dibaca
  ).length;

  // Filter notifikasi
  const hasilFilter = dataNotifikasi.filter((item) => {
    if (filterAktif === 'belum') {
      return !item.dibaca;
    }

    return true;
  });

  // ==========================================
  // 2. FUNGSI NOTIFIKASI
  // ==========================================

  // Menandai satu notifikasi sebagai dibaca
  const handleRead = (id) => {
    setDataNotifikasi((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, dibaca: true }
          : item
      )
    );
  };

  // Menandai semua notifikasi sebagai dibaca
  const handleReadAll = () => {
    setDataNotifikasi((prev) =>
      prev.map((item) => ({
        ...item,
        dibaca: true,
      }))
    );
  };

  // ==========================================
  // 3. TEMA ICON NOTIFIKASI
  // ==========================================

  const getNotificationTheme = (kategori) => {
    switch (kategori) {
      case 'Sensor':
        return {
          color: '#F59E0B',
          background: '#FEF3C7',
        };

      case 'Mesin':
        return {
          color: COLORS.secondary,
          background: COLORS.secondaryContainer,
        };

      case 'Aktuator':
        return {
          color: COLORS.info,
          background: '#E0F2FE',
        };

      case 'Batch':
        return {
          color: COLORS.success,
          background: '#D1FAE5',
        };

      default:
        return {
          color: COLORS.gray,
          background: COLORS.surfaceVariant,
        };
    }
  };

  // ==========================================
  // 4. RENDER NOTIFICATION ITEM
  // ==========================================

  const renderNotification = ({ item }) => {
    const theme = getNotificationTheme(item.kategori);

    return (
      <Pressable
        style={[
          styles.notificationCard,
          !item.dibaca && styles.unreadCard,
        ]}
        onPress={() => handleRead(item.id)}
        android_ripple={{ color: COLORS.outline }}
        accessibilityRole="button"
        accessibilityLabel={`${item.judul}, ${item.dibaca ? 'sudah dibaca' : 'belum dibaca'}`}
      >

        {/* ICON */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <Ionicons
            name={item.ikon}
            size={21}
            color={theme.color}
          />
        </View>

        {/* INFORMASI */}
        <View style={styles.notificationInfo}>

          <View style={styles.titleRow}>
            <Text
              style={[
                styles.notificationTitle,
                !item.dibaca && styles.unreadTitle,
              ]}
              numberOfLines={1}
            >
              {item.judul}
            </Text>
          </View>

          <Text style={styles.notificationMessage}>
            {item.pesan}
          </Text>

          <View style={styles.metaRow}>

            <Text style={styles.categoryText}>
              {item.kategori}
            </Text>

            <Text style={styles.separatorText}>
              ·
            </Text>

            <Text style={styles.timeText}>
              {item.waktu}
            </Text>

          </View>

        </View>

        {/* STATUS */}
        {!item.dibaca && (
          <Ionicons
            name="ellipse"
            size={8}
            color={COLORS.success}
          />
        )}

      </Pressable>
    );
  };

  // ==========================================
  // 5. HEADER FLATLIST
  // ==========================================

  const renderHeader = () => (
    <View style={styles.headerContent}>

      {/* HEADER */}
      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={21}
            color={COLORS.primary}
          />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.screenTitle}>
            Notifikasi
          </Text>

          <Text style={styles.screenSubtitle}>
            Aktivitas dan informasi I-REOC
          </Text>
        </View>

        <Ionicons
          name="notifications-outline"
          size={23}
          color={COLORS.secondary}
        />

      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>

        <Text style={styles.summaryLabel}>
          BELUM DIBACA
        </Text>

        <Text style={styles.summaryValue}>
          {jumlahBelumDibaca} Notifikasi
        </Text>

        <Text style={styles.summaryDescription}>
          Informasi aktivitas perangkat dalam mode simulasi.
        </Text>

      </View>

      {/* SECTION TITLE */}
      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Notifikasi Terbaru
        </Text>

        <Pressable
          onPress={handleReadAll}
          disabled={jumlahBelumDibaca === 0}
        >
          <Text
            style={[
              styles.readAllText,
              jumlahBelumDibaca === 0 && styles.disabledText,
            ]}
          >
            Tandai semua dibaca
          </Text>
        </Pressable>

      </View>

      {/* FILTER */}
      <View style={styles.filterContainer}>

        <Pressable
          onPress={() => setFilterAktif('semua')}
          style={[
            styles.filterButton,
            filterAktif === 'semua' && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterAktif === 'semua' && styles.activeFilterText,
            ]}
          >
            Semua ({dataNotifikasi.length})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFilterAktif('belum')}
          style={[
            styles.filterButton,
            filterAktif === 'belum' && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterAktif === 'belum' && styles.activeFilterText,
            ]}
          >
            Belum Dibaca ({jumlahBelumDibaca})
          </Text>
        </Pressable>

      </View>

    </View>
  );

  // ==========================================
  // 6. EMPTY STATE
  // ==========================================

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>

      <View style={styles.emptyIcon}>
        <Ionicons
          name="notifications-off-outline"
          size={35}
          color={COLORS.gray}
        />
      </View>

      <Text style={styles.emptyTitle}>
        Tidak Ada Notifikasi
      </Text>

      <Text style={styles.emptyDescription}>
        Belum ada notifikasi yang perlu ditampilkan.
      </Text>

    </View>
  );

  // ==========================================
  // 7. MAIN SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >

      <FlatList
        data={hasilFilter}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}

        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}

        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

// ==========================================
// 8. STYLES
// ==========================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
  },

  listContent: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
    flexGrow: 1,
  },

  headerContent: {
    gap: SIZES.large,
    marginBottom: SIZES.large,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerInfo: {
    flex: 1,
    gap: 3,
  },

  screenTitle: {
    fontSize: 19,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  screenSubtitle: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  // SUMMARY
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 18,
    gap: 6,
  },

  summaryLabel: {
    fontSize: 10,
    fontFamily: FONTS.bodyBold,
    letterSpacing: 1,
    color: '#D1D5DB',
  },

  summaryValue: {
    fontSize: 25,
    fontFamily: FONTS.headingBold,
    color: COLORS.white,
  },

  summaryDescription: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: '#D1D5DB',
  },

  // SECTION
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  readAllText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontFamily: FONTS.headingBold,
  },

  disabledText: {
    color: COLORS.gray,
  },

  // FILTER
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
  },

  activeFilter: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  filterText: {
    fontSize: 10,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.onSurfaceVariant,
  },

  activeFilterText: {
    color: COLORS.white,
  },

  // NOTIFICATION CARD
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: 16,
    padding: 13,
    gap: 11,
  },

  unreadCard: {
    borderColor: '#C5E5D3',
    backgroundColor: '#FFFFFF',
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationInfo: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  notificationTitle: {
    flex: 1,
    fontSize: 12,
    fontFamily: FONTS.headingSemiBold,
    color: COLORS.primary,
  },

  unreadTitle: {
    fontFamily: FONTS.headingBold,
  },

  notificationMessage: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  categoryText: {
    fontSize: 9,
    color: COLORS.secondary,
    fontFamily: FONTS.bodyBold,
  },

  separatorText: {
    color: COLORS.gray,
    fontSize: 9,
    fontFamily: FONTS.bodyRegular,
  },

  timeText: {
    fontSize: 9,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },

  separator: {
    height: 10,
  },

  // EMPTY STATE
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 55,
    gap: 10,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 15,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  emptyDescription: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },

});

export default NotificationScreen;
