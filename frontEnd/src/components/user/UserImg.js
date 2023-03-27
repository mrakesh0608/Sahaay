import React from 'react'
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import useAuthContext from '@hooks/context/useAuthContext'
import useThemeContext from '@hooks/context/useThemeContext';

export default function UserImg() {
    const { colors } = useThemeContext();

    const { user } = useAuthContext();
    const { photoURL } = user;

    return (
        <>
            {photoURL ?
                <Image
                    source={{ uri: photoURL }}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 14,
                    }}
                /> : <FontAwesome name={'user-o'} size={80} color={colors.text} />
            }
        </>
    )
}