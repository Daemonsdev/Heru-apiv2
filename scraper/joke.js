const axios = require('axios');

exports.config = {
    name: 'joke',
    author: 'Jay Mar',
    description: 'Fetches a random joke',
    category: 'random',
    link: ['/joke']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const { setup, punchline } = response.data;
        res.json({ setup, punchline });
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.status(500).json({ message: 'Failed to fetch joke.' });
    }
};