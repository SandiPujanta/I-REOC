
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';

const HeroCard = ({
    fase,
    berat,
    berjalan,
}) => {

    const suhu = fase?.suhuSimulasi ?? null;
    const namaFase = fase?.nama ?? 'Menunggu proses';
    const nomorFase = fase?.fase ?? 0;

    const progress = fase?.progress !== undefined
        ? fase.progress
        : Math.min(Math.max((nomorFase / 3) * 100, 0), 100);

    const keteranganFase = fase?.keterangan || (
        nomorFase > 0 ? `Tahap ${nomorFase} dari 3` : 'Menunggu proses'
    );

    return (
        <View style={styles.hero}>

            {/* STATE MACHINE HEADER */}
            <View style={styles.header}>
                <Text style={styles.heroLabel}>
                    STATE MACHINE
                </Text>

                <View style={[
                    styles.statusBadge,
                    !berjalan && styles.statusBadgeIdle,
                ]}>
                    <View style={[
                        styles.statusDot,
                        !berjalan && styles.statusDotIdle,
                    ]} />

                    <Text style={[
                        styles.statusText,
                        !berjalan && styles.statusTextIdle,
                    ]}>
                        {fase?.id === 'DONE' ? 'SELESAI' : (berjalan ? 'BERJALAN' : 'SIAGA')}
                    </Text>
                </View>
            </View>

            {/* CURRENT PHASE */}
            <View style={styles.phaseContainer}>
                <Text style={styles.phaseName}>
                    {namaFase}
                </Text>

                <Text style={styles.phaseNumber}>
                    {keteranganFase}
                </Text>
            </View>

            {/* PHASE PROGRESS */}
            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress}%` },
                    ]}
                />
            </View>

            {/* TEMPERATURE */}
            <View style={styles.temperatureContainer}>
                <Text style={styles.temperatureLabel}>
                    Suhu Reaktor
                </Text>

                <Text style={styles.temperatureValue}>
                    {suhu !== null ? suhu : '—'}
                    <Text style={styles.temperatureUnit}>
                        °C
                    </Text>
                </Text>
            </View>

            <Text style={styles.sensorInfo}>
                Data simulasi · Sensor DS18B20
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

    hero: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 20,
        marginTop: 12,
        gap: 14,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    heroLabel: {
        color: '#9CA3AF',
        fontSize: 13,
        fontFamily: FONTS.bodySemiBold,
        letterSpacing: 0.8,
    },

    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    statusBadgeIdle: {
        backgroundColor: '#E5E7EB',
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: COLORS.success,
    },

    statusDotIdle: {
        backgroundColor: COLORS.gray,
    },

    statusText: {
        color: COLORS.secondary,
        fontSize: 10,
        fontFamily: FONTS.headingBold,
    },

    statusTextIdle: {
        color: COLORS.gray,
    },

    phaseContainer: {
        gap: 3,
    },

    phaseName: {
        color: COLORS.onPrimary,
        fontSize: 25,
        fontFamily: FONTS.headingBold,
    },

    phaseNumber: {
        color: '#9CA3AF',
        fontSize: 12,
        fontFamily: FONTS.bodyRegular,
    },

    progressBackground: {
        height: 5,
        backgroundColor: '#374151',
        borderRadius: 10,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
        borderRadius: 10,
    },

    temperatureContainer: {
        gap: 1,
    },

    temperatureLabel: {
        color: '#9CA3AF',
        fontSize: 13,
        fontFamily: FONTS.bodySemiBold,
    },

    temperatureValue: {
        color: COLORS.onPrimary,
        fontSize: 56,
        fontFamily: FONTS.headingBold,
        marginTop: 2,
        fontVariant: ['tabular-nums'],
    },

    temperatureUnit: {
        color: COLORS.accent,
        fontSize: 25,
        fontFamily: FONTS.headingSemiBold,
    },

    sensorInfo: {
        color: '#6B7280',
        fontSize: 11,
        fontFamily: FONTS.bodyRegular,
    },

});

export default HeroCard;
