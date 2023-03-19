import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import useThemeContext from '@hooks/context/useThemeContext';
import useAuthContext from '@hooks/context/useAuthContext';

import AuthStack from "@navigation/stacks/AuthStack";
import ProtectedStack from '@navigation/stacks/ProtectedStack';

import LoadingComp from '@components/LoadingComp';

export default function Navigator() {

    const { user, isLoading, dispatch } = useAuthContext();
    const { theme } = useThemeContext();

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
    }, []);

    if (isLoading) return <LoadingComp />

    return (
        <NavigationContainer theme={theme}>
            {user ? <ProtectedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}