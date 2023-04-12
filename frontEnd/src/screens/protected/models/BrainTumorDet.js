import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() { }

export default function BrainTumorDet() {

    return (
        <ModelContainer
            introTxt={'\t\t\t\tA brain tumor is a growth of abnormal cells in the brain. Deep learning models are used to detect the brain tumor by taking the images of magnetic resonance imaging.'}
            randomImgUrl={randomImgUrl}

            serverPath={'/brain-tumor-detection'}
        />
    );
}