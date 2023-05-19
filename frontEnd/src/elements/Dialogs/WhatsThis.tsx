import React from 'react'
import { Entypo } from '@expo/vector-icons';

import { BtnContainer, ZoomBtn } from '../Btns';
import { DialogCenter } from './DialogCenter';
import { IntroText, Text } from '../Text';

export function WhatsThis({ desc }: {
    desc: string
}) {
    return (
        <DialogCenter
            CallerContent={() =>
                <Entypo
                    name="info-with-circle"
                    size={16} color={'gray'}
                    style={{ marginHorizontal: 10 }}
                />
            }

            DialogContent={({ closeDialog }) =>
                <>
                    <Text style={{ alignSelf: 'center', fontSize: 22 }}>What's This !</Text>
                    <IntroText>{desc}</IntroText>
                    <BtnContainer style={{ marginTop: 20 }}>
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