
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const MiniBarChart = ({ data = [] }) => {
    const validData = data.filter(
        (value) =>
            typeof value === 'number' &&
            Number.isFinite(value) &&
            value >= 0
    );

    if (validData.length === 0) {
        return <View style={styles.empty} />;
    }

    const maxValue = Math.max(...validData, 1);

    return (
        <View style={styles.container}>
            {validData.map((value, index) => {
                const height = Math.max(
                    (value / maxValue) * 42,
                    5
                );

                return (
                    <View
                        key={index}
                        style={[
                            styles.bar,
                            {
                                height,
                                backgroundColor:
                                    index < 2 ? '#FB7185' : COLORS.accent,
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 78,
        height: 46,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: 5,
    },

    bar: {
        width: 8,
        borderRadius: 5,
    },

    empty: {
        width: 78,
        height: 46,
    },
});

export default MiniBarChart;
