const knights = require("knights-canvas");
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'spongebob-burn',
    author: 'Jay Mar',
    description: 'Generate a Spongebob burn canvas image',
    category: 'canvas',
    link: ['/spongebob-burn?avatarUrl=https://i.imgur.com/68NPUFT.jpeg'],
};

exports.initialize = async function ({ req, res }) {
    try {
        const { avatarUrl } = req.query;

        if (!avatarUrl) {
            return res.status(400).json({ error: "usage: /spongebob-burn?avatarUrl=your_avatar_url" });
        }

        const image = await new knights.Burn()
            .setAvatar(avatarUrl)
            .toAttachment();

        const imageBuffer = image.toBuffer();
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const filePath = path.join(cacheDir, `burn_${Date.now()}.png`);

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
        console.error("Error generating Spongebob burn image:", error);
        res.status(500).json({ error: "Failed to generate Spongebob burn image" });
    }
};