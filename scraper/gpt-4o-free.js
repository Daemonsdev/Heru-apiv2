const getGPT4js = require("gpt4js");

exports.config = {
    name: 'gpt-4o-free',
    author: 'Jay Mar',
    description: 'Free GPT-4o API integration using the Nextway provider',
    category: 'ai',
    link: ['/gpt-4o-free?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.status(400).json({ message: 'usage: /gpt-4o-free?prompt=hi' });
    }

    try {
        const GPT4js = await getGPT4js();
        const messages = [{ role: "assistant", content: userPrompt }];
        const options = {
            provider: "Nextway",
            model: "gpt-4o-free",
        };

        const provider = GPT4js.createProvider(options.provider);

        provider.chatCompletion(messages, options, (data) => {
            console.log(data);
        });

        const text = await provider.chatCompletion(messages, options);

        res.json({ response: text });
    } catch (error) {
        console.error("Error fetching data from GPT-4o-free:", error);
        res.status(500).json({ message: 'Failed to fetch data from GPT-4o-free API.' });
    }
};