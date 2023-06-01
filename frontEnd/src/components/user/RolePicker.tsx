import React, { useState } from 'react';
import { View } from 'react-native';
import { FontAwesome, Fontisto } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';

import { DialogBottom, DummyTextInput, OptionWithIcon } from '#src/elements';
import { capitalize } from '#src/utils';

export function RolePicker({
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
                    placeholder={'Role'}
                    value={capitalize(val)}
                    errTxt={errTxt}
                />
            }

            DialogTitle='Choose Your Role'

            DialogContent={({ closeDialog }) =>
                <View>
                    <OptionWithIcon
                        title={'Doctor'}
                        onPress={() => handleChange('doctor', closeDialog)}
                        selectedVal={val}

                        Icon={() =>
                            <Fontisto name="doctor" size={24} color={colors.text} />
                        }
                    />
                    <OptionWithIcon
                        title={'Patient'}
                        onPress={() => handleChange('patient', closeDialog)}
                        selectedVal={val}

                        Icon={() =>
                            <FontAwesome
                                name='user'
                                size={26} color={colors.text} style={{ marginRight: 2 }}
                            />}
                    />
                </View>
            }
        />
    );
}