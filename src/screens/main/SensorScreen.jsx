
import React from 'react';
import { View, Text, ScrollView, StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { batchAktif } from '../../data/batches';
import EfficiencyCard from '../../component/sensor/EfficiencyCard.jsx';

const SensorScreen = () => {

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
            <Text style={styles.title}>
              Sensor & Energi
            </Text>

            <Text style={styles.subtitle}>
              Monitoring parameter I-REOC
            </Text>
          </View>

          <View style={styles.simulationBadge}>
            <View style={styles.statusDot} />

            <Text style={styles.simulationText}>
              Simulasi
            </Text>
          </View>
        </View>

        {/* EFISIENSI PENGOLAHAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Efisiensi Batch Aktif
          </Text>

          <EfficiencyCard batchAktif={batchAktif} />
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.primary,
  },

  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
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

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },

  simulationText: {
    fontSize: SIZES.xSmall,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  section: {
    gap: SIZES.small,
  },

  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.onSurface,
  },

});

export default SensorScreen;
