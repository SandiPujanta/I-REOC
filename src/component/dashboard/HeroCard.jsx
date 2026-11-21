import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';

// Komponen HeroCard
const HeroCard = ({
    fase,
    berat,
    berjalan,
    onToggle,
}) => {
    const suhu = fase?.suhuSimulasi ?? 0;
    const namaFase = fase?.nama ?? 'Tidak diketahui';
    const nomorFase = fase?.fase ?? 0;

    return (
        <View style={styles.card}>

            {/* Header Status Mesin */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.labelStatus}>
                        STATUS DEKOMPOSISI
                    </Text>

                    <Text style={styles.namaFase}>
                        {namaFase}
                    </Text>

                    <Text style={styles.fase}>
                        Fase {nomorFase} / 3
                    </Text>
                </View>

                <View style={[
                    styles.statusBadge,
                    !berjalan && styles.statusIdle,
                ]}>
                    <View style={[
                        styles.statusDot,
                        !berjalan && styles.statusDotIdle,
                    ]} />

                    <Text style={styles.statusText}>
                        {berjalan ? 'Berjalan' : 'Siaga'}
                    </Text>
                </View>
            </View>

            {/* Informasi Suhu dan Berat */}
            <View style={styles.infoContainer}>

                <View style={styles.infoCard}>
                    <Ionicons
                        name="thermometer-outline"
                        size={22}
                        color={COLORS.secondary}
                    />

                    <Text style={styles.infoLabel}>
                        Suhu Reaktor
                    </Text>

                    <Text style={styles.infoValue}>
                        {suhu}°C
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Ionicons
                        name="scale-outline"
                        size={22}
                        color={COLORS.secondary}
                    />

                    <Text style={styles.infoLabel}>
                        Bobot Sampah
                    </Text>

                    <Text style={styles.infoValue}>
                        {Number(berat ?? 0).toFixed(2)} kg
                    </Text>
                </View>

            </View>

            {/* Tombol Start / Stop */}
            <TouchableOpacity
                style={styles.button}
                onPress={onToggle}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={berjalan ? 'stop-circle-outline' : 'play-circle-outline'}
                    size={20}
                    color={COLORS.secondary}
                />

                <Text style={styles.buttonText}>
                    {berjalan ? 'Stop Mesin' : 'Mulai Mesin'}
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: SIZES.large,
        gap: SIZES.large,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    labelStatus: {
        fontSize: SIZES.small,
        fontWeight: '600',
        color: COLORS.secondaryContainer,
        marginBottom: 6,
    },

    namaFase: {
        fontSize: SIZES.xLarge,
        fontWeight: '700',
        color: COLORS.onSecondary,
    },

    fase: {
        fontSize: SIZES.small,
        color: COLORS.secondaryContainer,
        marginTop: 4,
    },

    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.secondaryContainer,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
    },

    statusIdle: {
        backgroundColor: COLORS.outlineVariant,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: COLORS.success,
    },

    statusDotIdle: {
        backgroundColor: COLORS.gray,
    },

    statusText: {
        fontSize: SIZES.xSmall,
        fontWeight: '600',
        color: COLORS.onSecondaryContainer,
    },

    infoContainer: {
        flexDirection: 'row',
        gap: SIZES.small,
    },

    infoCard: {
        flex: 1,
        backgroundColor: COLORS.secondaryContainer,
        borderRadius: 14,
        padding: SIZES.medium,
        gap: 7,
    },

    infoLabel: {
        fontSize: SIZES.xSmall,
        color: COLORS.onSecondaryContainer,
    },

    infoValue: {
        fontSize: SIZES.xLarge,
        fontWeight: '700',
        color: COLORS.onSecondaryContainer,
    },

    button: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.medium,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },

    buttonText: {
        fontSize: SIZES.medium,
        fontWeight: '700',
        color: COLORS.secondary,
    },
});

export default HeroCard;
