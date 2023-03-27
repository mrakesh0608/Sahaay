import { createStackNavigator } from '@react-navigation/stack';

import UserEditScreen from '@screens/protected/UserEditScreen';

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="User Edit Screen" component={UserEditScreen} />
        </Stack.Navigator>
    );
}