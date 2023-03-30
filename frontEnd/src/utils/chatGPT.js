const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function chatGPT({ txt }) {

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: txt,
            max_tokens: 2048,
        });

        console.log(completion.data.choices);
        return (completion.data.choices[0].text).trim();
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return error.message;
    }
}