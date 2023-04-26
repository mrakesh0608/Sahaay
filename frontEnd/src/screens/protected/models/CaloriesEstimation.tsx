import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function CaloriesEstimation() {
    return (
        <ModelContainer
            introTxt={`\t\t\t\tCalories Estimation`}

            serverPath='calories-estimation'
            datasetName='calories'
        />
    );
}