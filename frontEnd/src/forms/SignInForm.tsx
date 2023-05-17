import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';

import FormikPasswordTextInput from '#src/forms/FormikPasswordTextInput';
import FormikTextInput from '#src/forms/FormikTextInput';

import { MyBtn, SubmitBtn, TransparentBtn } from '#src/elements';

export default function SignInForm({ isSigningIn, error, onSubmit, navigation }) {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(val, actions) => {
                // actions.resetForm();
                onSubmit({ ...val });
            }}
        >
            {props => <>
                <FormikTextInput
                    formikProps={{ ...props }}
                    varName='email'

                    placeholder='Email'
                    keyboardType='email-address'
                    egText={'e.g. example@email.com'}
                />
                <FormikPasswordTextInput
                    formikProps={{ ...props }}
                    varName='password'

                    placeholder='Password'
                />

                <MyBtn
                    title={"Forgot your password?"}
                    onPress={() => navigation.navigate('Forgot Password')}
                    containerStyle={{ alignSelf: 'flex-start' }}
                />

                <SubmitBtn
                    title={isSigningIn ? 'Signing In' : 'Sign In'}
                    isPending={isSigningIn}
                    onPress={()=>props.handleSubmit}
                    disabled={props.dirty && (!props.isValid || isSigningIn)}

                    errTxt={error}
                />
            </>}
        </Formik>
    );
}

const validationSchema = yup.object({
    email: yup.string().required().email().matches(/@[^.]*\./, { message: "Invalid email format" }),
    password: yup.string().required().min(6),
})