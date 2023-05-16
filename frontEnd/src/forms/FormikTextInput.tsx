import * as React from "react";

import { TextInput, TextInputProps } from '#src/elements';

interface myProps extends TextInputProps {
    formikProps: any,
    varName: any,
}

export default function FormikTextInput({
    formikProps, varName, onChangeText, ...rest
}: React.PropsWithChildren<myProps>) {

    if (!formikProps || !varName) return;

    function handleOnChangeText(val: any) {
        if (typeof onChangeText === 'function') onChangeText(val);
        formikProps.setFieldValue(varName, val)
    }

    return (
        <TextInput
            onChangeText={handleOnChangeText}
            value={formikProps.values[varName]}
            onBlur={formikProps.handleBlur(varName)}

            errTxt={formikProps.touched[varName] && formikProps.errors[varName]}
            {...rest}
        />
    );
}