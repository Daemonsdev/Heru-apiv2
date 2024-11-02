const axios = require('axios');

exports.config = {
    name: 'randomuser',
    author: 'Jay Mar',
    description: 'Fetches a random user profile from the Random User API.',
    category: 'random',
    link: ['/randomuser']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        res.json({ user });
    } catch (error) {
        console.error('Error fetching random user:', error);
        res.status(500).json({ message: 'Error retrieving random user' });
    }
};
