import { View, ScrollView } from 'react-native';

import useUploadImg from '@hooks/useUploadImg';

import { OR, SubmitBtn, Text, TransparentBtn } from '@components/elements';

const intro = '';

export default function PrescriptionDigit({ navigation }) {

    const { uploadImg, UploadImgComp } = useUploadImg();

    async function getRes() {
        navigation.navigate('ModelRes', { data: 'Prescription Digitization Result' });
    }

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 20 }}>
                <Text style={{ textAlign: 'justify' }}>{intro}</Text>
                <UploadImgComp />
                <OR />
                <TransparentBtn title='Try with sample image' />
                <SubmitBtn title={'Get Result'} onPress={getRes} />
            </View>
        </ScrollView>
    );
}