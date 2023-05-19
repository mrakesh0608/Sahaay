import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

export default function CaloriesEstimation() {
    return (
        <>
            <ModelContainer
                introTxt={`Want to know how healthy your meal is ? Just take a picture of your food and get all the nutritional details instantly. Find out the calories, protein, fat, carbs, and more with a simple snap! It's an easy way to make informed choices about what you're eating.`}

                serverPath='calories-estimation'
                datasetName='calories'
            />
        </>
    );
}