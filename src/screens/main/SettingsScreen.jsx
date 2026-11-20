// SettingsScreen — pengaturan aplikasi
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  // TODO: Tambah setting lain

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Notifikasi</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Aktifkan Notifikasi</Text>
        <Switch
          value={notifEnabled}
          onValueChange={setNotifEnabled}
          trackColor={{ true: '#1565C0' }}
        />
      </View>

      {/* TODO: Tambah pengaturan lain (bahasa, tema, dll.) */}

      <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Versi</Text>
        <Text style={styles.rowValue}>1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#1565C0', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  rowLabel: { fontSize: 15, color: '#212121' },
  rowValue: { fontSize: 14, color: '#757575' },
});

export default SettingsScreen;
