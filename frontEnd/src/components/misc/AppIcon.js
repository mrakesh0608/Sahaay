import { Image } from 'react-native';

export function AppIcon({ style }) {
    return (
        <Image
            source={require('#assets/icon.png')}
            style={{ alignSelf: 'center', ...style }}
        />
    );
}