import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ModelCard } from '#src/components/model/ModelCard';
import { Text } from '#src/elements';

export function ToolsList() {

    const { navigate } = useNavigation();

    return (
        <View style={{
            marginVertical: 26
        }}>
            <Text style={{ fontSize: 20 }}>Tools</Text>
            <ModelCard
                title={'Digital\nPrescription'}
                imgSource={require('#assets/medical/digital-prescription.png')}
                onPress={() => navigate('Digital Prescription' as never)}
            />
            <ModelCard
                title={'Search\nAbout Medicine'}
                imgSource={require('#assets/medical/medicine.png')}
                onPress={() => navigate('Search Medicine' as never)}
            />
        </View>
    );
}