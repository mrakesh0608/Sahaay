import React from 'react';
import { Text, Pressable, StyleProp, ViewStyle, GestureResponderEvent, View } from 'react-native';

export function ZoomBtn({
    title,
    onPress,
    style,
    Icon
}: {
    title?: string,
    onPress?: (event: GestureResponderEvent) => void,
    style?: StyleProp<ViewStyle>,
    Icon?: any
}) {
    return (
        <Pressable
            hitSlop={2}
            onPress={onPress}

            style={({ pressed }) => [{
                borderRadius: 20,
                padding: 12,
                elevation: 2,
                backgroundColor: '#2196F3',
                transform: [{ scale: pressed ? 1.1 : 1 }],
                flexDirection: 'row',
                alignItems: 'center'
            }, style
            ]}
        >
            {Icon &&
                <View style={title && { marginRight: 10 }}>
                    {Icon}
                </View>
            }
            {title &&
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >{title}</Text>
            }
        </Pressable>
    )
};