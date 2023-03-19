import { View, StyleSheet } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

export default function CardContainer(props) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    return (
        <View style={[
            styles.container,
            props.style
        ]}>
            {props.children}
        </View>
    );
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        // marginHorizontal: 20, //required if parent does'nt not set the padding
    }
})