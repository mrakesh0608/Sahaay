import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { SkinInfectionRes } from '#src/components/model/SkinInfectionRes';

export function ModelRes({ data }: {
    data: Object
}) {
    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    if (typeof data === 'object') {

        const nut = data['nutrition']
        // console.log(JSON.stringify(nut, null, 2));

        return <>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Result : </Text>
                <Text style={[styles.val, { color: data['isDetected'] ? 'red' : 'green' }]}>{data['result']}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Accuracy : </Text>
                <Text style={styles.val}>{data['accuracy']? `${data['accuracy']?.toFixed(2)} %` : '-'}</Text>
            </View>
            {data['title'] === 'Skin Disease Detection' && <SkinInfectionRes type={data['result']} />}
        </>
    }
}

const makeStyles = (colors) => StyleSheet.create({
    propValContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    prop: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    val: {
        marginLeft: 10,
        fontSize: 16,
        flexShrink: 1, //to wrap text to next line
    }
})