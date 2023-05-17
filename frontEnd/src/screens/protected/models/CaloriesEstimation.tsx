import React from 'react';
import { ModelContainer } from '#src/components/model/ModelContainer';

import gStyles from '#src/styles/gStyles';
import { Text } from '#src/elements';

export default function CaloriesEstimation() {
    return (
        <>
            <ModelContainer
                introTxt='Calories Estimation'

                serverPath='calories-estimation'
                datasetName='calories'

                FooterComponet={<Text style={[gStyles.h2, { marginBottom: 26 }]}>{`Under Development :)`}</Text>}
            />
        </>
    );
}