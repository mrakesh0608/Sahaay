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
        background: '#F9F8FB',

        card2: 'lightgreen',
        activeTint: 'tomato',
        inactiveTint: 'gray',
        placeholder: 'gray',
        nearBackground: 'lightgray',
        nearBg: 'lightgray',
        focusColor: '#1e90ff',
        error: 'red',
        success: 'green'
    }
}