import { View } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

import * as myfirebase from '#src/firebase';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text, ZoomBtn, BtnContainer, DialogCenter } from '#src/elements';

export function EmailVerifComp() {

    const { colors } = useThemeContext();
    const { emailVerified } = auth().currentUser;

    return (
        <DialogCenter
            CallerContent={() =>
                <Octicons
                    name={emailVerified ? "verified" : "unverified"}
                    size={20} color={colors.text}
                    style={{ marginHorizontal: 10 }}
                />
            }

            DialogContent={({ closeDialog }) =>
                <>
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name={emailVerified ? "email-check" : "email-remove"}
                            size={30} color={colors.text}
                            style={{ marginBottom: 6 }}
                        />
                        {emailVerified ?
                            <Text>Your email address has been verified.</Text> :
                            <>
                                <Text>{`Your email address has not been verified.\n`}</Text>
                                <Text>Click "Send" to get the verification link.</Text>
                            </>
                        }

                    </View>
                    <BtnContainer style={{ marginTop: 20 }}>
                        {emailVerified ?
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
                </>
            }
        />
    )
}