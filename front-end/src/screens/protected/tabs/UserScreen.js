import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import UserInfoComp from '@components/user/UserInfoComp';
import SignOutComp from '@components/user/SignOutComp';
import DefaultScreen from '@components/DefaultScreen';
import ThemeComp from '@components/user/ThemeComp';
import MenuCard from '@components/cards/MenuCard';

export default function UserScreen() {

    const { navigate } = useNavigation();

    return (
        <DefaultScreen>
            <UserInfoComp />
            <ThemeComp />
            <MenuCard
                title='App info'
                onPress={() => navigate('App info')}
                Icon={({ color }) =>
                    <MaterialCommunityIcons
                        name='information-outline'
                        size={24} color={color}
                    />
                }
            />
            <SignOutComp />
        </DefaultScreen>
    );
}