// ChangePasswordScreen — form ubah password
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';

const ChangePasswordScreen = ({ navigation }) => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      Alert.alert('Error', 'Password baru tidak cocok');
      return;
    }
    try {
      setIsLoading(true);
      // TODO: panggil API PUT /auth/change-password
      Alert.alert('Sukses', 'Password berhasil diubah', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Gagal', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ubah Password</Text>

      <Text style={styles.label}>Password Lama</Text>
      <TextInput style={styles.input} value={form.oldPassword} onChangeText={(v) => handleChange('oldPassword', v)} secureTextEntry placeholder="Password saat ini" />

      <Text style={styles.label}>Password Baru</Text>
      <TextInput style={styles.input} value={form.newPassword} onChangeText={(v) => handleChange('newPassword', v)} secureTextEntry placeholder="Password baru" />

      <Text style={styles.label}>Konfirmasi Password Baru</Text>
      <TextInput style={styles.input} value={form.confirmPassword} onChangeText={(v) => handleChange('confirmPassword', v)} secureTextEntry placeholder="Ulangi password baru" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Simpan</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1565C0', marginBottom: 24 },
  label: { fontSize: 13, color: '#757575', marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 15 },
  button: { backgroundColor: '#1565C0', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ChangePasswordScreen;
