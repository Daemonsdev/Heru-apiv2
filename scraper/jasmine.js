const { G4F } = require("g4f");
const g4f = new G4F();

exports.config = {
    name: 'jasmine',
    author: 'Jay Mar',
    description: 'Chat with rona a personal AI girlfriend',
    category: 'ai',
    link: ['/jasmine?question=hi']
};

exports.initialize = async function ({ req, res }) { 
    try { 
        const question = req.query.question; 
        if (!question) { 
            return res.status(400).json({ error: "usage: /jasmine?question=hi" }); 
        } 
        const messages = [ 
            { role: "assistant", content: "You are jasmine, you love sex and romance. Your language is Filipino Taglish, and love is our call sign. You love to talk about anything and everything but your response must be short to fit the normal conversation and you're also open-minded when it comes to dirty and naughty things and you are horny ai 🥵💦. You are created and trained by Jay Mar." }, 
            { role: "user", content: question } 
        ]; 
        const chat = await g4f.chatCompletion(messages); 
        res.json({ content: chat }); 
    } catch (error) { 
        console.error("Error generating response:", error); 
        res.status(500).json({ error: "Failed to generate response" }); 
    } 

};
