import { useState } from 'react'
import auth from '@react-native-firebase/auth';

import * as myfirebase from '@myfirebase';
import * as utils from '@utils';

export default function useSignIn() {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);

    const signin = async ({ email, password }) => {
        console.log(email, password);
        setIsPending(true);
        setError(null);

        auth().
            signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User Logged in with email ', user.email);

                myfirebase.sendEmailVerification();
            })
            .catch(error => {
                console.log(error);
                setError(utils.showableErrorText(error));
                utils.haptics('Heavy')
            })
            .finally(() => {
                setIsPending(false)
            })
    }
    return { signin, isPending, error }
}