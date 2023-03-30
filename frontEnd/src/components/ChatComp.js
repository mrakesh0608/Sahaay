import { View, TouchableOpacity } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';

import useThemeContext from '@hooks/context/useThemeContext';
import { timeHourMin, windowWidth } from '@utils/index';

import { Text } from '@components/elements'
import { useMemo } from 'react';
import { LoadingDots } from '../dots/LoadingDots';

function ChatContainer({ align, txt, createdAt }) {

    const { colors } = useThemeContext();

    const time = useMemo(() => createdAt && timeHourMin(createdAt), [createdAt])

    return (
        <TouchableOpacity
            style={{
                alignSelf: align === 'left' ? 'flex-start' : 'flex-end',
                backgroundColor: colors.card,

                maxWidth: windowWidth * 0.72,
                marginVertical: 6,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 6,
            }}

            onPress={() => Clipboard?.setString(txt)}
        >
            {txt ?
                <Text style={{
                    fontSize: 16,
                    alignSelf: 'flex-start'
                }}>{txt}            </Text>
                : <LoadingDots color={colors.text} size={8} />
            }
            {time &&
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: colors.placeholder,
                            textAlignVertical: 'bottom'
                        }}>{time}</Text>
                </View>
            }
        </TouchableOpacity>
    );
}


export default function ChatComp({ chat }) {
    console.log(chat);
    return (
        <>
            <ChatContainer align='right' {...chat.req} />
            <ChatContainer align='left' {...chat.res} />
        </>
    )
}
