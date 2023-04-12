import { createStackNavigator } from '@react-navigation/stack';

import SignInWithPhoneScreen from '#src/screens/auth/sign in/SignInWithPhoneScreen';
import SignUpScreen from '#src/screens/auth/sign in/SignUpScreen';
import SignInScreen from '#src/screens/auth/sign in/SignInScreen';

import ForgotPasswordSuccessScreen from '#src/screens/auth/forgot/ForgotPasswordSuccessScreen';
import ForgotPasswordScreen from '#src/screens/auth/forgot/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign In With Phone" component={SignInWithPhoneScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />

            <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
            <Stack.Screen name="Forgot Password Success" component={ForgotPasswordSuccessScreen} />
        </Stack.Navigator>
    );
}