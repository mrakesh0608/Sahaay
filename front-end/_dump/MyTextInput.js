import { useState } from 'react';
import { TextInput } from 'react-native';

import { useTheme } from '@react-navigation/native';

export default function MyTextInput(props) {

    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);

    return (
        <TextInput
            {...props}

            onEndEditing={(e) => { setFocused(false); props.onEndEditing(e) }}
            onFocus={() => { setFocused(true) }}

            placeholderTextColor={colors.placeholder}

            style={[
                props.style,
                { color: colors.text },
                focused && { borderColor: colors.focusColor },
            ]}
        />
    );
}