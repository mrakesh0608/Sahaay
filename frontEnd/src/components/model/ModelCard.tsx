import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

import { CardContainer } from '#src/components/cards/CardContainer';
import { Text } from '#src/elements';

export function ModelCard({ title, imgSource, onPress, backgroundColor = '#FFD580' }) {

    const { colors } = useThemeContext();
    const styles = makeStyles({ colors });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
            <CardContainer style={[
                styles.container,
                // backgroundColor && { backgroundColor: backgroundColor },
            ]}>
                <Image source={imgSource} style={styles.img} resizeMode={'contain'} />
                <Text style={styles.title}>{title}</Text>
            </CardContainer>
        </TouchableOpacity>
    )
}

const makeStyles = ({ colors }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.card,
        padding: 24,
    },
    img: {
        width: '50%',
        height: 80,
    },
    title: {
        width: '50%',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})