import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import UserEditScreen from '#src/screens/protected/UserEditScreen';
import UserProfile from '#src/screens/protected/UserProfile';

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="User Edit Screen" component={UserEditScreen} />
            <Stack.Screen name="User Profile" component={UserProfile} />
        </Stack.Navigator>
    );
}