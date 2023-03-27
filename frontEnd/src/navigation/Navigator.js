import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import useLoaderContext from '@hooks/context/useLoaderContext';
import useThemeContext from '@hooks/context/useThemeContext';
import useAuthContext from '@hooks/context/useAuthContext';

import ProtectedStack from '@navigation/stacks/ProtectedStack';
import AuthStack from "@navigation/stacks/AuthStack";

import LoadingComp from '@components/LoadingComp';

export default function Navigator() {

    const { user } = useAuthContext();
    const { isLoading, dispatch } = useLoaderContext();
    const { theme } = useThemeContext();

    useEffect(() => {
        dispatch({ type: 'SET_COMPS_LOADED' });
    }, [isLoading]);

    if (isLoading) return <LoadingComp />

    return (
        <NavigationContainer theme={theme}>
            {user ? <ProtectedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}