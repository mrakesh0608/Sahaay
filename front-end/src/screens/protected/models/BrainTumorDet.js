import { View, ScrollView } from 'react-native';

import useUploadImg from '@hooks/useUploadImg';

import { OR, SubmitBtn, Text, TransparentBtn } from '@components/elements';


const intro = '\t\t\t\tA brain tumor is a growth of abnormal cells in the brain. Deep learning models are used to detect the brain tumor by taking the images of magnetic resonance imaging.'

export default function BrainTumorDet({ navigation }) {

    const { uploadImg, UploadImgComp } = useUploadImg();

    async function getRes() {
        if (uploadImg) navigation.navigate('ModelRes', { data: 'Brain Tumor Detection Result' });
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
                <SubmitBtn title={'Get Result'} onPress={getRes} disabled={!uploadImg}/>
            </View>
        </ScrollView>
    );
}