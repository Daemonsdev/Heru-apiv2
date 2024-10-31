const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'claude-2.1',
    author: 'Jay Mar',
    description: 'Claude-2.1 API',
    category: 'ai',
    link: ['/claude-2.1?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /claude-2.1?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'claude-2.1'
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
        console.error("Error fetching data from claude-2.1 api:", error);
        res.status(500).json({ message: 'Failed to fetch data from claude-2.1 api.' });
    }
};