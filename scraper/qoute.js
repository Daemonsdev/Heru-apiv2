const axios = require('axios');
const cheerio = require('cheerio');

exports.config = {
    name: 'quote',
    author: 'Jay Mar',
    description: 'Fetches a random quote from quotes.toscrape.com.',
    category: 'random',
    link: ['/quote']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://quotes.toscrape.com');
        const html = response.data;
        const $ = cheerio.load(html);
        const quotes = [];

        $('.quote').each((index, element) => {
            const quoteText = $(element).find('.text').text();
            const quoteAuthor = $(element).find('.author').text();
            quotes.push({ text: quoteText, author: quoteAuthor });
        });

        const randomIndex = Math.floor(Math.random() * quotes.length);
        res.json(quotes[randomIndex]);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'An error occurred while fetching the quote' });
    }
};