import { ToastAndroid } from 'react-native';

export async function Toast(text) {
    ToastAndroid.show(text, ToastAndroid.LONG);
}

export function showableErrorText(error) {
    if (!error) return 'Empty Error Object';
    return error.message.slice(error.message.indexOf(']') + 2);
}

export async function ToastErrorOfFirebase(error) {
    Toast(showableErrorText(error));
}