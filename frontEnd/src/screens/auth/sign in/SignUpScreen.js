import {useSignUp} from "#src/hooks";

import FormContainer from '#src/forms/FormContainer';
import SignUpForm from '#src/forms/SignUpForm';

import { GoogleBtn, PhoneBtn, AppIcon } from '#src/components';
import { TransparentBtn, Text, OR } from '#src/elements';

import gStyles from "#src/styles/gStyles";

export default function SignUpScreen({ navigation }) {

    const { signup, error, isPending } = useSignUp();

    return (
        <FormContainer>
            <AppIcon />
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