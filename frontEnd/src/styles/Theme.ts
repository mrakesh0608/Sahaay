import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const commonColors = {
    error: 'red',
    success: 'green'
}

export const AppLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        ...commonColors,
        text: 'black',
        card: '#EEE',
        border: '#9F9F9F',
        primary: '#333333',
        background: '#F9F8FB',

        card2: 'lightgreen',
        activeTint: '#10847E',
        inactiveTint: 'gray',
        placeholder: 'gray',
        nearBackground: 'lightgray',
        nearBg: 'lightgray',
        focusColor: '#1e90ff',
    }
}

export const AppDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        ...commonColors,
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
        focusColor: '#1e90ff'
    }
}