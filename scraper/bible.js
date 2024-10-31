const axios = require('axios');

exports.config = {
    name: 'bible',
    author: 'Jay Mar',
    description: 'Fetches a random verse from the Bible',
    category: 'random',
    link: ['/bible']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://bible-api.com/?random=verse');
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching bible verse:", error);
        res.status(500).json({ message: 'Failed to fetch bible verse.' });
    }
};