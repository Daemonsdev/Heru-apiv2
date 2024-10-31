const samirapi = require('samirapi');

exports.config = {
    name: 'animesearch',
    author: 'Jay Mar',
    description: 'MyAnimeList anime search API',
    category: 'search',
    link: ['/animesearch?query=']
};

exports.initialize = async function ({ req, res }) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
        return res.status(400).send({ error: 'Usage: /animesearch?query=your_anime_title' });
    }

    try {
        const anime = await samirapi.malAnimeSearch(searchQuery);
        res.json({ anime });
    } catch (error) {
        console.error('Error fetching anime from MyAnimeList:', error);
        res.status(500).send({ error: 'Failed to fetch anime from MyAnimeList.' });
    }
};