const functions = require("firebase-functions");
const tf = require("@tensorflow/tfjs");

exports.predict = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    let data = req.query.data;
    data = data.split(",");
    let df = [];
    data.forEach((e) => {
        df.push(parseInt(e));
    });
    predict(df).then((pred) => {
        res.status(200).send({ prob: pred[0] });
    });
});

async function predict(data) {
    let model = await tf.loadLayersModel(
        "https://firebasestorage.googleapis.com/v0/b/final-9bcc6.appspot.com/o/model.json?alt=media&token=24550a90-cdf0-405b-a67c-5e09dc0e45d7"
    );
    let input = tf.tensor1d(data);
    input = input.expandDims(0);
    return model.predict(input).dataSync();
}