import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NoTextHypen, Text } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export function DigitalPrescriptionRes({ data }: {
    data: Object
}) {
    const { navigate } = useNavigation();
    const { colors } = useThemeContext();

    if (typeof data !== 'object') return;

    console.log(JSON.stringify(data, null, 2));

    return <>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Chief Complaints: </Text>
            <Text style={styles.val}>{data['chiefComplaints']}</Text>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>History : </Text>
            <NoTextHypen style={styles.val}>{data['history']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Findings : </Text>
            <NoTextHypen style={styles.val}>{data['findings']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Advise : </Text>
            <NoTextHypen style={styles.val}>{data['advise']}</NoTextHypen>
        </View>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Medications : {data['medicationList']?.length === 0 && '  -'}</Text>
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
                <Text>Duration : {item.duration}</Text>
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