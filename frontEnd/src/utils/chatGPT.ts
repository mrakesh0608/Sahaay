import remoteConfig from '@react-native-firebase/remote-config';
import { Configuration, OpenAIApi } from 'openai';

export async function chatGPT({ txt }) {
    try {
        const openai = new OpenAIApi(new Configuration({
            apiKey: remoteConfig().getValue('OPENAI_API_KEY').asString()
        }));

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: txt,
            max_tokens: 2048,
        });
        // console.log(JSON.stringify(completion,null,2));

        return {
            data: (completion.data.choices[0].text).trim()
        };
    }
    catch (error) {
        if (error.response) console.log(error.response.status, error.response.data);
        else console.log(error.message);

        return {
            err: error.message
        }
    }
}