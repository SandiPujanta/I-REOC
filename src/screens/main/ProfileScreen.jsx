
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { ROUTES, COLORS, SIZES } from '../../constants';

// Data perangkat
import { device } from '../../data/device';

const ProfileScreen = ({ navigation }) => {

  // ==========================================
  // 1. DATA PROFIL
  // ==========================================

  const user = device.pengguna;

  const specifications = device.spesifikasi;

  // Mengambil inisial pengguna
  const getInitials = (name = '') => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };

  // ==========================================
  // 2. STATE KALIBRASI
  // ==========================================

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // ==========================================
  // 3. ICON SPESIFIKASI
  // ==========================================

  const getSpecIcon = (id) => {
    switch (id) {
      case 'model':
        return 'hardware-chip-outline';

      case 'firmware':
        return 'code-slash-outline';

      case 'kapasitas':
        return 'scale-outline';

      case 'jaringan':
        return 'wifi-outline';

      default:
        return 'information-circle-outline';
    }
  };

  // ==========================================
  // 4. NAVIGASI SETTINGS
  // ==========================================

  const goToSettings = () => {
    navigation.navigate(ROUTES.SETTINGS);
  };

  // ==========================================
  // 5. SIMULASI KALIBRASI
  // ==========================================

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationSuccess(false);

    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationSuccess(true);

      setTimeout(() => {
        setCalibrationSuccess(false);
      }, 3000);
    }, 1500);
  };

  // ==========================================
  // 6. RENDER PROFILE
  // ==========================================

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

          <View>
            <Text style={styles.screenTitle}>
              Profil
            </Text>

            <Text style={styles.screenSubtitle}>
              Informasi pengguna dan perangkat
            </Text>
          </View>

          <Pressable
            style={styles.settingsButton}
            onPress={goToSettings}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={COLORS.primary}
            />
          </Pressable>

        </View>

        {/* USER PROFILE CARD */}
        <View style={styles.profileCard}>

          <View style={styles.profileInfo}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(user.nama)}
              </Text>
            </View>

            <View style={styles.userInfo}>

              <Text style={styles.userName}>
                {user.nama}
              </Text>

              <Text style={styles.userEmail}>
                {user.email}
              </Text>

              <Text style={styles.deviceId}>
                {device.id}
              </Text>

            </View>

          </View>

          {/* STATUS PERANGKAT */}
          <View style={styles.connectionStatus}>

            <View style={styles.offlineDot} />

            <Text style={styles.connectionText}>
              Mode Simulasi · Offline
            </Text>

          </View>

        </View>

        {/* SPESIFIKASI PERANGKAT */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Spesifikasi Perangkat
            </Text>
          </View>

          <View style={styles.specCard}>

            {specifications.map((item, index) => (

              <View key={item.id}>

                <View style={styles.specRow}>

                  <View style={styles.specIcon}>
                    <Ionicons
                      name={getSpecIcon(item.id)}
                      size={19}
                      color={COLORS.secondary}
                    />
                  </View>

                  <View style={styles.specInfo}>
                    <Text style={styles.specLabel}>
                      {item.label}
                    </Text>

                    <Text style={styles.specValue}>
                      {item.nilai}
                    </Text>
                  </View>

                </View>

                {index !== specifications.length - 1 && (
                  <View style={styles.specDivider} />
                )}

              </View>

            ))}

          </View>

        </View>

        {/* TENTANG I-REOC */}
        <View style={styles.sectionContainer}>

          <Text style={styles.sectionTitle}>
            Tentang I-REOC
          </Text>

          <View style={styles.aboutCard}>

            <View style={styles.aboutHeader}>

              <View style={styles.aboutIcon}>
                <Ionicons
                  name="leaf-outline"
                  size={22}
                  color={COLORS.secondary}
                />
              </View>

              <Text style={styles.aboutTitle}>
                I-REOC Dekomposer
              </Text>

            </View>

            <Text style={styles.aboutDescription}>
              {device.tentang}
            </Text>

          </View>

        </View>

        {/* KALIBRASI SENSOR */}
        <View style={styles.sectionContainer}>

          <Text style={styles.sectionTitle}>
            Pemeliharaan Perangkat
          </Text>

          <View style={styles.calibrationCard}>

            <View style={styles.calibrationInfo}>

              <View style={styles.calibrationIcon}>
                <Ionicons
                  name="options-outline"
                  size={21}
                  color={COLORS.secondary}
                />
              </View>

              <View style={styles.calibrationTextContainer}>
                <Text style={styles.calibrationTitle}>
                  Kalibrasi Sensor
                </Text>

                <Text style={styles.calibrationSubtitle}>
                  Simulasi pemeliharaan perangkat
                </Text>
              </View>

            </View>

            <Pressable
              style={[
                styles.calibrateButton,
                isCalibrating && styles.disabledButton,
              ]}
              onPress={handleCalibrate}
              disabled={isCalibrating}
            >

              <Ionicons
                name={calibrationSuccess ? 'checkmark-circle-outline' : 'refresh-outline'}
                size={19}
                color={COLORS.white}
              />

              <Text style={styles.calibrateButtonText}>
                {isCalibrating
                  ? 'Memproses Kalibrasi...'
                  : calibrationSuccess
                    ? 'Kalibrasi Selesai'
                    : 'Kalibrasi Ulang Sensor'}
              </Text>

            </Pressable>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

// ==========================================
// 7. STYLING PROFILE
// ==========================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
    gap: SIZES.large,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  screenTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.primary,
  },

  screenSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // PROFILE CARD
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.outline,
    padding: SIZES.medium,
    gap: SIZES.medium,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.medium,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: COLORS.secondaryContainer,
    borderWidth: 2,
    borderColor: '#C5E5D3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.secondary,
  },

  userInfo: {
    flex: 1,
    gap: 4,
  },

  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },

  userEmail: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
  },

  deviceId: {
    fontSize: SIZES.xSmall,
    color: COLORS.gray,
  },

  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFF7ED',
    padding: 10,
    borderRadius: 10,
  },

  offlineDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.warning,
  },

  connectionText: {
    fontSize: SIZES.xSmall,
    fontWeight: '600',
    color: '#9A3412',
  },

  // SECTION
  sectionContainer: {
    gap: SIZES.small,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.primary,
  },

  // SPECIFICATIONS
  specCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    paddingHorizontal: SIZES.medium,
  },

  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.medium,
    paddingVertical: 13,
  },

  specIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: COLORS.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },

  specInfo: {
    flex: 1,
    gap: 4,
  },

  specLabel: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSurfaceVariant,
  },

  specValue: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.primary,
  },

  specDivider: {
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },

  // ABOUT
  aboutCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    padding: SIZES.medium,
    gap: SIZES.medium,
  },

  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
  },

  aboutIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },

  aboutTitle: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.primary,
  },

  aboutDescription: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
    lineHeight: 21,
  },

  // CALIBRATION
  calibrationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.outline,
    padding: SIZES.medium,
    gap: SIZES.medium,
  },

  calibrationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
  },

  calibrationIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calibrationTextContainer: {
    flex: 1,
    gap: 4,
  },

  calibrationTitle: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.primary,
  },

  calibrationSubtitle: {
    fontSize: SIZES.xSmall,
    color: COLORS.onSurfaceVariant,
  },

  calibrateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: SIZES.medium,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
  },

  disabledButton: {
    opacity: 0.6,
  },

  calibrateButtonText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.white,
  },

});

export default ProfileScreen;
