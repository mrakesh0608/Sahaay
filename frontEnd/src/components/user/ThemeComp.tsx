import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { useAuthContext } from '#src/context/AuthContext';
import { useThemeContext } from '#src/context/ThemeContext';

import { MenuCard } from '#src/components/cards/MenuCard';
import { DialogBottom, OptionWithIcon } from '#src/elements';

export function ThemeComp() {

    const { theme, dispatch } = useAuthContext();
    const { colors } = useThemeContext();

    return (
        <DialogBottom
            CallerContent={() =>
                <MenuCard
                    title='Theme'
                    Icon={() => <MaterialCommunityIcons
                        name="circle-half-full"
                        size={24} color={colors.text}
                    />}
                    desc={theme}
                />
            }

            DialogTitle='Choose Theme'

            DialogContent={() =>
                <View>
                    <OptionWithIcon
                        title={'System Default'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'System Default' })}
                        selectedVal={theme}

                        Icon={() => <MaterialCommunityIcons
                            name="circle-half-full"
                            size={24} color={colors.text}
                        />}
                    />
                    <OptionWithIcon
                        title={'Light'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Light' })}
                        selectedVal={theme}

                        Icon={() => <Ionicons name="sunny" size={24} color={colors.text} />}
                    />
                    <OptionWithIcon
                        title={'Dark'}
                        onPress={() => dispatch({ type: 'SET_THEME', payload: 'Dark' })}
                        selectedVal={theme}

                        Icon={() => <Ionicons name="moon" size={24} color={colors.text} />}
                    />
                </View>
            }
        />
    );
}