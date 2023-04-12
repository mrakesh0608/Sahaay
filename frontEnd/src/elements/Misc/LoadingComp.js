import { ActivityIndicator } from 'react-native'

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '../Text'
import { CenterView } from './CenterView';

export function LoadingComp() {

    const { colors } = useThemeContext();

    return <CenterView style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 18 }}>Loading</Text>
        <ActivityIndicator
            color={colors.text}
            style={{ marginLeft: 12 }}
        />
    </CenterView>
}