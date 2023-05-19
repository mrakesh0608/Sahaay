import React from 'react';

import { IntroText, Text } from '#src/elements';
import { DefaultScreen, QRCodeGenerator } from '#src/components';

import gStyles from '#src/styles/gStyles';

export default function DigitalPrescription() {

    return (
        <DefaultScreen>
            <IntroText>With Digital Prescription, doctors can now write prescriptions in a convenient and modern way. They simply need to scan the patient's QR code using any QR code scanner, write the medication, and the prescription will be generated digitally. This eliminates the need for traditional paper prescriptions, making the process faster, more reliable, and efficient.</IntroText>
            {/* <QRCodeGenerator /> */}
            <Text style={[gStyles.h2, { textAlign: 'center' }]}>{`Under Development :)`}</Text>
        </DefaultScreen>
    )
}