import { ScrollView, View } from 'react-native';

import useAuthContext from '@hooks/context/useAuthContext';

import ModelList from '@components/ModelList';
import { Text } from '@components/elements';

export default function HomeScreen() {

    const { user } = useAuthContext();

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                backgroundColor: 'lightcoral',
                padding: 20
            }}>
                <Text style={{ fontSize: 20 }}>Hello, {user.displayName}</Text>
                <Text>Dashboard Here</Text>
            </View>
            <ModelList />
        </ScrollView>
    );
}