import { View } from 'react-native';
import auth from '@react-native-firebase/auth';

import SignOutComp from '@components/user/SignOutComp';
import ThemeComp from '@components/user/ThemeComp';
import Text from "@components/elements/Text";

export default function SettingsScreen() {

    const { email, displayName, emailVerified, phoneNumber, photoURL, uid, } = auth().currentUser;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            {auth().currentUser &&
                <>
                    <Text>Name : {displayName}</Text>
                    <Text>Email : {email}</Text>
                    <Text>emailVerified : {emailVerified ? 'Yes' : 'No'}</Text>
                    <Text>phoneNumber : {phoneNumber}</Text>
                    <Text>photoURL : {photoURL}</Text>
                    <Text>uid : {uid}</Text>
                </>
            }
            <ThemeComp />
            <SignOutComp />
        </View>
    );
}