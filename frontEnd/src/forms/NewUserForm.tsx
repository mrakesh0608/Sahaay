import React from 'react';
import auth from '@react-native-firebase/auth';
import { Formik } from "formik";
import * as yup from 'yup';

import { useAuthContext } from '#src/context/AuthContext';
import { useUploadImg } from '#src/hooks';
import { windowWidth } from '#src/utils';

import { BloodGroupPicker, GenderPicker } from '#src/components';
import FormikTextInput from '#src/forms/FormikTextInput';
import { DatePicker, SubmitBtn } from '#src/elements';

export default function NewUserForm({ isPending, error, onSubmit }) {

    const { dob, gender = '', bloodgroup = '' } = useAuthContext();
    const { photoURL = '', displayName = '', phoneNumber = '', email = '' } = auth().currentUser;

    const { uploadImg, UploadImgComp } = useUploadImg({ initialImg: photoURL ? { uri: photoURL } : null });

    const initialValues = {
        displayName, phoneNumber, email,
        gender, bloodgroup,
        dob: dob ? dob.toDate() : ''
    };

    return (
        <>
            <UploadImgComp
                imgStyle={{
                    width: windowWidth * 0.45,
                    height: windowWidth * 0.45,
                    // borderRadius: 100,
                }}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(val, actions) => {
                    // actions.resetForm();
                    // console.log(val);
                    onSubmit({ ...val, photoURL: uploadImg?.uri });
                }}
                enableReinitialize
            >{props =>
                <>
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
                        egText={'e.g. example@email.com'}

                        keyboardType='email-address'
                        editable={auth().currentUser?.providerData[0]?.providerId !== 'google.com'}
                    />
                    <FormikTextInput
                        formikProps={props}
                        varName={'phoneNumber'}

                        placeholder={'Phone number'}
                        egText="e.g. 9876543210"

                        keyboardType='phone-pad'
                        editable={auth().currentUser?.providerData[0]?.providerId !== 'phone'}
                    />
                    <DatePicker
                        placeholder='Date of Birth'

                        value={props.values['dob']}
                        onChange={(val: string) => props.setFieldValue('dob', val)}
                        errTxt={props.touched['dob'] && props.errors['dob']?.toString()}
                    />
                    <GenderPicker
                        value={props.values['gender']}
                        onChange={(val: string) => props.setFieldValue('gender', val)}
                        errTxt={props.touched['gender'] && props.errors['gender']?.toString()}
                    />
                    <BloodGroupPicker
                        value={props.values['bloodgroup']}
                        onChange={(val: string) => props.setFieldValue('bloodgroup', val)}
                        errTxt={props.touched['bloodgroup'] && props.errors['bloodgroup']?.toString()}
                    />
                    <SubmitBtn
                        title={isPending ? 'Saving ...' : 'Save'}
                        onPress={() => props.handleSubmit()}
                        disabled={isPending || !props.isValid}

                        isPending={isPending}
                        errTxt={error}
                    />
                </>
                }
            </Formik>
        </>
    );
}

const validationSchema = yup.object({
    displayName: yup.string().required("Required"),
    email: yup.string().notRequired().email().matches(/@[^.]*\./, { message: "Invalid Email Format" }),
    phoneNumber: yup.string().notRequired(),
    dob: yup.string().notRequired(),
    gender: yup.string().required("Required"),
    bloodgroup: yup.string().notRequired(),
})