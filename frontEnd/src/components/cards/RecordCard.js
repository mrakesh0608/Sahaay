import React from 'react'
import { View, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

import { timeHourMin } from '@utils/time';
import useThemeContext from '@hooks/context/useThemeContext';

import CardContainer from '@components/cards/CardContainer';
import { Text } from '@components/elements';

export default function RecordCard({ record }) {

    const { colors } = useThemeContext();
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigate('ModelRes', { id: record.id, data: { ...record } })}>
            <CardContainer>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{record.title}</Text>
                    <Text style={{ color: record.range > 0.5 ? 'red' : 'green', fontWeight: 'bold' }}>{record.range > 0.5 ? 'Detected' : 'Not Detected'}</Text>
                    {/* <Octicons name="dot-fill" size={16} color={record.range > 0.5 ? 'red' : 'green'} /> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'gray', }}>{record.id}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>{timeHourMin(record.createdAt.toDate())}</Text>
                </View>
            </CardContainer>
        </TouchableOpacity>
    )
}