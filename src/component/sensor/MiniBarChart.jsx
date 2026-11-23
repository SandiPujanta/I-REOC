
import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { COLORS } from '../../constants';

const MiniBarChart = ({ data }) => {

    // Memastikan data berupa array angka
    const validData = Array.isArray(data)
        ? data.filter(
            (value) =>
                typeof value === 'number' &&
                Number.isFinite(value) &&
                value >= 0
        )
        : [];

    // Mengambil nilai tertinggi
    const maxValue = Math.max(...validData, 1);

    // Jika tidak ada data
    if (validData.length === 0) {
        return <View style={styles.empty} />;
    }

    return (
        <View style={styles.container}>

            {validData.map((value, index) => {

                const barHeight = Math.max(
                    (value / maxValue) * 65,
                    3
                );

                return (
                    <View
                        key={index}
                        style={styles.barWrapper}
                    >
                        <View
                            style={[
                                styles.bar,
                                { height: barHeight },
                                index === validData.length - 1 &&
                                styles.lastBar,
                            ]}
                        />
                    </View>
                );
            })}

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 8,
    },

    barWrapper: {
        flex: 1,
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    bar: {
        width: '75%',
        backgroundColor: COLORS.secondaryContainer,
        borderRadius: 5,
    },

    lastBar: {
        backgroundColor: COLORS.secondary,
    },

    empty: {
        height: 75,
    },

});

export default MiniBarChart;

