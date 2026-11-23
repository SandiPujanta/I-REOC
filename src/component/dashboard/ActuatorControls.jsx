
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';

// Kondisi awal seluruh aktuator
export const INITIAL_ACTUATORS = {
    dinamo: false,
    pemanas: false,
    kipas: false,
    filter: false,
};

// Daftar aktuator
const ACTUATOR_ITEMS = [
    {
        key: 'dinamo',
        label: 'Dinamo',
        icon: 'sync-outline',
    },
    {
        key: 'pemanas',
        label: 'Pemanas',
        icon: 'flame-outline',
    },
    {
        key: 'kipas',
        label: 'Kipas',
        icon: 'leaf-outline',
    },
    {
        key: 'filter',
        label: 'Filter',
        icon: 'filter-outline',
    },
];

const ActuatorControls = ({
    actuators: controlledActuators,
    setActuators: controlledSetActuators,
}) => {

    // Gunakan state dari props (lifted state) atau fallback ke state lokal
    const [localActuators, setLocalActuators] = useState(INITIAL_ACTUATORS);
    const actuators = controlledActuators ?? localActuators;
    const setActuators = controlledSetActuators ?? setLocalActuators;

    // Mengubah kondisi satu aktuator
    const handleToggle = (key) => {
        setActuators((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Mematikan seluruh aktuator
    const handleAllOff = () => {
        setActuators({
            dinamo: false,
            pemanas: false,
            kipas: false,
            filter: false,
        });
    };

    // Menyalakan seluruh aktuator
    const handleAllOn = () => {
        setActuators({
            dinamo: true,
            pemanas: true,
            kipas: true,
            filter: true,
        });
    };

    // Menghitung jumlah aktuator yang aktif
    const activeCount = Object.values(actuators).filter(
        (status) => status
    ).length;

    // Cek apakah ada minimal 1 perangkat yang sedang aktif
    const isAnyActive = activeCount > 0;

    // Toggle seluruh aktuator (Nyalakan Semua / Matikan Semua)
    const handleToggleAll = () => {
        if (isAnyActive) {
            handleAllOff();
        } else {
            handleAllOn();
        }
    };

    return (
        <View style={styles.container}>

            {/* Ringkasan Status */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    {activeCount} dari 4 perangkat aktif
                </Text>

                <View
                    style={[
                        styles.summaryBadge,
                        activeCount > 0 && styles.summaryBadgeActive,
                    ]}
                >
                    <Text
                        style={[
                            styles.summaryBadgeText,
                            activeCount > 0 && styles.summaryBadgeTextActive,
                        ]}
                    >
                        {activeCount > 0 ? 'AKTIF' : 'STANDBY'}
                    </Text>
                </View>
            </View>

            {/* Daftar Kontrol */}
            <View style={styles.controls}>

                {ACTUATOR_ITEMS.map((item) => {

                    const active = actuators[item.key];

                    return (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                styles.control,
                                active && styles.controlActive,
                            ]}
                            onPress={() => handleToggle(item.key)}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel={`Kontrol ${item.label}`}
                            accessibilityState={{ selected: active }}
                        >
                            <Ionicons
                                name={item.icon}
                                size={27}
                                color={
                                    active
                                        ? COLORS.primary
                                        : COLORS.onSurfaceVariant
                                }
                            />

                            <Text
                                style={[
                                    styles.controlLabel,
                                    active && styles.controlLabelActive,
                                ]}
                            >
                                {item.label}
                            </Text>

                            <View
                                style={[
                                    styles.statusBadge,
                                    active && styles.statusBadgeActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.controlState,
                                        active && styles.controlStateActive,
                                    ]}
                                >
                                    {active ? 'NYALA' : 'MATI'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

            </View>

            {/* Tombol Toggle Semua (ON / OFF) */}
            <TouchableOpacity
                style={[
                    styles.allToggle,
                    {
                        borderColor: isAnyActive
                            ? COLORS.danger + '55'
                            : COLORS.secondary + '55',
                    },
                ]}
                onPress={handleToggleAll}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="power"
                    size={19}
                    color={isAnyActive ? COLORS.danger : COLORS.secondary}
                />

                <Text
                    style={[
                        styles.allToggleText,
                        { color: isAnyActive ? COLORS.danger : COLORS.secondary },
                    ]}
                >
                    {isAnyActive ? 'Matikan Semua' : 'Nyalakan Semua'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        gap: SIZES.medium,
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    summaryText: {
        fontSize: SIZES.small,
        color: COLORS.onSurfaceVariant,
    },

    summaryBadge: {
        backgroundColor: COLORS.surfaceVariant,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    summaryBadgeActive: {
        backgroundColor: COLORS.secondaryContainer,
    },

    summaryBadgeText: {
        fontSize: SIZES.xSmall,
        fontWeight: '700',
        color: COLORS.gray,
    },

    summaryBadgeTextActive: {
        color: COLORS.secondary,
    },

    controls: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    control: {
        flexBasis: '47%',
        flexGrow: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingVertical: SIZES.large,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.outline,
    },

    controlActive: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },

    controlLabel: {
        fontSize: SIZES.medium,
        fontWeight: '700',
        color: COLORS.onSurface,
    },

    controlLabelActive: {
        color: COLORS.primary,
    },

    statusBadge: {
        backgroundColor: COLORS.surfaceVariant,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusBadgeActive: {
        backgroundColor: COLORS.secondaryContainer,
    },

    controlState: {
        fontSize: SIZES.xSmall,
        fontWeight: '700',
        color: COLORS.onSurfaceVariant,
    },

    controlStateActive: {
        color: COLORS.secondary,
    },

    allToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 2,
        paddingVertical: SIZES.medium,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: COLORS.surface,
    },

    allToggleText: {
        fontSize: SIZES.small,
        fontWeight: '700',
    },

});

export default ActuatorControls;
