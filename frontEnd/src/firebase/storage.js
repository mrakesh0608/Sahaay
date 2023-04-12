import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import * as utils from '#src/utils';

export async function uploadFile({ path, file }) {
    if (!auth().currentUser) return;

    try {
        const reference = storage().ref(path);

        await reference.putFile(file);

        const url = await reference.getDownloadURL();
        // console.log(url);
        return url;
    } catch (error) {
        utils.ToastErrorOfFirebase(error);
    }
}