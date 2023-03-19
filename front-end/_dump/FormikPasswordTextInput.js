import { useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TextInput } from '@components/elements/TextInput';

import formStyles from '@styles/formStyles';

export default function FormikPasswordTextInput({ placeholder, formikProps, varName }) {

    if (!formikProps || !varName) return;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeText={formikProps.handleChange(varName)}
                value={formikProps.values[varName]}

                style={[formStyles.input, { paddingRight: 60 }]}

                onBlur={formikProps.handleBlur(varName)}

                secureTextEntry={!showPassword}
            />
            {formikProps.values[varName] &&
                <Feather
                    name={showPassword ? 'eye-off' : 'eye'} size={20} color="white"
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 24,
                    }}
                    onPress={() => { setShowPassword(!showPassword) }}
                />
            }
        </View>
    );
}