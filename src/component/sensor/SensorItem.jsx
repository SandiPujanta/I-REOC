
import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';

const SensorItem = ({
    icon,
    title,
    subtitle,
    value,
    detail,
    iconColor = COLORS.secondary,
}) => {

    return (
        <View style={styles.container}>

            {/* ICON SENSOR */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name={icon || 'pulse-outline'}
                    size={21}
                    color={iconColor}
                />
            </View>

            {/* INFORMASI SENSOR */}
            <View style={styles.sensorInfo}>

                <Text style={styles.sensorName}>
                    {title}
                </Text>

                <Text style={styles.sensorSubtitle}>
                    {subtitle}
                </Text>

            </View>

            {/* NILAI SENSOR */}
            <View style={styles.valueContainer}>

                <Text style={styles.sensorValue}>
                    {value ?? '—'}
                </Text>

                {detail ? (
                    <Text style={styles.sensorDetail}>
                        {detail}
                    </Text>
                ) : null}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.outline,
        borderRadius: 18,
        padding: 14,
        gap: 12,
        minHeight: 76,
    },

    // Icon
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Informasi sensor
    sensorInfo: {
        flex: 1,
        gap: 5,
    },

    sensorName: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
    },

    sensorSubtitle: {
        fontSize: 10,
        color: COLORS.onSurfaceVariant,
    },

    // Nilai sensor
    valueContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 5,
        minWidth: 85,
    },

    sensorValue: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.primary,
    },

    sensorDetail: {
        fontSize: 10,
        color: COLORS.secondary,
        fontWeight: '500',
        textAlign: 'right',
    },

});

export default SensorItem;
