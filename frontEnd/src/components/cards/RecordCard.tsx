import React from 'react'
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { timeHourMin } from '#src/utils';

import { useThemeContext } from '#src/context/ThemeContext';

import { CardContainer } from '#src/components/cards/CardContainer';
import { Text } from '#src/elements';

export function RecordCard({ record }) {

    const { colors } = useThemeContext();
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigate('ModelRes' as never, { id: record.id, data: { ...record } } as never)}>
            <CardContainer>
                <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{record.title}</Text>
                    <Text style={{
                        color: record.isDetected ? colors.error : colors.success,
                        fontWeight: 'bold'
                    }}>{record.title === 'Calories Estimation' ? record['nutrition']['calories'] : record.isDetected ? 'Detected' : 'Normal'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.txt2}>{record.id}</Text>
                    <Text style={styles.txt2}>{timeHourMin(record.createdAt.toDate())}</Text>
                </View>
            </CardContainer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt2: {
        color: 'gray',
        fontSize: 12
    }
})