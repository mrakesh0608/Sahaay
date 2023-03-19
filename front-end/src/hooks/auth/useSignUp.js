import { useState } from 'react'
import auth from '@react-native-firebase/auth';

import * as utils from '@utils';

export default function useSignUp() {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);

    const signup = async ({ email, password }) => {

        setIsPending(true);
        setError(null);

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User account created & signed in with email ', userCredential.user.email);
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
    return { signup, isPending, error }
}