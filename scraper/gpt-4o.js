const axios = require('axios');

exports.config = {
    name: 'gpt-4o',
    author: 'Jay Mar',
    description: 'gpt-4o api latest',
    category: 'ai',
    link: ['/gpt-4o?question=']
};

exports.initialize = async function ({ req, res }) {
    const question = req.query.question;

    if (!question) {
        return res.status(400).json({ error: 'usage: /gpt-4o?question=hi' });
    }

    let data = JSON.stringify({
        "messageList": [
            {
                "senderType": "BOT",
                "content": "Hi there! How can I help you today?"
            },
            {
                "type": "TEXT",
                "content": question,
                "senderType": "USER",
                "files": []
            }
        ],
        "fileIds": [],
        "threadId": "thread_lGY4BEYXStiAR2jpPAnOq2kF"
    });

    let config = {
        method: 'POST',
        url: 'https://markbot-10923.chipp.ai/api/openai/chat',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Content-Type': 'application/json',
            'sec-ch-ua-platform': '"Android"',
            'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
            'sec-ch-ua-mobile': '?1',
            'Origin': 'https://markbot-10923.chipp.ai',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://markbot-10923.chipp.ai/',
            'Accept-Language': 'en-US,en;q=0.9,fil;q=0.8'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        res.json({result: response.data}); // Send back the API response as JSON
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};