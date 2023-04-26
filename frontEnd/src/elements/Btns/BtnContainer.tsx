import React from 'react';
import { View, ViewProps } from 'react-native';

export function BtnContainer({ style, ...rest }: ViewProps) {
    return (
        <View
            style={[{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10
            }, style
            ]}
            {...rest}
        />
    )
};