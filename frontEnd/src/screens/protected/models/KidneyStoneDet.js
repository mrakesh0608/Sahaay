import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() {
    let Type = 'Normal'
    if (Math.random() > 0.5) Type = 'Stone'
    imgNo = randomNumBetween(1001, 1300);

    return `https://raw.githubusercontent.com/mrakesh0608/Kidney-Stone-Detection/master/CT_images/Test/${Type}/${Type}-%20(${imgNo}).jpg`
}

export default function KidneyStoneDet() {
    return (
        <ModelContainer
            introTxt={'\t\t\t\tThe Kidney stones are a hard collection of salt and minerals, often calcium and uric acid that form in the kidneys.'}
            randomImgUrl={randomImgUrl}

            serverPath={'/kidney-stone-detection'}
        />
    );
}