/**
 * ProfileScreen — Profil Pengguna & Alat (Tab 5)
 *
 * Konten dari HTML Profile.html:
 *   - Header: judul + tombol Settings
 *   - Profil user: avatar inisial + nama + device ID + status terhubung
 *   - Spesifikasi alat: model, firmware, kapasitas, jaringan
 *   - Tentang I-REOC: deskripsi singkat
 *   - Tombol aksi: Kalibrasi Ulang Sensor
 *   - (tambahan) Menu: Ubah Password, Logout
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { ROUTES, COLORS } from '../../constants';

// ─── Spesifikasi alat (statis, bisa dari API device-info nanti) ───────────────
const DEVICE_SPECS = {
  model: 'I-REOC Dekomposer v2',
  firmware: 'v2.4.0-IoT',
  capacity: '5.0 Liter / Batch',
  network: 'Wi-Fi Lab (2.4 GHz)',
  deviceId: 'IREOC-V2-001',
};

const ABOUT_TEXT =
  'Reaktor pengolah sampah organik rumah tangga cerdas berbasis IoT dengan kontrol suhu 3 fase terintegrasi serta dosis bioaktivator EM4 otomatis.';

// ─── Component ────────────────────────────────────────────────────────────────
const ProfileScreen = ({ navigation }) => {
  const user = { name: 'Pengguna Demo', email: 'demo@ireoc.id' };
  const [isCalibratingLoading, setIsCalibratingLoading] = useState(false);

  // ── Ambil inisial dari nama user ─────────────────────────────────────────────
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join('');
  };

  // ── Kalibrasi ulang sensor ───────────────────────────────────────────────────
  const handleCalibrate = async () => {
    Alert.alert(
      'Kalibrasi Sensor',
      'Pastikan tabung kosong sebelum kalibrasi. Lanjutkan?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Kalibrasi',
          onPress: async () => {
            try {
              setIsCalibratingLoading(true);
              // TODO: panggil API POST /machine/calibrate
              // await api.post('/machine/calibrate', {}, token);
              Alert.alert('Sukses', 'Sensor berhasil dikalibrasi');
            } catch (error) {
              Alert.alert('Gagal', error.message);
            } finally {
              setIsCalibratingLoading(false);
            }
          },
        },
      ]
    );
  };

  // ── Info Sesi ─────────────────────────────────────────────────────────────
  const handleResetSession = () => {
    Alert.alert('Info', 'Aplikasi berjalan dalam mode demonstrasi tanpa autentikasi.');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO: Bangun UI di sini menggunakan data:
  //   user.name / getInitials(user.name)   → avatar inisial + nama
  //   user.email                           → email pengguna
  //   DEVICE_SPECS.model                  → "I-REOC Dekomposer v2"
  //   DEVICE_SPECS.firmware               → "v2.4.0-IoT"
  //   DEVICE_SPECS.capacity               → "5.0 Liter / Batch"
  //   DEVICE_SPECS.network                → "Wi-Fi Lab (2.4 GHz)"
  //   DEVICE_SPECS.deviceId               → "IREOC-V2-001"
  //   ABOUT_TEXT                          → deskripsi I-REOC
  //   handleCalibrate()                   → tombol "Kalibrasi Ulang Sensor"
  //   isCalibratingLoading                → loading state tombol kalibrasi
  //   navigation.navigate(ROUTES.CHANGE_PASSWORD) → ubah password
  //   navigation.navigate(ROUTES.SETTINGS)        → pengaturan
  //   handleLogout()                      → tombol logout
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <ScrollView style={styles.container}>
      {/* TODO: Bangun UI di sini */}

      {/* Avatar + user info */}
      <Text>Inisial: {getInitials(user?.name)}</Text>
      <Text>Nama: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>

      {/* Device specs */}
      <Text>Model: {DEVICE_SPECS.model}</Text>
      <Text>Firmware: {DEVICE_SPECS.firmware}</Text>
      <Text>Kapasitas: {DEVICE_SPECS.capacity}</Text>
      <Text>Jaringan: {DEVICE_SPECS.network}</Text>

      {/* Tentang */}
      <Text>{ABOUT_TEXT}</Text>

      {/* Tombol kalibrasi */}
      <TouchableOpacity onPress={handleCalibrate} disabled={isCalibratingLoading}>
        <Text>{isCalibratingLoading ? 'Mengkalibrasi...' : 'Kalibrasi Ulang Sensor'}</Text>
      </TouchableOpacity>

      {/* Menu navigasi */}
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
        <Text>Pengaturan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)}>
        <Text>Ubah Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  // TODO: tambah styles sesuai desain Anda
});

export default ProfileScreen;
