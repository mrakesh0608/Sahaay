import { Octicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

import * as utils from '@utils';
import * as myfirebase from '@myfirebase';

import useThemeContext from '@hooks/context/useThemeContext';

export default function EmailVerifComp() {

    const { colors } = useThemeContext();

    const { displayName, emailVerified } = auth().currentUser;

    async function handleEmailVerification() {
        if (emailVerified) window.alert('Your email address has been verified');
        else if (await utils.alert({
            title: `Dear ${displayName}, your email address has not been verified.\n\nClick on "Send" to get the verification link.`,
            Yes: 'Send',
            No: 'Cancel'
        })) {
            myfirebase.sendEmailVerification();
        }
    }

    return (
        <Octicons
            name={emailVerified ? "verified" : "unverified"}
            size={20}
            color={colors.text}

            onPress={handleEmailVerification}
        />
    )
}

