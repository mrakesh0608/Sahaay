import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';

export function ChatInput({ handleSend }) {

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
            <TextInput
                placeholder='Type your message here'
                placeholderTextColor='gray'
                value={currentTxt}
                onChangeText={val => setCurrentTxt(val)}
                multiline={true}

                style={{
                    color: colors.text,
                    // flex: 1,
                    flex: 0.95,
                    // borderWidth: 0.5,
                    fontSize: 16,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
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