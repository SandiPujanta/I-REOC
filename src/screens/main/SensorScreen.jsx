/**
 * SensorScreen — Sensor & Efisiensi Energi (Tab 2)
 *
 * Konten dari HTML SensorTelemetry.html:
 *   - Header: judul + status badge "Normal"
 *   - Blok efisiensi: hasil kompos jadi (kg) + % susut + mini bar chart
 *   - Daftar sensor lengkap:
 *       1. Suhu Reaktor (DS18B20) — °C + status fase
 *       2. Kelembapan Relatif (DHT22) — % + status
 *       3. Biaya Listrik (PZEM-004T) — Rp + kWh total + rata-rata Watt
 *       4. Massa Sampah (HX711) — kg saat ini + kg awal
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

// ─── Struktur data sensor ─────────────────────────────────────────────────────
const INITIAL_SENSOR_DATA = {
  // Efisiensi batch aktif
  efficiency: {
    resultKg: 1.15,         // hasil kompos jadi
    shrinkagePercent: 70,   // % susut massa
    batchStatus: 'Batch aktif',
  },

  // Parameter sensor real-time
  temperature: {
    value: 54.2,            // °C
    unit: '°C',
    sensorModel: 'DS18B20',
    phaseLabel: 'Fase Panas',
    status: 'normal',       // 'normal' | 'warning' | 'danger'
  },
  humidity: {
    value: 59,              // %
    unit: '%',
    sensorModel: 'DHT22',
    statusLabel: 'Kondisi Ideal',
    status: 'normal',
  },
  electricity: {
    powerWatt: 180,          // Watt rata-rata
    energyKwh: 5.8,          // kWh total batch
    costRupiah: 8350,        // Rp estimasi biaya
    sensorModel: 'PZEM-004T',
    status: 'normal',
  },
  weight: {
    currentKg: 2.45,         // kg saat ini
    initialKg: 3.80,         // kg awal batch
    unit: 'kg',
    sensorModel: 'HX711',
    status: 'normal',
  },

  // Status keseluruhan
  overallStatus: 'Normal',   // "Normal" | "Peringatan" | "Kritis"
};

// ─── Component ────────────────────────────────────────────────────────────────
const SensorScreen = ({ navigation }) => {
  const [sensorData, setSensorData] = useState(INITIAL_SENSOR_DATA);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSensorData();
    // TODO: subscribe polling tiap X detik atau WebSocket
    // const interval = setInterval(fetchSensorData, 5000);
    // return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
    try {
      // TODO: panggil API GET /sensor/latest
      // const res = await api.get('/sensor/latest', token);
      // setSensorData(res.data);
    } catch (error) {
      console.error('fetchSensorData error:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSensorData();
    setRefreshing(false);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   sensorData.efficiency.resultKg          → "1.15 kg" hasil kompos
  //   sensorData.efficiency.shrinkagePercent  → "+70% susut" badge
  //   sensorData.efficiency.batchStatus       → "Batch aktif"
  //
  //   sensorData.temperature.value            → 54.2°C
  //   sensorData.temperature.sensorModel      → "Sensor DS18B20"
  //   sensorData.temperature.phaseLabel       → "Fase Panas"
  //   sensorData.temperature.status           → warna indicator
  //
  //   sensorData.humidity.value               → 59%
  //   sensorData.humidity.statusLabel         → "Kondisi Ideal"
  //
  //   sensorData.electricity.powerWatt        → 180 Watt
  //   sensorData.electricity.energyKwh        → "Total 5.8 kWh"
  //   sensorData.electricity.costRupiah       → "Rp 8.350"
  //
  //   sensorData.weight.currentKg             → 2.45 kg
  //   sensorData.weight.initialKg             → "Awal: 3.80 kg"
  //
  //   sensorData.overallStatus                → badge header "Normal"
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* TODO: Bangun UI di sini */}
      <Text>SensorScreen — bangun UI Anda di sini</Text>
      <Text>Suhu: {sensorData.temperature.value}°C</Text>
      <Text>Kelembapan: {sensorData.humidity.value}%</Text>
      <Text>Daya: {sensorData.electricity.powerWatt} Watt</Text>
      <Text>Massa: {sensorData.weight.currentKg} kg</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  // TODO: tambah styles sesuai desain Anda
});

export default SensorScreen;
