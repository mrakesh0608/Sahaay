import * as React from "react";
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TextInput, TextInputProps } from '@components/elements/TextInput';

import useThemeContext from "@hooks/context/useThemeContext";

interface myProps extends TextInputProps {
    formikProps: any,
    varName: any,
}

export default function FormikPasswordTextInput({
    formikProps, varName, ...rest
}: React.PropsWithChildren<myProps>) {

    const { colors } = useThemeContext();

    const [showPassword, setShowPassword] = React.useState(false);

    if (!formikProps || !varName) return;

    return (
        <View>
            <TextInput
                onChangeText={formikProps.handleChange(varName)}
                value={formikProps.values[varName]}
                onBlur={formikProps.handleBlur(varName)}

                style={{ paddingRight: 60 }}

                errTxt={formikProps.touched[varName] && formikProps.errors[varName]}

                secureTextEntry={!showPassword}

                {...rest}
            />
            {formikProps.values[varName] &&
                <Feather
                    name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.text}
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 28,
                    }}
                    onPress={() => { setShowPassword(!showPassword) }}
                />
            }
        </View>
    );
}