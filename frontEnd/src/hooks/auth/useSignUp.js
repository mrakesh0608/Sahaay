import auth from '@react-native-firebase/auth';

import * as utils from '#src/utils';
import { usePED } from '#src/hooks/usePED';

export function useSignUp() {

    const { isPending, setIsPending, error, setError } = usePED();

    const signup = async ({ email, password }) => {

        setIsPending(true);
        setError(null);

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User account created & signed in with email ', userCredential.user.email);
                utils.haptics('Success');
            })
            .catch(async error => {
                setError(await utils.showableErrorText(error));
            })
            .finally(() => {
                setIsPending(false)
            })

    }
    return { signup, isPending, error }
}