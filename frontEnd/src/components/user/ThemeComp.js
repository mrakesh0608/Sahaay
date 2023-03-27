import { View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import useAuthContext from '@hooks/context/useAuthContext';
import useThemeContext from '@hooks/context/useThemeContext';

import DialogTitleCloseDesc from '@components/dialogs/DialogTitleCloseDesc';
import { OptionWithIcon } from '@components/elements';
import MenuCard from '@components/cards/MenuCard';

export default function ThemeComp() {

    const { Theme, dispatch } = useAuthContext();
    const { colors } = useThemeContext();

    return (
        <DialogTitleCloseDesc
            CallerContent={() =>
                <MenuCard
                    title='Theme'
                    Icon={() => <MaterialCommunityIcons
                        name="circle-half-full"
                        size={24} color={colors.text}
                    />}
                    desc={Theme}
                />
            }

            DialogTitle='Choose Theme'

            DialogContent={() =>
                <View>
                    <OptionWithIcon
                        title={'System Default'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'System Default' })}
                        selectedVal={Theme}

                        Icon={() => <MaterialCommunityIcons
                            name="circle-half-full"
                            size={24} color={colors.text}
                        />}
                    />
                    <OptionWithIcon
                        title={'Light'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Light' })}
                        selectedVal={Theme}

                        Icon={() => <Ionicons name="sunny" size={24} color={colors.text} />}
                    />
                    <OptionWithIcon
                        title={'Dark'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Dark' })}
                        selectedVal={Theme}

                        Icon={() => <Ionicons name="moon" size={24} color={colors.text} />}
                    />
                </View>
            }
        />
    );
}