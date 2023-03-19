import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "@components/elements/Text";

export default function MyBtn({ title, onPress, disabled, style }) {
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
        alignSelf: 'flex-start',
        marginVertical: 8,
    },
    buttonText: {
        textAlign: 'center',
        letterSpacing: 0.8,
    },
})