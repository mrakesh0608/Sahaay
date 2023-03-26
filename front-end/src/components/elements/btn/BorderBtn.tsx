import React from 'react';

import useThemeContext from '@hooks/context/useThemeContext';

import { MyBtn, MyBtnProps } from '@components/elements/btn/MyBtn';

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

                borderColor: colors.nearBackground,
            },
                containerStyle
            ]}
            {...rest}
        />
    );
}