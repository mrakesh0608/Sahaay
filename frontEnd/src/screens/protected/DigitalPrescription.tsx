import React from 'react';
import { View } from 'react-native';

import { IntroText } from '#src/elements';
import { DefaultScreen, QRCodeGenerator } from '#src/components';


export default function DigitalPrescription() {
    return (
        <DefaultScreen>
            <IntroText>With Digital Prescription, doctors can now write prescriptions in a convenient and modern way. They simply need to scan the patient's QR code using any QR code scanner, write the medication, and the prescription will be generated digitally. This eliminates the need for traditional paper prescriptions, making the process faster, more reliable, and efficient.</IntroText>
            <View style={{ marginVertical: 20 }} />
            <QRCodeGenerator shareTxt={`Share your code with your Doctor, they can\nscan it with their Sahaay or any QR code scanner\nto write your prescription in Sahaay app.`} />
        </DefaultScreen>
    )
}