import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useAuthContext from '@hooks/context/useAuthContext';
import useThemeContext from '@hooks/context/useThemeContext';

import PopUpContainer from '@components/pop-ups/PopUpContainer';
import Option from '@components/elements/Option';
import MenuCard from '../cards/MenuCard';
import Text from '../elements/Text';

export default function ThemeComp() {

    const { Theme, dispatch } = useAuthContext();
    const { colors } = useThemeContext();

    return (
        <PopUpContainer
            CallerContent={() =>
                <MenuCard
                    Icon={() => <MaterialCommunityIcons
                        name="circle-half-full"
                        size={24} color={colors.text}
                    />}
                    title='Theme'
                    desc={Theme}
                />
            }
            PopUpContent={({ hideModel, mStyles, PopUpBtn }) =>
                <View style={{}}>
                    <Text style={{ alignSelf: 'center' }}>Choose Theme</Text>
                    <Option
                        title={'System Default'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'System Default' })}
                        selectedVal={Theme}
                    />
                    <Option
                        title={'Light'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Light' })}
                        selectedVal={Theme}
                    />
                    <Option
                        title={'Dark'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Dark' })}
                        selectedVal={Theme}
                    />
                </View>
            }
        />
    );
}