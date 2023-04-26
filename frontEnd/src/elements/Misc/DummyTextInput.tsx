import React from "react";
import { Pressable } from "react-native";

import { TextInput, TextInputProps } from "./TextInput";
import { useThemeContext } from "#src/context/ThemeContext";

interface optinalProps {
    onPress: any
}

export interface DummyTextInputProps extends TextInputProps, Partial<optinalProps> { }

export function DummyTextInput({
    onPress, ...rest
}: DummyTextInputProps) {

    const { colors } = useThemeContext();

    return (
        <Pressable onPress={onPress}>
            <TextInput
                editable={false}
                editableColor={colors.text}
                {...rest}
            />
        </Pressable>
    );
};