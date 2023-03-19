import { Image, ScrollView } from 'react-native';
import Text from "@components/elements/Text";

const version = require('@root/package.json').version;

export default function About() {
    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image source={require('@assets/icon.png')} />
            <Text style={{ fontSize: 20 }}>Sahaay</Text>
            <Text>Version {version}</Text>
        </ScrollView>
    );
}