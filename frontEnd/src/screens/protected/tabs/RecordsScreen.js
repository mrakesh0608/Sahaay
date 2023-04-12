import { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity, SectionList, ActivityIndicator, RefreshControl, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getDate, todayDate } from '#src/utils';
import { useThemeContext } from '#src/context/ThemeContext';

import { CardContainer, RecordCard } from '#src/components';
import { CenterView, Text } from '#src/elements';

export default function RecordsScreen() {

    const { colors } = useThemeContext();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [order, setOrder] = useState('desc');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    }, []);

    useEffect(() => {
        setLoading(true);

        const subscriber = firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .collection('Reports')
            .orderBy('createdAt', order)
            .onSnapshot(querySnap => {

                const processedData = {};

                if (!querySnap) return;

                querySnap.forEach(docSnap => {

                    const val = docSnap.data()

                    let date = getDate(val.createdAt.toDate());

                    if (date === todayDate()) date = 'Today';
                    else if (date === getDate(new Date(Date.now() - 864e5))) date = 'Yesterday';

                    if (!processedData[date]) processedData[date] = [];

                    processedData[date].push({
                        id: docSnap.id,
                        ...val,
                    });
                });

                const data = []
                Object.keys(processedData).forEach(item => {
                    data.push({
                        date: item,
                        data: processedData[item]
                    })
                })
                setData(data);
                setLoading(false);
            });

        return () => subscriber();
    }, [order]);

    if (loading) return <CenterView>
        <ActivityIndicator color={colors.text} size='large' />
    </CenterView>

    if (!data.length) {
        return (
            <CenterView>
                <CardContainer>
                    <Text>Records that you save appear here</Text>
                </CardContainer>
            </CenterView>
        );
    }

    return (
        <SectionList
            ListHeaderComponent={
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 20
                    }}

                    onPress={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
                >
                    <MaterialCommunityIcons
                        name={order === 'desc' ?
                            "sort-calendar-ascending" : "sort-calendar-descending"
                        }
                        size={32} color={colors.text}
                    />
                </TouchableOpacity>
            }

            sections={data}
            keyExtractor={(item, index) => item + index}

            contentContainerStyle={{ paddingHorizontal: 20 }}

            renderSectionHeader={({ section: { date } }) => (
                <Text style={{ fontSize: 18, marginVertical: 10 }}>{date}</Text>
            )}

            renderItem={({ item }) => <RecordCard record={item} />}

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }

            ListFooterComponent={
                <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'gray',
                    paddingHorizontal: 50,
                    paddingVertical: 0.6,
                    marginTop: 30,
                    marginBottom: 40,
                }}></View>
            }
        />
    );
}