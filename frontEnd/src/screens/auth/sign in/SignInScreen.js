import { useSignIn } from "#src/hooks";

import FormContainer from '#src/forms/FormContainer';
import SignInForm from '#src/forms/SignInForm';

import { AppIcon, GoogleBtn, PhoneBtn } from "#src/components";
import { TransparentBtn, Text, OR } from '#src/elements';

import gStyles from '#src/styles/gStyles';

export default function SignInScreen({ navigation }) {

    const { signin, error, isPending } = useSignIn();

    return (
        <FormContainer>
            <AppIcon />
            <Text style={gStyles.h2}>Sign in</Text>
            <SignInForm isSigningIn={isPending} error={error} onSubmit={signin} navigation={navigation} />

            <OR />
            <GoogleBtn />
            <PhoneBtn />

            <TransparentBtn title={"Don't have an account? Sign Up"} onPress={() => navigation.navigate('Sign Up')} />
        </FormContainer>
    );
}