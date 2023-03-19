import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeContext from "@hooks/context/useThemeContext";

import Text from "@components/elements/Text";

export default function Option({ title, selectedVal, onPress, disabled }) {

    const { colors } = useThemeContext();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                // { backgroundColor: colors.nearBackground },
                styles.button,
                disabled && styles.disabled
            ]}
        >
            <MaterialCommunityIcons
                name={selectedVal === title ? 'circle-slice-8' : 'circle-outline'}
                size={24}
                color={selectedVal === title ? 'tomato' : colors.text}
            />
            <Text style={[colors.text, styles.buttonText]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.6,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 24,
        paddingVertical: 10,

        marginVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        marginHorizontal: 10,
    },
})