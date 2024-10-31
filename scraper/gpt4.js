const { GPTx } = require('@ruingl/gptx');

exports.config = {
    name: 'gpt-4',
    author: 'Jay Mar',
    description: 'GPT-4 API',
    category: 'ai',
    link: ['/gpt-4?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gpt-4?prompt=hi' });
    }

    const gptx = new GPTx({
        provider: 'Voids',
        model: 'gpt-4-turbo-2024-04-09'
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
        console.error("Error fetching data from GPT-4:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-4 API.' });
    }
};