import { AntDesign, FontAwesome } from '@expo/vector-icons';

import useGoogleOAuth from "@hooks/auth/useGoogleOAuth";
import useSignIn from "@hooks/auth/useSignIn";

import TransparentBtn from '@components/elements/btn/TransparentBtn';
import BtnWithImg from "@components/elements/btn/BtnWithImg";
import FormContainer from '@components/forms/FormContainer';
import SignInForm from '@components/forms/SignInForm';
import Text from '@components/elements/Text';
import OR from '@components/elements/OR';

import gStyles from '@styles/gStyles';

export default function SignInScreen({ navigation }) {

    const { signin, error, isPending } = useSignIn();
    const { signIn } = useGoogleOAuth();

    return (
        <FormContainer>
            <Text style={gStyles.h2}>Sign in</Text>
            <SignInForm isSigningIn={isPending} error={error} onSubmit={signin} navigation={navigation} />

            <OR />
            <BtnWithImg
                title="Sign in with Google"
                Image={({ color }) => <AntDesign name="google" size={24} color={color} />}
                onPress={signIn}
            />
            <BtnWithImg
                title="Sign in with Phone Number"
                onPress={() => navigation.navigate('Sign In With Phone')}
                Image={({ color }) => <FontAwesome name="phone" size={24} color={color} />}
            />

            <TransparentBtn title={"Don't have an account? Sign Up"} onPress={() => navigation.navigate('Sign Up')} />
        </FormContainer>
    );
}