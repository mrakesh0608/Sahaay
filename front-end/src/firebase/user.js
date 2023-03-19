import * as utils from '@utils';

import auth from '@react-native-firebase/auth';

export async function reloadUser() {
    try {
        await auth().currentUser?.reload()
    } catch (error) {
        console.log(error);
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
        }).catch(error => {
            console.log(error);
            utils.ToastErrorOfFirebase(error);
        })
}