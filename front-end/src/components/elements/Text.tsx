import * as React from "react";
import {
    Text as RNText,
    TextProps
} from "react-native";

import useThemeContext from '@hooks/context/useThemeContext';

export default function Text(
    { style, ...rest }: React.PropsWithChildren<TextProps>
) {

    const { colors } = useThemeContext();

    return (
        <RNText
            style={[{ color: colors.text }, style]}
            {...rest}
        />
    );
}