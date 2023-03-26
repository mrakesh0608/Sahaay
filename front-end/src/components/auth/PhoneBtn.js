import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

import { CapsuleBtn } from '@components/elements'

export default function PhoneBtn({
    title = 'Sign in with Phone Number'
}) {

    const { navigate } = useNavigation();

    return (
        <CapsuleBtn
            title={title}
            onPress={() => navigate('Sign In With Phone')}
            TextLeftComp={({ color }) =>
                <FontAwesome name="phone" size={24} color={color} />
            }
        />
    )
}

