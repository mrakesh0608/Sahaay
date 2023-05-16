import React from 'react';
import { View, ViewProps } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

export function CenterView({ style, ...rest }: ViewProps) {

    const { colors } = useThemeContext();

    return (
        <View
            style={[{
                backgroundColor: colors.background,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
                style
            ]}
            {...rest}
        />
    );
}