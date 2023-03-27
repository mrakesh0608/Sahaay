import { Text } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

export default function MyText(props) {

    const { colors } = useThemeContext();

    return (
        <Text
            {...props}
            style={[{ color: colors.text }, props.style]}
        />
    );
}