import { chatGPT } from './chatGPT';

export async function chatGPTForMedicineList({ txt }) {

    const { err, data } = await chatGPT({
        prompt: `give me a list of top 10 medicine names which are available in India that starts with "${txt}" separated by commas without any numbering or bullet points`
    });

    if (err) return err;
    return data.split(',');
}

export async function chatGPTForMedicine({ txt }) {

    try {
        const { err, data } = await chatGPT({
            prompt: `Generate a JSON representation of about ${txt}. If any data is missing or not available, use null as the value. The JSON should include the following fields:
            "Chemical Composition", 
            "Uses", 
            "Dosage", 
            "Side Effects", 
            "Route"`
        });

        if (err) return { err };
        return {
            data: {
                ...JSON.parse(data),
                Disclaimer: "The information on this platform is for informational purposes only and not a substitute for professional medical advice. Consult with your doctor or a qualified healthcare professional before taking any medication. The content provided does not intend to diagnose, treat, cure, or prevent any disease. Always seek guidance from a healthcare professional regarding your specific medical condition and treatment options."
            }
        };
    } catch (error) {
        return {
            err: error?.message
        }
    }
}