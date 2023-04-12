import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useThemeContext } from '#src/context/ThemeContext';

import { useDeleteReportById } from '#src/firebase';
import { BtnContainer, DialogCenter, ZoomBtn } from '#src/elements';

export function MoreOptions({ id }) {

    const { colors } = useThemeContext();

    const { navigate } = useNavigation();

    const { deleteReportById, data, isPending, error } = useDeleteReportById();

    useEffect(() => {
        if (data) navigate('HomeTabs');
    }, [data])

    return (
        <DialogCenter
            CallerContent={() =>
                <Feather
                    name="more-vertical" size={24}
                    color={colors.text}
                    style={{ marginRight: 16 }}
                />
            }
            DialogContent={({ closeDialog }) =>
                <BtnContainer>
                    <ZoomBtn
                        title={'Delete This Report'}
                        style={{ backgroundColor: 'red' }}
                        onPress={() => {
                            deleteReportById({ id });
                            closeDialog();
                        }}
                    />
                </BtnContainer>
            }
        />
    )
}