import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from "../Text";

export function OR() {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.hr} />
            <Text style={styles.orText}>or</Text>
        </View>
    );
}
const makeStyles = (colors) => StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 18,
    },
    hr: {
        borderBottomWidth: 1,
        borderColor: colors.nearBg
    },
    orText: {
        backgroundColor: colors.background,
        color: colors.text,

        alignSelf: 'center',

        paddingHorizontal: 10,

        position: 'absolute',
        top: -10,
    },
})