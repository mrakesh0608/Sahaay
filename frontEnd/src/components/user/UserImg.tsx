import React from 'react'
import { Image, ImageProps, StyleProp, View, ViewStyle,ImageStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

export function UserImg({
    url,
    containerStyle,
    imgStyle
}: {
    url?: string,
    containerStyle?: StyleProp<ViewStyle>
    imgStyle?: StyleProp<ImageStyle>,

}) {
    const { colors } = useThemeContext();

    const { user } = useAuthContext();
    const { photoURL } = user;

    return (
        <View style={containerStyle}>
            {(url || photoURL) ?
                <Image
                    source={{ uri: url ? url : photoURL }}
                    style={[{
                        width: 80, height: 80,
                        borderRadius: 14
                    }, imgStyle]}
                /> : <FontAwesome name='user-o' size={80} color={colors.text} />
            }
        </View>
    )
}