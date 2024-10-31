const samirapi = require('samirapi');

exports.config = {
    name: 'spotify',
    author: 'Jay Mar',
    description: 'Spotify search API',
    category: 'search',
    link: ['/spotify?query=']
};

exports.initialize = async function ({ req, res }) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
        return res.status(400).send({ error: 'Usage: /spotify?query=artist_or_song_name' });
    }

    try {
        const results = await samirapi.spotifySearch(searchQuery);
        res.json({ results });
    } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        res.status(500).send({ error: 'Failed to fetch data from Spotify.' });
    }
};