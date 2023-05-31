import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function SkinDiseaseDet() {
    return (
        <ModelContainer
            introTxt='Skin diseases are more common than other diseases. Skin diseases may be caused by fungal infection, bacteria, allergy, or viruses, etc. This model can be used for detection, extraction and classification of skin diseases images using deep learning.'

            serverPath='skin-disease-classification'
            datasetName='skin-disease'
        />
    );
}