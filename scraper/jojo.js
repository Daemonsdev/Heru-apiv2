const knights = require("knights-canvas");
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'jojo',
    author: 'Jay Mar',
    description: 'Generate a JoJo canvas image',
    category: 'canvas',
    link: ['/jojo?imageUrl=https://i.imgur.com/34LyOyS.jpeg'],
};

exports.initialize = async function ({ req, res }) {
    try {
        const { imageUrl } = req.query;

        if (!imageUrl) {
            return res.status(400).json({ error: "usage: /jojo?imageUrl=your_image_url" });
        }

        const image = await new knights.Jo()
            .setImage(imageUrl)
            .toBuild();

        const imageBuffer = image.toBuffer();
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const filePath = path.join(cacheDir, `jojo_${Date.now()}.png`);

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
        console.error("Error generating JoJo image:", error);
        res.status(500).json({ error: "Failed to generate JoJo image" });
    }
};