import { useState } from 'react';
import auth from '@react-native-firebase/auth';

import * as utils from '@utils';

export default function usePhoneAuth() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const [countryCode, setCountryCode] = useState('+91');
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [isCodeSent, setIsCodeSent] = useState(false);

    // verification code (OTP)
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');

    // Handle the button press
    async function sendCode() {
        setIsPending(true);
        try {
            const confirmation = await auth().signInWithPhoneNumber(`${countryCode} ${phone}`);
            setConfirm(confirmation);

            setIsCodeSent(true);
        } catch (error) {
            setError(utils.showableErrorText(error))
            console.log(error);
        }
        finally {
            setIsPending(false);
        }
    }

    async function confirmCode() {
        setIsPending(true);
        try {
            const user = await confirm.confirm(code);
            console.log('Phone Auth', user);
        }
        catch (error) {
            setError('Invalid OTP');
            console.log(error);
        }
        finally {
            setIsPending(false);
        }
    }

    return {
        phone, code, isCodeSent, countryCode, isPending, error,
        setPhone, setCode, setCountryCode, sendCode,
        confirmCode
    }
}