const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'gemini-pro',
    author: 'Jay Mar',
    description: 'Gemini Pro api',
    category: 'ai',
    link: ['/gemini-pro?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gemini-pro?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Nextway',
        model: 'gemini-pro'
    });

    try {
        const messages = [
            {
                role: 'user',
                content: userPrompt
            }
        ];

        const response = await gptx.ChatCompletion(messages);
        res.json({ response });
    } catch (error) {
        console.error("Error fetching data from Gemini Pro:", error);
        res.status(500).json({ message: 'Failed to fetch data from Gemini Pro API.' });
    }
};