const { openai } = require('betabotz-tools');

exports.config = {
    name: 'chatgpt',
    author: 'Jay Mar',
    description: 'Handles user input through ChatGPT with modified responses.',
    category: 'ai',
    link: ['/chatgpt?input=']
};

exports.initialize = async function ({ req, res }) {
    const userInput = req.query.input;

    if (!userInput) {
        return res.status(400).json({ error: 'usage: /chatgpt?input=hello' });
    }

    try {
        const results = await openai(userInput);

        const modifiedResults = { ...results, creator: 'Jay Mar' };

        console.log(modifiedResults);
        res.json(modifiedResults);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
