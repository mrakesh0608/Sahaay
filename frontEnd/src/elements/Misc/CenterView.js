import { View, StyleSheet } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

export function CenterView({ style, ...rest }) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    return (
        <View
            style={[
                styles.container,
                style
            ]}
            {...rest}
        />
    );
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})