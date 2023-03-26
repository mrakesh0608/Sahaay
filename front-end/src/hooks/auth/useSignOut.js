import auth from '@react-native-firebase/auth';

import * as utils from '@utils';

import useGoogleOAuth from '@hooks/auth/useGoogleOAuth';

export default function useSignOut() {

    const { signOut: GSignOut } = useGoogleOAuth();

    function signOut() {

        if (auth().currentUser?.providerData[0]?.providerId === 'google.com') GSignOut();

        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                utils.haptics('Medium');
                utils.Toast('Signed Out !!');
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return { signOut }
}