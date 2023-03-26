import * as React from "react";
import {
    Text as RNText,
    TextProps
} from "react-native";

export function ErrorText(
    { style, ...rest }: React.PropsWithChildren<TextProps>
) {

    if (rest.children) {
        return (
            <RNText
                style={[{
                    color: 'red',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10
                },
                    style
                ]}
                {...rest}
            />
        );
    }
}