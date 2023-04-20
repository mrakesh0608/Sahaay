import { useEffect, useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Formik } from "formik";
import * as yup from 'yup';

import { useAuthContext } from '#src/context/AuthContext';

import { useUploadImg } from '#src/hooks';

import FormikTextInput from '#src/forms/FormikTextInput';
import { SubmitBtn } from '#src/elements';

export default function NewUserForm({ isPending, error, onSubmit }) {

    const { age, bloodgroup } = useAuthContext();

    const photo = auth().currentUser.photoURL
    const { uploadImg, UploadImgComp } = useUploadImg({ old: photo ? { uri: photo } : null });

    const [initialValues, setInitialValues] = useState({
        displayName: '',
        phoneNumber: '',
        email: '',
        age: age ? age : '',
        bloodgroup: bloodgroup ? bloodgroup : ''
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
                onSubmit({ ...val, photoURL: uploadImg?.uri });
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
                    <FormikTextInput
                        formikProps={props}
                        varName={'bloodgroup'}

                        placeholder={'Blood Group'}
                        egText="e.g. A+"
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