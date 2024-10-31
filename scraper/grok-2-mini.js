const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'grok-2-mini',
    author: 'Jay Mar',
    description: 'Grok-2-Mini Api',
    category: 'ai',
    link: ['/grok-2-mini?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /grok-2-mini?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'grok-2-mini'
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
        console.error("Error fetching data from grok-2-mini:", error);
        res.status(500).json({ message: 'Failed to fetch data from grok-2-mini API.' });
    }
};