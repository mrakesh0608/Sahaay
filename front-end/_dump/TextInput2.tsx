import * as React from "react";
import {
    NativeSyntheticEvent,
    TextInput as RNTextInput,
    TextInputFocusEventData,
    TextInputProps,
    View,
    Text,
    Animated,
} from "react-native";

import useThemeContext from '@hooks/context/useThemeContext';

interface myProps extends TextInputProps {
    errTxt: any,
    errTxtColor: string
}

export default function TextInput({
    style, onFocus, onBlur, placeholder, errTxt, errTxtColor, ...rest
}: React.PropsWithChildren<myProps>) {

    const { colors } = useThemeContext();

    const [isFocused, setIsFocused] = React.useState(false);

    const moveAni = React.useRef(new Animated.Value(25)).current;
    const [labelDisplay, setLabelDisplay] = React.useState(false);

    const moveUp = () => {
        setLabelDisplay(true);
        Animated.timing(moveAni, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const moveDown = () => {
        Animated.timing(moveAni, {
            toValue: 25,
            duration: 200,
            useNativeDriver: false,
        }).start(() => { setLabelDisplay(false); });
    };

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true);
        moveUp();

        if (typeof onFocus === 'function') onFocus(e);
    };

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(false);
        if (rest.value === '') moveDown();

        if (typeof onBlur === 'function') onBlur(e);
    };

    return (
        <View>
            <RNTextInput
                onFocus={handleFocus}
                onBlur={handleBlur}

                selectionColor={'#428AF8'}

                placeholderTextColor={colors.placeholder}
                placeholder={isFocused ? 'sssssssssssssssssssss' : placeholder}

                style={[
                    { color: colors.text },
                    style,
                    isFocused && { borderColor: colors.focusColor },
                    errTxt && errTxtColor && { borderColor: errTxtColor }
                ]}

                {...rest}
            />
            <Animated.Text
                style={[
                    {
                        paddingHorizontal: 8,
                        position: 'absolute',
                        left: 8,
                        color: colors.text,
                        backgroundColor: colors.background,
                        top: moveAni,
                        display: labelDisplay ? 'flex' : 'none',
                    },
                    isFocused && { color: colors.focusColor },
                    (isFocused || rest.value !== '') ?
                        { fontSize: 12 } :
                        { color: colors.placeholder },
                    errTxt && errTxtColor && { color: errTxtColor }
                ]}
            >{placeholder}</Animated.Text>
            {errTxt && <Text style={{ color: errTxtColor ? errTxtColor : 'red' }}>{errTxt}</Text>}
        </View>
    );
}