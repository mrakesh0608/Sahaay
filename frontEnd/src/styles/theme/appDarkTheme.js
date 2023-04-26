import { DarkTheme } from '@react-navigation/native';

export default {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        text: 'white',
        card: '#222222',
        border: '#444859',
        primary: '#f9f9f9',
        background: '#121212',

        card2: '#176b5b',
        activeTint: 'tomato',
        inactiveTint: 'gray',
        placeholder: 'gray',
        nearBg: 'gray',
        focusColor: '#1e90ff',
        error: 'red',
        success: 'green'
    }
}