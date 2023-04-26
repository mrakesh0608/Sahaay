import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';

import { DialogBottom, DummyTextInput, OptionWithIcon } from '#src/elements';
import { capitalize } from '#src/utils';

export function GenderPicker({
    value = '',
    errTxt = '',
    onChange = () => { }
}: {
    value?: string
    onChange?: any,
    errTxt?: string
}) {

    const [val, setVal] = useState(value);

    const { colors } = useThemeContext();

    function handleChange(gender: string, close: any) {
        setVal(gender);
        onChange(gender);
        close();
    }

    return (
        <DialogBottom
            CallerContent={({ showDialog }) =>
                <DummyTextInput
                    onPress={showDialog}
                    placeholder={'Gender'}
                    value={capitalize(val)}
                    errTxt={errTxt}
                />
            }

            DialogTitle='Select Your Gender'

            DialogContent={({ closeDialog }) =>
                <View>
                    <OptionWithIcon
                        title={'Male'}
                        onPress={() => handleChange('male', closeDialog)}
                        selectedVal={val}

                        Icon={() => <MaterialCommunityIcons
                            name='gender-male'
                            size={24} color={colors.text}
                        />}
                    />
                    <OptionWithIcon
                        title={'Female'}
                        onPress={() => handleChange('female', closeDialog)}
                        selectedVal={val}

                        Icon={() => <MaterialCommunityIcons
                            name='gender-female'
                            size={24} color={colors.text}
                        />}
                    />
                    <OptionWithIcon
                        title={'Prefer Not to Say'}
                        onPress={() => handleChange('prefer not to say', closeDialog)}
                        selectedVal={val}

                        Icon={() =>
                            <MaterialCommunityIcons
                                name='circle-outline'
                                size={20} color={colors.text}
                                style={{
                                    marginHorizontal: 2
                                }}
                            />}
                    />
                </View>
            }
        />
    );
}