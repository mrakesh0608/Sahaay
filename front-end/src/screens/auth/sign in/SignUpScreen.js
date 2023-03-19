import { AntDesign, FontAwesome } from '@expo/vector-icons';

import useSignUp from "@hooks/auth/useSignUp";
import useGoogleOAuth from "@hooks/auth/useGoogleOAuth";

import TransparentBtn from '@components/elements/btn/TransparentBtn';
import BtnWithImg from "@components/elements/btn/BtnWithImg";
import FormContainer from '@components/forms/FormContainer';
import SignUpForm from '@components/forms/SignUpForm';
import Text from "@components/elements/Text";
import OR from '@components/elements/OR';

import gStyles from "@styles/gStyles";

export default function SignUpScreen({ navigation }) {

    const { signup, error, isPending } = useSignUp();
    const { signIn } = useGoogleOAuth();

    return (
        <FormContainer>
            <Text style={gStyles.h2}>Sign up</Text>
            <SignUpForm isSigningUp={isPending} error={error} onSubmit={signup} />
            <OR />
            <BtnWithImg
                title="Continue with Google"
                Image={({ color }) => <AntDesign name="google" size={24} color={color} />}
                onPress={signIn}
            />
            <BtnWithImg
                title="Continue with Phone Number"
                onPress={() => navigation.navigate('Sign In With Phone')}
                Image={({ color }) => <FontAwesome name="phone" size={24} color={color} />}
            />
            <TransparentBtn
                title="Already have an account? Sign In"
                onPress={() => navigation.navigate('Sign In')}
            />
        </FormContainer>
    );
}