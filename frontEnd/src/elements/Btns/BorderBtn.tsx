import React from 'react';

import { useThemeContext } from '#src/context/ThemeContext';

import { MyBtn, MyBtnProps } from './MyBtn';

export function BorderBtn({
    containerStyle, ...rest
}: React.PropsWithChildren<MyBtnProps>) {

    const { colors } = useThemeContext();

    return (
        <MyBtn
            containerStyle={[{
                flexDirection: 'column',

                borderWidth: 1,
                borderRadius: 8,
                margin: 10,
                padding: 20,

                borderColor: colors.nearBg,
            },
                containerStyle
            ]}
            {...rest}
        />
    );
}