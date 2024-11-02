const axios = require('axios');

exports.config = {
    name: 'riddle',
    author: 'Jay Mar',
    description: 'Fetches a random riddle with its answer from the Riddles API.',
    category: 'random',
    link: ['/riddle']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://riddles-api.vercel.app/random');
        const data = response.data;

        res.json({
            riddle: data.riddle,
            answer: data.answer
        });
    } catch (error) {
        console.error('Error fetching random riddle:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
