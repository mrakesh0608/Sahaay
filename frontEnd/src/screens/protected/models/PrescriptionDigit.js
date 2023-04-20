import { randomNumBetween } from '#src/utils';
import { ModelContainer } from '#src/components/model/ModelContainer';

async function randomImgUrl() { }

export default function PrescriptionDigit() {
    return (
        <ModelContainer
            introTxt={'\t\t\t\tPrescription Digitization'}
            randomImgUrl={randomImgUrl}

            serverPath={'/prescription-digitization'}
        />
    );
}