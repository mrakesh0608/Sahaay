import React from 'react';
import { Text, Pressable } from 'react-native';

export function ZoomBtn({ title, onPress, style }) {
    return (
        <Pressable
            hitSlop={2}
            onPress={onPress}

            style={({ pressed }) => [{
                borderRadius: 20,
                padding: 12,
                elevation: 2,
                backgroundColor: '#2196F3',
                transform: [{ scale: pressed ? 1.1 : 1 }]
            }, style
            ]}
        >
            <Text
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >{title}</Text>
        </Pressable>
    )
};