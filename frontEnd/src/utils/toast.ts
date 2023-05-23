import { ToastAndroid } from 'react-native';

import { haptics } from './haptics';

export async function Toast(text: string = '') {
    ToastAndroid.show(text, ToastAndroid.LONG);
}

export async function showableErrorText(error: any) {

    console.log(error);
    haptics('Heavy');

    if (!error) return 'Empty Error Object';
    return error.message.slice(error.message.indexOf(']') + 2);
}

export async function ToastErrorOfFirebase(error: any) {
    Toast(await showableErrorText(error));
}