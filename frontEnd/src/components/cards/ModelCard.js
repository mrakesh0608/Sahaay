import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

import CardContainer from '@components/cards/CardContainer';
import { Text } from '@components/elements';

export default function ModelCard({ title, imgSource, onPress, backgroundColor }) {

    const { colors } = useThemeContext();
    const styles = makeStyles({ colors });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
            <CardContainer style={[
                styles.container,
                // backgroundColor && { backgroundColor: backgroundColor },
            ]}>
                <Image source={imgSource} style={{ width: 80, height: 80 }} resizeMode={'contain'} />
                <Text style={styles.title}>{title}</Text>
            </CardContainer>
        </TouchableOpacity>
    )
}

const makeStyles = ({ colors }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.card,
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 20,
    }
})