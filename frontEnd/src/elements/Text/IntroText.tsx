import * as React from "react";
import {
    Text as RNText,
    TextProps
} from "react-native";

import { useThemeContext } from '#src/context/ThemeContext';

export function IntroText(
    { style, children, ...rest }: React.PropsWithChildren<TextProps>
) {

    const { colors } = useThemeContext();
    return (
        <RNText
            style={[{
                color: colors.text,
                marginVertical: 18,
                textAlign: 'justify'
            }, style]}

            children={`\t\t\t\t${children}`}
            {...rest}
        />
    );
}