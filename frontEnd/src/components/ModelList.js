import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import ModelCard from '@components/cards/ModelCard';

export default function ModelList() {

    const { navigate } = useNavigation();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 20
        }}>
            <ModelCard
                title={'Prescription\nDigitization'}
                imgSource={require('@assets/medical/prescription.png')}
                backgroundColor={'lightpink'}

                onPress={() => navigate('PrescriptionDigit')}
            />
            <ModelCard
                title={'Brain Tumor\nDetection'}
                imgSource={require('@assets/medical/brain.png')}
                backgroundColor={'lightblue'}

                onPress={() => navigate('BrainTumorDet')}
            />
            <ModelCard
                title={'Kidney Stone\nDetection'}
                imgSource={require('@assets/medical/kidney-stone.png')}
                backgroundColor={'lightcoral'}

                onPress={() => navigate('KidneyStoneDet')}
            />
            <ModelCard
                title={'Skin Infection\nDetection'}
                imgSource={require('@assets/medical/infection.png')}
                backgroundColor={'lightsteelblue'}

                onPress={() => navigate('SkinInfectionDet')}
            />
        </View>
    );
}