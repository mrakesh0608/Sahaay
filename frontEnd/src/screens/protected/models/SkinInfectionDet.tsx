import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function SkinInfectionDet() {
    return (
        <ModelContainer
            introTxt={`\t\t\t\tSkin diseases are more common than other diseases. Skin diseases may be caused by fungal infection, bacteria, allergy, or viruses, etc. This model can be used for detection, extraction and classification of skin diseases images using deep learning.`}

            serverPath='skin-infection-detection'
            datasetName='skin-infection'
        />
    );
}