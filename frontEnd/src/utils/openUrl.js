import { Linking } from 'react-native';

export async function openUrl({ url }) {
    try {
        url = url.toString();

        if (await Linking.canOpenURL(url)) await Linking.openURL(url);
        else throw Error('');
    } catch (error) {
        console.log(error);
        alert(`Unable to open this URL:\n ${url}`);
    }
}