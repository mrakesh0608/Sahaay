import auth from '@react-native-firebase/auth';
import { Formik } from "formik";
import * as yup from 'yup';

import { showableErrorText } from '#src/utils';
import { usePED } from '#src/hooks';

import FormikTextInput from '#src/forms/FormikTextInput';
import FormContainer from '#src/forms/FormContainer';
import { SubmitBtn, Text } from '#src/elements';

import gStyles from '#src/styles/gStyles';

export default function ForgotPasswordScreen({ navigation }) {

    const { isPending, setIsPending, error, setError } = usePED();

    return (
        <FormContainer>
            <Text style={[gStyles.h2, gStyles.txtCenter]}>Forgot Password</Text>
            <Text style={[gStyles.txtCenter, { marginBottom: 26 }]}>Enter your email and we'll send you a reset link</Text>

            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={async (val, actions) => {
                    // actions.resetForm();
                    setIsPending(true);
                    auth()
                        .sendPasswordResetEmail(val.email)
                        .then(() => {
                            navigation.navigate('Forgot Password Success')
                        })
                        .catch(async (error) => {
                            console.log(error);
                            setError(await showableErrorText(error));
                        })
                        .finally(() => { setIsPending(false) })
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
                    <SubmitBtn
                        title={isPending ? 'Checking' : "Send Reset Link"}
                        isPending={isPending}
                        disabled={props.dirty && (!props.isValid || isPending)}
                        onPress={props.handleSubmit}

                        errTxt={error}
                    />
                </>}
            </Formik>

        </FormContainer>
    )
}

const validationSchema = yup.object({
    email: yup.string().required().email().matches(/@[^.]*\./, { message: "Invalid email format" }),
})