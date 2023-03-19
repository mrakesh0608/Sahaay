import { useEffect, useState } from 'react';

import { View } from 'react-native';
import Text from "@components/elements/Text";

import gStyles from '@styles/gStyles';

export default function ForgotPasswordSuccessScreen({ navigation }) {

    const [time, setTime] = useState(5);

    useEffect(() => {
        setTimeout(() => {
            if (time > 0) setTime(time - 1);
            else navigation.navigate('Sign In');
        }, 1000);
    }, [time]);

    return (
        <View style={gStyles.centerView}>
            <Text style={gStyles.txtSuccess}>Success</Text>
            <Text>Check your email for a reset link</Text>
            <View style={{ marginVertical: 20 }}></View>
            <Text>Redirecting to Sign In page in {time} sec</Text>
        </View>
    );
}