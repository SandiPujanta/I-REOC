
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { hitungSusut } from '../../utils/calculations';

const RecentBatchCard = ({ batch, onPress }) => {
    // Pengamanan apabila data batch tidak tersedia
    if (!batch) {
        return null;
    }
    // Menghitung persentase penyusutan
    const susut = hitungSusut(
        batch.beratAwal,
        batch.beratAkhir
    );

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >

            {/* Header Batch */}
            <View style={styles.header}>

                <View style={styles.titleContainer}>
                    <Text style={styles.batchName}>
                        {batch.jenis}
                    </Text>

                    <Text style={styles.batchDate}>
                        {batch.tanggal} · Batch #{batch.id}
                    </Text>
                </View>

                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />

                    <Text style={styles.statusText}>
                        {batch.status}
                    </Text>
                </View>

            </View>

            {/* Informasi Berat */}
            <View style={styles.weightContainer}>

                <View style={styles.weightCard}>
                    <Text style={styles.weightLabel}>
                        Berat Awal
                    </Text>

                    <Text style={styles.weightValue}>
                        {Number(batch.beratAwal).toFixed(2)} kg
                    </Text>
                </View>

                <View style={styles.weightCard}>
                    <Text style={styles.weightLabel}>
                        Berat Akhir
                    </Text>

                    <Text style={styles.weightValue}>
                        {Number(batch.beratAkhir).toFixed(2)} kg
                    </Text>
                </View>

            </View>

            {/* Informasi Penyusutan dan Durasi */}
            <View style={styles.summaryContainer}>

                <View style={styles.shrinkContainer}>
                    <Ionicons
                        name="trending-down-outline"
                        size={17}
                        color={COLORS.secondary}
                    />

                    <Text style={styles.shrinkText}>
                        Penyusutan {susut.toFixed(1)}%
                    </Text>
                </View>

                <View style={styles.durationContainer}>
                    <Ionicons
                        name="time-outline"
                        size={16}
                        color={COLORS.onSurfaceVariant}
                    />

                    <Text style={styles.durationText}>
                        {batch.durasiJam} jam
                    </Text>
                </View>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Lihat Detail Batch
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={COLORS.secondary}
                />
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.outline,
        borderRadius: 16,
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
        gap: SIZES.medium,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },

    titleContainer: {
        flex: 1,
        gap: 5,
    },

    batchName: {
        fontSize: SIZES.medium,
        fontWeight: '700',
        color: COLORS.onSurface,
    },

    batchDate: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
    },

    statusBadge: {
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

    statusText: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSecondaryContainer,
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    weightContainer: {
        flexDirection: 'row',
        gap: SIZES.small,
    },

    weightCard: {
        flex: 1,
        backgroundColor: COLORS.surfaceVariant,
        padding: SIZES.medium,
        borderRadius: 12,
        gap: 7,
    },

    weightLabel: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSurfaceVariant,
    },

    weightValue: {
        fontSize: SIZES.large,
        fontWeight: '700',
        color: COLORS.onSurface,
    },

    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    shrinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    shrinkText: {
        color: COLORS.secondary,
        fontSize: SIZES.small,
        fontWeight: '700',
    },

    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    durationText: {
        fontSize: SIZES.small,
        color: COLORS.onSurfaceVariant,
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.outline,
        paddingTop: SIZES.medium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    footerText: {
        fontSize: SIZES.small,
        color: COLORS.secondary,
        fontWeight: '600',
    },
});

export default RecentBatchCard;
