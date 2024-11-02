const axios = require('axios');

exports.config = {
    name: 'randommeme',
    author: 'Jay Mar',
    description: 'Fetches a random meme from the Imgflip API.',
    category: 'random',
    link: ['/randommeme']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        const memes = response.data.data.memes;

        const randomIndex = Math.floor(Math.random() * memes.length);
        const randomMeme = memes[randomIndex];

        res.json({
            id: randomMeme.id,
            name: randomMeme.name,
            url: randomMeme.url
        });
    } catch (error) {
        console.error('Error fetching meme data:', error);
        res.status(500).json({ error: 'Error fetching meme data' });
    }
};
