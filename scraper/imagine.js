const samirapi = require('samirapi');
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'imagine',
    author: 'Jay Mar',
    description: 'Image generator using Samir API',
    category: 'image',
    link: ['/imagine?prompt=']
};

exports.initialize = async function ({ req, res }) {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).json({ message: 'usage: /imagine?prompt=dog' });
    }

    try {
        const imageBuffer = await samirapi.imagine(prompt);
        const cacheDir = path.join(__dirname, 'tmp');
        
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const filePath = path.join(cacheDir, `image_${Date.now()}.png`);
        await fs.promises.writeFile(filePath, imageBuffer);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to generate image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ message: 'Failed to generate image.' });
    }
};