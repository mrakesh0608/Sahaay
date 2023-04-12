import { ScrollView } from 'react-native';

import { Text } from '#src/elements';
import { AppIcon } from '#src/components';

const { slug, version } = require('#root/app.json').expo;

export default function AppInfoScreen() {
    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <AppIcon />
            <Text style={{ fontSize: 20, marginVertical: 10 }}>{slug}</Text>
            <Text>Version {version}</Text>
        </ScrollView>
    );
}