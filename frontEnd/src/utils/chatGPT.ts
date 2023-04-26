import remoteConfig from '@react-native-firebase/remote-config';
import { Configuration, OpenAIApi } from 'openai';

export async function chatGPT({ txt }) {
    try {
        const openai = new OpenAIApi(new Configuration({
            apiKey: remoteConfig().getValue('OPENAI_API_KEY').asString()
        }));

        const check = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `give me the answer in boolean [0,1] if this sentence belongs to the medical field "${txt}"`,
            max_tokens: 2048,
        });

        const flag = check.data.choices[0].text.trim();

        if ([1, "1", true, "True"].includes(flag)) {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: txt,
                max_tokens: 2048,
            });

            // console.log(JSON.stringify(completion,null,2));
            return (completion.data.choices[0].text).trim();
        }
        else return "Sorry, this question is not related to the medical field."
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