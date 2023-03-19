import { ScrollView, View } from 'react-native';

import SubmitBtn from '@components/elements/btn/SubmitBtn';
import Text from "@components/elements/Text";

export default function BrainTumorDetRes({ navigation, route }) {

    async function generateText() {
        navigation.navigate('Home');
    }

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ textAlign: 'justify' }}>{route.params.data}</Text>
                <SubmitBtn title={'Save Into Records'} onPress={generateText} />
            </View>
        </ScrollView>
    );
}