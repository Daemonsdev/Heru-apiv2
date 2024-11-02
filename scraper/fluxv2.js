const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

exports.config = {
    name: 'fluxv2',
    author: 'Developer',
    description: 'Generate an image from pollination AI based on a prompt',
    category: 'image',
    link: ['/fluxv2?prompt=']
};

exports.initialize = async function ({ req, res }) {
    try {
        const { prompt } = req.query;

        if (!prompt) {
            return res.status(400).json({ error: "usage: /fluxv2?prompt=your_prompt" });
        }

        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const imagePath = path.join(cacheDir, `fluxv2_image_${Date.now()}.png`);
        
        const imageResponse = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
            responseType: 'arraybuffer'
        });
        
        await fs.promises.writeFile(imagePath, imageResponse.data);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to send fluxv2 image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

    } catch (error) {
        console.error("Error generating fluxv2 image:", error);
        res.status(500).json({ error: "Failed to generate fluxv2 image" });
    }
};