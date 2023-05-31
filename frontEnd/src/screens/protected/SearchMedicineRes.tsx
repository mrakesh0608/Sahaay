import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import { chatGPTForMedicine, openUrl } from '#src/utils';
import { usePED } from '#src/hooks';

import { BtnContainer, CapsuleBtn, CenterView, ErrorText, LoadingComp, Text } from '#src/elements';
import { DefaultScreen } from '#src/components';
import { useNavigation } from '@react-navigation/native';

export default function SearchMedicineRes({ route }) {

    const navigation = useNavigation();
    const { medicine } = route.params;

    const { isPending, setIsPending, error, setError, data, setData } = usePED();

    useEffect(() => {
        navigation.setOptions({
            title: medicine
        });
    }, [])

    useEffect(() => {
        (async () => {
            if (medicine.length) setError(null);
            else {
                setError('Invalid Medication Name');
                return;
            }

            setIsPending(true);
            const { err, data } = await chatGPTForMedicine({ txt: medicine });

            if (err) setError(err);
            else setData(data);

            setIsPending(false);
        })()
    }, [medicine])

    if (isPending) return <LoadingComp />

    if (error || !data) return (
        <CenterView>
            <ErrorText>{error}</ErrorText>
        </CenterView>
    );
    return (
        <DefaultScreen style={{ padding: 10 }}>
            {Object.keys(data).map((item, index) =>
                typeof data[item] === 'string' ?
                    <View key={index}>
                        <Text
                            style={{
                                textAlign: 'justify',
                                fontSize: 16,
                                paddingVertical: 10,
                                fontWeight: 'bold'
                            }}>{item?.trim()} : </Text >
                        <Text
                            style={{
                                textAlign: 'justify',
                                fontSize: 16,
                                paddingVertical: 10
                            }}>{data[item]?.trim()}</Text >
                    </View>
                    : null
            )}
            <Text
                style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    paddingVertical: 10,
                    fontWeight: 'bold'
                }}
            >Find more information on</Text>
            <BtnContainer>
                {[{
                    img: require('#assets/medical/PharmEasy.png'),
                    url: `https://pharmeasy.in/search/all?name=${medicine}`
                }, {
                    img: require('#assets/medical/TATA-1mg.png'),
                    url: `https://www.1mg.com/search/all?name=${medicine}`
                }].map((item, index) =>
                    <CapsuleBtn
                        key={index}
                        TextLeftComp={() =>
                            <Image
                                source={item.img}
                                style={{ width: 100, height: 20 }}
                            />}
                        containerStyle={{ backgroundColor: 'lightgray' }}
                        onPress={() => openUrl({ url: item.url })}
                    />
                )}
            </BtnContainer>
        </DefaultScreen>
    )
}