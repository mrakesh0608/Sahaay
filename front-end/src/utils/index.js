import { Dimensions } from 'react-native';

export const serverAPI = 'http://192.168.0.115:8080';
// export const serverAPI =  'http://192.168.0.108:8080';
// export const serverAPI =  'https://sahaay.onrender.com';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export * from '@utils/alert';
export * from '@utils/haptics';
export * from '@utils/openUrl';
export * from '@utils/time';
export * from '@utils/toast';
export * from '@utils/uploadImage';