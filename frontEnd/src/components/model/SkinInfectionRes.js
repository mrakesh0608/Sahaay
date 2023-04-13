import { Text } from '#src/elements';
import { StyleSheet, View } from 'react-native';
import json from './skin-infection.json';
import { capitalize } from '#src/utils';

export function SkinInfectionRes({ type }) {

    const data = json[type];
    console.log(data, type);
    return (
        <>
            {Object.keys(data).map((item, index) =>
                <View style={styles.propValContainer}>
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