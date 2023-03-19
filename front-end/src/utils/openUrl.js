import { Linking, Alert } from 'react-native';

export async function openUrl({ url }) {
    if (url) {
        url = url.toString();
        if (await Linking.canOpenURL(url)) await Linking.openURL(url);
    }
    else Alert.alert(`Unable to open this URL:\n ${url}`);
}