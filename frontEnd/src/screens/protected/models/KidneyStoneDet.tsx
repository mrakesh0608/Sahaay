import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function KidneyStoneDet() {
    return (
        <ModelContainer
            introTxt='The Kidney stones are a hard collection of salt and minerals, often calcium and uric acid that form in the kidneys.'

            serverPath='kidney-stone-detection'
            datasetName='kidney-stone'
        />
    );
}