const axios = require('axios');
const settings = require('../../../settings');

async function callGPT(prompt) {
    try {
        console.log('Sending prompt to GPT:', prompt);
        const response = await axios.post(
            settings.openaiApiUrl,
            {
                model: settings.openaiModel,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: settings.openaiMaxTokens,
                temperature: settings.openaiTemperature,
            },
            {
                headers: {
                    Authorization: `Bearer ${settings.openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(
            'Received response from GPT:',
            JSON.stringify(response.data, null, 2)
        );
        if (
            !response.data ||
            !response.data.choices ||
            !response.data.choices.length
        ) {
            console.error(
                'Unexpected GPT response format:',
                JSON.stringify(response.data, null, 2)
            );
            return { error: 'Invalid response structure from GPT' };
        }

        const gptContent =
            response.data.choices[0].message?.content ||
            response.data.choices[0].text;
        console.log('Extracted content from GPT response:', gptContent);
        return gptContent;
    } catch (error) {
        console.error(`Error calling GPT: ${error.message}`);
        if (error.response) {
            console.error(
                'Error response data:',
                JSON.stringify(error.response.data, null, 2)
            );
        }
        return { error: 'Failed to communicate with GPT service' };
    }
}

module.exports = { callGPT };
