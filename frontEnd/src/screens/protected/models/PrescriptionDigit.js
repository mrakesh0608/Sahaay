import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() { }

export default function PrescriptionDigit() {
    return (
        <ModelContainer
            introTxt={'\t\t\t\t..'}
            randomImgUrl={randomImgUrl}

            serverPath={'/prescription-digitization'}
        />
    );
}