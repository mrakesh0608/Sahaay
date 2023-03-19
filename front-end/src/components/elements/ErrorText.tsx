import * as React from "react";
import {
    Text as RNText,
    TextProps
} from "react-native";

export default function ErrorText(
    { style, ...rest }: React.PropsWithChildren<TextProps>
) {

    if (rest.children) {
        return (
            <RNText
                style={[
                    { color: 'red', textAlign: 'justify' },
                    style
                ]}
                {...rest}
            />
        );
    }
}