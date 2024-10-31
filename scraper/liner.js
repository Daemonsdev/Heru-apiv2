const axios = require('axios');

async function liner(prompt) {
    const url = 'https://linerva.getliner.com/platform/copilot/v3/answer';
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'Referer': 'https://getliner.com/',
    };
    const data = {
        spaceId: 18097491,
        threadId: "53007419",
        userMessageId: 59420219,
        userId: 8933542,
        query: prompt,
        agentId: '@liner-pro',
        platform: 'web',
        regenerate: false
    };

    try {
        const response = await axios.post(url, data, { headers });
        const respon = response.data.split('\n');
        const res = JSON.parse(respon[respon.length - 2]);
        return res.answer;
    } catch (error) {
        return error.message;
    }
}

exports.config = {
    name: 'liner',
    author: 'Jay Mar',
    description: 'Interact with Linerva AI using a prompt',
    category: 'ai',
    link: ['/liner?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).json({ message: 'usage: /liner?prompt=hi' });
    }

    try {
        const answer = await liner(prompt);
        res.json({ response: answer });
    } catch (error) {
        console.error("Error fetching data from Linerva API:", error);
        res.status(500).json({ message: 'Failed to fetch data from Linerva API.' });
    }
};