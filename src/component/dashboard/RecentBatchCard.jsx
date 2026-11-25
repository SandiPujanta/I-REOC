
import React from 'react';
import { View, Text, Pressable, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants';

const RecentBatchCard = ({ batch, onPress }) => {

    if (!batch) {
        return null;
    }

    // Format berat menjadi satu angka desimal
    const formatBerat = (value) => {
        const berat = Number(value);

        return Number.isFinite(berat)
            ? `${berat.toFixed(1)} kg`
            : '—';
    };

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
            android_ripple={{ color: COLORS.outline }}
            accessibilityRole="button"
            accessibilityLabel={`Detail batch ${batch.jenis}`}
        >

            {/* ICON STATUS */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name="checkmark"
                    size={17}
                    color={COLORS.secondary}
                />
            </View>

            {/* INFORMASI BATCH */}
            <View style={styles.batchInfo}>

                <Text
                    style={styles.batchName}
                    numberOfLines={1}
                >
                    {batch.jenis}
                </Text>

                <Text
                    style={styles.batchDate}
                    numberOfLines={1}
                >
                    {batch.tanggal} · {batch.durasiJam} jam
                </Text>

            </View>

            {/* HASIL OLAHAN */}
            <View style={styles.resultContainer}>

                <Text style={styles.resultValue}>
                    {formatBerat(batch.beratAkhir)}
                </Text>

                <Text style={styles.initialWeight}>
                    Dari {formatBerat(batch.beratAwal)}
                </Text>

            </View>

        </Pressable>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.outline,
        borderRadius: 20,
        paddingVertical: 13,
        paddingHorizontal: 14,
        gap: 12,
        overflow: 'hidden',
    },

    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.outline,
        justifyContent: 'center',
        alignItems: 'center',
    },

    batchInfo: {
        flex: 1,
        gap: 4,
        minWidth: 0,
    },

    batchName: {
        fontSize: 13,
        fontFamily: FONTS.headingBold,
        color: COLORS.primary,
    },

    batchDate: {
        fontSize: 10,
        fontFamily: FONTS.bodyRegular,
        color: COLORS.onSurfaceVariant,
    },

    resultContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 4,
    },

    resultValue: {
        fontSize: 14,
        fontFamily: FONTS.headingBold,
        color: COLORS.primary,
    },

    initialWeight: {
        fontSize: 10,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.secondary,
    },

});

export default RecentBatchCard;
