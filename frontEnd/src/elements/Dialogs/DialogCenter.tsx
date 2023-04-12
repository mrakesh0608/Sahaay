import React from 'react';
import { useThemeContext } from '#src/context/ThemeContext';

import { Dialog, DialogProps } from './Dialog';

export function DialogCenter({
    dialogContainerStyle, ...rest
}: React.PropsWithChildren<DialogProps>) {

    const { colors } = useThemeContext();

    return (
        <Dialog
            dialogContainerStyle={[{
                margin: 30,
                padding: 20,
                backgroundColor: colors.background,

                borderRadius: 20,
                borderColor: colors.border,
                borderWidth: 1,
            }, dialogContainerStyle
            ]}
            {...rest}
        />
    );
}