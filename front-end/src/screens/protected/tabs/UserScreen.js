import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import useThemeContext from '@hooks/context/useThemeContext';

import CardContainer from '@components/cards/CardContainer';
import UserInfoCard from '@components/cards/UserInfoCard';
import SignOutComp from '@components/user/SignOutComp';
import DefaultScreen from '@components/DefaultScreen';
import ThemeComp from '@components/user/ThemeComp';
import MenuCard from '@components/cards/MenuCard';


export default function UserScreen() {

    const { navigate } = useNavigation();
    const { colors } = useThemeContext();

    return (
        <DefaultScreen>
            <UserInfoCard />
            <CardContainer><ThemeComp /></CardContainer>
            <CardContainer>
                <MenuCard
                    title='App info'
                    onPress={() => navigate('About')}
                    Icon={() =>
                        <MaterialCommunityIcons
                            name='information-outline'
                            size={24} color={colors.text}
                        />
                    }
                />
            </CardContainer>
            <CardContainer><SignOutComp /></CardContainer>
        </DefaultScreen>
    );
}