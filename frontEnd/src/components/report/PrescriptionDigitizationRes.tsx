import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { NoTextHypen, Text } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

function List({ title, data }) {
    if (!data) return;

    const { colors } = useThemeContext();

    return (
        <>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>{title} : {data?.length === 0 && '  -'}</Text>
            </View>
            {data?.length !== 0 &&
                <View
                    style={{
                        marginVertical: 10,
                        borderWidth: 0.5,
                        borderColor: colors.text,
                        borderRadius: 10,
                        padding: 10
                    }}>
                    {Object.keys(data)?.map((item: any, index: number) =>
                        (typeof data[item] === 'string') ? //to avoid error in run time
                            <View
                                key={index}
                                style={[styles.propValContainer, { marginVertical: 0 }]}
                            >
                                <Text style={styles.prop}>{item} : </Text>
                                <NoTextHypen style={styles.val}>{data[item]}</NoTextHypen>
                            </View> : null
                    )}
                </View>
            }
        </>
    );
}

export function PrescriptionDigitizationRes({ data }: {
    data: Object
}) {
    const { navigate } = useNavigation();
    const { colors } = useThemeContext();

    if (typeof data !== 'object') return;

    console.log(JSON.stringify(data, null, 2));

    data = data['output']
    if (typeof data !== 'object') return;

    return <>
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Prescribed Date : </Text>
            <Text style={styles.val}>{data['prescribed_date']}</Text>
        </View>
        <List title='Hospital' data={data['hospital']} />
        <List title='Doctor' data={data['doctors'][0]} />
        <List title='Patient' data={data['patient']} />
        <List title='Observations' data={data['observations']} />
        <List title='Tests' data={data['tests'][0]} />
        <View style={styles.propValContainer}>
            <Text style={styles.prop}>Medications : {data['medicationList']?.length === 0 && '  -'}</Text>
        </View>
        {data['medicationList']?.map((item: any, index: number) =>
            <TouchableOpacity
                key={index}
                style={{
                    marginVertical: 10,
                    borderWidth: 0.5,
                    borderColor: colors.text,
                    borderRadius: 10,
                    padding: 10

                }}
                onPress={() =>
                    navigate('Search Medicine Result' as never, { medicine: item.medicineName } as never)
                }
            >
                <Text
                    style={{ fontWeight: 'bold', fontSize: 18 }}
                >{item.medicineName}</Text>
                <Text>Dose : {item.dose}</Text>
                <Text>Duration : {item.duration}</Text>
                <Text>Route : {item.route}</Text>
                {item.instructions && <Text>Instructions : {item.instructions}</Text>}
            </TouchableOpacity>
        )}
        <List title='Other Information' data={data['otherInfo']} />
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