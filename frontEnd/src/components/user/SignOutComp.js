import { MaterialCommunityIcons } from '@expo/vector-icons';

import useSignOut from '@hooks/auth/useSignOut';

import DialogCenterWithBtn from '@components/dialogs/DialogCenter';
import { Text, ZoomBtn, BtnContainer } from '@components/elements';
import MenuCard from '@components/cards/MenuCard';

export default function SignOutComp() {

    const { signOut } = useSignOut();

    return (
        <DialogCenterWithBtn
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