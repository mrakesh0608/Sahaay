import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ModelCard } from '#src/components/model/ModelCard';
import { Text } from '#src/elements';

export function ModelList() {

    const { navigate } = useNavigation();

    return (
        <View style={{
            marginTop: 26
        }}>
            <Text style={{ fontSize: 20 }}>Models</Text>
            <ModelCard
                title={'Prescription\nDigitization'}
                imgSource={require('#assets/medical/prescription.png')}
                onPress={() => navigate('PrescriptionDigit' as never)}
            />
            <ModelCard
                title={'Brain Tumor\nDetection'}
                imgSource={require('#assets/medical/brain.png')}
                onPress={() => navigate('BrainTumorDet' as never)}
            />
            <ModelCard
                title={'Kidney Stone\nDetection'}
                imgSource={require('#assets/medical/kidney-stone.png')}
                onPress={() => navigate('KidneyStoneDet' as never)}
            />
            <ModelCard
                title={'Skin Infection\nDetection'}
                imgSource={require('#assets/medical/infection.png')}
                onPress={() => navigate('SkinInfectionDet' as never)}
            />
            <ModelCard
                title={'Calories\nEstimation'}
                imgSource={require('#assets/medical/calories.png')}
                onPress={() => navigate('CaloriesEstimation' as never)}
            />
        </View>
    );
}