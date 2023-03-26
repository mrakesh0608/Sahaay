import { View } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

import * as myfirebase from '@myfirebase';
import useThemeContext from '@hooks/context/useThemeContext';

import DialogCenterWithBtn from '@components/dialogs/DialogCenter';
import { Text, ZoomBtn, BtnContainer } from '@components/elements';

export default function EmailVerifComp() {

    const { colors } = useThemeContext();
    const { emailVerified } = auth().currentUser;

    return (
        <DialogCenterWithBtn
            CallerContent={() =>
                <Octicons
                    name={emailVerified ? "verified" : "unverified"}
                    size={20} color={colors.text}
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