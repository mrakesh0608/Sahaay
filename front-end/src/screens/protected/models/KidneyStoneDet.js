import { View, ScrollView } from 'react-native';

import useUploadImg from '@hooks/useUploadImg';

import { OR, SubmitBtn, Text, TransparentBtn } from '@components/elements';

const intro = 'The Kidney stones are a hard collection of salt and minerals, often calcium and uric acid that form in the kidneys.'

export default function KidneyStoneDet({ navigation }) {

    const { uploadImg, UploadImgComp } = useUploadImg();

    async function getRes() {
        if (uploadImg) navigation.navigate('ModelRes', { data: 'Kidney Stone Detetection Result' });
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

                <SubmitBtn title={'Get Result'} onPress={getRes} disabled={!uploadImg} />
            </View>
        </ScrollView>
    );
}