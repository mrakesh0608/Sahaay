import React, { createContext, useContext, useReducer, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

import * as firebase from '#src/firebase';
import { useInitUser } from '#src/hooks/useInitUser';

const initialValues = {
    user: null,
    isNewUser: false,
    theme: 'Light',
    dob: '',
    gender: '',
    bloodgroup: ''
}

export const AuthContext = createContext(initialValues);

export function useAuthContext() {

    const context = useContext(AuthContext)

    if (!context) throw Error('useAuthContext must be used inside an AuthContextProvider')

    return context
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return { ...initialValues }
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_INFO':
            return { ...state, ...action.payload }
        case 'SET_IS_NEW_USER':
            return { ...state, isNewUser: action.payload }
        case 'SET_THEME':
            firebase.updateUser({ theme: action.payload });
            return { ...state, theme: action.payload }
        case 'SET_OTP_TIME':
            return { ...state, otpLastTime: new Date() }
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
                await initUser({ user, theme: state.theme, dispatch });
            }
        });
        return unsubscribe; // Unsubscribe from further state changes
    }, []);

    useEffect(() => {
        // console.log('AuthContext state:', JSON.stringify(state, null, 2));
    }, [state]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}