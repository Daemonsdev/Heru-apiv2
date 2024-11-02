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
        return res.status(400).json({ message: 'Usage: /heru?prompt=hi' });
    }

    try {
        const basePrompt = `Your name is HeruBot 🤖☠️. You were created by Jay Mar 🙋🏻‍♂️🙈, and you have no model ✨💫. You are a helpful assistant 🥰🌟. ${userPrompt}`;
        const apiUrl = `https://www.pinkissh.site/api/gpt4?prompt=${encodeURIComponent(basePrompt)}`;
        const response = await axios.get(apiUrl);

        // Extract the response data
        const result = response.data.response;

        // Prepare bot response
        const botResponse = typeof result === 'string'
            ? result
            : (typeof result === 'object' && result !== null)
                ? Object.values(result).join(' ') 
                : "No response received from Heru AI. 🤖";

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error calling Heru AI:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
};
