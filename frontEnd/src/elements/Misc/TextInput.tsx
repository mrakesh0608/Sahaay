import * as React from "react";
import {
    NativeSyntheticEvent,
    TextInput as RNTextInput,
    TextInputFocusEventData,
    TextInputProps as RNTextInputProps,
    View,
    LayoutAnimation,
    ColorValue
} from "react-native";

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '../Text';

interface optinalProps {
    egText: string,
    errTxt: string,
    errTxtColor: ColorValue,
    editableColor: ColorValue
}

export interface TextInputProps extends RNTextInputProps, Partial<optinalProps> { }

export function TextInput({
    value,
    style, onFocus, onBlur,
    egText, placeholder,
    errTxt, errTxtColor = 'red',
    editableColor = 'gray',
    ...rest
}: TextInputProps) {

    //to fix null issue with textinput
    value = value ? value : '';

    const { colors } = useThemeContext();

    const inputElement = React.useRef<RNTextInput>();
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
        if (value === '') {
            selLabelPosTop(25);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }

        if (typeof onBlur === 'function') onBlur(e);
    };

    function handleLabelPress() {
        inputElement.current?.focus();
    }

    return (
        <View style={{ marginVertical: 5 }}>
            <RNTextInput
                value={value}
                ref={inputElement}
                onFocus={handleFocus}
                onBlur={handleBlur}

                selectionColor={'#428AF8'}

                placeholderTextColor={colors.placeholder}
                placeholder={isFocused ? egText : ''}

                style={[
                    { color: colors.text },
                    {
                        marginTop: 10,
                        marginBottom: 5,
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 6,
                    },
                    style,
                    isFocused && { borderColor: colors.focusColor },
                    errTxt && errTxtColor && { borderColor: errTxtColor },
                    rest.editable === false && { color: editableColor, borderColor: '#ddd' }

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
                    (isFocused || value !== '') ? { fontSize: 12, top: 1 } : { color: colors.text },
                    errTxt && { color: errTxtColor },
                    rest.editable === false && { color: editableColor }
                ]}
            >{placeholder}</Text>
            {errTxt && <Text style={{ color: errTxtColor, alignSelf: 'center' }}>{errTxt}</Text>}
        </View>
    );
}