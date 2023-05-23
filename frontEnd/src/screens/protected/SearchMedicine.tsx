import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as yup from 'yup';

import { chatGPTForMedicineList } from '#src/utils';
import { usePED } from '#src/hooks';

import FormikTextInput from '#src/forms/FormikTextInput';
import FormContainer from '#src/forms/FormContainer';
import { IntroText, LoadingComp, SubmitBtn, Text, TransparentBtn } from '#src/elements';

import { useNavigation } from '@react-navigation/native';

export default function SearchMedicine() {

    const { navigate } = useNavigation();

    const {
        isPending, setIsPending,
        error, setError,
        data: searchList, setData: setSearchList
    } = usePED([]);

    const [searchTerm, setSearchTerm] = useState('');

    async function loadSearchTerms() {
        // console.log(searchTerm)
        setSearchList([]);

        if (searchTerm.length) {
            setIsPending(true);
            const res = await chatGPTForMedicineList({ txt: searchTerm });
            console.log(res);
            setSearchList(res);
            setIsPending(false);
        }
    }

    async function handleChangeTxt(val: string) {
        setSearchTerm(val);
        if (searchTerm) setSearchList([]);
    }

    useEffect(() => {
        if (searchTerm.length === 0) {
            setSearchList([
                "Aspirin",
                "Crocin",
                "Diclofenac Sodium",
                "Paracetamol",
                "ORS",
            ])
            return;
        }
        const delayDebounceFn = setTimeout(loadSearchTerms, 1000)
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm])

    return (
        <FormContainer>
            <IntroText>Stay informed and take charge of your health by easily accessing all the details about the medicines prescribed by your doctor. Learn about its uses, dosage instructions, and potential side effects to have all the necessary information right at your fingertips.</IntroText>
            <Formik
                initialValues={{ medicine: '' }}
                validationSchema={validationSchema}
                onSubmit={async (val: any, actions) => {
                    if (searchTerm) navigate('Search Medicine Result' as never, { ...val } as never)
                }}
            >
                {props => <>
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='medicine'

                        placeholder='Medicine Name'
                        egText={'e.g. Paracetamol'}
                        onChangeText={handleChangeTxt}
                    />
                    <SubmitBtn
                        title="Search"
                        disabled={props.dirty && !props.isValid}
                        onPress={() => props.handleSubmit()}
                        errTxt={error}
                    />
                    {searchTerm.length === 0 && <Text style={{ marginVertical: 10 }}>Search for</Text>}
                    {searchList.map((item: string, index: number) =>
                        <TransparentBtn
                            key={index}
                            title={item.trim()}
                            onPress={async () => {
                                setSearchTerm(item.trim())
                                props.setFieldTouched('medicine', true, true)
                                props.setFieldValue('medicine', item.trim())
                                props.handleSubmit()
                            }}
                            containerStyle={{
                                alignSelf: 'flex-start',
                                padding: 6,
                                borderWidth: 1,
                                borderColor: 'gray',
                                marginVertical: 4,
                                borderRadius: 4
                            }}
                        />
                    )}
                </>}
            </Formik>
            {isPending && <LoadingComp title='' />}
        </FormContainer>
    )
}

const validationSchema = yup.object({
    medicine: yup.string()
        .required("Required")
        .min(3, "Atleast 3 characters long")
})