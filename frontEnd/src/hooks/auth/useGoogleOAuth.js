import { Text, Button, ToastAndroid } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import * as utils from '@utils';

import useAuthContext from '@hooks/context/useAuthContext';
import usePED from '@hooks/usePED';

export default function useGoogleOAuth() {
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
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            signOut();
        } finally {
            setIsPending(false);
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    function GoogleOAuthSignInBtn() {
        if (user) return <Text>User already exist {user.email}</Text>
        return (
            <GoogleSigninButton
                onPress={signIn}
                style={{ alignSelf: 'center' }}
            />
        );
    }

    function GoogleOAuthSignOutBtn() {
        if (!user) return <Text>User not exist {user.email}</Text>
        return <Button title='signOut' onPress={signOut} />
    }

    return {
        user, signIn, signOut, isPending,
        GoogleOAuthSignInBtn, GoogleOAuthSignOutBtn,
    }
}