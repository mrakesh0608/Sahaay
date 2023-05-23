import React from 'react';
import { StyleSheet, View } from 'react-native';

import json from './skin-disease.json';
import { capitalize } from '#src/utils';

import { Text } from '#src/elements';

export function SkinInfectionRes({ type }: {
    type: string
}) {
    const data = json[type];
    // console.log(data, type);

    if (typeof data === 'object')
        return (
            <>
                {Object.keys(data).map((item, index) =>
                    <View style={styles.propValContainer} key={index}>
                        <Text style={styles.prop}>{capitalize(item)} : </Text>
                        <Text style={styles.val}>{data[item]}</Text>
                    </View>

                )}
            </>
        );
}

const styles = StyleSheet.create({
    propValContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    prop: {
        fontSize: 16
    },
    val: {
        marginLeft: 10,
        fontSize: 16,
        flexShrink: 1, //to wrap text to next line
    },
})