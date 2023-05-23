import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from '#src/forms/FormikTextInput';
import { SubmitBtn, Text } from '#src/elements';
import { usePED } from "#src/hooks";
import gStyles from "#src/styles/gStyles";

const initialValues = {
    medicineName: '',
    dose: '',
    route: '',
    duration: '',
    instructions: ''
}

export default function MedicationForm({
    values, close, submit
}: {
    values?: Object,
    close: any,
    submit: any
}) {

    const { isPending, setIsPending, error, setError } = usePED();

    return (
        <>
            <Text style={[gStyles.h2, gStyles.txtCenter]}>Add Medication</Text>
            <Formik
                initialValues={values ? values : initialValues}
                validationSchema={validationSchema}
                onSubmit={async (val) => {
                    try {
                        setIsPending(true);
                        if (typeof submit === 'function') await submit({ ...val });
                    } catch (error) {
                        setError(error?.message)
                    } finally {
                        setIsPending(false);
                        if (typeof close === 'function') close();
                    }
                }}
            >
                {props => <>
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='medicineName'
                        placeholder='Medication Name'

                        egText="e.g. Paracetamol"
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='dose'
                        placeholder='Dose'

                        egText="e.g. 1-0-1"
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='route'
                        placeholder='Route'

                        egText="e.g. Orally"
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='duration'
                        placeholder='Duration'

                        egText="e.g. 2 days"
                    />
                    <FormikTextInput
                        formikProps={{ ...props }}
                        varName='instructions'
                        placeholder='Instructions'

                        multiline={true}

                        egText='e.g Consume medicine after food intake'
                    />
                    <SubmitBtn
                        title={'Add'}
                        isPending={isPending}
                        onPress={() => props.handleSubmit()}
                        disabled={props.dirty && (!props.isValid || isPending)}

                        errTxt={error}
                    />
                </>}
            </Formik>
        </>
    );
}

const validationSchema = yup.object({
    medicineName: yup.string().required("Required").min(3),
    dose: yup.string().required("Required"),
    route: yup.string().required("Required"),
    duration: yup.string().required("Required"),
    instructions: yup.string()
})