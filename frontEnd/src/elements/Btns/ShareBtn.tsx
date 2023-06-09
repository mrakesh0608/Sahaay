import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { CapsuleBtn } from './CapsuleBtn';

export function ShareBtn({
    title = 'Share',
    ShareOptions,
    style,
}: {
    title?: string,
    ShareOptions?: ShareOptions,
    style?: StyleProp<TextStyle>
}) {

    const { colors } = useThemeContext();

    return (
        <CapsuleBtn
            title={title}

            TextLeftComp={() =>
                <MaterialIcons
                    name='share' size={24}
                    color={colors.text}
                    style={style}
                />
            }

            onPress={() =>
                Share
                    .open(ShareOptions)
                    .catch(err => {
                        console.log(err);
                    })
            }
        />
    );
}