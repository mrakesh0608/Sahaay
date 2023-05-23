import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { usePED } from '#src/hooks';
import { getAge } from '#src/utils';
import { addReport } from '#src/firebase';
import { useThemeContext } from '#src/context/ThemeContext';

import FormikTextInput from '#src/forms/FormikTextInput';
import FormContainer from '#src/forms/FormContainer';
import MedicationForm from '#src/forms/MedicationForm';

import { SubmitBtn, TransparentBtn, Text, DialogCenter } from '#src/elements';

export default function DigitalPrescriptionForm({ route }) {

    const { navigate } = useNavigation();
    const { colors } = useThemeContext();

    const { data: user } = route.params;
    const { isPending, setIsPending, error, setError, data, setData } = usePED();

    return (
        <FormContainer>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>UID : </Text>
                <Text style={styles.val}>{user['uid']}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Patient Name : </Text>
                <Text style={styles.val}>{user['displayName']}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Age : </Text>
                <Text style={styles.val}>{user['dob'] ? `${getAge(user['dob'])} years old` : '-'}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Gender : </Text>
                <Text style={styles.val}>{user['gender']}</Text>
            </View>
            <Formik
                initialValues={{
                    chiefComplaints: '',
                    history: '',
                    findings: '',
                    advise: '',
                    medicationList: []
                }}
                validationSchema={validationSchema}
                onSubmit={async (val: any, actions) => {
                    setIsPending(true);
                    addReport({
                        ...val,
                        title: 'Digital Prescription',
                        uid: user['uid'],
                        doctor_uid: auth().currentUser.uid
                    }, (error: any, data: any) => {
                        if (data?.id) {
                            navigate('Report' as never, { id: data.id } as never);
                        }
                        else {
                            setError(error)
                            console.log(error, data);
                        }
                        setIsPending(false);
                    })
                }}
            >
                {props => <>
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='chiefComplaints'

                        placeholder='Chief Complaints'
                        multiline={true}
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='history'

                        placeholder='History'
                        multiline={true}
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='findings'

                        placeholder='Findings'
                        multiline={true}
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='advise'

                        placeholder='Advise'
                        multiline={true}
                    />
                    {props.values.medicationList.length !== 0 &&
                        <Text style={{ fontSize: 16, marginVertical: 10, fontWeight: 'bold' }}>Medications</Text>
                    }
                    {props.values.medicationList.map((item, index) =>
                        <View
                            key={index}
                            style={{
                                marginVertical: 10,
                                borderWidth: 0.5,
                                borderColor: colors.text,
                                borderRadius: 10,
                                padding: 10
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.medicineName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={19} color={colors.text}
                                        style={{ marginRight: 10 }}
                                        onPress={() => {
                                            const mList = props.values['medicationList']
                                            mList.splice(index, 1);
                                            props.setFieldValue('medicationList', [...mList])
                                        }}
                                    />
                                    <DialogCenter
                                        CallerContent={({ showDialog }) =>
                                            <Feather name="edit" size={16} color={colors.text} onPress={showDialog} />
                                        }
                                        DialogContent={({ closeDialog }) =>
                                            <MedicationForm
                                                values={props.values['medicationList'][index]}
                                                close={closeDialog}
                                                submit={(list) => {
                                                    console.log(list);
                                                    const mList = props.values['medicationList']
                                                    mList[index] = ({ ...list })
                                                    props.setFieldValue('medicationList', [...mList])
                                                }}
                                            />}
                                    />
                                </View>
                            </View>
                            <Text>Dose : {item.dose}</Text>
                            <Text>Duration : {item.duration}</Text>
                            <Text>Route : {item.route}</Text>
                            {item.instructions && <Text>Instructions : {item.instructions}</Text>}
                        </View>
                    )}
                    <DialogCenter
                        CallerContent={({ showDialog }) =>
                            <TransparentBtn
                                title='Add Medication'
                                TextLeftComp={({ colors }) => <Entypo name="plus" size={24} color={colors.text} style={{ marginRight: 6 }} />}
                                onPress={showDialog}
                            />
                        }
                        DialogContent={({ closeDialog }) =>
                            <MedicationForm
                                close={closeDialog}
                                submit={(list) => {
                                    console.log(list);
                                    const mList = props.values['medicationList']
                                    mList.push({ ...list })
                                    props.setFieldValue('medicationList', [...mList])
                                }} />
                        }
                    />
                    <SubmitBtn
                        title="Submit"
                        isPending={isPending}
                        disabled={props.dirty && !props.isValid}
                        onPress={() => props.handleSubmit()}
                        errTxt={error}
                    />
                </>}
            </Formik>
        </FormContainer>
    )
}

const validationSchema = yup.object({
    chiefComplaints: yup.string().required("Required"),
    history: yup.string(),
    findings: yup.string(),
    advise: yup.string()
})

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
        textTransform: 'capitalize',
        marginLeft: 10,
        fontSize: 16,
        flexShrink: 1, //to wrap text to next line
    },
})