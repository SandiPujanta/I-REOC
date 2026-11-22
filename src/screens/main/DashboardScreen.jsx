
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES, COLORS, SIZES } from '../../constants';
import { phases } from '../../data/phases';
import { sensors } from '../../data/sensors';
import { batches } from '../../data/batches';
import { batchAktif } from '../../data/batches';
import { device } from '../../data/device';

import HeroCard from '../../component/dashboard/HeroCard';
import SensorRow from '../../component/dashboard/SensorRow';
import RecentBatchCard from '../../component/dashboard/RecentBatchCard';

const DashboardScreen = ({ navigation }) => {
  const [berjalan, setBerjalan] = useState(true);

  // Mencari kondisi mesin berdasarkan state
  const faseMesin = phases.find(
    (p) => p.id === (berjalan ? 'HEATING' : 'IDLE')
  );

  // Mengambil informasi sensor untuk Dashboard
  const sensorBeranda = sensors.filter(
    (sensor) => sensor.diBeranda
  );

  // Mengambil batch selesai terbaru
  const batchTerakhir = batches[0];

  // Mengambil informasi pengguna dan perangkat
  const user = device.pengguna;
  const deviceId = device.id;

  // Toggle Start / Stop mesin
  const handleMachineToggle = () => {
    setBerjalan((prev) => !prev);
  };

  // Navigasi Sensor
  const goToSensor = () => {
    navigation.navigate(ROUTES.SENSOR);
  };

  // Navigasi Riwayat
  const goToHistory = () => {
    navigation.navigate(ROUTES.HISTORY);
  };

  // Navigasi Detail Batch
  const goToBatchDetail = () => {
    if (!batchTerakhir) return;

    navigation.navigate(ROUTES.BATCH_DETAIL, {
      batchId: batchTerakhir.id,
    });
  };

  // Navigasi Notifikasi
  const goToNotification = () => {
    navigation.navigate(ROUTES.NOTIFICATION);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.brandContainer}>

            <View style={styles.logoContainer}>
              <Ionicons
                name="leaf"
                size={25}
                color={COLORS.secondary}
              />
            </View>

            <View style={styles.brandInfo}>
              <Text style={styles.deviceName}>
                I-REOC Dekomposer
              </Text>

              <Text style={styles.deviceId}>
                {deviceId}
              </Text>
            </View>

          </View>

          <Pressable
            style={styles.notificationButton}
            onPress={goToNotification}
            android_ripple={{ color: COLORS.outline }}
            accessibilityRole="button"
            accessibilityLabel="Buka notifikasi"
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={COLORS.primary}
            />
          </Pressable>

        </View>

        {/* INFORMASI PENGGUNA */}
        <View style={styles.greetingContainer}>

          <View style={styles.greetingInfo}>
            <Text style={styles.greetingLabel}>
              Selamat datang,
            </Text>

            <Text style={styles.userName}>
              {user.nama}
            </Text>
          </View>

          <View style={styles.simulationBadge}>
            <View style={styles.simulationDot} />

            <Text style={styles.simulationText}>
              Mode Simulasi
            </Text>
          </View>

        </View>

        {/* HERO CARD */}
        {faseMesin && (
          <HeroCard
            fase={faseMesin}
            berat={batchAktif.beratSekarang}
            berjalan={berjalan}
            onToggle={handleMachineToggle}
          />
        )}

        {/* INFORMASI SENSOR */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeader}>

            <View>
              <Text style={styles.sectionTitle}>
                Informasi Sensor
              </Text>

              <Text style={styles.sectionSubtitle}>
                Kondisi parameter perangkat
              </Text>
            </View>

            <Pressable
              onPress={goToSensor}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>
                Lihat Semua
              </Text>

              <Ionicons
                name="chevron-forward"
                size={15}
                color={COLORS.secondary}
              />
            </Pressable>

          </View>

          <View style={styles.sensorList}>
            {sensorBeranda.map((sensor) => (
              <SensorRow
                key={sensor.id}
                sensor={sensor}
                onPress={goToSensor}
              />
            ))}
          </View>

          {sensorBeranda.length === 0 && (
            <Text style={styles.emptyText}>
              Data sensor belum tersedia.
            </Text>
          )}

        </View>

        {/* RIWAYAT TERAKHIR */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeader}>

            <View>
              <Text style={styles.sectionTitle}>
                Riwayat Terakhir
              </Text>

              <Text style={styles.sectionSubtitle}>
                Hasil pengolahan sebelumnya
              </Text>
            </View>

            <Pressable
              onPress={goToHistory}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>
                Lihat Semua
              </Text>

              <Ionicons
                name="chevron-forward"
                size={15}
                color={COLORS.secondary}
              />
            </Pressable>

          </View>

          {batchTerakhir ? (
            <RecentBatchCard
              batch={batchTerakhir}
              onPress={goToBatchDetail}
            />
          ) : (
            <Text style={styles.emptyText}>
              Belum ada riwayat pengolahan.
            </Text>
          )}

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Ionicons
            name="hardware-chip-outline"
            size={15}
            color={COLORS.onSurfaceVariant}
          />

          <Text style={styles.footerText}>
            I-REOC Dekomposer • Mode Simulasi
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 4. STYLE DASHBOARD
// ==========================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  content: {
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.small,
    paddingBottom: SIZES.xxLarge,
    gap: SIZES.large,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
  },

  logoContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandInfo: {
    gap: 3,
  },

  deviceName: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.primary,
  },

  deviceId: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSurfaceVariant,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // GREETING
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.small,
  },

  greetingInfo: {
    gap: 3,
  },

  greetingLabel: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
  },

  userName: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
  },

  simulationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  simulationDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },

  simulationText: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSecondaryContainer,
    fontWeight: '600',
  },

  // SECTION
  sectionContainer: {
    gap: SIZES.small,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
  },

  sectionSubtitle: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
  },

  seeAllText: {
    color: COLORS.secondary,
    fontSize: SIZES.xSmall,
    fontWeight: '700',
  },

  sensorList: {
    gap: 0,
  },

  emptyText: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
    paddingVertical: SIZES.medium,
  },

  // FOOTER
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingTop: SIZES.small,
  },

  footerText: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSurfaceVariant,
  },

});

export default DashboardScreen;