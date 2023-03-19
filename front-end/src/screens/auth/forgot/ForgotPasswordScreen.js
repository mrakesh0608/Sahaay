import { useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';

import FormContainer from '@components/forms/FormContainer';
import SubmitBtn from '@components/elements/btn/SubmitBtn';
import { TextInput } from '@components/elements/TextInput';
import Text from '@components/elements/Text';

import formStyles from '@styles/formStyles';
import gStyles from '@styles/gStyles';
import ErrorText from '@components/elements/ErrorText';

export default function ForgotPasswordScreen({ navigation }) {

    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');

    const onSubmitClicked = async () => {
        auth()
            .sendPasswordResetEmail(emailValue)
            .then(() => {
                navigation.navigate('Forgot Password Success')
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
            });
    }

    return (
        <FormContainer>
            <Text style={[gStyles.h2, gStyles.txtCenter]}>Forgot Password</Text>
            <Text style={[gStyles.txtCenter, { marginBottom: 26 }]}>Enter your email and we'll send you a reset link</Text>

            <TextInput
                value={emailValue}
                onChangeText={e => setEmailValue(e)}
                
                placeholder='Email'
                egText="example@email.com"
                
                style={formStyles.input}
                keyboardType='email-address'
            />

            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <SubmitBtn
                title="Send Reset Link"
                disabled={!emailValue}
                onPress={onSubmitClicked}
            />
        </FormContainer>
    )
}