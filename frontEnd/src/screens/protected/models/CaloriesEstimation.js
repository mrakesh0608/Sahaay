import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() {
    return 'https://raw.githubusercontent.com/Praneet9/Skin_Disease/master/Bot/scripts/imgs/03DermatitisArm.jpg';
}

export default function CaloriesEstimation() {

    return (
        <ModelContainer
            introTxt={'\t\t\t\tCalories Estimation'}
            randomImgUrl={randomImgUrl}

            serverPath={'/skin-infection-detection'}
        />
    );
}