import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function PrescriptionDigit() {

    return (
        <ModelContainer
            introTxt='Prescription digitization with deep learning means converting paper prescriptions into digital records, making them easier to manage. It improves healthcare efficiency, enhances patient safety, and provides convenient access to medical information for better care.'
            serverPath='prescription-digitization'
            datasetName='prescription'
        />
    );
}