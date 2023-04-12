import { useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFetch, useUploadImg } from '#src/hooks';
import * as firebase from '#src/firebase';
import { serverAPI } from '#src/utils';

import { useAuthContext } from '#src/context/AuthContext';

import { OR, SubmitBtn, Text, TransparentBtn,WhatsThis } from '#src/elements';

export function ModelContainer({ introTxt, serverPath, randomImgUrl }) {

    const navigation = useNavigation();
    const { user } = useAuthContext();

    const { uploadImg, setUploadImg, UploadImgComp } = useUploadImg();
    const { isPending, error, fetchData, data, setIsPending } = useFetch();

    useEffect(() => {
        if (data) navigation.navigate('ModelRes', { ...data });
    }, [data])

    async function getRes() {

        setIsPending(true);

        if (!(uploadImg?.uri)) return;

        let img_url = uploadImg.uri

        //temp sol to identify sample or custom img
        if (uploadImg.type) {
            img_url = await firebase.uploadFile({
                path: `report-img/${user.uid}/${new Date()}`,
                file: img_url
            })
        }

        fetchData({
            path: `${serverAPI}${serverPath}`,
            method: 'POST',
            body: { uid: user.uid, img_url }
        });
    }


    async function handleTryImg() {
        const uri = await randomImgUrl();
        setUploadImg({ uri });
    }

    return (
        <ScrollView contentContainerStyle={{
            flexGrow:1,
            alignSelf:'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 20 }}>
                <Text style={{ textAlign: 'justify' }}>{introTxt}</Text>

                <UploadImgComp />
                <OR />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TransparentBtn
                        title='Try with sample image'
                        onPress={handleTryImg}
                    />
                    <WhatsThis desc={`    "Try with sample image" takes a random sample image from server's storage which contains more than 500 images to demostrate how this model works.`} />
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