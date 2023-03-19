import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

import CardContainer from '@components/cards/CardContainer';
import Text from "@components/elements/Text";

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
                <Text style={styles.text}>{title}</Text>
            </CardContainer>
        </TouchableOpacity>
    )
}

const makeStyles = ({ colors }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        backgroundColor: colors.card,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'center',
    }
})