import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as utils from '#src/utils';

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
        })
}

export async function getUserFields(reqArray, cb) {
    getUserFieldsById(auth().currentUser.uid, cb);
}

export async function getUserFieldsById(id, cb) {

    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(id)
        .get()
        .then(res => {
            cb(null, res.data());
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
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
        })
}

export async function getReportById(id, cb) {

    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Reports')
        .doc(id)
        .get()
        .then(res => {
            cb(null, res.data());
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}

export async function deleteReportById(id, cb) {

    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Reports')
        .doc(id)
        .delete()
        .then(res => {
            cb(null, res?.data());
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}