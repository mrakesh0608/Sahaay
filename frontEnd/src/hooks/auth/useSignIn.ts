import auth from '@react-native-firebase/auth';

import * as firebase from '#src/firebase';
import * as utils from '#src/utils';
import { usePED } from '#src/hooks/usePED';

export function useSignIn() {

    const { isPending, setIsPending, error, setError } = usePED();

    const signin = async ({ email, password }) => {
        console.log(email, password);
        setIsPending(true);
        setError(null);

        auth().
            signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User Logged in with email ', user.email);

                utils.haptics('Success');
                firebase.sendEmailVerification();
            })
            .catch(async error => {
                console.log(error);
                setError(await utils.showableErrorText(error));
            })
            .finally(() => { setIsPending(false) })
    }
    return { signin, isPending, error }
}