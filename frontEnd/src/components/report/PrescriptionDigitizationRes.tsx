import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NoTextHypen, Text } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export function PrescriptionDigitizationRes({ data }: {
    data: Object
}) {
    const { navigate } = useNavigation();
    const { colors } = useThemeContext();

    if (typeof data !== 'object') return;

    console.log(JSON.stringify(data, null, 2));

    data = data['output']

    return <>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Hospital's Name : </Text>
            <NoTextHypen style={styles.val}>{data['hospital']?.['name']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Hospital's Address : </Text>
            <NoTextHypen style={styles.val}>{data['hospital']?.['address']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Doctor's Name : </Text>
            <NoTextHypen style={styles.val}>{data['doctors'][0]['name']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Tests : {data['tests'] ? data['tests'] : '  -'}</Text>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Medications : {data['prescription']?.length === 0 && '  -'}</Text>
        </View>
        {data['medicationList']?.map((item: any, index: number) =>
            <View
                key={index}
                style={{
                    marginVertical: 10,
                    borderWidth: 0.5,
                    borderColor: colors.text,
                    borderRadius: 10,
                    padding: 10
                }}>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 18 }}
                    onPress={() =>
                        navigate('Search Medicine Result' as never, { medicine: item.medicineName } as never)
                    }>{item.medicineName}</Text>
                <Text>Dose : {item.dose}</Text>
                {/* <Text>Duration : {item.duration}</Text> */}
                <Text>Route : {item.route}</Text>
                {item.instructions && <Text>Instructions : {item.instructions}</Text>}
            </View>
        )}
    </>
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