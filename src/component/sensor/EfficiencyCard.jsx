
import React from 'react';

import { View, Text, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { hitungSusut } from '../../utils/calculations';
import MiniBarChart from './MiniBarChart.jsx';

const EfficiencyCard = ({ batchAktif }) => {
    // Validasi data batch
    if (!batchAktif) {
        return null;
    }

    // Mengambil berat awal dan berat saat ini
    const beratAwal = batchAktif.beratAwal;
    const beratSekarang = batchAktif.beratSekarang;

    // Menghitung persentase penyusutan
    const penyusutan = hitungSusut(
        beratAwal,
        beratSekarang
    );

    // Membatasi progress bar 0-100%
    const progress = Math.min(
        Math.max(penyusutan, 0),
        100
    );

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>

                <View style={styles.titleContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="analytics-outline"
                            size={22}
                            color={COLORS.secondary}
                        />
                    </View>

                    <View>
                        <Text style={styles.title}>
                            Efisiensi Pengolahan
                        </Text>

                        <Text style={styles.subtitle}>
                            {batchAktif.jenis}
                        </Text>
                    </View>
                </View>

                <View style={styles.badge}>
                    <View style={styles.statusDot} />

                    <Text style={styles.badgeText}>
                        Batch Aktif
                    </Text>
                </View>

            </View>

            {/* Informasi berat */}
            <View style={styles.weightContainer}>

                <View style={styles.weightBox}>
                    <Text style={styles.weightLabel}>
                        Berat Awal
                    </Text>

                    <Text style={styles.weightValue}>
                        {Number(beratAwal).toFixed(2)}
                        <Text style={styles.unit}> kg</Text>
                    </Text>
                </View>

                <View style={styles.weightBox}>
                    <Text style={styles.weightLabel}>
                        Berat Sekarang
                    </Text>

                    <Text style={styles.weightValue}>
                        {Number(beratSekarang).toFixed(2)}
                        <Text style={styles.unit}> kg</Text>
                    </Text>
                </View>

            </View>

            {/* Penyusutan */}
            <View style={styles.shrinkHeader}>
                <View>
                    <Text style={styles.shrinkLabel}>
                        Penyusutan Sementara
                    </Text>

                    <Text style={styles.shrinkValue}>
                        {penyusutan.toFixed(1)}%
                    </Text>
                </View>

                <View style={styles.shrinkIcon}>
                    <Ionicons
                        name="trending-down-outline"
                        size={22}
                        color={COLORS.secondary}
                    />
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress}%` },
                    ]}
                />
            </View>

            <Text style={styles.footerText}>
                Perhitungan berdasarkan perubahan massa batch aktif.
            </Text>

            {/* Grafik Tren Berat */}
            <View style={styles.chartSection}>
                <Text style={styles.chartTitle}>
                    Tren Berat Sampah
                </Text>

                <MiniBarChart
                    data={batchAktif.riwayatBerat}
                />

                <Text style={styles.chartCaption}>
                    Perkembangan berat selama proses simulasi
                </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.outline,
        borderRadius: 18,
        padding: SIZES.medium,
        gap: SIZES.medium,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.secondaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: SIZES.small,
        fontWeight: '700',
        color: COLORS.onSurface,
    },

    subtitle: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
        marginTop: 4,
    },

    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: COLORS.secondaryContainer,
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        backgroundColor: COLORS.success,
    },

    badgeText: {
        fontSize: SIZES.xSmall,
        color: COLORS.secondary,
        fontWeight: '600',
    },

    weightContainer: {
        flexDirection: 'row',
        gap: SIZES.small,
    },

    weightBox: {
        flex: 1,
        backgroundColor: COLORS.surfaceVariant,
        padding: SIZES.medium,
        borderRadius: 12,
        gap: 8,
    },

    weightLabel: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
    },

    weightValue: {
        fontSize: SIZES.xLarge,
        fontWeight: '700',
        color: COLORS.primary,
    },

    unit: {
        fontSize: SIZES.small,
        fontWeight: '500',
        color: COLORS.onSurfaceVariant,
    },

    shrinkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    shrinkLabel: {
        fontSize: SIZES.small,
        color: COLORS.onSurfaceVariant,
    },

    shrinkValue: {
        fontSize: SIZES.xLarge,
        fontWeight: '800',
        color: COLORS.secondary,
        marginTop: 3,
    },

    shrinkIcon: {
        width: 42,
        height: 42,
        backgroundColor: COLORS.secondaryContainer,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    progressBackground: {
        height: 9,
        backgroundColor: COLORS.outlineVariant,
        borderRadius: 10,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
    },

    footerText: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
    },

    chartSection: {
        marginTop: SIZES.small,
        paddingTop: SIZES.medium,
        borderTopWidth: 1,
        borderTopColor: COLORS.outlineVariant,
        gap: 8,
    },

    chartTitle: {
        fontSize: SIZES.small,
        fontWeight: '700',
        color: COLORS.onSurface,
    },

    chartCaption: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
    },
});

export default EfficiencyCard;
