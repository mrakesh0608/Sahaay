import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '#src/context/AuthContext';
import { useFetch, useUploadImg } from '#src/hooks';
import * as firebase from '#src/firebase';
import { serverAPI } from '#src/utils';

import { IntroText, OR, SubmitBtn, Text } from '#src/elements';
import { TryWithImg } from './TryWithImg';

export function ModelContainer(
    {
        introTxt,
        serverPath,
        datasetName,
        FooterComponet,
        freeSizeImg = false
    }: {
        introTxt?: string,
        serverPath: string,
        datasetName: string,
        FooterComponet?: JSX.Element,
        freeSizeImg?: boolean
    }) {

    const navigation = useNavigation();
    const { user } = useAuthContext();

    const { uploadImg, setUploadImg, UploadImgComp } = useUploadImg({ freeSizeImg });
    const { isPending, error, fetchData, data, setIsPending } = useFetch();

    useEffect(() => {

        if (data) navigation.navigate('Report' as never, { ...data } as never);
    }, [data])

    async function getRes() {

        setIsPending(true);

        if (!(uploadImg?.uri)) return;

        let img_url = uploadImg.uri

        //temp sol to identify random or custom img
        if (uploadImg['type']) {
            img_url = await firebase.uploadFile({
                path: `report-img/${user.uid}/${new Date()}`,
                file: img_url
            })
        }

        fetchData({
            path: `${serverAPI}/${serverPath}`,
            method: 'POST',
            payload: { uid: user.uid, img_url }
        });
    }

    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 20 }}>
                <IntroText>{introTxt}</IntroText>
                <UploadImgComp />
                <OR />
                <TryWithImg
                    datasetName={datasetName}
                    setUploadImg={setUploadImg}
                />

                <SubmitBtn
                    title={isPending ? 'Generating' : 'Generate Report'}
                    onPress={getRes}
                    disabled={!uploadImg}
                    isPending={isPending}
                    errTxt={error}
                />
                {FooterComponet}
            </View>
        </ScrollView>
    );
}