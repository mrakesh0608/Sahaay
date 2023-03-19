import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "@components/elements/Text";

export default function TransparentBtn({ title, onPress, disabled, alignSelf, style }) {
    return (
        <TouchableOpacity
            onPress={onPress ? onPress : () => { }}
            disabled={disabled}
            style={disabled && styles.disabled}
        >
            <View style={[styles.button, style?.container]}>
                <Text style={[styles.buttonText, style?.Text]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.6,
    },
    button: {
        backgroundColor: "transparent",
        borderRadius: 8,

        alignSelf: 'center',

        paddingHorizontal: 10,
        paddingVertical: 14,

        marginVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        // textTransform: 'uppercase',
        letterSpacing: 1.2
    },
})