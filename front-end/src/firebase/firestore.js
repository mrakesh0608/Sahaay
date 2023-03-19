import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as utils from '@utils';

export async function initNewUser(payload) {
    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get().then(res => {
            if (res.exists) return;

            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set(payload)
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            console.log(error);
        })
}

export async function getUserFields(reqArray, cb) {

    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then(res => {
            cb(null, res.data());
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            // console.log(error);
            cb(error, null);
        })
}

export function updateUser(payload) {
    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update(payload)
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            console.log(error);
        })
}