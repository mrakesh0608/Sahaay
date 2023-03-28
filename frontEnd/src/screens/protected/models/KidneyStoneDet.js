import { useEffect } from 'react'
import { View, ScrollView } from 'react-native';

import { randomNumBetween, serverAPI } from '@utils/index';

import useAuthContext from '@hooks/context/useAuthContext';
import * as myfirebase from '@myfirebase/storage';
import useUploadImg from '@hooks/useUploadImg';
import useFetch from '@hooks/useFetch';

import { OR, SubmitBtn, Text, TransparentBtn } from '@components/elements';
import WhatsThis from '@components/WhatsThis';

const intro = 'The Kidney stones are a hard collection of salt and minerals, often calcium and uric acid that form in the kidneys.';

async function randomImgUrl() {
    let Type = 'Normal'
    if (Math.random() > 0.5) Type = 'Stone'
    imgNo = randomNumBetween(1001, 1300);

    return `https://raw.githubusercontent.com/mrakesh0608/Kidney-Stone-Detection/master/CT_images/Test/${Type}/${Type}-%20(${imgNo}).jpg`
}

export default function KidneyStoneDet({ navigation }) {

    const { user } = useAuthContext();

    const { uploadImg, setUploadImg, UploadImgComp } = useUploadImg();
    const { isPending, error, fetchData, data, setIsPending } = useFetch();

    async function getRes() {

        setIsPending(true);

        if (!(uploadImg?.uri)) return;

        let img_url = uploadImg.uri
        if (uploadImg.type) {
            img_url = await myfirebase.uploadFile({
                path: `report-img/${user.uid}/${new Date()}`,
                file: img_url
            })
        }

        fetchData({
            path: `${serverAPI}/kidney-stone-detection`,
            method: 'POST',
            body: { uid: user.uid, img_url }
        });
    }

    useEffect(() => {
        if (data) navigation.navigate('ModelRes', { ...data });
    }, [data])

    async function handleTryImg() {
        const uri = await randomImgUrl();
        setUploadImg({ uri });
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

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TransparentBtn
                        title='Try with sample image'
                        onPress={handleTryImg}
                    />
                    <WhatsThis />
                </View>

                <SubmitBtn
                    title={'Get Result'}
                    onPress={getRes}
                    disabled={!uploadImg}
                    isPending={isPending}
                    errTxt={error}
                />
            </View>
        </ScrollView>
    );
}