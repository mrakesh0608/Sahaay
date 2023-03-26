import 'react-native-gesture-handler';
import 'expo-dev-client';

import {
    TouchableWithoutFeedback, Keyboard
    , Platform, UIManager,
} from 'react-native';

import { LoaderContextProvider } from '@context/LoaderContext';
import { AuthContextProvider } from '@context/AuthContext';
import { ThemeContextProvider } from '@context/ThemeContext';

import Navigator from "@navigation/Navigator";

//to animate TextInput, etc.
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    return (
        <LoaderContextProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <AuthContextProvider>
                    <ThemeContextProvider>
                        <Navigator />
                    </ThemeContextProvider>
                </AuthContextProvider>
            </TouchableWithoutFeedback>
        </LoaderContextProvider>
    );
}