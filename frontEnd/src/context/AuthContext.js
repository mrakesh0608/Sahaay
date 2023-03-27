import { createContext, useReducer, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

import * as myfirebase from '@myfirebase';

import useInitUser from '@hooks/useInitUser';

const initialValues = {
    user: null,
    isNewUser: false,
    Theme: 'Light',
}

export const AuthContext = createContext();

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
            myfirebase.updateUser({ Theme: action.payload });
            return { ...state, Theme: action.payload }
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
                await initUser({ user, Theme: state.Theme, dispatch });
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