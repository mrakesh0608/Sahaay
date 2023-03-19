import * as React from "react";
import {
    NativeSyntheticEvent,
    TextInput as RNTextInput,
    TextInputFocusEventData,
    TextInputProps as RNTextInputProps,
    View,
    Platform,
    UIManager,
    LayoutAnimation
} from "react-native";

import useThemeContext from '@hooks/context/useThemeContext';

import Text from '@components/elements/Text'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface optinalProps {
    egText: any,
    errTxt: any,
    errTxtColor: string
}

export interface TextInputProps extends RNTextInputProps, Partial<optinalProps> { }

export function TextInput({
    style, onFocus, onBlur, egText, placeholder, errTxt, errTxtColor = 'red', ...rest
}: React.PropsWithChildren<TextInputProps>) {

    const { colors } = useThemeContext();

    const inputElement = React.useRef();
    const [isFocused, setIsFocused] = React.useState(false);
    const [labelPosTop, selLabelPosTop] = React.useState(25);

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true);
        selLabelPosTop(1);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (typeof onFocus === 'function') onFocus(e);
    };

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {

        setIsFocused(false);
        if (rest.value === '') {
            selLabelPosTop(25);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }

        if (typeof onBlur === 'function') onBlur(e);
    };

    function handleLabelPress() {
        inputElement.current?.focus();
    }

    return (
        <View style={{ marginVertical: 5 }}>
            <RNTextInput
                ref={inputElement}
                onFocus={handleFocus}
                onBlur={handleBlur}

                selectionColor={'#428AF8'}

                placeholderTextColor={colors.placeholder}
                placeholder={isFocused ? egText : ''}

                style={[
                    { color: colors.text },
                    style,
                    isFocused && { borderColor: colors.focusColor },
                    errTxt && errTxtColor && { borderColor: errTxtColor },
                    rest.editable === false && { color: 'gray', borderColor: '#ddd' }

                ]}

                {...rest}
            />
            <Text
                onPress={handleLabelPress}
                style={[
                    {
                        paddingHorizontal: 8,
                        backgroundColor: colors.background,

                        position: 'absolute',
                        left: 8,
                        top: labelPosTop,
                    },
                    isFocused && { color: colors.focusColor },
                    (isFocused || rest.value !== '') ? { fontSize: 12, top: 1 } : { color: colors.placeholder },
                    errTxt && { color: errTxtColor },
                    rest.editable === false && { color: 'gray' }
                ]}
            >{placeholder}</Text>
            {errTxt && <Text style={{ color: errTxtColor, alignSelf: 'center' }}>{errTxt}</Text>}
        </View>
    );
}