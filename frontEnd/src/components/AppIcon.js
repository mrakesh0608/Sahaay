import { Image } from 'react-native';

export default function AppIcon({ style }) {
    return (
        <Image
            source={require('@assets/icon.png')}
            style={{ alignSelf: 'center', ...style }}
        />
    );
}