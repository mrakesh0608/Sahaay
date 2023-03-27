import * as React from "react";

import { TextInput, TextInputProps } from '@components/elements/TextInput';


interface myProps extends TextInputProps {
    formikProps: any,
    varName: any,
}

export default function FormikTextInput({
    formikProps, varName, ...rest
}: React.PropsWithChildren<myProps>) {

    if (!formikProps || !varName) return;

    return (
        <TextInput
            onChangeText={formikProps.handleChange(varName)}
            value={formikProps.values[varName]}
            onBlur={formikProps.handleBlur(varName)}

            errTxt={formikProps.touched[varName] && formikProps.errors[varName]}
            {...rest}
        />
    );
}