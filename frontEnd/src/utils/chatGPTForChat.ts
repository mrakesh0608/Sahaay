import { chatGPT } from './chatGPT';

export async function chatGPTForChat({ txt }) {

    const { err, data: flag } = await chatGPT({
        txt: `give answer true if quoted text related to health, hospital or medical field "${txt}" else false"`
    });

    if (err) return err;

    if (flag.includes('true') || flag.includes('True')) {
        const { err, data } = await chatGPT({ txt });

        if (err) return err;
        return data;
    }
    else return "Sorry, this question is not related to the medical field."
}