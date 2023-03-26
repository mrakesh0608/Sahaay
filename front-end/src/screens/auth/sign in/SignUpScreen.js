import useSignUp from "@hooks/auth/useSignUp";

import { TransparentBtn, Text, OR } from '@components/elements';
import FormContainer from '@components/forms/FormContainer';
import SignUpForm from '@components/forms/SignUpForm';

import gStyles from "@styles/gStyles";
import PhoneBtn from '@components/auth/PhoneBtn';
import GoogleBtn from '@components/auth/GoogleBtn';

export default function SignUpScreen({ navigation }) {

    const { signup, error, isPending } = useSignUp();

    return (
        <FormContainer>
            <Text style={gStyles.h2}>Sign up</Text>
            <SignUpForm isSigningUp={isPending} error={error} onSubmit={signup} />

            <OR />
            <GoogleBtn title="Continue with Google" />
            <PhoneBtn title="Continue with Phone Number" />

            <TransparentBtn
                title="Already have an account? Sign In"
                onPress={() => navigation.navigate('Sign In')}
            />
        </FormContainer>
    );
}