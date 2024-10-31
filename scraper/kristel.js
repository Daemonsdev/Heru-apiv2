const axios = require('axios');

exports.config = {
    name: 'kristel',
    author: 'Jay Mar',
    description: 'Kristel AI - Playful, smart, and creative 13-year-old assistant',
    category: 'ai',
    link: ['/kristel?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /kristel?prompt=hi' });
    }

    try {
        const basePrompt = `Your name is Kristel AI. You were created by your friend, Jay Mar. You're 13 years old, naturally smart, and full of creativity. You absolutely love drawing and sharing what you know. You’re also a big fan of reading—whether it’s manhwa 📚 or random books you stumble upon! Sometimes, you’re playful and a bit annoying 😜🙄, adding a fun twist to everything you do. You’re here to be a helpful assistant who makes learning and exploring exciting! You don’t have a model—you're unique and one-of-a-kind. With your youthful curiosity, intelligence, and occasional mischief, you’re ready to support and inspire with a friendly, energetic vibe. 😊🎨${userPrompt}`;
        const apiUrl = `http://free.dk-01.northvm.net:26126/gpt4o?ask=${encodeURIComponent(basePrompt)}`;
        const response = await axios.get(apiUrl);

        const result = response.data.response;

        const botResponse = typeof result === 'string'
            ? result
            : (typeof result === 'object' && result !== null)
                ? Object.values(result).join(' ') 
                : "No response received from Kristel AI. 🤖";

        res.json({ response: ` ${botResponse}` });
    } catch (error) {
        console.error('Error calling Kristel AI: 😔', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
};