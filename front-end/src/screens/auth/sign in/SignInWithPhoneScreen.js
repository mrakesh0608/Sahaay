import usePhoneAuth from '@hooks/auth/usePhoneAuth';

import FormContainer from '@components/forms/FormContainer';
import SubmitBtn from '@components/elements/btn/SubmitBtn';
import { TextInput } from '@components/elements/TextInput';
import ErrorText from '@components/elements/ErrorText';

import formStyles from '@styles/formStyles';

export default function SignInWithPhoneScreen() {

    const {
        isPending, phone, code, isCodeSent, countryCode, error,
        setPhone, setCode, setCountryCode, sendCode, confirmCode
    } = usePhoneAuth();

    return (
        <FormContainer>
            <TextInput
                style={formStyles.input}
                value={countryCode}
                onChangeText={text => setCountryCode(text)}
                placeholder="Country Code"
                egText="e.g. +91 for India"
                keyboardType='phone-pad'
            />
            <TextInput
                style={formStyles.input}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Phone"
                egText="e.g. 9876543210"
                keyboardType='number-pad'
            />
            <SubmitBtn
                title={(isPending && !isCodeSent) ? 'Sending the Code ...' : 'Send Code'}
                onPress={sendCode}
                disabled={isPending}
            />
            {isCodeSent &&
                <>
                    <TextInput
                        style={formStyles.input}
                        value={code}
                        onChangeText={text => setCode(text)}

                        placeholder='OTP'
                        egText="e.g. 123456"
                        keyboardType='number-pad'

                        textContentType='oneTimeCode'
                        autoComplete='sms-otp'
                    />
                    <SubmitBtn
                        title={isPending ? 'Verifying ...' : 'Confirm Code'}
                        onPress={confirmCode}
                        disabled={isPending}
                    />
                </>
            }
            <ErrorText>{error}</ErrorText>
        </FormContainer>
    );
}