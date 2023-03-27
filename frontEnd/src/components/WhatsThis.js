import React from 'react'
import { Entypo } from '@expo/vector-icons';
import useThemeContext from '@hooks/context/useThemeContext';

import DialogCenter from './dialogs/DialogCenter';
import { BtnContainer, Text, ZoomBtn } from './elements';

export default function WhatsThis({ desc }) {
    const { colors } = useThemeContext();
    return (
        <DialogCenter
            CallerContent={() =>
                <Entypo
                    name="info-with-circle"
                    size={16} color={colors.text}
                    style={{ marginHorizontal: 10 }}
                />
            }

            DialogContent={({ closeDialog }) =>
                <>
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginBottom: 20 }}>What's This !</Text>
                    <Text style={{ textAlign: 'justify' }}>{`    "Try with sample image" takes a random sample image from server's storage which contains more than 500 images to demostrate how this model works.`}</Text>
                    <BtnContainer style={{marginTop:20}}>
                        <ZoomBtn
                            title={'Ok'}
                            onPress={closeDialog}
                        />
                    </BtnContainer>
                </>
            }
        />
    )
}