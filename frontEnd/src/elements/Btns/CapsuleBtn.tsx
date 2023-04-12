import React from "react";
import { useThemeContext } from '#src/context/ThemeContext';

import { MyBtn, MyBtnProps } from "./MyBtn";

export function CapsuleBtn({
    containerStyle, textStyle, ...rest
}: React.PropsWithChildren<MyBtnProps>) {

    const { colors } = useThemeContext();

    return (
        <MyBtn
            containerStyle={[{
                alignSelf: 'center',

                borderRadius: 25,
                paddingHorizontal: 24,
                paddingVertical: 10,
                marginVertical: 10,

                backgroundColor: colors.nearBg,
            },
                containerStyle
            ]}
            textStyle={[{
                letterSpacing: 1.2,
                marginLeft: 10,
                fontWeight: 'bold',
            },
                textStyle
            ]}
            {...rest}
        />
    );
}
