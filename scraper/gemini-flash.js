const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'gemini-flash',
    author: 'Jay Mar',
    description: 'GEMINI-FLASH API',
    category: 'ai',
    link: ['/gemini-1.5-flah?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gemini-1.5-flash?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'gemini-1.5-flash-exp-0827'
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
        console.error("Error fetching data from GEMINI-FLASH:", error);
        res.status(500).json({ message: 'Failed to fetch data from GEMINI-FLASH.' });
    }
};