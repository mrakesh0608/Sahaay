import { useThemeContext } from "#src/context/ThemeContext";
import { CapsuleBtn } from "#src/elements";
import { useGoogleOAuth } from "#src/hooks";
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import React from "react";

// account completely not signed out after deleting
export function DeleteMyAccount() {

    const { colors } = useThemeContext();
    const { signOut } = useGoogleOAuth();

    return (
        <CapsuleBtn
            title="Delete My Account"
            TextLeftComp={() =>
                <AntDesign name="deleteuser" size={24} color={'white'} />
            }
            containerStyle={{
                backgroundColor: 'red'
            }}
            textStyle={{ color: 'white' }}
            onPress={async () => {
                if (auth().currentUser?.providerData[0]?.providerId !== 'google.com') await signOut();
                auth().currentUser.delete()
                auth().signOut();
            }}
        />
    );
}