const axios = require('axios');

exports.config = {
    name: 'geminivision',
    author: 'Jay Mar',
    description: 'Fetches data from the Gemini Vision API using ask and url parameters.',
    category: 'ai',
    link: ['/geminivision?ask=&url=']
};

exports.initialize = async function ({ req, res }) {
    const { ask, url } = req.query;

    if (!ask || !url) {
        return res.status(400).json({ error: 'usage: /geminivision?ask=describe this photo&url=https://example.com/image.jpg' });
    }

    try {
        const response = await axios.get(`https://joshweb.click/gemini?prompt=${encodeURIComponent(ask)}&url=${encodeURIComponent(url)}`);
        const data = response.data;

        res.json({
            gemini: data.gemini
        });
    } catch (error) {
        console.error('Error processing Gemini Vision request:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
