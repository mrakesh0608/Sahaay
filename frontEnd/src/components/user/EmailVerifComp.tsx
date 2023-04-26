import React from 'react';
import { View } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as myfirebase from '#src/firebase';
import { useThemeContext } from '#src/context/ThemeContext';

import { Text, ZoomBtn, BtnContainer, DialogCenter } from '#src/elements';

export function EmailVerifComp({
    isVerified = false,
    isMine = false
}: {
    isVerified: boolean,
    isMine?: boolean
}) {
    const { colors } = useThemeContext();

    return (
        <DialogCenter
            CallerContent={() =>
                <Octicons
                    name={isVerified ? "verified" : "unverified"}
                    size={20} color={colors.text}
                    style={{ marginHorizontal: 10 }}
                />
            }

            DialogContent={({ closeDialog }) =>
                <>
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name={isVerified ? "email-check" : "email-remove"}
                            size={30} color={colors.text}
                            style={{ marginBottom: 6 }}
                        />
                        {isVerified ?
                            <Text>{isMine ? 'Your email address has been verified.' : 'Verified email address.'}</Text> :
                            <>
                                {isMine ?
                                    <>
                                        <Text>{`Your email address has not been verified.\n`}</Text>
                                        <Text>Click "Send" to get the verification link.</Text>
                                    </> :
                                    <>
                                        <Text>{`Email address not verified.`}</Text>
                                    </>
                                }
                            </>
                        }

                    </View>
                    {isMine &&
                        <BtnContainer style={{ marginTop: 20 }}>
                            {isVerified ?
                                <ZoomBtn title='Ok' onPress={closeDialog} /> :
                                <>
                                    <ZoomBtn
                                        title='Cancel'
                                        style={{ backgroundColor: 'red' }}
                                        onPress={closeDialog}
                                    />
                                    <ZoomBtn
                                        title='Send'
                                        onPress={() => {
                                            myfirebase.sendEmailVerification();
                                            closeDialog();
                                        }}
                                    />
                                </>
                            }
                        </BtnContainer>
                    }
                </>
            }
        />
    )
}