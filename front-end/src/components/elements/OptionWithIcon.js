import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeContext from "@hooks/context/useThemeContext";

import { Text } from "./Text";

export function OptionWithIcon({ title, selectedVal, onPress, disabled, Icon }) {

    const { colors } = useThemeContext();

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
                <Icon />
                <Text style={styles.optionText}>{title}</Text>
            </View>
            <MaterialCommunityIcons
                name={selectedVal === title ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color={selectedVal === title ? 'tomato' : colors.text}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.8,
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
        marginHorizontal: 10,
    },
})