import { useEffect, useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Formik } from "formik";
import * as yup from 'yup';

import useAuthContext from '@hooks/context/useAuthContext';
import useUploadImg from '@hooks/useUploadImg';

import FormikTextInput from '@components/forms/FormikTextInput';
import { SubmitBtn } from '@components/elements';

export default function NewUserForm({ isPending, error, onSubmit }) {

    const { age } = useAuthContext();

    const photo = auth().currentUser.photoURL
    const { uploadImg, UploadImgComp } = useUploadImg({ old: photo ? { uri: photo } : null });

    const [initialValues, setInitialValues] = useState({
        displayName: '',
        phoneNumber: '',
        email: '',
        age: age ? age : '',
    });

    useEffect(() => {
        Object.keys(initialValues).forEach(item => {
            if (auth().currentUser[item]) {
                initialValues[item] = auth().currentUser[item]
            }
        })
        setInitialValues({ ...initialValues });
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(val, actions) => {
                // actions.resetForm();
                // console.log(val);
                onSubmit({ ...val, photoURL: uploadImg });
            }}
            enableReinitialize
        >
            {props =>
                <View>
                    <UploadImgComp />
                    <FormikTextInput
                        formikProps={props}
                        varName={'displayName'}

                        placeholder={'Name'}
                        egText="e.g. John Doe"
                    />
                    <FormikTextInput
                        formikProps={props}
                        varName={'email'}

                        placeholder={'Email'}
                        keyboardType='email-address'
                        egText={'e.g. example@email.com'}
                        editable={auth().currentUser?.providerData[0]?.providerId === 'google.com' ? false : true}
                    />
                    <FormikTextInput
                        formikProps={props}
                        varName={'phoneNumber'}

                        placeholder={'Phone number'}
                        keyboardType='phone-pad'
                        egText="e.g. 9876543210"
                        editable={auth().currentUser?.providerData[0]?.providerId === 'phone' ? false : true}
                    />
                    <FormikTextInput
                        formikProps={props}
                        varName={'age'}

                        placeholder={'Age'}
                        keyboardType='number-pad'
                        egText="e.g. 28"
                    />

                    <SubmitBtn
                        title={isPending ? 'Saving ...' : 'Continue'}
                        onPress={props.handleSubmit}
                        disabled={isPending || !props.isValid}

                        isPending={isPending}
                        errTxt={error}
                    />
                </View>
            }
        </Formik>
    );
}

const validationSchema = yup.object({
    displayName: yup.string().required("Required"),
    email: yup.string().notRequired().email().matches(/@[^.]*\./, { message: "Invalid email format" }),
    phoneNumber: yup.string().notRequired()
})