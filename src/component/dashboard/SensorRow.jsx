
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';

const SensorRow = ({ sensor, onPress }) => {

    // Menentukan warna status sensor
    const warnaStatus =
        sensor.status === 'bahaya'
            ? COLORS.danger
            : sensor.status === 'peringatan'
                ? COLORS.warning
                : COLORS.success;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >

            {/* Icon Sensor */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name={sensor.ikon || 'pulse-outline'}
                    size={22}
                    color={COLORS.secondary}
                />
            </View>

            {/* Informasi Sensor */}
            <View style={styles.sensorInfo}>
                <Text style={styles.sensorName}>
                    {sensor.nama}
                </Text>

                <Text style={styles.sensorDevice}>
                    {sensor.perangkat}
                </Text>
            </View>

            {/* Nilai dan Status */}
            <View style={styles.valueContainer}>
                <Text style={styles.sensorValue}>
                    {sensor.nilai} {sensor.satuan}
                </Text>

                <View style={styles.statusContainer}>
                    <View
                        style={[
                            styles.statusDot,
                            { backgroundColor: warnaStatus },
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            { color: warnaStatus },
                        ]}
                    >
                        {sensor.status}
                    </Text>
                </View>
            </View>

            {/* Icon Navigasi */}
            <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.gray}
            />

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.outline,
        borderRadius: 14,
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        gap: SIZES.small,
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.secondaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sensorInfo: {
        flex: 1,
        gap: 4,
    },

    sensorName: {
        fontSize: SIZES.small,
        fontFamily: FONTS.headingBold,
        color: COLORS.onSurface,
    },

    sensorDevice: {
        fontSize: SIZES.xSmall,
        fontFamily: FONTS.bodyRegular,
        color: COLORS.onSurfaceVariant,
    },

    valueContainer: {
        alignItems: 'flex-end',
        gap: 5,
    },

    sensorValue: {
        fontSize: SIZES.small,
        fontFamily: FONTS.headingBold,
        color: COLORS.onSurface,
    },

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 5,
    },

    statusText: {
        fontSize: SIZES.xSmall,
        fontFamily: FONTS.bodySemiBold,
        textTransform: 'capitalize',
    },
});

export default SensorRow;
