import { ScrollView, View } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

import CenterView from '@components/elements/CenterView';
import Text from "@components/elements/Text";

export default function RecordsScreen() {
    const { colors } = useThemeContext();

    const list = [];

    if (!list.length) return <CenterView><Text style={{ padding: 20, backgroundColor: colors.card, borderRadius: 10 }} >Records that you save appear here</Text></CenterView>

    return (
        <ScrollView contentContainerStyle={{ alignSelf: 'center', justifyContent: 'center' }}>
            <View style={{
                flex: 1,
                backgroundColor: 'lightcoral',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20
            }}>

            </View>
        </ScrollView>
    );
}