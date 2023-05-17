import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function PrescriptionDigit() {

    return (
        <ModelContainer
            introTxt='Prescription Digitization'

            serverPath='prescription-digitization'
            datasetName='prescription'
        />
    );
}