import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import * as utils from '#src/utils';

import { useAuthContext } from '#src/context/AuthContext';

export function usePhoneAuth() {

    const { otpLastTime, dispatch } = useAuthContext();

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCodeSending, setIsCodeSending] = useState(false);

    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const [optTime, setOtpTime] = useState(null);

    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        if (!otpLastTime) return;

        setTimeout(() => {
            setOtpTime(utils.timer({ time: otpLastTime, limit: 90 }))
        }, 1000);
    }, [otpLastTime, optTime]);

    // Handle the button press
    async function sendCode() {
        setIsCodeSending(true);
        try {
            setIsCodeSent(false);

            const cred = await auth().signInWithPhoneNumber(`${countryCode}${phone}`);
            setCredentials(cred);

            dispatch({ type: 'SET_OTP_TIME' })

            setIsCodeSent(true);
            setError(false);
        }
        catch (error) {
            console.log(error);
            setError(await utils.showableErrorText(error))
        }
        finally { setIsCodeSending(false) }
    }

    async function resendCode() {
        try {
            setIsCodeSending(true);

            const cred = await auth().signInWithPhoneNumber(`${countryCode}${phone}`, true);
            setCredentials(cred);

            dispatch({ type: 'SET_OTP_TIME' })
            setError(false);
        }
        catch (error) {
            console.log(error);
            setError(await utils.showableErrorText(error))
        }
        finally { setIsCodeSending(false) }
    }

    async function verifyCode() {
        setIsVerifying(true);
        try {
            const user = await credentials.confirm(code);
            console.log('Phone Auth', user);
            setError(false);
        }
        catch (error) {
            setError('Invalid OTP');
            console.log(error);
        }
        finally { setIsVerifying(false) }
    }

    return {
        countryCode, phone, code,
        isCodeSent, isCodeSending, isVerifying,
        error, optTime,
        setPhone, setCode, setIsCodeSent, setCountryCode, sendCode,
        verifyCode, resendCode,
    }
}