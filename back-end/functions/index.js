const functions = require("firebase-functions");
const tf = require("@tensorflow/tfjs");

const { Image } = require('canvas');

exports.KidneyStoneDetection = functions.https.onRequest(async (req, res) => {

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");

    const model = await tf.loadLayersModel('https://firebasestorage.googleapis.com/v0/b/sahaay-6a05b.appspot.com/o/Kidney%20Stone%20Model%2Fmodel.json?alt=media&token=45dc9999-4b01-43b2-ad24-409f5707f2fd');

    let labelPrediction = '';

    const img = new Image()

    img.onload = async function () {

        const resized = tf.image.resizeBilinear(tf.browser.fromPixels({
            data: new Uint8Array(img.data),
            width: img.width,
            height: img.height
        }), [150, 150]);
        const expanded = tf.expandDims(resized);
        const result = model.predict(expanded);

        if (result.dataSync()[0] === 1) {
            labelPrediction = 'Kidney Stone Detected';
        } else {
            labelPrediction = 'No Kidney Stone Detected';
        }
        res.status(200).send({ prob: labelPrediction });
    };

    img.src = 'https://firebasestorage.googleapis.com/v0/b/sahaay-6a05b.appspot.com/o/Kidney%20Stone%20Model%2Ftest.jpg?alt=media&token=8ddb30ea-15fe-4f37-aab6-3c7d6f1da9e4';

    console.log(labelPrediction);
});