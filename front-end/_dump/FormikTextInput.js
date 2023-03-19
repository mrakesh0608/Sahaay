import TextInput from '@components/elements/TextInput';
import formStyles from '@styles/formStyles';

export default function FormikTextInput({ placeholder, formikProps, varName }) {

    if (!formikProps || !varName) return;

    return (
        <>
            <TextInput
                placeholder={placeholder}
                onChangeText={formikProps.handleChange(varName)}
                value={formikProps.values[varName]}

                style={[formStyles.input]}

                onBlur={formikProps.handleBlur(varName)}

                errTxt={formikProps.touched[varName] && formikProps.errors[varName]}
            />
        </>
    );
}