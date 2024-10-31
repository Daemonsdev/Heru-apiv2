const fs = require('fs');
const { chatbox } = require('chatbox-dev-ai');

const HISTORY_FILE = 'history.json';

const readHistory = () => {
    if (fs.existsSync(HISTORY_FILE)) {
        const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

const writeHistory = (history) => {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
};

const clearHistory = () => {
    if (fs.existsSync(HISTORY_FILE)) {
        fs.unlinkSync(HISTORY_FILE);
    }
};

exports.config = {
    name: 'gpt-3v2',
    author: 'Jay Mar',
    description: 'GPT-3 API integration using Chatbox Dev AI',
    category: 'ai-conversational',
    link: ['/gpt-3?query=&uid=']
};

exports.initialize = async function ({ req, res }) {
    const userQuery = req.query.query;
    const userId = req.query.uid || 'deafault';

    if (userQuery === 'clear') {
        clearHistory();
        return res.json({ message: 'Conversation history cleared.' });
    }

    if (!userQuery) {
        return res.status(400).json({ message: 'usage: /gpt-3?query=hi&uid=10' });
    }

    try {
        const history = readHistory();
        history.push({ userId, query: userQuery });

        const response = await chatbox(userId, userQuery);
        history.push({ response });
        writeHistory(history);

        res.json({ response });
    } catch (error) {
        console.error("Error fetching data from GPT-3:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-3 API.' });
    }
};