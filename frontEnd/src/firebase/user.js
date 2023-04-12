import auth from '@react-native-firebase/auth';

import * as utils from '#src/utils';

export async function reloadUser() {
    try {
        await auth().currentUser?.reload()
    } catch (error) {
        utils.ToastErrorOfFirebase(error);
    }
}

export async function sendEmailVerification() {

    const user = auth().currentUser;
    if (!user || !user.email || user.emailVerified) return;

    auth()
        .currentUser
        .sendEmailVerification()
        .then(() => {
            console.log('Email sent');
            utils.Toast('Email sent');
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
        })
}