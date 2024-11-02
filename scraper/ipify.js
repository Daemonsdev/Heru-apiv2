const axios = require('axios');

exports.config = {
    name: 'ipify',
    author: 'Jay Mar',
    description: 'Fetches the user’s public IP address using the ipify API.',
    category: 'random',
    link: ['/ipify']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        const ip = response.data.ip;
        res.json({ ip });
    } catch (error) {
        console.error('Error fetching IP address:', error);
        res.status(500).json({ message: 'Error retrieving IP address' });
    }
};
