import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '#src/elements';

export function CaloriesEstimationRes({ data }: {
    data: Object
}) {

    if (typeof data === 'object') {

        const nut = data['nutrition']
        // console.log(JSON.stringify(nut, null, 2));

        return <>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Food Item : </Text>
                <Text style={styles.val}>{data['food_name']}</Text>
            </View>
            {Object.keys(nut).sort((a, b) => a.localeCompare(b)).map((item, index) =>
                <View style={styles.propValContainer} key={index}>
                    <Text style={styles.prop}>{item} : </Text>
                    <Text style={styles.val}>{`${nut[item]}`}</Text>
                </View>
            )}
        </>
    }
}

const styles = StyleSheet.create({
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
    },
})