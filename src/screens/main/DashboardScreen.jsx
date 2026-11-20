/**
 * DashboardScreen — Beranda (Tab 1)
 *
 * Konten dari HTML Dashboard.html:
 *   - Header: avatar + nama alat + tombol notifikasi
 *   - Status dekomposisi: fase aktif + nomor fase
 *   - Hero card: suhu reaktor + bobot sampah + tombol Start/Stop mesin
 *   - Daftar sensor ringkas: Kelembapan, Daya Pemanas, Bioaktivator EM4
 *   - Riwayat terakhir: 1 batch terakhir
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES, COLORS } from '../../constants';

// ─── Struktur data mesin (akan dari API/WebSocket nanti) ─────────────────────
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
  const user = { name: 'Pengguna Demo' };

  const [machine, setMachine] = useState(INITIAL_MACHINE_STATE);
  const [sensors, setSensors] = useState(INITIAL_SENSOR_SUMMARY);
  const [lastBatch, setLastBatch] = useState(INITIAL_LAST_BATCH);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingToggle, setIsLoadingToggle] = useState(false);

  // ── Ambil data dari API saat mount ──────────────────────────────────────────
  useEffect(() => {
    fetchDashboardData();
    // TODO: subscribe WebSocket/MQTT untuk data real-time sensor
    // return () => unsubscribeWebSocket();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: ganti dengan pemanggilan API nyata
      // const [machineRes, sensorRes, batchRes] = await Promise.all([
      //   api.get('/machine/status', token),
      //   api.get('/sensor/latest', token),
      //   api.get('/batch/latest', token),
      // ]);
      // setMachine(machineRes.data);
      // setSensors(sensorRes.data);
      // setLastBatch(batchRes.data);
    } catch (error) {
      console.error('fetchDashboardData error:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  }, []);

  // ── Toggle Start / Stop mesin ────────────────────────────────────────────────
  const handleMachineToggle = async () => {
    try {
      setIsLoadingToggle(true);
      const nextState = !machine.isRunning;

      // TODO: kirim perintah ke API/IoT
      // await api.post('/machine/control', { command: nextState ? 'start' : 'stop' }, token);

      // Update state lokal (sementara, nanti dari response API)
      setMachine((prev) => ({
        ...prev,
        isRunning: nextState,
        phaseName: nextState ? 'Pemanasan' : 'Siap (Idle)',
        phaseNumber: nextState ? 2 : 0,
      }));
      setSensors((prev) => ({
        ...prev,
        temperature: nextState ? 54 : 28,
      }));
    } catch (error) {
      console.error('handleMachineToggle error:', error);
    } finally {
      setIsLoadingToggle(false);
    }
  };

  // ── Navigasi ─────────────────────────────────────────────────────────────────
  const goToSensor = () => navigation.navigate(ROUTES.SENSOR);
  const goToHistory = () => navigation.navigate(ROUTES.HISTORY);
  const goToNotification = () => navigation.navigate(ROUTES.NOTIFICATION);

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   machine.isRunning        → state mesin (true/false)
  //   machine.phaseName        → nama fase ("Pemanasan", "Idle", dsb.)
  //   machine.phaseNumber      → "Fase 2 / 4"
  //   machine.deviceId         → "IREOC-V2-001"
  //   machine.mode             → badge "Mode Simulasi"
  //   sensors.temperature      → suhu reaktor (°C)
  //   sensors.tempStatus       → "Optimal"
  //   sensors.weight           → bobot sampah (kg)
  //   sensors.humidity         → kelembapan (%)
  //   sensors.power            → daya pemanas (Watt)
  //   sensors.em4Dose          → dosis EM4 (ml)
  //   lastBatch.type           → jenis sampah terakhir
  //   lastBatch.date           → tanggal batch
  //   lastBatch.duration       → durasi
  //   lastBatch.resultKg       → hasil kompos (kg)
  //   lastBatch.initialKg      → bobot awal (kg)
  //   handleMachineToggle()    → fungsi Start/Stop mesin
  //   isLoadingToggle          → loading state tombol toggle
  //   goToSensor()             → navigasi ke tab Sensor
  //   goToHistory()            → navigasi ke tab Riwayat
  //   goToNotification()       → navigasi ke Notifikasi
  //   user.name                → nama pengguna
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* TODO: Bangun UI di sini */}
      <Text>DashboardScreen — bangun UI Anda di sini</Text>
      <Text>machine.isRunning: {String(machine.isRunning)}</Text>
      <Text>sensors.temperature: {sensors.temperature}°C</Text>
      <TouchableOpacity onPress={handleMachineToggle}>
        <Text>{machine.isRunning ? 'Stop' : 'Mulai'}</Text>
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
