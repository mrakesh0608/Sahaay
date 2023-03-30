import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import useThemeContext from '@hooks/context/useThemeContext';
import LoadingDots from 'rn-loading-dots';

export default function ChatInput({ handleSend }) {

    const { colors } = useThemeContext();
    const [currentTxt, setCurrentTxt] = useState('');

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            paddingVertical: 8,
            borderTopColor: colors.nearBg,
            borderTopWidth: 0.4,
        }}>
            <LoadingDots />
            <TextInput
                placeholder='Send a message...'
                placeholderTextColor='gray'

                value={currentTxt}
                onChangeText={val => setCurrentTxt(val)}

                style={{
                    color: colors.text,
                    flex: 0.95,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderColor: colors.text,
                    borderRadius: 16,
                }}
            />
            <Ionicons name="ios-send" size={28}
                color={colors.text}
                onPress={() => handleSend({ currentTxt, setCurrentTxt })}
            />
        </View>
    )
}