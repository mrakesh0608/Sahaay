import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function BrainTumorDet() {
    return (
        <ModelContainer
            introTxt='A brain tumor is a growth of abnormal cells in the brain. Deep learning models are used to detect the brain tumor by taking the images of magnetic resonance imaging(MRI).'

            serverPath='brain-tumor-classification'
            datasetName='brain-tumor'
        />
    );
}