import { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getDate, timeHourMinSec, windowWidth } from '#src/utils';
import { useThemeContext } from '#src/context/ThemeContext';
import * as myfirebase from '#src/firebase';
import { usePED } from '#src/hooks';

import { Text, Image } from '#src/elements';
import { MoreOptions } from '#src/components';

export default function ModelRes({ route }) {

    const navigation = useNavigation();

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const { id, data: routeData } = route.params;

    const { isPending, setIsPending, error, setError, data, setData } = usePED();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <MoreOptions id={id} />
        });
    }, [])

    useEffect(() => {

        if (routeData) {
            setData(routeData);
            return;
        }

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
    }, [id])

    return (
        <ScrollView contentContainerStyle={{
            padding: 20, flex: 1, justifyContent: 'space-around',
        }}>
            {data &&
                <>
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
                    <View>
                        <Text style={styles.prop}>Examination Image : </Text>
                        <Image source={{ uri: data.img_url }} style={styles.uploadImgPreview} />
                    </View>
                    <View style={styles.propValContainer}>
                        <Text style={styles.prop}>Result : </Text>
                        <Text style={[styles.val, { color: data.isDetected ? 'red' : 'green' }]}>{data.result}</Text>
                    </View>
                </>
            }
            <Text style={{ alignSelf: 'center', marginVertical: 40, letterSpacing: 1.2 }}>----------  End of Report  ----------</Text>
        </ScrollView>
    );
}

const makeStyles = (colors) => StyleSheet.create({
    propValContainer: {
        flexDirection: 'row',
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