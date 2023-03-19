import { View, ScrollView } from 'react-native';

import useUploadImg from '@hooks/useUploadImg';

import TransparentBtn from '@components/elements/btn/TransparentBtn';
import SubmitBtn from '@components/elements/btn/SubmitBtn';
import Text from "@components/elements/Text";
import OR from '@components/elements/OR';

const intro = require('@configs/model.intros').PrescriptionDigit;

export default function PrescriptionDigit({ navigation }) {

    const { uploadImg, UploadImgComp } = useUploadImg();

    async function getRes() {
        navigation.navigate('PrescriptionDigitRes', { data: 'PrescriptionDigit Result' });
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