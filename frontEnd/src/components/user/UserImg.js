import React from 'react'
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

export function UserImg({ width = 80, height = 80, borderRadius = 14 }) {
    const { colors } = useThemeContext();

    const { user } = useAuthContext();
    const { photoURL } = user;

    return (
        <>
            {photoURL ?
                <Image
                    source={{ uri: photoURL }}
                    style={{
                        width,
                        height,
                        borderRadius
                    }}
                /> : <FontAwesome name='user-o' size={80} color={colors.text} />
            }
        </>
    )
}