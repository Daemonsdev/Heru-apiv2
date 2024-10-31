const { chatbox } = require('chatbox-dev-ai');

exports.config = {
    name: 'gpt-3',
    author: 'Jay Mar',
    description: 'GPT-3 API',
    category: 'ai',
    link: ['/gpt-3?query=']
};

exports.initialize = async function ({ req, res }) {
    const userId = 'default';
    const userQuery = req.query.query;

    if (!userQuery) {
        return res.status(400).json({ message: 'usage: /gpt-3?query=hi' });
    }

    try {
        const response = await chatbox(userId, userQuery);
        res.json({ response });
    } catch (error) {
        console.error("Error fetching data from GPT-3:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-3 API.' });
    }
};