import { createContext, useEffect, useReducer } from 'react';
import { useColorScheme, StatusBar } from 'react-native';

import AppLightTheme from '@utils/theme/appLightTheme';
import AppDarkTheme from '@utils/theme/appDarkTheme';

import useAuthContext from '@hooks/context/useAuthContext';

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

export const ThemeContext = createContext();

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
    const { Theme } = useAuthContext();

    useEffect(() => {
        switch (Theme) {
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
    }, [Theme, colorScheme]);

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