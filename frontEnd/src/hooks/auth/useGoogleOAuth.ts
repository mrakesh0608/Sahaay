import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { useAuthContext } from '#src/context/AuthContext';
import { usePED } from '#src/hooks/usePED';
import * as utils from '#src/utils';

export function useGoogleOAuth() {
    const { isPending, setIsPending } = usePED();
    const { user } = useAuthContext();

    GoogleSignin.configure({
        webClientId: '25810055892-0agud1s2l3tfo87669b1t01bclsmj6ar.apps.googleusercontent.com',
    });

    async function signIn() {
        try {
            setIsPending(true);
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential).then(user => {
                // console.log(JSON.stringify({googleCredential,user}, null, 2));
                utils.haptics('Success');
            })
        } catch (error) {
            console.log(error);
            utils.Toast(error.message)
            signOut();
        } finally {
            setIsPending(false);
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return {
        user,
        isPending,
        signIn, signOut,
    }
}