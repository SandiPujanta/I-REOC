
import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';

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

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sensorInfo: {
        flex: 1,
        minWidth: 0,
        gap: 5,
    },

    sensorName: {
        fontSize: 13,
        fontFamily: FONTS.headingBold,
        color: COLORS.primary,
    },

    sensorSubtitle: {
        fontSize: 10,
        fontFamily: FONTS.bodyRegular,
        color: COLORS.onSurfaceVariant,
    },

    valueContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 5,
        minWidth: 90,
    },

    sensorValue: {
        fontSize: 14,
        fontFamily: FONTS.headingBold,
        color: COLORS.primary,
        textAlign: 'right',
    },

    sensorDetail: {
        fontSize: 10,
        fontFamily: FONTS.bodyRegular,
        color: COLORS.secondary,
        textAlign: 'right',
    },

});

export default SensorItem;
