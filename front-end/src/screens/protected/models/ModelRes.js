import { ScrollView } from 'react-native';

import { CenterView, Text } from '@components/elements';

export default function ModelRes({ route }) {

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CenterView>
                <Text style={{ textAlign: 'justify' }}>{route.params.data}</Text>
            </CenterView>
        </ScrollView>
    );
}