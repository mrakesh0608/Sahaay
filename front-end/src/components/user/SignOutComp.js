import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeContext from '@hooks/context/useThemeContext';
import useSignOut from '@hooks/auth/useSignOut';

import PopUpConfirm from '@components/pop-ups/PopUpConfirm';
import MenuCard from '@components/cards/MenuCard';

export default function SignOutComp() {

    const { signOut } = useSignOut();
    const { colors } = useThemeContext();

    return (
        <PopUpConfirm
            CallerContent={() => <MenuCard
                Icon={() => <MaterialCommunityIcons
                    name='logout'
                    size={24} color={colors.text}
                />}
                title='Sign Out'
            />}

            title='Are you sure you want to sign out?'
            No={{
                title: 'Cancel'
            }}
            Yes={{
                title: 'Sign Out',
                onPress: signOut,
                style: { backgroundColor: 'red' }
            }}
        />
    );
}