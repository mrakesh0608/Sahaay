import usePhoneAuth from '@hooks/auth/usePhoneAuth';

import { SubmitBtn, TransparentBtn, Text, TextInput } from '@components/elements';
import FormContainer from '@components/forms/FormContainer';

export default function SignInWithPhoneScreen() {

    const {
        countryCode, phone, code,
        isCodeSent, isCodeSending, isVerifying,
        error, optTime,
        setPhone, setCode, setIsCodeSent, setCountryCode, sendCode,
        verifyCode, resendCode,
    } = usePhoneAuth();

    return (
        <FormContainer>
            {isCodeSent ? <>
                <Text style={{ textAlign: 'center' }}>
                    {`We have sent a SMS with a code to\n${countryCode} ${phone}. `}
                    <Text
                        style={{ color: 'darkblue' }}
                        onPress={() => setIsCodeSent(false)}
                    >Wrong number?</Text></Text>

                <TextInput
                    value={code}
                    onChangeText={text => setCode(text)}

                    placeholder='Code'
                    egText="Enter 6-digit code"

                    keyboardType='number-pad'

                    textContentType='oneTimeCode'
                    autoComplete='sms-otp'
                />
                <SubmitBtn
                    title={isVerifying ? 'Verifying' : 'Verify'}
                    onPress={verifyCode}
                    isPending={isVerifying}

                    errTxt={error}
                />
                <TransparentBtn
                    title='Did not receive code?'
                    onPress={resendCode}
                    isPending={isCodeSending}
                    disabled={optTime ? true : false}
                />
                {optTime &&
                    <Text
                        style={{ alignSelf: 'center' }}
                    >You can request a new code in {optTime} seconds</Text>
                }
            </> : <>
                <TextInput
                    value={countryCode}
                    onChangeText={text => setCountryCode(text)}
                    placeholder="Country Code"
                    egText="e.g. +91 for India"
                    keyboardType='phone-pad'
                />
                <TextInput
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    placeholder="Phone"
                    egText="e.g. 9876543210"
                    keyboardType='number-pad'
                />

                <SubmitBtn
                    title={isCodeSending ? 'Sending the Code' : 'Send Code'}
                    onPress={sendCode}
                    isPending={isCodeSending}

                    errTxt={error}
                />
            </>}
        </FormContainer>
    );
}