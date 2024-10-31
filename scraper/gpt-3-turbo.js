const getGPT4js = require("gpt4js");

exports.config = {
    name: 'gpt-3.5-turbo',
    author: 'Jay Mar',
    description: 'interact to gpt3.5-turbo',
    category: 'ai',
    link: ['/gpt-3.5-turbo?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gpt-3.5-turbo?prompt=hi' });
    }

    try {
        const GPT4js = await getGPT4js();
        const messages = [{ role: "assistant", content: userPrompt }];
        const options = {
            provider: "Nextway",
            model: "gpt-3.5-turbo",
        };

        const provider = GPT4js.createProvider(options.provider);

        provider.chatCompletion(messages, options, (data) => {
            console.log(data);
        });

        const text = await provider.chatCompletion(messages, options);

        res.json({ response: text });
    } catch (error) {
        console.error("Error fetching data from GPT-3.5 Turbo:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-3.5 Turbo API.' });
    }
};