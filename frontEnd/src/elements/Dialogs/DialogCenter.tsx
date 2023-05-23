import React from 'react';
import { useThemeContext } from '#src/context/ThemeContext';

import { Dialog, DialogProps } from './Dialog';

import { Animated } from 'react-native';

interface optinalProps {
    noDefaultDialogContainerStyle?: boolean,
}

export interface DialogCenterProps extends DialogProps, Partial<optinalProps> { }

export function DialogCenter({
    dialogContainerStyle,
    noDefaultDialogContainerStyle,
    ...rest
}: React.PropsWithChildren<DialogCenterProps>) {

    const { colors } = useThemeContext();

    const scaleValue = React.useRef(new Animated.Value(0)).current;

    return (
        <Dialog
            dialogContainerStyle={[!noDefaultDialogContainerStyle && {
                margin: 30,
                padding: 20,
                backgroundColor: colors.background,

                borderRadius: 20,
                borderColor: colors.border,
                borderWidth: 1,
            }, dialogContainerStyle
            ]}

            dialogContainerAniStyle={{
                transform: [{ scale: scaleValue }]
            }}

            onShowDialog={() => {
                Animated.spring(scaleValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            }}

            onCloseDialog={(cb: any) => {
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start(cb);
            }}
            {...rest}
        />
    );
}