import { StyleSheet, View, Image, Pressable } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as utils from '@utils';

import useThemeContext from '@hooks/context/useThemeContext';
import useAuthContext from '@hooks/context/useAuthContext';

import EmailVerifComp from '@components/user/EmailVerifComp';
import CardContainer from '@components/cards/CardContainer';
import Text from '@components/elements/Text';

export default function UserInfoCard() {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const { navigate } = useNavigation();
    const { user, age } = useAuthContext();

    const { email, displayName, phoneNumber, photoURL, metadata } = user;

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
                {photoURL ?
                    <Image
                        source={{ uri: photoURL }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 14,
                        }}
                    /> : <FontAwesome name={'user-o'} size={80} color={colors.text} />
                }
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