import { createContext, useReducer, useEffect } from 'react'

import {
    Entypo, Ionicons, FontAwesome, Fontisto, Octicons,
    MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';
import * as Font from 'expo-font';

const initialValues = { compsLoaded: false, fontsLoaded: false }

export const LoaderContext = createContext();

export const loaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return { ...initialValues }
        case 'SET_COMPS_LOADED':
            return { ...state, compsLoaded: true }
        case 'SET_FONTS_LOADED':
            return { ...state, fontsLoaded: true }
        default:
            return state
    }
}

export const LoaderContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(loaderReducer, { ...initialValues })

    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync(Entypo.font);
                await Font.loadAsync(FontAwesome.font);
                await Font.loadAsync(Fontisto.font);
                await Font.loadAsync(Ionicons.font);
                await Font.loadAsync(MaterialIcons.font);
                await Font.loadAsync(MaterialCommunityIcons.font);
                await Font.loadAsync(Octicons.font);
            }
            catch (e) { console.warn(e); }
            finally { dispatch({ type: 'SET_FONTS_LOADED' }); }
        })();
    }, []);

    return (
        <LoaderContext.Provider value={{
            dispatch,
            isLoading: (state.compsLoaded && state.fontsLoaded) ? false : true
        }}>
            {children}
        </LoaderContext.Provider>
    )
}