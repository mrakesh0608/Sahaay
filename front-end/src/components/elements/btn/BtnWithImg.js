import { StyleSheet, TouchableOpacity } from "react-native";

import useThemeContext from "@hooks/context/useThemeContext";

import Text from "@components/elements/Text";

export default function BtnWithImg({ title, onPress, disabled, Image }) {

    const { colors } = useThemeContext();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                { backgroundColor: colors.nearBackground },
                styles.button,
                disabled && styles.disabled
            ]}
        >
            <Image color={colors.text} />
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

        alignSelf: 'center',

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