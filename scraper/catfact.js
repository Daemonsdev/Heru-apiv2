const axios = require('axios');

exports.config = {
    name: 'catfact',
    author: 'Jay Mar',
    description: 'Fetches a random cat fact',
    category: 'random',
    link: ['/catfact']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        res.json({ fact: response.data.fact });
    } catch (error) {
        console.error("Error fetching cat fact:", error);
        res.status(500).json({ message: 'Failed to fetch cat fact.' });
    }
};