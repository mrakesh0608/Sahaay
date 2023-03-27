import React from "react";
import {
    StyleSheet, StyleProp, ViewStyle, TextStyle, GestureResponderEvent,
    TouchableOpacity, ActivityIndicator, ColorValue,
} from "react-native";

import useThemeContext from "@hooks/context/useThemeContext";

import { Text } from "@components/elements/Text";

export interface MyBtnProps {
    title: string,
    onPress: (event: GestureResponderEvent) => void,
    disabled: boolean,
    containerStyle: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>,
    isPending: boolean,
    ActivityIndicatorColor: ColorValue,

    TextLeftComp: any,
    TextRightComp: any
}

export function MyBtn({
    title, onPress, disabled,
    containerStyle, textStyle,
    isPending, ActivityIndicatorColor,
    TextLeftComp, TextRightComp
}: React.PropsWithChildren<MyBtnProps>) {

    const { colors } = useThemeContext();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.btnContainer,
                containerStyle,
                (disabled || isPending) && styles.disabled
            ]}
        >
            {TextLeftComp && <TextLeftComp />}
            {title &&
                <Text style={[styles.btnText, textStyle]}>{title}</Text>
            }
            {isPending &&
                <ActivityIndicator
                    color={typeof ActivityIndicatorColor === 'string' ?
                        ActivityIndicatorColor : colors.text
                    }
                    style={{ marginLeft: 10 }}
                />
            }
            {TextRightComp && <TextRightComp />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',

        marginVertical: 8,
    },
    disabled: {
        opacity: 0.6,
        // backgroundColor: '#6495ED'
    },
    btnText: {
        letterSpacing: 0.8,
    },
})