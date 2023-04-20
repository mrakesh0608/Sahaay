import { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import { LoadingDots } from '@mrakesh0608/react-native-loading-dots';

import { useThemeContext } from '#src/context/ThemeContext';

import { timeHourMin, windowWidth } from '#src/utils';

import { Text } from '#src/elements';

function ChatContainer({ align, txt, createdAt }) {

    const { colors } = useThemeContext();

    const time = useMemo(() => createdAt && timeHourMin(createdAt), [createdAt])

    return (
        <TouchableOpacity
            style={{
                alignSelf: align === 'left' ? 'flex-start' : 'flex-end',
                backgroundColor: align === 'left' ? colors.card2 : colors.card,

                maxWidth: windowWidth * 0.78,
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

export function ChatMsg({ chat }) {
    return (
        <>
            <ChatContainer align='right' {...chat.req} />
            <ChatContainer align='left' {...chat.res} />
        </>
    )
}
