import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function PrescriptionDigit() {
    return (
        <ModelContainer
            introTxt={`\t\t\t\tPrescription Digitization`}

            serverPath='prescription-digitization'
            datasetName='prescription'
        />
    );
}