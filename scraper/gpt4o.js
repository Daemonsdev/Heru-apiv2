const axios = require('axios');

exports.config = {
    name: 'gpt4o',
    author: 'Jay Mar',
    description: 'GPT-4o API integration',
    category: 'ai',
    link: ['/gpt4o?ask=']
};

exports.initialize = async function ({ req, res }) {
    const askQuery = req.query.ask;

    if (!askQuery) {
        return res.status(400).send({ error: 'usage: /gpt4o?ask=hello' });
    }

    try {
        const apiUrl = `http://free.dk-01.northvm.net:26126/gpt4o?ask=${encodeURIComponent(askQuery)}`;
        const response = await axios.get(apiUrl);

        const modifiedResponse = {
            ...response.data,
            author: "Jay Mar"
        };

        res.send(modifiedResponse);
    } catch (error) {
        console.error('Error fetching data from GPT-4o API:', error.message);
        res.status(500).send({ error: 'Failed to fetch data from GPT-4o API.' });
    }
};