import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function BrainTumorDet() {
    return (
        <ModelContainer
            introTxt={`\t\t\t\tA brain tumor is a growth of abnormal cells in the brain. Deep learning models are used to detect the brain tumor by taking the images of magnetic resonance imaging(MRI).`}

            serverPath='brain-tumor-detection'
            datasetName='brain-tumor'
        />
    );
}