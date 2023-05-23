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
        .collection('Reports')
        .doc(id)
        .get()
        .then(res => {
            const data = res.data();
            if (data) cb(null, data);
            else throw Error("Something Went Wrong")
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}

export async function addReport(payload: any, cb: any) {

    if (!auth().currentUser) return;
    payload['createdAt'] = firestore.FieldValue.serverTimestamp();

    firestore()
        .collection('Reports')
        .add({ ...payload })
        .then(res => {
            cb(null, { status: 200, id: res.id });
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}