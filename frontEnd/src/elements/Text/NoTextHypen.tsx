import * as React from "react";
import {
    Text as RNText,
    TextProps
} from "react-native";

import { useThemeContext } from '#src/context/ThemeContext';

export function NoTextHypen(
    { style, children, ...rest }: React.PropsWithChildren<TextProps>
) {

    const { colors } = useThemeContext();
    return (
        <RNText
            style={[{
                color: colors.text,
            }, style]}

            children={children ? children : '-'}
            {...rest}
        />
    );
}