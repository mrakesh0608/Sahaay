import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "@components/elements/Text";

export default function SubmitBtn({ title, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={onPress ? onPress : () => { }}
            disabled={disabled}
            style={[{ alignSelf: 'center', }, disabled && styles.disabled]}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    },
    button: {
        backgroundColor: '#1e90ff',
        borderRadius: 8,

        paddingHorizontal: 10,
        paddingVertical: 14,

        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        // textTransform: 'uppercase',
        letterSpacing: 1.2
    },
})