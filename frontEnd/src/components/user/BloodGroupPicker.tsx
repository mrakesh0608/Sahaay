import React, { useState } from 'react';
import { View } from 'react-native';

import { DialogBottom, DummyTextInput, OptionWithIcon } from '#src/elements';

const list = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

export function BloodGroupPicker({
    value = '',
    errTxt = '',
    onChange = () => { }
}: {
    value?: string
    onChange?: any,
    errTxt?: string
}) {

    const [val, setVal] = useState(value);

    function handleChange(val: string, close: any) {
        setVal(val);
        onChange(val);
        close();
    }

    return (
        <DialogBottom
            CallerContent={({ showDialog }) =>
                <DummyTextInput
                    onPress={showDialog}
                    placeholder={'Blood Group'}
                    value={val}
                    errTxt={errTxt}
                />
            }

            DialogTitle='Select Your Blood Group'

            DialogContent={({ closeDialog }) =>
                <View>
                    {list.map((item, index) =>
                        <OptionWithIcon
                            key={index}
                            title={item}
                            onPress={() => handleChange(item, closeDialog)}
                            selectedVal={val}
                        />
                    )}
                </View>
            }
        />
    );
}