import 'react-native-gesture-handler';
import 'expo-dev-client'; //for Expo Development
import 'react-native-url-polyfill/auto'; //For ChatGPT

import {
    TouchableWithoutFeedback, Keyboard
    , Platform, UIManager,
} from 'react-native';

import { LoaderContextProvider } from '#src/context/LoaderContext';
import { AuthContextProvider } from '#src/context/AuthContext';
import { ThemeContextProvider } from '#src/context/ThemeContext';

import Navigator from "#src/navigation/Navigator";

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