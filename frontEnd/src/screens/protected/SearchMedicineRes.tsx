import React, { useEffect } from 'react';

import { chatGPTForMedicine } from '#src/utils';
import { usePED } from '#src/hooks';

import { CenterView, ErrorText, LoadingComp, Text } from '#src/elements';
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
            // console.log(val);
            setIsPending(true);

            const resTxt = await chatGPTForMedicine({ txt: medicine });
            console.log(resTxt);

            setData(resTxt);
            setIsPending(false);
        })()
    }, [])

    if (isPending) return <LoadingComp />

    if (error || !data) return (
        <CenterView>
            <ErrorText>{error}</ErrorText>
        </CenterView>
    );
    return (
        <DefaultScreen>
            <Text style={{
                textAlign: 'justify',
                fontSize: 16,
                padding: 10
            }
            }>{data.trim()}</Text >
        </DefaultScreen>
    )
}