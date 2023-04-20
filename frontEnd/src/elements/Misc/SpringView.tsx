import React, { useRef, useEffect } from 'react';
import { Animated, StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native';

export function SpringView({
    style, children
}: {
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>
}) {

    const aniVal = useRef(new Animated.Value(0.6)).current;

    const springAni = Animated.spring(aniVal, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
    });

    const timingAni = Animated.timing(aniVal, {
        toValue: 0.6,
        duration: 180,
        useNativeDriver: true,
    })

    useEffect(() => {
        springAni.start();
    }, []);


    return (
        <TouchableWithoutFeedback
            onPressIn={() => {
                aniVal.stopAnimation();
                Animated.sequence([timingAni]).start()
            }}
            onPressOut={() => {
                aniVal.stopAnimation();
                Animated.sequence([springAni]).start()
            }}
            onPress={() => {
                aniVal.stopAnimation();
                Animated.sequence([timingAni, springAni]).start()
            }}
        >
            <Animated.View
                style={[{
                    transform: [{ scale: aniVal }],
                },
                    style,
                ]}
            >
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}