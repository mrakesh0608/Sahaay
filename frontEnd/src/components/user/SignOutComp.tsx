import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSignOut } from '#src/hooks';

import { Text, ZoomBtn, BtnContainer, DialogCenter } from '#src/elements';
import { MenuCard } from '#src/components/cards/MenuCard';

export function SignOutComp() {

    const { signOut } = useSignOut();

    return (
        <DialogCenter
            CallerContent={() =>
                <MenuCard
                    title='Sign Out'
                    Icon={({ color }) =>
                        <MaterialCommunityIcons
                            name='logout'
                            size={24} color={color}
                        />
                    }
                />}
            DialogContent={({ closeDialog }) =>
                <>
                    <Text style={{ textAlign: 'center' }}>Are you sure you want to sign out?</Text>
                    <BtnContainer style={{ marginTop: 20 }}>
                        <ZoomBtn
                            title='Cancel'
                            onPress={closeDialog}
                        />
                        <ZoomBtn
                            title='Sign Out'
                            onPress={signOut}
                            style={{ backgroundColor: 'red' }}
                        />
                    </BtnContainer>
                </>
            }
        />
    );
}