import { Linking } from 'react-native';

export function processURL(url: string) {

    const k = new URL(url);

    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};

    let match: any[];
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }

    return ({
        hostname: k.hostname,
        pathname: k.pathname,
        params
    });
}


export async function openUrl({ url = '' }: {
    url?: string
}) {
    try {
        url = url.toString();

        if (await Linking.canOpenURL(url)) await Linking.openURL(url);
        else throw Error('');
    } catch (error) {
        console.log(error);
        alert(`Unable to open this URL:\n ${url}`);
    }
}