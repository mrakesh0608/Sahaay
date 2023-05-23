import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getDate, timeHourMinSec, windowWidth } from '#src/utils';
import { useThemeContext } from '#src/context/ThemeContext';
import * as myfirebase from '#src/firebase';
import { usePED } from '#src/hooks';

import { Text, CenterView, ErrorText, ImgViewer } from '#src/elements';
import { MoreOptions } from '#src/components';

import { CaloriesEstimationRes } from '#src/components/report/CaloriesEstimationRes';
import { DigitalPrescriptionRes } from '#src/components/report/DigitalPrescriptionRes';
import { ModelRes } from '#src/components/report/ModelRes';
import { PrescriptionDigitizationRes } from '#src/components/report/PrescriptionDigitizationRes';

export default function ReportScreen({ route }) {

    const navigation = useNavigation();

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const { id, data: routeData } = route.params;
    console.log(route.params);

    const { isPending, setIsPending, error, setError, data, setData } = usePED();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <MoreOptions id={id} report_uid={data?.uid} />
        });
    }, [id, data])

    useEffect(() => {

        if (routeData) {
            setData(routeData);
            return;
        }
        console.log(id);

        myfirebase.getReportById(id, (err, data) => {
            console.log(err, data);
            if (err || !data) {
                setError(err.message);
            }
            if (data) {
                console.log(data);
                setData(data);
            }
        })
    }, [id, routeData])

    if (error || !data) {
        return (
            <CenterView>
                <ErrorText>{error}</ErrorText>
            </CenterView>
        );
    }

    return (
        <ScrollView contentContainerStyle={{
            padding: 20, flexGrow: 1
        }}>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Report ID : </Text>
                <Text style={styles.val}>{id}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Title : </Text>
                <Text style={styles.val}>{data.title}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Date : </Text>
                <Text style={styles.val}>{getDate(data.createdAt.toDate())}</Text>
            </View>
            <View style={styles.propValContainer}>
                <Text style={styles.prop}>Time : </Text>
                <Text style={styles.val}>{timeHourMinSec(data.createdAt.toDate())} </Text>
            </View>
            {data['img_url'] &&
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.prop}>Examination Image : </Text>
                    <ImgViewer source={{ uri: data['img_url'] }} style={styles.uploadImgPreview} />
                </View>
            }
            {data.title === 'Prescription Digitization' &&
                <PrescriptionDigitizationRes data={data} />
            }
            {['Brain Tumor Detection', 'Kidney Stone Detection', 'Skin Disease Detection'].includes(data.title) &&
                <ModelRes data={data} />
            }
            {data.title === 'Calories Estimation' &&
                <CaloriesEstimationRes data={data} />
            }
            {data.title === 'Digital Prescription' &&
                <DigitalPrescriptionRes data={data} />
            }
            <Text style={{ alignSelf: 'center', marginVertical: 40, letterSpacing: 1.2 }}>----------  End of Report  ----------</Text>
        </ScrollView>
    );
}

const makeStyles = (colors) => StyleSheet.create({
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
        fontWeight: 'bold',
        flexShrink: 1, //to wrap text to next line
    },
    uploadImgPreview: {
        marginTop: 20,
        alignSelf: 'center',
        width: windowWidth * 0.60,
        height: windowWidth * 0.60,
        borderWidth: 0.4,
        borderColor: colors.border,
        borderRadius: 4,
    }
})