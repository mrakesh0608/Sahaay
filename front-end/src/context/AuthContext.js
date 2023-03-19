import { createContext, useReducer, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

import * as myfirebase from '@myfirebase';
import useInitUser from '@hooks/useInitUser';

const initialValues = {
    user: null,
    isNewUser: false,
    Theme: 'Light',
    isLoading: true,  // Set an initializing state whilst Firebase connects
}

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return { ...initialValues, isLoading: false }
        case 'SET_INFO':
            return { ...state, ...action.payload }
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload }
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_IS_NEW_USER':
            return { ...state, isNewUser: action.payload }
        case 'SET_THEME':
            if (!action.silently) myfirebase.updateUser({ Theme: action.payload });
            return { ...state, Theme: action.payload }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialValues)

    const { initUser } = useInitUser();

    useEffect(() => {

        const unsubscribe = auth().onUserChanged(async (user) => {
            if (!user) dispatch({ type: 'INIT' })
            else {
                dispatch({ type: 'SET_USER', payload: user });
                await initUser({ user, Theme: state.Theme, dispatch });
            }
        });

        myfirebase.reloadUser();
        // Unsubscribe from further state changes
        return unsubscribe;
    }, []);

    console.log('AuthContext state:', JSON.stringify(state, null, 2))

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}