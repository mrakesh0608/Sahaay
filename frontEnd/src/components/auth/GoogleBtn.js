import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import useGoogleOAuth from "@hooks/auth/useGoogleOAuth";
import { CapsuleBtn } from '@components/elements';

export default function GoogleBtn({
    title = 'Sign in with Google'
}) {
    const { signIn, isPending } = useGoogleOAuth();

    return (
        <CapsuleBtn
            title={title}
            TextLeftComp={({ color }) =>
                <AntDesign name="google" size={24} color={color} />
            }
            onPress={signIn}
            isPending={isPending}
        />
    )
}