
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES, COLORS } from '../../constants';
import { phases } from '../../data/phases';
import { sensors as sensorData } from '../../data/sensors';
import { batches } from '../../data/batches';
import { batchAktif } from '../../data/batches';
import { device } from '../../data/device';

import HeroCard from '../../component/dashboard/HeroCard.jsx';

const INITIAL_MACHINE_STATE = {
  isRunning: true,
  phaseName: 'Pemanasan',    // nama fase saat ini
  phaseNumber: 2,            // nomor fase (dari 4)
  totalPhases: 4,
  deviceId: 'IREOC-V2-001',
  deviceName: 'I-REOC Dekomposer',
  mode: 'Mode Simulasi',
};

const INITIAL_SENSOR_SUMMARY = {
  temperature: 54,     // °C — DS18B20
  humidity: 58,        // % — DHT22
  power: 180,          // Watt — PZEM-004T
  weight: 2.45,        // kg saat ini — HX711
  em4Dose: 45,         // ml — dosis bioaktivator
  tempStatus: 'Optimal',
};

const INITIAL_LAST_BATCH = {
  id: 1,
  type: 'Sayur & Buah',
  date: '3 Nov 2026',
  duration: '30 jam',
  resultKg: 0.9,
  initialKg: 3.2,
};

// ─── Component ────────────────────────────────────────────────────────────────

const DashboardScreen = ({ navigation }) => {

  // State simulasi mesin
  const [berjalan, setBerjalan] = useState(true);

  // Mencari fase mesin berdasarkan status berjalan
  const faseMesin = phases.find(
    (p) => p.id === (berjalan ? 'HEATING' : 'IDLE')
  );

  // Mengambil sensor yang ditampilkan di Dashboard
  const sensorBeranda = sensorData.filter(
    (sensor) => sensor.diBeranda
  );

  // Mengambil batch selesai terbaru
  const batchTerakhir = batches[0];

  // Mengambil informasi pengguna
  const user = device.pengguna;

  // Fungsi Start / Stop
  const handleMachineToggle = () => {
    setBerjalan((prev) => !prev);
  };

  // Fungsi navigasi
  const goToSensor = () => {
    navigation.navigate(ROUTES.SENSOR);
  };

  const goToHistory = () => {
    navigation.navigate(ROUTES.HISTORY);
  };

  const goToNotification = () => {
    navigation.navigate(ROUTES.NOTIFICATION);
  };

  return (
    <ScrollView style={styles.container}>

      <Text>Dashboard I-REOC</Text>

      <Text>Pengguna: {user.nama}</Text>

      <Text>Perangkat: {device.id}</Text>

      <HeroCard
        fase={faseMesin}
        berat={batchAktif.beratSekarang}
        berjalan={berjalan}
        onToggle={handleMachineToggle}
      />

      <Text>Informasi Sensor</Text>

      {sensorBeranda.map((sensor) => (
        <View key={sensor.id}>
          <Text>
            {sensor.nama}: {sensor.nilai} {sensor.satuan}
          </Text>
        </View>
      ))}

      <TouchableOpacity onPress={goToSensor}>
        <Text>Buka Sensor</Text>
      </TouchableOpacity>

      <Text>Riwayat Terakhir</Text>

      <Text>{batchTerakhir.jenis}</Text>

      <Text>{batchTerakhir.tanggal}</Text>

      <TouchableOpacity onPress={goToHistory}>
        <Text>Buka Riwayat</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToNotification}>
        <Text>Buka Notifikasi</Text>
      </TouchableOpacity>

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

export default DashboardScreen;
