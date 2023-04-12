import { View, StyleSheet } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

export function CardContainer(props) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    return (
        <View style={[
            styles.container,
            props.style,
        ]}>
            {props.children}
        </View>
    );
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 0.4,
        borderColor: colors.border,
        // marginHorizontal: 20, //required if parent doesn't set the padding
    }
})