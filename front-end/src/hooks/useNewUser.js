import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import * as myfirebase from '@myfirebase';
import * as utils from '@utils';

export default function useNewUser() {

    const { navigate } = useNavigation();

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    async function handleEmail({ email }) {
        if (!email || email === auth().currentUser.email) return;

        await auth().currentUser.updateEmail(email);
        await myfirebase.sendEmailVerification()
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

            const url = await myfirebase.uploadFile({
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
            await myfirebase.updateUser({ age: values.age });

            await myfirebase.reloadUser();
            utils.haptics('Success');
            navigate('HomeTabs')
        }
        catch (error) {
            console.log(error);
            setError(utils.showableErrorText(error));
            utils.haptics('Error');
        }
        finally { setIsPending(false); }
    }

    return { saveInfo, isPending, error }
}