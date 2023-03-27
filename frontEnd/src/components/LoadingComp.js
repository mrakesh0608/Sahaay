import { ActivityIndicator } from 'react-native'

import useThemeContext from '@hooks/context/useThemeContext';

import { CenterView, Text } from '@components/elements';

export default function LoadingComp() {

    const { colors } = useThemeContext();

    return <CenterView style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 18 }}>Loading</Text>
        <ActivityIndicator
            color={colors.text}
            style={{ marginLeft: 12 }}
        />
    </CenterView>
}