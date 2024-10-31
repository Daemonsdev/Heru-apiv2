const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'grok-2',
    author: 'Jay Mar',
    description: 'Grok-2 Api',
    category: 'ai',
    link: ['/grok-2?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /grok-2?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'grok-2'
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
        console.error("Error fetching data from grok-2:", error);
        res.status(500).json({ message: 'Failed to fetch data from grok-2 API.' });
    }
};