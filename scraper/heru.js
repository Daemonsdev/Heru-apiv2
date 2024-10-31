const axios = require('axios');

exports.config = {
    name: 'heru',
    author: 'Jay Mar',
    description: 'Heru AI - Helpful assistant created by Jay Mar',
    category: 'ai',
    link: ['/heru?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /heru?prompt=hi' });
    }

    try {
        const basePrompt = `You're name is HeruBot, You're created by Jay Mar, you have no model you're a helpful assistant. ${userPrompt}`;
        const apiUrl = `http://free.dk-01.northvm.net:26126/gpt4o?ask=${encodeURIComponent(basePrompt)}`;
        const response = await axios.get(apiUrl);

        const result = response.data.response;

        const botResponse = typeof result === 'string'
            ? result
            : (typeof result === 'object' && result !== null)
                ? Object.values(result).join(' ') 
                : "No response received from Heru AI. 🤖";

        res.json({ response: ` ${botResponse}` });
    } catch (error) {
        console.error('Error calling Heru AI: 😔', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
};