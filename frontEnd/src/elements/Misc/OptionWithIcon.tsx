import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from "../Text";
import { useMemo } from "react";

export function OptionWithIcon({
    title, selectedVal, onPress, disabled, Icon
}: {
    title: string,
    selectedVal?: string,
    onPress?: any,
    disabled?: boolean,
    Icon?: any
}) {

    const { colors } = useThemeContext();

    const isSelected = useMemo(() => selectedVal.toLowerCase() === title.toLowerCase(), [selectedVal, title])

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.optionC,
                disabled && styles.disabled
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {Icon && <Icon />}
                <Text style={styles.optionText}>{title}</Text>
            </View>
            <MaterialCommunityIcons
                name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color={isSelected ? colors.activeTint : colors.text}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.4,
    },
    optionC: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 16,
        paddingVertical: 10,
        marginVertical: 6,
    },
    optionText: {
        fontWeight: 'bold',
        letterSpacing: 1,
        marginHorizontal: 10
    },
})