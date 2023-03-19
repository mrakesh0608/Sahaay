import 'react-native-gesture-handler';
import 'expo-dev-client';

import { AuthContextProvider } from '@context/AuthContext';
import { ThemeContextProvider } from '@context/ThemeContext';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import Navigator from "@navigation/Navigator";

export default function App() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <Navigator />
                </ThemeContextProvider>
            </AuthContextProvider>
        </TouchableWithoutFeedback>
    );
}