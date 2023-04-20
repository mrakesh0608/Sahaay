import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

export function AppIcon({ style }: {
    style?: StyleProp<ImageStyle>
}) {
    return (
        <Image
            source={require('#assets/icon.png')}
            style={[{ alignSelf: 'center' }, style]}
        />
    );
}