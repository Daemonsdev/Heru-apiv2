const samirapi = require('samirapi');

exports.config = {
    name: 'mangasearch',
    author: 'Jay Mar',
    description: 'MyAnimeList manga search API',
    category: 'search',
    link: ['/mangasearch?query=']
};

exports.initialize = async function ({ req, res }) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
        return res.status(400).send({ error: 'Usage: /mangasearch?query=your_manga_title' });
    }

    try {
        const manga = await samirapi.malMangaSearch(searchQuery);
        res.json({ manga });
    } catch (error) {
        console.error('Error fetching manga from MyAnimeList:', error);
        res.status(500).send({ error: 'Failed to fetch manga from MyAnimeList.' });
    }
};