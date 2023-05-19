import React from 'react'
import { View } from 'react-native';

import { useFetch } from '#src/hooks';
import { serverAPI } from '#src/utils';

import { ErrorText, TransparentBtn, WhatsThis } from '#src/elements';

export function TryWithImg({
    datasetName,
    setUploadImg
}: {
    datasetName: string,
    setUploadImg: any
}) {

    const { GET, isPending, error } = useFetch();

    async function handleTryImg() {
        GET({
            path: `${serverAPI}/randomImg?dataset=${datasetName}`,
            cb: ({ data }) => {
                // console.log(data);

                if (!data) return;
                setUploadImg({ uri: data.randomImgURL });
            }
        });
    }

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TransparentBtn
                    title='Try with sample image'
                    onPress={handleTryImg}
                    isPending={isPending}
                />
                <WhatsThis desc={`"Try with sample image" takes a random sample image from server's storage which contains more than 500 images to demostrate how this model works.`} />
            </View>
            {error &&
                <ErrorText>{error}</ErrorText>
            }
        </>
    );
}