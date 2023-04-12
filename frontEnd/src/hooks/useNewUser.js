import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import * as firebase from '#src/firebase';
import * as utils from '#src/utils';
import { usePED } from './usePED';

export function useNewUser() {

    const { navigate } = useNavigation();

    const { isPending, setIsPending, error, setError } = usePED();

    async function handleEmail({ email }) {
        if (!email || email === auth().currentUser.email) return;

        await auth().currentUser.updateEmail(email);
        await firebase.sendEmailVerification()
    }

    async function handlePhoneNumber({ phoneNumber }) {
        if (!phoneNumber) return;

        // auth().currentUser.updatePhoneNumber(phoneNumber).then(res => {
        //     console.log(res);
        // })
    }

    async function handleProfile({ displayName, photoURL }) {
        const up = {};

        if (displayName) up.displayName = displayName;

        if (photoURL?.uri && photoURL.uri !== auth().currentUser.photoURL) {

            const url = await firebase.uploadFile({
                path: `photoURL/${auth().currentUser.uid}`,
                file: photoURL.uri
            })
            if (url) up.photoURL = url;
        }
        if (Object.keys(up).length) {
            await auth().currentUser.updateProfile(up)
            console.log('User profile updated');
        }
    }

    const saveInfo = async (values) => {
        setIsPending(true);
        setError(null);

        const { displayName, photoURL, phoneNumber, email } = values;
        console.log(values);

        try {
            await handleEmail({ email });
            await handlePhoneNumber({ phoneNumber });
            await handleProfile({ displayName, photoURL });
            await firebase.updateUser({ age: values.age });

            await firebase.reloadUser();
            utils.haptics('Success');
            navigate('HomeTabs')
        }
        catch (error) {
            console.log(error);
            setError(await utils.showableErrorText(error));
            utils.haptics('Error');
        }
        finally { setIsPending(false); }
    }

    return { saveInfo, isPending, error }
}