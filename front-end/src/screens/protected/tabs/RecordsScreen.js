import CardContainer from '@components/cards/CardContainer';
import React from 'react';
import {
    FlatList,
    RefreshControl,
} from 'react-native';

import { Text } from '@components/elements';

export default function RecordsScreen() {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <FlatList
            data={[]}
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
                <CardContainer>
                    <Text>Records that you save appear here</Text>
                </CardContainer>
            }
        />
    );
};