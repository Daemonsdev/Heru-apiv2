const samirapi = require('samirapi');

exports.config = {
    name: 'tiktoksearch',
    author: 'Jay Mar',
    description: 'TikTok search API',
    category: 'search',
    link: ['/tiktoksearch?query=']
};

exports.initialize = async function ({ req, res }) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
        return res.status(400).send({ error: 'Usage: /tiktoksearch?query=search_term' });
    }

    try {
        const videos = await samirapi.tiktokSearch(searchQuery);
        res.json({ videos });
    } catch (error) {
        console.error('Error fetching data from TikTok:', error);
        res.status(500).send({ error: 'Failed to fetch data from TikTok.' });
    }
};