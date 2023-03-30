import { createStackNavigator } from '@react-navigation/stack';
import Chat from '@screens/protected/Chat';

const Stack = createStackNavigator();

export default function ChatStack() {
    return (
        <Stack.Navigator
           
        >
            <Stack.Screen name="ChatS" component={Chat} />
        </Stack.Navigator>
    );
}