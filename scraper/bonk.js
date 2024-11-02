const knights = require("knights-canvas");
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'bonk',
    author: 'Jay Mar',
    description: 'Generate a bonk canvas image',
    category: 'canvas',
    link: ['/bonk?avatarUrl1=https://i.imgur.com/34LyOyS.jpeg&avatarUrl2=https://i.imgur.com/34LyOyS.jpeg'],
};

exports.initialize = async function ({ req, res }) {
    try {
        const { avatarUrl1, avatarUrl2 } = req.query;

        if (!avatarUrl1 || !avatarUrl2) {
            return res.status(400).json({ error: "usage: /bonk?avatarUrl1=first_avatar_url&avatarUrl2=second_avatar_url" });
        }

        const image = await new knights.Bonk()
            .setAvatar1(avatarUrl1)
            .setAvatar2(avatarUrl2)
            .toBuild();

        const imageBuffer = image.toBuffer();
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const filePath = path.join(cacheDir, `bonk_${Date.now()}.png`);

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
        console.error("Error generating bonk image:", error);
        res.status(500).json({ error: "Failed to generate bonk image" });
    }
};