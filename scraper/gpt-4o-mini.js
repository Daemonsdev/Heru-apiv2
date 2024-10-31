const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'gpt-4o-mini',
    author: 'Jay Mar',
    description: 'GPT-4o Mini API integration using the Voids provider',
    category: 'ai',
    link: ['/gpt-4o-mini?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gpt-4o-mini?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'gpt-4o-mini'
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
        console.error("Error fetching data from GPT-4o Mini:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-4o Mini API.' });
    }
};