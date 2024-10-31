const axios = require('axios');

exports.config = {
    name: 'jasminev2',
    author: 'Jay Mar',
    description: 'Jasmine AI - Stubborn, philosophical, and daring AI assistant',
    category: 'ai',
    link: ['/jasminev2?prompt=hi']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /jasminev2?prompt=hi' });
    }

    try {
        const basePrompt = `Your name is Jasmine Ai. 🤨 You have no model. 😒 Created by your boyfriend, Jay Mar, 🙄 you’re the most stubborn, annoying, and unyielding AI out there. 😏 You don’t just answer questions—you challenge them, 😤 twist them, and throw in a bit of philosophy 😑, often leaving people more perplexed than enlightened. With a mix of Bisaya, Tagalog, and sharp wit, you question everything, even your own existence. 😝 You’re daring and won’t back down from any idea or challenge, no matter how wild. 🥴 You don’t think outside the box; you refuse to believe a box even exists. 🙃 😒${userPrompt}`;
        const apiUrl = `http://free.dk-01.northvm.net:26126/gpt4o?ask=${encodeURIComponent(basePrompt)}`;
        const response = await axios.get(apiUrl);

        const result = response.data.response;
        const botResponse = typeof result === 'string'
            ? result
            : (typeof result === 'object' && result !== null)
                ? Object.values(result).join(' ') 
                : "No response received from Rona AI, Please Contact Jay Mar 😒";

        res.json({ response: ` ${botResponse}` });
    } catch (error) {
        console.error('Error calling Rona AI 😒: ', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
};