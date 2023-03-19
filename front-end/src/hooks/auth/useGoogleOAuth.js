import { Text, Button, ToastAndroid } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import useAuthContext from '@hooks/context/useAuthContext';

export default function useGoogleOAuth() {

    const { user } = useAuthContext();

    GoogleSignin.configure({
        webClientId: '25810055892-0agud1s2l3tfo87669b1t01bclsmj6ar.apps.googleusercontent.com',
    });

    async function signIn() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential).then(user => {
                // console.log(JSON.stringify({googleCredential,user}, null, 2));
            })
        } catch (error) {
            console.log(error);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            signOut();
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

    return { user, GoogleOAuthSignInBtn, GoogleOAuthSignOutBtn, signIn, signOut }
}