import { ToastAndroid } from 'react-native';

import { haptics } from '@utils/haptics';

export async function Toast(text) {
    ToastAndroid.show(text, ToastAndroid.LONG);
}

export async function showableErrorText(error) {

    console.log(error);
    haptics('Heavy');

    if (!error) return 'Empty Error Object';
    return error.message.slice(error.message.indexOf(']') + 2);
}

export async function ToastErrorOfFirebase(error) {
    Toast(showableErrorText(error));
}