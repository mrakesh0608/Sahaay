import React from 'react';

import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

export function UserEdit() {

    const { colors } = useThemeContext();
    const { user } = useAuthContext();
    const { navigate } = useNavigation();

    if (!user) return null;

    return (
        <Pressable
            hitSlop={60}
            onPress={() => navigate('UserStack' as never, { screen: 'User Edit Screen' } as never)}
            style={({ pressed }) => [{
                position: 'absolute', right: 12, top: 12,
                opacity: pressed ? 0.5 : 1
            }]}
        >
            <Feather name="edit" size={16} color={colors.text} />
        </Pressable>
    )
}