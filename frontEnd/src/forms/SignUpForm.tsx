import React from "react";

import { Formik } from "formik";
import * as yup from 'yup';

import FormikPasswordTextInput from '#src/forms/FormikPasswordTextInput';
import FormikTextInput from '#src/forms/FormikTextInput';
import { SubmitBtn } from '#src/elements';

export default function SignUpForm({ isSigningUp, error, onSubmit }) {
    return (
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(val, actions) => {
                // actions.resetForm();
                onSubmit({ ...val });
            }}
        >
            {props => <>
                <FormikTextInput
                    formikProps={{ ...props }}
                    varName={'email'}

                    placeholder={'Email'}
                    keyboardType='email-address'
                    egText={'e.g. example@email.com'}
                />
                <FormikPasswordTextInput
                    formikProps={{ ...props }}
                    varName={'password'}

                    placeholder={'Password'}
                />
                <FormikPasswordTextInput
                    placeholder={'Confirm Password'}
                    varName={'confirmPassword'}

                    formikProps={{ ...props }}
                />

                <SubmitBtn
                    title={isSigningUp ? 'Signing Up' : 'Sign Up'}
                    onPress={() => props.handleSubmit}
                    isPending={isSigningUp}
                    disabled={props.dirty && (!props.isValid || isSigningUp)}

                    errTxt={error}
                />
            </>}
        </Formik>
    );
}

const validationSchema = yup.object({
    email: yup.string().required().email().matches(/@[^.]*\./, { message: "Invalid email format" }),
    password: yup.string().required().min(6),
    confirmPassword: yup.string()
        .required("confirm password is a required field")
        .min(6)
        .oneOf([yup.ref('password')], "Passwords don't match")
})