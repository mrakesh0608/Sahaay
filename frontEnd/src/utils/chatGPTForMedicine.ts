import { chatGPT } from './chatGPT';

export async function chatGPTForMedicineList({ txt }) {

    const { err, data } = await chatGPT({
        txt: `give me a list of top 10 medicine names which are available in India that starts with "${txt}" separated by commas without any numbering or bullet points`
    });

    if (err) return err;
    return data.split(',');
}


export async function chatGPTForMedicine({ txt }) {

    const { err, data } = await chatGPT({
        txt: `give chemical composition, uses, dosage, side effects, route & disclaimer of medicine "${txt}"`
    });

    if (err) return err;
    return data;
}