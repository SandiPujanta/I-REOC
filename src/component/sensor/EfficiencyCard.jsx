
import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { hitungSusut } from '../../utils/calculations';
import MiniBarChart from './MiniBarChart.jsx';

const EfficiencyCard = ({ batch }) => {

    if (!batch) {
        return null;
    }

    // Perhitungan dari data batch selesai
    const hasilOlahan = Number(batch.beratAkhir);

    const penyusutan = hitungSusut(
        batch.beratAwal,
        batch.beratAkhir
    );

    const tren = batch.trenSimulasi || [];

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>

                <View style={styles.titleContainer}>
                    <Ionicons
                        name="trending-up"
                        size={17}
                        color={COLORS.accent}
                    />

                    <Text style={styles.title}>
                        Efisiensi Dekomposisi
                    </Text>
                </View>

                <Text style={styles.batchLabel}>
                    Batch terakhir
                </Text>

            </View>

            {/* RESULT */}
            <View style={styles.resultContainer}>

                <View style={styles.resultInfo}>

                    <Text style={styles.resultLabel}>
                        Hasil Olahan
                    </Text>

                    <View style={styles.valueRow}>

                        <Text style={styles.resultValue}>
                            {Number.isFinite(hasilOlahan)
                                ? hasilOlahan.toFixed(2)
                                : '—'}
                            <Text style={styles.resultUnit}>
                                {' '}kg
                            </Text>
                        </Text>

                        <View style={styles.shrinkageBadge}>
                            <Text style={styles.shrinkageText}>
                                +{Math.round(penyusutan)}% susut
                            </Text>
                        </View>

                    </View>

                </View>

                {/* MINI GRAPH */}
                <MiniBarChart data={tren} />

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 18,
        gap: 14,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },

    title: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.white,
    },

    batchLabel: {
        fontSize: 11,
        color: '#9CA3AF',
    },

    resultContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 5,
    },

    resultInfo: {
        flex: 1,
        gap: 3,
    },

    resultLabel: {
        fontSize: 11,
        color: '#9CA3AF',
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 7,
    },

    resultValue: {
        fontSize: 29,
        fontWeight: '800',
        color: COLORS.white,
        fontVariant: ['tabular-nums'],
    },

    resultUnit: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.accent,
    },

    shrinkageBadge: {
        backgroundColor: '#D1FAE5',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    shrinkageText: {
        color: COLORS.secondary,
        fontSize: 10,
        fontWeight: '700',
    },

});

export default EfficiencyCard;
