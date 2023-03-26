import { DefaultTheme } from '@react-navigation/native';

export default {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        text: 'black',
        card: '#EEE',
        border: '#9F9F9F',
        primary: '#333333',
        background: '#FFFFFF',

        placeholder: 'gray',
        nearBackground: 'lightgray',
        focusColor: '#1e90ff',
    }
}