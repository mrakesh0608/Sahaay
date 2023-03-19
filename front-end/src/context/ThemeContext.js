import { createContext, useEffect, useReducer } from 'react';
import { useColorScheme, StatusBar } from 'react-native';

import AppLightTheme from '@utils/theme/appLightTheme';
import AppDarkTheme from '@utils/theme/appDarkTheme';

import useAuthContext from '@hooks/context/useAuthContext';

const initialTheme = {
    theme: AppLightTheme,
    get isDark() {
        return this.theme.dark;
    },
    get colors() {
        return this.theme.colors;
    }
}

function stateWithGetters(state) {
    return {
        ...state,
        get isDark() {
            return this.theme.dark;
        },
        get colors() {
            return this.theme.colors;
        }
    }
}

export const ThemeContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            state = { ...initialTheme }
            return stateWithGetters({ ...state });
        }
        case 'SET_LIGHT': {
            state.theme = AppLightTheme;
            return stateWithGetters({ ...state });
        }
        case 'SET_DARK': {
            state.theme = AppDarkTheme;
            return stateWithGetters({ ...state });
        }
        case 'TOGGLE_THEME': {
            state.theme = state.isDark ? AppLightTheme : AppDarkTheme;
            return stateWithGetters({ ...state });
        }
        default:
            return stateWithGetters({ ...state });
    }
}

export const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialTheme);

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