import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';
import { Greet } from '#src/utils';

import { DefaultScreen, ModelList, ToolsList, UserImg } from '#src/components';
import { Text } from '#src/elements';

export default function HomeScreen({ navigation }) {

    const { user } = useAuthContext();
    const { colors } = useThemeContext();

    return (
        <DefaultScreen>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('User')}
                        style={{ borderRadius: 25, backgroundColor: colors.text, padding: 1, marginRight: 16 }}
                    >
                        <UserImg
                            imgStyle={{
                                width: 38,
                                height: 38,
                                borderRadius: 25
                            }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: 'gray' }}>{Greet()}</Text>
                        <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
                    </View>
                </View>
                <View>
                    <Ionicons
                        name="qr-code-outline"
                        size={26} color={colors.text}
                        onPress={() => navigation.navigate('QR Code')}
                    />
                </View>
            </View>
            <ModelList />
            <ToolsList />
        </DefaultScreen>
    );
}