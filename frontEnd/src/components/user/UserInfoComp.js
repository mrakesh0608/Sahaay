import { StyleSheet, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as utils from '#src/utils';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { EmailVerifComp } from '#src/components/user/EmailVerifComp';
import { CardContainer } from '#src/components/cards/CardContainer';
import { UserImg } from '#src/components/user/UserImg';

import { Text } from '#src/elements';

export function UserInfoComp() {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const { navigate } = useNavigation();
    const { user, age } = useAuthContext();

    const { email, displayName, phoneNumber, metadata } = user;

    return (
        <CardContainer style={styles.container}>

            <Pressable
                hitSlop={20}
                onPress={() => navigate('UserStack', { screen: 'User Edit Screen' })}
                style={({ pressed }) => [{
                    position: 'absolute', right: 12, top: 12,
                    opacity: pressed ? 0.5 : 1
                }]}
            >
                <Feather name="edit" size={14} color={colors.text} />
            </Pressable>
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
                    {phoneNumber && <Text>{phoneNumber}</Text>}
                    <Text style={{ color: 'gray', fontSize: 12 }}>Joined {utils.timeDiff(metadata.creationTime)}</Text>
                    {age && <Text style={{ color: 'gray', fontSize: 12 }}>{age} years old</Text>}
                </View>
            </View>

        </CardContainer>
    )
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#FFD580',
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
        color: colors.text,
        marginRight: 10
    }
})