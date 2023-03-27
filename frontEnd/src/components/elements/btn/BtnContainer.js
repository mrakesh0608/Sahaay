import { View } from 'react-native';

export function BtnContainer({ style, ...rest }) {
    return (
        <View
            style={[{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10
            }, style
            ]}
            {...rest}
        />
    )
};