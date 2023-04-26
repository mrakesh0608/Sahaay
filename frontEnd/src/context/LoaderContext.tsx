import React, { createContext, useContext, useReducer, useEffect } from 'react'

import {
    Entypo, Ionicons, FontAwesome, Fontisto, Octicons,
    MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';

import * as Font from 'expo-font';
import remoteConfig from '@react-native-firebase/remote-config';

const initialValues = {
    compsLoaded: false,
    fontsLoaded: false,
}

export const LoaderContext = createContext(initialValues);

export function useLoaderContext() {

    const context = useContext(LoaderContext)

    if (!context) throw Error('useLoaderContext must be used inside an LoaderContextProvider')

    return context
}

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

    const [state, dispatch] = useReducer(loaderReducer, initialValues)

    useEffect(() => {
        (async () => {
            try {
                remoteConfig()
                    .fetchAndActivate()
                    .then(fetchedRemotely => {
                        // if (fetchedRemotely) console.log('Configs were retrieved from the backend and activated.');
                        // else console.log('No configs were fetched from the backend, and the local configs were already activated');
                    });

                await Font.loadAsync(Entypo.font);
                await Font.loadAsync(FontAwesome.font);
                await Font.loadAsync(Fontisto.font);
                await Font.loadAsync(Ionicons.font);
                await Font.loadAsync(MaterialIcons.font);
                await Font.loadAsync(MaterialCommunityIcons.font);
                await Font.loadAsync(Octicons.font);
                await Font.loadAsync({
                    IcoMoon: require('#src/icons/icomoon.ttf'),
                });
            }
            catch (e) { console.warn(e); }
            finally { dispatch({ type: 'SET_FONTS_LOADED' }); }
        })();
    }, []);

    return (
        <LoaderContext.Provider
            value={{
                ...state,
                isLoading: !(state.compsLoaded && state.fontsLoaded),
                dispatch,
            }}
        >
            {children}
        </LoaderContext.Provider>
    )
}