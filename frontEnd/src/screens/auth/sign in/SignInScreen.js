import useSignIn from "@hooks/auth/useSignIn";

import { TransparentBtn, Text, OR } from '@components/elements';
import FormContainer from '@components/forms/FormContainer';
import SignInForm from '@components/forms/SignInForm';

import gStyles from '@styles/gStyles';
import GoogleBtn from '@components/auth/GoogleBtn';
import PhoneBtn from '@components/auth/PhoneBtn';

export default function SignInScreen({ navigation }) {

    const { signin, error, isPending } = useSignIn();

    return (
        <FormContainer>
            <Text style={gStyles.h2}>Sign in</Text>
            <SignInForm isSigningIn={isPending} error={error} onSubmit={signin} navigation={navigation} />

            <OR />
            <GoogleBtn />
            <PhoneBtn />

            <TransparentBtn title={"Don't have an account? Sign Up"} onPress={() => navigation.navigate('Sign Up')} />
        </FormContainer>
    );
}