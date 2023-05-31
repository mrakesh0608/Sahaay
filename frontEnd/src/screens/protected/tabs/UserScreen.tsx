import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { UserInfoComp, DefaultScreen, SignOutComp, ThemeComp, MenuCard, ShareApp } from '#src/components';
import React from 'react';

export default function UserScreen() {

    const { navigate } = useNavigation();

    return (
        <DefaultScreen>
            <UserInfoComp />
            <ThemeComp />
            <MenuCard
                title='App Info'
                onPress={() => navigate('App Info' as never)}
                Icon={({ color }) =>
                    <MaterialCommunityIcons
                        name='information-outline'
                        size={24} color={color}
                    />
                }
            />
            <ShareApp />
            <SignOutComp />
        </DefaultScreen>
    );
}