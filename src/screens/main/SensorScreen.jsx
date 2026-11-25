
import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { ROUTES, COLORS, SIZES, FONTS } from '../../constants';

// Data Layer
import { sensors } from '../../data/sensors';
import { batches, batchAktif } from '../../data/batches';
import { phases } from '../../data/phases';

// Utilities
import { hitungBiayaListrik } from '../../utils/calculations';
import { formatRupiah } from '../../utils/formatters';

// Components
import EfficiencyCard from '../../component/sensor/EfficiencyCard.jsx';
import SensorItem from '../../component/sensor/SensorItem.jsx';

const SensorScreen = ({ navigation }) => {

  // ==========================================
  // 1. MENGAMBIL DATA SENSOR
  // ==========================================

  const suhu = sensors.find(
    (item) => item.id === 'temperature'
  );

  const kelembapan = sensors.find(
    (item) => item.id === 'humidity'
  );

  const daya = sensors.find(
    (item) => item.id === 'power'
  );

  const massa = sensors.find(
    (item) => item.id === 'weight'
  );

  const gas = sensors.find(
    (item) => item.id === 'methane'
  );

  // Mengambil batch terakhir yang sudah selesai
  const batchTerakhir = batches[0];

  // Mengambil energi dari batch aktif
  const energi = batchAktif?.energiKwh ?? 0;

  // Menghitung estimasi biaya listrik
  const biayaListrik = hitungBiayaListrik(energi);

  // Mengambil fase mesin untuk keterangan suhu
  const fasePanas = phases.find(
    (item) => item.id === 'HEATING'
  );

  // ==========================================
  // 2. MENYIAPKAN DATA PARAMETER SENSOR
  // ==========================================

  const parameterSensor = [
    {
      id: 'temperature',
      icon: 'thermometer-outline',
      iconColor: '#F59E0B',
      title: 'Suhu Reaktor',
      subtitle: 'Sensor DS18B20',
      value: suhu ? `${suhu.nilai}°C` : '—',
      detail: fasePanas?.nama || 'Simulasi',
    },
    {
      id: 'humidity',
      icon: 'water-outline',
      iconColor: '#0EA5E9',
      title: 'Kelembapan Relatif',
      subtitle: 'Sensor DHT22',
      value: kelembapan
        ? `${kelembapan.nilai}%`
        : '—',
      detail: 'Kondisi Ideal',
    },
    {
      id: 'power',
      icon: 'flash-outline',
      iconColor: COLORS.secondary,
      title: 'Biaya Listrik',
      subtitle: `Total ${energi} kWh`,
      value: formatRupiah(biayaListrik),
      detail: daya
        ? `${daya.nilai} Watt rata-rata`
        : 'Data daya belum tersedia',
    },
    {
      id: 'weight',
      icon: 'scale-outline',
      iconColor: '#64748B',
      title: 'Massa Sampah',
      subtitle: 'Load Cell HX711',
      value: massa
        ? `${Number(massa.nilai).toFixed(2)} kg`
        : '—',
      detail: batchAktif
        ? `Awal: ${Number(batchAktif.beratAwal).toFixed(2)} kg`
        : 'Data tidak tersedia',
    },
    {
      id: 'methane',
      icon: 'analytics-outline',
      iconColor: COLORS.secondary,
      title: 'Indikator Gas Metana',
      subtitle: 'Sensor MQ-4',
      value: gas
        ? `${gas.nilai} ppm`
        : '—',
      detail: 'Indikator tren simulasi',
    },
  ];

  // ==========================================
  // 3. NAVIGASI
  // ==========================================

  const goToDashboard = () => {
    navigation.navigate(ROUTES.DASHBOARD);
  };

  // ==========================================
  // 4. HEADER LIST
  // ==========================================

  const renderHeader = () => (
    <View style={styles.headerContent}>

      {/* HEADER SENSOR */}
      <View style={styles.header}>

        <View style={styles.headerLeft}>

          <Pressable
            onPress={goToDashboard}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={COLORS.primary}
            />
          </Pressable>

          <View style={styles.headerInfo}>
            <Text style={styles.screenTitle}>
              Sensor & Energi
            </Text>

            <Text style={styles.screenSubtitle}>
              Telemetri & Efisiensi Alat
            </Text>
          </View>

        </View>

        <View style={styles.simulationBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.simulationText}>
            Simulasi
          </Text>
        </View>

      </View>

      {/* EFFICIENCY CARD */}
      <EfficiencyCard batch={batchTerakhir} />

      {/* PARAMETER SENSOR HEADER */}
      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Parameter Sensor
        </Text>

        <Text style={styles.sectionSubtitle}>
          Data simulasi
        </Text>

      </View>

    </View>
  );

  // ==========================================
  // 5. RENDER SENSOR SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >

      <FlatList
        data={parameterSensor}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <SensorItem
            icon={item.icon}
            iconColor={item.iconColor}
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            detail={item.detail}
          />
        )}

        ListHeaderComponent={renderHeader}

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}

        ListFooterComponent={
          <Text style={styles.footerText}>
            Seluruh pembacaan merupakan data simulasi
            dan belum terhubung dengan perangkat fisik.
          </Text>
        }

        contentContainerStyle={styles.listContent}

        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

// ==========================================
// 6. STYLE SENSOR SCREEN
// ==========================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
  },

  listContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 28,
  },

  headerContent: {
    gap: 20,
    marginBottom: 16,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  backButton: {
    width: 36,
    height: 36,
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
    fontSize: 17,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  screenSubtitle: {
    fontSize: 11,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  simulationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },

  simulationText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontFamily: FONTS.headingBold,
  },

  // PARAMETER SECTION
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.headingBold,
    color: COLORS.primary,
  },

  sectionSubtitle: {
    fontSize: 10,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
  },

  separator: {
    height: 10,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: FONTS.bodyRegular,
    color: COLORS.onSurfaceVariant,
    marginTop: 18,
    lineHeight: 16,
  },

});

export default SensorScreen;
