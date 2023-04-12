import { useEffect, useState } from 'react';

import { CenterView, Text } from '#src/elements';

import gStyles from '#src/styles/gStyles';

export default function ForgotPasswordSuccessScreen({ navigation }) {

    const [time, setTime] = useState(5);

    useEffect(() => {
        setTimeout(() => {
            if (time > 0) setTime(time - 1);
            else navigation.navigate('Sign In');
        }, 1000);
    }, [time]);

    return (
        <CenterView>
            <Text style={gStyles.txtSuccess}>Success</Text>
            <Text style={{ marginBottom: 20 }}>Check your email for a reset link</Text>
            <Text>Redirecting to Sign In page in {time} sec</Text>
        </CenterView>
    );
}