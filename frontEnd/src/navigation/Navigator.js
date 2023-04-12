import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { useLoaderContext } from '#src/context/LoaderContext';
import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import ProtectedStack from '#src/navigation/stacks/ProtectedStack';
import AuthStack from "#src/navigation/stacks/AuthStack";

import { LoadingComp } from '#src/elements';

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