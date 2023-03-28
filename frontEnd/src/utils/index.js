import { Dimensions } from 'react-native';

// export const serverAPI = 'http://192.168.0.115:8080';
export const serverAPI = 'http://192.168.0.108:8080';
// export const serverAPI =  'https://sahaay.onrender.com';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export function randomNumBetween(min, max) {
    // min and max included 
    return min + Math.floor(Math.random() * (1 + max - min))
}

export * from './haptics';
export * from './openUrl';
export * from './time';
export * from './toast';
export * from './uploadImage';