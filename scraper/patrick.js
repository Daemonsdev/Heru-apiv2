const knights = require("knights-canvas");
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'patrick',
    author: 'Jay Mar',
    description: 'Generate a Patrick canvas image',
    category: 'canvas',
    link: ['/patrick?avatarUrl=https://i.imgur.com/34LyOyS.jpeg'],
};

exports.initialize = async function ({ req, res }) {
    try {
        const { avatarUrl } = req.query;

        if (!avatarUrl) {
            return res.status(400).json({ error: "usage: /patrick?avatarUrl=your_avatar_url" });
        }

        const image = await new knights.Patrick()
            .setAvatar(avatarUrl)
            .toAttachment();

        const imageBuffer = image.toBuffer();
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const filePath = path.join(cacheDir, `patrick_${Date.now()}.png`);

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
        console.error("Error generating Patrick image:", error);
        res.status(500).json({ error: "Failed to generate Patrick image" });
    }
};