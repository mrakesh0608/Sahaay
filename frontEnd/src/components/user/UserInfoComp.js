import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as utils from '#src/utils';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { EmailVerifComp } from '#src/components/user/EmailVerifComp';
import { CardContainer } from '#src/components/cards/CardContainer';
import { UserImg } from '#src/components/user/UserImg';

import { Text } from '#src/elements';
import { UserEdit } from './UserEdit';

export function UserInfoComp() {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const { navigate } = useNavigation();
    const { user, age } = useAuthContext();

    const { email, displayName, phoneNumber, metadata } = user;

    return (
        <TouchableOpacity onPress={() => navigate('UserStack', { screen: 'User Profile', params: { uid: user.uid } })}>
            <CardContainer style={styles.container}>
                <UserEdit />
                <View style={styles.userImg}>
                    <UserImg />
                </View>

                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.displayName}>{displayName}</Text>
                    </View>
                    <View>
                        {email &&
                            <View style={styles.email}>
                                <Text style={styles.emailText}>{email}</Text>
                                <EmailVerifComp />
                            </View>
                        }
                        {phoneNumber && !email && <Text>{phoneNumber}</Text>}
                        {age ?
                            <Text style={{ color: 'gray', fontSize: 12 }}>{age} years old</Text> :
                            <Text style={{ color: 'gray', fontSize: 12 }}>Joined {utils.timeDiff(metadata.creationTime)}</Text>
                        }
                    </View>
                </View>

            </CardContainer>
        </TouchableOpacity>
    )
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#FFD580',
        marginTop: 0 //to override default style set by cardcontainer 
    },
    userImg: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'space-between',

        marginLeft: 20,
    },
    displayName: {
        fontSize: 22,
        marginBottom: 15,
        color: colors.text,
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        color: colors.text
    }
})