import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useColorScheme, StatusBar } from 'react-native';

import { useAuthContext } from '#src/context/AuthContext';

import { AppLightTheme, AppDarkTheme } from '#src/styles/Theme';

const LightTheme = {
    theme: AppLightTheme,
    isDark: AppLightTheme.dark,
    colors: AppLightTheme.colors,
}

const DarkTheme = {
    theme: AppDarkTheme,
    isDark: AppDarkTheme.dark,
    colors: AppDarkTheme.colors,
}

export const ThemeContext = createContext(LightTheme);

export function useThemeContext() {
    const context = useContext(ThemeContext)
    if (!context) throw Error('useThemeContext must be used inside an ThemeContextProvider')
    return context
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
        case 'SET_LIGHT': {
            return { ...LightTheme };
        }
        case 'SET_DARK': {
            return { ...DarkTheme };
        }
        case 'TOGGLE_THEME': {
            state = state.isDark ? LightTheme : DarkTheme;
            return { ...state };
        }
        default:
            return { ...state };
    }
}

export const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, LightTheme);

    const colorScheme = useColorScheme();
    const { theme } = useAuthContext();

    useEffect(() => {
        switch (theme) {
            case 'System Default':
                dispatch({ type: colorScheme === 'dark' ? 'SET_DARK' : 'SET_LIGHT' });
                break;
            case 'Dark':
                dispatch({ type: 'SET_DARK' });
                break;
            default:
                dispatch({ type: 'SET_LIGHT' });
                break;
        }
    }, [theme, colorScheme]);

    // console.log('ThemeContext state:', JSON.stringify(state, null, 2))

    return (
        <ThemeContext.Provider value={{ ...state, dispatch }}>
            <StatusBar
                backgroundColor={state.colors.background}
                barStyle={state.isDark ? 'light-content' : 'dark-content'}
            />
            {children}
        </ThemeContext.Provider>
    );
};