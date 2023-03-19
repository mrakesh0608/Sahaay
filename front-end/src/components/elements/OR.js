import { StyleSheet, View } from 'react-native';

import Text from "@components/elements/Text";
import useThemeContext from '@hooks/context/useThemeContext';

export default function OR() {

    const { colors } = useThemeContext();

    return (
        <View style={styles.container}>
            <View style={[
                styles.hr,
                { borderColor: colors.nearBackground }
            ]}></View>
            <Text style={[
                { color: colors.text },
                styles.orText,
                { backgroundColor: colors.background }
            ]} >or</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 20,
    },
    hr: {
        borderBottomWidth: 1,
    },
    orText: {
        paddingHorizontal: 10,
        position: 'absolute',
        top: -10,
        alignSelf: 'center',
    },
})