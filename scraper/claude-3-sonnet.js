const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'claude-3-sonnet',
    author: 'Jay Mar',
    description: 'Claude-3-Sonnet-20240229 API',
    category: 'ai',
    link: ['/claude-3-sonnet?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /claude-3-sonnet?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'claude-3-sonnet-20240229'
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
        console.error("Error fetching data from claude-3-sonnet-20240229 api:", error);
        res.status(500).json({ message: 'Failed to fetch data from claude-3-sonnet-20240229 api.' });
    }
};