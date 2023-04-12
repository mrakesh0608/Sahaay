import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() {
    return 'https://raw.githubusercontent.com/Praneet9/Skin_Disease/master/Bot/scripts/imgs/03DermatitisArm.jpg';
}

export default function SkinInfectionDet() {

    return (
        <ModelContainer
            introTxt={'\t\t\t\tSkin diseases are more common than other diseases. Skin diseases may be caused by fungal infection, bacteria, allergy, or viruses, etc. This model can be used for detection, extraction and classification of skin diseases images using deep learning.'}
            randomImgUrl={randomImgUrl}

            serverPath={'/skin-infection-detection'}
        />
    );
}