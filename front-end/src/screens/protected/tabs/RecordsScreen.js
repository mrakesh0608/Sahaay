import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import useThemeContext from '@hooks/context/useThemeContext';

import CardContainer from '@components/cards/CardContainer';
import { CenterView, Text } from '@components/elements';
import RecordCard from '@components/cards/RecordCard';


export default function RecordsScreen() {

    const { colors } = useThemeContext();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [order, setOrder] = useState('desc');
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
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
            .onSnapshot(querySnapshot => {
                const data = [];

                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });

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
        <FlatList
            ListHeaderComponent={
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginVertical: 20
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

            data={data}
            keyExtractor={item => item.id}

            renderItem={({ item }) => <RecordCard record={item} />}

            contentContainerStyle={{ paddingHorizontal: 20 }}

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
}