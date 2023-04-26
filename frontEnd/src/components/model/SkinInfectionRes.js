import { Text } from '#src/elements';
import { StyleSheet, View } from 'react-native';

import { capitalize } from '#src/utils';

import json from './skin-infection.json';

export function SkinInfectionRes({ type }) {

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